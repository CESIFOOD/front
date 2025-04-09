import { useEffect, useState } from "react";
import axios from "axios";

const GalleryLogsComposant = () => {
  const [logs, setLogs] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  const getLogs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/logs/logComposant");
      setLogs(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Erreur lors de la récupération des logs :", error);
    }
  };

  const getTextStyle = (name) => {
    switch (name) {
      case "Success":
        return "text-[#01e418] bg-[#defce1]";
      case "Error":
        return "text-[#e71d35] bg-[#fcdfe2]";

    }
  };

  useEffect(() => {
    getLogs();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Logs de téléchargement des composants</h2>
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
                  <td className={`px-6 py-4 ${getTextStyle(log.name)}`}>{log.name}</td>
                  <td className="px-6 py-4">{log.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">Aucune log à afficher.</p>
      )}
    </div>
  );
};

export default GalleryLogsComposant;
