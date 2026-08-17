import categories from "@/lib/blog-categories.json";

export interface BlogCategory {
  /** URL segment: /blog/category/<slug>. Frontmatter stores this, not the label,
   *  so a typo fails validation instead of creating an orphan hub. */
  slug: string;
  label: string;
  /** Meta description for the hub page. */
  description: string;
}

/** Source of truth is the JSON file, which scripts/build-blog-index.mjs reads
 *  too — the validator and the app can never disagree about what exists. */
export const blogCategories: BlogCategory[] = categories;

export function getCategory(slug: string): BlogCategory | undefined {
  return blogCategories.find((category) => category.slug === slug);
}
