import type { Metadata } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReproUs — Learning Hub & Youth Reproductive Education",
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
    <html lang="en" className={`${fraunces.variable} ${nunitoSans.variable}`}>
      <body className="min-h-screen flex flex-col font-sans selection:bg-yellow-deep/40">
        {children}
      </body>
    </html>
  );
}
