import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";
import { CTA } from "@/components/blog/CTA";
import { Callout } from "@/components/blog/Callout";

/**
 * The page template owns the only <h1> (the post title). Mapping h1 to a throw
 * turns a `# heading` in an MDX body into a build failure rather than a page
 * that ships with two h1s.
 */
function ForbiddenH1(): never {
  throw new Error(
    "MDX body contains an h1. The post template renders the only h1 — start the body at h2.",
  );
}

function MdxLink({
  href = "",
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

/**
 * Explicit width/height are required: without them next/image cannot reserve
 * space and every in-body image becomes a layout shift on slow connections.
 * Failing loudly at build beats discovering it in field CLS data.
 */
// Typed against the intrinsic <img> props, because that is what MDX passes for
// a markdown image; the narrowing to next/image's stricter props happens here.
function MdxImage({
  src,
  alt,
  width,
  height,
  title,
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (typeof src !== "string" || !src) {
    throw new Error("MDX image is missing a src.");
  }
  if (!width || !height) {
    throw new Error(
      `MDX image "${src}" is missing width/height. Both are required to prevent layout shift.`,
    );
  }

  return (
    <Image
      src={src}
      alt={alt ?? ""}
      title={title}
      width={Number(width)}
      height={Number(height)}
      sizes="(min-width: 1024px) 720px, 100vw"
      loading="lazy"
      decoding="async"
      style={{ width: "100%", height: "auto" }}
    />
  );
}

// Components listed here are available in every .mdx file without an import.
const components = {
  h1: ForbiddenH1,
  a: MdxLink,
  img: MdxImage,
  CTA,
  Callout,
} satisfies MDXComponents;

// Next 16: this function takes NO arguments. The older
// useMDXComponents(components) signature is gone.
export function useMDXComponents(): MDXComponents {
  return components;
}
