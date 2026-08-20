import { ogCard, ogContentType, ogSize } from "@/lib/og-card";
import { getProfileMeta } from "@/lib/about";
import { site } from "@/lib/site";

export const alt = `About ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  const profile = await getProfileMeta();

  return ogCard({
    eyebrow: `${site.name} — About`,
    title: profile?.headline.join(" ") || "About",
    subtitle: site.role,
  });
}
