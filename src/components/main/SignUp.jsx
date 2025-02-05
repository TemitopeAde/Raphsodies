'use client'

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const router = useRouter(); // Initialize the router

  const GoogleIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.5 12.2762C22.5 11.5232 22.4369 10.7966 22.3196 10.095H12V14.182H17.6564C17.3959 15.6023 16.6525 16.8039 15.5381 17.6047V20.1031H18.9187C21.0281 18.1411 22.5 15.4696 22.5 12.2762Z"
        fill="#4285F4"
      />
      <path
        d="M12 23C14.97 23 17.432 22.0148 19.2722 20.3738L15.5381 17.6047C14.5232 18.335 13.3141 18.7756 12 18.7756C9.14998 18.7756 6.73727 16.787 5.89469 14.207H2.3938V16.789C4.22358 20.3142 7.85367 23 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.89469 14.207C5.66844 13.4767 5.53805 12.7033 5.53805 11.909C5.53805 11.1147 5.66844 10.3413 5.89469 9.611V7.02802H2.3938C1.50609 8.78032 1 10.7624 1 12.909C1 15.0556 1.50609 17.0377 2.3938 18.79L5.89469 14.207Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.14253C13.4732 5.14253 14.8292 5.66207 15.9285 6.598L19.3458 3.18109C17.4278 1.47218 14.9657 0.5 12 0.5C7.85367 0.5 4.22358 3.18586 2.3938 6.71095L5.89469 9.611C6.73727 7.03202 9.14998 5.14253 12 5.14253Z"
        fill="#EA4335"
      />
    </svg>
  );

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#00EEAE] to-[#171717] px-4 py-10 font-unbounded">
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-lg md:flex">
        {/* Left side with background image and black overlay */}
        <div
          className="relative flex w-full flex-col justify-center rounded-l-2xl p-10 text-white md:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/images/lp.png")', // replace with your image URL
          }}
        >
          {/* <div className="absolute inset-0 bg-black opacity-20"></div>  */}
          {/* <h2 className="text-lg font-semibold uppercase tracking-wide font-unbounded">African Rhapsody</h2> */}
          {/* <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
            Start your journey.
            <br />
            <span className="text-[#00EEAE]">Today.</span>
          </h1> */}
        </div>

        {/* Right side (form) */}
        <div className="w-full p-10 md:w-1/2">
          {/* Back Button */}
          <button 
            onClick={() => router.back()} 
            className="mb-4 text-[#292F4A] hover:text-[#00EEAE]"
          >
            &larr; Back
          </button>

          <div className="mb-6 flex justify-center space-x-4 text-[#292F4A]">
            <span className={`cursor-pointer ${!isSignUp ? "border-b-2 border-[#00EEAE] font-semibold text-[#00EEAE]" : "opacity-70"}`} onClick={() => setIsSignUp(false)}>Sign In</span>
            <span className={`cursor-pointer ${isSignUp ? "border-b-2 border-[#00EEAE] font-semibold text-[#00EEAE]" : "opacity-70"}`} onClick={() => setIsSignUp(true)}>Sign Up</span>
          </div>

          <button onClick={() => signIn("google")} className="mb-4 flex w-full items-center justify-center space-x-2 rounded-lg border border-gray-300 px-4 py-3 text-[#292F4A] hover:bg-gray-100">
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center py-2">
            <span className="absolute bg-white px-4 text-sm text-gray-400">or</span>
            <div className="w-full border-t border-gray-300"></div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="relative">
                <input type="text" placeholder="Full Name" className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 text-[#292F4A] focus:border-[#00EEAE] focus:ring-1 focus:ring-[#00EEAE]" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                <span className="absolute left-3 top-3 text-gray-400">🔗</span>
                {errors.fullName && <p className="mt-1 text-sm text-[#FF4D4D] font-freize">{errors.fullName}</p>}
              </div>
            )}

            <div className="relative">
              <input type="email" placeholder="E-mail" className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 text-[#292F4A] focus:border-[#00EEAE] focus:ring-1 focus:ring-[#00EEAE]" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <span className="absolute left-3 top-3 text-gray-400">📧</span>
              {errors.email && <p className="mt-1 text-sm text-[#FF4D4D] font-freize">{errors.email}</p>}
            </div>

            <div className="relative">
              <input type="password" placeholder="Password" className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 text-[#292F4A] focus:border-[#00EEAE] focus:ring-1 focus:ring-[#00EEAE]" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              <span className="absolute left-3 top-3 text-gray-400">🔒</span>
              {errors.password && <p className="mt-1 text-sm text-[#FF4D4D] font-freize">{errors.password}</p>}
            </div>

            {isSignUp && (
              <div className="relative">
                <input type="password" placeholder="Verify Password" className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 text-[#292F4A] focus:border-[#00EEAE] focus:ring-1 focus:ring-[#00EEAE]" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
                <span className="absolute left-3 top-3 text-gray-400">🔑</span>
                {errors.confirmPassword && <p className="mt-1 text-sm text-[#FF4D4D] font-freize">{errors.confirmPassword}</p>}
              </div>
            )}

            <button className="w-full rounded-lg bg-[#00EEAE] py-3 text-white hover:bg-[#00C898]">
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
