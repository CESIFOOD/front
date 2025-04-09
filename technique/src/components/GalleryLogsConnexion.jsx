import { useEffect, useState } from "react";
import axios from "axios";

const GalleryLogsConnexion = () => {
  const [logs, setLogs] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  const getLogs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/logs");
      setLogs(response.data);
    } catch (error) {
      console.log("Erreur lors de la récupération des logs :", error);
    }
  };

  const getTextStyle = (name) => {
    switch (name) {
      case "Login Success":
        return "text-[#01e418] bg-[#defce1]";
      case "Logout":
        return "text-[#e47a01] bg-[#fceede]";
      case "Lofing Failed":
        return "text-[#e71d35] bg-[#fcdfe2]";

    }
  };

  useEffect(() => {
    getLogs();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Logs de Connexion</h2>
        <div className="flex gap-4">
          <button
            className="bg-[#e9374b] hover:bg-[#c7283a] text-white font-bold py-2 px-4 rounded"
            onClick={getLogs}
          >
            Rafraîchir
          </button>
          <button
            className="bg-[#e9374b] hover:bg-[#c7283a] text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsVisible((prev) => !prev)}
          >
            {isVisible ? "Masquer les logs" : "Afficher les logs"}
          </button>
        </div>
      </div>

      {isVisible && logs.length > 0 ? (
        <div className="overflow-x-auto flex justify-center">
          <table className="bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-[#e9374b] text-white font-poppins">
              <tr>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr
                  key={index}
                  className={`border-b-2 border-[#e4011c] font-inter font-semibold}`}
                >
                  <td className={`px-6 py-4`}>{new Date(log.createdAt).toLocaleDateString()}</td>
                  <td className={`px-6 py-4 ${getTextStyle(log.name)}`}>{log.name}</td>
                  <td className="px-6 py-4">{log.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">Aucun log à afficher.</p>
      )}
    </div>
  );
};

export default GalleryLogsConnexion;
