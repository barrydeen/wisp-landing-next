import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wisp.mobile"),
  title: "Wisp — Social that's actually fun again",
  description:
    "Hang with your group chat, follow creators you love, and send money as easily as a like — all in one app. Wisp is a fun, free social app for Android.",
  keywords: [
    "wisp",
    "wisp app",
    "wisp mobile",
    "social app",
    "fun social app",
    "social media",
    "android social app",
    "group chat app",
    "chat rooms",
    "private messaging",
    "send money app",
    "peer to peer payments",
    "creator app",
    "video sharing",
    "photo sharing",
    "short video app",
    "no ads social",
    "no algorithm social",
    "own your feed",
    "open source social app",
    "decentralized social",
    "censorship resistant",
    "nostr",
    "nostr client",
    "lightning zaps",
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
    title: "Wisp — Social that's actually fun again",
    description:
      "Your group chat, your favorite creators, your money — in one app. Download Wisp free for Android.",
    url: "https://wisp.mobile",
    siteName: "Wisp",
    locale: "en_US",
    images: [
      {
        url: "https://wisp.mobile/wisp-og.webp",
        width: 1400,
        height: 788,
        type: "image/webp",
        alt: "Wisp — Social that's actually fun again.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wisp — Social that's actually fun again",
    description:
      "Your group chat, your favorite creators, your money — in one app. Free for Android.",
    images: ["https://wisp.mobile/wisp-og.webp"],
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
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-[#f5f1ff] antialiased">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
