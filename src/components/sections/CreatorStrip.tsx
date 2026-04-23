"use client";

import { useEffect, useState, useRef } from "react";
import { useNostrPool } from "@/hooks/useNostrPool";
import { OWNER_PUBKEY, getDisplayName } from "@/lib/nostr";
import { FadeIn } from "@/components/effects/FadeIn";
import type { NostrProfile } from "@/types/nostr";

const AVATAR_COUNT = 24;

interface AvatarData {
  pubkey: string;
  name: string;
  picture: string;
}

export function CreatorStrip() {
  const { connected, subscribe } = useNostrPool();
  const [avatars, setAvatars] = useState<AvatarData[]>([]);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!connected || initialized.current) return;
    initialized.current = true;

    async function load() {
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
      const shuffled = allFollows.slice().sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, AVATAR_COUNT);

      const profiles: Record<string, NostrProfile> = {};
      const profilePubkeys = [
        ...new Set([...selected, ...allFollows.slice(0, 200)]),
      ];
      await subscribe({ kinds: [0], authors: profilePubkeys }, (ev) => {
        try {
          const meta = JSON.parse(ev.content) as NostrProfile;
          const existing = profiles[ev.pubkey];
          if (
            !existing ||
            ev.created_at >
              (((existing as Record<string, unknown>)._ts as number) || 0)
          ) {
            profiles[ev.pubkey] = {
              ...meta,
              ...({ _ts: ev.created_at } as Record<string, unknown>),
            } as NostrProfile;
          }
        } catch {
          // ignore
        }
      });

      const items = selected
        .map((pk) => {
          const p = profiles[pk] || {};
          return {
            pubkey: pk,
            name: getDisplayName(p),
            picture: p.picture || "",
          };
        })
        .filter((x) => x.picture);

      setAvatars(items);
      setLoading(false);
    }

    load();
  }, [connected, subscribe]);

  const track = avatars.length > 0 ? [...avatars, ...avatars] : [];
  const dur = Math.max(30, avatars.length * 2.5);

  return (
    <section id="creators" className="relative overflow-hidden px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-mint">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-pulse-dot rounded-full bg-mint" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              Live on Wisp right now
            </div>
            <h2 className="max-w-xl font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-white">
              People already hanging out.
            </h2>
            <p className="mt-3 max-w-md text-[15px] text-[#9d95b3]">
              These are real humans posting on Wisp, loaded live from the network — in your browser.
            </p>
          </div>
        </FadeIn>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#0f0d14] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#0f0d14] to-transparent" />

          {loading ? (
            <div className="flex items-center justify-center gap-3 py-16 text-sm text-[#6b647c]">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#322944] border-t-pink" />
              {connected ? "Loading people..." : "Connecting..."}
            </div>
          ) : avatars.length === 0 ? (
            <div className="py-16 text-center text-sm text-[#6b647c]">
              Could not load profiles
            </div>
          ) : (
            <div
              className="flex gap-6 py-4"
              style={{
                animation: `scroll-avatars ${dur}s linear infinite`,
                width: "max-content",
              }}
            >
              {track.map((avatar, i) => (
                <div
                  key={`${avatar.pubkey}-${i}`}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="h-16 w-16 overflow-hidden rounded-[20px] border-2 border-[#322944] transition-all hover:border-pink hover:rotate-[-4deg]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={avatar.picture}
                      alt={avatar.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#ff4d8f] to-[#9b7bff] text-lg font-bold text-white">${avatar.name.charAt(0).toUpperCase()}</div>`;
                        }
                      }}
                    />
                  </div>
                  <span className="max-w-[80px] truncate text-xs text-[#9d95b3]">
                    {avatar.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
