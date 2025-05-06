'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateUser() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'tenant',
    phone: '',
    verified: false,
    type: 'person',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/admin/users');
      } else {
        const err = await res.json();
        alert(`Erreur : ${err.message || 'Impossible de créer l’utilisateur.'}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Créer un nouvel utilisateur</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Téléphone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select name="role" value={form.role} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="tenant">Locataire</option>
          <option value="owner">Propriétaire</option>
          <option value="admin">Admin</option>
        </select>

        <select name="type" value={form.type} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="person">Personne</option>
          <option value="company">Entreprise</option>
        </select>

        <label className="block">
          <input
            type="checkbox"
            name="verified"
            checked={form.verified}
            onChange={handleChange}
            className="mr-2"
          />
          Vérifié
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Créer l’utilisateur
        </button>
      </form>
    </main>
  );
}
