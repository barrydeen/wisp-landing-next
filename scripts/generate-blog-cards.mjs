#!/usr/bin/env node
/**
 * Renders a branded featured-image card per post into public/blog/cards/.
 *
 * Carries the headline (the short seoTitle form). An earlier version omitted it
 * to avoid repeating the <h1> on the article page — but that made all fifteen
 * cards identical apart from an accent colour, so the index grid looked like a
 * wall of missing images. Distinctness in the grid matters more than the mild
 * repetition on the article page.
 *
 * Uses the same renderer as the OG route (next/og -> satori), so the two stay
 * visually consistent. Run via `npm run blog:cards`; `prebuild` runs it before
 * the index so the validator sees the files it is about to reference.
 */
import { createRequire } from "node:module";
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import matter from "gray-matter";

const require = createRequire(import.meta.url);
const { ImageResponse } = require("next/og");

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const CONTENT_DIR = join(ROOT, "src", "content", "blog");
const CARDS_DIR = join(ROOT, "public", "blog", "cards");
const CATEGORIES_FILE = join(ROOT, "src", "lib", "blog-categories.json");

const SIZE = { width: 1200, height: 630 };

/** One accent per category, drawn from the site palette, so the index grid
 *  reads as four families rather than fifteen identical tiles. */
const ACCENTS = {
  alternatives: "#9b7bff",
  nostr: "#4dd8ff",
  guides: "#4cf2a8",
  wellbeing: "#ffd84d",
};
const FALLBACK_ACCENT = "#ff7a1a";

const el = React.createElement;

/** Headline sizing: long titles step down so three lines still fit the card. */
function headlineSize(text) {
  if (text.length > 46) return 62;
  if (text.length > 34) return 72;
  return 82;
}

function card({ label, accent, headline }) {
  return el(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0f0d14",
        padding: "72px",
        position: "relative",
      },
    },
    // Soft accent wash, bottom-right. Satori has no radial-gradient, so this is
    // an oversized rounded box with a linear gradient and low opacity.
    el("div", {
      style: {
        position: "absolute",
        right: "-180px",
        bottom: "-260px",
        width: "820px",
        height: "820px",
        borderRadius: "9999px",
        opacity: 0.22,
        background: `linear-gradient(135deg, ${accent} 0%, #0f0d14 70%)`,
      },
    }),
    el("div", {
      style: {
        position: "absolute",
        left: "-140px",
        top: "-220px",
        width: "560px",
        height: "560px",
        borderRadius: "9999px",
        opacity: 0.14,
        background: `linear-gradient(135deg, ${FALLBACK_ACCENT} 0%, #0f0d14 70%)`,
      },
    }),

    el(
      "div",
      { style: { display: "flex", alignItems: "center", gap: "18px" } },
      el("div", {
        style: { display: "flex", width: "22px", height: "22px", borderRadius: "9999px", background: accent },
      }),
      el(
        "div",
        {
          style: {
            display: "flex",
            fontFamily: "Inter",
            fontSize: 30,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: accent,
          },
        },
        label,
      ),
    ),

    // The headline is what makes each card distinct in the index grid; without
    // it every post is the same brand tile and reads as a missing image.
    el(
      "div",
      {
        style: {
          display: "flex",
          fontFamily: "Space Grotesk",
          fontSize: headlineSize(headline),
          lineHeight: 1.12,
          color: "#f5f1ff",
          maxWidth: "900px",
        },
      },
      headline,
    ),

    el(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        },
      },
      el(
        "div",
        { style: { display: "flex", fontFamily: "Space Grotesk", fontSize: 46, color: "#f5f1ff" } },
        "wisp",
      ),
      el(
        "div",
        { style: { display: "flex", fontFamily: "Inter", fontSize: 28, color: "#6b647c" } },
        "wisp.mobile",
      ),
    ),

    el("div", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "16px",
        background: `linear-gradient(90deg, ${FALLBACK_ACCENT} 0%, ${accent} 100%)`,
      },
    }),
  );
}

async function main() {
  const categories = JSON.parse(readFileSync(CATEGORIES_FILE, "utf8"));
  const labels = new Map(categories.map((c) => [c.slug, c.label]));

  const [display, body] = [
    readFileSync(join(ROOT, "assets", "SpaceGrotesk-Bold.ttf")),
    readFileSync(join(ROOT, "assets", "Inter-Regular.ttf")),
  ];

  mkdirSync(CARDS_DIR, { recursive: true });

  const files = readdirSync(CONTENT_DIR).filter(
    (f) => f.endsWith(".mdx") && !f.startsWith("_"),
  );

  let written = 0;
  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const { data } = matter(readFileSync(join(CONTENT_DIR, file), "utf8"));
    const category = String(data.category ?? "");
    const accent = ACCENTS[category] ?? FALLBACK_ACCENT;
    const label = labels.get(category) ?? "Wisp";
    // seoTitle is the short form (<= 60 chars); the full h1 would wrap to four
    // or five lines on a 1200x630 card.
    const headline = String(data.seoTitle ?? data.title ?? "").trim();

    const response = new ImageResponse(card({ label, accent, headline }), {
      ...SIZE,
      fonts: [
        { name: "Space Grotesk", data: display, weight: 700, style: "normal" },
        { name: "Inter", data: body, weight: 400, style: "normal" },
      ],
    });

    const png = Buffer.from(await response.arrayBuffer());
    writeFileSync(join(CARDS_DIR, `${slug}.png`), png);
    written += 1;
  }

  console.log(`✓ blog cards: ${written} rendered → public/blog/cards/`);
}

if (!existsSync(CONTENT_DIR)) {
  console.error(`✖ missing ${CONTENT_DIR}`);
  process.exit(1);
}

await main();
