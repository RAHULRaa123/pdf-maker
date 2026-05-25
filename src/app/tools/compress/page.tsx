"use client"

import React, { useState } from 'react';
import { Zap, Download, Share2, Loader2, RefreshCw } from 'lucide-react';
import { ToolLayout } from '@/components/tool-layout';
import { FileDropzone } from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { intelligentImageCompression } from '@/ai/flows/intelligent-image-compression';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function CompressPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    compressedUrl: string;
    originalSize: number;
    compressedSize: number;
    ratio: number;
  } | null>(null);

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
    } else {
      setFile(null);
    }
  };

  const processImage = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const dataUri = await base64Promise;
      const response = await intelligentImageCompression({ imageDataUri: dataUri });

      setResult({
        compressedUrl: response.compressedImageDataUri,
        originalSize: response.originalFileSizeKB,
        compressedSize: response.compressedFileSizeKB,
        ratio: response.compressionRatio,
      });
      toast({ title: "Compression successful", description: `Reduced file size by ${((1 - response.compressionRatio) * 100).toFixed(1)}%` });
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Error", description: "Failed to compress image." });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result.compressedUrl;
    link.download = `compressed-${file?.name || 'image.png'}`;
    link.click();
  };

  const handleShare = async () => {
    if (!result) return;
    try {
      const blob = await (await fetch(result.compressedUrl)).blob();
      const shareFile = new File([blob], `compressed-${file?.name || 'image.png'}`, { type: blob.type });
      
      if (navigator.share) {
        await navigator.share({
          files: [shareFile],
          title: 'Compressed Image',
          text: 'Shared via DocuPix',
        });
      } else {
        toast({ title: "Sharing not supported", description: "Direct sharing is not available in this browser." });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ToolLayout
      title="Smart Compression"
      description="AI-powered tool that analyzes visual fidelity to find the perfect balance between file size reduction and image clarity."
      icon={Zap}
    >
      <div className="space-y-8">
        {!result && (
          <div className="space-y-6">
            <FileDropzone 
              onFilesSelected={handleFileSelect} 
              multiple={false} 
              accept="image/*"
              label="Select an image to compress"
            />
            {file && (
              <Button 
                onClick={processImage} 
                className="w-full h-12 text-lg rounded-xl bg-accent hover:bg-accent/90" 
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing Fidelity...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5" />
                    Compress with AI
                  </>
                )}
              </Button>
            )}
          </div>
        )}

        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="overflow-hidden border-none shadow-lg">
              <CardContent className="p-0">
                <div className="relative aspect-video w-full bg-slate-100">
                  <Image 
                    src={result.compressedUrl} 
                    alt="Compressed" 
                    fill 
                    className="object-contain"
                  />
                </div>
                <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white">
                  <div className="text-center p-3 bg-secondary/30 rounded-xl">
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Original</p>
                    <p className="text-lg font-bold text-primary">{result.originalSize.toFixed(1)} KB</p>
                  </div>
                  <div className="text-center p-3 bg-accent/10 rounded-xl">
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Compressed</p>
                    <p className="text-lg font-bold text-accent">{result.compressedSize.toFixed(1)} KB</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-xl">
                    <p className="text-xs text-green-600 uppercase font-bold tracking-wider">Reduction</p>
                    <p className="text-lg font-bold text-green-600">{((1 - result.ratio) * 100).toFixed(0)}%</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-xl">
                    <p className="text-xs text-blue-600 uppercase font-bold tracking-wider">Quality</p>
                    <p className="text-lg font-bold text-blue-600">Preserved</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button size="lg" onClick={handleDownload} className="w-full rounded-xl bg-primary h-12 text-lg">
                <Download className="mr-2 h-5 w-5" /> Download
              </Button>
              <Button size="lg" variant="outline" onClick={handleShare} className="w-full rounded-xl h-12 text-lg border-2">
                <Share2 className="mr-2 h-5 w-5" /> Share Result
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => {setResult(null); setFile(null);}} 
                className="md:col-span-2 text-muted-foreground"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Start Over
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}