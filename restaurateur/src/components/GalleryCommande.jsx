import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const GalleryCommande = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const getOrders = async () => {
        const restaurantId = localStorage.getItem("restaurantId");
        if (!restaurantId) {
            toast.error("Aucun restaurant sélectionné.");
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.get("http://localhost:8080/commandes");
            const restaurantOrders = response.data.filter(
                (order) => order.restaurant === restaurantId
            );
            console.log("Commandes du restaurant :", restaurantOrders);

            // Enrichir les articles de chaque commande
            const enrichedOrders = await Promise.all(
                restaurantOrders.map(async (order) => {
                    const enrichedArticles = await Promise.all(
                        order.article.map(async (item) => {
                            try {
                                const res = await axios.get(`http://localhost:8080/articles/${item.article}`);
                                return {
                                    ...res.data,
                                    quantity: item.quantity
                                };
                            } catch (err) {
                                console.error("Erreur lors de la récupération d'un article :", err);
                                return {
                                    name: "Inconnu",
                                    price: 0,
                                    quantity: item.quantity
                                };
                            }
                        })
                    );
                    return {
                        ...order,
                        article: enrichedArticles
                    };
                })
            );

            setOrders(enrichedOrders);
        } catch (error) {
            console.log(error);
            toast.error("Erreur lors du chargement des commandes.");
        } finally {
            setIsLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:8080/commandes/${orderId}`, {
                status: newStatus,
            });
            toast.success(`Commande ${newStatus.toUpperCase()}`);
            getOrders(); // Rafraîchir
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de la mise à jour du statut.");
        }
    };

    const getTotalItems = (order) =>
        order.article?.reduce((total, item) => total + item.quantity, 0) || 0;

    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case "en validation":
                return "text-[#01a7e4] bg-[#def4fc]";
            case "en préparation":
                return "text-[#01e418] bg-[#defce1]";
            case "livraison en cours":
                return "text-[#e47a01] bg-[#fceede]";
            case "livré":
                return "text-[#e71d35] bg-[#fcdfe2]";
            case "refusé":
                return "text-red-500 bg-red-100";
            default:
                return "";
        }
    };

    const openModal = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setShowModal(false);
    };

    const renderTable = (filteredOrders, title, showActions = false) => (
        <div className="mb-12">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            {filteredOrders.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead className="bg-[#e9374b] text-white font-poppins">
                            <tr>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Commande</th>
                                <th className="px-4 py-3">Articles</th>
                                <th className="px-4 py-3">Prix</th>
                                <th className="px-4 py-3">Statut</th>
                                <th className="px-4 py-3">Voir</th>
                                {showActions && <th className="px-4 py-3">Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order._id} className="border-b">
                                    <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">{order._id}</td>
                                    <td className="px-4 py-2">{getTotalItems(order)}</td>
                                    <td className="px-4 py-2">{order.totalPrice} €</td>
                                    <td className={`px-4 py-2 font-semibold uppercase ${getStatusStyle(order.status)}`}>
                                        {order.status}
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => openModal(order)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Voir les articles
                                        </button>
                                    </td>
                                    {showActions && (
                                        <td className="px-4 py-2 flex gap-2">
                                            <button
                                                onClick={() => updateOrderStatus(order._id, "refusé")}
                                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                ❌
                                            </button>
                                            <button
                                                onClick={() => updateOrderStatus(order._id, "en préparation")}
                                                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                ✅
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">Aucune commande.</p>
            )}
        </div>
    );

    useEffect(() => {
        getOrders();
    }, []);

    const enValidation = orders.filter((o) => o.status === "en validation");
    const enPreparation = orders.filter((o) => o.status === "en préparation");
    const enLivraison = orders.filter((o) => o.status === "livraison en cours");
    const livre = orders.filter((o) => o.status === "livré");

    return (
        <div className="container mx-auto p-6">
            {isLoading ? (
                <p>Chargement des commandes...</p>
            ) : (
                <>
                    {renderTable(enValidation, "Commandes en validation", true)}
                    {renderTable(enPreparation, "Commandes en préparation")}
                    {renderTable(enLivraison, "Commandes en livraison")}
                    {renderTable(livre, "Commandes livrées")}
                </>
            )}

            {showModal && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">Articles de la commande</h3>
                        <ul className="space-y-3 max-h-96 overflow-y-auto">
                            {selectedOrder.article?.map((item, i) => (
                                <li key={i} className="border p-3 rounded shadow-sm">
                                    <p><strong>Nom :</strong> {item.name}</p>
                                    <p><strong>Quantité :</strong> {item.quantity}</p>
                                    <p><strong>Prix :</strong> {item.price} €</p>
                                </li>
                            ))}
                        </ul>
                        <div className="text-right mt-6">
                            <button
                                onClick={closeModal}
                                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryCommande;
