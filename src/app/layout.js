import { Unbounded } from "next/font/google";
import "./globals.css";
import Footer from "@/components/main/footer";
import ReactQueryProvider from "@/lib/ReactQueryProvide";

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
    <html lang="en">
      <body className={`${unbounded.variable} text-primary antialiased`}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
        <Footer />
      </body>
    </html>
  );
}
