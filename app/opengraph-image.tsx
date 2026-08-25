import { ogCard, ogContentType, ogSize } from "@/lib/og-card";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return ogCard({
    eyebrow: site.domain,
    title: site.name,
    subtitle: site.role,
    footer: site.tagline,
  });
}
