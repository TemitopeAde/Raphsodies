"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
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
            <div>
              <input
                type="password"
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
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div>
              <input
                type="password"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00EEAE]"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
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
