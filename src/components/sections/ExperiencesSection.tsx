import { experiences } from "@/lib/experiences";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { FadeIn } from "@/components/effects/FadeIn";
import { Check } from "lucide-react";
import { clsx } from "clsx";

const accentText: Record<string, string> = {
  pink: "text-pink",
  violet: "text-violet",
  cyan: "text-cyan",
  yellow: "text-yellow",
  orange: "text-accent",
  mint: "text-mint",
};

const accentBorder: Record<string, string> = {
  pink: "border-pink/30",
  violet: "border-violet/30",
  cyan: "border-cyan/30",
  yellow: "border-yellow/30",
  orange: "border-accent/30",
  mint: "border-mint/30",
};

const accentBg: Record<string, string> = {
  pink: "bg-pink/10",
  violet: "bg-violet/10",
  cyan: "bg-cyan/10",
  yellow: "bg-yellow/10",
  orange: "bg-accent/10",
  mint: "bg-mint/10",
};

export function ExperiencesSection() {
  return (
    <section id="what-you-get" className="relative overflow-hidden px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-20 text-center">
            <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.25em] text-[#9d95b3]">
              What you get
            </p>
            <h2 className="mx-auto max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-white">
              Everything you actually use social apps for.{" "}
              <span className="gradient-text-cool">In one place.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-28 md:gap-36">
          {experiences.map((exp, i) => {
            const isEven = i % 2 === 0;
            const tilt = isEven ? -3 : 3;
            return (
              <div
                key={exp.id}
                className={clsx(
                  "grid items-center gap-12 md:grid-cols-2 md:gap-16",
                  !isEven && "md:[&>*:first-child]:order-2"
                )}
              >
                <FadeIn>
                  <div>
                    <div
                      className={clsx(
                        "mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider",
                        accentBorder[exp.accent],
                        accentBg[exp.accent],
                        accentText[exp.accent]
                      )}
                    >
                      <span className={clsx("h-1.5 w-1.5 rounded-full", accentBg[exp.accent].replace("/10", ""))} />
                      {exp.eyebrow}
                    </div>
                    <h3 className="mb-5 font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold leading-[1.1] tracking-tight text-white">
                      {exp.title}
                    </h3>
                    <p className="mb-6 max-w-lg text-[17px] leading-relaxed text-[#c9c3d9]">
                      {exp.body}
                    </p>
                    <ul className="space-y-2.5">
                      {exp.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 text-[15px] text-[#9d95b3]"
                        >
                          <span
                            className={clsx(
                              "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
                              accentBg[exp.accent]
                            )}
                          >
                            <Check
                              size={12}
                              strokeWidth={3}
                              className={accentText[exp.accent]}
                            />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>

                <FadeIn delay={120}>
                  <div className="flex justify-center">
                    <PhoneMockup
                      src={exp.image}
                      alt={exp.alt}
                      label={exp.label}
                      accent={exp.accent}
                      tilt={tilt}
                    />
                  </div>
                </FadeIn>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
