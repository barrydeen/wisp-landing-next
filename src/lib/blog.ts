import { postIndex } from "@/lib/blog-index.generated";
import { blogCategories, type BlogCategory } from "@/lib/blog-taxonomy";
import type { PostMeta } from "@/types/blog";

export const POSTS_PER_PAGE = 10;

// The bundler inlines process.env.NODE_ENV as a literal, so in a production
// build this filter is evaluated at compile time and drafts are dead-code
// eliminated. Combined with dynamicParams = false, a draft doesn't merely
// vanish from listings — no route exists for it at all.
const showDrafts = process.env.NODE_ENV === "development";

const posts: PostMeta[] = showDrafts
  ? postIndex
  : postIndex.filter((post) => !post.draft);

export function getAllPosts(): PostMeta[] {
  return posts;
}

export function getPostBySlug(slug: string): PostMeta | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((post) => post.slug);
}

export function getPostsByCategory(categorySlug: string): PostMeta[] {
  return posts.filter((post) => post.category === categorySlug);
}

/** Categories that actually have posts — empty hubs are thin pages we never ship. */
export function getActiveCategories(): BlogCategory[] {
  return blogCategories.filter(
    (category) => getPostsByCategory(category.slug).length > 0,
  );
}

export function getPageCount(): number {
  return Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
}

export function getPostsForPage(page: number): PostMeta[] {
  const start = (page - 1) * POSTS_PER_PAGE;
  return posts.slice(start, start + POSTS_PER_PAGE);
}

/**
 * Same category scores 3, each shared tag scores 1. Backfilled with the most
 * recent remaining posts so the slot is never empty — an empty related block is
 * a dead end for both readers and crawlers.
 */
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const post = getPostBySlug(slug);
  if (!post) return [];

  const candidates = posts.filter((other) => other.slug !== slug);
  const scored = candidates
    .map((other) => {
      const sharedTags = other.tags.filter((tag) =>
        post.tags.includes(tag),
      ).length;
      const score = (other.category === post.category ? 3 : 0) + sharedTags;
      return { post: other, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) =>
      a.score === b.score
        ? Date.parse(b.post.date) - Date.parse(a.post.date)
        : b.score - a.score,
    )
    .map((entry) => entry.post);

  if (scored.length >= limit) return scored.slice(0, limit);

  const backfill = candidates.filter((other) => !scored.includes(other));
  return [...scored, ...backfill].slice(0, limit);
}

/**
 * Adjacency runs over the full date-ordered corpus, not within a category.
 * That threads one continuous path through every post, so a post with a unique
 * category and no shared tags still has inbound links and can never be orphaned.
 */
export function getAdjacentPosts(slug: string): {
  previous: PostMeta | null;
  next: PostMeta | null;
} {
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    // posts[] is newest-first, so the *older* post sits at a higher index.
    previous: posts[index + 1] ?? null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
