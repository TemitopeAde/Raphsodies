import { useMutation } from '@tanstack/react-query';

/**
 * Custom hook for handling contact form submissions
 * @returns {Object} Mutation object with submit function, loading state, and error handling
 */
export const useContactMutation = () => {
  return useMutation({
    mutationFn: async (contactData) => {
      const headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
      };
      
      const bodyContent = JSON.stringify({
        email: contactData.email,
        phone: contactData.phone,
        message: contactData.message,
        name: contactData.name
      });
      
      const response = await fetch("/api/contact", { 
        method: "POST",
        body: bodyContent,
        headers: headersList
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Something went wrong');
      }
      
      return await response.json();
    },
    onSuccess: (data) => {
      console.log('Contact submitted successfully:', data);
      // You can add more logic here, like showing a success toast
    },
    onError: (error) => {
      console.error('Error submitting contact form:', error);
      // You can add more logic here, like showing an error toast
    }
  });
};