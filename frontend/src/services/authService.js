// services/authService.js

import API from "./api";

// Register
export const registerUser = (data) => {
  return API.post("/register", data);
};

// Login
export const loginUser = (data) => {
  return API.post("/login", data);
};