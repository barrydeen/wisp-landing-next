import Link from "next/link";
import Image from "next/image";
import { OWNER_NPUB } from "@/lib/nostr";

export function Footer() {
  return (
    <footer className="border-t border-[#261f36] bg-[#0b0910] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-[#6b647c]">
          <Image src="/wisp-logo.svg" alt="Wisp" width={18} height={18} />
          <span className="font-display font-semibold text-[#9d95b3]">wisp</span>
          <span>· &copy; {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-[#9d95b3]">
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy
          </Link>
          <Link href="/safety" className="transition-colors hover:text-white">
            Safety
          </Link>
          <a
            href="https://github.com/barrydeen/wisp"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            GitHub
          </a>
          <a
            href={`https://njump.me/${OWNER_NPUB}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            Nostr
          </a>
        </div>
      </div>
    </footer>
  );
}
