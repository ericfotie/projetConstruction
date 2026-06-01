import { Navigate } from 'react-router-dom';

export const AdminGuard = ({ children }) => {
    // Vérification de l'état d'authentification
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';

    // Si authentifié, on affiche le contenu (le layout admin), sinon on redirige vers le login
    return isAuthenticated ? children : <Navigate to="/admin-login" replace />;
};