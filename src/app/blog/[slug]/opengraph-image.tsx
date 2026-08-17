import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { getCategory } from "@/lib/blog-taxonomy";

// The file convention only allows a static alt, so it describes the card
// itself rather than the post — the post title is already in og:title.
export const alt = "An article on the Wisp blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at BUILD time, not request time. That is guaranteed by
 * dynamicParams = false on the colocated page plus this function touching no
 * request-time API (no headers/cookies/searchParams, no uncached fetch).
 *
 * It matters: under output:'standalone' behind PM2 there is a single Node
 * process, and a request-time route would spin up Satori and two wasm modules
 * on every social/crawler hit.
 *
 * Verify after a build:  ls .next/server/app/blog/*\/opengraph-image*
 * You should see a .png per post. Only .js/.nft.json means it went dynamic.
 *
 * process.cwd() is safe here for the same reason — at build time it is the
 * project root. (If this ever did go request-time under PM2, cwd would be
 * /root and the font read would fail loudly, which is the outcome we want.)
 */
export function generateStaticParams(): Array<{ slug: string }> {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const category = post ? getCategory(post.category) : undefined;

  // Satori requires ttf/otf/woff — woff2 is unsupported, so next/font's cache
  // cannot be reused. These are subsetted latin faces checked into assets/.
  const [display, body] = await Promise.all([
    readFile(join(process.cwd(), "assets", "SpaceGrotesk-Bold.ttf")),
    readFile(join(process.cwd(), "assets", "Inter-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      // Satori supports flexbox only — no CSS Grid.
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f0d14",
          padding: "72px",
          borderBottom: "16px solid #ff7a1a",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Inter",
              fontSize: 26,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#9b7bff",
            }}
          >
            {category?.label ?? "Wisp Blog"}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontFamily: "Space Grotesk",
              fontSize: post && post.title.length > 48 ? 62 : 74,
              lineHeight: 1.1,
              color: "#f5f1ff",
            }}
          >
            {post?.title ?? "Wisp"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "Inter",
            fontSize: 28,
            color: "#6b647c",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Space Grotesk",
              fontSize: 36,
              color: "#ff7a1a",
            }}
          >
            wisp
          </div>
          <div style={{ display: "flex" }}>wisp.mobile</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: display, weight: 700, style: "normal" },
        { name: "Inter", data: body, weight: 400, style: "normal" },
      ],
    },
  );
}
