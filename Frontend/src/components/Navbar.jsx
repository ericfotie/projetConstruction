import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const getLinkClass = (path) =>
        `flex items-center px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            location.pathname === path
                ? 'bg-[#6750A4] text-white' // Couleur MD3 Primaire
                : 'text-[#CAC4D0] hover:text-white hover:bg-[#49454E]/50'
        }`;

    return (
        <nav className="bg-[#1C1B1F] border-b border-[#49454E] px-6 py-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#D0BCFF] rounded-xl flex items-center justify-center font-bold text-[#381E72] shadow-sm">
                        T
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-lg leading-tight">Tiger</span>
                        <span className="text-[#CAC4D0] text-[10px] uppercase tracking-widest">Construction</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-2 bg-[#2B2930] p-1.5 rounded-full border border-[#49454E]">
                    <Link to="/" className={getLinkClass('/')}>Accueil</Link>
                    <Link to="/services" className={getLinkClass('/services')}>Services</Link>
                    <Link to="/client" className={getLinkClass('/client')}>Mon Espace</Link>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-2 pb-4">
                    <Link to="/" className={getLinkClass('/')} onClick={() => setIsOpen(false)}>Accueil</Link>
                    <Link to="/services" className={getLinkClass('/services')} onClick={() => setIsOpen(false)}>Services</Link>
                    <Link to="/client" className={getLinkClass('/client')} onClick={() => setIsOpen(false)}>Mon Espace</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;