"use client"

import React, { useState } from 'react';
import { Zap, Download, Share2, Loader2, RefreshCw, SlidersHorizontal } from 'lucide-react';
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
  const [result, setResult] = useState<any>(null);

  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
    setResult(null);
  };

  const compressImage = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const img = new window.Image();
      const objectUrl = URL.createObjectURL(file);

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = objectUrl;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Canvas error");

      ctx.drawImage(img, 0, 0);

      const type = file.type === 'image/webp' ? 'image/webp' : 'image/jpeg';
      const compressedDataUrl = canvas.toDataURL(type, quality / 100);

      const base64 = compressedDataUrl.split(',')[1];
      const compressedSize = (base64.length * 3) / 4 / 1024;
      const originalSize = file.size / 1024;

      setResult({
        url: compressedDataUrl,
        originalSize,
        compressedSize,
        ratio: compressedSize / originalSize,
        format: type.split('/')[1]
      });

      URL.revokeObjectURL(objectUrl);

      toast({
        title: "Compression Complete",
        description: `Reduced size by ${((1 - compressedSize / originalSize) * 100).toFixed(1)}%`,
      });

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Compression failed. Try another image.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result.url;
    link.download = `compressed-image.${result.format}`;
    link.click();
  };

  return (
    <ToolLayout
      title="Image Compressor"
      description="Reduce image size instantly without losing quality. Optimize JPG, PNG, and WebP images easily."
      icon={Zap}
    >
      <div className="space-y-10">

        {/* 🔥 SEO CONTENT SECTION */}
        <section className="mt-10 space-y-6 border-t pt-10 text-muted-foreground leading-7">

          <h2 className="text-3xl font-bold text-foreground">
            About Image Compression Tool
          </h2>

          <p>
            This Image Compression tool helps you reduce image file size without significantly affecting quality.
            It is useful for websites, social media, email attachments, and faster loading performance.
          </p>

          <h2 className="text-2xl font-bold text-foreground">
            How to Use This Tool
          </h2>

          <ol className="list-decimal pl-6 space-y-2">
            <li>Upload your image file (JPG, PNG, WEBP).</li>
            <li>Adjust compression quality slider.</li>
            <li>Click on Start Compression.</li>
            <li>Preview compressed image.</li>
            <li>Download optimized image.</li>
          </ol>

          <h2 className="text-2xl font-bold text-foreground">
            Benefits
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Reduce file size instantly</li>
            <li>Improve website loading speed</li>
            <li>No software installation required</li>
            <li>Works on mobile and desktop</li>
            <li>Maintains good image quality</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground">
            FAQ
          </h2>

          <h3 className="text-xl font-semibold">Is this tool free?</h3>
          <p>Yes, completely free to use.</p>

          <h3 className="text-xl font-semibold">Does it reduce image quality?</h3>
          <p>You can control quality using the slider.</p>

        </section>

        {/* TOOL UI */}
        {!result ? (
          <div className="space-y-6">

            <FileDropzone
              onFilesSelected={handleFileSelect}
              accept="image/*"
              multiple={false}
              label="Upload Image"
            />

            {file && (
              <Card className="p-6 space-y-6">

                <div className="flex justify-between items-center">
                  <Label className="flex items-center gap-2">
                    <SlidersHorizontal size={16} />
                    Quality
                  </Label>
                  <span className="font-bold">{quality}%</span>
                </div>

                <Slider
                  value={[quality]}
                  onValueChange={(v) => setQuality(v[0])}
                  min={10}
                  max={100}
                />

                <Button
                  onClick={compressImage}
                  disabled={isProcessing}
                  className="w-full h-12 text-lg"
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

              </Card>
            )}

          </div>
        ) : (
          <div className="space-y-8">

            <Card>
              <CardContent className="p-0">

                <div className="relative aspect-video w-full bg-muted">
                  <Image
                    src={result.url}
                    alt="compressed"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="p-6 grid grid-cols-2 gap-4 text-center text-sm">

                  <div>
                    <p className="font-bold">Original</p>
                    <p>{result.originalSize.toFixed(1)} KB</p>
                  </div>

                  <div>
                    <p className="font-bold">Compressed</p>
                    <p>{result.compressedSize.toFixed(1)} KB</p>
                  </div>

                </div>

              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-5 w-5" />
                Download
              </Button>

              <Button variant="outline">
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
            </div>

            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => { setFile(null); setResult(null); }}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Compress Another
              </Button>
            </div>

          </div>
        )}

      </div>
    </ToolLayout>
  );
}
