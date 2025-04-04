import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3030,
  sessionSecret: process.env.SESSION_SECRET || "default-secret",
  isProduction: process.env.NODE_ENV === "production",
  allowedOrigins: ["http://localhost:5173"],
  mongoUri: process.env.MONGO_URI,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};
