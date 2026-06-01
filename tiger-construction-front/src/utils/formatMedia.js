const API_BASE_URL = "http://localhost:8080";

export const formatFileUrl = (path) => {
    if (!path) return "https://via.placeholder.com/400x300?text=Aucun+Media";

    // Si le chemin contient déjà http, on le retourne tel quel
    if (path.startsWith("http")) return path;

    // Ajoute le slash si nécessaire et concatène avec l'URL du serveur
    return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};