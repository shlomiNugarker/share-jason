import { useState } from 'react';
import { Button } from './ui/button';
import { useAuth } from '@/context/AuthContext';

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
  const { token } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploadError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      const error = 'No file selected';
      setUploadError(error);
      onUploadError?.(error);
      return;
    }

    if (!token) {
      const error = 'You must be logged in to upload files';
      setUploadError(error);
      onUploadError?.(error);
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3030'}/api/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        let errorMessage = 'Upload failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (_) {
          // If response is not JSON, use status text
          errorMessage = `Upload failed (${response.status}: ${response.statusText})`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      if (data.success && data.file) {
        console.log('Upload successful:', data.file);
        onUploadSuccess?.(data.file);
        // Clear the file input after successful upload
        setFile(null);
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      console.error('Upload error:', errorMessage);
      setUploadError(errorMessage);
      onUploadError?.(errorMessage);
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
          accept="image/*"
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
      {uploadError && (
        <div className="text-sm text-red-500">
          Error: {uploadError}
        </div>
      )}
    </div>
  );
} 