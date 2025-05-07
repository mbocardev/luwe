import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Button, Input, Table, TableRow, TableCell, Modal } from '@/components/ui';

export default function AdminUserDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await axios.delete(`/api/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Admin - Gestion des Utilisateurs</h2>
          <Input placeholder="Rechercher..." value={search} onChange={handleSearch} className="mb-4" />
          <Table>
            <tbody>
              {loading ? <p>Chargement...</p> : filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(user)}>Editer</Button>
                    <Button className="ml-2" variant="destructive" onClick={() => handleDelete(user.id)}>Supprimer</Button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal d'édition */}
      {showModal && <Modal onClose={() => setShowModal(false)}>Édition de l'utilisateur {editUser?.name}</Modal>}
    </div>
  );
}
