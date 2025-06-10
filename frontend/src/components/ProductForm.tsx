import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { useAddProduct, useUpdateProduct } from "../hooks/useProducts";

interface ProductFormProps {
  initialData?: Product | null;
  onSuccess: () => void;
}
const ProductForm = ({ initialData, onSuccess }: ProductFormProps) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setQuantity(initialData.quantity);
      setPrice(initialData.price);
    } 
    else {
      setName("");
      setQuantity(0);
      setPrice(0);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || price <= 0) {
      alert("Invalid input");
      return;
    }

    const productData = { name, quantity, price };

    if (initialData) {
      updateProduct.mutate({ ...initialData, ...productData }, { onSuccess });
    } else {
      addProduct.mutate(productData, { onSuccess });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white border rounded shadow w-full max-w-md mx-auto mt-4"
    >
      <h2 className="text-lg font-semibold">
        {initialData ? "Edit" : "Add"} Product
      </h2>
      <div>
        <label className="block mb-1">Name</label>
        <input
          className="w-full border px-2 py-1 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Quantity</label>
        <input
          type="number"
          className="w-full border px-2 py-1 rounded"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Price</label>
        <input
          type="number"
          className="w-full border px-2 py-1 rounded"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {initialData ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default ProductForm;
