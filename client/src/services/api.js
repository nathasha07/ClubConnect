import axios from "axios";

// In development, use /api (proxied by Vite)
// In production, use full URL from env
const API_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_URL || "https://api.example.com/api"
  : "/api";

const API = axios.create({
  baseURL: API_URL
});

// Automatically attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// Handle response errors
API.interceptors.response.use(
  (resp) => resp,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
