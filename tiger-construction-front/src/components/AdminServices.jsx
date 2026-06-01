import { useEffect, useState } from 'react';
import { fetchAllServices, toggleServiceStatus, deleteService, createService, updateService } from '../api/serviceApi';

export const AdminServices = () => {
    const [services, setServices] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ titre: '', description: '', iconeName: '', isActive: true });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => { loadServices(); }, []);

    const loadServices = async () => {
        try {
            const response = await fetchAllServices();
            setServices(response.data);
        } catch (error) { console.error("Erreur chargement services:", error); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            editingId ? await updateService(editingId, formData) : await createService(formData);
            setIsEditing(false); setEditingId(null);
            setFormData({ titre: '', description: '', iconeName: '', isActive: true });
            loadServices();
        } catch (error) { console.error("Erreur lors de l'enregistrement:", error); }
    };

    const startEdit = (service) => { setEditingId(service.id); setFormData(service); setIsEditing(true); };
    const handleDelete = async (id) => { if (window.confirm("Supprimer ce service ?")) { await deleteService(id); loadServices(); } };

    return (
        <div className="space-y-8 p-6">
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-950">Gestion des Services</h1>
                    <p className="text-slate-500 mt-1">Administrez les prestations proposées sur votre site.</p>
                </div>
                {!isEditing && (
                    <button onClick={() => { setIsEditing(true); setEditingId(null); }} className="px-6 py-2.5 bg-blue-900 text-white rounded-full font-bold shadow-md hover:bg-blue-800 transition-all">
                        + Ajouter un service
                    </button>
                )}
            </div>

            {/* FORMULAIRE (Style Surface Container) */}
            {isEditing && (
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl animate-in fade-in zoom-in duration-300">
                    <h2 className="text-xl font-bold text-blue-950 mb-6">{editingId ? "Modifier le service" : "Ajouter un nouveau service"}</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <input className="w-full p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Titre du service" value={formData.titre} onChange={e => setFormData({...formData, titre: e.target.value})} required />
                            <input className="w-full p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Nom de l'icône (ex: icon-name)" value={formData.iconeName} onChange={e => setFormData({...formData, iconeName: e.target.value})} />
                        </div>
                        <textarea className="w-full p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Description" rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                        <div className="flex gap-4 pt-2">
                            <button type="submit" className="px-8 py-3 bg-blue-900 text-white rounded-full font-bold hover:bg-blue-800 transition">Enregistrer</button>
                            <button type="button" onClick={() => setIsEditing(false)} className="px-8 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-full transition">Annuler</button>
                        </div>
                    </form>
                </div>
            )}

            {/* TABLEAU (Style List Item Card) */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50">
                    <tr>
                        <th className="p-6 text-sm font-bold text-slate-500 uppercase tracking-wider">Service</th>
                        <th className="p-6 text-sm font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                        <th className="p-6 text-sm font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {services.map(s => (
                        <tr key={s.id} className="hover:bg-slate-50/50 transition">
                            <td className="p-6 font-semibold text-slate-900">{s.titre}</td>
                            <td className="p-6">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${s.isActive ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                                        {s.isActive ? "ACTIF" : "INACTIF"}
                                    </span>
                            </td>
                            <td className="p-6 text-right space-x-2">
                                <button onClick={() => startEdit(s)} className="px-4 py-2 text-blue-700 font-bold hover:bg-blue-50 rounded-full transition">Modifier</button>
                                <button onClick={() => toggleServiceStatus(s.id, !s.isActive).then(loadServices)} className="px-4 py-2 text-amber-700 font-bold hover:bg-amber-50 rounded-full transition">Basculer</button>
                                <button onClick={() => handleDelete(s.id)} className="px-4 py-2 text-red-600 font-bold hover:bg-red-50 rounded-full transition">Supprimer</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};