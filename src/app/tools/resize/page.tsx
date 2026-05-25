"use client"

import React, { useState } from 'react';
import { Maximize, Download, Share2, Loader2, RefreshCw, Move } from 'lucide-react';
import { ToolLayout } from '@/components/tool-layout';
import { FileDropzone } from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

export default function ResizePage() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState('1080');
  const [height, setHeight] = useState('1080');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };

  const processResize = async () => {
    if (!file) return;
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setIsDone(true);
    toast({ title: "Resized", description: `Image scaled to ${width}x${height} successfully.` });
  };

  return (
    <ToolLayout
      title="Precision Resizer"
      description="Scale and crop images to specific dimensions or aspect ratios for any platform requirement."
      icon={Maximize}
    >
      <div className="space-y-8">
        {!isDone ? (
          <div className="space-y-6">
            <FileDropzone 
              onFilesSelected={handleFileSelect} 
              multiple={false} 
              accept="image/*"
              label="Select an image to resize"
            />
            {file && (
              <Card className="border-none shadow-sm overflow-hidden rounded-2xl">
                <CardContent className="p-6 space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="width">Width (px)</Label>
                        <Input id="width" value={width} onChange={(e) => setWidth(e.target.value)} type="number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (px)</Label>
                        <Input id="height" value={height} onChange={(e) => setHeight(e.target.value)} type="number" />
                      </div>
                   </div>
                   <Button 
                    onClick={processResize} 
                    className="w-full h-12 text-lg rounded-xl bg-accent hover:bg-accent/90" 
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Calculating pixels...
                      </>
                    ) : (
                      <>
                        <Move className="mr-2 h-5 w-5" />
                        Apply New Dimensions
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-white border-2 border-accent/20 rounded-3xl p-12 text-center shadow-sm">
              <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Maximize size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Resizing Finished</h3>
              <p className="text-muted-foreground mb-8">New dimensions: {width}px x {height}px</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                <Button size="lg" className="rounded-xl bg-primary h-12 text-lg">
                  <Download className="mr-2 h-5 w-5" /> Download Result
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl h-12 text-lg border-2">
                  <Share2 className="mr-2 h-5 w-5" /> Share Image
                </Button>
              </div>
            </div>
            
            <div className="text-center">
               <Button 
                variant="ghost" 
                onClick={() => {setIsDone(false); setFile(null);}} 
                className="text-muted-foreground"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Resize Another
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}