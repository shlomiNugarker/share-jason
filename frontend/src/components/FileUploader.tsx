import { useState } from 'react';
import { Button } from './ui/button';

interface FileUploaderProps {
  onUploadSuccess?: (fileData: {
    url: string;
    name: string;
    type: string;
    size: number;
  }) => void;
  onUploadError?: (error: string) => void;
  className?: string;
}

export function FileUploader({ 
  onUploadSuccess, 
  onUploadError,
  className = ''
}: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      onUploadError?.('No file selected');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`http://localhost:3030/api/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      
      if (data.success && data.file) {
        onUploadSuccess?.(data.file);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      onUploadError?.(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-center gap-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
        />
        <Button 
          onClick={handleUpload} 
          disabled={!file || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
      {file && (
        <div className="text-sm text-gray-500">
          Selected file: {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </div>
      )}
    </div>
  );
} 