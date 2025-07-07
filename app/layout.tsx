import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SafeBites - Your Trusted Food Safety Companion",
  description:
    "Analyze food items and detect allergens to make informed food choices safely",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetBrainsMono.variable} antialiased flex flex-col items-center justify-center min-h-screen w-full`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
