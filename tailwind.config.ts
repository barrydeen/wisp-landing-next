import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0d0d0d",
        "surface-2": "#111111",
        border: "#1a1a1a",
        "border-2": "#252525",
        accent: "#f97316",
        "accent-dark": "#ea580c",
        "accent-glow": "rgba(249, 115, 22, 0.15)",
        "accent-soft": "rgba(249, 115, 22, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "scroll-avatars": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "bolt-drift": {
          "0%": { opacity: "0", transform: "translateY(20px) scale(0.8)" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translateY(-100vh) scale(0.6)" },
        },
        "note-slide-in": {
          from: { opacity: "0", transform: "translateY(-15px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "scroll-avatars": "scroll-avatars 40s linear infinite",
        "bolt-drift": "bolt-drift var(--bolt-duration, 15s) linear forwards",
        "note-slide-in": "note-slide-in 0.5s ease-out",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
