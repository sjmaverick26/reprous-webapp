import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReproUs — Learn & Youth Reproductive Education",
  description: "Free, honest, judgment-free reproductive health education built for curious minds. No paywalls, no shame.",
  keywords: ["reproductive health", "education", "puberty", "menstrual cycle", "youth health", "workshops"],
  authors: [{ name: "ReproUs Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col font-sans selection:bg-yellow-deep/40">
        {children}
      </body>
    </html>
  );
}
