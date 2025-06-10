import { useState } from "react";
import { useProducts } from "./hooks/useProducts";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import type { Product } from "./types/product";

const App = () => {
  const { data: products, isLoading, error } = useProducts();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading products.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory </h1>

      <ProductForm
        initialData={editingProduct}
        onSuccess={() => setEditingProduct(null)}
      />

      <div className="mt-6">
        {products && (
          <ProductTable
            products={products}
            onEdit={(product) => setEditingProduct(product)}
          />
        )}
      </div>
    </div>
  );
};
export default App;
