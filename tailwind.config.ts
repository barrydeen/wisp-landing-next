import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0f0d14",
        surface: "#17141f",
        "surface-2": "#1f1b2b",
        border: "#261f36",
        "border-2": "#322944",
        text: "#f5f1ff",
        "text-muted": "#9d95b3",
        "text-dim": "#6b647c",
        accent: "#ff7a1a",
        "accent-dark": "#e6610a",
        pink: "#ff4d8f",
        violet: "#9b7bff",
        cyan: "#4dd8ff",
        yellow: "#ffd84d",
        mint: "#4cf2a8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "system-ui", "sans-serif"],
      },
      keyframes: {
        "scroll-avatars": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "sticker-float": {
          "0%, 100%": { transform: "translate(0,0) rotate(var(--tilt,0deg))" },
          "50%": { transform: "translate(var(--dx,10px), var(--dy,-14px)) rotate(calc(var(--tilt,0deg) + 6deg))" },
        },
        "sticker-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "phone-hover": {
          "0%, 100%": { transform: "translateY(0) rotate(var(--phone-tilt,0deg))" },
          "50%": { transform: "translateY(-10px) rotate(calc(var(--phone-tilt,0deg) - 0.5deg))" },
        },
        "note-slide-in": {
          from: { opacity: "0", transform: "translateY(-15px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "blob-drift": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(30px,-20px) scale(1.05)" },
          "66%": { transform: "translate(-20px,25px) scale(0.97)" },
        },
      },
      animation: {
        "scroll-avatars": "scroll-avatars 40s linear infinite",
        "sticker-float": "sticker-float var(--float-duration, 6s) ease-in-out infinite",
        "sticker-spin": "sticker-spin var(--spin-duration, 22s) linear infinite",
        "phone-hover": "phone-hover 7s ease-in-out infinite",
        "note-slide-in": "note-slide-in 0.5s ease-out",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "blob-drift": "blob-drift 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
