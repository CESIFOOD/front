import ArticleCard from "./ArticleCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import MenuCard from "./MenuCard";



const GalleryMenu = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [menus, setMenus] = useState([]);

    const getMenus = async () => {
        try {
            const menuResponse = await axios.get(`http://localhost:8080/menus`);
            setMenus(menuResponse.data);
        } catch (error) {
            toast.error("Erreur lors du chargement des menus");
        } finally {
            setIsLoading(false); // Mise à jour de l'état de chargement après l'appel
        }
    };

    useEffect(() => {
        setIsLoading(true); // Activer le chargement au début
        getMenus();
    }, []);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-[#fbf8f1]">
            {isLoading ? (
                <p>Chargement...</p>
            ) : menus.length === 0 ? (
                <p>Aucun article disponible</p>
            ) : (
                menus.map((menus, index) => {
                    return (
                        <MenuCard key={index} item={menus} getMenus={getMenus} />
                    )
                })
            )}

            <ToastContainer />
        </div>
    )
}

export default GalleryMenu;