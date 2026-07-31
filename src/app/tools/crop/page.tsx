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
