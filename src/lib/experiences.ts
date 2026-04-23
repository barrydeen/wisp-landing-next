export type ExperienceAccent =
  | "pink"
  | "violet"
  | "cyan"
  | "yellow"
  | "orange"
  | "mint";

export interface Experience {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  label: string;
  image: string;
  alt: string;
  accent: ExperienceAccent;
  bullets: string[];
}

export const experiences: Experience[] = [
  {
    id: "feed",
    eyebrow: "Your people",
    title: "The posts, pics and videos your friends are making.",
    body: "Follow your group chat, your favorite creators, and the weird corners of the internet that actually make you laugh. Your feed, in chronological order — no algorithm choosing for you.",
    label: "Feed",
    image: "/feed.jpg",
    alt: "Wisp feed showing posts from friends",
    accent: "pink",
    bullets: [
      "Photos, videos, long posts, short takes",
      "Real-time reactions and replies",
      "Creators you actually follow, not ones fed to you",
    ],
  },
  {
    id: "rooms",
    eyebrow: "Your rooms",
    title: "Chat rooms built around what you're into.",
    body: "Jump into rooms for your team, your hobbies, your inside jokes. Start one in seconds and invite whoever you want — big or tiny, public or private.",
    label: "Rooms",
    image: "/chat.jpg",
    alt: "Wisp chat rooms list",
    accent: "violet",
    bullets: [
      "Group chats that scale from 3 to 30,000",
      "Topic rooms anyone can spin up",
      "Live vibes, not lurkers",
    ],
  },
  {
    id: "streams",
    eyebrow: "Live streams",
    title: "Watch your favorite creators. Live.",
    body: "Drop into streams the moment they go live, chat alongside everyone else watching, and send a tip straight to the creator while they're still on camera — all without leaving Wisp.",
    label: "Streams",
    image: "/streams.jpg",
    alt: "Wisp live streams",
    accent: "orange",
    bullets: [
      "Watch creators go live in real time",
      "Chat alongside everyone watching",
      "Tip creators mid-stream, instantly",
    ],
  },
  {
    id: "dms",
    eyebrow: "Your DMs",
    title: "Private messages that are actually private.",
    body: "DMs are end-to-end encrypted — nobody can read them but you and the person you're messaging. Not us. Not anyone. Say what you'd say in person.",
    label: "DMs",
    image: "/dms.jpg",
    alt: "Wisp direct messages",
    accent: "cyan",
    bullets: [
      "End-to-end encrypted (NIP-17)",
      "No data mining, no targeting",
      "Send photos, voice notes, reactions",
    ],
  },
  {
    id: "wallet",
    eyebrow: "Your wallet, built in",
    title: "Send money. Get paid for posts. In seconds.",
    body: "Tip creators you love, pay a friend back, split a dinner. Or flip it — when people love what you post, they can send real money straight to you. No middlemen, no platform fees, no three-day waits.",
    label: "Wallet",
    image: "/wallet.jpg",
    alt: "Wisp built-in lightning wallet",
    accent: "yellow",
    bullets: [
      "Tip creators and pay friends — tap, done",
      "Earn directly from posts people love",
      "Zero platform fees, zero middlemen",
    ],
  },
  {
    id: "discover",
    eyebrow: "Your feed, your rules",
    title: "Custom feeds. Built however you want.",
    body: "Make a feed for just your group chat. Another for creators you love. Another for memes only. Switch between them like tabs. No one decides what you see but you.",
    label: "Discover",
    image: "/hashtags.jpg",
    alt: "Wisp custom hashtag feeds",
    accent: "mint",
    bullets: [
      "Build custom feeds from any source",
      "Trending, fresh, or chronological",
      "Powerful search across everything",
    ],
  },
];
