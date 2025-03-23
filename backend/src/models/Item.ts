import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
  name: string;
  description: string;
  imageUrl: string;
  status: "active" | "inactive" | "archived";
  createdBy: mongoose.Schema.Types.ObjectId;
  updatedBy: mongoose.Schema.Types.ObjectId;
}

const itemSchema: Schema<IItem> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "inactive", "archived"],
      default: "active",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Item = mongoose.model<IItem>("Item", itemSchema); 