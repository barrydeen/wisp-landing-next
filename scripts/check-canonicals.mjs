#!/usr/bin/env node
/**
 * Fails the build if any prerendered page declares a canonical URL that is not
 * its own.
 *
 * This exists because of a real bug: the root layout used to set
 * `alternates.canonical` to the homepage. Next merges metadata shallowly, so
 * every child route inherited it and told Google it *was* the homepage. That is
 * invisible in review, catastrophic for indexing, and trivially reintroduced by
 * anyone adding a URL field to a layout. Now it is a build error, for every
 * route, not just blog ones.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const APP_DIR = join(ROOT, ".next", "server", "app");
const SITE_URL = "https://wisp.mobile";

const CANONICAL_RE =
  /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i;

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

/** .next/server/app/blog/foo.html -> /blog/foo ; index.html -> its directory. */
function routeFor(file) {
  const rel = relative(APP_DIR, file).split(sep).join("/");
  const withoutExt = rel.replace(/\.html$/, "");
  const path = withoutExt === "index" ? "/" : `/${withoutExt}`;
  return path.replace(/\/index$/, "") || "/";
}

if (!existsSync(APP_DIR)) {
  console.error(`✖ ${APP_DIR} not found — run next build first.`);
  process.exit(1);
}

const files = walk(APP_DIR);
const problems = [];
let checked = 0;

for (const file of files) {
  const route = routeFor(file);

  // Framework-internal pages (/_not-found, /_global-error) are noindex by
  // nature and correctly carry no canonical.
  if (route.startsWith("/_")) continue;

  const html = readFileSync(file, "utf8");
  const match = CANONICAL_RE.exec(html);

  if (!match) {
    problems.push(`${route} — no canonical link tag.`);
    continue;
  }

  checked += 1;
  const expected = new URL(route, SITE_URL).toString().replace(/\/$/, "") || SITE_URL;
  const actual = match[1].replace(/\/$/, "");

  if (actual !== expected) {
    problems.push(`${route} — canonical points at ${actual}, expected ${expected}`);
  }
}

if (problems.length > 0) {
  console.error(`\n✖ Canonical check failed (${problems.length} problem(s))\n`);
  for (const problem of problems) console.error(`  • ${problem}`);
  console.error("");
  process.exit(1);
}

console.log(`✓ canonicals: ${checked} prerendered page(s), each self-referencing`);
