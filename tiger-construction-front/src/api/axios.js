import axios from 'axios';

// En production, on utilise des chemins relatifs (ex: /api/...)
// Nginx se chargera de rediriger ces requêtes vers le backend
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const config = {
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
};

const API = axios.create(config);
export const API_FILES = axios.create({ baseURL: BASE_URL, withCredentials: true });

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.location.href = '/admin-login';
        }
        return Promise.reject(error);
    }
);

export default API;