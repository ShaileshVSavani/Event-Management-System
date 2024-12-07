import axios from "axios";

// const API_URL = "http://localhost:5000/api";
const API_URL = "https://event-management-system-2s8o.onrender.com/api";

export const api = axios.create({
  baseURL: API_URL,
});

// Add a token to the headers for authenticated routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
