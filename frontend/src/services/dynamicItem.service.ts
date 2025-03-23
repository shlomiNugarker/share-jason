import { httpService } from "./http.service";

export interface DynamicItem {
  _id: string;
  schemaId: string;
  name: string;
  data: Record<string, any>;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface DynamicItemFormData {
  schemaId: string;
  name: string;
  data: Record<string, any>;
}

const API_ENDPOINT = "/api/dynamic-items";

export const dynamicItemService = {
  async getAllBySchema(schemaId: string) {
    return httpService.get(`${API_ENDPOINT}/schema/${schemaId}`, true);
  },

  async getById(id: string) {
    return httpService.get(`${API_ENDPOINT}/${id}`, true);
  },

  async create(itemData: DynamicItemFormData) {
    return httpService.post(API_ENDPOINT, itemData, true);
  },

  async update(id: string, itemData: Partial<Omit<DynamicItemFormData, "schemaId">>) {
    return httpService.put(`${API_ENDPOINT}/${id}`, itemData, true);
  },

  async delete(id: string) {
    return httpService.del(`${API_ENDPOINT}/${id}`, true);
  },
}; 