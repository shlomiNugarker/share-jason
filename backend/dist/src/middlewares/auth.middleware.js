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
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const User_1 = require("../models/User");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    console.log("🔍 Auth check - Headers:", req.headers);
    if (!token && req.cookies) {
        token = req.cookies["token"];
        console.log("🔍 Using token from cookies:", token ? "Found" : "Not found");
    }
    if (!token) {
        return res.status(401).json({ message: "Unauthorized, no token provided" });
    }
    console.log("🔍 Verifying token");
    const decoded = (0, jwt_1.verifyToken)(token);
    if (!decoded) {
        return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
    console.log("🔍 Token decoded:", decoded);
    // @ts-ignore
    const user = yield User_1.User.findById(decoded.userId).select("-password");
    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }
    console.log("🔍 User found:", user.email, "Role:", user.role);
    // Set userId for other middleware to use
    // @ts-ignore
    req.userId = decoded.userId;
    req.user = user;
    next();
});
exports.authMiddleware = authMiddleware;
