import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads directory if it doesn't exist
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");
export const getUploadDir = () => UPLOAD_DIR;

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Configure storage for local uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function(req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// Configure file filter to accept only images
const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Create a multer instance with specified storage and file size limits
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB in bytes
  }
});

// Middleware to handle file uploads and errors
export const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("🔍 Upload middleware called");
  console.log("Request headers:", req.headers);
  console.log("Request body:", req.body);
  
  const singleUpload = upload.single('file');

  singleUpload(req, res, function(err) {
    if (err) {
      console.error("❌ Upload error:", err);
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'File size should not exceed 10MB' });
        }
        console.error("Multer error code:", err.code);
      }
      
      return res.status(400).json({ error: err.message });
    }
    
    console.log("✅ File uploaded to temp storage:", req.file?.filename);
    next();
  });
}; 