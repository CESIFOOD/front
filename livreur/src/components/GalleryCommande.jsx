import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const GalleryCommande = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    let livreurId = null;
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            livreurId = payload.username;
        } catch (e) {
            console.error("Token invalide", e);
        }
    }

    const getOrders = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("http://localhost:8080/commandes");
            setOrders(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, status, setLivreur = false) => {
        try {
            await axios.put(`http://localhost:8080/commandes/${orderId}`, {
                status,
                ...(setLivreur && { livreurId })
            });
            toast.success("Commande mise à jour");
            getOrders();
        } catch (err) {
            toast.error("Erreur lors de la mise à jour");
        }
    };

    const renderTable = (title, ordersList, showActions = false, type = null) => (
        <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 font-poppins">{title}</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-[#e9374b] text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">Date</th>
                            <th className="px-6 py-3 text-left">Commande</th>
                            <th className="px-6 py-3 text-left">Articles</th>
                            <th className="px-6 py-3 text-left">Prix</th>
                            <th className="px-6 py-3 text-left">Statut</th>
                            {showActions && <th className="px-6 py-3 text-left">Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {ordersList.map(order => (
                            <tr key={order._id} className="border-t">
                                <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{order._id}</td>
                                <td className="px-6 py-4">{order.article?.reduce((acc, item) => acc + item.quantity, 0) || 0}</td>
                                <td className="px-6 py-4">{order.totalPrice} €</td>
                                <td className="px-6 py-4 font-semibold capitalize">{type === 'dispo' ? 'Disponible' : order.status}</td>
                                {showActions && (
                                    <td className="px-6 py-4 space-x-2">
                                        {type === 'dispo' && (
                                            <>
                                                <button onClick={() => updateOrderStatus(order._id, 'refusé')} className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded">❌</button>
                                                <button onClick={() => updateOrderStatus(order._id, 'en préparation', true)} className="bg-green-500 hover:bg-green-700 text-white px-4 py-1 rounded">✅</button>
                                            </>
                                        )}
                                        {type === 'accepted' && (
                                            <button onClick={() => updateOrderStatus(order._id, 'livraison en cours')} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded">Oui</button>
                                        )}
                                        {type === 'in-progress' && (
                                            <button onClick={() => updateOrderStatus(order._id, 'livré')} className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-1 rounded">Acquitter</button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    useEffect(() => {
        getOrders();
    }, []);

    // Filtres spécifiques
    const availableOrders = orders.filter(o => o.status === 'en préparation' && !o.livreurId);
    const acceptedOrders = orders.filter(o => o.status === 'en préparation' && o.livreurId === livreurId);
    const inProgressOrders = orders.filter(o => o.status === 'livraison en cours' && o.livreurId === livreurId);
    const deliveredOrders = orders.filter(o => o.status === 'livré' && o.livreurId === livreurId);

    return (
        <div className="container mx-auto p-6">
            {isLoading ? <p>Chargement...</p> : (
                <>
                    {renderTable("Commandes disponibles", availableOrders, true, 'dispo')}
                    {renderTable("Commandes acceptées", acceptedOrders, true, 'accepted')}
                    {renderTable("En livraison", inProgressOrders, true, 'in-progress')}
                    {renderTable("Commandes livrées", deliveredOrders)}
                </>
            )}
        </div>
    );
};

export default GalleryCommande;
