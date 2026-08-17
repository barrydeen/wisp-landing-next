import type { PostFaq } from "@/types/blog";

interface FaqSectionProps {
  faq: PostFaq[];
}

/** The visible counterpart to the FAQPage JSON-LD. Structured data must
 *  correspond to content the reader can actually see. */
export function FaqSection({ faq }: FaqSectionProps) {
  if (faq.length === 0) return null;

  return (
    <section className="mt-14 border-t border-[#261f36] pt-10">
      {/* id matches the synthetic TOC entry the build script appends, so the
          FAQ is reachable from the table of contents like any other section. */}
      <h2
        id="frequently-asked-questions"
        className="mb-6 scroll-mt-24 font-display text-2xl font-semibold tracking-tight text-white"
      >
        Frequently asked questions
      </h2>
      <dl className="space-y-4">
        {faq.map((entry) => (
          <div
            key={entry.q}
            className="rounded-2xl border border-[#261f36] bg-[#17141f] p-5"
          >
            <dt className="font-display font-semibold text-white">{entry.q}</dt>
            <dd className="mt-2 text-[15px] leading-relaxed text-[#c9c3d9]">
              {entry.a}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
