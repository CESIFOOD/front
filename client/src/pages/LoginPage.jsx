import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const LoginPage = () => {
    const { login, accessToken } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");  // Réinitialiser l'erreur à chaque tentative
        console.log("2")
        try {
            // Appeler la fonction login pour récupérer le token
            await login(username, password);

            // Récupérer le token après connexion
            const token = localStorage.getItem("token"); // Ou depuis useAuth() si stocké ailleurs
            console.log("1")
            console.log(token)
            if (token) {
                console.log("Token récupéré :", token);

                // Vérifier le token avec l'API authenticate
                const response = await axios.get("http://localhost:8080/authenticate", {
                    headers: {
                        Authorization: `Bearer ${token}`,  // ENVOYER LE TOKEN DANS LE HEADER
                    },
                });
                console.log("Response de l'API authenticate :", response.data);
                if (response.data.msg === "Suspended") {
                    toast.error('Votre compte a été suspendu. Veuillez contacter un administrateur.')
                    return
                }

                if (response.status === 200) {
                    console.log("Token valide, redirection...");
                    navigate("/dashboard"); // Rediriger vers le profil
                }

            } else {
                setError("Erreur : Aucun token trouvé.");
            }
        } catch (error) {
            const message = error.message;
            if (message === "User is suspended.") {
                toast.error("Votre compte est suspendu. Veuillez contacter un administrateur.");
            } else {
                toast.error("Nom d'utilisateur ou mot de passe incorrect.");
            }

            setError(message);


        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <label>
                    Nom d'utilisateur:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Mot de passe:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {error && <p>{error}</p>}
                <button className='bg-[#e4011c] text-white font-inter font-semibold hover:bg-[#b10015] py-2 px-4 rounded-xl' type="submit">Se connecter</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default LoginPage;
