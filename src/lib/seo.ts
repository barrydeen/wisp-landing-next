import type { Metadata } from "next";
import {
  DEFAULT_OG_IMAGE,
  SITE_LOCALE,
  SITE_NAME,
  absoluteUrl,
} from "@/lib/site";

type OpenGraph = NonNullable<Metadata["openGraph"]>;

interface OgOptions {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/blog/some-post". */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  /** Omit on post routes — opengraph-image.tsx supplies the image there. */
  images?: OpenGraph["images"];
}

/**
 * Next merges metadata shallowly: a route that sets `openGraph` REPLACES the
 * parent's object entirely, so setting just a title silently drops siteName and
 * locale. Every route builds its openGraph through here so that can't happen.
 */
export function buildOpenGraph(options: OgOptions): OpenGraph {
  const base = {
    title: options.title,
    description: options.description,
    url: options.path,
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
  };

  if (options.type === "article") {
    return {
      ...base,
      type: "article",
      publishedTime: options.publishedTime,
      modifiedTime: options.modifiedTime,
      section: options.section,
      tags: options.tags,
      ...(options.images ? { images: options.images } : {}),
    };
  }

  return {
    ...base,
    type: "website",
    images: options.images ?? [
      { ...DEFAULT_OG_IMAGE, url: absoluteUrl(DEFAULT_OG_IMAGE.url) },
    ],
  };
}

export function buildTwitter(
  title: string,
  description: string,
): Metadata["twitter"] {
  // No twitter-image route: X falls back to og:image when twitter:image is
  // absent, so generating a second identical PNG per post would be waste.
  return { card: "summary_large_image", title, description };
}
