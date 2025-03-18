"use client";

import { useState, Suspense } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useCreateUser } from "@/hooks/store/useSignup";
import { useLogin } from "@/hooks/store/useLogin";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";

export default function AuthForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthFormContent />
    </Suspense>
  );
}

function AuthFormContent() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  
  const { mutate: createUser, isPending } = useCreateUser();
  const { mutate: loginUser, isPending: loginLoading } = useLogin();

  const validateForm = () => {
    let newErrors = {};
    if (isSignUp && !formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (isSignUp && formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isSignUp) {
      createUser({ name: formData.fullName, email: formData.email, password: formData.password }, {
        onSuccess: () => {
          toast.success("Please check your email to verify your account", { theme: "colored" });
          setIsSignUp(false);
          setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
        },
        onError: (err) => toast.error(err.message || "Signup failed. Try again.", { theme: "colored" }),
      });
    } else {
      loginUser({ email: formData.email, password: formData.password }, {
        onSuccess: () => {
          toast.success("Login successful! Redirecting...", { theme: "colored" });
          
          setTimeout(() => {
            window.location.href = '/checkout'
            // router.push("/checkout");
          }, 1500); 
        },
        onError: (err) => toast.error(`${err}`, { theme: "colored" }),
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#00EEAE] to-[#171717] px-4 py-10 font-unbounded">
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-lg md:flex">
        <div className="relative flex w-full flex-col justify-center rounded-l-2xl p-10 text-white md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/lp.png")' }}></div>

        <div className="w-full p-10 md:w-1/2">
          <button onClick={() => router.back()} className="mb-4 text-[#292F4A] hover:text-[#00EEAE]">&larr; Back</button>

          <div className="mb-6 flex justify-center space-x-4 text-[#292F4A]">
            <span className={`cursor-pointer ${!isSignUp ? "border-b-2 border-[#00EEAE] font-semibold text-[#00EEAE]" : "opacity-70"}`} onClick={() => setIsSignUp(false)}>Sign In</span>
            <span className={`cursor-pointer ${isSignUp ? "border-b-2 border-[#00EEAE] font-semibold text-[#00EEAE]" : "opacity-70"}`} onClick={() => setIsSignUp(true)}>Sign Up</span>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaUser className="text-gray-400" />
                </div>
                <input type="text" placeholder="Full Name" className="w-full rounded-lg border px-4 py-3 pl-10 focus:ring-[#00EEAE]" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                {errors.fullName && <p className="mt-1 text-sm text-[#FF4D4D]">{errors.fullName}</p>}
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input type="email" placeholder="E-mail" className="w-full rounded-lg border px-4 py-3 pl-10 focus:ring-[#00EEAE]" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              {errors.email && <p className="mt-1 text-sm text-[#FF4D4D]">{errors.email}</p>}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="text-gray-400" />
              </div>
              <input type="password" placeholder="Password" className="w-full rounded-lg border px-4 py-3 pl-10 focus:ring-[#00EEAE]" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              {errors.password && <p className="mt-1 text-sm text-[#FF4D4D]">{errors.password}</p>}
            </div>

            {isSignUp && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaLock className="text-gray-400" />
                </div>
                <input type="password" placeholder="Confirm Password" className="w-full rounded-lg border px-4 py-3 pl-10 focus:ring-[#00EEAE]" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
                {errors.confirmPassword && <p className="mt-1 text-sm text-[#FF4D4D]">{errors.confirmPassword}</p>}
              </div>
            )}

            <button type="submit" className="w-full flex items-center justify-center rounded-lg bg-[#00EEAE] py-3 text-white hover:bg-[#00C898] disabled:opacity-35" disabled={isPending || loginLoading}>
              {(isPending || loginLoading) ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
            </button>

            {!isSignUp && (
              <p className="text-sm text-gray-600 text-center mt-4">
                <Link href="/forget-password" className="text-[#00C898] font-semibold">Forgot Password?</Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}