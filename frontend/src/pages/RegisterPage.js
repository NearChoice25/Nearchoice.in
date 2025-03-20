import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'salesman' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const register = () => {
    axios.post('/api/auth/register', form).then(() => alert('Registered successfully'));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input name="name" onChange={handleChange} className="border p-2 w-full rounded mb-2" placeholder="Name" />
      <input name="email" onChange={handleChange} className="border p-2 w-full rounded mb-2" placeholder="Email" />
      <input name="password" type="password" onChange={handleChange} className="border p-2 w-full rounded mb-2" placeholder="Password" />
      <select name="role" onChange={handleChange} className="border p-2 w-full rounded mb-2">
        <option value="salesman">Salesman</option>
        <option value="shopOwner">Shop Owner</option>
      </select>
      <button onClick={register} className="bg-blue-500 text-white p-2 rounded">Register</button>
    </div>
  );
}
