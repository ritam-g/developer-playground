/**
 * Axios instance (API gateway).
 *
 * Why this exists:
 * - Centralizes all HTTP configuration in one place.
 * - Automatically attaches the JWT token to every request.
 * - Handles 401 errors globally (auto-logout on token expiry).
 * - Avoids repeating base URL and headers in every service file.
 */
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
});

// ── Request Interceptor ────────────────────────────────────
// Runs before every outgoing request.
// Reads the token from localStorage and attaches it to the Authorization header.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ───────────────────────────────────
// Runs after every incoming response.
// If the server returns 401 (token expired/invalid), we clear storage and redirect to login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
