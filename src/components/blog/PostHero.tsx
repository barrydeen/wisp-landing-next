import Image from "next/image";
import type { PostMeta } from "@/types/blog";

interface PostHeroProps {
  post: PostMeta;
}

/**
 * Featured image at the top of a post.
 *
 * This sits above the fold, so it is almost certainly the LCP element — hence
 * `loading="eager"` and `fetchPriority="high"` rather than the lazy default
 * used for in-body images. The fixed 1200x630 aspect ratio is declared up
 * front so the space is reserved before the bytes arrive and the text below
 * never shifts.
 */
export function PostHero({ post }: PostHeroProps) {
  return (
    <figure className="mb-10">
      <div className="relative aspect-[1200/630] overflow-hidden rounded-2xl border border-[#261f36] bg-[#17141f]">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(min-width: 1024px) 720px, 100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover"
        />
      </div>
    </figure>
  );
}
