import { useState } from 'react';
import axios from 'axios';

export default function SalesmanDashboard() {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');

  const submitSale = () => {
    const token = localStorage.getItem('token');
    axios.post('/api/sales', { productId, quantity }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => alert('Sale recorded'));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Record Sale</h2>
      <input type="text" value={productId} onChange={e => setProductId(e.target.value)} placeholder="Product ID"
        className="border p-2 w-full rounded mb-2" />
      <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="Quantity"
        className="border p-2 w-full rounded mb-2" />
      <button onClick={submitSale} className="bg-green-500 text-white p-2 rounded">Submit</button>
    </div>
  );
}