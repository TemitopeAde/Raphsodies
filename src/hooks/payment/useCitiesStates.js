import { useQuery } from '@tanstack/react-query';

const fetchCities = async (countryIso, stateIso) => {
  const API_KEY = "YzM4SWVUSVBrZ2RFNERmOUJYMGRDSGxOYVlnTzZJUkRYM1dIMlY2WA==";

  const response = await fetch(
    `https://api.countrystatecity.in/v1/countries/${countryIso}/states/${stateIso}/cities`,
    {
      headers: {
        'X-CSCAPI-KEY': API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch cities');
  }

  return response.json();
};

const useCitiesByState = (countryIso, stateIso) => {
  return useQuery({
    queryKey: ['cities', countryIso, stateIso],
    queryFn: () => fetchCities(countryIso, stateIso),
    enabled: !!countryIso && !!stateIso, // Only fetch if both country and state ISO are available
    staleTime: 60000, // Cache cities for 1 minute
    cacheTime: 300000, // Cache for 5 minutes
  });
};

export default useCitiesByState;
