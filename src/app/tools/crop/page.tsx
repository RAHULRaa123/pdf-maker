
"use client"

import React, { useState, useRef } from 'react';
import { Crop, Download, Share2, Loader2, RefreshCw, SlidersHorizontal, Eye } from 'lucide-react';
import { ToolLayout } from '@/components/tool-layout';
import { FileDropzone } from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import ReactCrop, { type Crop as CropType, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function CropPage() {
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState<CropType>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const onSelectFile = (files: File[]) => {
    if (files.length > 0) {
      const selected = files[0];
      setFile(selected);
      setResultUrl(null);
      
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      );
      reader.readAsDataURL(selected);
    }
  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const initialCrop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1, // Default to square
        width,
        height,
      ),
      width,
      height,
    );
    setCrop(initialCrop);
  }

  const getCroppedImg = async () => {
    if (!completedCrop || !imgRef.current) return;

    setIsProcessing(true);
    try {
      const image = imgRef.current;
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      
      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('No 2d context');

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height,
      );

      const base64Image = canvas.toDataURL('image/png');
      setResultUrl(base64Image);
      toast({ title: "Image Cropped", description: "Successfully applied your adjustments." });
    } catch (e) {
      console.error(e);
      toast({ variant: "destructive", title: "Error", description: "Failed to crop image." });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = `cropped-${file?.name || 'image.png'}`;
    link.click();
  };

  return (
    <ToolLayout
      title="Image Cropper"
      description="Precisely trim your images to specific aspect ratios for professional layouts and social media."
      icon={Crop}
    >
      <div className="space-y-8">
        {!resultUrl ? (
          <div className="space-y-6">
            {!imgSrc ? (
              <FileDropzone 
                onFilesSelected={onSelectFile} 
                multiple={false} 
                accept="image/*"
                label="Select image to crop"
              />
            ) : (
              <Card className="border-none shadow-sm overflow-hidden rounded-2xl bg-card">
                <CardContent className="p-6 space-y-6">
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    <Button variant="outline" size="sm" onClick={() => setCrop(undefined)}>Free</Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      if (imgRef.current) {
                        const { width, height } = imgRef.current;
                        setCrop(centerCrop(makeAspectCrop({ unit: '%', width: 90 }, 1, width, height), width, height));
                      }
                    }}>1:1 Square</Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      if (imgRef.current) {
                        const { width, height } = imgRef.current;
                        setCrop(centerCrop(makeAspectCrop({ unit: '%', width: 90 }, 16/9, width, height), width, height));
                      }
                    }}>16:9 Wide</Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      if (imgRef.current) {
                        const { width, height } = imgRef.current;
                        setCrop(centerCrop(makeAspectCrop({ unit: '%', width: 90 }, 4/5, width, height), width, height));
                      }
                    }}>4:5 Portrait</Button>
                  </div>

                  <div className="max-h-[60vh] overflow-auto flex justify-center bg-muted/20 rounded-xl p-4">
                    <ReactCrop
                      crop={crop}
                      onChange={(c) => setCrop(c)}
                      onComplete={(c) => setCompletedCrop(c)}
                    >
                      <img
                        ref={imgRef}
                        alt="Crop me"
                        src={imgSrc}
                        onLoad={onImageLoad}
                        className="max-w-full"
                      />
                    </ReactCrop>
                  </div>

                  <Button 
                    onClick={getCroppedImg} 
                    className="w-full h-12 text-lg rounded-xl bg-accent hover:bg-accent/90" 
                    disabled={isProcessing || !completedCrop}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Cropping...
                      </>
                    ) : (
                      <>
                        <Crop className="mr-2 h-5 w-5" />
                        Apply Crop
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
                   <h3 className="font-bold flex items-center gap-2"><Eye size={18}/> Cropped Preview</h3>
                </div>
                <div className="relative aspect-video w-full bg-muted/30 p-4">
                  <div className="relative w-full h-full flex justify-center">
                    <img 
                      src={resultUrl} 
                      alt="Cropped result" 
                      className="object-contain max-h-full shadow-2xl"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button size="lg" onClick={handleDownload} className="w-full rounded-xl bg-primary h-14 text-lg">
                <Download className="mr-2 h-6 w-6" /> Download Result
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => {
                  toast({ title: "Sharing", description: "Sharing system dialog will open." });
                }} 
                className="w-full rounded-xl h-14 text-lg border-2"
              >
                <Share2 className="mr-2 h-6 w-6" /> Share Image
              </Button>
            </div>
            
            <div className="text-center pt-4">
               <Button 
                variant="ghost" 
                onClick={() => {setResultUrl(null); setFile(null); setImgSrc('');}} 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Start New Crop
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
