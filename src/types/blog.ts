export interface PostFaq {
  q: string;
  a: string;
}

export interface TocEntry {
  /** Heading id, generated with github-slugger so it matches rehype-slug exactly. */
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface PostMeta {
  slug: string;
  /** The on-page <h1>. May run long; schema.org caps headline at 110 chars. */
  title: string;
  /** The <title> tag. Falls back to `title` when frontmatter omits it — set it
   *  when the headline is too long to survive SERP truncation (~60 chars). */
  seoTitle: string;
  description: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** ISO date, YYYY-MM-DD. Falls back to `date` when frontmatter omits it. */
  updated: string;
  category: string;
  tags: string[];
  /** Used for the OG card and the index thumbnail — never as an in-page hero. */
  image: string;
  imageAlt: string;
  faq: PostFaq[];
  draft: boolean;
  /** True when the MDX body already renders a <CTA />. */
  hasInlineCta: boolean;
  /** True when the MDX body has its own "Frequently Asked Questions" section.
   *  frontmatter faq[] then feeds only the FAQPage schema. */
  hasInlineFaq: boolean;
  toc: TocEntry[];
  readingMinutes: number;
}
