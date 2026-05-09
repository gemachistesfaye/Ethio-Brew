import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';
axios.defaults.withCredentials = true;

const authService = {
  register: async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  },
  verify: async (userId) => {
    const response = await axios.post(`${API_URL}/verify`, { userId });
    return response.data;
  },
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  logout: async () => {
    await axios.post(`${API_URL}/logout`);
    localStorage.removeItem('user');
  },
  getProfile: async () => {
    const response = await axios.get(`${API_URL}/profile`);
    return response.data;
  },
  updateProfile: async (userData) => {
    const response = await axios.put(`${API_URL}/profile`, userData);
    return response.data;
  }
};

export default authService;
