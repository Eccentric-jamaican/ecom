import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Inter_Tight } from "next/font/google";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sendcat - AI-Powered E-Commerce Shopping",
  description:
    "Discover products from eBay with AI-powered search. Find the best deals on electronics, clothing, home goods, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
<<<<<<< HEAD
        <body className="font-sans antialiased">
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
=======
        <body className="font-sans antialiased">{children}</body>
>>>>>>> 76df268f140c42b3ed568b23b9320dc9753e37f2
      </html>
    </ClerkProvider>
  );
}
