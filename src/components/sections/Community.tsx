"use client";

import { useEffect, useState, useRef } from "react";
import { useNostrPool } from "@/hooks/useNostrPool";
import { OWNER_PUBKEY, getDisplayName } from "@/lib/nostr";
import { FadeIn } from "@/components/effects/FadeIn";
import type { NostrProfile } from "@/types/nostr";

const AVATAR_COUNT = 21;

interface AvatarData {
  pubkey: string;
  name: string;
  picture: string;
}

export function Community() {
  const { connected, subscribe } = useNostrPool();
  const [avatars, setAvatars] = useState<AvatarData[]>([]);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

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
      const shuffled = allFollows.slice().sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, AVATAR_COUNT);

      // Fetch profiles
      const profiles: Record<string, NostrProfile> = {};
      const profilePubkeys = [
        ...new Set([...selected, ...allFollows.slice(0, 200)]),
      ];
      await subscribe(
        { kinds: [0], authors: profilePubkeys },
        (ev) => {
          try {
            const meta = JSON.parse(ev.content) as NostrProfile;
            const existing = profiles[ev.pubkey];
            if (
              !existing ||
              ev.created_at > ((existing as Record<string, unknown>)._ts as number || 0)
            ) {
              profiles[ev.pubkey] = { ...meta, ...({ _ts: ev.created_at } as Record<string, unknown>) } as NostrProfile;
            }
          } catch {
            // ignore
          }
        }
      );

      // Build avatar data
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

      // Also subscribe to live feed now that we have profiles
      // (handled by LiveFeed component)
    }

    load();
  }, [connected, subscribe]);

  const track = avatars.length > 0 ? [...avatars, ...avatars] : [];
  const dur = Math.max(30, avatars.length * 2.5);

  return (
    <section id="community" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="mb-4">
            <div className="accent-bar" />
          </div>
          <p className="mb-3 text-[10px] font-medium tracking-[0.25em] text-[#f97316]/70 uppercase">
            The network
          </p>
          <h2 className="mb-3 max-w-lg text-[clamp(1.75rem,5vw,3rem)] font-semibold leading-[1.15] tracking-tight text-[#e8e8e8]">
            Real people. Loaded live.
          </h2>
          <p className="mb-12 max-w-md text-base text-[#555]">
            These profiles are fetched directly from Nostr relays right now, in your browser.
          </p>
        </FadeIn>

        <div className="relative overflow-hidden">
          {/* Edge masks */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#050505] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#050505] to-transparent" />

          {loading ? (
            <div className="flex items-center justify-center gap-3 py-16 text-sm text-[#555]">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#333] border-t-[#f97316]" />
              {connected ? "Loading profiles..." : "Connecting to relays..."}
            </div>
          ) : avatars.length === 0 ? (
            <div className="py-16 text-center text-sm text-[#555]">
              Could not load profiles
            </div>
          ) : (
            <div
              className="flex gap-8 py-4"
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
                  <div className="h-14 w-14 overflow-hidden rounded-full border border-[#1a1a1a] transition-all hover:border-[#333]">
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
                          parent.innerHTML = `<div class="flex h-full w-full items-center justify-center bg-[#1a1a2e] text-sm font-semibold text-[#888]">${avatar.name.charAt(0).toUpperCase()}</div>`;
                        }
                      }}
                    />
                  </div>
                  <span className="max-w-[80px] truncate text-xs text-[#888]">
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
