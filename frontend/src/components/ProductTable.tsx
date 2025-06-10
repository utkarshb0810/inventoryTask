import type { Product } from "../types/product";
import { useDeleteProduct } from "../hooks/useProducts";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

const ProductTable = ({ products, onEdit }: ProductTableProps) => {
  const deleteMutation = useDeleteProduct();
  return (
    <table className="w-full text-left border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Quantity</th>
          <th className="p-2 border">Price</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="border-t">
            <td className="p-2 border">{product.name}</td>
            <td className="p-2 border">{product.quantity}</td>
            <td className="p-2 border">${product.price}</td>
            <td className="p-2 border flex gap-2">
              <button
                onClick={() => onEdit(product)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteMutation.mutate(product.id)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ProductTable;
