import { httpService } from "./http.service";

export interface Field {
  name: string;
  type: "string" | "number" | "boolean" | "date";
  required: boolean;
}

export interface DynamicSchema {
  _id: string;
  name: string;
  description: string;
  fields: Field[];
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface SchemaFormData {
  name: string;
  description: string;
  fields: Field[];
}

const API_ENDPOINT = "/api/schemas";

export const dynamicSchemaService = {
  async getAll() {
    return httpService.get(API_ENDPOINT, true);
  },

  async getById(id: string) {
    return httpService.get(`${API_ENDPOINT}/${id}`, true);
  },

  async create(schemaData: SchemaFormData) {
    return httpService.post(API_ENDPOINT, schemaData, true);
  },

  async update(id: string, schemaData: Partial<SchemaFormData>) {
    return httpService.put(`${API_ENDPOINT}/${id}`, schemaData, true);
  },

  async delete(id: string) {
    return httpService.del(`${API_ENDPOINT}/${id}`, true);
  },
}; 