import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ProfilePage = () => {
    const { accessToken } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const verifyToken = async () => {
            if (!accessToken) {
                navigate('/login');  // Si pas de tok   en, rediriger vers la page de connexion
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/authenticate', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    setProfile(response.data.user);  // Afficher les informations du profil
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
                    <p>Votre rôle : {profile.role}</p>
                </div>
            ) : (
                <p>Chargement de votre profil...</p>
            )}
        </div>
    );
};

export default ProfilePage;
