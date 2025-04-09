import { createContext, useContext, useState } from "react";
import axios from "axios";

// Création du contexte
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("token") || "");
    const [currentUsername, setCurrentUsername] = useState("");
    const login = async (username, password) => {
    // Fonction de connexion
    
        try {
            const response = await axios.post("http://localhost:8080/login", { username, password });
            if (response.status === 200) {
                const token = response.data.accessToken;
                setAccessToken(token);
                setCurrentUsername(username);
                localStorage.setItem("token", token); // Stocke le token
                try {
                    await axios.post("http://localhost:8080/logs", {
                        name: "Login Success",
                        text: `"L'utilisateur client ${username} a réussi à se connecter "`,
                    });
                } catch (error) {
                    throw new Error("Échec lors de l'enregitrement du log de connexion : " + error.message);
                }
            }
        } catch (error) {
            await axios.post("http://localhost:8080/logs", {
                name: "Login Failed",
                text: `"L'utilisateur client ${username} a échoué à se connecter"`,
            });
            const msg = error?.response?.data?.msg || "Erreur inconnue.";
            throw new Error(msg);



        }
    };

    // Fonction de déconnexion
    const logout = async () => {
        const token = localStorage.getItem("token");
        
        try {
            // Log de déconnexion
            await axios.post("http://localhost:8080/logs", {
                name: "Logout",
                text: `"L'utilisateur client ${currentUsername} s'est déconnecté."`,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error("Erreur lors de l'enregistrement du log de déconnexion :", error);
        }
    
        // Suppression du token en local
        setAccessToken("");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour accéder au contexte
export const useAuth = () => {
    return useContext(AuthContext);
};
