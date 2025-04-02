import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import GalleryArticle from "../components/GalleryArticle";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const RestaurantViewPage = () => {
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [restaurant, setRestaurant] = useState({
        name: "",
        type: "",
        adress: "",
        image: ""
    });
    const [articles, setArticles] = useState([]);

    const getArticles = async () => {
        try {
            const articleResponse = await axios.get(`http://localhost:8080/articles?restaurant=${id}`);
            setArticles(articleResponse.data);
        } catch (error) {
            toast.error("Erreur lors du chargement des articles");
        } finally {
            setIsLoading(false); // Mise à jour de l'état de chargement après l'appel
        }
    };

    const getRestaurant = async () => {
        setIsLoading(true); // Mise à jour de l'état de chargement avant l'appel
        try {
            const restaurantResponse = await axios.get(`http://localhost:8080/restaurants/${id}`);
            setRestaurant({
                name: restaurantResponse.data.name,
                type: restaurantResponse.data.type,
                adress: restaurantResponse.data.adress,
                image: restaurantResponse.data.image,
                description: restaurantResponse.data.description
            });
        } catch (error) {
            toast.error("Erreur lors du chargement du restaurant");
        } finally {
            setIsLoading(false); // Mise à jour de l'état de chargement après l'appel
        }
    };

    useEffect(() => {
        setIsLoading(true); // Activer le chargement au début
        getRestaurant();
        getArticles();
    }, [id]);


    const navigate = useNavigate(); // Déclare le hook ici

    const goBack = () => {
        navigate(-1); // Utilise navigate ici dans la fonction de rappel
    };

    return (
        <div className="container mx-auto px-5 bg-[#fbf8f1]">
            <button className="mb-6 hover:text-[#e4011c]" type="button" onClick={goBack}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg></button>
            {isLoading && <p>Chargement...</p>}
            {/* Section restaurant */}
            <div className="lg:grid lg:grid-cols-2 gap-6 items-start">
                <img
                    className="h-50 object-cover w-full overflow-hidden shadow-lg rounded-[10px] lg:h-80"
                    src={restaurant.image}
                    alt={restaurant.name}
                />
                <div className="flex flex-col justify-between h-full">
                    <div className="mb-4">
                        <div className="bg-gray-200 w-full h-0.5 rounded-[10px] hidden lg:flex"></div>
                        <div className="flex flex-row justify-between mt-6 items-center">
                            <div>
                                <h1 className="font-poppins font-bold text-2xl uppercase">{restaurant.name}</h1>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-gray-500 text-[2.5vh]">{restaurant.type}</p>
                                <p className="text-gray-500 text-[1.7vh]">{restaurant.adress}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col gap-4">
                            {restaurant.description && (
                                <p className="font-inter text-justify text-[2.0vh] ">
                                    <span className="font-semibold">Description : </span>{restaurant.description}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* Barre grise en bas */}
                    <div className="bg-gray-200 w-full h-0.5 rounded-[10px] lg:mt-auto"></div>
                </div>
            </div>

            {/* Section articles */}
            <div className="mt-10 gap-6">
                <h2 className=" capitalize font-poppins text-[2.6vh] font-semibold">Les articles :</h2>
                <GalleryArticle />
            </div>

            <ToastContainer />
        </div>
    );
};

export default RestaurantViewPage;
