import { useQuery } from "@tanstack/react-query";

const fetchProducts = async ({ queryKey }) => {
  const [_key, { page, limit, search, category, minPrice, maxPrice }] = queryKey;

  const ORIGIN = "https://raphsodies.vercel.app"

  const url = new URL(`${ORIGIN}/api/products/products`);
  url.searchParams.append("page", page);
  url.searchParams.append("limit", limit);
  if (search) url.searchParams.append("search", search);
  if (category) url.searchParams.append("category", category);
  if (minPrice) url.searchParams.append("minPrice", minPrice);
  if (maxPrice) url.searchParams.append("maxPrice", maxPrice);

  const myHeaders = new Headers();
  myHeaders.append(
    "Cookie",
    "accessToken=s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTk4NWI2NjItNzQ1Mi00NmJmLWFkODktYTFiZjE1MzA5OTdmIiwiZW1haWwiOiJhZGVzaXlhbnRvcGVAZ21haWwuY29tIiwiYWN0aXZlIjp0cnVlLCJpc3ZlcmlmaWVkIjp0cnVlLCJ1c2VydHlwZSI6Im1lcmNoYW50Iiwicm9sZSI6IlN1cGVyYWRtaW4iLCJvbmJvYXJkaW5nIjp0cnVlLCJzdG9yZXNJZCI6ImRhMDc3MTE2LTAzMDMtNDEzNi1hYzg1LTc5YjFiZmYzM2Q5OSJ9LCJpYXQiOjE3Mzg4NTkyNDUsImV4cCI6MTczODk0NTY0NX0.GZNfMkDV-L9r6Yt3V0XMJ9CCK8VNVDg7ZhSFe7ILXmI.%2B7vFHmVsSFpSprMbdIFGiw4Mi1nWZ3uhIMKVQP7i9So"
  );

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const useProducts = ({ page = 1, limit = 10, search = "", category = null, minPrice = null, maxPrice = null }) => {
  return useQuery({
    queryKey: ["products", { page, limit, search, category, minPrice, maxPrice }],
    queryFn: fetchProducts,
    keepPreviousData: true, // Keeps old data while fetching new data
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};
