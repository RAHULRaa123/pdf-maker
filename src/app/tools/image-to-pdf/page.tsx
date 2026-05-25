
"use client"

import React, { useState } from 'react';
import { FileImage, Download, Share2, Loader2, RefreshCw, Layers } from 'lucide-react';
import { ToolLayout } from '@/components/tool-layout';
import { FileDropzone } from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { jsPDF } from 'jspdf';

export default function ImageToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleFilesSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const processConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    
    try {
      const doc = new jsPDF();
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imgData = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });

        // Add page if not the first one
        if (i > 0) doc.addPage();
        
        const img = new Image();
        img.src = imgData;
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const imgProps = doc.getImageProperties(imgData);
        const ratio = Math.min(pageWidth / imgProps.width, pageHeight / imgProps.height);
        const width = imgProps.width * ratio;
        const height = imgProps.height * ratio;
        const x = (pageWidth - width) / 2;
        const y = (pageHeight - height) / 2;

        doc.addImage(imgData, 'JPEG', x, y, width, height);
      }

      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      
      toast({ title: "PDF Created", description: `${files.length} images successfully bundled into a single document.` });
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Conversion Failed", description: "Could not generate PDF from selected images." });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = "converted-images.pdf";
    link.click();
  };

  return (
    <ToolLayout
      title="Image-to-PDF Conversion"
      description="Quickly bundle multiple images into a single, high-quality PDF document."
      icon={FileImage}
    >
      <div className="space-y-8">
        {!pdfUrl ? (
          <div className="space-y-6">
            <FileDropzone 
              onFilesSelected={handleFilesSelect} 
              accept="image/*"
              label="Select images to convert"
            />
            {files.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground px-2">
                  <span>Selected {files.length} images</span>
                  <span>Total size: {(files.reduce((acc, f) => acc + f.size, 0) / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <Button 
                  onClick={processConvert} 
                  className="w-full h-12 text-lg rounded-xl bg-accent hover:bg-accent/90" 
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating Document...
                    </>
                  ) : (
                    <>
                      <Layers className="mr-2 h-5 w-5" />
                      Generate PDF
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-card border-2 border-accent/20 rounded-3xl p-12 text-center shadow-sm">
              <div className="bg-green-100 dark:bg-green-900/30 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Download size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Ready to Download</h3>
              <p className="text-muted-foreground mb-8">Your PDF document is ready for storage or sharing.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                <Button size="lg" onClick={handleDownload} className="rounded-xl bg-primary h-12 text-lg">
                  <Download className="mr-2 h-5 w-5" /> Download PDF
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl h-12 text-lg border-2">
                  <Share2 className="mr-2 h-5 w-5" /> Share Document
                </Button>
              </div>
            </div>
            
            <div className="text-center">
               <Button 
                variant="ghost" 
                onClick={() => {setPdfUrl(null); setFiles([]);}} 
                className="text-muted-foreground"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Start New Conversion
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
