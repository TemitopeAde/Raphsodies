import { useQuery } from "@tanstack/react-query";

const fetchUsers = async ({ page, limit, name }) => {
    console.log({name});
    
    const ORIGIN = "https://raphsodies.vercel.app"
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(name ? { name } : {}),
  });

  const response = await fetch(`${ORIGIN}/api/users/users?${queryParams}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

export const useUsers = ({ page = 1, limit = 10, name = "" }) => {
  return useQuery({
    queryKey: ["users", page, limit, name], // Unique key for caching
    queryFn: () => fetchUsers({ page, limit, name }),
    keepPreviousData: true, // Keep previous data while fetching new one

  });
};
