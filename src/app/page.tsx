import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/sections/Hero";
import { StorySection } from "@/components/sections/StorySection";
import { Testimonials } from "@/components/sections/Testimonials";
import { Community } from "@/components/sections/Community";
import { DownloadCTA } from "@/components/sections/DownloadCTA";
import { Footer } from "@/components/layout/Footer";
import { storyBeats } from "@/lib/story";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {storyBeats.map((beat, i) => (
          <StorySection key={beat.id} section={beat} index={i} />
        ))}
        <Testimonials />
        <Community />
        <DownloadCTA />
      </main>
      <Footer />
    </>
  );
}
