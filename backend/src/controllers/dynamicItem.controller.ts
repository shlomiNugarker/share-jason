import { Request, Response } from "express";
import { DynamicItem } from "../models/DynamicItem";
import { DynamicSchema } from "../models/DynamicSchema";
import mongoose from "mongoose";

interface AuthRequest extends Request {
  user?: any;
}

// Get all items for a schema
export const getItemsBySchema = async (req: Request, res: Response) => {
  try {
    const { schemaId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(schemaId)) {
      return res.status(400).json({ message: "Invalid schema ID" });
    }

    // Check if schema exists
    const schema = await DynamicSchema.findById(schemaId);
    if (!schema) {
      return res.status(404).json({ message: "Schema not found" });
    }

    const items = await DynamicItem.find({ schemaId }).sort({ createdAt: -1 });
    res.status(200).json({ items, schema });
  } catch (error) {
    console.error("Error getting items:", error);
    res.status(500).json({ message: "Error fetching items" });
  }
};

// Get item by ID
export const getDynamicItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }
    
    const item = await DynamicItem.findById(id);
    
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    // Get the schema for this item
    const schema = await DynamicSchema.findById(item.schemaId);
    if (!schema) {
      return res.status(404).json({ message: "Schema not found for this item" });
    }
    
    res.status(200).json({ item, schema });
  } catch (error) {
    console.error("Error getting item:", error);
    res.status(500).json({ message: "Error fetching item" });
  }
};

// Create new item
export const createDynamicItem = async (req: AuthRequest, res: Response) => {
  try {
    const { schemaId, name, data } = req.body;
    
    if (!schemaId || !name || !data) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    if (!mongoose.Types.ObjectId.isValid(schemaId)) {
      return res.status(400).json({ message: "Invalid schema ID" });
    }
    
    // Check if schema exists
    const schema = await DynamicSchema.findById(schemaId);
    if (!schema) {
      return res.status(404).json({ message: "Schema not found" });
    }
    
    // Validate data against schema
    const validationErrors = validateDataAgainstSchema(data, schema.fields);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        message: "Data validation failed", 
        errors: validationErrors 
      });
    }
    
    const userId = req.user._id;
    
    const newItem = new DynamicItem({
      schemaId,
      name,
      data,
      createdBy: userId,
      updatedBy: userId,
    });
    
    await newItem.save();
    res.status(201).json({ item: newItem });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Error creating item" });
  }
};

// Update item
export const updateDynamicItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, data } = req.body;
    const userId = req.user._id;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }
    
    // Get the existing item and its schema
    const existingItem = await DynamicItem.findById(id);
    if (!existingItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    const schema = await DynamicSchema.findById(existingItem.schemaId);
    if (!schema) {
      return res.status(404).json({ message: "Schema not found for this item" });
    }
    
    // If data is being updated, validate it
    if (data) {
      const validationErrors = validateDataAgainstSchema(data, schema.fields);
      if (validationErrors.length > 0) {
        return res.status(400).json({ 
          message: "Data validation failed", 
          errors: validationErrors 
        });
      }
    }
    
    const updatedItem = await DynamicItem.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(data && { data }),
        updatedBy: userId,
      },
      { new: true }
    );
    
    res.status(200).json({ item: updatedItem });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Error updating item" });
  }
};

// Delete item
export const deleteDynamicItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }
    
    const deletedItem = await DynamicItem.findByIdAndDelete(id);
    
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Error deleting item" });
  }
};

// Helper function to validate data against schema
function validateDataAgainstSchema(data: Record<string, any>, schemaFields: any[]) {
  const errors = [];
  
  // Check for required fields
  for (const field of schemaFields) {
    if (field.required && (data[field.name] === undefined || data[field.name] === null)) {
      errors.push(`Field '${field.name}' is required`);
      continue;
    }
    
    // Skip validation for undefined optional fields
    if (data[field.name] === undefined) {
      continue;
    }
    
    // Validate type
    switch (field.type) {
      case "string":
        if (typeof data[field.name] !== "string") {
          errors.push(`Field '${field.name}' must be a string`);
        }
        break;
      case "number":
        if (typeof data[field.name] !== "number") {
          errors.push(`Field '${field.name}' must be a number`);
        }
        break;
      case "boolean":
        if (typeof data[field.name] !== "boolean") {
          errors.push(`Field '${field.name}' must be a boolean`);
        }
        break;
      case "date":
        // Try to parse as date
        const dateValue = new Date(data[field.name]);
        if (isNaN(dateValue.getTime())) {
          errors.push(`Field '${field.name}' must be a valid date`);
        }
        break;
    }
  }
  
  return errors;
} 