import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useState, useRef, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const MenuCard = ({ item, getMenus }) => {
    const [showCarousel, setShowCarousel] = useState(false);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState("right"); // "left" ou "right"
    const cardRef = useRef(null);
    const carouselRef = useRef(null);

    const deleteMenu = async (id) => {
        const result = await Swal.fire({
            title: "Êtes-vous sûr ?",
            text: "Vous êtes sur le point de supprimer définitivement un menu.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Oui, supprimer",
        });
        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:8080/menus/${id}`);
                toast.success("Le menu a bien été supprimé");
                await getMenus();
            } catch (error) {
                toast.error(error);
            }
        }
    };

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const articlePromises = item.articles.map((articleId) =>
                axios.get(`http://localhost:8080/articles/${articleId}`)
            );
            const articleResponses = await Promise.all(articlePromises);
            setArticles(articleResponses.map((res) => res.data));
        } catch (error) {
            toast.error("Erreur lors du chargement des articles");
        } finally {
            setLoading(false);
        }
    };

    const toggleCarousel = () => {
        if (!showCarousel) {
            fetchArticles();
            calculatePosition();
        }
        setShowCarousel(!showCarousel);
    };

    const calculatePosition = () => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const screenWidth = window.innerWidth;

            // Si la carte est trop proche du bord droit, afficher à gauche
            if (rect.right + 300 > screenWidth) {
                setPosition("left");
            } else {
                setPosition("right");
            }
        }
    };

    useEffect(() => {
        window.addEventListener("resize", calculatePosition);
        return () => window.removeEventListener("resize", calculatePosition);
    }, []);

    // Fermer le carrousel en cliquant en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                showCarousel &&
                carouselRef.current &&
                !carouselRef.current.contains(event.target) &&
                !cardRef.current.contains(event.target)
            ) {
                setShowCarousel(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showCarousel]);

    return (
        <div ref={cardRef} className="relative flex-col m-3 rounded-lg shadow-lg border-b-3 border-b-[#e4011c] pt-3 pr-3 pl-3 h-auto flex w-full bg-[#fbf8f1]">
            {/* Image + Flèche */}
            <div className="relative">
                <img className="w-full h-35 overflow-hidden flex items-center justify-center sm:h-40 object-cover" src={item.image} alt={item.name} />
                <button
                    onClick={toggleCarousel}
                    className="absolute top-5 right-[1vh] transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition shadow-lg"
                >
                    {showCarousel ? <FaChevronLeft /> : <FaChevronRight />}
                </button>
            </div>

            {/* Nom & Prix */}
            <div className="flex flex-col mt-5">
                <div className="flex flex-row justify-between items-center">
                    <p className="font-poppins">{item.name}</p>
                    <span className="bg-transparent text-[#e4011c] border-[#e4011c] border-1 font-inter rounded-[10px] ml-[0.5rem] p-[0.8vh] text-[1.8vh]">{item.price} €</span>
                </div>
            </div>

            {/* Boutons Modifier / Supprimer */}
            <div className="my-4 w-full flex flex-row justify-between">
                <Link to={`/editMenu/${item._id}`} className="bg-blue-800 text-white rounded-[5px] p-2 font-poppins">Modifier</Link>
                <button onClick={() => deleteMenu(item._id)} className="bg-red-800 text-white rounded-[5px] p-2 font-poppins">Supprimer</button>
            </div>

            {/* Carrousel des articles */}
            {showCarousel && (
                <div
                    ref={carouselRef}
                    className={`absolute top-[1vh] ${position === "right" ? "left-full" : "right-full"} 
                    bg-[white] border shadow-xl p-4 rounded-[5px] max-h-60 w-64 overflow-hidden z-50 
                    transition-transform duration-300 ease-in-out 
                    ${showCarousel ? "translate-x-0 opacity-100" : position === "right" ? "-translate-x-10 opacity-0 pointer-events-none" : "translate-x-10 opacity-0 pointer-events-none"}`}
                >
                    {loading ? (
                        <p className="text-center text-gray-500">Chargement...</p>
                    ) : articles.length === 0 ? (
                        <p className="text-center text-gray-500">Aucun article</p>
                    ) : (
                        <div className="flex overflow-x-auto space-x-4 scrollbar-hide p-2">
                            {articles.map((article, index) => (
                                <div key={index} className="min-w-[120px] bg-gray-100 p-2 rounded-md shadow-md">
                                    <img src={article.image} alt={article.name} className="w-full h-20 object-cover rounded-md" />
                                    <p className="text-sm mt-1">{article.name}</p>
                                    <p className="text-xs text-gray-500">{article.price} €</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MenuCard;
