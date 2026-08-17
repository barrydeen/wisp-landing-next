import { clsx } from "clsx";

type Tone = "info" | "warn" | "tip";

interface CalloutProps {
  tone?: Tone;
  title?: string;
  children: React.ReactNode;
}

const tones: Record<Tone, string> = {
  info: "border-cyan/40 bg-cyan/5",
  warn: "border-yellow/40 bg-yellow/5",
  tip: "border-mint/40 bg-mint/5",
};

const titles: Record<Tone, string> = {
  info: "text-cyan",
  warn: "text-yellow",
  tip: "text-mint",
};

const defaultTitles: Record<Tone, string> = {
  info: "Note",
  warn: "Heads up",
  tip: "Tip",
};

export function Callout({ tone = "info", title, children }: CalloutProps) {
  return (
    <div className={clsx("my-6 rounded-2xl border p-5", tones[tone])}>
      <p
        className={clsx(
          "mb-2 font-display text-sm font-semibold uppercase tracking-wide",
          titles[tone],
        )}
      >
        {title ?? defaultTitles[tone]}
      </p>
      <div className="text-[15px] leading-relaxed text-[#c9c3d9] [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
