import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const EditMenuPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [menu, setMenu] = useState({
        name: "",
        price: "",
        image: "",
        restaurant: "",
        articles: [],
    });

    const [articles, setArticles] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getArticles = async () => {
            try {
                const response = await axios.get("http://localhost:8080/articles");
                setArticles(response.data);
                return response.data;
            } catch (error) {
                toast.error("Erreur lors du chargement des articles");
                return [];
            }
        };

        const getMenu = async (allArticles) => {
            try {
                const response = await axios.get(`http://localhost:8080/menus/${id}`);

                const menuArticles = response.data.articles.map(articleId => {
                    return allArticles.find(article => article._id === articleId) || null;
                }).filter(article => article !== null);

                setMenu({
                    ...response.data,
                    articles: menuArticles,
                });
            } catch (error) {
                toast.error("Erreur lors du chargement du menu");
            }
        };

        (async () => {
            const allArticles = await getArticles();
            await getMenu(allArticles);
        })();
    }, [id]);

    const handleArticleChange = (index, articleId) => {
        const selectedArticle = articles.find(article => article._id === articleId);
        if (!selectedArticle) return;

        const updatedArticles = [...menu.articles];
        updatedArticles[index] = selectedArticle;

        setMenu(prevMenu => ({
            ...prevMenu,
            articles: updatedArticles,
        }));
    };

    const removeArticleSelection = (index) => {
        const updatedArticles = menu.articles.filter((_, i) => i !== index);
        setMenu(prevMenu => ({
            ...prevMenu,
            articles: updatedArticles,
        }));
    };

    const addArticleSelection = () => {
        setMenu(prevMenu => ({
            ...prevMenu,
            articles: [...prevMenu.articles, null],
        }));
    };

    const saveMenu = async (e) => {
        e.preventDefault();

        if (!menu.name || !menu.price || menu.articles.length === 0 || !menu.restaurant) {
            toast.warning("Veuillez remplir tous les champs obligatoires (*)");
            return;
        }

        setIsLoading(true);

        try {
            const validArticles = menu.articles
                .filter(article => article !== null)
                .map(article => article._id);

            const menuData = {
                name: menu.name,
                price: parseFloat(menu.price),
                image: menu.image || "",
                restaurant: menu.restaurant,
                articles: validArticles,
            };

            await axios.put(`http://localhost:8080/menus/${id}`, menuData);
            toast.success("Le menu a été modifié avec succès !");
            navigate("/dashboard");
        } catch (error) {
            toast.error("Erreur lors de la modification du menu");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#fbf8f1] border border-[#fbf8f1] min-h-screen">
            <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-20">
                <h2 className="font-semibold font-poppins text-2xl mb-4 block text-center">
                    Modifier un menu
                </h2>
                <form onSubmit={saveMenu}>
                    <div className="space-y-4">
                        <div>
                            <label>Nom *</label>
                            <input
                                type="text"
                                value={menu.name}
                                onChange={(e) => setMenu({ ...menu, name: e.target.value })}
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div>
                            <label>Prix *</label>
                            <input
                                type="number"
                                value={menu.price}
                                onChange={(e) => setMenu({ ...menu, price: e.target.value })}
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div>
                            <label>Image *</label>
                            <input
                                type="text"
                                value={menu.image}
                                onChange={(e) => setMenu({ ...menu, image: e.target.value })}
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline"
                            />
                            {menu.image && (
                                <img src={menu.image} alt="Menu" className="mt-2 w-full h-32 object-cover rounded" />
                            )}
                        </div>

                        <div>
                            <label>Articles *</label>
                            {menu.articles.map((selectedArticle, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <select
                                        value={selectedArticle ? selectedArticle._id : ""}
                                        onChange={(e) => handleArticleChange(index, e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="" disabled>-- Sélectionnez un article --</option>
                                        {articles.map(article => (
                                            <option key={article._id} value={article._id}>
                                                {article.name}
                                            </option>
                                        ))}
                                    </select>

                                    <button
                                        type="button"
                                        onClick={() => removeArticleSelection(index)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        ❌
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addArticleSelection}
                                className="mt-2 text-blue-600 hover:underline"
                            >
                                + Ajouter un article
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-row justify-around mt-10">
                        <button type="submit" className="bg-red-600 py-2 px-6 rounded-full text-white hover:bg-red-800">
                            Modifier
                        </button>
                        <button type="button" onClick={() => navigate("/dashboard")} className="bg-gray-200 py-2 px-4 rounded-full hover:bg-gray-300">
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditMenuPage;
