import { use, useState } from "react";
import MenuCard from "./MenuCard";
import ArticleCard from "./ArticleCard";
import RestaurantCard from "./RestaurantCard";
import GalleryRestaurant from "./GalleryRestaurant";
import GalleryMenu from "./GalleryMenu";
import axios from "axios";
import GalleryArticle from "./GalleryArticle";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import GalleryCommande from "./GalleryCommande";


const MobileSubMenu = () => {
    const [activeTab, setActiveTab] = useState("article");
    const [isRestaurant, setIsRestaurant] = useState(false);
    const [restaurant, setRestaurant] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getRestaurant = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error('Session expirée, veuillez vous reconnecter.');
            return;
        }
    
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.username;
    
        try {
            setIsLoading(true);
            const response = await axios.get('http://localhost:8080/restaurants');
            console.log(response.data); // Affiche les restaurants récupérés
    
            // Filtre les restaurants par userId
            const userRestaurant = response.data.filter(restaurant => restaurant.userId === userId);
            console.log(userRestaurant); // Affiche le tableau filtré
    
            // Si des restaurants sont trouvés, on les assigne à l'état
            if (userRestaurant.length > 0) {
                setRestaurant(userRestaurant[0]); // Prend le premier restaurant trouvé
                setIsRestaurant(true);
            } else {
                setIsRestaurant(false);
            }
    
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsRestaurant(false);
            setIsLoading(false);
        }
    };
    
    // Utiliser useEffect pour mettre à jour localStorage après que le restaurant soit défini
    useEffect(() => {
        if (restaurant && restaurant._id) {
            localStorage.setItem('restaurantId', restaurant._id);
            console.log('id du restaurant');
            console.log(restaurant._id); // Affiche l'ID du restaurant
        }
    }, [restaurant]); // Déclenche cet effet chaque fois que `restaurant` change
    
    useEffect(() => {
        getRestaurant();
    }, []);

    useEffect(() => {
        getRestaurant();
    }, []);

    return (
        <div className="w-full mx-auto pt-10">
            {/* Menu */}
            <div className="flex bg-gray-800 font-semibold text-white rounded-lg p-2 gap-2">
                {["article", "commande", "menus", "restaurant"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 text-center py-2 rounded-lg transition-all ${activeTab === tab ? "bg-[#e4011c]" : "bg-gray-700 hover:bg-gray-600"}`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Contenu Dynamique */}
            <div className="py-12">
                {activeTab === "article" && (
                    <div className="flex flex-col justify-center items-center gap-8">
                        <h2 className="text-2xl font-poppins font-bold ">Vos Articles </h2>
                        <Link to='/newArticle' className="shadow-md flex flex-row gap-2 items-center bg-[#e4011c] hover:bg-[#b10015] rounded-[20px] py-2 px-4 text-white font-poppins">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                            </svg>
                            Créer un article
                        </Link>
                        <GalleryArticle restaurantId={restaurant ? restaurant._id : null} />
                    </div>
                )}
                {activeTab === "commande" && (
                    <div className="flex flex-col justify-center items-center gap-8">
                        <h2 className="text-2xl font-poppins font-bold ">Vos Commandes</h2>
                        <GalleryCommande/>
                    </div>
                )}
                {activeTab === "menus" && (
                    <div className="flex flex-col justify-center items-center gap-8">
                        <h2 className="text-2xl font-poppins font-bold ">Vos Menus </h2>
                        <Link to='/newMenu' className="shadow-md flex flex-row gap-2 items-center bg-[#e4011c] hover:bg-[#b10015] rounded-[20px] py-2 px-4 text-white font-poppins">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                            </svg>
                            Créer un menu
                        </Link>
                        <GalleryMenu restaurantId={restaurant ? restaurant._id : null} />
                    </div>
                )}
                {activeTab === "restaurant" && (
                    <div className="flex flex-col justify-center items-center gap-8">
                        {isRestaurant && restaurant && (
                            <div className="flex flex-col justify-center items-center gap-8">
                                <h2 className="text-2xl font-poppins font-bold ">Votre restaurant</h2>
                                <Link to={`/updateRestaurant/${restaurant._id}`} className="shadow-md flex flex-row gap-2 items-center bg-[#e4011c] hover:bg-[#b10015] rounded-[20px] py-2 px-4 text-white font-poppins">
                                    Modifier votre restaurant
                                </Link>
                                <div>ID : {restaurant._id}</div>
                                <div>Nom : {restaurant.name}</div>
                                <div>Type : {restaurant.type}</div>
                                <div>Adresse : {restaurant.adress}</div>
                                <div>Image : <img src={restaurant.image} alt={restaurant.name} /></div>
                                <div>Description : {restaurant.description}</div>
                            </div>
                        )}
                        {!isRestaurant && (
                            <div className="flex flex-col justify-center items-center gap-8">
                                <h2 className="text-2xl font-poppins font-bold ">Aucun restaurant enregistré</h2>
                                <Link to='/newRestaurant' className="shadow-md flex flex-row gap-2 items-center bg-[#e4011c] hover:bg-[#b10015] rounded-[20px] py-2 px-4 text-white font-poppins">
                                    Enregistrer un restaurant
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MobileSubMenu;
