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
exports.updateUserActiveStatus = exports.updateUserRole = exports.getUserById = exports.getAllUsers = exports.deleteUser = exports.updateProfile = exports.getProfile = void 0;
const User_1 = require("../models/User");
const user_service_1 = require("../services/user.service");
const mongoose_1 = __importDefault(require("mongoose"));
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const user = yield User_1.User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        console.error("❌ Error in getProfile:", JSON.stringify(error, null, 2));
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getProfile = getProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const userId = req.userId;
        const { name, email } = req.body;
        const updatedUser = yield User_1.User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true }).select("-password");
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "Profile updated successfully", user: updatedUser });
    }
    catch (error) {
        console.error("❌ Error in updateProfile:", JSON.stringify(error, null, 2));
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateProfile = updateProfile;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const { id } = req.params;
        const deletedUser = yield (0, user_service_1.deleteUserById)(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("❌ Error in deleteUser:", JSON.stringify(error, null, 2));
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteUser = deleteUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find().select("-password").sort({ createdAt: -1 });
        res.status(200).json({ users });
    }
    catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({ message: "Error fetching users" });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const user = yield User_1.User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error("Error getting user:", error);
        res.status(500).json({ message: "Error fetching user" });
    }
});
exports.getUserById = getUserById;
const updateUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        if (!role || !["user", "admin"].includes(role)) {
            return res.status(400).json({ message: "Invalid role. Role must be 'user' or 'admin'" });
        }
        const updatedUser = yield User_1.User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user: updatedUser });
    }
    catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).json({ message: "Error updating user role" });
    }
});
exports.updateUserRole = updateUserRole;
const updateUserActiveStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { isActive } = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        if (isActive === undefined || typeof isActive !== "boolean") {
            return res.status(400).json({ message: "isActive field must be a boolean" });
        }
        const updatedUser = yield User_1.User.findByIdAndUpdate(id, { isActive }, { new: true }).select("-password");
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user: updatedUser });
    }
    catch (error) {
        console.error("Error updating user active status:", error);
        res.status(500).json({ message: "Error updating user active status" });
    }
});
exports.updateUserActiveStatus = updateUserActiveStatus;
