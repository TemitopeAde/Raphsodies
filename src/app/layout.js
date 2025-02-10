import { Unbounded } from "next/font/google";
import "./globals.css";
import Footer from "@/components/main/footer";
import ReactQueryProvider from "@/lib/ReactQueryProvide";
import ToastProvider from "@/lib/ToastProvider";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"]
});

export const metadata = {
  title: "African Rhapsody",
  description: "African Rhapsody Store"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${unbounded.variable} text-primary antialiased h-full`}>
        <ReactQueryProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ReactQueryProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
