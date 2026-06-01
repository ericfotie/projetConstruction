import { useState } from 'react';
import { Link } from 'react-router-dom';
import { messageService } from '../../services/messageService';

const ContactForm = () => {
    const [form, setForm] = useState({ nomClient: '', email: '', telephone: '', sujet: '', contenu: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await messageService.envoyer(form);
            setSent(true);
        } catch (err) {
            alert("Erreur lors de l'envoi du message.");
        }
    };

    // Style unifié pour les champs avec effet focus
    const inputClass = "w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all shadow-sm";

    if (sent) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="bg-white p-12 rounded-[2rem] shadow-2xl border border-slate-100 text-center max-w-md w-full">
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">✓</div>
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Message envoyé !</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed">Nos ingénieurs ont bien reçu votre demande et reviendront vers vous sous peu.</p>
                    <Link to="/client" className="block w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition shadow-lg">
                        Retour au Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16 px-4">
            <div className="max-w-2xl mx-auto">
                {/* En-tête captivant */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-4 tracking-tight">Besoin d'expertise ?</h2>
                    <p className="text-lg text-slate-600">Notre équipe technique est prête à vous accompagner dans vos projets.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
                    <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <input className={inputClass} placeholder="Nom complet" value={form.nomClient} onChange={e => setForm({...form, nomClient: e.target.value})} required />
                            <input className={inputClass} placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                        </div>
                        <input className={inputClass} placeholder="Téléphone WhatsApp (ex: +2376...)" value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})} required />
                        <input className={inputClass} placeholder="Sujet de votre demande" value={form.sujet} onChange={e => setForm({...form, sujet: e.target.value})} />
                        <textarea className={`${inputClass} h-40 resize-none`} placeholder="Décrivez votre besoin technique..." value={form.contenu} onChange={e => setForm({...form, contenu: e.target.value})} required />
                    </div>

                    <button type="submit" className="w-full mt-8 bg-blue-900 text-white font-bold py-4 rounded-2xl hover:bg-blue-800 transition shadow-xl shadow-blue-900/20 active:scale-[0.98]">
                        Envoyer ma demande →
                    </button>

                    <div className="text-center mt-6">
                        <Link to="/client" className="text-slate-400 hover:text-blue-900 transition font-medium underline underline-offset-4">
                            Retourner au tableau de bord
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;