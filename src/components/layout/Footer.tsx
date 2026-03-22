import { OWNER_NPUB } from "@/lib/nostr";

export function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between">
        <div className="text-sm text-[#555]">
          &copy; {new Date().getFullYear()} Wisp
        </div>
        <div className="flex items-center gap-6 text-sm text-[#888]">
          <a href="/privacy" className="transition-colors hover:text-[#f0f0f0]">
            Privacy
          </a>
          <a href="/safety" className="transition-colors hover:text-[#f0f0f0]">
            Safety
          </a>
          <a
            href="https://github.com/barrydeen/wisp"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#f0f0f0]"
          >
            GitHub
          </a>
          <a
            href={`https://njump.me/${OWNER_NPUB}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#f0f0f0]"
          >
            Nostr
          </a>
        </div>
      </div>
    </footer>
  );
}
