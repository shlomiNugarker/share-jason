"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_controller_1 = require("../controllers/item.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const router = (0, express_1.Router)();
// Get all items
router.get("/", item_controller_1.getAllItems);
// Get item by ID
router.get("/:id", item_controller_1.getItemById);
// Create new item
router.post("/", auth_middleware_1.authMiddleware, item_controller_1.createItem);
// Update item
router.put("/:id", auth_middleware_1.authMiddleware, item_controller_1.updateItem);
// Delete item (admin only)
router.delete("/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, item_controller_1.deleteItem);
exports.default = router;
