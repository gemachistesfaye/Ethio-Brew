import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true // send httpOnly cookies (refresh token)
});

/**
 * Attach the access token to every request automatically.
 * Reads from localStorage (set on login / refresh).
 */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

/**
 * On 401, attempt a silent refresh. If refresh succeeds, retry the original
 * request; otherwise clear auth state and redirect to login.
 */
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/login') {
            originalRequest._retry = true;
            try {
                const { data } = await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
                const newToken = data.token;
                localStorage.setItem('token', newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshErr) {
                // Refresh failed — force logout.
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.location.href = '/login';
                return Promise.reject(refreshErr);
            }
        }
        return Promise.reject(error);
    }
);

// ============================================================
// Product Services
// ============================================================
export const getProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

// ============================================================
// Order Services
// ============================================================
export const createOrder = async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
};

export const getOrders = async () => {
    const response = await api.get('/orders');
    return response.data;
};

// ============================================================
// Payment Services
// ============================================================
export const uploadPaymentProof = async (paymentData) => {
    const response = await api.post('/payments/upload', paymentData);
    return response.data;
};

// ============================================================
// Admin Services
// ============================================================
export const getAnalytics = async () => {
    const response = await api.get('/admin/analytics');
    return response.data;
};

export const getAdminUsers = async () => {
    const response = await api.get('/admin/users');
    return response.data;
};

export const resetDatabase = async () => {
    const response = await api.post('/admin/reset-database', { confirm: 'DELETE_ALL' });
    return response.data;
};

// ============================================================
// Auth Services
// ============================================================
export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.user) localStorage.setItem('user', JSON.stringify(response.data.user));
    if (response.data.token) localStorage.setItem('token', response.data.token);
    return response.data;
};

export const logout = async () => {
    try {
        await api.post('/auth/logout');
    } catch (e) { /* ignore */ }
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

export const verify = async (token) => {
    const response = await api.post('/auth/verify', { token });
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get('/auth/profile');
    return response.data;
};

export const updateProfile = async (userData) => {
    const response = await api.put('/auth/profile', userData);
    return response.data;
};

export const forgotPassword = async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
};

export const resetPassword = async (data) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
};

export const changePassword = async (data) => {
    const response = await api.post('/auth/change-password', data);
    return response.data;
};

export const resendVerification = async (email) => {
    const response = await api.post('/auth/resend-verification', { email });
    return response.data;
};

export default api;
