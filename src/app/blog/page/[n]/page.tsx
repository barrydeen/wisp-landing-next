import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { PostCard } from "@/components/blog/PostCard";
import { Pagination } from "@/components/blog/Pagination";
import { getPageCount, getPostsForPage } from "@/lib/blog";
import { postListGraph } from "@/lib/schema";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";

export const dynamicParams = false;

/** Starts at 2 — /blog is page 1, and /blog/page/1 301s to it (see
 *  next.config.ts) so only one URL ever represents the first page. */
export function generateStaticParams(): Array<{ n: string }> {
  return Array.from({ length: getPageCount() - 1 }, (_, i) => ({
    n: String(i + 2),
  }));
}

function parsePage(value: string): number | null {
  const page = Number.parseInt(value, 10);
  if (!Number.isInteger(page) || page < 2 || page > getPageCount()) return null;
  return page;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const { n } = await params;
  const page = parsePage(n);
  if (!page) return {};

  const title = `Blog — Page ${page}`;
  const description = `More writing from the Wisp blog. Page ${page} of ${getPageCount()}.`;

  return {
    title,
    description,
    // Self-canonical, deliberately NOT pointing at /blog. Canonicalising
    // paginated pages away tells Google they are duplicates, which suppresses
    // crawling *through* them — and they are the main crawl path to older posts.
    alternates: { canonical: `/blog/page/${page}` },
    openGraph: buildOpenGraph({
      title,
      description,
      path: `/blog/page/${page}`,
    }),
    twitter: buildTwitter(title, description),
  };
}

export default async function BlogPaginatedPage({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  const page = parsePage(n);
  if (!page) notFound();

  const posts = getPostsForPage(page);

  return (
    <>
      <JsonLd
        data={postListGraph({
          posts,
          path: `/blog/page/${page}`,
          name: `Blog — Page ${page}`,
          description: `Page ${page} of the Wisp blog.`,
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: `Page ${page}` },
          ],
        })}
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: `Page ${page}` },
        ]}
      />

      <header className="mb-10">
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-white">
          Blog
        </h1>
        <p className="mt-3 text-lg text-[#9d95b3]">
          Page {page} of {getPageCount()}
        </p>
      </header>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>

      <Pagination current={page} total={getPageCount()} />
    </>
  );
}
