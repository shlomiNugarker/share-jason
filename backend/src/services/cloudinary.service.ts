import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config';

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

/**
 * Upload an image file to Cloudinary
 * @param filePath Path to the file to upload
 * @param folder Optional folder name in Cloudinary
 * @returns Cloudinary upload response with URL and other details
 */
export const uploadImage = async (filePath: string, folder: string = 'items') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'auto',
    });
    
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
      resource_type: result.resource_type,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

/**
 * Delete an image from Cloudinary
 * @param publicId The public ID of the image to delete
 * @returns Cloudinary deletion response
 */
export const deleteImage = async (publicId: string) => {
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
}; 