import { createContext, useContext, useState } from "react";
import axios from "axios";

// Création du contexte
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("token") || "");

    // Fonction de connexion
    const login = async (username, password) => {
        try {
            const response = await axios.post("http://localhost:8080/login", { username, password });
            if (response.status === 200) {
                const token = response.data.accessToken;
                setAccessToken(token);
                localStorage.setItem("token", token); // Stocke le token
            }
        } catch (error) {
            throw new Error("Échec de la connexion");
        }
    };

    // Fonction de déconnexion
    const logout = () => {
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
