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
    setResizedUrl(null);

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
      const reader = new FileReader();

      const imgData: string = await new Promise((resolve, reject) => {
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const img = new window.Image();
      img.src = imgData;

      await new Promise((resolve) => (img.onload = resolve));

      const canvas = document.createElement('canvas');
      canvas.width = parseInt(width) || img.width;
      canvas.height = parseInt(height) || img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Canvas error");

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const resizedDataUrl = canvas.toDataURL('image/png');

      setResizedUrl(resizedDataUrl);

      toast({
        title: "Resize Complete",
        description: `Image resized to ${canvas.width} × ${canvas.height}`,
      });

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Resize Failed",
        description: "Unable to resize image.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resizedUrl) return;
    const link = document.createElement('a');
    link.href = resizedUrl;
    link.download = `resized-image.png`;
    link.click();
  };

  return (
    <ToolLayout
      title="Image Resizer"
      description="Resize images to any dimension instantly without losing quality. Perfect for social media, websites, and documents."
      icon={Maximize}
    >
      <div className="space-y-10">
{/* SEO CONTENT */}
<section className="mt-10 space-y-8 border-t pt-10 text-muted-foreground leading-8">

  <h2 className="text-3xl font-bold text-foreground">
    Complete Guide to Image Resizer Tool
  </h2>

  <p>
    Image Resizer Tool is a free online utility that allows users to change
    image dimensions quickly and easily. You can increase or reduce image
    width and height according to your requirements without installing any
    software. It is useful for websites, social media, online applications,
    documents, presentations and digital content creation.
  </p>

  <p>
    Images with large dimensions often take more storage space and load slowly.
    Resizing images helps improve website performance, reduces file size and
    makes images easier to upload, share and manage on different platforms.
  </p>

  <h2 className="text-2xl font-bold text-foreground">
    Why Resize Images?
  </h2>

  <p>
    Different platforms require different image dimensions. A resized image
    can fit perfectly for profile pictures, website banners, thumbnails,
    documents and social media posts while maintaining proper appearance.
  </p>

  <ul className="list-disc pl-6 space-y-2">
    <li>Change image width and height easily</li>
    <li>Create images for websites and social media</li>
    <li>Reduce unnecessary image dimensions</li>
    <li>No software installation required</li>
    <li>Works directly in your browser</li>
    <li>Compatible with Windows, macOS, Android and iPhone</li>
    <li>Simple interface for beginners</li>
  </ul>

  <h2 className="text-2xl font-bold text-foreground">
    Common Uses
  </h2>

  <p>
    Website owners resize images to improve loading speed. Students resize
    images for assignments and online forms. Businesses optimize product
    images for online stores. Social media users adjust images for profile
    pictures, posts and thumbnails.
  </p>

  <h2 className="text-2xl font-bold text-foreground">
    Privacy and Security
  </h2>

  <p>
    Your images are processed inside your browser whenever possible. Files are
    not permanently stored, helping keep your personal photos and documents
    private during the resizing process.
  </p>

  <h2 className="text-2xl font-bold text-foreground">
    Frequently Asked Questions
  </h2>

  <h3 className="text-xl font-semibold text-foreground">
    Is Image Resizer Tool free?
  </h3>

  <p>
    Yes. You can resize images completely free without registration.
  </p>

  <h3 className="text-xl font-semibold text-foreground">
    Which image formats are supported?
  </h3>

  <p>
    JPG, JPEG, PNG, WebP and other common image formats can be resized.
  </p>

  <h3 className="text-xl font-semibold text-foreground">
    Does resizing reduce image quality?
  </h3>

  <p>
    Image quality depends on the selected dimensions. The tool keeps the best
    possible quality while creating the resized image.
  </p>

</section>
                {/* TOOL UI */}
        {!resizedUrl ? (
          <div className="space-y-6">

            <FileDropzone
              onFilesSelected={handleFileSelect}
              accept="image/*"
              multiple={false}
              label="Upload Image"
            />

            {file && (
              <Card className="p-6 space-y-6">

                <div className="grid grid-cols-2 gap-4">

                  <div className="space-y-2">
                    <Label>Width</Label>
                    <Input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Height</Label>
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>

                </div>

                <Button
                  onClick={processResize}
                  disabled={isProcessing}
                  className="w-full h-12 text-lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Move className="mr-2 h-5 w-5" />
                      Apply Resize
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
                    src={resizedUrl}
                    alt="resized image"
                    fill
                    className="object-contain"
                  />
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
                onClick={() => {
                  setFile(null);
                  setResizedUrl(null);
                }}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Resize Another
              </Button>

            </div>


          </div>
        )}

      </div>
    </ToolLayout>
  );
}
