import { useState, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface InputUploadProps {
  onChange: (file: File | null) => void;
  previewUrl: string | null;
  resetPreview: () => void;
}

const InputUpload = ({ onChange, previewUrl, resetPreview }: InputUploadProps) => {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onChange(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {previewUrl ? (
        <div className="relative rounded-md overflow-hidden border border-gray-200">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-40 object-cover"
          />
          <Button 
            variant="destructive"
            size="icon"
            onClick={resetPreview}
            className="absolute top-2 right-2 rounded-full h-6 w-6 p-1 bg-red-500 hover:bg-red-600 text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors ${
            isDragging 
              ? "border-purple-500 bg-purple-50" 
              : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className="space-y-2 py-4">
            <p className="text-sm text-gray-500">{t("data.upload_image_drag", "גרור תמונה לכאן או")}</p>
            <p className="text-xs text-gray-400">{t("data.upload_image_click", "לחץ לבחירת תמונה")}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputUpload; 