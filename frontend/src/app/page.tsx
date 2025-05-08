"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Utilisation correcte

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("tenant"); // ou une valeur par défaut
  const [type, setType] = useState("person"); // 'person' ou 'company'
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    try {
      const response = await axios.post("/api/auth/register", {
        name,
        email,
        password,
        phone,
        role,
        type,
      });

      const { token, role: userRole } = response.data;

      localStorage.setItem("token", token);

      switch (userRole) {
        case "admin":
          router.push("/admin/dashboard");
          break;
        case "owner":
          router.push("/owner/dashboard");
          break;
        case "tenant":
          router.push("/tenant/dashboard");
          break;
        default:
          setError("Role inconnu.");
      }
    } catch {
      setError("Erreur lors de l'inscription. Veuillez vérifier vos informations.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Inscription</h2>
        <input
          type="text"
          placeholder="Nom complet"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Numéro de téléphone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <div className="mb-2">
          <label className="mr-2">Rôle:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="tenant">Locataire</option>
            <option value="owner">Propriétaire</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="mr-2">Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="person">Personne</option>
            <option value="company">Entreprise</option>
          </select>
        </div>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <button
          onClick={handleRegister}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          inscrire
        </button>
      </div>
    </div>
  );
}
