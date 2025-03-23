import mongoose, { Document, Schema } from "mongoose";

export interface IButterflyHost {
  url: string;
  title: string;
  imageUrl: string;
  position?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IButterflyHostDocument extends IButterflyHost, Document {}

const butterflyHostSchema = new Schema(
  {
    url: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    position: { type: String }
  },
  {
    timestamps: true
  }
);

export const ButterflyHost = mongoose.model<IButterflyHostDocument>(
  "ButterflyHost",
  butterflyHostSchema,
  "butterfly-hosts"
); 