#!/usr/bin/env node
/**
 * Generates src/lib/blog-index.generated.ts from src/content/blog/*.mdx.
 *
 * This is the ONLY filesystem access in the blog module, and it runs at build
 * time via the `prebuild` npm lifecycle hook — never at request time. That is
 * deliberate: production runs under PM2 with `exec cwd` = /root, so any
 * runtime fs read of a relative content path would break. Paths here resolve
 * from import.meta.url, so this script is correct regardless of where it is
 * invoked from.
 *
 * Post *bodies* are never read by the app. They enter the bundle as compiled
 * modules via `await import("@/content/blog/<slug>.mdx")`.
 */
import { readFileSync, readdirSync, existsSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const CONTENT_DIR = join(ROOT, "src", "content", "blog");
const PUBLIC_DIR = join(ROOT, "public");
const OUT_FILE = join(ROOT, "src", "lib", "blog-index.generated.ts");
const CATEGORIES_FILE = join(ROOT, "src", "lib", "blog-categories.json");

/** These collide with the literal route segments under /blog. A post with one
 *  of these slugs would generate a route that can never be reached. */
const RESERVED_SLUGS = new Set(["page", "category"]);

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const WORDS_PER_MINUTE = 225;

const errors = [];

function fail(file, message) {
  errors.push({ file, message });
}

/**
 * Strips fenced code blocks and inline code before heading extraction.
 * Without this, a `# comment` inside a bash block becomes a phantom TOC entry —
 * the single most common bug in hand-rolled TOC extractors.
 */
function stripCode(markdown) {
  return markdown
    .replace(/^~~~[\s\S]*?^~~~/gm, "")
    .replace(/^```[\s\S]*?^```/gm, "")
    .replace(/`[^`\n]*`/g, "");
}

/** Removes inline markdown so the TOC label reads as plain text. */
function plainText(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

/**
 * Extracts h2/h3 headings and slugs them with github-slugger — the exact
 * library rehype-slug uses internally. A fresh instance per document, walked in
 * document order, reproduces rehype-slug's ids byte-for-byte including its
 * collision suffixes (setup, setup-1, setup-2). A hand-rolled slugifier
 * diverges on collisions and unicode, producing TOC links that go nowhere.
 */
function extractToc(markdown, file) {
  const slugger = new GithubSlugger();
  const toc = [];
  let previousDepth = null;

  for (const line of stripCode(markdown).split("\n")) {
    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const depth = match[1].length;
    const text = plainText(match[2]);
    if (!text) continue;

    if (depth === 1) {
      fail(
        file,
        `h1 "${text}" — the page template owns the only h1. Start the body at h2.`,
      );
      continue;
    }

    if (previousDepth !== null && depth > previousDepth + 1) {
      fail(
        file,
        `heading level skips from h${previousDepth} to h${depth} at "${text}".`,
      );
    }
    if (previousDepth === null && depth !== 2) {
      fail(file, `first heading is h${depth}; it must be h2.`);
    }
    previousDepth = depth;

    // Slug every heading so the counter stays in step with rehype-slug, but
    // only surface h2/h3 in the TOC — deeper levels are noise.
    const id = slugger.slug(text);
    if (depth <= 3) toc.push({ id, text, depth });
  }

  return toc;
}

function readingMinutes(markdown) {
  const words = stripCode(markdown).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function isIsoDate(value) {
  return (
    typeof value === "string" &&
    DATE_RE.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}

function validate(slug, data, file, categorySlugs) {
  if (!SLUG_RE.test(slug)) {
    fail(file, `filename "${slug}" must be lowercase kebab-case.`);
  }
  if (RESERVED_SLUGS.has(slug)) {
    fail(
      file,
      `slug "${slug}" is reserved — it collides with the /blog/${slug} route.`,
    );
  }

  if (typeof data.title !== "string" || !data.title.trim()) {
    fail(file, "title: required, must be a non-empty string.");
  } else if (data.title.length > 70) {
    fail(file, `title: ${data.title.length} chars, must be <= 70.`);
  }

  if (typeof data.description !== "string" || !data.description.trim()) {
    fail(file, "description: required, must be a non-empty string.");
  } else if (data.description.length < 50 || data.description.length > 160) {
    fail(
      file,
      `description: ${data.description.length} chars, must be 50-160 (it is the SERP snippet).`,
    );
  }

  if (!isIsoDate(data.date)) {
    fail(file, "date: required, must be YYYY-MM-DD.");
  }
  if (data.updated !== undefined && !isIsoDate(data.updated)) {
    fail(file, "updated: must be YYYY-MM-DD when present.");
  }
  if (isIsoDate(data.date) && isIsoDate(data.updated)) {
    if (Date.parse(data.updated) < Date.parse(data.date)) {
      fail(file, `updated (${data.updated}) is before date (${data.date}).`);
    }
  }

  if (typeof data.category !== "string" || !categorySlugs.has(data.category)) {
    fail(
      file,
      `category: "${data.category}" is not in blog-categories.json (${[...categorySlugs].join(", ")}).`,
    );
  }

  if (
    !Array.isArray(data.tags) ||
    data.tags.length === 0 ||
    !data.tags.every((t) => typeof t === "string" && t.trim())
  ) {
    fail(file, "tags: required, must be a non-empty array of strings.");
  }

  if (typeof data.image !== "string" || !data.image.trim()) {
    fail(file, "image: required.");
  } else if (data.image.startsWith("/")) {
    if (!existsSync(join(PUBLIC_DIR, data.image))) {
      fail(file, `image: "${data.image}" not found in public/.`);
    }
  } else if (!data.image.startsWith("https://")) {
    fail(file, `image: "${data.image}" must start with "/" or "https://".`);
  }

  if (typeof data.imageAlt !== "string" || !data.imageAlt.trim()) {
    fail(file, "imageAlt: required — it is the OG image alt text.");
  }

  if (data.faq !== undefined) {
    if (!Array.isArray(data.faq)) {
      fail(file, "faq: must be an array when present.");
    } else {
      data.faq.forEach((entry, i) => {
        if (
          !entry ||
          typeof entry.q !== "string" ||
          !entry.q.trim() ||
          typeof entry.a !== "string" ||
          !entry.a.trim()
        ) {
          fail(file, `faq[${i}]: needs both a non-empty "q" and "a".`);
        }
      });
    }
  }

  if (data.draft !== undefined && typeof data.draft !== "boolean") {
    fail(file, "draft: must be a boolean when present.");
  }
}

function main() {
  if (!existsSync(CONTENT_DIR)) {
    console.error(`✖ Blog content directory missing: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const categorySlugs = new Set(
    JSON.parse(readFileSync(CATEGORIES_FILE, "utf8")).map((c) => c.slug),
  );

  const files = readdirSync(CONTENT_DIR)
    .filter((name) => name.endsWith(".mdx") && !name.startsWith("_"))
    .sort();

  const posts = [];
  const seen = new Map();

  for (const name of files) {
    const slug = name.replace(/\.mdx$/, "");
    const relative = `src/content/blog/${name}`;

    if (seen.has(slug)) {
      fail(relative, `duplicate slug "${slug}" (also ${seen.get(slug)}).`);
      continue;
    }
    seen.set(slug, relative);

    const raw = readFileSync(join(CONTENT_DIR, name), "utf8");
    const { data, content } = matter(raw);

    validate(slug, data, relative, categorySlugs);
    const toc = extractToc(content, relative);

    const ids = new Set();
    for (const entry of toc) {
      if (ids.has(entry.id)) {
        fail(relative, `duplicate heading id "${entry.id}".`);
      }
      ids.add(entry.id);
    }

    posts.push({
      slug,
      title: String(data.title ?? ""),
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
      updated: String(data.updated ?? data.date ?? ""),
      category: String(data.category ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      image: String(data.image ?? ""),
      imageAlt: String(data.imageAlt ?? ""),
      faq: Array.isArray(data.faq)
        ? data.faq.map((f) => ({ q: String(f?.q ?? ""), a: String(f?.a ?? "") }))
        : [],
      draft: data.draft === true,
      toc,
      readingMinutes: readingMinutes(content),
    });
  }

  if (errors.length > 0) {
    const byFile = new Map();
    for (const { file, message } of errors) {
      if (!byFile.has(file)) byFile.set(file, []);
      byFile.get(file).push(message);
    }
    console.error(
      `\n✖ Blog frontmatter validation failed (${byFile.size} file${byFile.size === 1 ? "" : "s"}, ${errors.length} error${errors.length === 1 ? "" : "s"})\n`,
    );
    for (const [file, messages] of byFile) {
      console.error(`  ${file}`);
      for (const message of messages) console.error(`    • ${message}`);
      console.error("");
    }
    process.exit(1);
  }

  // Newest first; slug ascending as a deterministic tiebreak so the generated
  // file is byte-stable across machines and rebuilds.
  posts.sort((a, b) =>
    a.date === b.date
      ? a.slug.localeCompare(b.slug)
      : Date.parse(b.date) - Date.parse(a.date),
  );

  const body = `// AUTO-GENERATED by scripts/build-blog-index.mjs — do not edit.
// Regenerate with \`npm run blog:index\`.
import type { PostMeta } from "@/types/blog";

export const postIndex: PostMeta[] = ${JSON.stringify(posts, null, 2)};
`;

  writeFileSync(OUT_FILE, body, "utf8");

  const published = posts.filter((p) => !p.draft).length;
  console.log(
    `✓ blog index: ${published} published, ${posts.length - published} draft → src/lib/blog-index.generated.ts`,
  );
}

main();
