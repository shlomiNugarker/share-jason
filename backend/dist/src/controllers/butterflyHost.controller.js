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
exports.deleteButterflyHost = exports.updateButterflyHost = exports.createButterflyHost = exports.getButterflyHostById = exports.getButterflyHostsByPosition = exports.getAllButterflyHosts = void 0;
const ButterflyHost_1 = require("../models/ButterflyHost");
// Get all butterfly hosts
const getAllButterflyHosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hosts = yield ButterflyHost_1.ButterflyHost.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: hosts.length,
            hosts
        });
    }
    catch (error) {
        console.error("Error fetching butterfly hosts:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching butterfly hosts",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});
exports.getAllButterflyHosts = getAllButterflyHosts;
// Get butterfly hosts by position
const getButterflyHostsByPosition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { position } = req.params;
        const hosts = yield ButterflyHost_1.ButterflyHost.find({ position }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: hosts.length,
            position,
            hosts
        });
    }
    catch (error) {
        console.error(`Error fetching butterfly hosts for position ${req.params.position}:`, error);
        res.status(500).json({
            success: false,
            message: "Error fetching butterfly hosts by position",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});
exports.getButterflyHostsByPosition = getButterflyHostsByPosition;
// Get a single butterfly host by ID
const getButterflyHostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const host = yield ButterflyHost_1.ButterflyHost.findById(id);
        if (!host) {
            return res.status(404).json({
                success: false,
                message: "Butterfly host not found"
            });
        }
        res.status(200).json({
            success: true,
            host
        });
    }
    catch (error) {
        console.error(`Error fetching butterfly host with ID ${req.params.id}:`, error);
        res.status(500).json({
            success: false,
            message: "Error fetching butterfly host",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});
exports.getButterflyHostById = getButterflyHostById;
// Create a new butterfly host
const createButterflyHost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url, title, imageUrl, position } = req.body;
        // Validate required fields
        if (!url || !title || !imageUrl) {
            return res.status(400).json({
                success: false,
                message: "url, title and imageUrl are required fields"
            });
        }
        const newHost = new ButterflyHost_1.ButterflyHost({
            url,
            title,
            imageUrl,
            position
        });
        const savedHost = yield newHost.save();
        res.status(201).json({
            success: true,
            message: "Butterfly host created successfully",
            host: savedHost
        });
    }
    catch (error) {
        console.error("Error creating butterfly host:", error);
        res.status(500).json({
            success: false,
            message: "Error creating butterfly host",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});
exports.createButterflyHost = createButterflyHost;
// Update a butterfly host
const updateButterflyHost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { url, title, imageUrl, position } = req.body;
        // Check that at least one field is being updated
        if (!url && !title && !imageUrl && position === undefined) {
            return res.status(400).json({
                success: false,
                message: "At least one field must be provided for update"
            });
        }
        const updatedFields = {};
        if (url)
            updatedFields.url = url;
        if (title)
            updatedFields.title = title;
        if (imageUrl)
            updatedFields.imageUrl = imageUrl;
        if (position !== undefined)
            updatedFields.position = position;
        const updatedHost = yield ButterflyHost_1.ButterflyHost.findByIdAndUpdate(id, { $set: updatedFields }, { new: true, runValidators: true });
        if (!updatedHost) {
            return res.status(404).json({
                success: false,
                message: "Butterfly host not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Butterfly host updated successfully",
            host: updatedHost
        });
    }
    catch (error) {
        console.error(`Error updating butterfly host with ID ${req.params.id}:`, error);
        res.status(500).json({
            success: false,
            message: "Error updating butterfly host",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});
exports.updateButterflyHost = updateButterflyHost;
// Delete a butterfly host
const deleteButterflyHost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedHost = yield ButterflyHost_1.ButterflyHost.findByIdAndDelete(id);
        if (!deletedHost) {
            return res.status(404).json({
                success: false,
                message: "Butterfly host not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Butterfly host deleted successfully"
        });
    }
    catch (error) {
        console.error(`Error deleting butterfly host with ID ${req.params.id}:`, error);
        res.status(500).json({
            success: false,
            message: "Error deleting butterfly host",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});
exports.deleteButterflyHost = deleteButterflyHost;
