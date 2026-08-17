import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteGraph } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// No `weight` arrays: both are variable fonts, so listing weights forced nine
// separate static font files, all preloaded and competing for bandwidth with
// the LCP paint. Omitting it yields one variable file per family with every
// weight still available.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // A template + default, so child routes set only their own title. It does
  // not apply to this segment, so the homepage still renders `default` as-is.
  title: {
    default: "Wisp — Social that's actually fun again",
    template: "%s — Wisp",
  },
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
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  // NOTE: no `url` here and no `alternates` below. Metadata merging is shallow —
  // a key a child route does not set is inherited verbatim — so a canonical or
  // og:url declared at the root would make every child page claim to be the
  // homepage. Each route declares its own; scripts/check-canonicals.mjs enforces it.
  openGraph: {
    title: "Wisp — Social that's actually fun again",
    description:
      "Your group chat, your favorite creators, your money — in one app. Download Wisp free for Android.",
    siteName: SITE_NAME,
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Makes Google eligible to show a large thumbnail beside the result on
      // mobile and in Discover — the one robots directive with real CTR value.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
        <JsonLd data={siteGraph()} />
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
