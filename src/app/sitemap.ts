import type { MetadataRoute } from "next";
import {
  getActiveCategories,
  getAllPosts,
  getPageCount,
  getPostsByCategory,
} from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

/** Static pages change rarely; a fixed date is honest, whereas new Date() would
 *  claim they changed on every deploy. */
const LEGAL_LAST_MODIFIED = new Date("2026-02-28T00:00:00Z");

function newest(dates: string[]): Date | undefined {
  if (dates.length === 0) return undefined;
  return new Date(Math.max(...dates.map((d) => Date.parse(d))));
}

/**
 * lastModified is derived from frontmatter, never from new Date().
 *
 * That is the one rule here that actually matters: lastmod is the only sitemap
 * hint Google has confirmed it uses, and stamping every URL as freshly modified
 * on each deploy is a claim it can check against unchanged content. Once it
 * catches the lie it stops trusting lastmod for the whole site.
 *
 * changeFrequency and priority are emitted for spec completeness — Google
 * ignores both, so they are not worth tuning.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPost = newest(posts.map((post) => post.updated));

  return [
    {
      url: absoluteUrl("/"),
      lastModified: latestPost ?? LEGAL_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: latestPost,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...Array.from({ length: getPageCount() - 1 }, (_, i) => ({
      url: absoluteUrl(`/blog/page/${i + 2}`),
      lastModified: latestPost,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })),
    ...getActiveCategories().map((category) => ({
      url: absoluteUrl(`/blog/category/${category.slug}`),
      lastModified: newest(
        getPostsByCategory(category.slug).map((post) => post.updated),
      ),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(`${post.updated}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: absoluteUrl("/privacy"),
      lastModified: LEGAL_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/safety"),
      lastModified: LEGAL_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
