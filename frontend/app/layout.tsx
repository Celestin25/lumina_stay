
import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Changed font to Outfit for premium look
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LuminaStay Morocco | Premium Real Estate",
  description: "AI-Powered Real Estate Analytics & Booking in Morocco",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.className} bg-slate-50 text-slate-900 antialiased`}>
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
      </body>
    </html>
  );
}
