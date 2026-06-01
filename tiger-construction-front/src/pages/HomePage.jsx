import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-slate-950">
            {/* Background avec image de villa moderne */}
            <div
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070')] bg-cover bg-center"
            >
                <div className="absolute inset-0 bg-blue-950/85 backdrop-blur-[2px]"></div>
            </div>

            {/* Header section */}
            <div className="text-center mb-16 relative z-10 max-w-2xl px-4">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
                    Tiger <span className="text-blue-400">Construction</span>
                </h1>
                <p className="text-slate-300 text-lg md:text-xl font-light">
                    L'excellence en génie civil. Choisissez votre espace pour commencer.
                </p>
            </div>

            {/* Cartes d'accès (MD3 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl relative z-10">

                {/* Option Client */}
                <Link
                    to="/client"
                    className="group bg-white/5 border border-white/10 backdrop-blur-md rounded-[2.5rem] p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                >
                    <div className="w-14 h-14 bg-blue-500 rounded-3xl flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-blue-500/20">
                        📊
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Espace Client</h2>
                    <p className="text-slate-300 leading-relaxed mb-8">
                        Suivi en temps réel, accès à vos plans et évolution de vos chantiers.
                    </p>
                    <div className="text-blue-400 font-bold group-hover:translate-x-2 transition-transform">
                        Accéder →
                    </div>
                </Link>

                {/* Option Admin */}
                <Link
                    to="/admin/messages"
                    className="group bg-white/5 border border-white/10 backdrop-blur-md rounded-[2.5rem] p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                >
                    <div className="w-14 h-14 bg-amber-500 rounded-3xl flex items-center justify-center text-blue-950 text-2xl mb-6 shadow-lg shadow-amber-500/20">
                        ⚙️
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Espace Admin</h2>
                    <p className="text-slate-300 leading-relaxed mb-8">
                        Gestion technique, pilotage des projets et administration générale.
                    </p>
                    <div className="text-amber-400 font-bold group-hover:translate-x-2 transition-transform">
                        Gérer →
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default HomePage;