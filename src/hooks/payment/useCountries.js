import { useQuery } from "@tanstack/react-query";

const API_URL = "https://api.countrystatecity.in/v1/countries";
const API_KEY = "YzM4SWVUSVBrZ2RFNERmOUJYMGRDSGxOYVlnTzZJUkRYM1dIMlY2WA==";

const fetchCountries = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "X-CSCAPI-KEY": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  return response.json();
};

export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 5, 
    retry: 2, 
  });
};
