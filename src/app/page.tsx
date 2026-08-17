import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { mobileApplicationGraph } from "@/lib/schema";
import { buildOpenGraph } from "@/lib/seo";
import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/sections/Hero";
import { ExperiencesSection } from "@/components/sections/ExperiencesSection";
import { CreatorStrip } from "@/components/sections/CreatorStrip";
import { LiveTestimonials } from "@/components/sections/LiveTestimonials";
import { DecentralizationBonus } from "@/components/sections/DecentralizationBonus";
import { DownloadCTA } from "@/components/sections/DownloadCTA";
import { Footer } from "@/components/layout/Footer";

// The homepage now declares the URL identity the root layout used to leak to
// every child route.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: buildOpenGraph({
    title: "Wisp — Social that's actually fun again",
    description:
      "Your group chat, your favorite creators, your money — in one app. Download Wisp free for Android.",
    path: "/",
  }),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={mobileApplicationGraph()} />
      <Nav />
      <main>
        <Hero />
        <ExperiencesSection />
        <CreatorStrip />
        <LiveTestimonials />
        <DecentralizationBonus />
        <DownloadCTA />
      </main>
      <Footer />
    </>
  );
}
