import { testimonials } from "@/lib/testimonials";
import { FadeIn } from "@/components/effects/FadeIn";
import { ExternalLink } from "lucide-react";

function cleanContent(content: string): string {
  return content
    .replace(/nostr:nprofile[a-z0-9]+/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#080808] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="mb-4">
            <div className="accent-bar" />
          </div>
          <p className="mb-3 text-[10px] font-medium tracking-[0.25em] text-[#f97316]/70 uppercase">
            From the network
          </p>
          <h2 className="mb-4 max-w-lg text-[clamp(1.75rem,5vw,3rem)] font-semibold leading-[1.15] tracking-tight text-[#e8e8e8]">
            Don&apos;t take our word for it.
          </h2>
          <p className="mb-14 max-w-md text-base text-[#555]">
            Every quote is a real Nostr note — verifiable, uncensorable, and
            permanently on the network.
          </p>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.eventId} delay={i * 50}>
              <a
                href={`https://njump.me/${t.nevent}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between rounded-2xl border border-[#111] bg-[#050505] p-5 transition-all duration-300 hover:border-[#1a1a1a]"
              >
                <p className="mb-5 text-[15px] leading-[1.7] text-[#888]">
                  &ldquo;{cleanContent(t.content)}&rdquo;
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.author.picture}
                      alt={t.author.displayName}
                      loading="lazy"
                      className="h-7 w-7 rounded-full object-cover"
                    />
                    <span className="text-xs font-medium text-[#666]">
                      {t.author.displayName}
                    </span>
                  </div>
                  <ExternalLink
                    size={12}
                    className="text-[#222] transition-colors group-hover:text-[#555]"
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
