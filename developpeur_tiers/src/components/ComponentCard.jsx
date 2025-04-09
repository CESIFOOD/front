import axios from 'axios';
import { toast } from 'react-toastify';
import atob from 'atob';
import { useState, useEffect } from 'react';    
import { use } from 'react';


const ComponentCard = ({ item }) => { // Ajout de userName comme prop

    const [userName, setUserName] = useState(''); // État pour stocker le nom d'utilisateur
    const [isLoading, setIsLoading] = useState(true); // État pour gérer le chargement

    const getUserName = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error('Session expirée, veuillez vous reconnecter.');
            return;
        }
        const response = JSON.parse(atob(token.split(".")[1]));
        setUserName(response.username); // Récupération du nom d'utilisateur depuis le token
    }

    const handleDownload = async () => {
        try {
            const downloadUrl = `http://localhost:8080/components/${item._id}/download`;
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', item.name); // Nom du fichier
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            await axios.post('http://localhost:8080/logs/logComposant', {
                name: 'Success',
                text: `L'utilisateur ${userName} a téléchargé le composant ${item.name}`
            });
        } catch (error) {
            toast.error("Erreur lors du téléchargement du composant");
            await axios.post('http://localhost:8080/logs/logComposant', {
                name: 'Error',
                text: `L'utilisateur ${userName} a échouer à télécharger le composant ${item.name}`
            });
        }
    };

    useEffect(() => {
        getUserName();
        setIsLoading(false);
    }, []);

    return (
        <div className="flex-col m-3 rounded-[5px] shadow-lg border-b-3 border-b-[#e4011c] pt-3 pr-3 pl-3 h-auto flex w-full bg-[#fbf8f1]">
            {item.image && (
                <img className="w-full h-35 overflow-x-hidden flex items-center justify-center sm:h-40 object-cover" src={item.image} alt={item.name} />
            )}
            <div className="flex flex-col mt-5">
                <div className="flex flex-row justify-between items-center">
                    <p className="font-poppins">{item.name}</p>
                </div>
                {item.description && <p>{item.description}</p>}
            </div>
            <div className="my-4 w-full flex flex-row justify-between">
                <button
                    onClick={handleDownload}
                    className="bg-blue-800 text-white rounded-[5px] p-2 font-poppins"
                >
                    Télécharger
                </button>
                <button onClick={getUserName}>
                    User
                </button>
            </div>
        </div>
    );
};

export default ComponentCard;
