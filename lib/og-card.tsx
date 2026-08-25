import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

/**
 * The one social card layout, shared by every route that has an
 * `opengraph-image` file.
 *
 * A file per segment rather than one at the root, because metadata merging is
 * shallow: a page that declares its own `openGraph` object replaces the
 * parent's outright, and the root card — which lives inside the root
 * `openGraph` — goes with it. Every route that sets `openGraph` therefore has
 * to bring its own image.
 *
 * Satori needs raw font bytes, not a CSS reference, so the file is read once
 * at module scope. It renders the OTF without complaint.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const display = await readFile(
  join(process.cwd(), "app/fonts/NeueMontreal-Medium.otf"),
);

export function ogCard({
  eyebrow,
  title,
  subtitle,
  footer = site.domain,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  footer?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1c1d20",
          color: "#ffffff",
          padding: 72,
          fontFamily: "Neue Montreal",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#999d9e" }}>
          {eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 22 ? 76 : 104,
              lineHeight: 1,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 40, color: "#e98745" }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "#999d9e" }}>
          {footer}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Neue Montreal", data: display, style: "normal", weight: 500 },
      ],
    },
  );
}
