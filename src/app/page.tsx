import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/sections/Hero";
import { ExperiencesSection } from "@/components/sections/ExperiencesSection";
import { CreatorStrip } from "@/components/sections/CreatorStrip";
import { LiveTestimonials } from "@/components/sections/LiveTestimonials";
import { DecentralizationBonus } from "@/components/sections/DecentralizationBonus";
import { DownloadCTA } from "@/components/sections/DownloadCTA";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
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
