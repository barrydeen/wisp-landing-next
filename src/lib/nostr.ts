export const RELAYS = [
  "wss://relay.damus.io",
  "wss://nos.lol",
  "wss://relay.primal.net",
  "wss://relay.nostr.band",
];

export const OWNER_PUBKEY =
  "e2ccf7cf20403f3f2a4a55b328f0de3be38558a7d5f33632fdaaefc726c1c8eb";

export const OWNER_NPUB =
  "npub1ut80enugyq8n72j54dvj3c7w80sur2cnav0nxvlk4wluw8yurr4sv5d3hf";

export function getDisplayName(profile?: {
  display_name?: string;
  displayName?: string;
  name?: string;
}): string {
  return profile?.display_name || profile?.displayName || profile?.name || "Anon";
}

export function shortenPubkey(pubkey: string): string {
  return `${pubkey.slice(0, 8)}...${pubkey.slice(-4)}`;
}

export function timeAgo(timestamp: number): string {
  const seconds = Math.floor(Date.now() / 1000 - timestamp);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function linkifyContent(text: string): string {
  return text
    .replace(
      /(https?:\/\/[^\s<]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">$1</a>'
    )
    .replace(
      /\b(npub1[a-z0-9]{58})/g,
      '<a href="https://njump.me/$1" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">$1</a>'
    )
    .replace(
      /\b(note1[a-z0-9]{58})/g,
      '<a href="https://njump.me/$1" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">$1</a>'
    );
}
