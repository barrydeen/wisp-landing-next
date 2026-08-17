import {
  BLOG_ID,
  GITHUB_URL,
  GOOGLE_PLAY_URL,
  ORGANIZATION_ID,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
  absoluteUrl,
} from "@/lib/site";
import { getCategory } from "@/lib/blog-taxonomy";
import type { PostMeta } from "@/types/blog";

/**
 * Sitewide graph. Emitted once from the root layout; every other graph points
 * at these @ids rather than restating the publisher, so the entity can't drift.
 *
 * No SearchAction / Sitelinks Searchbox: Google deprecated that rich result in
 * November 2023, and there is no search on this site — the target URL template
 * would point at a 404, which is a false structured-data claim.
 */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          url: absoluteUrl("/wisp-logo.svg"),
          contentUrl: absoluteUrl("/wisp-logo.svg"),
          caption: SITE_NAME,
        },
        sameAs: [GITHUB_URL, GOOGLE_PLAY_URL],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "en-US",
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

/**
 * Homepage app graph. Deliberately no aggregateRating — self-declared ratings
 * on your own product violate Google's review-snippet policy and risk a manual
 * action. price/operatingSystem are true and sufficient.
 */
export function mobileApplicationGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: SITE_NAME,
    operatingSystem: "Android",
    applicationCategory: "SocialNetworkingApplication",
    url: SITE_URL,
    downloadUrl: GOOGLE_PLAY_URL,
    publisher: { "@id": ORGANIZATION_ID },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

function breadcrumbList(
  items: Array<{ name: string; path?: string }>,
  id: string,
) {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      // The final crumb is the current page and must have no `item` — a page
      // does not link to itself.
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

/**
 * Post graph. author and publisher both resolve to the Organization node —
 * the direct schema expression of the "Wisp as an Organization, no author
 * pages" decision. Google accepts Organization as author; what it penalises is
 * a bare string or an unresolvable Person.
 *
 * FAQPage ships knowing Google restricted FAQ rich results to government and
 * health sites in August 2023, so it will not render one here. It costs nothing
 * (derived from frontmatter), stays valid schema, and Bing plus AI crawlers
 * still consume it — but it should never shape content strategy.
 */
export function postGraph(post: PostMeta) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const category = getCategory(post.category);

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      isPartOf: { "@id": BLOG_ID },
      mainEntityOfPage: { "@id": url },
      headline: post.title,
      description: post.description,
      image: [absoluteUrl(`/blog/${post.slug}/opengraph-image`)],
      // Full ISO-8601 to match the og:article timestamps — a bare date loses
      // the precision freshness signals read from dateModified.
      datePublished: new Date(`${post.date}T00:00:00Z`).toISOString(),
      dateModified: new Date(`${post.updated}T00:00:00Z`).toISOString(),
      author: { "@id": ORGANIZATION_ID },
      publisher: { "@id": ORGANIZATION_ID },
      articleSection: category?.label ?? post.category,
      keywords: post.tags,
      inLanguage: "en-US",
      url,
    },
    breadcrumbList(
      [
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        ...(category
          ? [{ name: category.label, path: `/blog/category/${category.slug}` }]
          : []),
        { name: post.title },
      ],
      `${url}#breadcrumb`,
    ),
  ];

  if (post.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: post.faq.map((entry) => ({
        "@type": "Question",
        name: entry.q,
        acceptedAnswer: { "@type": "Answer", text: entry.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/** Index and category hubs. ItemList carries URLs only — restating article
 *  fields here would duplicate the post graphs and let the two drift. */
export function postListGraph(options: {
  posts: PostMeta[];
  path: string;
  name: string;
  description: string;
  breadcrumbs: Array<{ name: string; path?: string }>;
  isBlogRoot?: boolean;
}) {
  const url = absoluteUrl(options.path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": options.isBlogRoot ? "Blog" : "CollectionPage",
        "@id": options.isBlogRoot ? BLOG_ID : `${url}#collection`,
        url,
        name: options.name,
        description: options.description,
        inLanguage: "en-US",
        publisher: { "@id": ORGANIZATION_ID },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: options.posts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: absoluteUrl(`/blog/${post.slug}`),
          })),
        },
      },
      breadcrumbList(options.breadcrumbs, `${url}#breadcrumb`),
    ],
  };
}
