'use client'

import { useRouter } from "next/navigation";
import { Home, Box } from "lucide-react"; // Importing icons from lucide-react

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#00EEAE] to-[#171717] px-4 py-10 font-unbounded">
      <div className="flex w-full max-w-4xl flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg md:flex-row">
        {/* Left side: Text */}
        <div className="flex flex-col items-center justify-center md:w-1/2">
          <h1 className="text-4xl font-bold text-[#292F4A] mb-4">Oops! Page Not Found</h1>
          <p className="text-lg text-[#292F4A] opacity-80 mb-6">
            We couldn't find the page you're looking for. But don't worry, you can explore other pages on our site!
          </p>
        </div>

        {/* Right side: Buttons */}
        <div className="flex flex-col items-center justify-center md:w-1/2 space-y-4">
          <button
            onClick={() => router.push('/products')}
            className="flex items-center justify-center space-x-2 w-full px-6 py-3 bg-[#00EEAE] text-white rounded-lg shadow-md hover:bg-[#00C898] transition-all"
          >
            <Box className="text-xl" />
            <span className="text-lg">Go to Products</span>
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex items-center justify-center space-x-2 w-full px-6 py-3 bg-[#292F4A] text-white rounded-lg shadow-md hover:bg-[#171717] transition-all"
          >
            <Home className="text-xl" />
            <span className="text-lg">Go to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}
