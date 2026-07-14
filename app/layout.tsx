import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const TITLE = "Shahin Ahmed — Full-Stack Developer";
const DESCRIPTION =
  "Shahin Ahmed is a Full-Stack Developer based in Dhaka with 3+ years of experience building end-to-end, scalable and secure web and mobile products with React, Next.js, Node.js and Supabase.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "en_US",
    siteName: "Shahin Ahmed",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#fafafa",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} antialiased`}
      style={{ colorScheme: "light" }}
    >
      <body className="bg-paper text-ink font-body">{children}</body>
    </html>
  );
}
