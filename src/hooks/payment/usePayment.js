import { useMutation } from "@tanstack/react-query";

const usePayment = () => {
  return useMutation(async (paymentData) => {
    console.log("Sending request to /api/payments/initiate", paymentData);

    const response = await fetch("/api/paystack/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error("Failed to initiate payment");
    }

    return response.json();
  });
};

export default usePayment;