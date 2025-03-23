"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dynamicItem_controller_1 = require("../controllers/dynamicItem.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const router = (0, express_1.Router)();
// Get all items for a schema
router.get("/schema/:schemaId", auth_middleware_1.authMiddleware, dynamicItem_controller_1.getItemsBySchema);
// Get item by ID
router.get("/:id", auth_middleware_1.authMiddleware, dynamicItem_controller_1.getDynamicItemById);
// Create new item
router.post("/", auth_middleware_1.authMiddleware, dynamicItem_controller_1.createDynamicItem);
// Update item
router.put("/:id", auth_middleware_1.authMiddleware, dynamicItem_controller_1.updateDynamicItem);
// Delete item (admin only)
router.delete("/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, dynamicItem_controller_1.deleteDynamicItem);
exports.default = router;
