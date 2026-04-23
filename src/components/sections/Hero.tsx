import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/effects/FadeIn";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { GooglePlayIcon, AndroidIcon } from "@/components/ui/BrandIcons";

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.wisp.app";
const GITHUB_RELEASES_URL = "https://github.com/barrydeen/wisp/releases/latest";

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden px-6 pb-20 pt-28 md:pt-32">
      {/* Ambient color blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="spotlight-pink absolute -left-[10%] top-[10%] h-[55vh] w-[55vh] animate-blob-drift" />
        <div
          className="spotlight-orange absolute -right-[5%] top-[25%] h-[60vh] w-[60vh] animate-blob-drift"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="spotlight-violet absolute bottom-[-10%] left-[20%] h-[45vh] w-[45vh] animate-blob-drift"
          style={{ animationDelay: "-12s" }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div className="text-center lg:text-left">
          <FadeIn delay={60}>
            <h1 className="mb-6 font-display text-[clamp(2.75rem,8vw,5.75rem)] font-bold leading-[0.98] tracking-tight text-white">
              Social that&apos;s{" "}
              <span className="gradient-text">actually fun</span> again.
            </h1>
          </FadeIn>

          <FadeIn delay={150}>
            <p className="mx-auto mb-9 max-w-xl text-lg leading-relaxed text-[#c9c3d9] md:text-xl lg:mx-0">
              Hang with your group chat, follow the creators you love, drop into
              rooms, and send money as easily as a like —{" "}
              <span className="text-white">all in one app.</span>
            </p>
          </FadeIn>

          <FadeIn delay={240}>
            <div className="mb-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
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
                href={GITHUB_RELEASES_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
              >
                <AndroidIcon size={18} />
                Download APK
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={360}>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#6b647c] lg:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-pink" />
                No ads
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-violet" />
                No algorithm
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                Open source
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
                Free forever
              </span>
            </div>
          </FadeIn>
        </div>

        {/* Hero phone cluster */}
        <FadeIn delay={200} className="relative hidden lg:block">
          <div className="relative mx-auto flex h-[600px] w-full max-w-md items-center justify-center">
            <div className="absolute left-0 top-10">
              <PhoneMockup
                src="/chat.jpg"
                alt="Wisp chat rooms"
                accent="violet"
                tilt={-8}
              />
            </div>
            <div className="absolute right-0 top-24 z-10">
              <PhoneMockup
                src="/wallet.jpg"
                alt="Wisp built-in wallet"
                accent="yellow"
                tilt={6}
              />
            </div>
            <div className="relative z-20">
              <PhoneMockup
                src="/home.jpg"
                alt="Welcome to Wisp"
                accent="pink"
                tilt={-2}
              />
            </div>
          </div>
        </FadeIn>

        {/* Mobile phone */}
        <FadeIn delay={300} className="lg:hidden">
          <div className="flex justify-center">
            <PhoneMockup
              src="/home.jpg"
              alt="Welcome to Wisp"
              accent="pink"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
