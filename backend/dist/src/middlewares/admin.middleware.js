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
exports.adminMiddleware = void 0;
const User_1 = require("../models/User");
const adminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🔍 Admin check - checking user");
        // Check for user in req.user first (set by auth middleware)
        // @ts-ignore
        const userObj = req.user;
        if (userObj && userObj.role === "admin") {
            console.log("🔍 Admin check passed - user from req.user");
            return next();
        }
        // Fallback to finding user by ID
        // @ts-ignore
        const userId = req.userId;
        console.log("🔍 Admin check - looking up user by ID:", userId);
        if (!userId) {
            return res.status(401).json({ message: "User ID not found in request" });
        }
        const user = yield User_1.User.findById(userId);
        if (!user) {
            console.log("❌ Admin check - User not found");
            return res.status(404).json({ message: "User not found" });
        }
        console.log("🔍 Admin check - user role:", user.role);
        if (user.role !== "admin") {
            console.log("❌ Admin check - not an admin");
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
        console.log("✅ Admin check passed");
        next();
    }
    catch (error) {
        console.error("❌ Error in adminMiddleware:", JSON.stringify(error, null, 2));
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.adminMiddleware = adminMiddleware;
