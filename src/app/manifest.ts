import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wisp — Social that's actually fun again",
    short_name: "Wisp",
    description:
      "Your group chat, your favorite creators, your money — in one app. Free for Android.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0d14",
    theme_color: "#0f0d14",
    icons: [
      { src: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { src: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
