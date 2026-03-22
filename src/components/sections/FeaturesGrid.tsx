import { features } from "@/lib/features";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { FadeIn } from "@/components/effects/FadeIn";

export function FeaturesGrid() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need.{" "}
              <span className="text-[#888]">Nothing you don&apos;t.</span>
            </h2>
            <p className="mx-auto max-w-2xl text-[#888]">
              Wisp is packed with features that make Nostr feel effortless — from
              instant lightning payments to intelligent relay routing.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 50}>
              <FeatureCard feature={feature} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
