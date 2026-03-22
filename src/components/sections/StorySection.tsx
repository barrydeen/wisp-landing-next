import { FadeIn } from "@/components/effects/FadeIn";
import type { StoryBeat } from "@/lib/story";

export function StorySection({
  section,
  index,
}: {
  section: StoryBeat;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <section
      id={section.id}
      className={`relative px-6 py-20 md:py-28 ${
        index % 3 === 1 ? "bg-[#080808]" : ""
      }`}
    >
      <div
        className={`mx-auto max-w-5xl ${
          isEven ? "" : "flex flex-col items-end text-right"
        }`}
      >
        {section.label && (
          <FadeIn>
            <div className={`mb-6 ${isEven ? "" : "flex justify-end"}`}>
              <div className="accent-bar" />
            </div>
            <p className="mb-4 text-[10px] font-medium tracking-[0.25em] text-[#f97316]/70 uppercase">
              {section.label}
            </p>
          </FadeIn>
        )}
        <FadeIn>
          <h2 className="mb-5 max-w-2xl text-[clamp(1.75rem,5vw,3rem)] font-semibold leading-[1.15] tracking-tight text-[#e8e8e8]">
            {section.headline}
          </h2>
        </FadeIn>
        <FadeIn delay={80}>
          <p className="max-w-lg text-base leading-[1.85] text-[#666] md:text-lg md:leading-[1.85]">
            {section.body}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
