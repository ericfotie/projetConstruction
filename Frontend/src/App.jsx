import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ContactForm from './pages/client/ContactForm';
import ClientDashboard from './pages/client/ClientDashboard';

import AdminLogin from './pages/admin/AdminLogin';
import MessageManager from './pages/admin/MessageManager';
import CategorieManager from './pages/admin/CategorieManager';
import { AdminServices } from './pages/admin/AdminServices';
import ProjetManager from './pages/admin/ProjetManager';

import AdminLayout from './layout/AdminLayout';
import { AdminGuard, PublicGuard } from './layout/AdminGuard';

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

function App() {
    return (
        <ThemeProvider theme={md3Theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/client" element={<ClientDashboard />} />
                    <Route path="/contact" element={<ContactForm />} />

                    <Route path="/admin-login" element={<PublicGuard><AdminLogin /></PublicGuard>} />

                    <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
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
