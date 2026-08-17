import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { PostHeader } from "@/components/blog/PostHeader";
import { FaqSection } from "@/components/blog/FaqSection";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { CTA } from "@/components/blog/CTA";
import { TocMobile, TocSidebar, shouldRenderToc } from "@/components/blog/Toc";
import { TocHighlight } from "@/components/blog/TocHighlight";
import {
  getAdjacentPosts,
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";
import { getCategory } from "@/lib/blog-taxonomy";
import { postGraph } from "@/lib/schema";
import { proseClass } from "@/lib/prose";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";

// Anything not in generateStaticParams 404s instead of rendering on demand.
// This is also what keeps opengraph-image.tsx a build-time route rather than a
// request-time one.
export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const category = getCategory(post.category);

  return {
    // The root layout's title.template appends " — Wisp". seoTitle keeps the
    // SERP entry short while the on-page h1 keeps the full headline.
    title: post.seoTitle,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: buildOpenGraph({
      title: post.title,
      description: post.description,
      path: `/blog/${post.slug}`,
      type: "article",
      // Full ISO-8601 — a bare date loses the precision that freshness
      // signals read from modifiedTime.
      publishedTime: new Date(`${post.date}T00:00:00Z`).toISOString(),
      modifiedTime: new Date(`${post.updated}T00:00:00Z`).toISOString(),
      section: category?.label ?? post.category,
      tags: post.tags,
      // images omitted on purpose — opengraph-image.tsx supplies it.
    }),
    twitter: buildTwitter(post.title, post.description),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Compiled into the bundle at build time by Turbopack — no runtime fs, which
  // is what makes this safe under PM2's cwd=/root.
  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);

  const category = getCategory(post.category);
  const related = getRelatedPosts(post.slug);
  const { previous, next } = getAdjacentPosts(post.slug);
  const withToc = shouldRenderToc(post.toc);

  return (
    <>
      <JsonLd data={postGraph(post)} />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          ...(category
            ? [
                {
                  name: category.label,
                  href: `/blog/category/${category.slug}`,
                },
              ]
            : []),
          { name: post.title },
        ]}
      />

      {/* Fixed 260px sidebar column: the article column's width is known before
          the TOC paints, so the TOC contributes nothing to CLS. */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12">
        <article className="min-w-0 max-w-[720px]">
          <PostHeader post={post} />
          {withToc && <TocMobile toc={post.toc} />}

          <div className={proseClass}>
            <Content />
          </div>

          <FaqSection faq={post.faq} />
          {!post.hasInlineCta && <CTA />}
          <RelatedPosts posts={related} previous={previous} next={next} />
        </article>

        {withToc && (
          <aside className="hidden lg:block">
            <TocSidebar toc={post.toc} />
          </aside>
        )}
      </div>

      {withToc && <TocHighlight ids={post.toc.map((entry) => entry.id)} />}
    </>
  );
}
