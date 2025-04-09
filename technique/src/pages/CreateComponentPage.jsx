import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const CreateComponentPage = () => {
    const [name, setName] = useState('');
    // const [path, setPath] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        if (!name || !file) {
            setError("Le nom et le fichier composant sont obligatoires.");
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('name', name); // le nom du composant
            formData.append('file', file); // le fichier sélectionné
            formData.append('description', description); // le fichier sélectionné
    
            const response = await axios.post('http://localhost:8080/components', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
    
            if (response.status === 201) {
                toast.success("Composant créé avec succès !");
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Erreur lors de la création :", error);
            toast.error("Erreur lors de la création du composant.");
        }
    };
    

    return (
        <div className='bg-[#fbf8f1] h-screen pt-[6vh]'>
            <div className="flex flex-col items-center bg-white shadow-lg mx-auto  p-10 rounded-lg max-w-lg">
                <div className='flex flex-col items-center justify-center mb-10 gap-4'>
                    <h2 className='font-poppins font-semibold text-[2.7vh] text-gray-900'>Créer un nouveau composant</h2>
                </div>
                <div className='w-full'>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-2'>
                            <label className='font-inter text-gray-600'>Nom du composant :</label>
                            <input
                                className='bg-gray-100 border-1 font-inter text-gray-700 border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-[0.1vh] focus:ring-gray-300 focus:border-red-300'
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* <div className='flex flex-col gap-2'>
                            <label className='font-inter text-gray-600'>Chemin du composant (path) :</label>
                            <input
                                className='bg-gray-100 border-1 font-inter text-gray-700 border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-[0.1vh] focus:ring-gray-300 focus:border-red-300'
                                type="text"
                                value={path}
                                onChange={(e) => setPath(e.target.value)}
                            />
                        </div> */}
                        <div className='flex flex-col gap-2'>
                            <label className='font-inter text-gray-600'>Fichier composant (.jsx) :</label>
                            <input
                                type="file"
                                accept=".jsx"
                                onChange={(e) => setFile(e.target.files[0])}
                                className='bg-gray-100 border-1 font-inter text-gray-700 border-gray-200 p-2 rounded-lg'
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-inter text-gray-600'>Description :</label>
                            <textarea
                                className='bg-gray-100 border-1 font-inter text-gray-700 border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-[0.1vh] focus:ring-gray-300 focus:border-red-300'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {error && <p className='text-red-500'>{error}</p>}

                        <button
                            className='bg-[#e4011c] text-white font-inter font-semibold hover:bg-[#b10015] py-2 px-4 rounded-xl mt-4'
                            type="submit"
                        >
                            Créer le composant
                        </button>
                    </form>

                    <div className='flex flex-col items-center justify-center mt-4'>
                        <span className='text-[1.6vh]'>Retour à la liste des composants ? <Link to='/dashboard' className='text-[#fd001e] font-inter font-semibold hover:text-[#cd1016]'>Voir la galerie</Link></span>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default CreateComponentPage;
