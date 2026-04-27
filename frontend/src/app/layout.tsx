import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ECOMJUMP | Premier E-Commerce Account Setup & Management",
  description: "EcomJump provides powerful account setup, legal support, market research, and growth strategies for Amazon, TikTok Shop, Shopify, and more.",
  keywords: ["e-commerce", "amazon agency", "shopify development", "tiktok shop", "business registration", "ecomjump"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Preloader />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

