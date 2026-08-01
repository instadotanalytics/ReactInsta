// Auth utility functions for admin authentication

export const getToken = () => {
  return localStorage.getItem('adminToken');
};

export const setToken = (token) => {
  localStorage.setItem('adminToken', token);
};

export const removeToken = () => {
  localStorage.removeItem('adminToken');
};

export const isAuthenticated = () => {
  return !!getToken();
};

// Get admin user info
export const getAdminUser = () => {
  const user = localStorage.getItem('adminUser');
  return user ? JSON.parse(user) : null;
};

export const setAdminUser = (user) => {
  localStorage.setItem('adminUser', JSON.stringify(user));
};

export const removeAdminUser = () => {
  localStorage.removeItem('adminUser');
};

// Get auth headers for API requests
export const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// Check if token is valid (not expired)
export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    // Decode token to check expiry
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;
    return Date.now() < expiry;
  } catch {
    return false;
  }
};