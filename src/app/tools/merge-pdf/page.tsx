"use client"

import React, { useState } from 'react';
import { Combine, Download, Share2, Loader2, RefreshCw, ListOrdered, Eye } from 'lucide-react';
import { ToolLayout } from '@/components/tool-layout';
import { FileDropzone } from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { PDFDocument } from 'pdf-lib';
import { Card, CardContent } from '@/components/ui/card';

export default function MergePdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);

  const handleFilesSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const processMerge = async () => {
    if (files.length < 2) {
      toast({
        variant: "destructive",
        title: "Wait",
        description: "Select at least 2 PDF files to merge."
      });
      return;
    }

    setIsProcessing(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const fileBytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setMergedPdfUrl(url);

      toast({
        title: "Merge Complete",
        description: `${files.length} files successfully merged into one PDF.`,
      });

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Merge Failed",
        description: "Could not combine the PDF files.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!mergedPdfUrl) return;
    const link = document.createElement('a');
    link.href = mergedPdfUrl;
    link.download = "merged-document.pdf";
    link.click();
  };

  const startOver = () => {
    if (mergedPdfUrl) URL.revokeObjectURL(mergedPdfUrl);
    setMergedPdfUrl(null);
    setFiles([]);
  };

  return (
    <ToolLayout
      title="Smart PDF Merger"
      description="Combine multiple PDF files into one organized document instantly."
      icon={Combine}
    >
      <div className="space-y-10">

        {/* 🔥 SEO CONTENT SECTION (ADSENSE IMPROVEMENT) */}
        <section className="mt-10 space-y-6 border-t pt-10 text-muted-foreground leading-7">

          <h2 className="text-3xl font-bold text-foreground">
            About PDF Merge Tool
          </h2>

          <p>
            The PDF Merge tool allows you to combine multiple PDF files into a single document.
            It is widely used by students, office professionals, teachers, and businesses to organize
            multiple documents into one structured file for easy sharing and management.
          </p>

          <h2 className="text-2xl font-bold text-foreground">
            How to Use This Tool
          </h2>

          <ol className="list-decimal pl-6 space-y-2">
            <li>Upload two or more PDF files.</li>
            <li>Arrange them in the desired order (upload order is maintained).</li>
            <li>Click on Merge All Files button.</li>
            <li>Wait for processing to complete.</li>
            <li>Download your merged PDF instantly.</li>
          </ol>

          <h2 className="text-2xl font-bold text-foreground">
            Benefits of Using PDF Merger
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Combine multiple PDFs in seconds</li>
            <li>No software installation required</li>
            <li>Works on mobile, tablet, and desktop</li>
            <li>Completely free and easy to use</li>
            <li>Secure and fast processing</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold text-foreground">
            Is this PDF merger free?
          </h3>
          <p>Yes, this tool is completely free to use.</p>

          <h3 className="text-xl font-semibold text-foreground">
            Is there any file limit?
          </h3>
          <p>You can upload multiple PDF files, depending on your browser performance.</p>

          <h3 className="text-xl font-semibold text-foreground">
            Is my data safe?
          </h3>
          <p>Yes, files are processed securely and are not stored on servers.</p>

        </section>

        {/* TOOL UI */}
        {!mergedPdfUrl ? (
          <div className="space-y-6">

            <FileDropzone
              onFilesSelected={handleFilesSelect}
              accept="application/pdf"
              label="Select PDF files to merge"
            />

            {files.length > 0 && (
              <div className="flex flex-col gap-4">

                <div className="flex items-center justify-between text-sm text-muted-foreground px-2">
                  <span>{files.length} PDFs selected</span>
                  <span className="flex items-center gap-1">
                    <ListOrdered size={14} />
                    Order maintained
                  </span>
                </div>

                <Button
                  onClick={processMerge}
                  className="w-full h-12 text-lg rounded-xl bg-accent hover:bg-accent/90"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Merging PDFs...
                    </>
                  ) : (
                    <>
                      <Combine className="mr-2 h-5 w-5" />
                      Merge All Files
                    </>
                  )}
                </Button>

              </div>
            )}

          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <Card className="overflow-hidden border-none shadow-lg">
              <CardContent className="p-0">

                <div className="bg-secondary/20 p-4 border-b flex items-center gap-2">
                  <Eye size={18} />
                  <h3 className="font-bold">Merged PDF Preview</h3>
                </div>

                <iframe
                  src={`${mergedPdfUrl}#toolbar=0`}
                  className="w-full h-[500px] border-none"
                />

              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Button
                size="lg"
                onClick={handleDownload}
                className="rounded-xl bg-primary h-12 text-lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Merged
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-xl h-12 text-lg border-2"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share PDF
              </Button>

            </div>

            <div className="text-center">
              <Button variant="ghost" onClick={startOver}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Start New Merge
              </Button>
            </div>

          </div>
        )}

      </div>
    </ToolLayout>
  );
}
