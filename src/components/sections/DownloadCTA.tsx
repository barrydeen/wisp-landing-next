import { Github, Download, ArrowUpRight, Package } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/effects/FadeIn";

export function DownloadCTA() {
  return (
    <section className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="accent-bar mb-8" />
        </FadeIn>
        <FadeIn>
          <h2 className="mb-5 max-w-2xl text-[clamp(1.75rem,5vw,3rem)] font-semibold leading-[1.15] tracking-tight text-[#e8e8e8]">
            Ready to leave the machine behind?
          </h2>
        </FadeIn>
        <FadeIn delay={80}>
          <p className="mb-10 max-w-md text-base text-[#555] md:text-lg">
            Wisp is free, open source, and available now for Android.
          </p>
        </FadeIn>
        <FadeIn delay={160}>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              href="https://github.com/barrydeen/wisp/releases/download/v0.14.1-beta/app-release.apk"
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
            <Button
              href="https://github.com/barrydeen/wisp"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              <Github size={16} />
              GitHub
            </Button>
            <Button
              href="https://apps.obtainium.imranr.dev/redirect?r=obtainium://app/%7B%22id%22%3A%22com.wisp.app%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2Fbarrydeen%2Fwisp%22%2C%22author%22%3A%22barrydeen%22%2C%22name%22%3A%22Wisp%22%7D"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              <Package size={16} />
              Obtainium
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
