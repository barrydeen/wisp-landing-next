import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * Nothing to disallow — there is no admin area, no search, and no faceted
 * params. Note /blog/page/* is deliberately NOT blocked: those pages are thin,
 * but they are the crawl path to older posts, and severing it would strand
 * everything past the first page.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: "wisp.mobile",
  };
}
