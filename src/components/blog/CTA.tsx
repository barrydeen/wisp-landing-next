import { clsx } from "clsx";
import { GooglePlayIcon } from "@/components/ui/BrandIcons";
import { GITHUB_RELEASES_URL, GOOGLE_PLAY_URL, ZAPSTORE_URL } from "@/lib/site";

type Variant = "download" | "compact";

interface CTAProps {
  variant?: Variant;
  /** Overrides the default headline — lets a post tie the CTA to its topic. */
  heading?: string;
  body?: string;
  className?: string;
}

const containers: Record<Variant, string> = {
  download:
    "my-10 rounded-[28px] border border-[#322944] bg-[#17141f] p-8 text-center",
  compact:
    "my-8 rounded-2xl border border-[#261f36] bg-[#17141f]/60 p-6 text-center",
};

const headings: Record<Variant, string> = {
  download: "font-display text-2xl font-bold tracking-tight text-white",
  compact: "font-display text-lg font-semibold tracking-tight text-white",
};

export function CTA({
  variant = "download",
  heading = "Get Wisp free",
  body = "Your group chat, your favorite creators, your money — in one app.",
  className,
}: CTAProps) {
  return (
    <aside className={clsx(containers[variant], className)}>
      <h2 className={headings[variant]}>{heading}</h2>
      <p className="mx-auto mt-2 max-w-md text-[15px] text-[#9d95b3]">{body}</p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <a
          href={GOOGLE_PLAY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink via-accent to-yellow px-6 py-3 text-[15px] font-semibold text-[#0f0d14] shadow-[0_10px_30px_-10px_rgba(255,122,26,0.55)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          <GooglePlayIcon size={16} />
          Google Play
        </a>
        <a
          href={ZAPSTORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[#322944] bg-[#1f1b2b] px-6 py-3 text-[15px] font-semibold text-[#f5f1ff] transition-colors hover:border-[#4a3d66] hover:bg-[#261f36]"
        >
          Zapstore
        </a>
        <a
          href={GITHUB_RELEASES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[15px] font-semibold text-[#9d95b3] transition-colors hover:text-white"
        >
          APK
        </a>
      </div>
    </aside>
  );
}
