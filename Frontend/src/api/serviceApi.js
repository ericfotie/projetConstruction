import API from './axios';

export const fetchPublicServices = () => API.get('/public/services');
export const fetchAllServices = () => API.get('/admin/services');
export const createService = (data) => API.post('/admin/services', data);
export const updateService = (id, data) => API.put(`/admin/services/${id}`, data);
export const toggleServiceStatus = (id, isActive) =>
    API.patch(`/admin/services/${id}/etat?isActive=${isActive}`);
export const deleteService = (id) => API.delete(`/admin/services/${id}`);
