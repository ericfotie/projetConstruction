import { useEffect, useState, useCallback } from 'react';
import { messageService } from '../../services/messageService';
import {
    Box, Typography, Card, CardContent, CardActions,
    Button, Chip, Stack, IconButton, Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const MessageManager = () => {
    const [messages, setMessages] = useState([]);

    const loadMessages = useCallback(async () => {
        try {
            const res = await messageService.getAll();
            setMessages(res.data);
        } catch (error) {
            console.error("Erreur lors du chargement :", error);
        }
    }, []);

    useEffect(() => {
        loadMessages();
    }, [loadMessages]);

    const handleTraite = async (id) => {
        try {
            await messageService.marquerTraite(id);
            setMessages(prev => prev.map(m => m.id === id ? { ...m, estTraite: true } : m));
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Supprimer définitivement ce message ?")) {
            try {
                await messageService.supprimer(id);
                setMessages(prev => prev.filter(m => m.id !== id));
            } catch (error) {
                console.error("Erreur :", error);
            }
        }
    };

    return (
        <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="800" gutterBottom>
                    Boîte de Réception
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Suivi des demandes de contact clients
                </Typography>
            </Box>

            <Stack spacing={3}>
                {messages.map(m => (
                    <Card
                        key={m.id}
                        elevation={0}
                        sx={{
                            border: '1px solid',
                            borderColor: m.estTraite ? 'divider' : 'primary.main',
                            borderRadius: '24px', // Arrondi typique MD3
                            bgcolor: m.estTraite ? 'background.default' : 'white'
                        }}
                    >
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">{m.nomClient}</Typography>
                                    <Typography variant="body2" color="text.secondary" fontFamily="monospace">
                                        {m.email} • {m.telephone}
                                    </Typography>
                                </Box>
                                <Chip
                                    label={m.estTraite ? 'Traité' : 'En attente'}
                                    color={m.estTraite ? 'success' : 'warning'}
                                    variant="outlined"
                                    size="small"
                                />
                            </Box>

                            <Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: '16px', mb: 2 }}>
                                <Typography variant="subtitle2" color="primary" gutterBottom>{m.sujet}</Typography>
                                <Typography variant="body2" fontStyle="italic">"{m.contenu}"</Typography>
                            </Box>

                            <Typography variant="caption" color="text.disabled">
                                Reçu le : {new Date(m.dateReception).toLocaleString()}
                            </Typography>
                        </CardContent>

                        <Divider />

                        <CardActions sx={{ p: 2, gap: 1 }}>
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<WhatsAppIcon />}
                                href={m.whatsappLink}
                                target="_blank"
                            >
                                WhatsApp
                            </Button>

                            {!m.estTraite && (
                                <Button
                                    variant="contained"
                                    onClick={() => handleTraite(m.id)}
                                    startIcon={<CheckCircleIcon />}
                                >
                                    Marquer traité
                                </Button>
                            )}

                            <Box sx={{ flexGrow: 1 }} />

                            <IconButton color="error" onClick={() => handleDelete(m.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
};

export default MessageManager;