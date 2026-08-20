/**
 * Emits one structured-data block.
 *
 * A `<script type="application/ld+json">` is not executed by the browser, so
 * `dangerouslySetInnerHTML` here writes data, not code. `JSON.stringify` is
 * still the only thing that ever produces the string — never template
 * interpolation, which is where injection would come from.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
