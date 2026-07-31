"use client"

import React, { useState } from 'react';
import { ShieldCheck, Download, Share2, Loader2, RefreshCw, Eye, Trash2 } from 'lucide-react';
import { ToolLayout } from '@/components/tool-layout';
import { FileDropzone } from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { PDFDocument } from 'pdf-lib';

export default function ProtectPage() {

  const [file, setFile] = useState<File | null>(null);
  const [sanitizeMetadata, setSanitizeMetadata] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);


  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
    setResultUrl(null);
  };


  const cleanPdf = async () => {

    if (!file) return;

    setIsProcessing(true);

    try {

      const fileBytes = await file.arrayBuffer();

      const pdfDoc = await PDFDocument.load(fileBytes);


      if (sanitizeMetadata) {

        pdfDoc.setTitle('');
        pdfDoc.setAuthor('');
        pdfDoc.setSubject('');
        pdfDoc.setKeywords([]);
        pdfDoc.setProducer('PDF Metadata Cleaner');
        pdfDoc.setCreator('PDF Metadata Cleaner');

      }


      const pdfBytes = await pdfDoc.save();


      const blob = new Blob(
        [pdfBytes],
        { type: 'application/pdf' }
      );


      const url = URL.createObjectURL(blob);

      setResultUrl(url);


      toast({
        title: "PDF Cleaned",
        description: "Metadata removed successfully.",
      });


    } catch (error) {

      console.error(error);

      toast({
        variant: "destructive",
        title: "Processing Failed",
        description: "Unable to clean PDF file.",
      });

    } finally {

      setIsProcessing(false);

    }

  };



  const handleDownload = () => {

    if (!resultUrl) return;

    const link = document.createElement('a');

    link.href = resultUrl;

    link.download = "cleaned-document.pdf";

    link.click();

  };



  return (

    <ToolLayout

      title="PDF Metadata Cleaner"

      description="Remove hidden metadata from PDF files and prepare documents for safer sharing."

      icon={ShieldCheck}

    >


      <div className="space-y-10">



        {/* SEO CONTENT */}

        <section className="mt-10 space-y-8 border-t pt-10 text-muted-foreground leading-8">


          <h2 className="text-3xl font-bold text-foreground">
            Complete Guide to PDF Metadata Cleaner
          </h2>


          <p>
            PDF Metadata Cleaner is a free online tool that helps remove hidden
            information from PDF documents. PDF files can contain metadata such
            as author name, title, creator details and other document information.
          </p>


          <p>
            Removing unnecessary metadata helps users prepare documents before
            sharing them online, especially for business files, reports,
            assignments and professional documents.
          </p>



          <h2 className="text-2xl font-bold text-foreground">
            Why Remove PDF Metadata?
          </h2>


          <ul className="list-disc pl-6 space-y-2">

            <li>Remove hidden document information</li>
            <li>Improve document privacy</li>
            <li>Prepare PDFs before sharing</li>
            <li>Clean professional documents</li>
            <li>No software installation required</li>
            <li>Browser-based processing</li>

          </ul>



          <h2 className="text-2xl font-bold text-foreground">
            How to Use PDF Metadata Cleaner
          </h2>


          <ol className="list-decimal pl-6 space-y-2">

            <li>Upload your PDF file.</li>
            <li>Enable metadata cleaning option.</li>
            <li>Click Clean PDF.</li>
            <li>Download your processed document.</li>

          </ol>



          <h2 className="text-2xl font-bold text-foreground">
            Privacy and Security
          </h2>


          <p>
            Files are processed directly in your browser and are not permanently
            stored on any server.
          </p>



          <h2 className="text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>



          <h3 className="text-xl font-semibold text-foreground">
            Is PDF Metadata Cleaner free?
          </h3>

          <p>
            Yes, it is completely free to use.
          </p>



          <h3 className="text-xl font-semibold text-foreground">
            Does it add password protection?
          </h3>

          <p>
            No. This tool removes metadata and cleans PDF information.
          </p>



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


                <div className="flex items-center justify-between">


                  <div>

                    <p className="font-semibold">
                      Remove PDF Metadata
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Remove hidden document information
                    </p>

                  </div>



                  <Switch

                    checked={sanitizeMetadata}

                    onCheckedChange={setSanitizeMetadata}

                  />


                </div>




                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">

                  <Trash2 size={18} />

                  Metadata cleaning happens locally in your browser

                </div>




                <Button

                  onClick={cleanPdf}

                  disabled={isProcessing}

                  className="w-full h-12"

                >


                  {isProcessing ? (

                    <>

                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />

                      Cleaning PDF...

                    </>


                  ) : (


                    <>

                      <ShieldCheck className="mr-2 h-5 w-5" />

                      Clean PDF

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

                  Cleaned PDF Preview

                </div>



                <iframe

                  src={`${resultUrl}#toolbar=0`}

                  className="w-full h-[500px]"

                />



              </CardContent>


            </Card>




            <div className="grid grid-cols-2 gap-4">



              <Button onClick={handleDownload}>


                <Download className="mr-2 h-5 w-5" />

                Download


              </Button>




              <Button variant="outline">


                <Share2 className="mr-2 h-5 w-5" />

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

                Clean Another PDF


              </Button>


            </div>



          </div>


        )}


      </div>


    </ToolLayout>

  );

}
