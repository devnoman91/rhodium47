import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import PasswordProtection from "@/components/PasswordProtection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const helveticaNeue = localFont({
  src: [
    {
      path: "../font/HelveticaNeueThin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../font/HelveticaNeueThinItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../font/HelveticaNeueUltraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../font/HelveticaNeueUltraLightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../font/HelveticaNeueLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../font/HelveticaNeueLightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../font/HelveticaNeueRoman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/HelveticaNeueItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../font/HelveticaNeueMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../font/HelveticaNeueMediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../font/HelveticaNeueBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../font/HelveticaNeueBoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../font/HelveticaNeueHeavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../font/HelveticaNeueHeavyItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../font/HelveticaNeueBlack.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../font/HelveticaNeueBlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-helvetica-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luxury Armored Vehicles | Rhodium 45 Technologies",
  description: "Leader in luxury armored vehicles crafted with Rhodium metal. From bulletproof SUVs and sedans to fully customized hybrid electric models, we deliver unmatched safety, performance, and comfort for VIPs, executives, and families worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${helveticaNeue.variable}`}
        suppressHydrationWarning={true}
      >
        
          <Navbar />
          {children}
          <Footer />
          {/* <PasswordProtection>
        </PasswordProtection> */}
      </body>
    </html>
  );
}
