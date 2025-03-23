"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = exports.upload = exports.getUploadDir = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Create uploads directory if it doesn't exist
const UPLOAD_DIR = path_1.default.join(process.cwd(), "public/uploads");
const getUploadDir = () => UPLOAD_DIR;
exports.getUploadDir = getUploadDir;
if (!fs_1.default.existsSync(UPLOAD_DIR)) {
    fs_1.default.mkdirSync(UPLOAD_DIR, { recursive: true });
}
// Configure storage for local uploads
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path_1.default.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});
// Configure file filter to accept only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Only image files are allowed!'));
    }
};
// Create a multer instance with specified storage and file size limits
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB in bytes
    }
});
// Middleware to handle file uploads and errors
const uploadMiddleware = (req, res, next) => {
    console.log("🔍 Upload middleware called");
    console.log("Request headers:", req.headers);
    console.log("Request body:", req.body);
    const singleUpload = exports.upload.single('file');
    singleUpload(req, res, function (err) {
        var _a;
        if (err) {
            console.error("❌ Upload error:", err);
            if (err instanceof multer_1.default.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ error: 'File size should not exceed 10MB' });
                }
                console.error("Multer error code:", err.code);
            }
            return res.status(400).json({ error: err.message });
        }
        console.log("✅ File uploaded to temp storage:", (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
        next();
    });
};
exports.uploadMiddleware = uploadMiddleware;
