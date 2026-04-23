import Image from "next/image";
import { clsx } from "clsx";

type Accent = "pink" | "violet" | "cyan" | "yellow" | "orange" | "mint";

interface PhoneMockupProps {
  src?: string;
  alt?: string;
  label?: string;
  accent?: Accent;
  tilt?: number;
  className?: string;
  children?: React.ReactNode;
  float?: boolean;
}

const accentGradients: Record<Accent, string> = {
  pink: "from-[#ff4d8f]/30 via-[#ff7a1a]/10 to-transparent",
  violet: "from-[#9b7bff]/30 via-[#ff4d8f]/10 to-transparent",
  cyan: "from-[#4dd8ff]/30 via-[#9b7bff]/10 to-transparent",
  yellow: "from-[#ffd84d]/30 via-[#ff7a1a]/10 to-transparent",
  orange: "from-[#ff7a1a]/30 via-[#ffd84d]/10 to-transparent",
  mint: "from-[#4cf2a8]/30 via-[#4dd8ff]/10 to-transparent",
};

const accentDot: Record<Accent, string> = {
  pink: "bg-pink",
  violet: "bg-violet",
  cyan: "bg-cyan",
  yellow: "bg-yellow",
  orange: "bg-accent",
  mint: "bg-mint",
};

export function PhoneMockup({
  src,
  alt,
  label,
  accent = "pink",
  tilt = 0,
  className,
  children,
  float = true,
}: PhoneMockupProps) {
  return (
    <div
      className={clsx(
        "relative mx-auto w-[250px] shrink-0 sm:w-[272px]",
        float && "animate-phone-hover",
        className
      )}
      style={
        {
          ["--phone-tilt" as string]: `${tilt}deg`,
          transform: `rotate(${tilt}deg)`,
        } as React.CSSProperties
      }
    >
      {/* soft glow behind phone */}
      <div
        className={clsx(
          "pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br blur-2xl",
          accentGradients[accent]
        )}
      />

      {/* Phone frame */}
      <div className="relative overflow-hidden rounded-[2.25rem] border-[3px] border-[#322944] bg-[#0b0910] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.03)_inset]">
        {/* Notch */}
        <div className="absolute left-1/2 top-1.5 z-10 h-5 w-[38%] -translate-x-1/2 rounded-full bg-[#0b0910]" />

        {/* Screen */}
        <div className="relative aspect-[10/20.5] w-full overflow-hidden rounded-[1.85rem] bg-[#0b0910]">
          {src ? (
            <Image
              src={src}
              alt={alt || label || "App screenshot"}
              fill
              sizes="(min-width: 640px) 272px, 250px"
              className="object-contain"
              priority={false}
            />
          ) : children ? (
            children
          ) : (
            <div
              className={clsx(
                "relative flex h-full flex-col items-center justify-end gap-3 bg-gradient-to-br p-6 pb-10 text-center",
                accentGradients[accent]
              )}
            >
              {/* faux status bar */}
              <div className="absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-1 text-[9px] font-semibold text-[#f5f1ff]/50">
                <span>9:41</span>
              </div>

              {/* soft blob */}
              <div
                className={clsx(
                  "absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-2xl",
                  accentDot[accent]
                )}
              />

              <div
                className={clsx(
                  "relative h-3 w-3 rounded-full",
                  accentDot[accent]
                )}
              />
              {label && (
                <div className="relative">
                  <p className="font-display text-xl font-semibold text-[#f5f1ff]">
                    {label}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#9d95b3]">
                    screenshot soon
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
