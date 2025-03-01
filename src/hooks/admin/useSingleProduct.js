import { useQuery } from "@tanstack/react-query";

// const ORIGIN = "http://localhost:3000"; 
const ORIGIN = "https://raphsodies.vercel.app"

export function useSingleProduct(productId) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (!productId) throw new Error("Product ID is required");

      const response = await fetch(`/api/products/products/${productId}`);
      const locationHeader = response.headers.get('X-User-Location');
      const location = locationHeader ? JSON.parse(locationHeader) : null;

      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      return {
        data,
        location
      }
    },
    enabled: !!productId, // Only fetch if productId exists
  });
}
