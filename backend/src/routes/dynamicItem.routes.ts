import { Router } from "express";
import {
  getItemsBySchema,
  getDynamicItemById,
  createDynamicItem,
  updateDynamicItem,
  deleteDynamicItem,
} from "../controllers/dynamicItem.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();

// Get all items for a schema
router.get("/schema/:schemaId", authMiddleware, getItemsBySchema);

// Get item by ID
router.get("/:id", authMiddleware, getDynamicItemById);

// Create new item
router.post("/", authMiddleware, createDynamicItem);

// Update item
router.put("/:id", authMiddleware, updateDynamicItem);

// Delete item (admin only)
router.delete("/:id", authMiddleware, adminMiddleware, deleteDynamicItem);

export default router; 