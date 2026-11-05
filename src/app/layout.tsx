import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://reprous.vercel.app";
const SITE_TITLE = "ReproUs — Learn & Youth Reproductive Education";
const SITE_DESCRIPTION =
  "Accessible health education focused on reproductive health, female athlete health, and under-recognized conditions like PCOS and endometriosis.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: ["reproductive health", "education", "puberty", "menstrual cycle", "youth health", "female athlete triad", "PCOS", "endometriosis", "self-advocacy"],
  authors: [{ name: "ReproUs Team" }],
  openGraph: {
    type: "website",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "ReproUs",
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#175B5C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col font-sans selection:bg-yellow-deep/40">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-raspberry focus:px-5 focus:py-3 focus:text-base focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-deep-teal focus:ring-offset-2"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
