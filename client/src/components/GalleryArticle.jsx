import ArticleCard from "./ArticleCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';



const GalleryArticle = () => {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);
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

    useEffect(() => {
        setIsLoading(true); // Activer le chargement au début
        getArticles();
    }, [id]);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-[#fbf8f1]">
            {isLoading ? (
                <p>Chargement...</p>
            ) : articles.length === 0 ? (
                <p>Aucun article disponible</p>
            ) : (
                articles.map((article, index) => {
                    return (
                        <ArticleCard key={index} item={article} />
                    )
                })
            )}

            <ToastContainer />
        </div>
    )
}

export default GalleryArticle;