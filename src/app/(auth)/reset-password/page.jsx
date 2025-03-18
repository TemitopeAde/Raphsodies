"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // Importing icons

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await fetch("/api/users/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword: data.password }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Password reset successful!");
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      } else {
        toast.error(result.message || "Failed to reset password.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#00EEAE] to-[#171717] px-4 py-10 font-unbounded">
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-lg">
        <div className="w-full p-10">
          <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Enter a new password for your account.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00EEAE]"
                placeholder="New password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"} // Toggle between text and password
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00EEAE]"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle visibility
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#00EEAE] py-3 text-white hover:bg-[#00C898] disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-4">
            Remembered your password?{" "}
            <button
              onClick={() => router.push("/sign-in")}
              className="text-[#00C898] font-semibold"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;