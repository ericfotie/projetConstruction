import API from '../api/axios'; // Importez votre instance configurée

const RESOURCE_URL = '/admin/categories';

export const categorieService = {
    getAll: () => API.get(RESOURCE_URL),

    create: (data) => API.post(RESOURCE_URL, data),

    update: (id, data) => API.put(`${RESOURCE_URL}/${id}`, data),

    delete: (id) => API.delete(`${RESOURCE_URL}/${id}`)
};