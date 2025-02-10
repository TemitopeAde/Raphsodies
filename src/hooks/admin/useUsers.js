import { useQuery } from "@tanstack/react-query";

const fetchUsers = async ({ page, limit, search }) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search ? { search } : {}),
  });

  const response = await fetch(`/api/users?${queryParams}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

export const useUsers = ({ page = 1, limit = 10, search = "" }) => {
  return useQuery({
    queryKey: ["users", page, limit, search], // Unique key for caching
    queryFn: () => fetchUsers({ page, limit, search }),
    keepPreviousData: true, // Keep previous data while fetching new one
  });
};
