import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

/** Shared shell for every blog route. The legal pages each duplicate their own
 *  inline nav and footer; the blog uses the real components instead. */
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-28">{children}</main>
      <Footer />
    </>
  );
}
