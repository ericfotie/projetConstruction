import { useEffect, useState } from 'react';
import { messageService } from '../../services/messageService';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Card } from '../../ui/Card';
import { PageHeader } from '../../ui/PageHeader';

const MessageManager = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        let active = true;
        messageService.getAll()
            .then(res => { if (active) setMessages(res.data); })
            .catch(err => console.error("Erreur lors du chargement :", err));
        return () => { active = false; };
    }, []);

    const handleTraite = async (id) => {
        try {
            await messageService.marquerTraite(id);
            setMessages(prev => prev.map(m => m.id === id ? { ...m, estTraite: true } : m));
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Supprimer définitivement ce message ?")) {
            try {
                await messageService.supprimer(id);
                setMessages(prev => prev.filter(m => m.id !== id));
            } catch (error) {
                console.error("Erreur :", error);
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <PageHeader title="Boîte de Réception" subtitle="Suivi des demandes de contact clients" />

            <div className="space-y-4">
                {messages.map(m => (
                    <Card key={m.id} className={`border-2 ${m.estTraite ? 'border-slate-100' : 'border-blue-500'}`}>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">{m.nomClient}</h3>
                                    <p className="text-sm text-slate-500 font-mono">{m.email} • {m.telephone}</p>
                                </div>
                                <Badge color={m.estTraite ? 'active' : 'pending'}>
                                    {m.estTraite ? 'Traité' : 'En attente'}
                                </Badge>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-2xl mb-4">
                                <p className="text-sm font-semibold text-blue-700 mb-1">{m.sujet}</p>
                                <p className="text-sm text-slate-600 italic">"{m.contenu}"</p>
                            </div>

                            <p className="text-xs text-slate-400">
                                Reçu le : {new Date(m.dateReception).toLocaleString()}
                            </p>
                        </div>

                        <div className="border-t border-slate-100 p-4 flex items-center gap-3">
                            <a
                                href={m.whatsappLink}
                                target="_blank"
                                rel="noreferrer"
                                className="px-5 py-2 bg-green-500 text-white font-bold rounded-full text-sm hover:bg-green-600 transition"
                            >
                                WhatsApp
                            </a>
                            {!m.estTraite && (
                                <Button onClick={() => handleTraite(m.id)}>Marquer traité</Button>
                            )}
                            <div className="flex-1" />
                            <Button variant="danger" onClick={() => handleDelete(m.id)}>Supprimer</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MessageManager;
