import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import GrillLogo from '../../assets/Logo_Grill.png'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const { login, accessToken } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");  // Réinitialiser l'erreur à chaque tentative
        try {
            // Appeler la fonction login pour récupérer le token
            await login(username, password);

            // Récupérer le token après connexion
            const token = localStorage.getItem("token"); // Ou depuis useAuth() si stocké ailleurs
            console.log(token)
            if (token) {

                // Vérifier le token avec l'API authenticate
                const response = await axios.get("http://localhost:8080/authenticate", {
                    headers: {
                        Authorization: `Bearer ${token}`,  // ENVOYER LE TOKEN DANS LE HEADER
                    },
                });

                if (response.status === 200) {
                    toast.success("Connexion réussi !");

                    navigate("/dashboard"); // Rediriger vers le profil
                }
            } else {
                setError("Erreur : Aucun token trouvé.");
            }
        } catch (error) {
            console.log("Erreur lors de l'authentification :", error);
            setError("Nom d'utilisateur ou mot de passe incorrect.");
        }
    };

    return (
        <div className='bf-[#fbf8f1] border border-[#fbf8f1] h-screen'>
            <div className="flex flex-col items-center  bg-white shadow-lg mx-auto mt-[6vh] p-10 rounded-lg max-w-lg">
                <div className=' flex flex-col items-center justify-center mb-10 gap-4'>
                    <img className='bg-gray-100 border-1 border-gray-300 rounded-full p-2 h-auto w-[8vh]' src={GrillLogo} alt="logo-grill" />
                    <h2 className='font-poppins font-semibold text-[2.7vh] text-gray-900'>Content de vous revoir !</h2>
                </div>
                <div className='w-full '>
                    <div>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                            <div className='flex flex-col gap-2'>
                                <label className='font-inter text-gray-600'>Nom d'utilisateur :</label>
                                <input className='bg-gray-100 border-1 font-inter text-gray-700 border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-[0.1vh] focus:ring-gray-300 focus:border-red-300' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='font-inter text-gray-600'>Mot de passe :</label>
                                <input className='bg-gray-100 border-1 font-inter text-gray-700 border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-[0.1vh] focus:ring-gray-300 focus:border-red-300' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            {error && <p>{error}</p>}
                            <button className='bg-[#e4011c] text-white font-inter font-semibold hover:bg-[#b10015] py-2 px-4 rounded-xl mt-4' type="submit">Se connecter</button>

                        </form>

                    </div>
                    <div className='flex flex-col items-center justify-center mt-4'>
                        <span className='text-[1.6vh]'>Vous n'avez pas encore de compte ? <Link to='/register' className='text-[#fd001e] font-inter font-semibold hover:text-[#cd1016]'>Créer en un</Link></span>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default LoginPage;
