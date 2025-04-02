import axios from "axios";
import EditArticlePage from "../pages/EditArticlePage";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import { useEffect } from "react";

const ArticleCard = ({ item, getArticles }) => {

    const deleteArticle = async (id) => {
        const result = await Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Vous êtes sur le point de supprimer définitivement l'article. Aucun retour ne sera possible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: 'Oui, supprimer'
        })
        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:8080/articles/${id}`)
                toast.success("L'article a bien été supprimé");
                await getArticles();
            } catch (error) {
                toast.error(error)
            }
        }

    }


    return (
        <div className="flex-col m-3 rounded-[5px] shadow-lg border-b-3 border-b-[#e4011c] pt-3 pr-3 pl-3 h-auto flex w-full bg-[#fbf8f1]">
            <img className="w-full h-35 overflow-x-hidden flex items-center justify-center sm:h-40 object-cover" src={item.image} alt={item.name} />
            <div className="flex flex-col mt-5">
                <div className="flex flex-row justify-between items-center">
                    <p className="font-poppins ">{item.name}</p>
                    <span className="bg-transparent text-[#e4011c] border-[#e4011c] border-1 font-inter rounded-[10px] ml-[0.5rem] p-[0.8vh] text-[1.8vh]"> {item.price} €</span>
                </div>
                <p>{item.type}</p>
            </div>
            <div className="my-4 w-full flex flex-row justify-between">
                <Link to={`/editArticle/${item._id}`} className="bg-blue-800 text-white rounded-[5px] p-2 font-poppins">Modifier</Link>
                <button onClick={() => deleteArticle(item._id)} className="bg-red-800 text-white rounded-[5px] p-2 font-poppins">Supprimer</button>
            </div>
        </div>
    )
}

export default ArticleCard;

