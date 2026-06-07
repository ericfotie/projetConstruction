import { useEffect, useState } from 'react';
import { fetchAllServices, toggleServiceStatus, deleteService, createService, updateService } from '../../api/serviceApi';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Badge } from '../../ui/Badge';
import { Card } from '../../ui/Card';
import { PageHeader } from '../../ui/PageHeader';

export const AdminServices = () => {
    const [services, setServices] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ titre: '', description: '', iconeName: '', isActive: true });
    const [editingId, setEditingId] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const refresh = () => setRefreshKey(k => k + 1);

    useEffect(() => {
        let active = true;
        fetchAllServices()
            .then(res => { if (active) setServices(res.data); })
            .catch(err => console.error("Erreur chargement services:", err));
        return () => { active = false; };
    }, [refreshKey]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            editingId ? await updateService(editingId, formData) : await createService(formData);
            setIsEditing(false);
            setEditingId(null);
            setFormData({ titre: '', description: '', iconeName: '', isActive: true });
            refresh();
        } catch (error) { console.error("Erreur lors de l'enregistrement:", error); }
    };

    const startEdit = (service) => { setEditingId(service.id); setFormData(service); setIsEditing(true); };

    const handleDelete = async (id) => {
        if (window.confirm("Supprimer ce service ?")) { await deleteService(id); refresh(); }
    };

    return (
        <div className="space-y-8 p-6">
            <PageHeader
                title="Gestion des Services"
                subtitle="Administrez les prestations proposées sur votre site."
                action={!isEditing && (
                    <Button onClick={() => { setIsEditing(true); setEditingId(null); }}>
                        + Ajouter un service
                    </Button>
                )}
            />

            {isEditing && (
                <Card className="p-8">
                    <h2 className="text-xl font-bold text-blue-950 mb-6">
                        {editingId ? "Modifier le service" : "Ajouter un nouveau service"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Input
                                placeholder="Titre du service"
                                value={formData.titre}
                                onChange={e => setFormData({ ...formData, titre: e.target.value })}
                                required
                            />
                            <Input
                                placeholder="Nom de l'icône (ex: icon-name)"
                                value={formData.iconeName}
                                onChange={e => setFormData({ ...formData, iconeName: e.target.value })}
                            />
                        </div>
                        <Textarea
                            placeholder="Description"
                            rows={4}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                        <div className="flex gap-4 pt-2">
                            <Button type="submit" size="lg">Enregistrer</Button>
                            <Button type="button" variant="secondary" size="lg" onClick={() => setIsEditing(false)}>Annuler</Button>
                        </div>
                    </form>
                </Card>
            )}

            <Card className="overflow-hidden">
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
                                    <Badge color={s.isActive ? 'active' : 'inactive'}>
                                        {s.isActive ? "ACTIF" : "INACTIF"}
                                    </Badge>
                                </td>
                                <td className="p-6 text-right space-x-2">
                                    <Button variant="ghost" onClick={() => startEdit(s)}>Modifier</Button>
                                    <Button variant="warning" onClick={() => toggleServiceStatus(s.id, !s.isActive).then(refresh)}>Basculer</Button>
                                    <Button variant="danger" onClick={() => handleDelete(s.id)}>Supprimer</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};
