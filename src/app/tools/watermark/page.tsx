"use client"

import React, { useState } from 'react';
import { Type, Download, Share2, Loader2, RefreshCw, SlidersHorizontal, Eye } from 'lucide-react';
import { ToolLayout } from '@/components/tool-layout';
import { FileDropzone } from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';

export default function WatermarkPage() {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState('DRAFT');
  const [opacity, setOpacity] = useState(30);
  const [rotation, setRotation] = useState(45);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
    setResultUrl(null);
  };

  const applyWatermark = async () => {
    if (!file || !watermarkText) return;

    setIsProcessing(true);

    try {
      const fileBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBytes);
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const pages = pdfDoc.getPages();

      pages.forEach((page) => {
        const { width, height } = page.getSize();

        page.drawText(watermarkText, {
          x: width / 2 - 100,
          y: height / 2,
          size: 50,
          font,
          color: rgb(0.5, 0.5, 0.5),
          opacity: opacity / 100,
          rotate: degrees(rotation),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setResultUrl(url);

      toast({
        title: "Watermark Applied",
        description: "PDF successfully processed.",
      });

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to apply watermark.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = `watermarked.pdf`;
    link.click();
  };

  return (
    <ToolLayout
      title="PDF Watermark Tool"
      description="Add text watermarks to PDF files for copyright protection, branding, or document security."
      icon={Type}
    >
      <div className="space-y-10">

        {/* 🔥 SEO CONTENT SECTION (ADSENSE BOOST) */}
        <section className="mt-10 space-y-6 border-t pt-10 text-muted-foreground leading-7">

          <h2 className="text-3xl font-bold text-foreground">
            About PDF Watermark Tool
          </h2>

          <p>
            The PDF Watermark tool helps you add visible text on your documents to protect them from unauthorized use.
            It is commonly used for business documents, study material, reports, and confidential files.
          </p>

          <h2 className="text-2xl font-bold text-foreground">
            How to Use This Tool
          </h2>

          <ol className="list-decimal pl-6 space-y-2">
            <li>Upload your PDF file.</li>
            <li>Enter watermark text (e.g. CONFIDENTIAL).</li>
            <li>Adjust opacity and rotation.</li>
            <li>Click Apply Watermark.</li>
            <li>Download your protected PDF.</li>
          </ol>

          <h2 className="text-2xl font-bold text-foreground">
            Benefits
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Protects documents from misuse</li>
            <li>Adds branding to PDFs</li>
            <li>Works online without software</li>
            <li>Fast and secure processing</li>
            <li>Free to use anytime</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground">
            FAQ
          </h2>

          <h3 className="text-xl font-semibold">Is this tool free?</h3>
          <p>Yes, completely free PDF watermark tool.</p>

          <h3 className="text-xl font-semibold">Is my file uploaded?</h3>
          <p>No, processing happens in your browser for privacy.</p>

        </section>

        {/* TOOL UI */}
        {!resultUrl ? (
          <div className="space-y-6">

            <FileDropzone
              onFilesSelected={handleFileSelect}
              multiple={false}
              accept="application/pdf"
              label="Upload PDF"
            />

            {file && (
              <Card className="p-6 space-y-6">

                <div className="space-y-3">
                  <Label>Watermark Text</Label>
                  <Input
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Opacity ({opacity}%)</Label>
                  <Slider
                    value={[opacity]}
                    onValueChange={(v) => setOpacity(v[0])}
                    min={0}
                    max={100}
                  />
                </div>

                <div>
                  <Label>Rotation ({rotation}°)</Label>
                  <Slider
                    value={[rotation]}
                    onValueChange={(v) => setRotation(v[0])}
                    min={0}
                    max={360}
                  />
                </div>

                <Button
                  onClick={applyWatermark}
                  disabled={isProcessing}
                  className="w-full h-12"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Type className="mr-2 h-5 w-5" />
                      Apply Watermark
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

                <div className="p-4 border-b bg-muted">
                  <Eye className="inline mr-2" />
                  Preview
                </div>

                <iframe
                  src={`${resultUrl}#toolbar=0`}
                  className="w-full h-[500px]"
                />

              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">

              <Button onClick={handleDownload}>
                Download
              </Button>

              <Button variant="outline">
                Share
              </Button>

            </div>

            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => {
                  setFile(null);
                  setResultUrl(null);
                }}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Watermark Another
              </Button>
            </div>

          </div>
        )}

      </div>
    </ToolLayout>
  );
}
