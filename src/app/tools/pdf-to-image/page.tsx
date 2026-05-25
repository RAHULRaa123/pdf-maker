
"use client"

import React, { useState } from 'react';
import { Image as ImageIcon, Download, Share2, Loader2, RefreshCw, Eye, FileType } from 'lucide-react';
import { ToolLayout } from '@/components/tool-layout';
import { FileDropzone } from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import * as pdfjs from 'pdfjs-dist';

// Configure pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfToImagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
    setImages([]);
  };

  const convertPdfToImages = async () => {
    if (!file) return;
    setIsProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      const imageUrls: string[] = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better quality
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) continue;
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;

        imageUrls.push(canvas.toDataURL('image/png'));
      }

      setImages(imageUrls);
      toast({ title: "Conversion Complete", description: `Successfully extracted ${numPages} pages as images.` });
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Error", description: "Failed to convert PDF to images." });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (dataUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `page-${index + 1}.png`;
    link.click();
  };

  return (
    <ToolLayout
      title="PDF to Image"
      description="Extract pages from your PDF documents and convert them into high-resolution PNG images."
      icon={ImageIcon}
    >
      <div className="space-y-8">
        {images.length === 0 ? (
          <div className="space-y-6">
            <FileDropzone 
              onFilesSelected={handleFileSelect} 
              multiple={false} 
              accept="application/pdf"
              label="Select PDF to convert to images"
            />
            {file && (
              <Button 
                onClick={convertPdfToImages} 
                className="w-full h-12 text-lg rounded-xl bg-accent hover:bg-accent/90" 
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Converting pages...
                  </>
                ) : (
                  <>
                    <FileType className="mr-2 h-5 w-5" />
                    Convert PDF to Images
                  </>
                )}
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {images.map((img, idx) => (
                <Card key={idx} className="overflow-hidden border-none shadow-lg bg-card group">
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/4] w-full bg-muted/30">
                      <Image 
                        src={img} 
                        alt={`Page ${idx + 1}`} 
                        fill 
                        className="object-contain"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Button size="sm" onClick={() => handleDownload(img, idx)} className="rounded-full shadow-lg">
                            <Download size={14} />
                         </Button>
                      </div>
                    </div>
                    <div className="p-4 flex justify-between items-center border-t">
                      <span className="text-sm font-bold">Page {idx + 1}</span>
                      <Button variant="ghost" size="sm" onClick={() => handleDownload(img, idx)}>
                        Download PNG
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center pt-8 border-t">
               <Button 
                variant="ghost" 
                onClick={() => {setImages([]); setFile(null);}} 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Convert Another PDF
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
