import { Router } from "express";
import { uploadImage } from "../controllers/upload.controller";
import { uploadMiddleware } from "../middlewares/upload.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Upload image route - explicitly type the handler as any to avoid TypeScript errors
// related to multer's file property injection into the request object
router.post("/", authMiddleware, uploadMiddleware, uploadImage as any);

export default router; 