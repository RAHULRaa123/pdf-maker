"use client"

import React, { useState } from 'react';
import { Scissors, Download, Share2, Loader2, RefreshCw, FileText, Package } from 'lucide-react';
import { ToolLayout } from '@/components/tool-layout';
import { FileDropzone } from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';

export default function DecomposePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);
  const [pageCount, setPageCount] = useState(0);

  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
    setIsDone(false);
    setZipBlob(null);
  };

  const processDecompose = async () => {
    if (!file) return;

    setIsProcessing(true);

    try {
      const fileBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBytes);
      const count = pdfDoc.getPageCount();

      setPageCount(count);

      const zip = new JSZip();

      for (let i = 0; i < count; i++) {
        const newDoc = await PDFDocument.create();
        const [page] = await newDoc.copyPages(pdfDoc, [i]);
        newDoc.addPage(page);

        const pdfBytes = await newDoc.save();
        zip.file(`page-${i + 1}.pdf`, pdfBytes);
      }

      const content = await zip.generateAsync({ type: "blob" });
      setZipBlob(content);
      setIsDone(true);

      toast({
        title: "Split Complete",
        description: `Successfully extracted ${count} pages.`,
      });

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to split PDF.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!zipBlob) return;

    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'split-pages.zip';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="PDF Split Tool"
      description="Split large PDF files into individual pages and download them as a ZIP archive easily."
      icon={Scissors}
    >
      <div className="space-y-10">

        {/* 🔥 SEO CONTENT SECTION */}
        <section className="mt-10 space-y-6 border-t pt-10 text-muted-foreground leading-7">

          <h2 className="text-3xl font-bold text-foreground">
            About PDF Split Tool
          </h2>

          <p>
            The PDF Split tool allows you to break large PDF files into separate pages.
            Each page is saved as an individual PDF inside a ZIP file for easy download and sharing.
          </p>

          <h2 className="text-2xl font-bold text-foreground">
            How to Use This Tool
          </h2>

          <ol className="list-decimal pl-6 space-y-2">
            <li>Upload your PDF file.</li>
            <li>Click on Extract All Pages.</li>
            <li>Wait while pages are processed.</li>
            <li>Download ZIP file containing all pages.</li>
          </ol>

          <h2 className="text-2xl font-bold text-foreground">
            Benefits
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Split large PDFs easily</li>
            <li>Download pages separately</li>
            <li>Works fully in browser</li>
            <li>No file upload to server</li>
            <li>Fast processing</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground">
            FAQ
          </h2>

          <h3 className="text-xl font-semibold">Is this tool free?</h3>
          <p>Yes, it is completely free.</p>

          <h3 className="text-xl font-semibold">Are files uploaded?</h3>
          <p>No, everything runs locally in your browser.</p>

        </section>

        {/* TOOL UI */}
        {!isDone ? (
          <div className="space-y-6">

            <FileDropzone
              onFilesSelected={handleFileSelect}
              multiple={false}
              accept="application/pdf"
              label="Upload PDF file"
            />

            {file && (
              <Button
                onClick={processDecompose}
                disabled={isProcessing}
                className="w-full h-12"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Splitting...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-5 w-5" />
                    Extract Pages
                  </>
                )}
              </Button>
            )}

          </div>
        ) : (
          <div className="space-y-8">

            <div className="text-center p-10 border rounded-2xl">

              <Package className="mx-auto mb-4" size={40} />

              <h2 className="text-2xl font-bold">
                Split Complete
              </h2>

              <p className="text-muted-foreground mt-2">
                {pageCount} pages extracted successfully
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">

                <Button onClick={handleDownload}>
                  Download ZIP
                </Button>

                <Button variant="outline">
                  Share
                </Button>

              </div>

            </div>

            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => {
                  setIsDone(false);
                  setFile(null);
                  setZipBlob(null);
                }}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Split Another PDF
              </Button>
            </div>

          </div>
        )}

      </div>
    </ToolLayout>
  );
}
