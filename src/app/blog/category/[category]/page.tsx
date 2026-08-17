import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { PostCard } from "@/components/blog/PostCard";
import { getActiveCategories, getPostsByCategory } from "@/lib/blog";
import { getCategory } from "@/lib/blog-taxonomy";
import { postListGraph } from "@/lib/schema";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";

export const dynamicParams = false;

/** Only categories that actually have posts — an empty hub is a thin page. */
export function generateStaticParams(): Array<{ category: string }> {
  return getActiveCategories().map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  const title = `${category.label} articles`;
  const postCount = getPostsByCategory(slug).length;

  return {
    title,
    description: category.description,
    alternates: { canonical: `/blog/category/${slug}` },
    // A hub with one or two posts is thin and near-duplicate of the index, so
    // keep it out of the index — but keep following, so link equity still
    // flows through to the posts.
    robots: postCount <= 2 ? { index: false, follow: true } : undefined,
    openGraph: buildOpenGraph({
      title,
      description: category.description,
      path: `/blog/category/${slug}`,
    }),
    twitter: buildTwitter(title, category.description),
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const posts = getPostsByCategory(slug);
  if (posts.length === 0) notFound();

  return (
    <>
      <JsonLd
        data={postListGraph({
          posts,
          path: `/blog/category/${slug}`,
          name: `${category.label} articles — Wisp`,
          description: category.description,
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: category.label },
          ],
        })}
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: category.label },
        ]}
      />

      <header className="mb-10">
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-white">
          {category.label}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-[#9d95b3]">
          {category.description}
        </p>
      </header>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <li key={post.slug}>
            <PostCard post={post} eager={index === 0} />
          </li>
        ))}
      </ul>
    </>
  );
}
