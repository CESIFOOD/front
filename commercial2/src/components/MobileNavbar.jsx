import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

const MobileNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { accessToken, logout } = useAuth();

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    return (
        <div className="relative flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
            </button>

            {/* Overlay */}
            <div className={`fixed inset-0 bg-black transition-opacity duration-300 ${isOpen ? "opacity-50" : "opacity-0 pointer-events-none"}`} onClick={() => setIsOpen(false)}></div>

            {/* Menu mobile */}
            <div className={`fixed top-0 right-0 h-full w-1/2 bg-[#fbf8f1] shadow-lg p-6 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col gap-8`}>
                <div>
                    <button onClick={() => setIsOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="hover:fill-[#e4011c] transition-all duration-200" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    <Link to="/" onClick={() => setIsOpen(false)} className="text-[15px] font-poppins font-light capitalize hover:text-[#e4011c]">accueil</Link>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-[15px] font-poppins font-light capitalize hover:text-[#e4011c]">tableau de bord</Link>
                    <Link to="/support" onClick={() => setIsOpen(false)} className="text-[15px] font-poppins font-light capitalize hover:text-[#e4011c]">support</Link>

                    {!accessToken ? (
                        <Link to="/login" onClick={() => setIsOpen(false)} className="text-[15px] font-poppins font-light capitalize hover:text-[#e4011c]">se connecter</Link>
                    ) : (
                        <>
                            <Link to="/profil" onClick={() => setIsOpen(false)} className="text-[15px] font-poppins font-light capitalize hover:text-[#e4011c]">profil</Link>
                            <button onClick={handleLogout} className="text-[15px] font-poppins font-light capitalize hover:text-[#e4011c] text-left">déconnexion</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MobileNavbar;
