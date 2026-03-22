export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: "Search",
    title: "Advanced Search",
    description:
      "Search notes, people, and topics across the entire Nostr network. Find exactly what you're looking for, instantly.",
  },
  {
    icon: "TrendingUp",
    title: "Trending Notes & People",
    description:
      "See what's hot right now. Trending notes and rising profiles updated in real time.",
  },
  {
    icon: "Hash",
    title: "Trending Topics",
    description:
      "Browse the most talked-about topics happening across the network right now.",
  },
  {
    icon: "Wallet",
    title: "Built-in Lightning Wallet",
    description:
      "A lightning wallet with zero onboarding. Ready to send and receive sats the moment you open Wisp.",
  },
  {
    icon: "AtSign",
    title: "Lightning Address",
    description:
      "Receive zaps on your very first note. Your lightning address works instantly — zero signup required.",
  },
  {
    icon: "Layers",
    title: "Custom Feed Generation",
    description:
      "Generate any feed you can imagine. Filter by topic, relay, author, or content type.",
  },
  {
    icon: "Gauge",
    title: "Low Data Usage",
    description:
      "Engineered for efficiency. Uses minimal bandwidth so Wisp works great even on slow connections.",
  },
  {
    icon: "Route",
    title: "Smart Relay Routing",
    description:
      "Intelligent outbox-model routing ensures your notes always find their way to the right people.",
  },
  {
    icon: "Zap",
    title: "Zaps That Slap",
    description:
      "Satisfying sounds, smooth animations, and instant feedback every time you send or receive sats.",
  },
  {
    icon: "ImagePlay",
    title: "Native GIF Keyboard",
    description:
      "Full GIF keyboard baked right in. Express yourself without leaving the conversation.",
  },
  {
    icon: "Radio",
    title: "Relay Feeds",
    description:
      "Browse notes by relay. Discover communities and see what's happening across the network.",
  },
  {
    icon: "Lock",
    title: "Private Messages",
    description:
      "NIP-17 encrypted direct messages. Your conversations stay between you and your recipient.",
  },
  {
    icon: "Link",
    title: "NWC Wallet Connect",
    description:
      "Native Nostr Wallet Connect integration. Link your preferred wallet and zap instantly.",
  },
];
