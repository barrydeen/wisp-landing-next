export const SITE_URL = "https://wisp.mobile";

export const SITE_NAME = "Wisp";

export const SITE_LOCALE = "en_US";

export const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.wisp.app";

export const ZAPSTORE_URL = "https://zapstore.dev/";

export const GITHUB_URL = "https://github.com/barrydeen/wisp";

export const GITHUB_RELEASES_URL =
  "https://github.com/barrydeen/wisp/releases/latest";

export const DEFAULT_OG_IMAGE = {
  url: "/wisp-og.webp",
  width: 1400,
  height: 788,
  type: "image/webp",
  alt: "Wisp — Social that's actually fun again.",
} as const;

/** Absolute URL for a site-relative path. Metadata canonicals stay relative to
 *  metadataBase, but JSON-LD and sitemaps require fully-qualified URLs. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/** Stable @id anchors so every JSON-LD graph references one Organization node
 *  rather than restating it and risking drift. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const BLOG_ID = `${SITE_URL}/blog#blog`;
