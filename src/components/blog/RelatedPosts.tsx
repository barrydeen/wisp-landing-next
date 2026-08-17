import Link from "next/link";
import { formatPostDate } from "@/lib/blog";
import type { PostMeta } from "@/types/blog";

interface RelatedPostsProps {
  posts: PostMeta[];
  previous: PostMeta | null;
  next: PostMeta | null;
}

/** Related posts plus prev/next. Adjacency runs over the whole date-ordered
 *  corpus, so every post has inbound links even if nothing shares its tags. */
export function RelatedPosts({ posts, previous, next }: RelatedPostsProps) {
  if (posts.length === 0 && !previous && !next) return null;

  return (
    <section className="mt-14 border-t border-[#261f36] pt-10">
      {posts.length > 0 && (
        <>
          <h2 className="mb-6 font-display text-2xl font-semibold tracking-tight text-white">
            Keep reading
          </h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="tilt-card block h-full rounded-2xl border border-[#261f36] bg-[#17141f] p-5"
                >
                  <p className="mb-2 text-xs text-[#6b647c]">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  </p>
                  <p className="font-display font-semibold leading-snug text-white">
                    {post.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {(previous || next) && (
        <nav
          aria-label="Post navigation"
          className="mt-8 flex flex-col gap-3 border-t border-[#261f36] pt-6 sm:flex-row sm:justify-between"
        >
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="text-sm text-[#9d95b3] transition-colors hover:text-white"
            >
              <span className="block text-xs text-[#6b647c]">Newer</span>
              {next.title}
            </Link>
          ) : (
            <span />
          )}
          {previous && (
            <Link
              href={`/blog/${previous.slug}`}
              className="text-sm text-[#9d95b3] transition-colors hover:text-white sm:text-right"
            >
              <span className="block text-xs text-[#6b647c]">Older</span>
              {previous.title}
            </Link>
          )}
        </nav>
      )}
    </section>
  );
}
