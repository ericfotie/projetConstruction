import { useState, useEffect } from 'react';
import { projetService } from '../../services/projetService';

const ProjetManager = () => {
    const [projets, setProjets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // État pour gérer la modification (si editId est défini, on est en mode édition)
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({
        titre: '', description: '', localisation: '', budgetEstime: '', statut: 'ETUDE', categorieId: ''
    });
    const [photos, setPhotos] = useState(null);
    const [plans, setPlans] = useState(null);

    const loadProjets = async () => {
        setLoading(true);
        try {
            const res = await projetService.getAccueil();
            setProjets(res.data);
        } catch (err) { console.error("Erreur chargement:", err); }
        finally { setLoading(false); }
    };

    useEffect(() => { loadProjets(); }, []);

    // Gérer l'enregistrement (Création ou Mise à jour)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const payload = { ...form, budgetEstime: parseFloat(form.budgetEstime) || 0 };

            if (editId) {
                await projetService.modifierProjet(editId, payload);
                alert("Projet mis à jour !");
            } else {
                await projetService.creerProjet(payload, photos, plans);
                alert("Projet créé avec succès !");
            }

            setForm({ titre: '', description: '', localisation: '', budgetEstime: '', statut: 'ETUDE', categorieId: '' });
            setEditId(null);
            loadProjets();
        } catch (err) { alert("Une erreur est survenue."); }
        finally { setIsSubmitting(false); }
    };

    // Charger les données dans le formulaire pour modification
    const startEdit = (p) => {
        setEditId(p.id);
        setForm(p);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if(window.confirm("Supprimer ce projet définitivement ?")) {
            await projetService.supprimerProjet(id);
            loadProjets();
        }
    };

    const handleStatutChange = async (id, nouveauStatut) => {
        await projetService.modifierStatut(id, nouveauStatut);
        loadProjets();
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-slate-50 min-h-screen">
            {/* FORMULAIRE */}
            <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-6 text-blue-950 uppercase">{editId ? "Modifier le projet" : "Nouveau Projet"}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" value={form.titre} placeholder="Titre" className="p-3 border rounded-xl" onChange={e => setForm({...form, titre: e.target.value})} required />
                        <input type="number" value={form.budgetEstime} placeholder="Budget" className="p-3 border rounded-xl" onChange={e => setForm({...form, budgetEstime: e.target.value})} />
                        <input type="text" value={form.localisation} placeholder="Localisation" className="p-3 border rounded-xl" onChange={e => setForm({...form, localisation: e.target.value})} />
                        <input type="text" value={form.categorieId} placeholder="ID Catégorie" className="p-3 border rounded-xl" onChange={e => setForm({...form, categorieId: e.target.value})} required />
                    </div>

                    <textarea value={form.description} placeholder="Description" className="w-full mt-4 p-3 border rounded-xl" rows="4" onChange={e => setForm({...form, description: e.target.value})}></textarea>

                    {!editId && (
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <input type="file" multiple onChange={e => setPhotos(Array.from(e.target.files))} className="p-2 border rounded-xl text-xs" />
                            <input type="file" multiple onChange={e => setPlans(Array.from(e.target.files))} className="p-2 border rounded-xl text-xs" />
                        </div>
                    )}

                    <button disabled={isSubmitting} className="mt-6 w-full bg-blue-950 text-white py-4 rounded-xl font-bold hover:bg-blue-900 transition">
                        {isSubmitting ? "Traitement..." : (editId ? "Mettre à jour" : "Enregistrer le projet")}
                    </button>
                </form>
            </div>

            {/* LISTE DES PROJETS */}
            <div className="lg:col-span-1 space-y-4">
                <h2 className="font-bold text-lg">Gestion en cours ({projets.length})</h2>
                {projets.map((p) => (
                    <div key={p.id} className="bg-white p-5 rounded-2xl border shadow-sm">
                        <h3 className="font-bold text-blue-950">{p.titre}</h3>
                        <select
                            defaultValue={p.statut}
                            onChange={(e) => handleStatutChange(p.id, e.target.value)}
                            className="mt-2 text-[10px] font-bold bg-slate-100 p-2 rounded-lg w-full uppercase"
                        >
                            <option value="ETUDE">En Étude</option>
                            <option value="EN_COURS">En cours</option>
                            <option value="TERMINE">Terminé</option>
                        </select>
                        <div className="flex gap-2 mt-4">
                            <button onClick={() => startEdit(p)} className="text-[10px] bg-slate-800 text-white px-3 py-1.5 rounded-lg">MODIFIER</button>
                            <button onClick={() => handleDelete(p.id)} className="text-[10px] bg-red-100 text-red-700 px-3 py-1.5 rounded-lg">SUPPRIMER</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjetManager;