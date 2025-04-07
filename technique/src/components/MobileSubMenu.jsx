import { useState } from "react";
import { Link } from "react-router-dom";


const MobileSubMenu = () => {
    const [activeTab, setActiveTab] = useState("article");

    return (
        <div className="w-full  mx-auto pt-10">
            {/* Menu */}
            <div className="flex bg-gray-800 font-semibold text-white rounded-lg p-2 gap-2">
                {["commande", "livraison", "historique"].map((tab) => (
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
                {activeTab === "commande" && (
                    <div className="flex flex-col justify-center items-center gap-8">
                        <h2 className="text-2xl font-poppins font-bold ">Les commandes autour de vous</h2>
                       
           
                    </div>

                )}
                {activeTab === "livraison" && (
                    <div className="flex flex-col justify-center items-center gap-8">
                        <h2 className="text-2xl font-poppins font-bold ">Vos livraisons</h2>
                    </div>
                )}
                {activeTab === "historique" && (
                    <div className="flex flex-col justify-center items-center gap-8">
                        <h2 className="text-2xl font-poppins font-bold ">Historique </h2>
                        
                        
                    </div>
                )}
            </div>
        </div>
    );
}

export default MobileSubMenu;