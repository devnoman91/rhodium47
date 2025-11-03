import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import PasswordProtection from "@/components/PasswordProtection";
import AnnouncementBar from "@/components/AnnouncementBar";

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

// Optimized font loading - only load weights actually used in the app
const helveticaNeue = localFont({
  src: [
    {
      path: "../font/HelveticaNeueRoman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/HelveticaNeueMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../font/HelveticaNeueBold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-helvetica-neue",
  display: "swap",
  preload: true,
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
});

export const metadata: Metadata = {
  title: "Luxury Armored Vehicles | Rhodium 45 Technologies",
  description: "Leader in luxury armored vehicles crafted with Rhodium metal. From bulletproof SUVs and sedans to fully customized hybrid electric models, we deliver unmatched safety, performance, and comfort for VIPs, executives, and families worldwide.",
  // Performance optimizations
  metadataBase: new URL('https://rhodium45.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Rhodium 45 Technologies',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Critical resource hints for performance */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        {/* Optimize font rendering for LCP */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'helveticaNeue-critical';
                font-weight: 500;
                font-display: optional;
                src: local('Arial'), local('Helvetica');
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${helveticaNeue.variable}`}
        suppressHydrationWarning
      >
        <AnnouncementBar />
        <Navbar />
         {children}
        <Footer />
      </body>
    </html>
  );
}
