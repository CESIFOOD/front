import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const CreateMenuPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [articles, setArticles] = useState([]); // Liste des articles disponibles
    const [menu, setMenu] = useState({
        name: "",
        price: "",
        image: "",
        articles: [], // Liste des articles sélectionnés
        restaurant: '',
    });

    // 🔄 Charger les articles depuis l'API
    const getArticles = async () => {
        try {
            const response = await axios.get("http://localhost:8080/articles");
            setArticles(response.data);
        } catch (error) {
            toast.error("Erreur lors du chargement des articles");
        }
    };

    useEffect(() => {
        getArticles();
    }, []);

    // Ajouter un nouvel article au menu
    const addArticleSelection = () => {
        setMenu((prevMenu) => ({
            ...prevMenu,
            articles: [...prevMenu.articles, ""], // Ajoute un champ vide
        }));
    };

    //  Modifier un article sélectionné
    const handleArticleChange = (index, value) => {
        const updatedArticles = [...menu.articles];
        updatedArticles[index] = value;
        setMenu((prevMenu) => ({
            ...prevMenu,
            articles: updatedArticles,
        }));
    };

    // Supprimer un article du menu
    const removeArticleSelection = (index) => {
        const updatedArticles = menu.articles.filter((_, i) => i !== index);
        setMenu((prevMenu) => ({
            ...prevMenu,
            articles: updatedArticles,
        }));
    };

    // 🔄 Enregistrer le menu
    const saveMenu = async (e) => {
        e.preventDefault();
    
        if (!menu.name || !menu.price || menu.articles.length === 0 || !menu.restaurant) {
            toast.warning("Veuillez remplir tous les champs obligatoires (*)");
            return;
        }
    
        setIsLoading(true);
    
        try {
            const validArticles = menu.articles.filter(id => id !== ""); // Garde uniquement les IDs valides
    
            const menuData = {
                name: menu.name,
                price: parseFloat(menu.price),
                image: menu.image || "",
                restaurant: menu.restaurant,
                articles: validArticles, // On envoie directement les IDs
            };

            console.log(`${menuData}`)
            console.log(`${validArticles}`)
            await axios.post("http://localhost:8080/menus", menuData);
            toast.success("Le menu a été créé avec succès !");
            // navigate("/dashboard");
        } catch (error) {
            toast.error("Erreur lors de la création du menu");
        } finally {
            setIsLoading(false);
        }
    };
    


    return (
        <div className="bg-[#fbf8f1] border border-[#fbf8f1] min-h-screen">
            <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-20">
                <h2 className="font-semibold font-poppins text-2xl mb-4 block text-center">
                    Créer un menu
                </h2>
                <form onSubmit={saveMenu}>
                    <div className="space-y-4">
                        {/* Champ Nom */}
                        <div>
                            <label>Nom <span className="text-[#e4011c]">*</span></label>
                            <input
                                type="text"
                                value={menu.name}
                                onChange={(e) => setMenu({ ...menu, name: e.target.value })}
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline"
                                placeholder="Entrez le nom du menu"
                            />
                        </div>

                        {/* Champ Prix */}
                        <div>
                            <label>Prix <span className="text-[#e4011c]">*</span></label>
                            <input
                                type="number"
                                value={menu.price}
                                onChange={(e) => setMenu({ ...menu, price: e.target.value })}
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline"
                                placeholder="Entrez le prix du menu"
                            />
                        </div>

                        {/* Champ Image */}
                        <div>
                            <label>Image</label>
                            <input
                                type="text"
                                value={menu.image}
                                onChange={(e) => setMenu({ ...menu, image: e.target.value })}
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline"
                                placeholder="Entrez le lien de l'image"
                            />
                        </div>


                        {/* Champ restaurant */}
                        <div>
                            <label>ID Restaurant</label>
                            <input
                                type="text"
                                value={menu.restaurant}
                                onChange={(e) => setMenu({ ...menu, restaurant: e.target.value })}
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline"
                                placeholder="Entrez l'ID"
                            />
                        </div>

                        {/* Sélection des articles */}
                        <div>
                            <label>Articles <span className="text-[#e4011c]">*</span></label>
                            {menu.articles.map((selectedArticle, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <select
                                        value={selectedArticle}
                                        onChange={(e) => handleArticleChange(index, e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="" disabled>-- Sélectionnez un article --</option>
                                        {articles.length > 0 ? (
                                            ["Entrée", "Plat", "Dessert", "Boisson"].map((type) => (
                                                <optgroup label={type} key={type}>
                                                    {articles
                                                        .filter((article) => article.type === type)
                                                        .map((article) => (
                                                            <option key={article._id} value={article._id}>
                                                                {article.name}
                                                            </option>
                                                        ))}
                                                </optgroup>
                                            ))
                                        ) : (
                                            <option disabled>Chargement...</option>
                                        )}
                                    </select>

                                    {/* Bouton pour supprimer un article */}
                                    <button
                                        type="button"
                                        onClick={() => removeArticleSelection(index)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        ❌
                                    </button>
                                </div>
                            ))}

                            {/* Bouton Ajouter un article */}
                            <button
                                type="button"
                                onClick={addArticleSelection}
                                className="mt-2 text-blue-600 hover:underline"
                            >
                                + Ajouter un article
                            </button>
                        </div>
                    </div>

                    {/* Boutons */}
                    {!isLoading && (
                        <div className="flex flex-row justify-around mt-10">
                            <button
                                type="submit"
                                className="bg-[#e4011c] py-2 px-6 rounded-full text-white font-poppins flex flex-row gap-2 items-center justify-center hover:bg-[#b10015]"
                            >
                                Ajouter
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/dashboard")}
                                className="bg-white py-2 px-4 rounded-full text-black font-poppins flex flex-row gap-2 items-center justify-center hover:bg-gray-300 border-1 border-black"
                            >
                                Annuler
                            </button>
                        </div>
                    )}
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CreateMenuPage;
