import { useState } from 'react';
import axios from 'axios';

export default function PasswordResetPage() {
  const [email, setEmail] = useState('');

  const requestReset = () => {
    axios.post('/api/auth/reset-password', { email }).then(() => alert('Reset link sent to your email'));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full rounded mb-2" placeholder="Email" />
      <button onClick={requestReset} className="bg-blue-500 text-white p-2 rounded">Send Reset Link</button>
    </div>
  );
}