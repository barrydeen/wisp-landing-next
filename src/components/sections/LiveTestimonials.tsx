import { testimonials } from "@/lib/testimonials";
import { FadeIn } from "@/components/effects/FadeIn";
import { ExternalLink } from "lucide-react";
import { clsx } from "clsx";

const accents = [
  "from-pink/20 to-transparent border-pink/25",
  "from-violet/20 to-transparent border-violet/25",
  "from-cyan/20 to-transparent border-cyan/25",
  "from-yellow/20 to-transparent border-yellow/25",
  "from-accent/20 to-transparent border-accent/25",
  "from-mint/20 to-transparent border-mint/25",
];

const tilts = [-1, 1.2, -0.8, 0.6, -1.4, 0.9, -0.4, 1.6];

function cleanContent(content: string): string {
  return content
    .replace(/nostr:nprofile[a-z0-9]+/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function LiveTestimonials() {
  return (
    <section id="love" className="relative overflow-hidden px-6 py-24 md:py-32">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[60vh] w-[60vh] -translate-x-1/2 spotlight-violet" />

      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-14 text-center">
            <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.25em] text-[#9d95b3]">
              From the people already on it
            </p>
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-white">
              Don&apos;t just take{" "}
              <span className="gradient-text">our word</span> for it.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] text-[#9d95b3]">
              Every quote is a real, verifiable post from someone actually using Wisp.
            </p>
          </div>
        </FadeIn>

        <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.eventId} delay={i * 40} className="mb-5 break-inside-avoid">
              <a
                href={`https://njump.me/${t.nevent}`}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  "group block rounded-3xl border bg-gradient-to-br from-[#17141f] via-[#17141f] to-[#0f0d14] p-6 tilt-card",
                  "hover:border-opacity-60"
                )}
                style={{
                  transform: `rotate(${tilts[i % tilts.length]}deg)`,
                }}
              >
                <div
                  className={clsx(
                    "mb-4 -mx-6 -mt-6 rounded-t-3xl bg-gradient-to-br px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#c9c3d9]",
                    accents[i % accents.length].split(" ").slice(0, 2).join(" ")
                  )}
                >
                  A real post on Wisp
                </div>

                <p className="mb-5 text-[15px] leading-[1.7] text-[#e9e3fb]">
                  &ldquo;{cleanContent(t.content)}&rdquo;
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.author.picture}
                      alt={t.author.displayName}
                      loading="lazy"
                      className="h-8 w-8 rounded-full border border-[#322944] object-cover"
                    />
                    <span className="text-xs font-semibold text-[#c9c3d9]">
                      {t.author.displayName}
                    </span>
                  </div>
                  <ExternalLink
                    size={14}
                    className="text-[#6b647c] transition-colors group-hover:text-white"
                  />
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
