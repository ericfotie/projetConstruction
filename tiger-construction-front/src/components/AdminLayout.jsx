import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { path: '/admin/messages', label: 'Messages', icon: '✉️' },
        { path: '/admin/categories', label: 'Catégories', icon: '📂' },
        { path: '/admin/services', label: 'Services', icon: '🛠️' },
        { path: '/admin/projets', label: 'Projets', icon: '🏗️' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('isAdminAuthenticated');
        navigate('/admin-login');
    };

    return (
        <div className="min-h-screen bg-[#FDF7FF] flex flex-col font-sans text-[#1C1B1F]">
            <Navbar />

            {/* Mobile Toggle Button */}
            <button
                className="md:hidden p-4 text-[#49454E]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? '✕ Fermer' : '☰ Menu Administration'}
            </button>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar MD3 Style */}
                <aside className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-white border-r border-[#EADDFF] p-6 flex flex-col`}>
                    <h2 className="text-xs font-bold text-[#49454E] uppercase tracking-widest mb-6 px-2">Navigation</h2>
                    <nav className="flex-1 space-y-2">
                        {navItems.map((item) => {
                            const active = location.pathname.includes(item.path.split('/')[2]);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-full font-semibold transition-all ${
                                        active
                                            ? 'bg-[#EADDFF] text-[#21005D]'
                                            : 'text-[#49454E] hover:bg-[#F3EDF7]'
                                    }`}
                                >
                                    <span>{item.icon}</span> {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <button
                        onClick={handleLogout}
                        className="mt-auto flex items-center gap-3 px-4 py-3 rounded-full text-[#B3261E] font-semibold hover:bg-[#F9DEDC] transition-all"
                    >
                        <span>🚪</span> Déconnexion
                    </button>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#FDF7FF]">
                    <div className="max-w-6xl mx-auto">
                        <header className="mb-8">
                            <h1 className="text-3xl font-extrabold text-[#1C1B1F]">
                                Administration <span className="text-[#6750A4]">Tiger</span>
                            </h1>
                            <p className="text-[#49454E]">Espace de gestion sécurisé.</p>
                        </header>

                        <div className="bg-white rounded-[2rem] shadow-sm border border-[#EADDFF] p-6 md:p-8 min-h-[600px]">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;