import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Importations des pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage'; // Ajout de l'importation
import ContactForm from './pages/client/ContactForm';
import ClientDashboard from './pages/client/ClientDashboard';
import AdminLogin from './features/admin/AdminLogin';

// Importations des composants et features admin
import CategorieManager from './features/categories/CategorieManager';
import MessageManager from './features/admin/MessageManager';
import { AdminServices } from './components/AdminServices';
import ProjetManager from './features/admin/ProjetManager';
import AdminLayout from './components/AdminLayout';

const md3Theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#6750A4' },
        secondary: { main: '#625B71' },
        background: { default: '#FDF7FF' }
    },
    shape: { borderRadius: 16 },
    typography: { button: { textTransform: 'none' } }
});

// Gardien pour les zones privées
const AdminProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
    return isAuthenticated ? children : <Navigate to="/admin-login" replace />;
};

// Gardien pour éviter de retourner au login si déjà connecté
const PublicRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
    return !isAuthenticated ? children : <Navigate to="/admin" replace />;
};

function App() {
    return (
        <ThemeProvider theme={md3Theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    {/* Routes Publiques */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/services" element={<ServicesPage />} /> {/* Ajout de la route */}
                    <Route path="/client" element={<ClientDashboard />} />
                    <Route path="/contact" element={<ContactForm />} />

                    {/* Route de connexion (protégée contre les admins déjà connectés) */}
                    <Route
                        path="/admin-login"
                        element={
                            <PublicRoute>
                                <AdminLogin />
                            </PublicRoute>
                        }
                    />

                    {/* Espace Administration protégé */}
                    <Route
                        path="/admin"
                        element={
                            <AdminProtectedRoute>
                                <AdminLayout />
                            </AdminProtectedRoute>
                        }
                    >
                        <Route index element={<Navigate to="messages" replace />} />
                        <Route path="messages" element={<MessageManager />} />
                        <Route path="categories" element={<CategorieManager />} />
                        <Route path="services" element={<AdminServices />} />
                        <Route path="projets" element={<ProjetManager />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;