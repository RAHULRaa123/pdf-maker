
"use client"

import React, { useState } from 'react';
import { Combine, Download, Share2, Loader2, RefreshCw, ListOrdered } from 'lucide-react';
import { ToolLayout } from '@/components/tool-layout';
import { FileDropzone } from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { PDFDocument } from 'pdf-lib';

export default function MergePdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);

  const handleFilesSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const processMerge = async () => {
    if (files.length < 2) {
      toast({ variant: "destructive", title: "Wait", description: "Select at least 2 PDF files to merge." });
      return;
    }
    setIsProcessing(true);
    
    try {
      const mergedPdf = await PDFDocument.create();
      
      for (const file of files) {
        const fileBytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
      
      toast({ title: "Merge Complete", description: "All PDF files have been combined into one document." });
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Merge Failed", description: "Could not combine the PDF files." });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!mergedPdfUrl) return;
    const link = document.createElement('a');
    link.href = mergedPdfUrl;
    link.download = "merged-document.pdf";
    link.click();
  };

  return (
    <ToolLayout
      title="Smart Merger"
      description="Combine disparate PDF files into one organized document with an intuitive interface."
      icon={Combine}
    >
      <div className="space-y-8">
        {!mergedPdfUrl ? (
          <div className="space-y-6">
            <FileDropzone 
              onFilesSelected={handleFilesSelect} 
              accept="application/pdf"
              label="Select PDF files to merge"
            />
            {files.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground px-2">
                  <span>Selected {files.length} PDFs</span>
                  <span className="flex items-center gap-1"><ListOrdered size={14}/> Maintain upload order</span>
                </div>
                <Button 
                  onClick={processMerge} 
                  className="w-full h-12 text-lg rounded-xl bg-accent hover:bg-accent/90" 
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Merging Documents...
                    </>
                  ) : (
                    <>
                      <Combine className="mr-2 h-5 w-5" />
                      Merge All Files
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-card border-2 border-accent/20 rounded-3xl p-12 text-center shadow-sm">
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Combine size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Merger Success</h3>
              <p className="text-muted-foreground mb-8">A single unified document has been created from your selections.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                <Button size="lg" onClick={handleDownload} className="rounded-xl bg-primary h-12 text-lg">
                  <Download className="mr-2 h-5 w-5" /> Download Merged
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl h-12 text-lg border-2">
                  <Share2 className="mr-2 h-5 w-5" /> Share PDF
                </Button>
              </div>
            </div>
            
            <div className="text-center">
               <Button 
                variant="ghost" 
                onClick={() => {setMergedPdfUrl(null); setFiles([]);}} 
                className="text-muted-foreground"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Start New Merge
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
