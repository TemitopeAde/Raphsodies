import { useMutation } from '@tanstack/react-query';

export function useCreateUser() {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await fetch('/api/users/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user');
      }

      return response.json();
    },
  });
}
