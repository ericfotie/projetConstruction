import API from '../api/axios';

const RESOURCE_URL = '/admin/messages';

export const messageService = {
    // Client
    envoyer: (data) => API.post('/public/messages', data),

    // Admin
    getAll: () => API.get(RESOURCE_URL),
    marquerTraite: (id) => API.patch(`${RESOURCE_URL}/${id}/traiter`),
    supprimer: (id) => API.delete(`${RESOURCE_URL}/${id}`)
};