import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const StatistiqueComponents = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/commandes");
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error("Erreur de récupération des commandes :", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalRevenue = filteredOrders.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const kpiStatus = (status) =>
    filteredOrders.filter((order) => order.status.toLowerCase() === status).length;

  const handleFilterChange = (period) => {
    setFilter(period);
    const now = new Date();
    let filtered = orders;

    if (period === "day") {
      filtered = orders.filter((o) => new Date(o.createdAt).toDateString() === now.toDateString());
    } else if (period === "month") {
      filtered = orders.filter(
        (o) =>
          new Date(o.createdAt).getMonth() === now.getMonth() &&
          new Date(o.createdAt).getFullYear() === now.getFullYear()
      );
    } else if (period === "year") {
      filtered = orders.filter((o) => new Date(o.createdAt).getFullYear() === now.getFullYear());
    }

    setFilteredOrders(filtered);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Tableau de bord des commandes</h2>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 text-blue-700 p-4 rounded-lg font-semibold">En validation: {kpiStatus("en validation")}</div>
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg font-semibold">Préparation: {kpiStatus("en préparation")}</div>
        <div className="bg-orange-100 text-orange-700 p-4 rounded-lg font-semibold">En livraison: {kpiStatus("livraison en cours")}</div>
        <div className="bg-green-100 text-green-700 p-4 rounded-lg font-semibold">Livré: {kpiStatus("livré")}</div>
      </div>

      {/* Chiffre d'affaires */}
      <div className="mb-6 text-lg font-medium">Chiffre d'affaires total : <span className="font-bold">{totalRevenue.toFixed(2)} €</span></div>

      {/* Filtres */}
      <div className="mb-6 flex gap-4">
        <button onClick={() => handleFilterChange("all")} className={`px-4 py-2 rounded ${filter === "all" ? "bg-red-600 text-white" : "bg-gray-200"}`}>Tout</button>
        <button onClick={() => handleFilterChange("day")} className={`px-4 py-2 rounded ${filter === "day" ? "bg-red-600 text-white" : "bg-gray-200"}`}>Aujourd'hui</button>
        <button onClick={() => handleFilterChange("month")} className={`px-4 py-2 rounded ${filter === "month" ? "bg-red-600 text-white" : "bg-gray-200"}`}>Ce mois</button>
        <button onClick={() => handleFilterChange("year")} className={`px-4 py-2 rounded ${filter === "year" ? "bg-red-600 text-white" : "bg-gray-200"}`}>Cette année</button>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-[#e9374b] text-white">
            <tr>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Commande ID</th>
              <th className="px-6 py-3 text-left">Prix</th>
              <th className="px-6 py-3 text-left">Utilisateur</th>
              <th className="px-6 py-3 text-left">Statut</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="border-b-2 border-[#e4011c]">
                <td className="px-6 py-4 text-gray-700">{format(new Date(order.createdAt), "dd/MM/yyyy")}</td>
                <td className="px-6 py-4 text-gray-700">{order._id}</td>
                <td className="px-6 py-4 text-gray-700">{order.totalPrice} €</td>
                <td className="px-6 py-4 text-gray-700">{order.userId}</td>
                <td className="px-6 py-4 text-gray-700 capitalize">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatistiqueComponents;
    ;
