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
  title: "Shahin Ahmed — Senior Frontend Developer",
  description:
    "Senior Frontend Developer from Bangladesh with 3+ years of experience building scalable web applications with React, Next.js, and Tailwind CSS.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-black text-slate-200">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
