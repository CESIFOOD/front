import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import ComponentCard from "./ComponentCard";

const GalleryComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [components, setComponents] = useState([]);

    const getComponents = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/components");
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

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-[#fbf8f1]">
            {isLoading ? (
                <p>Chargement...</p>
            ) : components.length === 0 ? (
                <p>Aucun composant disponible</p>
            ) : (
                components.map((component) => (
                    <ComponentCard key={component._id} component={component} getComponents={getComponents} />
                ))
            )}
        </div>
    );
};

export default GalleryComponent;
