'use client'

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>}>
      <VerifyPageContent />
    </Suspense>
  );
}

function VerifyPageContent() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      verifyToken(token);
    } else {
      setMessage("No token provided.");
      toast.error("No token provided.");
      setLoading(false);
    }
  }, [token]);

  const verifyToken = async (token) => {
    console.log(token);
    
    try {
      const response = await fetch(`/api/users/verify-user?token=${token}`, {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Your account has been successfully verified!");
        toast.success("Account verified successfully!");
        setTimeout(() => {
          router.push("/sign-in"); // Redirect user to login page after success
        }, 2000);
      } else {
        setMessage(data.message || "Verification failed.");
        toast.error(data.message || "Verification failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#00EEAE] to-[#171717] px-4 py-10 font-unbounded">
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-lg">
        <div className="w-full p-10">
          {loading ? (
            <p>Verifying...</p>
          ) : (
            <div>
              <h2>{message}</h2>
              <button
                onClick={() => router.push("/sign-in")}
                className="mt-4 w-full rounded-lg bg-[#00EEAE] py-3 text-white hover:bg-[#00C898]"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
