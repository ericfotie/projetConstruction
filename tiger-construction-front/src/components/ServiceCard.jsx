export const ServiceCard = ({ titre, description, imageSrc }) => {
    return (
        <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
            {/* Zone Image avec effet de zoom au survol */}
            <div className="h-48 w-full overflow-hidden">
                <img
                    src={imageSrc}
                    alt={titre}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Contenu de la carte */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-slate-950 mb-3 tracking-tight">
                    {titre}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {description}
                </p>

                {/* Bouton style MD3 Tonal */}
                <button className="w-full py-2.5 rounded-full bg-blue-50 text-blue-900 font-bold text-sm hover:bg-blue-100 transition-colors">
                    En savoir plus
                </button>
            </div>
        </div>
    );
};