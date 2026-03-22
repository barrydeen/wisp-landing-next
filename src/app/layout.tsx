import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wisp.mobile"),
  title: "Wisp — The Nostr Client for Android | Open Source, No Ads, No Algorithms",
  description:
    "Wisp is a free, open-source Nostr client for Android. Own your identity with cryptographic keys, send zaps instantly, browse custom feeds, and escape algorithmic manipulation. No ads, no tracking, no censorship. Built on the Nostr protocol.",
  keywords: [
    "nostr",
    "nostr client",
    "nostr android",
    "nostr app",
    "nostr mobile",
    "wisp",
    "wisp nostr",
    "decentralized social media",
    "open source social media",
    "zaps",
    "lightning zaps",
    "nostr zaps",
    "NIP-01",
    "NIP-17",
    "nostr wallet connect",
    "NWC",
    "nostr relay",
    "relay feeds",
    "outbox model",
    "nostr search",
    "trending nostr",
    "nostr DMs",
    "encrypted messages nostr",
    "nostr protocol",
    "censorship resistant",
    "no algorithm social media",
    "ad free social media",
    "privacy social media",
    "open protocol",
    "npub",
    "nsec",
    "nostr keys",
    "nostr identity",
    "android nostr client",
  ],
  authors: [{ name: "Barry Deen" }],
  creator: "Barry Deen",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Wisp — The Nostr Client for Android",
    description:
      "Own your identity. Control your feed. Send money instantly. Wisp is a free, open-source Android client for the Nostr protocol — no ads, no algorithms, no censorship.",
    url: "https://wisp.mobile",
    siteName: "Wisp",
    locale: "en_US",
    images: [
      {
        url: "https://wisp.mobile/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Wisp — The Nostr Client for Android. Reject Corporate Media.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wisp — The Nostr Client for Android",
    description:
      "Own your identity. Control your feed. No ads, no algorithms. A free, open-source Nostr client built for Android.",
    images: ["https://wisp.mobile/og-banner.jpg"],
  },
  alternates: {
    canonical: "https://wisp.mobile",
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
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full bg-background text-[#f0f0f0] antialiased">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
