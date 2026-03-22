export interface NostrProfile {
  name?: string;
  display_name?: string;
  displayName?: string;
  picture?: string;
  nip05?: string;
  about?: string;
  lud16?: string;
  banner?: string;
}

export interface NostrEvent {
  id: string;
  pubkey: string;
  created_at: number;
  kind: number;
  tags: string[][];
  content: string;
  sig: string;
}

export interface ProfileWithPubkey extends NostrProfile {
  pubkey: string;
}

export interface NoteWithProfile {
  event: NostrEvent;
  profile?: NostrProfile;
}
