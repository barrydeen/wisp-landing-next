import Link from "next/link";
import { formatPostDate } from "@/lib/blog";
import { getCategory } from "@/lib/blog-taxonomy";
import { SITE_NAME } from "@/lib/site";
import type { PostMeta } from "@/types/blog";

interface PostHeaderProps {
  post: PostMeta;
}

/**
 * The <h1> lives here, not in the MDX body — mdx-components maps `h1` to a
 * component that throws, so a post can never render a second one.
 *
 * Deliberately no hero image: with a text LCP element the paint is gated only
 * on the font and critical CSS, which is the cheapest fast LCP available. Note
 * this must NOT be wrapped in <FadeIn> — that renders at opacity-0 until an
 * IntersectionObserver fires post-hydration, and an unpainted element defers LCP.
 */
export function PostHeader({ post }: PostHeaderProps) {
  const category = getCategory(post.category);

  return (
    <header className="mb-8">
      <h1 className="font-display text-[clamp(1.9rem,5vw,2.75rem)] font-bold leading-tight tracking-tight text-white">
        {post.title}
      </h1>

      <p className="mt-4 text-lg leading-relaxed text-[#9d95b3]">
        {post.description}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[#261f36] pt-4 text-sm text-[#6b647c]">
        <span className="text-[#9d95b3]">{SITE_NAME}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        {post.updated !== post.date && (
          <>
            <span aria-hidden="true">·</span>
            <span>
              Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
            </span>
          </>
        )}
        <span aria-hidden="true">·</span>
        <span>{post.readingMinutes} min read</span>
        {category && (
          <>
            <span aria-hidden="true">·</span>
            <Link
              href={`/blog/category/${category.slug}`}
              className="text-[#9b7bff] transition-colors hover:text-white"
            >
              {category.label}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
