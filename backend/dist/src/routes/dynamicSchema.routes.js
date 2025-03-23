"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dynamicSchema_controller_1 = require("../controllers/dynamicSchema.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const router = (0, express_1.Router)();
// Get all schemas
router.get("/", auth_middleware_1.authMiddleware, dynamicSchema_controller_1.getAllSchemas);
// Get schema by ID
router.get("/:id", auth_middleware_1.authMiddleware, dynamicSchema_controller_1.getSchemaById);
// Create new schema (admin only)
router.post("/", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, dynamicSchema_controller_1.createSchema);
// Update schema (admin only)
router.put("/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, dynamicSchema_controller_1.updateSchema);
// Delete schema (admin only)
router.delete("/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, dynamicSchema_controller_1.deleteSchema);
exports.default = router;
