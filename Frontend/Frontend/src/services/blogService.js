// ============================================
// API CONFIGURATION
// ============================================

// Get API base URL from environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Helper to get auth token
const getToken = () => {
  return localStorage.getItem('adminToken') || localStorage.getItem('token');
};

// Helper for API calls
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  // For FormData, remove Content-Type (browser will set it with boundary)
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  try {
    const response = await fetch(url, config);
    
    // Check if response is HTML (error case)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      throw new Error('Server returned HTML instead of JSON. Please check if the API endpoint is correct.');
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error.message);
    throw error;
  }
};

// ============================================
// BLOG SERVICE
// ============================================

export const blogService = {
  // ============================================
  // PUBLIC ROUTES (No authentication required)
  // ============================================
  
  getPublishedBlogs: async (page = 1, limit = 9, category = '') => {
    let endpoint = `/blogs/published?page=${page}&limit=${limit}`;
    if (category) {
      endpoint += `&category=${encodeURIComponent(category)}`;
    }
    return apiRequest(endpoint);
  },

  getBlogBySlug: async (slug) => {
    return apiRequest(`/blogs/${slug}`);
  },

  getFeaturedBlogs: async (limit = 3) => {
    return apiRequest(`/blogs/featured?limit=${limit}`);
  },

  getBlogsByCategory: async (category, limit = 6) => {
    return apiRequest(`/blogs/category/${encodeURIComponent(category)}?limit=${limit}`);
  },

  searchBlogs: async (query, limit = 10) => {
    if (!query || query.trim().length < 2) {
      throw new Error('Search query must be at least 2 characters');
    }
    return apiRequest(`/blogs/search?q=${encodeURIComponent(query)}&limit=${limit}`);
  },

  incrementViews: async (id) => {
    return apiRequest(`/blogs/${id}/view`, {
      method: 'POST',
    });
  },

  // ============================================
  // ADMIN ROUTES (Authentication required)
  // ============================================
  
  getAllBlogs: async () => {
    return apiRequest('/blogs');
  },

  createBlog: async (formData) => {
    return apiRequest('/blogs', {
      method: 'POST',
      body: formData,
    });
  },

  updateBlog: async (id, formData) => {
    return apiRequest(`/blogs/${id}`, {
      method: 'PUT',
      body: formData,
    });
  },

  deleteBlog: async (id) => {
    return apiRequest(`/blogs/${id}`, {
      method: 'DELETE',
    });
  },
};

// Default export for backward compatibility
export default blogService;