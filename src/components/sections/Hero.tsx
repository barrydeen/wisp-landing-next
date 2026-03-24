import { Download, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/effects/FadeIn";
import { ExternalLink } from "lucide-react";
import { testimonials } from "@/lib/testimonials";

const featuredEventIds = [
  "0000025c6560f9e27057d4d3a7c6cfce98f488d5fb84dfcb6cda260a276b140b",
  "000056e5dc7bc339bf788ff2d97fdc3a47c195c4d0bfde95b8f9d6ba5a25eafa",
];

export function Hero() {
  const featured = featuredEventIds
    .map((id) => testimonials.find((t) => t.eventId === id))
    .filter(Boolean);

  return (
    <section className="relative flex min-h-svh flex-col justify-end px-6 pb-16 pt-24 md:justify-center md:pb-24">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 top-0 h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.04)_0%,transparent_70%)]" />
        <div className="absolute -left-1/4 bottom-0 h-[50vh] w-[50vh] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl">
        <FadeIn>
          <div className="accent-bar mb-8" />
        </FadeIn>

        <FadeIn delay={50}>
          <h1 className="mb-6 max-w-4xl text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-[#e8e8e8]">
            Reject{" "}
            <span className="text-[#555] line-through decoration-[#ef4444] decoration-[3px]">
              Social
            </span>{" "}
            Corporate&nbsp;Media.
          </h1>
        </FadeIn>

        <FadeIn delay={150}>
          <p className="mb-10 max-w-md text-xl leading-relaxed text-[#777] md:text-2xl md:leading-relaxed">
            Social media is about people, not profits.
          </p>
        </FadeIn>

        <FadeIn delay={250}>
          <div className="mb-14 flex flex-wrap items-center gap-3">
            <Button
              href="https://github.com/barrydeen/wisp/releases/download/v0.13.1-beta/app-release.apk"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              <Download size={16} />
              Download Now
            </Button>
            <Button
              href="https://zapstore.dev/apps/com.wisp.app"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              <ArrowUpRight size={16} />
              Zapstore
            </Button>
          </div>
        </FadeIn>

        {/* Featured testimonials */}
        <FadeIn delay={400}>
          <div className="flex flex-col gap-4 sm:flex-row">
            {featured.map((t) => (
              <a
                key={t!.eventId}
                href={`https://njump.me/${t!.nevent}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex max-w-sm items-start gap-3 rounded-2xl border border-[#111] bg-[#080808] p-4 text-left transition-all duration-300 hover:border-[#1a1a1a]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t!.author.picture}
                  alt={t!.author.displayName}
                  className="mt-0.5 h-8 w-8 flex-shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="text-sm leading-relaxed text-[#888]">
                    &ldquo;{t!.content}&rdquo;
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="text-xs text-[#444]">
                      {t!.author.displayName}
                    </span>
                    <ExternalLink
                      size={10}
                      className="text-[#333] transition-colors group-hover:text-[#555]"
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
