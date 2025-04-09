// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const UserManagement = () => {
//     const [users, setUsers] = useState([]);

//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/users");
//             setUsers(response.data); // Stocke les utilisateurs dans l'état
//         } catch (error) {
//             toast.error("Erreur lors de la récupération des utilisateurs." + error.message);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:8080/users/${id}`);
//             toast.success("Utilisateur supprimé avec succès.");
//             fetchUsers();
//         } catch (error) {
//             toast.error("Erreur lors de la suppression de l'utilisateur." + error.message);
//         }
//     };

//     const handleSuspend = async (id) => {
//         try {
//             await axios.put(`http://localhost:8080/users/${id}/suspend`);
//             toast.success("Utilisateur suspendu avec succès.");
//             fetchUsers();
//         } catch (error) {
//             toast.error("Erreur lors de la suspension de l'utilisateur." + error.message);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     return (
//         <div className="container mx-auto p-6">
//             <h2 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h2>
//             <table className="table-auto w-full bg-white shadow-md rounded-lg">
//                 <thead className="bg-gray-200">
//                     <tr>
//                         <th className="px-4 py-2">Nom d'utilisateur</th>
//                         <th className="px-4 py-2">Rôle</th>
//                         <th className="px-4 py-2">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user) => (
//                         <tr key={user.id} className="border-b">
//                             <td className="px-4 py-2">{user.username}</td>
//                             <td className="px-4 py-2">{user.role}</td>
//                             <td className="px-4 py-2">
//                                 <button
//                                     className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//                                     onClick={() => alert(`Consulter ${user.username}`)}
//                                 >
//                                     Consulter
//                                 </button>
//                                 <button
//                                     className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
//                                     onClick={() => handleSuspend(user.id)}
//                                 >
//                                     Suspendre
//                                 </button>
//                                 <button
//                                     className="bg-red-500 text-white px-4 py-2 rounded"
//                                     onClick={() => handleDelete(user.id)}
//                                 >
//                                     Supprimer
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default UserManagement;
