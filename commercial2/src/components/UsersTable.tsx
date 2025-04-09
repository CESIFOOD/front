import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState(null);
  const [editData, setEditData] = useState({ username: '', newPassword: '' });
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = (username) => {
    setEditData({ username, newPassword: "" });
    setShowPopup(true);
  };

  const closePopup = () => {
    setEditData({ username: "", newPassword: "" });
    setShowPopup(false);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users');
      setUsers(response.data);
    } catch (err) {
      console.error("Erreur lors du chargement des utilisateurs :", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCheckboxChange = (username) => {
    setSelectedUsername(username === selectedUsername ? null : username);
  };

  const handleDelete = async () => {
    if (!selectedUsername) return alert("Sélectionnez un utilisateur.");
    try {
      await axios.delete(`http://localhost:8080/users/${selectedUsername}`);
      fetchUsers();
      setSelectedUsername(null);
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  const handleSuspend = async () => {
    if (!selectedUsername) return alert("Sélectionnez un utilisateur.");
    try {
      const user = users.find((u) => u.username === selectedUsername);
      if (!user) return alert("Utilisateur non trouvé.");
      console.log(`user id : ${user.id}`)
      await axios.put(`http://localhost:8080/users/${user.id}/suspend`);
      fetchUsers();
    } catch (err) {
      console.error("Erreur lors de la suspension :", err);
    }
  };

  const handleUnsuspend = async () => {
    if (!selectedUsername) return alert("Sélectionnez un utilisateur.");
    try {
      const user = users.find((u) => u.username === selectedUsername);
      if (!user) return alert("Utilisateur non trouvé.");
      console.log(`user id : ${user.id}`);
      await axios.put(`http://localhost:8080/users/${user.id}/unsuspend`);
      fetchUsers();
    } catch (err) {
      console.error("Erreur lors du retrait de la suspension :", err);
    }
  };


  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/users/${editData.username}`, {
        newPassword: editData.newPassword,
      });
      fetchUsers();
      setEditData({ username: '', newPassword: '' });
      alert("Utilisateur modifié !");
    } catch (err) {
      console.error("Erreur lors de la modification :", err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Liste des utilisateurs</h2>

      <div className="mb-4 flex gap-4">
        <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleDelete}>Supprimer</button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={handleSuspend}>Suspendre</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleUnsuspend}>Réactiver</button>
      </div>

      <div className="overflow-x-auto flex justify-center">
        <table className="bg-white border border-gray-200 shadow-md rounded-lg w-full">
          <thead className="bg-[#e9374b] text-white">
            <tr>
              <th className="px-6 py-3 text-left">Sélection</th>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Nom d'utilisateur</th>
              <th className="px-6 py-3 text-left">Rôle</th>
              <th className="px-6 py-3 text-left">Suspension</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b-2 border-[#e4011c]">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsername === user.username}
                    onChange={() => handleCheckboxChange(user.username)}
                  />
                </td>
                <td className="px-6 py-4 text-gray-700">{user.id}</td>
                <td className="px-6 py-4 text-gray-700">{user.username}</td>
                <td className="px-6 py-4 text-gray-700">{user.role}</td>
                <td className="px-6 py-4 text-gray-700">{user.suspended ? "Oui" : "Non"}</td>
                <td className="px-6 py-4">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => openPopup(user.username)}
                  >
                    Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de modification */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Modifier l'utilisateur : {editData.username}
            </h3>
            <form onSubmit={(e) => { e.preventDefault(); handleEditSubmit(e); closePopup(); }}>
              <label className="block mb-2">
                Nouveau mot de passe :
                <input
                  type="password"
                  className="w-full border p-2 mt-1 rounded"
                  value={editData.newPassword}
                  onChange={(e) =>
                    setEditData({ ...editData, newPassword: e.target.value })
                  }
                />
              </label>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  onClick={closePopup}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UsersTable = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch users data on component mount
//   useEffect(() => {
//     // Remplacez l'URL par celle de votre API
//     axios.get('http://localhost:8080/users')
//       .then(response => {
//         setUsers(response.data);  // Mettez à jour l'état avec les données reçues
//         setLoading(false);         // Marquer le chargement comme terminé
//       })
//       .catch(err => {
//         setError('Une erreur est survenue lors du chargement des données.');
//         setLoading(false);         // Marquer le chargement comme terminé
//       });
//   }, []);

//   if (loading) {
//     return <div>Chargement...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h2>Liste des utilisateurs</h2>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nom d'utilisateur</th>
//             <th>Rôle</th>
//             <th>Token de rafraîchissement</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.username}</td>
//               <td>{user.role}</td>
//               <td>{user.refreshToken}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UsersTable;
