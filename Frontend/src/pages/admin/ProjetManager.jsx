import { useState, useEffect } from 'react';
import { projetService } from '../../services/projetService';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Select } from '../../ui/Select';
import { Card } from '../../ui/Card';
import { PageHeader } from '../../ui/PageHeader';

const ProjetManager = () => {
    const [projets, setProjets] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({
        titre: '', description: '', localisation: '', budgetEstime: '', statut: 'ETUDE', categorieId: ''
    });
    const [photos, setPhotos] = useState(null);
    const [plans, setPlans] = useState(null);

    const loadProjets = async () => {
        try {
            const res = await projetService.getAccueil();
            setProjets(res.data);
        } catch (err) { console.error("Erreur chargement:", err); }
    };

    useEffect(() => { loadProjets(); }, []);

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

    const startEdit = (p) => {
        setEditId(p.id);
        setForm(p);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Supprimer ce projet définitivement ?")) {
            await projetService.supprimerProjet(id);
            loadProjets();
        }
    };

    const handleStatutChange = async (id, nouveauStatut) => {
        await projetService.modifierStatut(id, nouveauStatut);
        loadProjets();
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            <div className="lg:col-span-2">
                <PageHeader title={editId ? "Modifier le projet" : "Nouveau Projet"} />
                <Card className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input type="text" value={form.titre} placeholder="Titre" onChange={e => setForm({ ...form, titre: e.target.value })} required />
                            <Input type="number" value={form.budgetEstime} placeholder="Budget" onChange={e => setForm({ ...form, budgetEstime: e.target.value })} />
                            <Input type="text" value={form.localisation} placeholder="Localisation" onChange={e => setForm({ ...form, localisation: e.target.value })} />
                            <Input type="text" value={form.categorieId} placeholder="ID Catégorie" onChange={e => setForm({ ...form, categorieId: e.target.value })} required />
                        </div>
                        <Textarea value={form.description} placeholder="Description" rows={4} onChange={e => setForm({ ...form, description: e.target.value })} />
                        {!editId && (
                            <div className="grid grid-cols-2 gap-4">
                                <Input type="file" multiple onChange={e => setPhotos(Array.from(e.target.files))} className="text-xs" />
                                <Input type="file" multiple onChange={e => setPlans(Array.from(e.target.files))} className="text-xs" />
                            </div>
                        )}
                        <Button type="submit" size="full" disabled={isSubmitting}>
                            {isSubmitting ? "Traitement..." : (editId ? "Mettre à jour" : "Enregistrer le projet")}
                        </Button>
                    </form>
                </Card>
            </div>

            <div className="lg:col-span-1 space-y-4">
                <h2 className="font-bold text-lg text-slate-950">Gestion en cours ({projets.length})</h2>
                {projets.map(p => (
                    <Card key={p.id} className="p-5">
                        <h3 className="font-bold text-blue-950">{p.titre}</h3>
                        <Select compact defaultValue={p.statut} onChange={e => handleStatutChange(p.id, e.target.value)} className="mt-2">
                            <option value="ETUDE">En Étude</option>
                            <option value="EN_COURS">En cours</option>
                            <option value="TERMINE">Terminé</option>
                        </Select>
                        <div className="flex gap-2 mt-4">
                            <Button variant="dark" size="sm" onClick={() => startEdit(p)}>MODIFIER</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>SUPPRIMER</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ProjetManager;
