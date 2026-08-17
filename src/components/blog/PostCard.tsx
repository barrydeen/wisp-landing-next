import Link from "next/link";
import Image from "next/image";
import { formatPostDate } from "@/lib/blog";
import { getCategory } from "@/lib/blog-taxonomy";
import type { PostMeta } from "@/types/blog";

interface PostCardProps {
  post: PostMeta;
  /** Set on the first card only — it is the likeliest LCP candidate on /blog. */
  eager?: boolean;
}

export function PostCard({ post, eager = false }: PostCardProps) {
  const category = getCategory(post.category);

  return (
    <article className="tilt-card group overflow-hidden rounded-2xl border border-[#261f36] bg-[#17141f]">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-[#1f1b2b]">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="p-5">
          <div className="mb-2 flex items-center gap-2 text-xs text-[#6b647c]">
            {category && (
              <span className="rounded-full bg-[#1f1b2b] px-2.5 py-1 font-medium text-[#9b7bff]">
                {category.label}
              </span>
            )}
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>

          <h2 className="font-display text-lg font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-accent">
            {post.title}
          </h2>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#9d95b3]">
            {post.description}
          </p>
        </div>
      </Link>
    </article>
  );
}
