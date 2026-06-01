import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const services = [
    { title: "Conception de plans", desc: "Études architecturales sur-mesure adaptées à vos besoins.", img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=600" },
    { title: "Modélisation 2D/3D", desc: "Visualisez votre projet avant la construction.", img: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=600" },
    { title: "Rendu Vidéo", desc: "Immersion totale dans votre futur espace.", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600" },
    { title: "Calcul de structures", desc: "Expertise technique pour garantir la solidité.", img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600" },
    { title: "Réalisation & Construction", desc: "Mise en œuvre rigoureuse sur le terrain.", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600" },
    { title: "Suivi de chantiers", desc: "Transparence totale et respect des délais.", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600" },
    { title: "Rectification", desc: "Expertise sur structures existantes.", img: "https://cdn.pixabay.com/photo/2016/11/18/17/46/architecture-1836070_1280.jpg" },
    { title: "Conseil en bâtiment", desc: "Accompagnement expert à chaque étape.", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600" }
];

const ServicesPage = () => {
    return (
        <div className="min-h-screen bg-[#FDF7FF]">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 py-12 md:py-24">
                {/* En-tête avec typographie responsive */}
                <div className="text-center mb-16">
                    <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Nos domaines</span>
                    <h1 className="text-3xl md:text-6xl font-extrabold text-[#1C1B1F] mb-6 tracking-tight">Services d'Excellence</h1>
                    <p className="text-[#49454E] max-w-xl mx-auto text-lg md:text-xl px-2">
                        Bâtisseur de vos ambitions.
                    </p>
                </div>

                {/* Grille responsive : 1 colonne (mobile), 2 (tablette), 4 (desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((s, i) => (
                        <div
                            key={i}
                            className="group bg-white rounded-[2rem] overflow-hidden border border-[#CAC4D0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col w-full"
                        >
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={s.img}
                                    alt={s.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-[#1C1B1F] mb-2">{s.title}</h3>
                                <p className="text-[#49454E] text-sm leading-relaxed flex-grow">{s.desc}</p>

                                <Link
                                    to="/contact"
                                    className="mt-6 w-full py-3 text-center rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md"
                                >
                                    Contactez-nous
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ServicesPage;