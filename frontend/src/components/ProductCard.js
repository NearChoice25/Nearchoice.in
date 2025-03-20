export default function ProductCard({ product }) {
    return (
      <div className="border p-4 rounded shadow">
        <img src={product.imageUrl} alt={product.name} className="h-32 w-full object-cover rounded mb-2" />
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p>{product.description}</p>
        <p className="text-green-600 font-semibold">${product.price}</p>
      </div>
    );
  }