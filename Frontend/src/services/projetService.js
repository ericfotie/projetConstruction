import API, { API_FILES } from '../api/axios'; // Importez API_FILES pour le multipart

export const projetService = {
    // ==========================================
    // 🌐 ESPACE VISITEURS (PUBLIC) - Utilise API (JSON)
    // ==========================================
    getAccueil: () => API.get('/projets/accueil'),
    getDetails: (id) => API.get(`/projets/${id}`),
    getByCategorie: (categorieId) => API.get(`/projets/categorie/${categorieId}`),
    rechercher: (keyword) => API.get(`/projets/recherche`, { params: { keyword } }),

    // ==========================================
    // 🐯 ESPACE GESTION (ADMINISTRATION)
    // ==========================================

    /**
     * Création de projet
     * Utilise API_FILES pour laisser Axios générer le boundary multipart/form-data
     */
    creerProjet: (data, photos, plans) => {
        const formData = new FormData();

        // Ajout du DTO JSON
        formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

        // Ajout des fichiers
        if (photos && photos.length > 0) {
            photos.forEach(f => formData.append('photos', f));
        }
        if (plans && plans.length > 0) {
            plans.forEach(f => formData.append('plans', f));
        }

        // On utilise API_FILES ici au lieu de API
        return API_FILES.post('/projets/admin', formData);
    },

    // Les autres méthodes utilisent API (JSON)
    modifierProjet: (id, data) => {
        if (!id) throw new Error("ID de projet manquant pour la modification");
        return API.put(`/projets/admin/${id}`, data);
    },

    modifierStatut: (id, statut) => API.patch(`/projets/admin/${id}/statut`, null, {
        params: { statut }
    }),

    supprimerProjet: (id) => API.delete(`/projets/admin/${id}`),

    // ==========================================
    // 🖼️ GESTIONNAIRE DE LA GALERIE MEDIA (ADMIN)
    // ==========================================
    definirPhotoPrincipale: (projetId, photoId) =>
        API.patch(`/projets/admin/${projetId}/galerie/principale/${photoId}`),

    supprimerPhoto: (photoId) =>
        API.delete(`/projets/admin/galerie/photos/${photoId}`)
};