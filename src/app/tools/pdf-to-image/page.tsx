"use client"

import React, { useState } from 'react';
import { Image as ImageIcon, Download, Loader2, RefreshCw, FileType } from 'lucide-react';
import { ToolLayout } from '@/components/tool-layout';
import { FileDropzone } from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import * as pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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

      const imageUrls: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) continue;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport
        }).promise;

        imageUrls.push(canvas.toDataURL('image/png'));
      }

      setImages(imageUrls);

      toast({
        title: "Conversion Complete",
        description: `${imageUrls.length} pages converted into images.`,
      });

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Conversion Failed",
        description: "Unable to convert PDF to images.",
      });
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
      title="PDF to Image Converter"
      description="Convert PDF pages into high-quality PNG images instantly and download each page separately."
      icon={ImageIcon}
    >
      <div className="space-y-10">

        {/* 🔥 SEO CONTENT SECTION */}
        <section className="mt-10 space-y-6 border-t pt-10 text-muted-foreground leading-7">

          <h2 className="text-3xl font-bold text-foreground">
            About PDF to Image Converter
          </h2>

          <p>
            The PDF to Image tool allows you to convert each page of a PDF document into high-quality images.
            This is useful for sharing pages on social media, extracting content, presentations, and offline viewing.
          </p>

          <h2 className="text-2xl font-bold text-foreground">
            How to Use This Tool
          </h2>

          <ol className="list-decimal pl-6 space-y-2">
            <li>Upload your PDF file.</li>
            <li>Click on Convert PDF to Images button.</li>
            <li>Wait while pages are processed.</li>
            <li>Download images individually.</li>
          </ol>

          <h2 className="text-2xl font-bold text-foreground">
            Benefits
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>High-quality image output</li>
            <li>No software installation required</li>
            <li>Works on all devices</li>
            <li>Fast and easy conversion</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground">
            FAQ
          </h2>

          <h3 className="text-xl font-semibold">Is this tool free?</h3>
          <p>Yes, it is completely free to use.</p>

          <h3 className="text-xl font-semibold">What format is output?</h3>
          <p>All pages are converted into PNG images.</p>

        </section>

        {/* TOOL UI */}
        {images.length === 0 ? (
          <div className="space-y-6">

            <FileDropzone
              onFilesSelected={handleFileSelect}
              multiple={false}
              accept="application/pdf"
              label="Select PDF file"
            />

            {file && (
              <Button
                onClick={convertPdfToImages}
                className="w-full h-12 text-lg rounded-xl bg-accent"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Converting...
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
          <div className="space-y-8">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {images.map((img, idx) => (
                <Card key={idx} className="overflow-hidden shadow-lg">
                  <CardContent className="p-0">

                    <div className="relative aspect-[3/4] w-full bg-muted/30">
                      <Image
                        src={img}
                        alt={`Page ${idx + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="p-4 flex justify-between items-center border-t">
                      <span className="text-sm font-bold">Page {idx + 1}</span>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(img, idx)}
                      >
                        Download
                      </Button>
                    </div>

                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center pt-6 border-t">
              <Button
                variant="ghost"
                onClick={() => {
                  setImages([]);
                  setFile(null);
                }}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Convert Another PDF
              </Button>
            </div>

          </div>
        )}

      </div>
    </ToolLayout>
  );
}
