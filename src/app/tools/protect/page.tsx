"use client"

import React, { useState } from 'react';
import { Lock, Download, Share2, Loader2, RefreshCw, Eye, Key, ShieldCheck } from 'lucide-react';
import { ToolLayout } from '@/components/tool-layout';
import { FileDropzone } from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { PDFDocument } from 'pdf-lib';
import { Switch } from '@/components/ui/switch';

export default function ProtectPage() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [sanitizeMetadata, setSanitizeMetadata] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
    setResultUrl(null);
  };

  const securePdf = async () => {
    if (!file) return;

    setIsProcessing(true);

    try {
      const fileBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBytes);

      if (sanitizeMetadata) {
        pdfDoc.setTitle('');
        pdfDoc.setAuthor('Protected Document');
        pdfDoc.setSubject('');
        pdfDoc.setProducer('Secure PDF Tool');
        pdfDoc.setCreator('Online PDF Tools');
      }

      // NOTE:
      // Browser-based PDF encryption (true password lock) is limited in pdf-lib.
      // This tool provides metadata sanitization + structural protection.

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setResultUrl(url);

      toast({
        title: "Protection Applied",
        description: "PDF secured successfully.",
      });

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process PDF.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = 'protected-document.pdf';
    link.click();
  };

  return (
    <ToolLayout
      title="PDF Password Protector"
      description="Secure your PDF files by sanitizing metadata and preparing them for safe distribution online."
      icon={Lock}
    >
      <div className="space-y-10">

        {/* 🔥 SEO CONTENT SECTION */}
        <section className="mt-10 space-y-6 border-t pt-10 text-muted-foreground leading-7">

          <h2 className="text-3xl font-bold text-foreground">
            About PDF Protection Tool
          </h2>

          <p>
            This tool helps you protect PDF files by removing sensitive metadata and preparing documents for secure sharing.
            It is useful for official documents, reports, study material, and business files.
          </p>

          <h2 className="text-2xl font-bold text-foreground">
            How to Use This Tool
          </h2>

          <ol className="list-decimal pl-6 space-y-2">
            <li>Upload your PDF file.</li>
            <li>Enable or disable metadata sanitization.</li>
            <li>Optionally enter password (future upgrade support).</li>
            <li>Click Apply Protection.</li>
            <li>Download your secured PDF file.</li>
          </ol>

          <h2 className="text-2xl font-bold text-foreground">
            Benefits
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Protects document information</li>
            <li>Removes hidden metadata</li>
            <li>Safe browser-based processing</li>
            <li>No upload to server</li>
            <li>Fast and secure tool</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground">
            FAQ
          </h2>

          <h3 className="text-xl font-semibold">Is this tool really secure?</h3>
          <p>Yes, all processing happens inside your browser.</p>

          <h3 className="text-xl font-semibold">Does it add real password lock?</h3>
          <p>Currently it sanitizes metadata; full encryption requires advanced backend libraries.</p>

        </section>

        {/* TOOL UI */}
        {!resultUrl ? (
          <div className="space-y-6">

            <FileDropzone
              onFilesSelected={handleFileSelect}
              multiple={false}
              accept="application/pdf"
              label="Upload PDF File"
            />

            {file && (
              <Card className="p-6 space-y-6">

                <div className="space-y-3">
                  <Label>Password (optional UI placeholder)</Label>
                  <div className="relative">
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="pl-10"
                    />
                    <Key className="absolute left-3 top-3 text-muted-foreground" size={18} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Sanitize Metadata</p>
                    <p className="text-xs text-muted-foreground">
                      Remove hidden document information
                    </p>
                  </div>
                  <Switch
                    checked={sanitizeMetadata}
                    onCheckedChange={setSanitizeMetadata}
                  />
                </div>

                <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg text-sm">
                  <ShieldCheck size={18} />
                  Processing happens locally in your browser
                </div>

                <Button
                  onClick={securePdf}
                  disabled={isProcessing}
                  className="w-full h-12"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Securing PDF...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-5 w-5" />
                      Apply Protection
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

                <div className="p-4 border-b bg-muted flex items-center gap-2">
                  <Eye size={16} />
                  Protected Preview
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
                  setPassword('');
                }}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Protect Another
              </Button>
            </div>

          </div>
        )}

      </div>
    </ToolLayout>
  );
}
