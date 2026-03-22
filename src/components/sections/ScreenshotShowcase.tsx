import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { FadeIn } from "@/components/effects/FadeIn";

const screenshots = [
  {
    label: "Feed View",
    title: "Your Timeline, Your Way",
    description:
      "A clean, fast-loading feed that keeps you connected to the people and topics you care about.",
  },
  {
    label: "Search",
    title: "Advanced Search",
    description:
      "Search notes, people, and topics across the entire Nostr network. Find anything, instantly.",
  },
  {
    label: "Wallet",
    title: "Built-in Lightning Wallet",
    description:
      "Send and receive sats without ever leaving the app. No external wallet setup, no friction.",
  },
  {
    label: "Zaps",
    title: "Zaps That Slap",
    description:
      "Satisfying sounds, smooth animations, and instant feedback. Sending sats has never felt this good.",
  },
  {
    label: "Trending",
    title: "Trending Notes & Topics",
    description:
      "Stay on top of what the network is talking about. Trending notes, people, and hashtags in real time.",
  },
  {
    label: "DMs",
    title: "Private Messages",
    description:
      "NIP-17 encrypted direct messages. Private conversations that stay private.",
  },
  {
    label: "Custom Feeds",
    title: "Generate Any Feed",
    description:
      "Create custom feeds filtered by topic, relay, author, or content type. Nostr, your way.",
  },
  {
    label: "Relay Browser",
    title: "Explore Relays",
    description:
      "Browse notes by relay to discover communities and see what's happening in different corners of the network.",
  },
];

export function ScreenshotShowcase() {
  return (
    <section id="screenshots" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              See it in action
            </h2>
            <p className="mx-auto max-w-2xl text-[#888]">
              Every screen designed with intention. Fast, clean, and focused on what matters.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-24 md:space-y-32">
          {screenshots.map((item, i) => (
            <FadeIn key={item.label} delay={100}>
              <div
                className={`flex flex-col items-center gap-10 md:gap-16 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <PhoneMockup label={item.label} className="w-[240px] md:w-[260px]" />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="mb-3 text-2xl font-bold">{item.title}</h3>
                  <p className="max-w-md text-[#888] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
