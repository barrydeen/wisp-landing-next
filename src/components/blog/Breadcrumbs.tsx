import Link from "next/link";

export interface Crumb {
  name: string;
  /** Omitted on the final crumb — the current page is not a link to itself. */
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

/** Visible breadcrumbs must mirror the BreadcrumbList JSON-LD 1:1 — Google
 *  requires structured data to correspond to content the user can see. */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[#6b647c]">
        {items.map((item, index) => (
          <li key={item.name} className="flex items-center gap-1.5">
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-white"
              >
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-[#9d95b3]">
                {item.name}
              </span>
            )}
            {index < items.length - 1 && (
              <span aria-hidden="true" className="text-[#322944]">
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
