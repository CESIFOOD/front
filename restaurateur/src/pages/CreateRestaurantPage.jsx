import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const CreateRestaurantPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        adress: '',
        image: '',
        description: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Session expirée. Veuillez vous reconnecter.");
            return;
        }
    
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const userId = payload.username; // ou payload.id si ton token contient un id unique
    
            const dataToSend = {
                ...formData,
                userId,
            };
    
            const response = await axios.post("http://localhost:8080/restaurants", dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            localStorage.setItem('restaurantId', response.data._id);
            toast.success("Restaurant créé avec succès !");
            navigate("/dashboard");

        } catch (error) {
            console.error("Erreur lors de la création du restaurant :", error);
            
        }
    };

    return (
        <div className='bg-[#fbf8f1] h-screen flex items-center justify-center'>
            <div className="bg-white shadow-lg p-10 rounded-lg max-w-lg w-full">
                <div className='flex flex-col items-center justify-center mb-10 gap-4'>

                    <h2 className='font-poppins font-semibold text-[2.7vh] text-gray-900'>Créez votre restaurant</h2>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-2'>
                        <label className='font-inter text-gray-600'>Nom du restaurant :</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className='bg-gray-100 border font-inter text-gray-700 border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-[0.1vh] focus:ring-gray-300'
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='font-inter text-gray-600'>Type de cuisine :</label>
                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className='bg-gray-100 border font-inter text-gray-700 border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-[0.1vh] focus:ring-gray-300'
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='font-inter text-gray-600'>Adresse :</label>
                        <input
                            type="text"
                            name="adress"
                            value={formData.adress}
                            onChange={handleChange}
                            className='bg-gray-100 border font-inter text-gray-700 border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-[0.1vh] focus:ring-gray-300'
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='font-inter text-gray-600'>Image (URL) :</label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className='bg-gray-100 border font-inter text-gray-700 border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-[0.1vh] focus:ring-gray-300'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='font-inter text-gray-600'>Description :</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className='bg-gray-100 border font-inter text-gray-700 border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-[0.1vh] focus:ring-gray-300'
                        />
                    </div>
                    <button
                        type="submit"
                        className='bg-[#e4011c] text-white font-inter font-semibold hover:bg-[#b10015] py-2 px-4 rounded-xl mt-2'
                    >
                        Créer le restaurant
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default CreateRestaurantPage;
