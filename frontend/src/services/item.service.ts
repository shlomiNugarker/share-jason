import { httpService } from "./http.service";

// interface Item {
//   _id: string;
//   name: string;
//   description: string;
//   imageUrl: string;
//   status: "active" | "inactive" | "archived";
//   createdBy: string;
//   updatedBy: string;
//   createdAt: string;
//   updatedAt: string;
// }

interface ItemFormData {
  name: string;
  description: string;
  imageUrl: string;
  status?: "active" | "inactive" | "archived";
}

const API_ENDPOINT = "/api/items";

export const itemService = {
  async getAll() {
    return httpService.get(API_ENDPOINT, false);
  },

  async getById(id: string) {
    return httpService.get(`${API_ENDPOINT}/${id}`, true);
  },

  async create(itemData: ItemFormData) {
    return httpService.post(API_ENDPOINT, itemData, true);
  },

  async update(id: string, itemData: Partial<ItemFormData>) {
    return httpService.put(`${API_ENDPOINT}/${id}`, itemData, true);
  },

  async delete(id: string) {
    return httpService.del(`${API_ENDPOINT}/${id}`, true);
  },

  async uploadImage(file: File) {
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSizeInBytes) {
      throw new Error(`הקובץ גדול מדי. הגודל המקסימלי המותר הוא 10MB`);
    }
    
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch("http://localhost:3030/api/upload", {
        method: "POST",
        headers,
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          if (errorData.error && errorData.error.includes("File size")) {
            throw new Error("הקובץ גדול מדי. נסה להעלות תמונה קטנה יותר (עד 10MB)");
          }
          throw new Error(errorData.error || errorData.message || "שגיאה בהעלאת הקובץ");
        }
        throw new Error(`שגיאת שרת ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.file || !result.file.url) {
        throw new Error("התקבלה תגובה שגויה מהשרת");
      }
      
      return { 
        imageUrl: result.file.url 
      };
    } catch (error) {
      console.error("שגיאת העלאת תמונה:", error);
      throw error;
    }
  },
}; 