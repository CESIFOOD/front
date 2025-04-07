import { useState } from "react";
import axios from "axios";  // Importation de axios pour faire des requêtes HTTP
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const FormNewAccount = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("client");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(""); // Réinitialiser l'erreur à chaque nouvelle tentative

        try {
            // Requête vers le backend pour créer un nouvel utilisateur
            const response = await axios.post("http://localhost:8080/register", {
                username : username,
                password : password,
                role : role,
            });

            console.log(`${response}`)
            
            if (response.status === 201) {
                // Si l'inscription est réussie, tu peux rediriger vers la page de connexion ou profil
                alert("Utilisateur créé avec succès !");
                navigate('/login'); // Rediriger vers la page de connexion 
                
            }
        } catch (error) {
            // Gestion des erreurs (si le nom d'utilisateur existe déjà ou autre)
            if (error.response) {
                setError(error.response.data.msg);
            } 
        } finally {
            setIsLoading(false); // Réinitialiser le loading
        }
    };

    return (
        <div className="bg-[#fbf8f1] border border-[#fbf8f1]">
            <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-20">
                <h2 className="font-semibold font-poppins text-2xl mb-4 block text-center">
                    Créer un compte
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label>Nom d'utilisateur<span className="text-[#e4011c]">*</span></label>
                            <input
                                type="text"
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                                placeholder="Entrez le nom"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Rôle<span className="text-[#e4011c]">*</span></label>
                            <input
                                type="text"
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                                placeholder="Entrez votre rôle (ex : user)"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Mot de passe<span className="text-[#e4011c]">*</span></label>
                            <input
                                type="password"
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                                placeholder="Entrez un mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-center mt-2">{error}</p>} {/* Afficher l'erreur ici */}

                    {!isLoading ? (
                        <div className="flex flex-row justify-around mt-10">
                            <button
                                type="submit"
                                className="bg-[#e4011c] py-2 px-6 rounded-full text-white font-poppins flex flex-row gap-2 items-center justify-center hover:bg-[#b10015]"
                            >
                                Créer
                            </button>
                            <Link
                                to="/dashboard"
                                className="bg-white py-2 px-4 rounded-full text-black font-poppins flex flex-row gap-2 items-center justify-center hover:bg-gray-300 border-1 border-black"
                            >
                                Annuler
                            </Link>
                        </div>
                    ) : (
                        <div className="text-center mt-4">Création du compte...</div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default FormNewAccount;
