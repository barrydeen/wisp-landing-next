import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { PostCard } from "@/components/blog/PostCard";
import { Pagination } from "@/components/blog/Pagination";
import { getActiveCategories, getPageCount, getPostsForPage } from "@/lib/blog";
import { postListGraph } from "@/lib/schema";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";

const TITLE = "Blog";
const DESCRIPTION =
  "Privacy, product decisions, and practical guides from the team building Wisp — a free, open-source social app on Nostr.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: buildOpenGraph({
    title: TITLE,
    description: DESCRIPTION,
    path: "/blog",
  }),
  twitter: buildTwitter(TITLE, DESCRIPTION),
};

export default function BlogIndexPage() {
  const posts = getPostsForPage(1);
  const categories = getActiveCategories();

  return (
    <>
      <JsonLd
        data={postListGraph({
          posts,
          path: "/blog",
          name: `${TITLE} — Wisp`,
          description: DESCRIPTION,
          isBlogRoot: true,
          breadcrumbs: [{ name: "Home", path: "/" }, { name: "Blog" }],
        })}
      />

      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog" }]} />

      <header className="mb-10">
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-white">
          Blog
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-[#9d95b3]">{DESCRIPTION}</p>
      </header>

      {categories.length > 0 && (
        <nav aria-label="Categories" className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/blog/category/${category.slug}`}
              className="rounded-full border border-[#322944] px-4 py-1.5 text-sm text-[#9d95b3] transition-colors hover:border-[#4a3d66] hover:text-white"
            >
              {category.label}
            </Link>
          ))}
        </nav>
      )}

      {posts.length === 0 ? (
        <p className="text-[#9d95b3]">No posts yet. Check back soon.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <PostCard post={post} eager={index === 0} />
            </li>
          ))}
        </ul>
      )}

      <Pagination current={1} total={getPageCount()} />
    </>
  );
}
