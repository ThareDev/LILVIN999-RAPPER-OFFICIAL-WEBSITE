import { ThemeModeScript } from "flowbite-react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeInit } from "../.flowbite-react/init";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://lilvin999.com"; // 🔁 Replace with your actual domain

export const viewport: Viewport = {
  themeColor: "#2E4A3D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "LILVIN999 — Sri Lanka's Hardest Rapper | Official Site",
    template: "%s | LILVIN999",
  },
  description:
    "Official website of LILVIN999 — Sri Lanka's loyalty-driven street rapper. Trap, melodic rap, and drill-influenced street rap fused with raw storytelling. Stream new music, book shows, and follow the journey.",

  keywords: [
    // ── Artist identity
    "LILVIN999",
    "LILVIN999 official",
    "LILVIN999 rapper",
    "LILVIN999 Sri Lanka",
    "LILVIN999 music",
    "LILVIN999 songs",
    "LILVIN999 new song",
    "LILVIN999 album",
    "LILVIN 999 rapper",

    // ── Song titles
    "Block Money",
    "No Trust St",
    "Hustle Hard Ave",
    "999 Anthem",
    "Receipts LILVIN999",
    "Loyalty Hook",
    "Fear None LILVIN999",

    // ── Genre / sound
    "Sri Lanka hip hop",
    "Sri Lankan rapper",
    "Sri Lanka rap music",
    "Sinhala rap",
    "Sinhala hip hop",
    "trap music Sri Lanka",
    "street rap Sri Lanka",
    "drill Sri Lanka",
    "underground rap Sri Lanka",
    "new wave rap Sri Lanka",
    "South Asian rap",
    "Asian hip hop artist",

    // ── Location signals
    "Sri Lanka music artist",
    "Sri Lankan music 2026",

    // ── Intent / action keywords
    "book Sri Lankan rapper",
    "hire rapper Sri Lanka",
    "Sri Lanka rapper booking",
    "Sri Lankan rapper for events",
    "Sri Lanka live rap performance",
    "rap collaboration Sri Lanka",
    "rap press inquiry Sri Lanka",

    // ── Discovery / streaming
    "LILVIN999 Spotify",
    "LILVIN999 YouTube",
    "LILVIN999 TikTok",
    "LILVIN999 Instagram",
    "stream Sri Lanka rap",
    "new Sri Lankan music",
    "best Sri Lankan rapper",
    "top rapper Sri Lanka",
    "rising rapper Sri Lanka",
    "Sri Lanka rap 2026",
    "Sinhala music 2026",
  ],

  authors: [{ name: "LILVIN999", url: BASE_URL }],
  creator: "LILVIN999",
  publisher: "LILVIN999 Official",

  category: "music",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "LILVIN999 Official",
    title: "LILVIN999 — Sri Lanka's Hardest Rapper",
    description:
      "Trust nobody, fear none. Trap, melodic rap, and street rap from Sri Lanka. Stream music, book shows, and follow the journey of LILVIN999.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LILVIN999 — Official",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "LILVIN999 — Sri Lanka's Hardest Rapper",
    description:
      "Official site of LILVIN999. Trap, melodic rap & street rap from Sri Lanka. Loyalty over everything.",
    images: ["/og-image.jpg"],
    creator: "@lilvin999",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },

  manifest: "/manifest.json",

  alternates: {
    canonical: BASE_URL,
  },

  verification: {
    // google: "your-google-site-verification-token",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeInit />
        {children}
      </body>
    </html>
  );
}