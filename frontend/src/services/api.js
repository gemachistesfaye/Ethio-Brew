import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach the JWT (if present) to every request, and clean up on 401.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralized 401 handling: a bad/expired token should sign the user out
// rather than silently failing on every subsequent request.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Only redirect if we're not already on an auth page.
      const path = window.location.pathname;
      if (!['/login', '/register', '/forgot-password', '/reset-password', '/verify'].includes(path)) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Product Services
export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const createProduct = async (data) => {
  const response = await api.post('/products', data);
  return response.data;
};

// Order Services
export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

// Payment Services
export const uploadPaymentProof = async (paymentData) => {
  const response = await api.post('/payments/upload', paymentData);
  return response.data;
};

export const getPendingPayments = async () => {
  const response = await api.get('/payments/pending');
  return response.data;
};

export default api;
