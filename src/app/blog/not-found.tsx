import Link from "next/link";

export default function BlogNotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="font-display text-3xl font-bold tracking-tight text-white">
        Post not found
      </h1>
      <p className="mx-auto mt-3 max-w-md text-[#9d95b3]">
        That link doesn&apos;t point at anything we&apos;ve published. It may
        have moved, or never existed.
      </p>
      <Link
        href="/blog"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink via-accent to-yellow px-6 py-3 text-[15px] font-semibold text-[#0f0d14]"
      >
        Browse the blog
      </Link>
    </div>
  );
}
