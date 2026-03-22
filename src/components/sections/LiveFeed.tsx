"use client";

import { useEffect, useState, useRef } from "react";
import { useNostrPool } from "@/hooks/useNostrPool";
import { OWNER_PUBKEY, getDisplayName, timeAgo } from "@/lib/nostr";
import { FadeIn } from "@/components/effects/FadeIn";
import type { NostrEvent, NostrProfile } from "@/types/nostr";

const MAX_FEED_NOTES = 20;

interface FeedNote {
  id: string;
  pubkey: string;
  content: string;
  created_at: number;
}

function escapeHtml(s: string): string {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

function formatContent(raw: string): string {
  let text = escapeHtml(raw);
  text = text.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-[#f97316] hover:underline">$1</a>'
  );
  text = text.replace(
    /nostr:(npub[a-z0-9]+)/g,
    '<a href="https://njump.me/$1" target="_blank" rel="noopener noreferrer" class="text-[#f97316] hover:underline">@$1</a>'
  );
  text = text.replace(
    /nostr:(note[a-z0-9]+)/g,
    '<a href="https://njump.me/$1" target="_blank" rel="noopener noreferrer" class="text-[#f97316] hover:underline">$1</a>'
  );
  return text;
}

export function LiveFeed() {
  const { connected, subscribe, subscribePersistent } = useNostrPool();
  const [notes, setNotes] = useState<FeedNote[]>([]);
  const [loading, setLoading] = useState(true);
  const profilesRef = useRef<Record<string, NostrProfile>>({});
  const [profiles, setProfiles] = useState<Record<string, NostrProfile>>({});
  const initialized = useRef(false);
  const seenRef = useRef(new Set<string>());

  useEffect(() => {
    if (!connected || initialized.current) return;
    initialized.current = true;

    async function load() {
      // Fetch follow list
      const follows = new Set<string>();
      await subscribe(
        { kinds: [3], authors: [OWNER_PUBKEY], limit: 1 },
        (ev) => {
          if (ev.tags) {
            ev.tags.forEach((t) => {
              if (t[0] === "p" && t[1]) follows.add(t[1]);
            });
          }
        }
      );

      if (follows.size === 0) {
        setLoading(false);
        return;
      }

      const allFollows = [...follows];

      // Fetch profiles
      const profs: Record<string, NostrProfile> = {};
      await subscribe(
        { kinds: [0], authors: allFollows.slice(0, 200) },
        (ev) => {
          try {
            const meta = JSON.parse(ev.content) as NostrProfile;
            profs[ev.pubkey] = meta;
          } catch {
            // ignore
          }
        }
      );
      profilesRef.current = profs;
      setProfiles({ ...profs });

      // Subscribe to live notes
      const pendingNotes: FeedNote[] = [];

      function addNote(ev: NostrEvent) {
        if (ev.kind !== 1) return;
        if (seenRef.current.has(ev.id)) return;
        seenRef.current.add(ev.id);
        if (ev.tags && ev.tags.some((t) => t[0] === "e")) return;
        if (!ev.content || ev.content.trim().length < 5) return;
        if (/^https?:\/\/\S+$/.test(ev.content.trim())) return;

        pendingNotes.push({
          id: ev.id,
          pubkey: ev.pubkey,
          content: ev.content,
          created_at: ev.created_at,
        });

        pendingNotes.sort((a, b) => b.created_at - a.created_at);
        if (pendingNotes.length > MAX_FEED_NOTES) pendingNotes.length = MAX_FEED_NOTES;

        setNotes([...pendingNotes]);
        setLoading(false);
      }

      subscribePersistent(
        { kinds: [1], authors: allFollows.slice(0, 500), limit: 30 },
        addNote
      );
    }

    load();
  }, [connected, subscribe, subscribePersistent]);

  return (
    <section id="live" className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <div className="mb-8 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse-dot" />
            <span className="text-sm font-medium text-[#888]">
              Live from the network
            </span>
          </div>
        </FadeIn>

        <div className="relative">
          {loading ? (
            <div className="flex items-center justify-center gap-3 py-16 text-sm text-[#555]">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#333] border-t-[#f97316]" />
              Loading notes...
            </div>
          ) : notes.length === 0 ? (
            <div className="py-16 text-center text-sm text-[#555]">
              No notes yet
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((note) => {
                const p = profiles[note.pubkey] || profilesRef.current[note.pubkey] || {};
                const name = getDisplayName(p);
                const pic = p.picture || "";
                const handle = p.nip05 || note.pubkey.slice(0, 12) + "...";

                return (
                  <div
                    key={note.id}
                    className="animate-note-slide-in rounded-xl border border-[#1a1a1a] bg-[#0d0d0d] p-4"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[#1a1a2e]">
                        {pic ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={pic}
                            alt={name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-[#888]">
                            {name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-[#f0f0f0]">
                          {name}
                        </div>
                        <div className="truncate text-xs text-[#555]">{handle}</div>
                      </div>
                      <div className="text-xs text-[#555]">
                        {timeAgo(note.created_at)}
                      </div>
                    </div>
                    <div
                      className="text-sm leading-relaxed text-[#888] [&_a]:text-[#f97316] [&_a:hover]:underline"
                      dangerouslySetInnerHTML={{
                        __html: formatContent(note.content),
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom fade */}
          {notes.length > 5 && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
          )}
        </div>
      </div>
    </section>
  );
}
