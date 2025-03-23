import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { User } from "../models/User";

interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token = req.header("Authorization")?.replace("Bearer ", "");

  console.log("🔍 Auth check - Headers:", req.headers);
  
  if (!token && req.cookies) {
    token = req.cookies["token"];
    console.log("🔍 Using token from cookies:", token ? "Found" : "Not found");
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  console.log("🔍 Verifying token");
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized, invalid token" });
  }

  console.log("🔍 Token decoded:", decoded);
  
  // @ts-ignore
  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  console.log("🔍 User found:", user.email, "Role:", user.role);
  
  // Set userId for other middleware to use
  // @ts-ignore
  req.userId = decoded.userId;
  req.user = user;
  next();
};
