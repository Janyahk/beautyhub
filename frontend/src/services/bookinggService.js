// services/bookingService.js

import API from "./api";

// Create booking
export const createBooking = (data) =>
  API.post("/bookings", data);

// Get all bookings
export const getBookings = () =>
  API.get("/bookings");

// Update booking
export const updateBooking = (id, data) =>
  API.put(`/bookings/${id}`, data);

// Delete booking
export const deleteBooking = (id) =>
  API.delete(`/bookings/${id}`);