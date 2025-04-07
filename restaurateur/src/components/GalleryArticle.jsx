import ArticleCard from "./ArticleCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';



const GalleryArticle = ({ restaurantId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [articles, setArticles] = useState([]);

    const getArticles = async () => {
        try {
            const articleResponse = await axios.get(`http://localhost:8080/articles`);
            // Filtrer les articles selon le restaurant
            const filteredArticles = articleResponse.data.filter(article => article.restaurant === restaurantId);
            setArticles(filteredArticles);
        } catch (error) {
            toast.error("Erreur lors du chargement des articles");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (restaurantId) {
            setIsLoading(true);
            getArticles();
        }
    }, [restaurantId]);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-[#fbf8f1]">
            {isLoading ? (
                <p>Chargement...</p>
            ) : articles.length === 0 ? (
                <p>Aucun article disponible</p>
            ) : (
                articles.map((article, index) => (
                    <ArticleCard key={index} item={article} getArticles={getArticles} />
                ))
            )}

            <ToastContainer />
        </div>
    );
};

export default GalleryArticle;



// const [isLoading, setIsLoading] = useState(false);
// const [articles, setArticles] = useState([]);

// const getArticles = async () => {
//     try {
//         const articleResponse = await axios.get(`http://localhost:8080/articles`);
//         setArticles(articleResponse.data);
//     } catch (error) {
//         toast.error("Erreur lors du chargement des articles");
//     } finally {
//         setIsLoading(false); // Mise à jour de l'état de chargement après l'appel
//     }
// };

// useEffect(() => {
//     setIsLoading(true); // Activer le chargement au début
//     getArticles();
// }, []);

// return (
//     <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-[#fbf8f1]">
//         {isLoading ? (
//             <p>Chargement...</p>
//         ) : articles.length === 0 ? (
//             <p>Aucun article disponible</p>
//         ) : (
//             articles.map((article, index) => {
//                 return (
//                     <ArticleCard key={index} item={article} getArticles={getArticles} />
//                 )
//             })
//         )}

//         <ToastContainer />
//     </div>
// )