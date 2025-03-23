import { Request, Response } from "express";
import { Item } from "../models/Item";

interface AuthRequest extends Request {
  user?: any;
}

// Get all items
export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json({ items });
  } catch (error) {
    console.error("Error getting items:", error);
    res.status(500).json({ message: "Error fetching items" });
  }
};

// Get item by ID
export const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    res.status(200).json({ item });
  } catch (error) {
    console.error("Error getting item:", error);
    res.status(500).json({ message: "Error fetching item" });
  }
};

// Create new item
export const createItem = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, imageUrl, status } = req.body;
    
    if (!name || !description || !imageUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    const userId = req.user._id;
    
    const newItem = new Item({
      name,
      description,
      imageUrl,
      status: status || "active",
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
export const updateItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, imageUrl, status } = req.body;
    const userId = req.user._id;
    
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      {
        name,
        description,
        imageUrl,
        status,
        updatedBy: userId,
      },
      { new: true }
    );
    
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    res.status(200).json({ item: updatedItem });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Error updating item" });
  }
};

// Delete item
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const deletedItem = await Item.findByIdAndDelete(id);
    
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Error deleting item" });
  }
}; 