
"use client"

import React, { useState } from 'react';
import { Scissors, Download, Share2, Loader2, RefreshCw, FileText, Package } from 'lucide-react';
import { ToolLayout } from '@/components/tool-layout';
import { FileDropzone } from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';

export default function DecomposePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);
  const [pageCount, setPageCount] = useState(0);

  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };

  const processDecompose = async () => {
    if (!file) return;
    setIsProcessing(true);
    
    try {
      const fileBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBytes);
      const count = pdfDoc.getPageCount();
      setPageCount(count);

      const zip = new JSZip();
      
      for (let i = 0; i < count; i++) {
        const subDoc = await PDFDocument.create();
        const [copiedPage] = await subDoc.copyPages(pdfDoc, [i]);
        subDoc.addPage(copiedPage);
        const pdfBytes = await subDoc.save();
        zip.file(`page-${i + 1}.pdf`, pdfBytes);
      }

      const content = await zip.generateAsync({ type: "blob" });
      setZipBlob(content);
      setIsDone(true);
      toast({ title: "Split Complete", description: `Extracted ${count} individual pages into a ZIP archive.` });
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Error", description: "Failed to split PDF into separate pages." });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!zipBlob) return;
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `split-${file?.name?.replace('.pdf', '') || 'pages'}.zip`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="PDF Decomposition"
      description="Split a complex PDF document into individual page files for easier management."
      icon={Scissors}
    >
      <div className="space-y-8">
        {!isDone ? (
          <div className="space-y-6">
            <FileDropzone 
              onFilesSelected={handleFileSelect} 
              multiple={false} 
              accept="application/pdf"
              label="Select PDF to decompose"
            />
            {file && (
              <Button 
                onClick={processDecompose} 
                className="w-full h-12 text-lg rounded-xl bg-accent hover:bg-accent/90" 
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Splitting pages...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-5 w-5" />
                    Extract All Pages
                  </>
                )}
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-card border-2 border-accent/20 rounded-3xl p-12 text-center shadow-sm">
              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Package size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Extraction Complete</h3>
              <p className="text-muted-foreground mb-8">Successfully separated {pageCount} pages into a ZIP archive.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                <Button size="lg" onClick={handleDownload} className="rounded-xl bg-primary h-12 text-lg">
                  <Download className="mr-2 h-5 w-5" /> Download ZIP
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl h-12 text-lg border-2">
                  <Share2 className="mr-2 h-5 w-5" /> Share Files
                </Button>
              </div>
            </div>
            
            <div className="text-center">
               <Button 
                variant="ghost" 
                onClick={() => {setIsDone(false); setFile(null); setZipBlob(null);}} 
                className="text-muted-foreground"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Split New PDF
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
