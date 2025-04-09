import LogoGrill from '../assets/Logo_Grill.png';
import Navbar from './Navbar';
import MobileNavbar from './MobileNavbar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import du contexte d'authentification
import { useState } from 'react';

const Header = () => {
    const { accessToken, logout } = useAuth(); // Récupère le token et la fonction logout depuis le contexte
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/'); // Redirige vers l'accueil après la déconnexion
    };

    return (
        <header className="py-8 xl:py-12">
            <div className="container mx-auto px-4 flex justify-between items-center bg-[#fbf8f1]">
                <div className='flex-row flex items-center gap-5'>
                    <img className='w-auto h-[45px]' src={LogoGrill} alt="Grill_Logo" />
                    <h1 className="text-black text-2xl font-black tracking-[3px] flex sm:hidden lg:flex">GRILL</h1>
                </div>

                {/* Desktop nav */}
                <div className='hidden sm:flex items-center gap-8 flex-row'>
                    <Navbar />

                    {/* Si l'utilisateur est connecté */}
                    {accessToken ? (
                        <div className="relative">
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className='flex items-center justify-center gap-2 rounded-[0.5vh] bg-[#e4011c] p-[1.3vh] w-auto'
                            >
                                <span className='text-white font-medium'>Mon compte</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style={{ fill: "#ffffff" }} viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                </svg>
                            </button>

                            {/* Sous-menu */}
                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                                    <Link 
                                        to="/profil" 
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Mon profil
                                    </Link>
                                    <button 
                                        onClick={handleLogout} 
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Se déconnecter
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to={'/login'} className='flex items-center justify-center gap-2 rounded-[0.5vh] bg-[#e4011c] p-[1.3vh] w-auto'>
                            <span className='text-white font-medium'>Se connecter</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style={{ fill: "#ffffff" }} viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                        </Link>
                    )}
                </div>

                {/* Mobile nav */}
                <div className='flex sm:hidden'>
                    <MobileNavbar />
                </div>
            </div>
        </header>
    );
};

export default Header;
