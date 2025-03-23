import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    
    const user = await User.findById(userId);

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
  } catch (error) {
    console.error(
      "❌ Error in adminMiddleware:",
      JSON.stringify(error, null, 2)
    );
    res.status(500).json({ message: "Internal server error" });
  }
};
