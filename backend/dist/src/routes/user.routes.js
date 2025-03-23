"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const router = (0, express_1.Router)();
// User profile (for the authenticated user)
router.get("/profile", auth_middleware_1.authMiddleware, user_controller_1.getProfile);
// Admin routes
router.get("/", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, user_controller_1.getAllUsers);
router.get("/all", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, user_controller_1.getAllUsers);
router.get("/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, user_controller_1.getUserById);
router.patch("/:id/role", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, user_controller_1.updateUserRole);
router.patch("/:id/status", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, user_controller_1.updateUserActiveStatus);
// DEV ONLY - remove for production
router.get("/test/all", user_controller_1.getAllUsers); // For development testing only - NO AUTH REQUIRED
exports.default = router;
