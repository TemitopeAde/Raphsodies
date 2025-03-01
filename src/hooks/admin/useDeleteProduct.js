import { useMutation, useQueryClient } from "@tanstack/react-query";

const ORIGIN = "https://raphsodies.vercel.app"; 
// const ORIGIN = "http://localhost:3000"


export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const response = await fetch(`/api/products/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.warn("Failed to delete product");
        
        // throw new Error("Failed to delete product");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });
};
