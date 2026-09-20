import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk, Sora } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
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
    <html
      lang="en"
      className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${sora.variable}`}
    >
      <body className="min-h-screen flex flex-col font-sora selection:bg-coral/30">
        {children}
      </body>
    </html>
  );
}
