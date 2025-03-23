import { httpService } from "./http.service";

export interface ButterflyHost {
  _id: string;
  url: string;
  title: string;
  imageUrl: string;
  position?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ButterflyHostFormData {
  url: string;
  title: string;
  imageUrl: string;
  position?: string;
}

interface ButterflyHostsResponse {
  success: boolean;
  count: number;
  hosts: ButterflyHost[];
}

interface ButterflyHostResponse {
  success: boolean;
  host: ButterflyHost;
}

interface ButterflyHostsByPositionResponse {
  success: boolean;
  count: number;
  position: string;
  hosts: ButterflyHost[];
}

const API_ENDPOINT = "/api/butterfly-hosts";

export const butterflyHostService = {
  // Get all butterfly hosts
  getAll: async (): Promise<ButterflyHostsResponse> => {
    return httpService.get(API_ENDPOINT, true);
  },

  // Get butterfly hosts by position
  getByPosition: async (position: string): Promise<ButterflyHostsByPositionResponse> => {
    return httpService.get(`${API_ENDPOINT}/position/${position}`, true);
  },

  // Get a butterfly host by ID
  getById: async (id: string): Promise<ButterflyHostResponse> => {
    return httpService.get(`${API_ENDPOINT}/${id}`, true);
  },

  // Create a new butterfly host
  create: async (hostData: ButterflyHostFormData): Promise<ButterflyHostResponse> => {
    return httpService.post(API_ENDPOINT, hostData, true);
  },

  // Update a butterfly host
  update: async (id: string, hostData: Partial<ButterflyHostFormData>): Promise<ButterflyHostResponse> => {
    return httpService.put(`${API_ENDPOINT}/${id}`, hostData, true);
  },

  // Delete a butterfly host
  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    return httpService.del(`${API_ENDPOINT}/${id}`, true);
  },

  // Reuse upload image from item.service.ts
  uploadImage: async (file: File): Promise<{ imageUrl: string }> => {
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSizeInBytes) {
      throw new Error(`הקובץ גדול מדי. הגודל המקסימלי המותר הוא 10MB`);
    }
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3030/api/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
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