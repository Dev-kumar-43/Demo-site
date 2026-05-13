import React, { useState, useRef } from 'react';
import { Upload, X, File, CheckCircle } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

export const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setUploadStatus('idle');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploadStatus('idle');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadStatus('idle');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadStatus('success');
        setUploadMessage(result.message || 'File uploaded successfully');
        setFile(null); // Clear the file after successful upload
      } else {
        setUploadStatus('error');
        setUploadMessage(result.error || 'Upload failed');
      }
    } catch (error) {
      setUploadStatus('error');
      setUploadMessage('Network error occurred during upload');
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setUploadStatus('idle');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary" />
          Evidence Upload
        </CardTitle>
        <CardDescription>
          Upload log files, PCAPs, or malware samples for analysis. Max size 10MB.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
            ${file ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/10'}
          `}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          {!file ? (
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 rounded-full bg-muted">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Drag & drop your file here</p>
                <p className="text-sm text-muted-foreground mt-1">or click to browse from your computer</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                className="mt-2"
              >
                Select File
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center p-4 rounded-lg bg-card border border-border w-full max-w-sm">
                <File className="h-8 w-8 text-primary mr-3 flex-shrink-0" />
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <Button variant="ghost" size="icon" onClick={clearFile} disabled={uploading}>
                  <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleUpload} 
                  disabled={uploading}
                  className="w-32"
                >
                  {uploading ? 'Uploading...' : 'Upload File'}
                </Button>
              </div>
            </div>
          )}
        </div>

        {uploadStatus === 'success' && (
          <div className="mt-4 p-3 rounded-md bg-green-500/10 border border-green-500/20 text-green-500 flex items-center text-sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            {uploadMessage}
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="mt-4 p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive flex items-center text-sm">
            <X className="h-4 w-4 mr-2" />
            {uploadMessage}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
