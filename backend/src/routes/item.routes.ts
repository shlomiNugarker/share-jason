import { Router } from "express";
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/item.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();

// Get all items
router.get("/", getAllItems);

// Get item by ID
router.get("/:id", getItemById);

// Create new item
router.post("/", authMiddleware, createItem);

// Update item
router.put("/:id", authMiddleware, updateItem);

// Delete item (admin only)
router.delete("/:id", authMiddleware, adminMiddleware, deleteItem);

export default router; 