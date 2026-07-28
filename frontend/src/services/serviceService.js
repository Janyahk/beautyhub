// services/serviceService.js

import API from "./api";

// Get all services
export const getServices = () => API.get("/services");

// Create service (Admin)
export const createService = (data) => API.post("/services", data);

// Update service
export const updateService = (id, data) =>
  API.put(`/services/${id}`, data);

// Delete service
export const deleteService = (id) =>
  API.delete(`/services/${id}`);