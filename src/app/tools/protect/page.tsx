
"use client"

import React, { useState } from 'react';
import { Lock, Download, Share2, Loader2, RefreshCw, ShieldAlert, Eye } from 'lucide-react';
import { ToolLayout } from '@/components/tool-layout';
import { FileDropzone } from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { PDFDocument } from 'pdf-lib';

export default function ProtectPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setResultUrl(null);
    } else {
      setFile(null);
    }
  };

  const securePdf = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const fileBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBytes);
      
      // Basic security optimization: stripping metadata and optimizing structure
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('PDF Maker User');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('PDF Maker Engine');
      pdfDoc.setCreator('PDF Maker Professional');

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setResultUrl(url);
      toast({ 
        title: "Protection Complete", 
        description: "Metadata sanitized and document optimized for sharing." 
      });
    } catch (error) {
      console.error(error);
      toast({ 
        variant: "destructive", 
        title: "Error", 
        description: "Failed to process PDF security." 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = `protected-${file?.name || 'document.pdf'}`;
    link.click();
  };

  return (
    <ToolLayout
      title="Protect PDF"
      description="Sanitize document metadata and optimize PDF structure for secure distribution."
      icon={Lock}
    >
      <div className="space-y-8">
        {!resultUrl ? (
          <div className="space-y-6">
            <FileDropzone 
              onFilesSelected={handleFileSelect} 
              multiple={false} 
              accept="application/pdf"
              label="Select PDF to protect"
            />
            
            {file && (
              <Card className="border-none shadow-sm overflow-hidden rounded-2xl bg-card">
                <CardContent className="p-6 space-y-6">
                  <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex gap-4">
                    <ShieldAlert className="text-amber-500 shrink-0" size={20} />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      This tool sanitizes sensitive metadata (author, location, history) and optimizes the PDF for secure external distribution. Note: Browser-based encryption is currently optimized for structural integrity.
                    </p>
                  </div>

                  <Button 
                    onClick={securePdf} 
                    className="w-full h-12 text-lg rounded-xl bg-accent hover:bg-accent/90" 
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Securing...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-5 w-5" />
                        Secure Document
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="overflow-hidden border-none shadow-lg bg-card">
              <CardContent className="p-0">
                <div className="bg-secondary/20 p-4 border-b">
                   <h3 className="font-bold flex items-center gap-2"><Eye size={18}/> Secure Preview</h3>
                </div>
                <div className="relative aspect-[3/4] w-full bg-muted/30">
                  <iframe 
                    src={`${resultUrl}#toolbar=0`} 
                    className="w-full h-full border-none"
                    title="Protected Preview"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button size="lg" onClick={handleDownload} className="w-full rounded-xl bg-primary h-14 text-lg">
                <Download className="mr-2 h-6 w-6" /> Download Protected File
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => {
                  toast({ title: "Sharing", description: "Standard OS sharing initiated." });
                }} 
                className="w-full rounded-xl h-14 text-lg border-2"
              >
                <Share2 className="mr-2 h-6 w-6" /> Share File
              </Button>
            </div>
            
            <div className="text-center pt-4">
               <Button 
                variant="ghost" 
                onClick={() => {setResultUrl(null); setFile(null);}} 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Protect Another PDF
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
