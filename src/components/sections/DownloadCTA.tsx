import { Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/effects/FadeIn";
import { GooglePlayIcon } from "@/components/ui/BrandIcons";

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.wisp.app";
const ZAPSTORE_URL = "https://zapstore.dev/apps/com.wisp.app";
const GITHUB_RELEASES_URL = "https://github.com/barrydeen/wisp/releases/latest";

export function DownloadCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-32">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-[#322944] bg-[linear-gradient(135deg,#1a0d1f_0%,#0f0d14_40%,#1a0d1f_100%)] px-8 py-16 text-center shadow-[0_40px_100px_-20px_rgba(255,77,143,0.25)] md:px-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="spotlight-pink absolute -left-[10%] top-0 h-[60vh] w-[60vh]" />
          <div className="spotlight-orange absolute -right-[10%] bottom-0 h-[60vh] w-[60vh]" />
        </div>

        <FadeIn>
          <h2 className="relative z-10 mx-auto mb-5 max-w-3xl font-display text-[clamp(2rem,6vw,4rem)] font-bold leading-[1.02] tracking-tight text-white">
            Come hang out.
          </h2>
        </FadeIn>
        <FadeIn delay={80}>
          <p className="relative z-10 mx-auto mb-10 max-w-md text-lg text-[#c9c3d9]">
            Wisp is free, open-source, and ready to go. Install and you&apos;re in.
          </p>
        </FadeIn>

        <FadeIn delay={160}>
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
            <Button
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
            >
              <GooglePlayIcon size={18} />
              Get it on Google Play
            </Button>
            <Button
              href={ZAPSTORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
            >
              <ArrowUpRight size={16} />
              Zapstore
            </Button>
            <Button
              href={GITHUB_RELEASES_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="lg"
            >
              <Github size={16} />
              APK on GitHub
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
