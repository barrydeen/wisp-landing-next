"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Download } from "lucide-react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-400 ${
        scrolled ? "glass-panel border-b border-[#261f36]/60" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-display font-bold tracking-tight">
          <Image
            src="/wisp-logo.svg"
            alt="Wisp"
            width={28}
            height={28}
            priority
            className="drop-shadow-[0_0_12px_rgba(255,122,26,0.45)]"
          />
          <span className="text-white">wisp</span>
        </Link>

        <a
          href="https://github.com/barrydeen/wisp/releases/latest"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink via-accent to-yellow px-4 py-2 text-sm font-semibold text-[#0f0d14] shadow-[0_8px_24px_-10px_rgba(255,122,26,0.7)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          <Download size={14} strokeWidth={2.5} />
          Get Wisp
        </a>
      </div>
    </nav>
  );
}
