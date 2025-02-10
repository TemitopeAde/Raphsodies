import { useQuery } from "@tanstack/react-query";

const ORIGIN = "http://localhost:3000"; 

export function useSingleProduct(productId) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (!productId) throw new Error("Product ID is required");

      const response = await fetch(`${ORIGIN}/api/products/products/${productId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      return response.json();
    },
    enabled: !!productId, // Only fetch if productId exists
  });
}
