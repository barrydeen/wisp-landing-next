/**
 * Long-form body styling, extracted from the idiom the legal pages established
 * so /privacy, /safety, and every blog post share one definition.
 *
 * Deliberately not @tailwindcss/typography: the JIT emits only the rules these
 * arbitrary variants actually reference, whereas the plugin ships its whole
 * cascade plus a --tw-prose-* custom-property layer regardless of use, and on a
 * dark-only site you additionally pay for prose-invert and an override chain to
 * map its greys onto our palette. CSS is render-blocking, so that lands
 * directly on LCP.
 *
 * scroll-mt-24 on headings is load-bearing: the nav is `fixed`, so without it
 * every TOC anchor jump parks the target heading underneath it.
 */
export const proseClass = [
  "text-[15px] leading-relaxed text-[#c9c3d9]",
  "[&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:scroll-mt-24 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-white",
  "[&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:scroll-mt-24 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white",
  "[&_p]:mb-4",
  "[&_strong]:font-semibold [&_strong]:text-white",
  "[&_a]:text-accent [&_a]:underline-offset-2 [&_a:hover]:underline",
  "[&_ul]:mb-4 [&_ul]:pl-5 [&_ul]:list-disc",
  "[&_ol]:mb-4 [&_ol]:pl-5 [&_ol]:list-decimal",
  "[&_li]:mb-2 [&_li]:marker:text-[#6b647c]",
  "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:text-[#9d95b3] [&_blockquote]:italic",
  "[&_code]:rounded [&_code]:bg-[#1f1b2b] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[13px] [&_code]:text-[#4dd8ff]",
  "[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:border [&_pre]:border-[#261f36] [&_pre]:bg-[#17141f] [&_pre]:p-4 [&_pre]:text-[13px]",
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-[#c9c3d9]",
  "[&_hr]:my-10 [&_hr]:border-[#261f36]",
  "[&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-left [&_table]:text-sm",
  "[&_th]:border-b [&_th]:border-[#322944] [&_th]:pb-2 [&_th]:pr-4 [&_th]:font-display [&_th]:font-semibold [&_th]:text-white",
  "[&_td]:border-b [&_td]:border-[#261f36] [&_td]:py-2 [&_td]:pr-4 [&_td]:align-top",
  "[&_figure]:my-6",
  "[&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-[#6b647c]",
  "[&_img]:rounded-2xl [&_img]:border [&_img]:border-[#261f36]",
].join(" ");
