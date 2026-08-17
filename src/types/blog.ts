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
  title: string;
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
  toc: TocEntry[];
  readingMinutes: number;
}
