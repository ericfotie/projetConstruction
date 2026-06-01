const Footer = () => {
    return (
        <footer className="bg-[#1C1B1F] text-[#E6E1E5] pt-16 pb-8 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-[#49454E] pb-12">

                {/* Bloc Identité */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold tracking-tight text-white">
                        TIGER <span className="text-[#D0BCFF]">CONSTRUCTION</span>
                    </h2>
                    <p className="text-[#CAC4D0] max-w-sm">
                        L'excellence technique et la rigueur au service de vos projets de construction et d'ingénierie.
                    </p>
                </div>

                {/* Bloc Contact Professionnel */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-white uppercase tracking-widest text-xs opacity-70">Contact</h4>
                        <div className="space-y-3 text-sm">
                            <p className="flex items-center gap-3 text-[#CAC4D0]">📍 Yaoundé, Cameroun</p>
                            <a href="tel:+237694083075" className="flex items-center gap-3 text-[#CAC4D0] hover:text-[#D0BCFF] transition-colors">
                                📞 694 08 30 75 / 653 15 34 00
                            </a>
                            <a href="mailto:josephdjako2016@gmail.com" className="flex items-center gap-3 text-[#CAC4D0] hover:text-[#D0BCFF] transition-colors">
                                📧 josephdjako2016@gmail.com
                            </a>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-white uppercase tracking-widest text-xs opacity-70">Direction</h4>
                        <p className="text-sm">
                            <span className="block text-white font-medium">Joseph Djako</span>
                            <span className="text-[#CAC4D0]">Directeur Général</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto pt-8 text-center text-[#938F99] text-xs">
                © {new Date().getFullYear()} TIGER CONSTRUCTION. Tous droits réservés.
            </div>
        </footer>
    );
};

export default Footer;