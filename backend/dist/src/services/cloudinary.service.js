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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = require("../config");
// Configure Cloudinary with credentials from environment variables
cloudinary_1.v2.config({
    cloud_name: config_1.config.cloudinary.cloudName,
    api_key: config_1.config.cloudinary.apiKey,
    api_secret: config_1.config.cloudinary.apiSecret,
});
/**
 * Upload an image file to Cloudinary
 * @param filePath Path to the file to upload
 * @param folder Optional folder name in Cloudinary
 * @returns Cloudinary upload response with URL and other details
 */
const uploadImage = (filePath, folder = 'items') => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary_1.v2.uploader.upload(filePath, {
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
    }
    catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Failed to upload image to Cloudinary');
    }
});
exports.uploadImage = uploadImage;
/**
 * Delete an image from Cloudinary
 * @param publicId The public ID of the image to delete
 * @returns Cloudinary deletion response
 */
const deleteImage = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield cloudinary_1.v2.uploader.destroy(publicId);
    }
    catch (error) {
        console.error('Cloudinary delete error:', error);
        throw new Error('Failed to delete image from Cloudinary');
    }
});
exports.deleteImage = deleteImage;
