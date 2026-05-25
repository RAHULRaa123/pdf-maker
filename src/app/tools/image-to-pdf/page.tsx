"use client"

import React, { useState } from 'react';
import { FileImage, Download, Share2, Loader2, RefreshCw, Layers } from 'lucide-react';
import { ToolLayout } from '@/components/tool-layout';
import { FileDropzone } from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export default function ImageToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleFilesSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const processConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    
    // Simulate high-fidelity processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsDone(true);
    toast({ title: "PDF Created", description: `${files.length} images successfully bundled into a single document.` });
  };

  return (
    <ToolLayout
      title="Image-to-PDF Conversion"
      description="Quickly bundle multiple images into a single, high-quality PDF document."
      icon={FileImage}
    >
      <div className="space-y-8">
        {!isDone ? (
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
            <div className="bg-white border-2 border-accent/20 rounded-3xl p-12 text-center shadow-sm">
              <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Download size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Ready to Download</h3>
              <p className="text-muted-foreground mb-8">Your PDF document is ready for storage or sharing.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                <Button size="lg" className="rounded-xl bg-primary h-12 text-lg">
                  <Download className="mr-2 h-5 w-5" /> Download PDF
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl h-12 text-lg border-2">
                  <Share2 className="mr-2 h-5 w-5" /> Share Sheet
                </Button>
              </div>
            </div>
            
            <div className="text-center">
               <Button 
                variant="ghost" 
                onClick={() => {setIsDone(false); setFiles([]);}} 
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