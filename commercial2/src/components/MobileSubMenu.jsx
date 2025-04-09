import { useState } from "react";
import { Link } from "react-router-dom";
import UsersTable from "./UsersTable";
import StatistiqueComponents from "./StatistiqueComponents";
// import UserManagement from "./UserManagement";

const MobileSubMenu = () => {
    const [activeTab, setActiveTab] = useState("Utilisateurs");

    return (
        <div className="w-full  mx-auto pt-10">
            {/* Menu */}
            <div className="flex bg-gray-800 font-semibold text-white rounded-lg p-2 gap-2">
                {["Utilisateurs", "Statistiques"].map((tab) => (
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
                {activeTab === "Utilisateurs" && (
                    <div className="flex flex-col justify-center items-center gap-8">
                        <h2 className="text-2xl font-poppins font-bold ">User</h2>
                        {/* <UserManagement/> */}
                        <UsersTable/>
                        
                        
                    </div>
                )}
                {activeTab === "Statistiques" && (
                    <div className="flex flex-col justify-center items-center gap-8">
                        <h2 className="text-2xl font-poppins font-bold ">Tableau de bord</h2>
                        <StatistiqueComponents/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MobileSubMenu;