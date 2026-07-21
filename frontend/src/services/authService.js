import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/auth`
  : 'http://localhost:5000/api/auth';

// Send credentials (httpOnly refresh cookie) and receive auth where needed.
axios.defaults.withCredentials = true;

/**
 * Attach the access token (stored on login) as a Bearer header for every
 * authenticated request. This is consumed by the backend's `protect`
 * middleware.
 */
const authHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const authService = {
  register: async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData, {
      withCredentials: true
    });
    return response.data;
  },

  // The backend now expects a signed verification token, NOT a raw userId.
  // The token arrives via the email link's ?token= query param.
  verify: async (token) => {
    const response = await axios.post(`${API_URL}/verify`, { token });
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { headers: authHeaders() });
    } catch (e) {
      // Even if the server call fails, clear local state so the user is
      // effectively logged out on the client.
    }
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  getProfile: async () => {
    const response = await axios.get(`${API_URL}/profile`, { headers: authHeaders() });
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await axios.put(`${API_URL}/profile`, userData, { headers: authHeaders() });
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  },

  resetPassword: async (data) => {
    const response = await axios.post(`${API_URL}/reset-password`, data);
    return response.data;
  },

  changePassword: async (data) => {
    const response = await axios.post(`${API_URL}/change-password`, data, { headers: authHeaders() });
    return response.data;
  }
};

export default authService;
