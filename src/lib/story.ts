export interface StoryBeat {
  id: string;
  label?: string;
  headline: string;
  body: string;
}

export const storyBeats: StoryBeat[] = [
  {
    id: "broken",
    label: "The problem",
    headline: "Social media was supposed to connect us.",
    body: "Instead, it became a machine designed to exploit us. Algorithms that feed on outrage. Ads that follow you everywhere. Platforms that decide who gets a voice and who gets silenced. Your attention is the product. Your data is the profit. And you have no say in any of it.",
  },
  {
    id: "who-profits",
    headline: "It\u2019s designed to get you addicted. That\u2019s why they call you a user.",
    body: "Behind every feed is a boardroom optimizing for engagement — not your wellbeing. They amplify rage because rage keeps you watching. They suppress what doesn't serve their advertisers. They own your username, your followers, your history. And they can take it all away with one click.",
  },
  {
    id: "nostr",
    label: "A different way",
    headline: "Open protocols, not platforms.",
    body: "No company. No headquarters. No terms of service written by lawyers to protect a corporation. Nostr is an open protocol — like email, like the web itself. No one controls it. No one can shut it down. It simply exists, for anyone to use.",
  },
  {
    id: "identity",
    headline: "Your identity is a key that only you hold.",
    body: "On Nostr, you aren't a row in someone else's database. You are a cryptographic key pair. Your identity is yours — mathematically, permanently. No platform grants it. No platform can revoke it. You carry it with you across any app, any server, any border.",
  },
  {
    id: "feed",
    headline: "You decide what you see.",
    body: "No algorithm decides what's important to you. No invisible hand pushes content to make you angry, anxious, or addicted. Your feed is simply the people you chose to follow, saying what they want to say. Nothing more. Nothing less.",
  },
  {
    id: "money",
    headline: "Send money as easily as sending a message.",
    body: "Tip a post you love. Support a creator directly. Split a bill with a friend on the other side of the world. No bank, no payment processor, no permission slip. Money moves instantly, between people, the way it should.",
  },
  {
    id: "respect",
    headline: "No ads. No tracking. No manipulation.",
    body: "Wisp will never show you an advertisement. It will never sell your data. It will never quietly reshape your reality to serve someone else's interests. Your attention belongs to you. Your peace of mind belongs to you.",
  },
  {
    id: "open",
    headline: "Every line of code is public.",
    body: "Wisp is fully open source. You don't have to trust our words — you can read the code. Every feature, every connection, every decision is transparent and auditable. This is what trust looks like when it's earned, not demanded.",
  },
];
