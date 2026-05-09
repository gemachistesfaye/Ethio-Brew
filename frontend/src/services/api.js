import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Product Services
export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

// Order Services
export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

// Payment Services
export const uploadPaymentProof = async (paymentData) => {
  const response = await api.post('/payments/upload', paymentData);
  return response.data;
};

export default api;
