import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { getUploadDir } from "../middlewares/upload.middleware";
import { uploadImage as cloudinaryUpload } from "../services/cloudinary.service";

// Extended Request interface to include file property
interface FileRequest extends Request {
  file: Express.Multer.File;
}

/**
 * Upload an image file to Cloudinary
 */
export const uploadImage = async (req: FileRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("Received file:", req.file.originalname, "Size:", req.file.size);
    
    // Get the local file path where multer stored the file
    const localFilePath = path.join(getUploadDir(), req.file.filename);
    console.log("Local file path:", localFilePath);
    
    try {
      // Upload to Cloudinary
      console.log("Uploading to Cloudinary...");
      const cloudinaryResult = await cloudinaryUpload(localFilePath, "user_uploads");
      console.log("Cloudinary result:", cloudinaryResult);
      
      // Once uploaded to Cloudinary, we can delete the local file to save space
      fs.unlinkSync(localFilePath);
      
      return res.status(200).json({
        success: true,
        message: "File uploaded successfully to Cloudinary",
        file: {
          url: cloudinaryResult.secure_url,
          publicId: cloudinaryResult.public_id,
          name: req.file.originalname,
          type: req.file.mimetype,
          size: req.file.size,
          width: cloudinaryResult.width,
          height: cloudinaryResult.height
        }
      });
    } catch (cloudinaryError) {
      console.error("Cloudinary upload error:", cloudinaryError);
      return res.status(500).json({ error: "Error uploading to Cloudinary" });
    }
  } catch (err) {
    console.error("Upload error:", err);
    
    // If there's an error, try to clean up the local file if it exists
    if (req.file) {
      const localFilePath = path.join(getUploadDir(), req.file.filename);
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    }
    
    return res.status(500).json({ error: "Error uploading file to cloud storage" });
  }
}; 