
"use client"

import React, { useState, useEffect } from 'react';
import { Maximize, Download, Share2, Loader2, RefreshCw, Move, Eye } from 'lucide-react';
import { ToolLayout } from '@/components/tool-layout';
import { FileDropzone } from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function ResizePage() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState('1080');
  const [height, setHeight] = useState('1080');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);

  const handleFileSelect = (files: File[]) => {
    const selected = files[0] || null;
    setFile(selected);
    if (selected) {
      const img = new window.Image();
      img.onload = () => {
        setWidth(img.width.toString());
        setHeight(img.height.toString());
      };
      img.src = URL.createObjectURL(selected);
    }
  };

  const processResize = async () => {
    if (!file) return;
    setIsProcessing(true);
    
    try {
      const imgData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const img = new window.Image();
      img.src = imgData;
      await new Promise((resolve) => { img.onload = resolve; });

      const canvas = document.createElement('canvas');
      canvas.width = parseInt(width) || img.width;
      canvas.height = parseInt(height) || img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not get canvas context");
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const resizedDataUrl = canvas.toDataURL('image/png');
      setResizedUrl(resizedDataUrl);
      
      toast({ title: "Resized", description: `Image scaled to ${canvas.width}x${canvas.height} successfully.` });
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Resize Failed", description: "Could not process image scaling." });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resizedUrl) return;
    const link = document.createElement('a');
    link.href = resizedUrl;
    link.download = `resized-${file?.name || 'image.png'}`;
    link.click();
  };

  const startOver = () => {
    if (resizedUrl) URL.revokeObjectURL(resizedUrl);
    setResizedUrl(null);
    setFile(null);
  };

  return (
    <ToolLayout
      title="Precision Resizer"
      description="Scale and crop images to specific dimensions or aspect ratios for any platform requirement."
      icon={Maximize}
    >
      <div className="space-y-8">
        {!resizedUrl ? (
          <div className="space-y-6">
            <FileDropzone 
              onFilesSelected={handleFileSelect} 
              multiple={false} 
              accept="image/*"
              label="Select an image to resize"
            />
            {file && (
              <Card className="border-none shadow-sm overflow-hidden rounded-2xl bg-card">
                <CardContent className="p-6 space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="width">Width (px)</Label>
                        <Input 
                          id="width" 
                          value={width} 
                          onChange={(e) => setWidth(e.target.value)} 
                          type="number" 
                          placeholder="Width"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (px)</Label>
                        <Input 
                          id="height" 
                          value={height} 
                          onChange={(e) => setHeight(e.target.value)} 
                          type="number" 
                          placeholder="Height"
                        />
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
                        Processing...
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
             <Card className="overflow-hidden border-none shadow-lg">
              <CardContent className="p-0">
                <div className="bg-secondary/20 p-4 border-b">
                   <h3 className="font-bold flex items-center gap-2"><Eye size={18}/> Preview ({width}x{height})</h3>
                </div>
                <div className="relative aspect-video w-full bg-slate-100 p-4">
                  <div className="relative w-full h-full">
                    <Image 
                      src={resizedUrl} 
                      alt="Resized" 
                      fill 
                      className="object-contain"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button size="lg" onClick={handleDownload} className="rounded-xl bg-primary h-12 text-lg">
                <Download className="mr-2 h-5 w-5" /> Download Result
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl h-12 text-lg border-2">
                <Share2 className="mr-2 h-5 w-5" /> Share Image
              </Button>
            </div>
            
            <div className="text-center">
               <Button 
                variant="ghost" 
                onClick={startOver} 
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
