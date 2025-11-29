'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
}

interface DocumentUploadProps {
  files: UploadedFile[];
  onUpdate: (files: UploadedFile[]) => void;
}

const DocumentUpload = ({ files, onUpdate }: DocumentUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map((file) => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type || 'unknown',
      uploadedAt: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }));

    onUpdate([...files, ...newFiles]);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDelete = (id: string) => {
    onUpdate(files.filter((f) => f.id !== id));
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return 'DocumentTextIcon';
    if (type.includes('word') || type.includes('document')) return 'DocumentIcon';
    if (type.includes('sheet') || type.includes('excel')) return 'TableCellsIcon';
    if (type.includes('image')) return 'PhotoIcon';
    return 'DocumentIcon';
  };

  return (
    <div className="space-y-6">
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start space-x-3">
        <Icon name="CloudArrowUpIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-foreground font-medium">Upload Existing Documentation</p>
          <p className="text-sm text-muted-foreground mt-1">
            Upload any existing project documents, requirements, or reference materials. Supported formats: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG.
          </p>
        </div>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-default ${
          isDragging
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
        }`}
      >
        <Icon name="CloudArrowUpIcon" size={48} className="mx-auto text-muted-foreground mb-4" />
        <p className="text-foreground font-medium mb-2">
          Drag and drop files here, or click to browse
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Maximum file size: 10MB per file
        </p>
        <label className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-default cursor-pointer">
          <Icon name="FolderOpenIcon" size={20} />
          <span>Choose Files</span>
          <input
            type="file"
            multiple
            onChange={handleFileInput}
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Uploaded Files ({files.length})</h4>
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:shadow-subtle transition-default"
            >
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={getFileIcon(file.type) as any} size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{file.name}</p>
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground mt-1">
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>{file.uploadedAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  className="p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-default"
                  aria-label="Download file"
                >
                  <Icon name="ArrowDownTrayIcon" size={18} />
                </button>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="p-2 rounded-md text-muted-foreground hover:bg-error/10 hover:text-error transition-default"
                  aria-label="Delete file"
                >
                  <Icon name="TrashIcon" size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;