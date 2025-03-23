import mongoose, { Schema, Document } from "mongoose";

export interface IDynamicItem extends Document {
  schemaId: mongoose.Schema.Types.ObjectId;
  name: string;
  data: Record<string, any>;
  createdBy: mongoose.Schema.Types.ObjectId;
  updatedBy: mongoose.Schema.Types.ObjectId;
}

const dynamicItemSchema: Schema<IDynamicItem> = new Schema(
  {
    schemaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DynamicSchema",
      required: true,
    },
    name: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: true, default: {} },
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

// Create index on schemaId to improve query performance
dynamicItemSchema.index({ schemaId: 1 });

export const DynamicItem = mongoose.model<IDynamicItem>(
  "DynamicItem",
  dynamicItemSchema
); 