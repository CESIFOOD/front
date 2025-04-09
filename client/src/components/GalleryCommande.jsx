import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const GalleryCommande = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [restaurants, setRestaurants] = useState({});

    const getRestaurants = async () => {
        try {
            const response = await axios.get('http://localhost:8080/restaurants'); 
            const restaurantData = response.data.reduce((acc, restaurant) => {
                acc[restaurant._id] = restaurant.name; 
                return acc;
            }, {});
            setRestaurants(restaurantData);
        } catch (error) {
            console.log(error);
        }
    };

    const getOrders = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error('Session expirée, veuillez vous reconnecter.');
            return;
        }

        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.username;

        try {
            setIsLoading(true);
            const response = await axios.get('http://localhost:8080/commandes');
            const userOrders = response.data.filter(order => order.userId === userId);
            setOrders(userOrders);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const getTotalItems = (order) => {
        return order.article?.reduce((total, item) => total + item.quantity, 0) || 0;
    };

    const getStatusStyle = (status) => {
        switch (status.toLocaleLowerCase()) {
            case 'en validation' :
                return 'text-[#01a7e4] bg-[#def4fc]';
            case 'en préparation' : 
                return  'text-[#01e418] bg-[#defce1]'
            case 'livraison en cours' : 
                return  'text-[#e47a01] bg-[#fceede]'
            case 'livré' : 
                return 'text-[#e71d35] bg-[#fcdfe2]'
        }
    }


    useEffect(() => {
        getRestaurants();
        getOrders();
    }, []);

    return (
        <div className="container mx-auto p-6 ">

            {isLoading ? (
                <p>Chargement...</p>
            ) : orders.length > 0 ? (
                <div className="overflow-x-auto flex justify-center">
                    <table className=" bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead className="bg-[#e9374b] text-white font-poppins">
                            <tr>
                                <th className="px-6 py-3 text-left">Date</th>
                                <th className="px-6 py-3 text-left">Commande</th>
                                <th className="px-6 py-3 text-left">Nombre d'articles</th>
                                <th className="px-6 py-3 text-left">Prix</th>
                                <th className="px-6 py-3 text-left">Restaurant</th>
                                <th className="px-6 py-3 text-left">Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="border-b-2 border-[#e4011c]">
                                    <td className="px-6 py-4 font-inter text-gray-600 font-semibold">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 font-inter text-gray-600 font-semibold">{order._id}</td>
                                    <td className="px-6 py-4 font-inter text-gray-600 font-semibold">{getTotalItems(order)}</td>
                                    <td className="px-6 py-4 font-inter text-gray-600 font-semibold">{order.totalPrice} €</td>
                                    <td className="px-6 py-4 font-inter text-gray-600 font-semibold">{restaurants[order.restaurant] || "Chargement..."}</td>
                                    <td className={`px-6 py-4 font-inter font-semibold uppercase ${getStatusStyle(order.status)}`}>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Vous n'avez effectué aucune commande.</p>
            )}
        </div>
    );
};

export default GalleryCommande;
