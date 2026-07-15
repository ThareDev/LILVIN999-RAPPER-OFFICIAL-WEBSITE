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

const BASE_URL = "https://lilvin999.com";

export const viewport: Viewport = {
  themeColor: "#080F14",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "LILVIN999 — Born to Music | Trap & Sri Lankan Rap Artist Official Site",
    template: "%s | LILVIN999",
  },
  description:
    "Official website of LILVIN999 — born to music, representing Anuradhapura, the Kingdom of Rivers and King City of Sri Lanka. Trap, hip hop, and Sri Lankan rap flow fused with raw storytelling. Stream new music, book shows, and follow the journey.",

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
    "LILVIN999 born to music",
    "born to music LILVIN999",
    "LILVIN999 biography",
    "LILVIN999 interview",
    "LILVIN999 lyrics",
    "who is LILVIN999",

    // ── Origin / location signals — Anuradhapura / King City
    "Anuradhapura rapper",
    "Anuradhapura hip hop",
    "Anuradhapura music artist",
    "rapper from Anuradhapura",
    "Kingdom of Rivers rapper",
    "King City rapper Sri Lanka",
    "Anuradhapura ancient city rapper",
    "Sri Lanka rap capital",
    "Sri Lanka music artist",
    "Sri Lankan music 2026",
    "Sri Lanka underground music scene",

    // ── Song titles (actual tracks)
    "CLOSE Lilvin999",
    "CLOSE Lilvin999 Clessoff Remix",
    "PORO PAARA Lilvin999",
    "ALUGOZU Lilvin999",
    "ALUGOZU Zana Beatz",
    "LEAN Lilvin999",
    "MONARU Lilvin999",
    "Loyalty Over Everything album",
    "No Trust St album",
    "Raw Debut album Lilvin999",
    "Lilvin999 discography",
    "Lilvin999 latest tracks",

    // ── Collaborators / features
    "Clessoff rapper",
    "Zana Beatz producer",
    "Sri Lanka rap collaborations",
    "Sri Lanka rap producers",

    // ── Genre / sound — trap, hip hop, rap flow focus
    "Sri Lanka trap music",
    "trap music Sri Lanka",
    "Sri Lanka hip hop",
    "Sri Lankan hip hop artist",
    "Sri Lankan rapper",
    "Sri Lanka rap music",
    "Sri Lankan rap flow",
    "rap flow killer Sri Lanka",
    "Sinhala rap",
    "Sinhala hip hop",
    "Sinhala trap music",
    "street rap Sri Lanka",
    "drill Sri Lanka",
    "underground rap Sri Lanka",
    "new wave rap Sri Lanka",
    "melodic trap Sri Lanka",
    "South Asian rap",
    "South Asian trap music",
    "Asian hip hop artist",

    // ── Intent / action keywords
    "book Sri Lankan rapper",
    "hire rapper Sri Lanka",
    "Sri Lanka rapper booking",
    "Sri Lankan rapper for events",
    "Sri Lanka live rap performance",
    "rap collaboration Sri Lanka",
    "rap press inquiry Sri Lanka",
    "Sri Lanka rapper contact",
    "Sri Lanka rapper management",

    // ── Live shows / tour
    "LILVIN999 tour dates",
    "LILVIN999 concert",
    "LILVIN999 tickets",
    "Beheth concert Colombo",
    "Port City Colombo concert",
    "Sri Lanka rap concert 2026",
    "Sri Lanka hip hop live show",

    // ── Discovery / streaming
    "LILVIN999 Spotify",
    "LILVIN999 YouTube",
    "LILVIN999 TikTok",
    "LILVIN999 Instagram",
    "stream Sri Lanka trap music",
    "stream Sri Lanka rap",
    "new Sri Lankan music",
    "best Sri Lankan rapper",
    "top rapper Sri Lanka",
    "rising rapper Sri Lanka",
    "Sri Lanka rap 2026",
    "Sinhala music 2026",
    "trust nobody fear none",
    "loyalty over everything rap",
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
    title: "LILVIN999 — Born to Music. Representing the Kingdom of Rivers.",
    description:
      "Trust nobody, fear none. Trap, hip hop, and Sri Lankan rap flow from Anuradhapura — the Kingdom of Rivers and King City of Sri Lanka. Stream music, book shows, and follow the journey of LILVIN999.",
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
    title: "LILVIN999 — Born to Music.",
    description:
      "Official site of LILVIN999. Trap, hip hop & Sri Lankan rap flow, representing Anuradhapura, the King City of Sri Lanka. Loyalty over everything.",
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