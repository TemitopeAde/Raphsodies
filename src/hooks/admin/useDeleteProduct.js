import { useMutation, useQueryClient } from "@tanstack/react-query";

const ORIGIN = "https://raphsodies.vercel.app"; 
// const ORIGIN = "http://localhost:3000"


export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const response = await fetch(`${ORIGIN}/api/products/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Cookie": "accessToken=YOUR_ACCESS_TOKEN_HERE",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
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
