import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed!');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-bold text-center">Login</h2>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
          className="border p-2 w-full rounded" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
          className="border p-2 w-full rounded" required />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">Login</button>
      </form>
    </div>
  );
}
