
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather App",
  description: "Simple weather app using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="fixed top-0 left-0 right-0 bg-gray-800 p-4 text-white flex justify-center items-center z-10">
          <div className="mx-auto">
            <Link href="/" className="text-white">
              Home
            </Link>
            <Link href="/about" className="text-white ml-4">
              About
            </Link>
            <Link href="/services" className="text-white ml-4">
              Services
            </Link>
            <Link href="/contact" className="text-white ml-4">
              Contact
            </Link>
          </div>
        </nav>
        <main className="mt-16">{children}</main>
      </body>
    </html>
  );
}
