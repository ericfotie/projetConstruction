import { Navigate } from 'react-router-dom';

export const AdminGuard = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('adminToken');
    return isAuthenticated ? children : <Navigate to="/admin-login" replace />;
};

export const PublicGuard = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('adminToken');
    return !isAuthenticated ? children : <Navigate to="/admin" replace />;
};