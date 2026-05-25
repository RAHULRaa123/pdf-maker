"use client"

import React, { useCallback, useState } from 'react';
import { Upload, X, FileText, ImageIcon, FileCheck } from 'lucide-react';
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
  }, [multiple, selectedFiles, onFilesSelected]);

  const onFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  }, [multiple, selectedFiles, onFilesSelected]);

  const handleFiles = (files: File[]) => {
    const newFiles = multiple ? [...selectedFiles, ...files] : [files[0]];
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  };

  return (
    <div className="space-y-6">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "relative border-2 border-dashed rounded-3xl p-12 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer group overflow-hidden bg-card/50",
          isDragging 
            ? "border-primary bg-primary/5 ring-4 ring-primary/10 scale-[0.99]" 
            : "border-border hover:border-primary/50 hover:bg-secondary/30"
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
        
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse" />
          <div className="relative bg-primary p-5 rounded-2xl text-primary-foreground shadow-xl shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-8 h-8" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-2">{label}</h3>
        <p className="text-sm text-muted-foreground font-medium max-w-xs mx-auto">
          Drag and drop your files here or click to browse. Safe and private processing.
        </p>
        <div className="mt-6 flex gap-2">
           <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-secondary rounded text-muted-foreground">Local Only</span>
           <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-secondary rounded text-muted-foreground">Secured</span>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-3 animate-in fade-in duration-500">
          <div className="flex items-center justify-between px-2">
             <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Queue ({selectedFiles.length})</span>
             <Button variant="ghost" size="sm" onClick={() => {setSelectedFiles([]); onFilesSelected([]);}} className="h-7 text-xs font-bold text-destructive hover:text-destructive hover:bg-destructive/10">
               Clear All
             </Button>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {selectedFiles.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-card border border-border shadow-sm rounded-2xl hover:shadow-md transition-shadow animate-in slide-in-from-left-2 duration-300" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-3 rounded-xl",
                    file.type.startsWith('image/') ? "bg-blue-500/10 text-blue-500" : "bg-purple-500/10 text-purple-500"
                  )}>
                    {file.type.startsWith('image/') ? <ImageIcon size={20} /> : <FileText size={20} />}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-bold truncate max-w-[200px] sm:max-w-md">{file.name}</span>
                    <span className="text-xs font-medium text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-500" />
                  <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); removeFile(idx); }} className="rounded-full hover:bg-destructive/10 hover:text-destructive">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}