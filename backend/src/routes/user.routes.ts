import { Router } from "express";
import {
  getProfile,
  getAllUsers,
  getUserById,
  updateUserRole,
  updateUserActiveStatus,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();

// User profile (for the authenticated user)
router.get("/profile", authMiddleware, getProfile);

// Admin routes
router.get("/", authMiddleware, adminMiddleware, getAllUsers);
router.get("/all", authMiddleware, adminMiddleware, getAllUsers);
router.get("/:id", authMiddleware, adminMiddleware, getUserById);
router.patch("/:id/role", authMiddleware, adminMiddleware, updateUserRole);
router.patch("/:id/status", authMiddleware, adminMiddleware, updateUserActiveStatus);

// DEV ONLY - remove for production
router.get("/test/all", getAllUsers); // For development testing only - NO AUTH REQUIRED

export default router;
