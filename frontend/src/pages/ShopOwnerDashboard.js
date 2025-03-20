import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

export default function ShopOwnerDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/products/my', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProducts(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}
