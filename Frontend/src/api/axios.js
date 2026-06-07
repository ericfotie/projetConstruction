import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8090/api';

const API = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const API_FILES = axios.create({ baseURL: BASE_URL });

const attachToken = (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

API.interceptors.request.use(attachToken);
API_FILES.interceptors.request.use(attachToken);

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('adminToken');
            window.location.href = '/admin-login';
        }
        return Promise.reject(error);
    }
);

export default API;
