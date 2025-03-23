import { Request, Response } from "express";
import { DynamicSchema } from "../models/DynamicSchema";
import { DynamicItem } from "../models/DynamicItem";

interface AuthRequest extends Request {
  user?: any;
}

// Get all schemas
export const getAllSchemas = async (req: Request, res: Response) => {
  try {
    const schemas = await DynamicSchema.find().sort({ createdAt: -1 });
    res.status(200).json({ schemas });
  } catch (error) {
    console.error("Error getting schemas:", error);
    res.status(500).json({ message: "Error fetching schemas" });
  }
};

// Get schema by ID
export const getSchemaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const schema = await DynamicSchema.findById(id);
    
    if (!schema) {
      return res.status(404).json({ message: "Schema not found" });
    }
    
    res.status(200).json({ schema });
  } catch (error) {
    console.error("Error getting schema:", error);
    res.status(500).json({ message: "Error fetching schema" });
  }
};

// Create new schema
export const createSchema = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, fields } = req.body;
    
    if (!name || !description || !fields || !Array.isArray(fields)) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    // Validate field structure
    for (const field of fields) {
      if (!field.name || !field.type) {
        return res.status(400).json({ 
          message: "Each field must have a name and type" 
        });
      }
      
      // Check if type is valid
      if (!["string", "number", "boolean", "date"].includes(field.type)) {
        return res.status(400).json({ 
          message: "Field type must be string, number, boolean, or date" 
        });
      }
    }
    
    const userId = req.user._id;
    
    // Check if schema with this name already exists
    const existingSchema = await DynamicSchema.findOne({ name });
    if (existingSchema) {
      return res.status(400).json({ 
        message: "A schema with this name already exists" 
      });
    }
    
    const newSchema = new DynamicSchema({
      name,
      description,
      fields,
      createdBy: userId,
      updatedBy: userId,
    });
    
    await newSchema.save();
    res.status(201).json({ schema: newSchema });
  } catch (error) {
    console.error("Error creating schema:", error);
    res.status(500).json({ message: "Error creating schema" });
  }
};

// Update schema
export const updateSchema = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, fields } = req.body;
    const userId = req.user._id;
    
    // Validate field structure if fields are provided
    if (fields && Array.isArray(fields)) {
      for (const field of fields) {
        if (!field.name || !field.type) {
          return res.status(400).json({ 
            message: "Each field must have a name and type" 
          });
        }
        
        // Check if type is valid
        if (!["string", "number", "boolean", "date"].includes(field.type)) {
          return res.status(400).json({ 
            message: "Field type must be string, number, boolean, or date" 
          });
        }
      }
    }
    
    // Check if schema name is being changed and if new name already exists
    if (name) {
      const existingSchema = await DynamicSchema.findOne({ 
        name, 
        _id: { $ne: id } 
      });
      
      if (existingSchema) {
        return res.status(400).json({ 
          message: "A schema with this name already exists" 
        });
      }
    }
    
    const updatedSchema = await DynamicSchema.findByIdAndUpdate(
      id,
      {
        name,
        description,
        ...(fields && { fields }),
        updatedBy: userId,
      },
      { new: true }
    );
    
    if (!updatedSchema) {
      return res.status(404).json({ message: "Schema not found" });
    }
    
    res.status(200).json({ schema: updatedSchema });
  } catch (error) {
    console.error("Error updating schema:", error);
    res.status(500).json({ message: "Error updating schema" });
  }
};

// Delete schema
export const deleteSchema = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Check if there are items using this schema
    const itemsUsingSchema = await DynamicItem.countDocuments({ schemaId: id });
    
    if (itemsUsingSchema > 0) {
      return res.status(400).json({ 
        message: `Cannot delete schema that is in use by ${itemsUsingSchema} items` 
      });
    }
    
    const deletedSchema = await DynamicSchema.findByIdAndDelete(id);
    
    if (!deletedSchema) {
      return res.status(404).json({ message: "Schema not found" });
    }
    
    res.status(200).json({ message: "Schema deleted successfully" });
  } catch (error) {
    console.error("Error deleting schema:", error);
    res.status(500).json({ message: "Error deleting schema" });
  }
}; 