import { httpService } from "./http.service";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const API_ENDPOINT = "/api/users";

export const userService = {
  async getProfile() {
    return httpService.get(`${API_ENDPOINT}/profile`, true);
  },

  async getAllUsers() {
    return httpService.get(API_ENDPOINT, true);
  },

  async getUserById(id: string) {
    return httpService.get(`${API_ENDPOINT}/${id}`, true);
  },

  async updateUserRole(id: string, role: "user" | "admin") {
    return httpService.put(`${API_ENDPOINT}/${id}/role`, { role }, true);
  },

  async updateUserActiveStatus(id: string, isActive: boolean) {
    return httpService.put(`${API_ENDPOINT}/${id}/status`, { isActive }, true);
  },
}; 