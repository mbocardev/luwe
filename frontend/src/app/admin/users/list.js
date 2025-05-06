'use client';

import { useEffect, useState } from 'react';

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Exemple de requête à une API Node.js
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Erreur lors du chargement des utilisateurs', err));
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Supprimer cet utilisateur ?')) {
      await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
      });
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des Utilisateurs</h1>

      <table className="w-full border-collapse bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Nom</th>
            <th className="p-3">Email</th>
            <th className="p-3">Rôle</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{user.id}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3 capitalize">{user.role}</td>
              <td className="p-3 flex space-x-2">
                <button className="text-blue-600 hover:underline">Modifier</button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:underline"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
