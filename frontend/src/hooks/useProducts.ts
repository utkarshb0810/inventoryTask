import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import type { Product } from "../types/product";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("/products");
      return res.data;
    },
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newProduct: Omit<Product, "id">) =>
      api.post("/products", newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updated: Product) =>
      api.put(`/products/${updated.id}`, updated),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
