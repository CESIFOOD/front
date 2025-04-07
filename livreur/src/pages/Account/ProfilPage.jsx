import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const ProfilePage = () => {
    const { accessToken } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newRole, setNewRole] = useState('');

    const deleteUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Session expirée. Veuillez-vous reconnecter.");
            return;
        }
    
        try {
            await axios.delete("http://localhost:8080/delete", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    username: profile.username, // Nom d'utilisateur à supprimer
                },
            });
    
            toast.success("Utilisateur supprimé avec succès !");
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de la suppression de l'utilisateur.");
        }
    };

    const updateProfile = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Session expirée. Veuillez-vous reconnecter.");
            return;
        }

        try {
            const response = await axios.put("http://localhost:8080/update", {
                username: profile.username,
                newPassword,
                newRole,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                toast.success("Profil mis à jour avec succès !");
                // Rafraîchir le profil avec les nouvelles données
                setProfile(response.data.user);
            }
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de la mise à jour du profil.");
        }
    };

    useEffect(() => {
        const verifyToken = async () => {
            if (!accessToken) {
                navigate('/login');  // Si pas de token, rediriger vers la page de connexion
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/authenticate', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    setProfile(response.data.user); 
                } else {
                    navigate('/login');  // Rediriger si le token est invalide
                }
            } catch (error) {
                setError("Token invalide ou expiré.");
                navigate('/login');  // Rediriger si la vérification échoue
            }
        };

        verifyToken();
    }, [accessToken, navigate]);

    return (
        <div>
            {error && <p>{error}</p>}
            {profile ? (
                <div>
                    <h1>Bienvenue, {profile.username}!</h1>
                    <span>Username : {profile.username}</span>
                    <div>
                        <label>Type de compte : </label>
                        <span>{profile.role}</span>
                    </div>
                    <div>
                        <label>Nouveau mot de passe :</label>
                        <input 
                            type="password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            placeholder="Entrez un nouveau mot de passe"
                        />
                    </div>
                    <div>
                        <label>Nouveau rôle :</label>
                        <input 
                            type="text" 
                            value={newRole} 
                            onChange={(e) => setNewRole(e.target.value)} 
                            placeholder="Entrez un nouveau rôle"
                        />
                    </div>
                    
                    <button onClick={updateProfile} className='bg-blue-600 text-white hover:bg-blue-800'>Mettre à jour le profil</button>
                    <button onClick={deleteUser} className='bg-red-600 text-white hover:bg-red-800'>Supprimer le compte</button>
                </div>
            ) : (
                <p>Chargement de votre profil...</p>
            )}
            <ToastContainer />
        </div>
    );
};

export default ProfilePage;
