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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSchema = exports.updateSchema = exports.createSchema = exports.getSchemaById = exports.getAllSchemas = void 0;
const DynamicSchema_1 = require("../models/DynamicSchema");
const DynamicItem_1 = require("../models/DynamicItem");
// Get all schemas
const getAllSchemas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schemas = yield DynamicSchema_1.DynamicSchema.find().sort({ createdAt: -1 });
        res.status(200).json({ schemas });
    }
    catch (error) {
        console.error("Error getting schemas:", error);
        res.status(500).json({ message: "Error fetching schemas" });
    }
});
exports.getAllSchemas = getAllSchemas;
// Get schema by ID
const getSchemaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const schema = yield DynamicSchema_1.DynamicSchema.findById(id);
        if (!schema) {
            return res.status(404).json({ message: "Schema not found" });
        }
        res.status(200).json({ schema });
    }
    catch (error) {
        console.error("Error getting schema:", error);
        res.status(500).json({ message: "Error fetching schema" });
    }
});
exports.getSchemaById = getSchemaById;
// Create new schema
const createSchema = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, fields } = req.body;
        if (!name || !description || !fields || !Array.isArray(fields)) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        // Validate field structure
        for (const field of fields) {
            if (!field.name || !field.type) {
                return res.status(400).json({
                    message: "Each field must have a name and type"
                });
            }
            // Check if type is valid
            if (!["string", "number", "boolean", "date", "image"].includes(field.type)) {
                return res.status(400).json({
                    message: "Field type must be string, number, boolean, date, or image"
                });
            }
        }
        const userId = req.user._id;
        // Check if schema with this name already exists
        const existingSchema = yield DynamicSchema_1.DynamicSchema.findOne({ name });
        if (existingSchema) {
            return res.status(400).json({
                message: "A schema with this name already exists"
            });
        }
        const newSchema = new DynamicSchema_1.DynamicSchema({
            name,
            description,
            fields,
            createdBy: userId,
            updatedBy: userId,
        });
        yield newSchema.save();
        res.status(201).json({ schema: newSchema });
    }
    catch (error) {
        console.error("Error creating schema:", error);
        res.status(500).json({ message: "Error creating schema" });
    }
});
exports.createSchema = createSchema;
// Update schema
const updateSchema = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, fields } = req.body;
        const userId = req.user._id;
        // Validate field structure if fields are provided
        if (fields && Array.isArray(fields)) {
            for (const field of fields) {
                if (!field.name || !field.type) {
                    return res.status(400).json({
                        message: "Each field must have a name and type"
                    });
                }
                // Check if type is valid
                if (!["string", "number", "boolean", "date", "image"].includes(field.type)) {
                    return res.status(400).json({
                        message: "Field type must be string, number, boolean, date, or image"
                    });
                }
            }
        }
        // Check if schema name is being changed and if new name already exists
        if (name) {
            const existingSchema = yield DynamicSchema_1.DynamicSchema.findOne({
                name,
                _id: { $ne: id }
            });
            if (existingSchema) {
                return res.status(400).json({
                    message: "A schema with this name already exists"
                });
            }
        }
        const updatedSchema = yield DynamicSchema_1.DynamicSchema.findByIdAndUpdate(id, Object.assign(Object.assign({ name,
            description }, (fields && { fields })), { updatedBy: userId }), { new: true });
        if (!updatedSchema) {
            return res.status(404).json({ message: "Schema not found" });
        }
        res.status(200).json({ schema: updatedSchema });
    }
    catch (error) {
        console.error("Error updating schema:", error);
        res.status(500).json({ message: "Error updating schema" });
    }
});
exports.updateSchema = updateSchema;
// Delete schema
const deleteSchema = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Check if there are items using this schema
        const itemsUsingSchema = yield DynamicItem_1.DynamicItem.countDocuments({ schemaId: id });
        if (itemsUsingSchema > 0) {
            return res.status(400).json({
                message: `Cannot delete schema that is in use by ${itemsUsingSchema} items`
            });
        }
        const deletedSchema = yield DynamicSchema_1.DynamicSchema.findByIdAndDelete(id);
        if (!deletedSchema) {
            return res.status(404).json({ message: "Schema not found" });
        }
        res.status(200).json({ message: "Schema deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting schema:", error);
        res.status(500).json({ message: "Error deleting schema" });
    }
});
exports.deleteSchema = deleteSchema;
