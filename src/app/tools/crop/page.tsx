"use client"

import React, { useState, useRef } from 'react';
import { Crop, Download, Loader2, RefreshCw, Eye } from 'lucide-react';
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
    const selected = files[0] || null;
    setFile(selected);
    setResultUrl(null);
    setImgSrc('');

    if (selected) {
      const reader = new FileReader();
      reader.onload = () => setImgSrc(reader.result?.toString() || '');
      reader.readAsDataURL(selected);
    }
  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;

    const initialCrop = centerCrop(
      makeAspectCrop(
        { unit: '%', width: 90 },
        1,
        width,
        height
      ),
      width,
      height
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
      if (!ctx) throw new Error("Canvas error");

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      const result = canvas.toDataURL('image/png');
      setResultUrl(result);

      toast({
        title: "Crop Complete",
        description: "Image successfully cropped.",
      });

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Crop Failed",
        description: "Unable to process image crop.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = `cropped-image.png`;
    link.click();
  };

  return (
    <ToolLayout
      title="Image Crop Tool"
      description="Crop and trim images precisely for social media, websites, thumbnails, and professional design use."
      icon={Crop}
    >
      <div className="space-y-10">

        {/* 🔥 SEO CONTENT SECTION */}
        <section className="mt-10 space-y-6 border-t pt-10 text-muted-foreground leading-7">

          <h2 className="text-3xl font-bold text-foreground">
            About Image Crop Tool
          </h2>

          <p>
            The Image Crop tool allows you to remove unwanted parts of an image and focus only on the important area.
            It is widely used for profile pictures, social media posts, banners, and professional editing.
          </p>

          <h2 className="text-2xl font-bold text-foreground">
            How to Use This Tool
          </h2>

          <ol className="list-decimal pl-6 space-y-2">
            <li>Upload an image file.</li>
            <li>Select crop area using drag tool.</li>
            <li>Choose aspect ratio if needed.</li>
            <li>Click Apply Crop.</li>
            <li>Download your cropped image.</li>
          </ol>

          <h2 className="text-2xl font-bold text-foreground">
            Benefits
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Precise image cropping</li>
            <li>Supports multiple aspect ratios</li>
            <li>No software installation required</li>
            <li>Works on mobile and desktop</li>
            <li>Free and fast tool</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground">
            FAQ
          </h2>

          <h3 className="text-xl font-semibold">Is this tool free?</h3>
          <p>Yes, completely free to use.</p>

          <h3 className="text-xl font-semibold">Can I crop to custom size?</h3>
          <p>Yes, you can freely adjust crop area or use presets.</p>

        </section>

        {/* TOOL UI */}
        {!resultUrl ? (
          <div className="space-y-6">

            {!imgSrc ? (
              <FileDropzone
                onFilesSelected={onSelectFile}
                multiple={false}
                accept="image/*"
                label="Upload Image"
              />
            ) : (
              <Card className="p-6 space-y-6">

                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm" onClick={() => setCrop(undefined)}>
                    Free
                  </Button>

                  <Button variant="outline" size="sm">
                    1:1
                  </Button>

                  <Button variant="outline" size="sm">
                    16:9
                  </Button>

                  <Button variant="outline" size="sm">
                    4:5
                  </Button>
                </div>

                <div className="flex justify-center">
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                  >
                    <img
                      ref={imgRef}
                      src={imgSrc}
                      alt="crop"
                      onLoad={onImageLoad}
                      className="max-w-full"
                    />
                  </ReactCrop>
                </div>

                <Button
                  onClick={getCroppedImg}
                  disabled={isProcessing || !completedCrop}
                  className="w-full h-12 text-lg"
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

              </Card>
            )}

          </div>
        ) : (
          <div className="space-y-8">

            <Card>
              <CardContent className="p-0">

                <div className="bg-muted p-4 flex items-center gap-2">
                  <Eye size={16} />
                  Cropped Preview
                </div>

                <img
                  src={resultUrl}
                  alt="cropped"
                  className="w-full object-contain"
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
                  setImgSrc('');
                  setResultUrl(null);
                }}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Crop Another
              </Button>
            </div>

          </div>
        )}

      </div>
    </ToolLayout>
  );
}
