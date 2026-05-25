"use client"

import React, { useCallback, useState } from 'react';
import { Upload, X, FileText, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
}

export function FileDropzone({ onFilesSelected, accept = "*", multiple = true, label = "Drop files here or click to upload" }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const onFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  }, []);

  const handleFiles = (files: File[]) => {
    const newFiles = multiple ? [...selectedFiles, ...files] : files;
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-12 transition-all flex flex-col items-center justify-center text-center cursor-pointer",
          isDragging ? "border-accent bg-secondary/50 scale-[0.99]" : "border-border hover:border-accent hover:bg-secondary/20"
        )}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={onFileInput}
        />
        <div className="bg-secondary p-4 rounded-full text-accent mb-4">
          <Upload className="w-8 h-8" />
        </div>
        <p className="text-lg font-medium text-primary mb-2">{label}</p>
        <p className="text-sm text-muted-foreground">Supports files up to 50MB</p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="grid grid-cols-1 gap-2 mt-4">
          {selectedFiles.map((file, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-white border border-border rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                {file.type.startsWith('image/') ? (
                   <ImageIcon className="text-blue-500 w-5 h-5" />
                ) : (
                  <FileText className="text-purple-500 w-5 h-5" />
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
                  <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); removeFile(idx); }}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}