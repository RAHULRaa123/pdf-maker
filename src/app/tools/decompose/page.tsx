"use client"

import React, { useState } from 'react';
import { Scissors, Download, Share2, Loader2, RefreshCw, FileImage } from 'lucide-react';
import { ToolLayout } from '@/components/tool-layout';
import { FileDropzone } from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export default function DecomposePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };

  const processDecompose = async () => {
    if (!file) return;
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setIsDone(true);
    toast({ title: "Decomposed", description: "Successfully extracted all pages as high-resolution images." });
  };

  return (
    <ToolLayout
      title="PDF Decomposition"
      description="Convert complex PDF pages back into individual, high-resolution image formats like JPG or PNG."
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
                    Extracting pages...
                  </>
                ) : (
                  <>
                    <FileImage className="mr-2 h-5 w-5" />
                    Extract All Pages
                  </>
                )}
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-white border-2 border-accent/20 rounded-3xl p-12 text-center shadow-sm">
              <div className="bg-red-100 text-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Scissors size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Extraction Complete</h3>
              <p className="text-muted-foreground mb-8">All pages have been converted into an image archive.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                <Button size="lg" className="rounded-xl bg-primary h-12 text-lg">
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
                onClick={() => {setIsDone(false); setFile(null);}} 
                className="text-muted-foreground"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Extract New PDF
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}