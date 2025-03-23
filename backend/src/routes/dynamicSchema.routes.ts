import { Router } from "express";
import {
  getAllSchemas,
  getSchemaById,
  createSchema,
  updateSchema,
  deleteSchema,
} from "../controllers/dynamicSchema.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();

// Get all schemas
router.get("/", authMiddleware, getAllSchemas);

// Get schema by ID
router.get("/:id", authMiddleware, getSchemaById);

// Create new schema (admin only)
router.post("/", authMiddleware, adminMiddleware, createSchema);

// Update schema (admin only)
router.put("/:id", authMiddleware, adminMiddleware, updateSchema);

// Delete schema (admin only)
router.delete("/:id", authMiddleware, adminMiddleware, deleteSchema);

export default router; 