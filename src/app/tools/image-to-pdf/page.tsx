"use client"

import React, { useState } from 'react';
import { FileImage, Download, Share2, Loader2, RefreshCw, Layers, Eye } from 'lucide-react';
import { ToolLayout } from '@/components/tool-layout';
import { FileDropzone } from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { jsPDF } from 'jspdf';
import { Card, CardContent } from '@/components/ui/card';

export default function ImageToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleFilesSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const processConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);

    try {
      const doc = new jsPDF();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const imgData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        if (i > 0) doc.addPage();

        const img = new Image();
        img.src = imgData;

        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const imgProps = doc.getImageProperties(imgData);

        const ratio = Math.min(pageWidth / imgProps.width, pageHeight / imgProps.height);
        const width = imgProps.width * ratio;
        const height = imgProps.height * ratio;

        const x = (pageWidth - width) / 2;
        const y = (pageHeight - height) / 2;

        doc.addImage(imgData, 'JPEG', x, y, width, height);
      }

      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

      toast({
        title: "PDF Created Successfully",
        description: `${files.length} images combined into one PDF.`,
      });

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Conversion Failed",
        description: "Unable to generate PDF. Try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = "converted-images.pdf";
    link.click();
  };

  const startOver = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
    setFiles([]);
  };

  return (
    <ToolLayout
      title="Image to PDF Converter"
      description="Convert multiple images into a single high-quality PDF file instantly."
      icon={FileImage}
    >
      <div className="space-y-10">

        {/* 🔥 SEO CONTENT FOR ADSENSE */}
        <section className="mt-10 space-y-6 border-t pt-10 text-muted-foreground leading-7">

          <h2 className="text-3xl font-bold text-foreground">
            About Image to PDF Converter
          </h2>

          <p>
            Image to PDF is a free online tool that allows you to convert JPG, PNG,
            WebP, BMP, and other image formats into a single PDF document. This tool is
            useful for students, office workers, teachers, freelancers, and anyone who
            needs to organize multiple images into one professional PDF file.
          </p>

          <h2 className="text-2xl font-bold text-foreground">
            How to Use This Tool
          </h2>

          <ol className="list-decimal pl-6 space-y-2">
            <li>Select one or more images from your device.</li>
            <li>Arrange images in correct order.</li>
            <li>Click on Generate PDF button.</li>
            <li>Wait for processing to complete.</li>
            <li>Download your PDF file instantly.</li>
          </ol>

          <h2 className="text-2xl font-bold text-foreground">
            Benefits
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Fast and free conversion</li>
            <li>No software installation required</li>
            <li>Works on mobile and desktop</li>
            <li>Supports multiple image formats</li>
            <li>High-quality PDF output</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold text-foreground">
            Is this tool free?
          </h3>
          <p>Yes, it is completely free to use.</p>

          <h3 className="text-xl font-semibold text-foreground">
            Which formats are supported?
          </h3>
          <p>JPG, PNG, WebP, BMP and most image formats are supported.</p>

          <h3 className="text-xl font-semibold text-foreground">
            Can I use it on mobile?
          </h3>
          <p>Yes, it works on all smartphones, tablets and computers.</p>

        </section>

        {/* TOOL UI */}
        {!pdfUrl ? (
          <div className="space-y-6">
            <FileDropzone
              onFilesSelected={handleFilesSelect}
              accept="image/*"
              label="Select images to convert"
            />

            {files.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between text-sm text-muted-foreground px-2">
                  <span>{files.length} images selected</span>
                  <span>
                    {(files.reduce((a, f) => a + f.size, 0) / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>

                <Button
                  onClick={processConvert}
                  className="w-full h-12 text-lg rounded-xl bg-accent"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating PDF...
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
          <div className="space-y-6">

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4 border-b bg-muted">
                  <h3 className="flex items-center gap-2 font-semibold">
                    <Eye size={18} /> PDF Preview
                  </h3>
                </div>

                <iframe
                  src={`${pdfUrl}#toolbar=0`}
                  className="w-full h-[500px]"
                  title="PDF Preview"
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handleDownload} className="h-12">
                <Download className="mr-2 h-5 w-5" /> Download
              </Button>

              <Button variant="outline" className="h-12">
                <Share2 className="mr-2 h-5 w-5" /> Share
              </Button>
            </div>

            <div className="text-center">
              <Button variant="ghost" onClick={startOver}>
                <RefreshCw className="mr-2 h-4 w-4" /> Start Again
              </Button>
            </div>

          </div>
        )}

      </div>
    </ToolLayout>
  );
}
