// src/config/api.js

// Main API URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Server base URL (for static files like uploads)
export const SERVER_BASE_URL = API_BASE_URL
  ? API_BASE_URL.replace("/api", "")
  : "";

// Common fetch helper (optional but professional)
export const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};