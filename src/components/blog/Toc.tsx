import { clsx } from "clsx";
import type { TocEntry } from "@/types/blog";

/** A TOC of one or two items is visual noise that just pushes content down. */
export const TOC_MIN_HEADINGS = 3;

export function shouldRenderToc(toc: TocEntry[]): boolean {
  return toc.filter((entry) => entry.depth === 2).length >= TOC_MIN_HEADINGS;
}

interface TocListProps {
  toc: TocEntry[];
  className?: string;
}

/**
 * Rendered on the server with real anchors, so it works with JS disabled and is
 * present in the initial HTML — which is what makes Google eligible to show
 * "jump to" deep links under the result. A client-side DOM walk would ship an
 * empty <nav> to crawlers and either cause CLS or need a placeholder.
 *
 * The mobile and desktop copies both emit data-toc-link; TocHighlight matches
 * on the attribute value, so it drives whichever copy is visible.
 */
function TocList({ toc, className }: TocListProps) {
  return (
    <ol className={clsx("space-y-2 text-sm", className)}>
      {toc.map((entry) => (
        <li key={entry.id} className={entry.depth === 3 ? "pl-4" : undefined}>
          <a
            href={`#${entry.id}`}
            data-toc-link={entry.id}
            className="block text-[#9d95b3] transition-colors hover:text-white data-[active=true]:text-accent"
          >
            {entry.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

interface TocProps {
  toc: TocEntry[];
}

/** Sticky sidebar. The 260px column width is declared in the parent grid
 *  template, so the article column's width is known before this paints. */
export function TocSidebar({ toc }: TocProps) {
  return (
    <nav
      aria-labelledby="toc-heading"
      className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block"
    >
      <h2
        id="toc-heading"
        className="mb-3 font-display text-xs font-semibold uppercase tracking-wider text-[#6b647c]"
      >
        On this page
      </h2>
      <TocList toc={toc} />
    </nav>
  );
}

/** Collapsed <details> above the article. A closed <details> has a
 *  deterministic single-row height, identical server- and client-side, so it
 *  contributes nothing to CLS. */
export function TocMobile({ toc }: TocProps) {
  return (
    <details className="mb-8 rounded-2xl border border-[#261f36] bg-[#17141f] px-5 py-4 lg:hidden">
      <summary className="cursor-pointer font-display text-sm font-semibold text-white marker:text-[#6b647c]">
        On this page
      </summary>
      <nav aria-label="Table of contents" className="mt-4">
        <TocList toc={toc} />
      </nav>
    </details>
  );
}
