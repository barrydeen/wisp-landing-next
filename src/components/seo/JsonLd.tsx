interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Native <script>, not next/script — JSON-LD is data, not executable code, and
 * next/script's loading strategies would delay or move it.
 *
 * The `<` escape is not optional: post titles and descriptions are
 * author-controlled strings that land inside a <script> body, where a literal
 * `</script>` sequence would close the tag and turn the rest into markup.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
