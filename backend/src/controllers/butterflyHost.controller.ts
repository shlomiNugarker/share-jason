import { Request, Response } from "express";
import { ButterflyHost } from "../models/ButterflyHost";

// Get all butterfly hosts
export const getAllButterflyHosts = async (req: Request, res: Response) => {
  try {
    const hosts = await ButterflyHost.find().sort({ createdAt: -1 });
    
    res.status(200).json({ 
      success: true,
      count: hosts.length,
      hosts 
    });
  } catch (error) {
    console.error("Error fetching butterfly hosts:", error);
    res.status(500).json({ 
      success: false,
      message: "Error fetching butterfly hosts",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// Get butterfly hosts by position
export const getButterflyHostsByPosition = async (req: Request, res: Response) => {
  try {
    const { position } = req.params;
    
    const hosts = await ButterflyHost.find({ position }).sort({ createdAt: -1 });
    
    res.status(200).json({ 
      success: true,
      count: hosts.length,
      position,
      hosts 
    });
  } catch (error) {
    console.error(`Error fetching butterfly hosts for position ${req.params.position}:`, error);
    res.status(500).json({ 
      success: false,
      message: "Error fetching butterfly hosts by position",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// Get a single butterfly host by ID
export const getButterflyHostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const host = await ButterflyHost.findById(id);
    
    if (!host) {
      return res.status(404).json({
        success: false,
        message: "Butterfly host not found"
      });
    }
    
    res.status(200).json({
      success: true,
      host
    });
  } catch (error) {
    console.error(`Error fetching butterfly host with ID ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: "Error fetching butterfly host",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// Create a new butterfly host
export const createButterflyHost = async (req: Request, res: Response) => {
  try {
    const { url, title, imageUrl, position } = req.body;
    
    // Validate required fields
    if (!url || !title || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "url, title and imageUrl are required fields"
      });
    }
    
    const newHost = new ButterflyHost({
      url,
      title,
      imageUrl,
      position
    });
    
    const savedHost = await newHost.save();
    
    res.status(201).json({
      success: true,
      message: "Butterfly host created successfully",
      host: savedHost
    });
  } catch (error) {
    console.error("Error creating butterfly host:", error);
    res.status(500).json({
      success: false,
      message: "Error creating butterfly host",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// Update a butterfly host
export const updateButterflyHost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { url, title, imageUrl, position } = req.body;
    
    // Check that at least one field is being updated
    if (!url && !title && !imageUrl && position === undefined) {
      return res.status(400).json({
        success: false,
        message: "At least one field must be provided for update"
      });
    }
    
    const updatedFields: Record<string, any> = {};
    if (url) updatedFields.url = url;
    if (title) updatedFields.title = title;
    if (imageUrl) updatedFields.imageUrl = imageUrl;
    if (position !== undefined) updatedFields.position = position;
    
    const updatedHost = await ButterflyHost.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true, runValidators: true }
    );
    
    if (!updatedHost) {
      return res.status(404).json({
        success: false,
        message: "Butterfly host not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Butterfly host updated successfully",
      host: updatedHost
    });
  } catch (error) {
    console.error(`Error updating butterfly host with ID ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: "Error updating butterfly host",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// Delete a butterfly host
export const deleteButterflyHost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const deletedHost = await ButterflyHost.findByIdAndDelete(id);
    
    if (!deletedHost) {
      return res.status(404).json({
        success: false,
        message: "Butterfly host not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Butterfly host deleted successfully"
    });
  } catch (error) {
    console.error(`Error deleting butterfly host with ID ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: "Error deleting butterfly host",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}; 