'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error('Erreur lors du chargement', err));
  }, [id]);

  if (!user) {
    return <p className="p-6">Chargement...</p>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Détails de l’utilisateur #{user.id}</h1>

      <div className="bg-white shadow rounded p-4 space-y-4">
        <p><strong>Nom:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rôle:</strong> {user.role}</p>
        <p><strong>Téléphone:</strong> {user.phone || 'Non défini'}</p>
        <p><strong>Date de création:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
        {/* Ajoutez ici d'autres infos pertinentes selon le modèle */}
      </div>
    </main>
  );
}
