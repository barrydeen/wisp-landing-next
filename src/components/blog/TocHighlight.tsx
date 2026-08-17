"use client";

import { useEffect } from "react";

interface TocHighlightProps {
  ids: string[];
}

/**
 * The only client component on a post page. It renders nothing — the TOC markup
 * is already server-rendered — and only toggles the active link as you scroll.
 * With JS disabled the TOC is still a working list of anchors.
 *
 * aria-current="location" is the correct token here: "page" would claim the
 * link points at the current page, which is false for an in-page anchor.
 */
export function TocHighlight({ ids }: TocHighlightProps) {
  useEffect(() => {
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const links = new Map<string, HTMLElement[]>();
    for (const id of ids) {
      links.set(
        id,
        Array.from(
          document.querySelectorAll<HTMLElement>(`[data-toc-link="${id}"]`),
        ),
      );
    }

    const visible = new Set<string>();
    let active: string | null = null;

    const setActive = (id: string | null) => {
      if (id === active) return;
      if (active) {
        for (const el of links.get(active) ?? []) {
          el.removeAttribute("data-active");
          el.removeAttribute("aria-current");
        }
      }
      active = id;
      if (id) {
        for (const el of links.get(id) ?? []) {
          el.setAttribute("data-active", "true");
          el.setAttribute("aria-current", "location");
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        // Pick the first heading in document order that is currently in the
        // top band of the viewport.
        const next = ids.find((id) => visible.has(id));
        if (next) setActive(next);
      },
      // A heading becomes "active" once it reaches roughly the top third.
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [ids]);

  return null;
}
