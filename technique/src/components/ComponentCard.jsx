import axios from "axios";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

const ComponentCard = ({ component, getComponents }) => {

    const deleteComponent = async (id) => {
        const result = await Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Vous êtes sur le point de supprimer définitivement ce composant. Cette action est irréversible.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: 'Oui, supprimer'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:8080/components/${id}`);
                toast.success("Le composant a bien été supprimé");
                await getComponents();
            } catch (error) {
                toast.error("Erreur lors de la suppression du composant");
            }
        }
    };

    return (
        <div className="flex-col m-3 rounded-[5px] shadow-lg border-b-3 border-b-[#e4011c] pt-3 pr-3 pl-3 h-auto flex w-full bg-[#fbf8f1]">
            <div className="flex flex-col mt-5">
                <div className="flex flex-row justify-between items-center">
                    <p className="font-poppins font-bold text-lg">{component.name}</p>
                </div>
                <p className="text-gray-600">{component.description || "Aucune description disponible"}</p>
            </div>
            <div className="my-4 w-full flex flex-row justify-between">
                <button onClick={() => deleteComponent(component._id)} className="bg-red-800 text-white rounded-[5px] p-2 font-poppins">Supprimer</button>
            </div>
        </div>
    );
};

export default ComponentCard;
