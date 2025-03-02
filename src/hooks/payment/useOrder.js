import { useQuery } from "@tanstack/react-query";

const fetchOrders = async ({ page, limit, search, status }) => {
  const queryParams = new URLSearchParams({
    page,
    limit,
    search: search || "",
    status: status || "",
  });

  const response = await fetch(`/api/payment/payments?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
};

const useOrders = ({ page = 1, limit = 10, search = "", status = "" } = {}) => {
  return useQuery({
    queryKey: ["orders", page, limit, search, status],
    queryFn: () => fetchOrders({ page, limit, search, status }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, 
  });
};

export default useOrders;
