import mongoose, { Schema, Document } from "mongoose";

export type FieldType = "string" | "number" | "boolean" | "date";

export interface IField {
  name: string;
  type: FieldType;
  required: boolean;
}

export interface IDynamicSchema extends Document {
  name: string;
  description: string;
  fields: IField[];
  createdBy: mongoose.Schema.Types.ObjectId;
  updatedBy: mongoose.Schema.Types.ObjectId;
}

const fieldSchema = new Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["string", "number", "boolean", "date"],
      required: true,
    },
    required: { type: Boolean, default: false },
  },
  { _id: false }
);

const dynamicSchemaSchema: Schema<IDynamicSchema> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    fields: [fieldSchema],
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

export const DynamicSchema = mongoose.model<IDynamicSchema>(
  "DynamicSchema",
  dynamicSchemaSchema
); 