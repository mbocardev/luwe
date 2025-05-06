'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord Administrateur</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/users/list" className="block bg-white p-4 shadow rounded hover:bg-gray-50">
          <h2 className="text-xl font-semibold">Gestion des utilisateurs</h2>
          <p className="text-gray-600">Voir, vérifier ou bannir les comptes</p>
        </Link>

        <Link href="/admin/properties/list" className="block bg-white p-4 shadow rounded hover:bg-gray-50">
          <h2 className="text-xl font-semibold">Biens immobiliers</h2>
          <p className="text-gray-600">Consulter ou modérer les annonces</p>
        </Link>

        <Link href="/admin/rentals/list" className="block bg-white p-4 shadow rounded hover:bg-gray-50">
          <h2 className="text-xl font-semibold">Locations</h2>
          <p className="text-gray-600">Suivre les locations en cours</p>
        </Link>

        <Link href="/admin/issues/list" className="block bg-white p-4 shadow rounded hover:bg-gray-50">
          <h2 className="text-xl font-semibold">Signalements</h2>
          <p className="text-gray-600">Gérer les problèmes signalés</p>
        </Link>

        <Link href="/admin/payments" className="block bg-white p-4 shadow rounded hover:bg-gray-50">
          <h2 className="text-xl font-semibold">Paiements</h2>
          <p className="text-gray-600">Suivre les transactions et paiements</p>
        </Link>
      </div>
    </main>
  );
}
