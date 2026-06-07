import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { projetService } from '../../services/projetService';

const ProjetCard = ({ p }) => (
    // w-full assure que la carte prend toute la largeur disponible
    <div className="group bg-white rounded-[2rem] overflow-hidden border border-[#EADDFF] shadow-sm hover:shadow-lg transition-all duration-300 w-full flex flex-col">
        <div className="h-64 w-full bg-slate-100 relative overflow-hidden">
            {p.galerie && p.galerie.length > 0 && (
                <img
                    src={`http://127.0.0.1:8090/api/media/images/${p.galerie[0].id}`}
                    alt={p.titre}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
            )}
        </div>
        <div className="p-6">
            <div className="flex flex-wrap gap-3 justify-between items-start mb-4">
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                    p.statut === 'TERMINE' ? 'bg-green-100 text-green-800' :
                        p.statut === 'EN_COURS' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                }`}>
                    {p.statut === 'EN_COURS' ? 'En cours' : p.statut === 'ETUDE' ? 'En étude' : 'Terminé'}
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full uppercase">
                    {p.nomCategorie}
                </span>
            </div>
            <h3 className="text-xl font-bold text-[#1C1B1F] mb-3">{p.titre}</h3>
            <p className="text-[#49454E] text-sm leading-relaxed mb-6 line-clamp-3">{p.description}</p>
            <div className="pt-4 border-t border-slate-100 text-sm text-[#49454E] flex items-center gap-2">
                <span>📍</span> {p.localisation}
            </div>
        </div>
    </div>
);

const ClientDashboard = () => {
    const [projets, setProjets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showProjets, setShowProjets] = useState(false);

    useEffect(() => {
        const fetchProjets = async () => {
            try {
                const response = await projetService.getAccueil();
                setProjets(response.data);
            } catch (error) { console.error(error); } finally { setLoading(false); }
        };
        fetchProjets();
    }, []);

    return (
        <div className="min-h-screen bg-[#FDF7FF] flex flex-col font-sans">
            <Navbar />

            {/* Header avec hauteur ajustable */}
            <div className="relative w-full h-[30vh] md:h-[40vh] bg-[#6750A4] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#6750A4] to-[#1C1B1F] opacity-90"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">Bienvenue chez TIGER CONSTRUCTION</h1>
                    <p className="text-lg md:text-xl text-[#EADDFF] font-medium px-4">Le meilleur partenaire pour vous accompagner dans la réussite de tous vos projets.</p>
                </div>
            </div>

            {/* Conteneur principal avec padding responsive */}
            <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-6 -mt-16 pb-16 z-10">
                {!showProjets ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#EADDFF]">
                            <h2 className="text-xl font-bold text-[#1C1B1F] mb-2">Mes Projets</h2>
                            <p className="text-[#49454E] mb-6">{loading ? "Chargement..." : `${projets.length} projet(s) en cours.`}</p>
                            <button onClick={() => setShowProjets(true)} className="w-full py-3 bg-[#6750A4] text-white rounded-full font-bold hover:bg-[#584494] transition-all">
                                Consulter
                            </button>
                        </div>
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#EADDFF]">
                            <h2 className="text-xl font-bold text-[#1C1B1F] mb-2">Support</h2>
                            <p className="text-[#49454E] mb-6">Besoin d'assistance ? Nos experts sont à votre disposition.</p>
                            <Link to="/contact" className="block text-center w-full py-3 bg-[#F3EDF7] text-[#1C1B1F] rounded-full font-bold hover:bg-[#EADDFF] transition-all">
                                Contacter
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <button onClick={() => setShowProjets(false)} className="inline-flex items-center gap-2 px-6 py-2 bg-white border border-[#CAC4D0] rounded-full font-bold text-[#1C1B1F] hover:bg-slate-50 transition-all">
                            ← Retour
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projets.map((p, i) => <ProjetCard key={i} p={p} />)}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ClientDashboard;