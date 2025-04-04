import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000', 
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;

export const loginUser = async (username, password) => {
    
  
  try {
      const response = await apiClient.post("/login", {
        username,
        password,
      });
      return response.data; 
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      throw error;
    }
  };