import { useState } from "react";
import MenuCard from "./MenuCard";
import ArticleCard from "./ArticleCard";
import RestaurantCard from "./RestaurantCard";
import GalleryRestaurant from "./GalleryRestaurant";
import KartComponent from "./KartComponent";
import axios from "axios";
import GalleryCommande from "./GalleryCommande";

const MobileSubMenu = () => {
    const [activeTab, setActiveTab] = useState("restaurant");

    return (
        <div className="w-full  mx-auto pt-10">
            {/* Menu */}
            <div className="flex bg-gray-800 font-semibold text-white rounded-lg p-2 gap-2">
                {["restaurant", "historique", "panier"].map((tab) => (
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
                {activeTab === "restaurant" && (
                    <div className="flex flex-col justify-center items-center gap-8">
                        <h2 className="text-2xl font-poppins font-bold ">Restaurant Disponible </h2>
                        <GalleryRestaurant />
                    </div>

                )}

                {activeTab === "historique" && (
                    <div className="flex flex-col justify-center items-center gap-8">
                        <h2 className="text-2xl font-poppins font-bold ">Vos Commandes </h2>
                        <GalleryCommande />
                    </div>
                )}
                {activeTab === "panier" && (
                    <div>
                        <h2 className="text-2xl font-poppins font-bold ">Votre Panier </h2>
                        <KartComponent />
                    </div>
                )}
            </div>
        </div>
    );
}

export default MobileSubMenu;