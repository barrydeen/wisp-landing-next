"use client";

import { useState, useEffect } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-panel border-b border-[#1a1a1a]/50"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <a href="#" className="text-lg font-semibold tracking-tight">
          <span className="gradient-text">wisp</span>
        </a>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/barrydeen/wisp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#555] transition-colors hover:text-[#999]"
          >
            GitHub
          </a>
          <a
            href="https://github.com/barrydeen/wisp/releases/download/v0.14.1-beta/app-release.apk"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#f97316] px-4 py-1.5 text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]"
          >
            Download
          </a>
        </div>
      </div>
    </nav>
  );
}
