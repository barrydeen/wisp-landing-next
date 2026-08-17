import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async redirects() {
    return [
      // Page 1 lives at /blog. Without this, /blog/page/1 would be a duplicate
      // of it competing for the same query.
      { source: "/blog/page/1", destination: "/blog", permanent: true },
    ];
  },
};

// NOTE: createMDX unconditionally attaches a webpack() config, and Next 16
// aborts a Turbopack build that has a webpack config and no turbopack config.
// It survives only because createMDX *also* sets nextConfig.turbopack. Do not
// hand-add a `turbopack` key here — overwriting its resolveAlias breaks the
// MDX import source resolution.
//
// Plugins are named as STRINGS, not imported. Turbopack cannot receive JS
// function references across the JS↔Rust boundary; @next/mdx's loader resolves
// these names in-process, so the same config works on both bundlers.
// pageExtensions is deliberately omitted — createMDX never reads it, and it
// only exists to make app/**/page.mdx routable, which this setup doesn't use.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
