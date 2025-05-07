import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Card, CardContent, Input, Button } from '@/components/ui';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, role } = response.data;

      localStorage.setItem('token', token);

      switch (role) {
        case 'admin':
          router.push('/admin/dashboard');
          break;
        case 'owner':
          router.push('/owner/dashboard');
          break;
        case 'tenant':
          router.push('/tenant/dashboard');
          break;
        default:
          setError('Role inconnu.');
      }
    } catch (error) {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Connexion</h2>
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2" />
          <Input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4" />
          {error && <p className="text-red-500">{error}</p>}
          <Button onClick={handleLogin}>Se connecter</Button>
        </CardContent>
      </Card>
    </div>
  );
}
