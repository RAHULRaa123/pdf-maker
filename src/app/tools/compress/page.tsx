
"use client"

import React, { useState } from 'react';
import { Zap, Download, Share2, Loader2, RefreshCw, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';
import { ToolLayout } from '@/components/tool-layout';
import { FileDropzone } from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function CompressPage() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(80);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    compressedUrl: string;
    originalSize: number;
    compressedSize: number;
    ratio: number;
    format: string;
  } | null>(null);

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setResult(null);
    } else {
      setFile(null);
    }
  };

  const compressImage = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      // 1. Read the file into an image object
      const img = new window.Image();
      const objectUrl = URL.createObjectURL(file);
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = objectUrl;
      });

      // 2. Create canvas and draw image
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not get canvas context");
      
      ctx.drawImage(img, 0, 0);

      // 3. Convert to compressed format (JPEG/WEBP support quality)
      // Use original format if possible, but default to JPEG for compression efficiency
      const outputType = file.type === 'image/webp' ? 'image/webp' : 'image/jpeg';
      const compressedDataUrl = canvas.toDataURL(outputType, quality / 100);
      
      // Calculate size from base64 (approximate)
      const base64Content = compressedDataUrl.split(',')[1];
      const compressedSizeBytes = (base64Content.length * 3) / 4;
      const compressedSizeKB = compressedSizeBytes / 1024;
      const originalSizeKB = file.size / 1024;

      setResult({
        compressedUrl: compressedDataUrl,
        originalSize: originalSizeKB,
        compressedSize: compressedSizeKB,
        ratio: compressedSizeKB / originalSizeKB,
        format: outputType.split('/')[1].toUpperCase()
      });

      URL.revokeObjectURL(objectUrl);
      toast({ 
        title: "Compression successful", 
        description: `Reduced file size by ${Math.max(0, ((1 - (compressedSizeKB / originalSizeKB)) * 100)).toFixed(1)}%` 
      });
    } catch (error) {
      console.error(error);
      toast({ 
        variant: "destructive", 
        title: "Error", 
        description: "Failed to compress image. Please try a different file." 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result.compressedUrl;
    link.download = `compressed-${file?.name.split('.')[0] || 'image'}.${result.format.toLowerCase()}`;
    link.click();
  };

  return (
    <ToolLayout
      title="Image Compression"
      description="Quickly reduce image file sizes without leaving your browser. Adjust quality settings to find your perfect balance."
      icon={Zap}
    >
      <div className="space-y-8">
        {!result ? (
          <div className="space-y-6">
            <FileDropzone 
              onFilesSelected={handleFileSelect} 
              multiple={false} 
              accept="image/jpeg,image/png,image/webp"
              label="Select JPG, PNG or WEBP to compress"
            />
            
            {file && (
              <Card className="border-none shadow-sm overflow-hidden rounded-2xl bg-card">
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-base font-semibold flex items-center gap-2">
                        <SlidersHorizontal size={18} className="text-accent" />
                        Compression Quality
                      </Label>
                      <span className="text-accent font-bold text-lg">{quality}%</span>
                    </div>
                    <Slider 
                      value={[quality]} 
                      onValueChange={(vals) => setQuality(vals[0])} 
                      min={10} 
                      max={100} 
                      step={1}
                      className="py-4"
                    />
                    <p className="text-xs text-muted-foreground italic">
                      Lower quality results in smaller file sizes. 80% is recommended for most uses.
                    </p>
                  </div>

                  <Button 
                    onClick={compressImage} 
                    className="w-full h-12 text-lg rounded-xl bg-accent hover:bg-accent/90" 
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Compressing...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-5 w-5" />
                        Start Compression
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="overflow-hidden border-none shadow-lg bg-card">
              <CardContent className="p-0">
                <div className="relative aspect-video w-full bg-muted/30">
                  <Image 
                    src={result.compressedUrl} 
                    alt="Compressed result" 
                    fill 
                    className="object-contain"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                      {result.format} PREVIEW
                    </span>
                  </div>
                </div>
                
                <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-secondary/30 rounded-2xl">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Original</p>
                    <p className="text-xl font-bold text-primary">{result.originalSize.toFixed(1)} KB</p>
                  </div>
                  <div className="text-center p-4 bg-accent/10 rounded-2xl">
                    <p className="text-[10px] text-accent uppercase font-bold tracking-widest mb-1">Compressed</p>
                    <p className="text-xl font-bold text-accent">{result.compressedSize.toFixed(1)} KB</p>
                  </div>
                  <div className="text-center p-4 bg-green-500/10 rounded-2xl">
                    <p className="text-[10px] text-green-600 uppercase font-bold tracking-widest mb-1">Savings</p>
                    <p className="text-xl font-bold text-green-600">
                      {Math.max(0, ((1 - result.ratio) * 100)).toFixed(0)}%
                    </p>
                  </div>
                  <div className="text-center p-4 bg-blue-500/10 rounded-2xl">
                    <p className="text-[10px] text-blue-600 uppercase font-bold tracking-widest mb-1">Quality</p>
                    <p className="text-xl font-bold text-blue-600">{quality}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button size="lg" onClick={handleDownload} className="w-full rounded-xl bg-primary h-14 text-lg shadow-md hover:shadow-lg transition-all">
                <Download className="mr-2 h-6 w-6" /> Download Image
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => {
                  if (navigator.share) {
                    fetch(result.compressedUrl).then(res => res.blob()).then(blob => {
                      const fileObj = new File([blob], `compressed.${result.format.toLowerCase()}`, { type: blob.type });
                      navigator.share({ files: [fileObj], title: 'Compressed Image' });
                    });
                  } else {
                    toast({ title: "Sharing not supported", description: "Use download button instead." });
                  }
                }} 
                className="w-full rounded-xl h-14 text-lg border-2"
              >
                <Share2 className="mr-2 h-6 w-6" /> Share File
              </Button>
            </div>
            
            <div className="text-center pt-4">
               <Button 
                variant="ghost" 
                onClick={() => {setResult(null); setFile(null);}} 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Compress Another Image
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
