import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const CreateArticlePage = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [idRestaurant, setIdRestaurant] = useState(""); // Initialisé à vide
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Récupère l'ID du restaurant depuis le localStorage
        const restaurantId = localStorage.getItem("restaurantId");
        if (restaurantId) {
            setIdRestaurant(restaurantId); // On met à jour l'état idRestaurant avec l'ID du restaurant
        }
    }, []);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const saveArticle = async(e) => {
        e.preventDefault()
        if (name === "" || price === "" || selectedOption === "") {
            toast.warning('Veuillez remplir tous les champs obligatoires (*)')
            return;
        }
        try {
            setIsLoading(true)
            const response = await axios.post("http://localhost:8080/articles", {
                name: name,
                type: selectedOption,
                price: price, 
                restaurant: idRestaurant, // Utilise l'ID récupéré dans l'état
                image: image
            })
            toast.success(`L'article a été sauvegardé avec succès !`)
            setIsLoading(false)
            navigate('/dashboard') // Rediriger vers le dashboard après l'ajout de l'article
        } catch (error) {
            toast.error(error.message || 'Une erreur s\'est produite');
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-[#fbf8f1] border border-[#fbf8f1]">
            <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-20">
                <h2 className="font-semibold font-poppins text-2xl mb-4 block text-center">Créer un article</h2>
                <form action="">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="">Nom <span className="text-[#e4011c]">*</span></label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Entrez le nom" />
                        </div>
                        <div>
                            <label>Type <span className="text-[#e4011c]">*</span></label>
                            <select
                                value={selectedOption}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="" disabled>-- Sélectionnez --</option>
                                <option value="Entrée">Entrée</option>
                                <option value="Plat">Plat</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Boisson">Boisson</option>
                            </select>
                        </div>
                        <div>
                            <label >Prix <span className="text-[#e4011c]">*</span></label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Entrez le prix" />
                        </div>
                        <div>
                            <label >Image</label>
                            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Entrez le lien de l'image" />
                        </div>
                    </div>
                    {
                        !isLoading && (
                            <div className="flex flex-row justify-around mt-10">
                                <button onClick={saveArticle} className="bg-[#e4011c] py-2 px-6 rounded-full text-white font-poppins flex flex-row gap-2 items-center justify-center hover:bg-[#b10015]">Ajouter</button>
                                <Link to='/dashboard' className="bg-white py-2 px-4 rounded-full text-black font-poppins flex flex-row gap-2 items-center justify-center hover:bg-gray-300 border-1 border-black">Annuler</Link>
                            </div>
                        )
                    }

                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CreateArticlePage;
