import Link from "next/link";

interface PaginationProps {
  current: number;
  total: number;
}

/** Page 1 is always /blog — /blog/page/1 301s there, so only one URL ever
 *  represents it. No rel=next/prev: Google confirmed in 2019 it ignores them. */
function pageHref(page: number): string {
  return page === 1 ? "/blog" : `/blog/page/${page}`;
}

export function Pagination({ current, total }: PaginationProps) {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="mt-14 flex justify-center">
      <ul className="flex items-center gap-2">
        <li>
          {current > 1 ? (
            <Link
              href={pageHref(current - 1)}
              rel="prev"
              className="rounded-full border border-[#322944] px-4 py-2 text-sm text-[#9d95b3] transition-colors hover:border-[#4a3d66] hover:text-white"
            >
              Previous
            </Link>
          ) : (
            <span className="rounded-full border border-[#1f1b2b] px-4 py-2 text-sm text-[#6b647c]">
              Previous
            </span>
          )}
        </li>

        {pages.map((page) => (
          <li key={page}>
            {page === current ? (
              <span
                aria-current="page"
                className="rounded-full bg-[#1f1b2b] px-4 py-2 text-sm font-semibold text-white"
              >
                {page}
              </span>
            ) : (
              <Link
                href={pageHref(page)}
                className="rounded-full px-4 py-2 text-sm text-[#9d95b3] transition-colors hover:text-white"
              >
                {page}
              </Link>
            )}
          </li>
        ))}

        <li>
          {current < total ? (
            <Link
              href={pageHref(current + 1)}
              rel="next"
              className="rounded-full border border-[#322944] px-4 py-2 text-sm text-[#9d95b3] transition-colors hover:border-[#4a3d66] hover:text-white"
            >
              Next
            </Link>
          ) : (
            <span className="rounded-full border border-[#1f1b2b] px-4 py-2 text-sm text-[#6b647c]">
              Next
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
