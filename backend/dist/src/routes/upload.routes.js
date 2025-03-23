"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_1 = require("../controllers/upload.controller");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Upload image route - explicitly type the handler as any to avoid TypeScript errors
// related to multer's file property injection into the request object
router.post("/", auth_middleware_1.authMiddleware, upload_middleware_1.uploadMiddleware, upload_controller_1.uploadImage);
exports.default = router;
