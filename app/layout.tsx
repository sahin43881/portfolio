import type { Metadata, Viewport } from "next";
import { Syne, Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shahin Ahmed — Full-Stack Developer",
  description:
    "Full-Stack Developer from Bangladesh with 3+ years of experience building end-to-end, scalable, and secure web applications with React, Next.js, Node.js, and modern databases.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} h-full antialiased`}
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-700">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
