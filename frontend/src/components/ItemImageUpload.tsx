import { useState } from 'react';
import { FileUploader } from './FileUploader';
import { toast } from 'sonner';

interface ItemImageUploadProps {
  onImageUploaded?: (imageUrl: string) => void;
  initialImage?: string;
}

export function ItemImageUpload({ onImageUploaded, initialImage }: ItemImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(initialImage);

  const handleUploadSuccess = (fileData: { url: string }) => {
    setImageUrl(fileData.url);
    onImageUploaded?.(fileData.url);
    toast.success('Image uploaded successfully');
  };

  const handleUploadError = (error: string) => {
    toast.error(`Upload failed: ${error}`);
  };

  return (
    <div className="space-y-4">
      <div className="font-medium">Item Image</div>
      
      {imageUrl && (
        <div className="mb-4">
          <img 
            src={`${import.meta.env.VITE_API_URL}${imageUrl}`} 
            alt="Item preview" 
            className="max-w-[300px] max-h-[200px] rounded-md border"
          />
        </div>
      )}
      
      <FileUploader 
        onUploadSuccess={handleUploadSuccess}
        onUploadError={handleUploadError}
      />
    </div>
  );
} 