import { useState, useEffect, useCallback } from 'react';
import { categorieService } from '../../services/categorieService.js';
import {
    Box, Typography, TextField, Button, Paper,
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, IconButton, Stack, CircularProgress, Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const CategorieManager = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({ nom: '', description: '' });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadCategories = useCallback(async () => {
        setLoading(true);
        try {
            const res = await categorieService.getAll();
            setCategories(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Erreur de chargement", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadCategories(); }, [loadCategories]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await categorieService.update(editingId, formData);
            } else {
                await categorieService.create(formData);
            }
            await loadCategories();
            setFormData({ nom: '', description: '' });
            setEditingId(null);
        } catch (err) {
            alert("Erreur lors de l'enregistrement");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette catégorie ?")) {
            try {
                await categorieService.delete(id);
                setCategories(prev => prev.filter(c => c.id !== id));
            } catch (err) {
                alert("Erreur lors de la suppression");
            }
        }
    };

    return (
        <Box sx={{ maxWidth: '900px', mx: 'auto', p: 3 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="800" gutterBottom>Gestion des Catégories</Typography>
                <Typography variant="body1" color="text.secondary">
                    Administration technique de votre catalogue
                </Typography>
            </Box>

            {/* Formulaire */}
            <Paper elevation={0} sx={{ p: 4, borderRadius: '28px', border: '1px solid', borderColor: 'divider', mb: 4 }}>
                <Stack component="form" onSubmit={handleSubmit} spacing={3}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                        <TextField
                            label="Nom de la catégorie"
                            value={formData.nom}
                            onChange={e => setFormData({...formData, nom: e.target.value})}
                            required
                        />
                        <TextField
                            label="Description"
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<AddIcon />}
                        sx={{ borderRadius: '16px', py: 1.5, alignSelf: 'flex-start' }}
                    >
                        {editingId ? "Mettre à jour la catégorie" : "Ajouter la catégorie"}
                    </Button>
                </Stack>
            </Paper>

            {/* Table */}
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '28px', border: '1px solid', borderColor: 'divider' }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'action.hover' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nom</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow><TableCell colSpan={3} align="center" sx={{ py: 5 }}><CircularProgress /></TableCell></TableRow>
                        ) : categories.map(c => (
                            <TableRow key={c.id} hover>
                                <TableCell sx={{ fontWeight: 600 }}>{c.nom}</TableCell>
                                <TableCell sx={{ color: 'text.secondary' }}>{c.description}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => { setEditingId(c.id); setFormData({nom: c.nom, description: c.description}); }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(c.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CategorieManager;