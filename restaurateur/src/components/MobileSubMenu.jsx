import { useState } from "react";
import MenuCard from "./MenuCard";
import ArticleCard from "./ArticleCard";
import RestaurantCard from "./RestaurantCard";
import GalleryRestaurant from "./GalleryRestaurant";
import GalleryMenu from "./GalleryMenu";
import axios from "axios";
import GalleryArticle from "./GalleryArticle";
import { Link } from "react-router-dom";


const MobileSubMenu = () => {
    const [activeTab, setActiveTab] = useState("article");

    return (
        <div className="w-full  mx-auto pt-10">
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
                        <Link to='/newArticle' className="shadow-md flex flex-row gap-2 items-center bg-[#e4011c] hover:bg-[#b10015] rounded-[20px] py-2 px-4 text-white font-poppins"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                        </svg>Créer un article</Link>
                        <GalleryArticle />
                    </div>

                )}
                {activeTab === "commande" && (
                    <div className="flex flex-col justify-center items-center gap-8">
                        <h2 className="text-2xl font-poppins font-bold ">Vos Commandes</h2>
                    </div>
                )}
                {activeTab === "menus" && (
                    <div className="flex flex-col justify-center items-center gap-8">
                        <h2 className="text-2xl font-poppins font-bold ">Vos Menus </h2>
                        <Link to='/newMenu' className="shadow-md flex flex-row gap-2 items-center bg-[#e4011c] hover:bg-[#b10015] rounded-[20px] py-2 px-4 text-white font-poppins"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                        </svg>Créer un menu</Link>
                        <GalleryMenu />
                    </div>
                )}
                {activeTab === "restaurant" && (
                    <div className="flex flex-col justify-center items-center gap-8">
                        <h2 className="text-2xl font-poppins font-bold ">Vos Informations </h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MobileSubMenu;