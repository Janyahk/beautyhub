// services/courseService.js

import API from "./api";

// Get courses
export const getCourses = () =>
  API.get("/courses");

// Create course
export const createCourse = (data) =>
  API.post("/courses", data);

// Update course
export const updateCourse = (id, data) =>
  API.put(`/courses/${id}`, data);

// Delete course
export const deleteCourse = (id) =>
  API.delete(`/courses/${id}`);