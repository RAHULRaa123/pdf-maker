"use client"

import React, { useState } from 'react';
import { FilePlus2, Download, Loader2, RefreshCw, Eye } from 'lucide-react';
import { ToolLayout } from '@/components/tool-layout';
import { FileDropzone } from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { jsPDF } from 'jspdf';
import { Card, CardContent } from '@/components/ui/card';

export default function MergePdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleFilesSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const processMerge = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);

    try {
      const doc = new jsPDF();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const fileData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        if (i > 0) doc.addPage();

        const img = new Image();
        img.src = fileData;

        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const imgProps = doc.getImageProperties(fileData);

        const ratio = Math.min(pageWidth / imgProps.width, pageHeight / imgProps.height);
        const width = imgProps.width * ratio;
        const height = imgProps.height * ratio;

        const x = (pageWidth - width) / 2;
        const y = (pageHeight - height) / 2;

        doc.addImage(fileData, 'JPEG', x, y, width, height);
      }

      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

      toast({
        title: "PDF Merged Successfully",
        description: `${files.length} files combined into one PDF.`,
      });

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Merge Failed",
        description: "Unable to merge PDF files.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = "merged-file.pdf";
    link.click();
  };

  const startOver = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
    setFiles([]);
  };

  return (
    <ToolLayout
      title="Merge PDF Tool"
      description="Combine multiple PDF or image files into a single organized document instantly."
      icon={FilePlus2}
    >
      <div className="space-y-10">

        {/* 🔥 SEO CONTENT SECTION */}
        <section className="mt-10 space-y-6 border-t pt-10 text-muted-foreground leading-7">

          <h2 className="text-3xl font-bold text-foreground">
            About Merge PDF Tool
          </h2>

          <p>
            Merge PDF is a free online tool that allows you to combine multiple PDF files
            or images into a single document. It is useful for students, office workers,
            teachers, and professionals who need to organize multiple files into one PDF.
          </p>

          <h2 className="text-2xl font-bold text-foreground">
            How to Use This Tool
          </h2>

          <ol className="list-decimal pl-6 space-y-2">
            <li>Upload multiple PDF or image files.</li>
            <li>Arrange files in correct order.</li>
            <li>Click on Merge PDF button.</li>
            <li>Wait while files are processed.</li>
            <li>Download your merged PDF file.</li>
          </ol>

          <h2 className="text-2xl font-bold text-foreground">
            Benefits of Using Merge PDF
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Combine multiple files in seconds</li>
            <li>No installation required</li>
            <li>Works on mobile and desktop</li>
            <li>Completely free to use</li>
            <li>Secure file processing</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold text-foreground">
            Is Merge PDF tool free?
          </h3>
          <p>Yes, it is completely free to use.</p>

          <h3 className="text-xl font-semibold text-foreground">
            Can I merge images and PDFs together?
          </h3>
          <p>Yes, you can combine both images and PDF files easily.</p>

          <h3 className="text-xl font-semibold text-foreground">
            Is my data safe?
          </h3>
          <p>Yes, files are processed securely and not stored permanently.</p>

        </section>

        {/* TOOL UI */}
        {!pdfUrl ? (
          <div className="space-y-6">

            <FileDropzone
              onFilesSelected={handleFilesSelect}
              accept=".pdf,image/*"
              label="Select PDF or Image files"
            />

            {files.length > 0 && (
              <div className="flex flex-col gap-4">

                <div className="flex justify-between text-sm text-muted-foreground px-2">
                  <span>{files.length} files selected</span>
                  <span>
                    {(files.reduce((a, f) => a + f.size, 0) / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>

                <Button
                  onClick={processMerge}
                  disabled={isProcessing}
                  className="w-full h-12 text-lg rounded-xl"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Merging Files...
                    </>
                  ) : (
                    <>
                      <FilePlus2 className="mr-2 h-5 w-5" />
                      Merge PDF
                    </>
                  )}
                </Button>

              </div>
            )}

          </div>
        ) : (
          <div className="space-y-6">

            <Card>
              <CardContent className="p-0">
                <div className="p-4 border-b bg-muted flex items-center gap-2">
                  <Eye size={18} />
                  <h3 className="font-semibold">Merged PDF Preview</h3>
                </div>

                <iframe
                  src={`${pdfUrl}#toolbar=0`}
                  className="w-full h-[500px]"
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handleDownload} className="h-12">
                <Download className="mr-2 h-5 w-5" /> Download
              </Button>

              <Button variant="outline" className="h-12">
                <RefreshCw className="mr-2 h-5 w-5" /> Start Over
              </Button>
            </div>

          </div>
        )}

      </div>
    </ToolLayout>
  );
}
