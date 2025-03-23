"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const upload_middleware_1 = require("../middlewares/upload.middleware");
const cloudinary_service_1 = require("../services/cloudinary.service");
/**
 * Upload an image file to Cloudinary
 */
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        console.log("Received file:", req.file.originalname, "Size:", req.file.size);
        // Get the local file path where multer stored the file
        const localFilePath = path_1.default.join((0, upload_middleware_1.getUploadDir)(), req.file.filename);
        console.log("Local file path:", localFilePath);
        try {
            // Upload to Cloudinary
            console.log("Uploading to Cloudinary...");
            const cloudinaryResult = yield (0, cloudinary_service_1.uploadImage)(localFilePath, "user_uploads");
            console.log("Cloudinary result:", cloudinaryResult);
            // Once uploaded to Cloudinary, we can delete the local file to save space
            fs_1.default.unlinkSync(localFilePath);
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
        }
        catch (cloudinaryError) {
            console.error("Cloudinary upload error:", cloudinaryError);
            return res.status(500).json({ error: "Error uploading to Cloudinary" });
        }
    }
    catch (err) {
        console.error("Upload error:", err);
        // If there's an error, try to clean up the local file if it exists
        if (req.file) {
            const localFilePath = path_1.default.join((0, upload_middleware_1.getUploadDir)(), req.file.filename);
            if (fs_1.default.existsSync(localFilePath)) {
                fs_1.default.unlinkSync(localFilePath);
            }
        }
        return res.status(500).json({ error: "Error uploading file to cloud storage" });
    }
});
exports.uploadImage = uploadImage;
