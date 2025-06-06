import { Unbounded } from "next/font/google";
import "./globals.css";
import Footer from "@/components/main/footer";
import ReactQueryProvider from "@/lib/ReactQueryProvide";
import ToastProvider from "@/lib/ToastProvider";
import { AuthProvider } from "@/hooks/store/useAuth";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"]
});

export const metadata = {
  title: "African Rhapsody",
  description: "African Inspired Beauty brand that makes cruelty-free botanical skincare products for the clearest, glowing and stunning skin."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${unbounded.variable} text-primary antialiased h-full`}>
        <ReactQueryProvider>
          <ToastProvider>
            <AuthProvider>
              
                {children}
             
            </AuthProvider>
          </ToastProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
