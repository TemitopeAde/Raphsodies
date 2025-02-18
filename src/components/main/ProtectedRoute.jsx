import { useAuth } from "@/hooks/store/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname().replace(/^\/+/, ""); 

//   useEffect(() => {
//     if (!loading && !isAuthenticated) {
//       router.push(`/sign-in?redirect=${pathname}`); 
//     }
//   }, [isAuthenticated, loading, router, pathname]);

    useEffect(() => {
        if (!loading && !isAuthenticated) {
        // Ensure pathname is valid before redirecting
        const redirectPath = pathname ? `?redirect=${pathname}` : "";
        router.push(`/sign-in${redirectPath}`);
        }
    }, [isAuthenticated, loading, router, pathname]);

  if (loading) return <p>Loading...</p>;
  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
