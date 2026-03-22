"use client";

import { useEffect } from "react";

export function FloatingBolts() {
  useEffect(() => {
    function spawnBolt() {
      const bolt = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      bolt.setAttribute("viewBox", "0 0 24 24");
      const size = 14 + Math.random() * 18;
      bolt.setAttribute("width", String(size));
      bolt.setAttribute("height", String(size));
      bolt.innerHTML =
        '<path d="M13 3L4 14h5l-2 7 9-11h-5l2-7z" fill="rgba(249,115,22,0.05)"/>';
      bolt.style.position = "fixed";
      bolt.style.left = Math.random() * 100 + "vw";
      bolt.style.bottom = "-30px";
      bolt.style.pointerEvents = "none";
      bolt.style.zIndex = "1";
      const dur = 12 + Math.random() * 18;
      bolt.style.animation = `bolt-drift ${dur}s linear forwards`;
      document.body.appendChild(bolt);
      const timeout = setTimeout(() => bolt.remove(), dur * 1000);
      return { bolt, timeout };
    }

    // Initial spawns
    const spawned: Array<{ bolt: SVGSVGElement; timeout: ReturnType<typeof setTimeout> }> = [];
    const t1 = setTimeout(() => spawned.push(spawnBolt()), 500);
    const t2 = setTimeout(() => spawned.push(spawnBolt()), 1500);

    const interval = setInterval(() => {
      spawned.push(spawnBolt());
    }, 6000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
      spawned.forEach(({ bolt, timeout }) => {
        clearTimeout(timeout);
        bolt.remove();
      });
    };
  }, []);

  return null;
}
