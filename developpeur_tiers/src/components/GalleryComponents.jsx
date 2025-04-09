import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ComponentCard from './ComponentCard';

const GalleryComponents = () => {
    const [components, setComponents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Récupération des composants depuis l'API
    const getComponents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/components');
            setComponents(response.data);
        } catch (error) {
            toast.error("Erreur lors du chargement des composants");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getComponents();
    }, []);

    const handleDownload = (componentId) => {
        // Logique pour télécharger le composant
        console.log(`Téléchargement du composant avec l'ID: ${componentId}`);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-[#fbf8f1]">
                {isLoading ? (
                    <p>Chargement...</p>
                ) : components.length === 0 ? (
                    <p>Aucun composant disponible</p>
                ) : (
                    components.map((component, index) => (
                        <ComponentCard key={index} item={component} onDownload={() => handleDownload(component.id)} />
                    ))
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default GalleryComponents;
