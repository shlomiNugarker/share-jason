import { Router } from "express";
import { 
  getAllButterflyHosts, 
  getButterflyHostsByPosition, 
  getButterflyHostById,
  createButterflyHost,
  updateButterflyHost,
  deleteButterflyHost
} from "../controllers/butterflyHost.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Get all butterfly hosts
router.get("/", getAllButterflyHosts);

// Get butterfly hosts by position
router.get("/position/:position", getButterflyHostsByPosition);

// Get a single butterfly host by ID
router.get("/:id", getButterflyHostById);

// Create a new butterfly host - requires authentication
router.post("/", authMiddleware, createButterflyHost);

// Update a butterfly host - requires authentication
router.put("/:id", authMiddleware, updateButterflyHost);

// Delete a butterfly host - requires authentication
router.delete("/:id", authMiddleware, deleteButterflyHost);

export default router; 