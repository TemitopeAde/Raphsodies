import { useQuery } from "@tanstack/react-query";

const API_KEY = "YzM4SWVUSVBrZ2RFNERmOUJYMGRDSGxOYVlnTzZJUkRYM1dIMlY2WA==";

const fetchStatesByCountry = async (code) => {
  if (!code) throw new Error("Country code is required");

  const response = await fetch(`https://api.countrystatecity.in/v1/countries/${code}/states`, {
    method: "GET",
    headers: {
      "X-CSCAPI-KEY": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch states for country: ${code}`);
  }

  return response.json();
};

export const useStatesByCountry = (code) => {
  return useQuery({
    queryKey: ["states", code], // Ensures refetch when `code` changes
    queryFn: () => fetchStatesByCountry(code),
    enabled: !!code, // Prevents query from running without a valid country code
    staleTime: 1000 * 60 * 5, 
    retry: 2, 
  });
};
