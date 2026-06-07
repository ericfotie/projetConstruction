import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await API.post('/auth/login', { username, password });
            localStorage.setItem('adminToken', response.data.token);
            navigate('/admin');
        } catch (err) {
            if (err.response) {
                setError(err.response.data?.message || 'Identifiants invalides. Veuillez réessayer.');
            } else if (err.request) {
                setError('Impossible de joindre le serveur. Vérifiez que le backend est démarré.');
            } else {
                setError('Une erreur inattendue s\'est produite.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDF7FF] flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md bg-white p-8 rounded-[28px] shadow-sm border border-slate-200">

                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 text-blue-900 font-medium hover:bg-blue-50 px-3 py-2 rounded-full transition-colors"
                >
                    <span className="text-xl">←</span> Retour
                </button>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-[20px] flex items-center justify-center mx-auto mb-4">
                        <span className="text-blue-900 text-3xl">🔒</span>
                    </div>
                    <h1 className="text-[28px] font-semibold text-slate-900">Connexion Admin</h1>
                    <p className="text-slate-600 mt-2">Accès restreint à l'espace d'administration</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-800 text-sm rounded-[12px] text-center font-medium border border-red-100">
                            {error}
                        </div>
                    )}

                    <input
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-4 bg-transparent rounded-[12px] border border-slate-400 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none transition-all"
                        required
                        autoComplete="username"
                    />

                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-4 bg-transparent rounded-[12px] border border-slate-400 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none transition-all"
                        required
                        autoComplete="current-password"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-blue-900 text-white rounded-full font-bold shadow-sm hover:bg-blue-800 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
