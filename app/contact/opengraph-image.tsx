import { ogCard, ogContentType, ogSize } from "@/lib/og-card";
import { site } from "@/lib/site";

export const alt = `Contact ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return ogCard({
    eyebrow: `${site.name} — ${site.role}`,
    title: "Let's work together",
    subtitle: site.email,
  });
}
