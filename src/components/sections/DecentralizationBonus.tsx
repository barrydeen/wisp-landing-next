import { FadeIn } from "@/components/effects/FadeIn";
import { Key, Shuffle, Crown, Globe } from "lucide-react";

const cards = [
  {
    Icon: Key,
    title: "You own your account",
    body: "No email, no phone — just a cryptographic key only you hold. Nobody can lock you out, ban you, or delete you.",
    color: "pink",
  },
  {
    Icon: Shuffle,
    title: "Take it to any Nostr app",
    body: "Your account, posts, and follows work in every Nostr client. Switch apps whenever you want — your stuff comes with you.",
    color: "violet",
  },
  {
    Icon: Crown,
    title: "No CEO to manipulate it",
    body: "Nostr is a protocol, not a company. No one can flip a switch, change the rules, or decide what you see or who you can talk to.",
    color: "yellow",
  },
  {
    Icon: Globe,
    title: "No government can shut it down",
    body: "The network runs across thousands of independent relays worldwide. There's no single point to turn off — not by us, not by anyone.",
    color: "cyan",
  },
] as const;

const colorMap: Record<string, { bg: string; text: string; border: string; grad: string }> = {
  pink: {
    bg: "bg-pink/10",
    text: "text-pink",
    border: "border-pink/25",
    grad: "from-pink/25 to-transparent",
  },
  yellow: {
    bg: "bg-yellow/10",
    text: "text-yellow",
    border: "border-yellow/25",
    grad: "from-yellow/20 to-transparent",
  },
  cyan: {
    bg: "bg-cyan/10",
    text: "text-cyan",
    border: "border-cyan/25",
    grad: "from-cyan/20 to-transparent",
  },
  violet: {
    bg: "bg-violet/10",
    text: "text-violet",
    border: "border-violet/25",
    grad: "from-violet/20 to-transparent",
  },
};

export function DecentralizationBonus() {
  return (
    <section id="bonus" className="relative overflow-hidden px-6 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="spotlight-cyan absolute -right-[10%] top-[20%] h-[45vh] w-[45vh]" />
        <div className="spotlight-pink absolute -left-[5%] bottom-[10%] h-[40vh] w-[40vh]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-14 text-center">
            <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.25em] text-[#9d95b3]">
              Built on Nostr
            </p>
            <h2 className="mx-auto max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-white">
              You own{" "}
              <span className="gradient-text-cool">every bit of it.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-[#c9c3d9]">
              Wisp runs on{" "}
              <a
                href="https://nostr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline decoration-accent/60 decoration-2 underline-offset-4 hover:decoration-accent"
              >
                Nostr
              </a>{" "}
              — an open protocol, not a company. Your account, posts, and friends
              belong to you, and they work in any Nostr app you want. No CEO can
              change the rules. No government can shut it down.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ Icon, title, body, color }, i) => {
            const c = colorMap[color];
            return (
              <FadeIn key={title} delay={i * 60}>
                <div
                  className={`group h-full rounded-3xl border ${c.border} bg-gradient-to-br ${c.grad} p-6 tilt-card`}
                >
                  <div
                    className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl ${c.bg} ${c.text}`}
                  >
                    <Icon size={20} strokeWidth={2.2} />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold text-white">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#9d95b3]">
                    {body}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}
