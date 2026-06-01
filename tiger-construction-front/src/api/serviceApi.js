import axios from 'axios';

const API_URL = "http://localhost:8080/api";

// Public : accessible à tous
export const fetchPublicServices = () => axios.get(`${API_URL}/public/services`);

// Admin : nécessite potentiellement un token JWT plus tard
export const fetchAllServices = () => axios.get(`${API_URL}/admin/services`);
export const createService = (data) => axios.post(`${API_URL}/admin/services`, data);
export const updateService = (id, data) => axios.put(`${API_URL}/admin/services/${id}`, data);
export const toggleServiceStatus = (id, isActive) =>
    axios.patch(`${API_URL}/admin/services/${id}/etat?isActive=${isActive}`);
export const deleteService = (id) => axios.delete(`${API_URL}/admin/services/${id}`);