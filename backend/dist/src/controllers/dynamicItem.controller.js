"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDynamicItem = exports.updateDynamicItem = exports.createDynamicItem = exports.getDynamicItemById = exports.getItemsBySchema = void 0;
const DynamicItem_1 = require("../models/DynamicItem");
const DynamicSchema_1 = require("../models/DynamicSchema");
const mongoose_1 = __importDefault(require("mongoose"));
// Get all items for a schema
const getItemsBySchema = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schemaId } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(schemaId)) {
            return res.status(400).json({ message: "Invalid schema ID" });
        }
        // Check if schema exists
        const schema = yield DynamicSchema_1.DynamicSchema.findById(schemaId);
        if (!schema) {
            return res.status(404).json({ message: "Schema not found" });
        }
        const items = yield DynamicItem_1.DynamicItem.find({ schemaId }).sort({ createdAt: -1 });
        res.status(200).json({ items, schema });
    }
    catch (error) {
        console.error("Error getting items:", error);
        res.status(500).json({ message: "Error fetching items" });
    }
});
exports.getItemsBySchema = getItemsBySchema;
// Get item by ID
const getDynamicItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid item ID" });
        }
        const item = yield DynamicItem_1.DynamicItem.findById(id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        // Get the schema for this item
        const schema = yield DynamicSchema_1.DynamicSchema.findById(item.schemaId);
        if (!schema) {
            return res.status(404).json({ message: "Schema not found for this item" });
        }
        res.status(200).json({ item, schema });
    }
    catch (error) {
        console.error("Error getting item:", error);
        res.status(500).json({ message: "Error fetching item" });
    }
});
exports.getDynamicItemById = getDynamicItemById;
// Create new item
const createDynamicItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schemaId, name, data } = req.body;
        if (!schemaId || !name || !data) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(schemaId)) {
            return res.status(400).json({ message: "Invalid schema ID" });
        }
        // Check if schema exists
        const schema = yield DynamicSchema_1.DynamicSchema.findById(schemaId);
        if (!schema) {
            return res.status(404).json({ message: "Schema not found" });
        }
        // Validate data against schema
        const validationErrors = validateDataAgainstSchema(data, schema.fields);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                message: "Data validation failed",
                errors: validationErrors
            });
        }
        const userId = req.user._id;
        const newItem = new DynamicItem_1.DynamicItem({
            schemaId,
            name,
            data,
            createdBy: userId,
            updatedBy: userId,
        });
        yield newItem.save();
        res.status(201).json({ item: newItem });
    }
    catch (error) {
        console.error("Error creating item:", error);
        res.status(500).json({ message: "Error creating item" });
    }
});
exports.createDynamicItem = createDynamicItem;
// Update item
const updateDynamicItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, data } = req.body;
        const userId = req.user._id;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid item ID" });
        }
        // Get the existing item and its schema
        const existingItem = yield DynamicItem_1.DynamicItem.findById(id);
        if (!existingItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        const schema = yield DynamicSchema_1.DynamicSchema.findById(existingItem.schemaId);
        if (!schema) {
            return res.status(404).json({ message: "Schema not found for this item" });
        }
        // If data is being updated, validate it
        if (data) {
            const validationErrors = validateDataAgainstSchema(data, schema.fields);
            if (validationErrors.length > 0) {
                return res.status(400).json({
                    message: "Data validation failed",
                    errors: validationErrors
                });
            }
        }
        const updatedItem = yield DynamicItem_1.DynamicItem.findByIdAndUpdate(id, Object.assign(Object.assign(Object.assign({}, (name && { name })), (data && { data })), { updatedBy: userId }), { new: true });
        res.status(200).json({ item: updatedItem });
    }
    catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ message: "Error updating item" });
    }
});
exports.updateDynamicItem = updateDynamicItem;
// Delete item
const deleteDynamicItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid item ID" });
        }
        const deletedItem = yield DynamicItem_1.DynamicItem.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ message: "Item deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ message: "Error deleting item" });
    }
});
exports.deleteDynamicItem = deleteDynamicItem;
// Helper function to validate data against schema
function validateDataAgainstSchema(data, schemaFields) {
    const errors = [];
    // Check for required fields
    for (const field of schemaFields) {
        if (field.required && (data[field.name] === undefined || data[field.name] === null)) {
            errors.push(`Field '${field.name}' is required`);
            continue;
        }
        // Skip validation for undefined optional fields
        if (data[field.name] === undefined) {
            continue;
        }
        // Validate type
        switch (field.type) {
            case "string":
                if (typeof data[field.name] !== "string") {
                    errors.push(`Field '${field.name}' must be a string`);
                }
                break;
            case "number":
                if (typeof data[field.name] !== "number") {
                    errors.push(`Field '${field.name}' must be a number`);
                }
                break;
            case "boolean":
                if (typeof data[field.name] !== "boolean") {
                    errors.push(`Field '${field.name}' must be a boolean`);
                }
                break;
            case "date":
                // Try to parse as date
                const dateValue = new Date(data[field.name]);
                if (isNaN(dateValue.getTime())) {
                    errors.push(`Field '${field.name}' must be a valid date`);
                }
                break;
        }
    }
    return errors;
}
