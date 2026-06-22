// src/config/api.js

// Main API URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// App Name (from .env)
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'MyInstaDotAnalytics';

// Frontend URL (auto-detect from browser)
export const APP_URL = typeof window !== 'undefined' 
  ? window.location.origin 
  : 'https://instadotanalytics.com';

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

// Export default object for easier imports
export default {
  API_BASE_URL,
  APP_NAME,
  APP_URL,
  SERVER_BASE_URL,
  apiFetch
};