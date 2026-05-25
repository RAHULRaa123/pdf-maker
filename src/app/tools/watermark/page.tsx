
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
    if (files.length > 0) {
      setFile(files[0]);
      setResultUrl(null);
    } else {
      setFile(null);
    }
  };

  const applyWatermark = async () => {
    if (!file || !watermarkText) return;

    setIsProcessing(true);
    try {
      const fileBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBytes);
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();

      for (const page of pages) {
        const { width, height } = page.getSize();
        page.drawText(watermarkText, {
          x: width / 2 - 100,
          y: height / 2,
          size: 50,
          font: font,
          color: rgb(0.5, 0.5, 0.5),
          opacity: opacity / 100,
          rotate: degrees(rotation),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setResultUrl(url);
      toast({ 
        title: "Watermark applied", 
        description: `Successfully protected ${pages.length} pages.` 
      });
    } catch (error) {
      console.error(error);
      toast({ 
        variant: "destructive", 
        title: "Error", 
        description: "Failed to apply watermark. Please try a different PDF." 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = `watermarked-${file?.name || 'document.pdf'}`;
    link.click();
  };

  return (
    <ToolLayout
      title="Watermark PDF"
      description="Add professional text watermarks to your documents to prevent unauthorized distribution."
      icon={Type}
    >
      <div className="space-y-8">
        {!resultUrl ? (
          <div className="space-y-6">
            <FileDropzone 
              onFilesSelected={handleFileSelect} 
              multiple={false} 
              accept="application/pdf"
              label="Select PDF to watermark"
            />
            
            {file && (
              <Card className="border-none shadow-sm overflow-hidden rounded-2xl bg-card">
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="watermark-text">Watermark Text</Label>
                      <Input 
                        id="watermark-text"
                        value={watermarkText}
                        onChange={(e) => setWatermarkText(e.target.value)}
                        placeholder="e.g. CONFIDENTIAL"
                        className="h-12 rounded-xl"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-semibold flex items-center gap-2">
                          <SlidersHorizontal size={14} className="text-accent" />
                          Opacity
                        </Label>
                        <span className="text-accent font-bold">{opacity}%</span>
                      </div>
                      <Slider 
                        value={[opacity]} 
                        onValueChange={(vals) => setOpacity(vals[0])} 
                        min={0} 
                        max={100} 
                        step={1}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-semibold flex items-center gap-2">
                          <RefreshCw size={14} className="text-accent" />
                          Rotation
                        </Label>
                        <span className="text-accent font-bold">{rotation}°</span>
                      </div>
                      <Slider 
                        value={[rotation]} 
                        onValueChange={(vals) => setRotation(vals[0])} 
                        min={0} 
                        max={360} 
                        step={1}
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={applyWatermark} 
                    className="w-full h-12 text-lg rounded-xl bg-accent hover:bg-accent/90" 
                    disabled={isProcessing}
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
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="overflow-hidden border-none shadow-lg bg-card">
              <CardContent className="p-0">
                <div className="bg-secondary/20 p-4 border-b">
                   <h3 className="font-bold flex items-center gap-2"><Eye size={18}/> Preview</h3>
                </div>
                <div className="relative aspect-[3/4] w-full bg-muted/30">
                  <iframe 
                    src={`${resultUrl}#toolbar=0`} 
                    className="w-full h-full border-none"
                    title="Watermark Preview"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button size="lg" onClick={handleDownload} className="w-full rounded-xl bg-primary h-14 text-lg">
                <Download className="mr-2 h-6 w-6" /> Download Protected PDF
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => {
                  toast({ title: "Sharing initiated", description: "Sharing system dialog will open shortly." });
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
                <RefreshCw className="mr-2 h-4 w-4" /> Watermark Another PDF
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
