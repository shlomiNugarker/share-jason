"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const butterflyHost_controller_1 = require("../controllers/butterflyHost.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Get all butterfly hosts
router.get("/", butterflyHost_controller_1.getAllButterflyHosts);
// Get butterfly hosts by position
router.get("/position/:position", butterflyHost_controller_1.getButterflyHostsByPosition);
// Get a single butterfly host by ID
router.get("/:id", butterflyHost_controller_1.getButterflyHostById);
// Create a new butterfly host - requires authentication
router.post("/", auth_middleware_1.authMiddleware, butterflyHost_controller_1.createButterflyHost);
// Update a butterfly host - requires authentication
router.put("/:id", auth_middleware_1.authMiddleware, butterflyHost_controller_1.updateButterflyHost);
// Delete a butterfly host - requires authentication
router.delete("/:id", auth_middleware_1.authMiddleware, butterflyHost_controller_1.deleteButterflyHost);
exports.default = router;
