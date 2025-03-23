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
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItemById = exports.getAllItems = void 0;
const Item_1 = require("../models/Item");
// Get all items
const getAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield Item_1.Item.find().sort({ createdAt: -1 });
        res.status(200).json({ items });
    }
    catch (error) {
        console.error("Error getting items:", error);
        res.status(500).json({ message: "Error fetching items" });
    }
});
exports.getAllItems = getAllItems;
// Get item by ID
const getItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const item = yield Item_1.Item.findById(id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ item });
    }
    catch (error) {
        console.error("Error getting item:", error);
        res.status(500).json({ message: "Error fetching item" });
    }
});
exports.getItemById = getItemById;
// Create new item
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, imageUrl, status } = req.body;
        if (!name || !description || !imageUrl) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const userId = req.user._id;
        const newItem = new Item_1.Item({
            name,
            description,
            imageUrl,
            status: status || "active",
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
exports.createItem = createItem;
// Update item
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, imageUrl, status } = req.body;
        const userId = req.user._id;
        const updatedItem = yield Item_1.Item.findByIdAndUpdate(id, {
            name,
            description,
            imageUrl,
            status,
            updatedBy: userId,
        }, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ item: updatedItem });
    }
    catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ message: "Error updating item" });
    }
});
exports.updateItem = updateItem;
// Delete item
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedItem = yield Item_1.Item.findByIdAndDelete(id);
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
exports.deleteItem = deleteItem;
