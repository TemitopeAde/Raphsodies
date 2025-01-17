import { Geist, Geist_Mono, Unbounded } from "next/font/google";
import "./globals.css";
import Header from "@/components/main/header";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

export const metadata = {
  title: "African Rhapsody",
  description: "African Rhapsody Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${unbounded.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
