import { useState, useEffect } from 'react';
import { categorieService } from '../../services/categorieService.js';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Card } from '../../ui/Card';
import { PageHeader } from '../../ui/PageHeader';

const CategorieManager = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({ nom: '', description: '' });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const refresh = () => setRefreshKey(k => k + 1);

    useEffect(() => {
        let active = true;
        setLoading(true);
        categorieService.getAll()
            .then(res => { if (active) setCategories(Array.isArray(res.data) ? res.data : []); })
            .catch(err => console.error("Erreur de chargement", err))
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [refreshKey]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            editingId
                ? await categorieService.update(editingId, formData)
                : await categorieService.create(formData);
            setFormData({ nom: '', description: '' });
            setEditingId(null);
            refresh();
        } catch {
            alert("Erreur lors de l'enregistrement");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette catégorie ?")) {
            try {
                await categorieService.delete(id);
                setCategories(prev => prev.filter(c => c.id !== id));
            } catch {
                alert("Erreur lors de la suppression");
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <PageHeader title="Gestion des Catégories" subtitle="Administration technique de votre catalogue" />

            <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            placeholder="Nom de la catégorie"
                            value={formData.nom}
                            onChange={e => setFormData({ ...formData, nom: e.target.value })}
                            required
                        />
                        <Input
                            placeholder="Description"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <Button type="submit" size="lg">
                        {editingId ? "Mettre à jour la catégorie" : "+ Ajouter la catégorie"}
                    </Button>
                </form>
            </Card>

            <Card className="overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="p-6 text-sm font-bold text-slate-500 uppercase tracking-wider">Nom</th>
                            <th className="p-6 text-sm font-bold text-slate-500 uppercase tracking-wider">Description</th>
                            <th className="p-6 text-sm font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr>
                                <td colSpan={3} className="p-8 text-center text-slate-400">Chargement...</td>
                            </tr>
                        ) : categories.map(c => (
                            <tr key={c.id} className="hover:bg-slate-50/50 transition">
                                <td className="p-6 font-semibold text-slate-900">{c.nom}</td>
                                <td className="p-6 text-slate-500">{c.description}</td>
                                <td className="p-6 text-right space-x-2">
                                    <Button
                                        variant="ghost"
                                        onClick={() => { setEditingId(c.id); setFormData({ nom: c.nom, description: c.description }); }}
                                    >
                                        Modifier
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(c.id)}>Supprimer</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default CategorieManager;
