import { ogCard, ogContentType, ogSize } from "@/lib/og-card";
import { getProjectMeta, getProjectSlugs } from "@/lib/work";
import { site } from "@/lib/site";

export const alt = "Case study";
export const size = ogSize;
export const contentType = ogContentType;

/* Without this the card is generated on demand, so the first crawler to
   ask for it waits on a Sanity round trip and a font rasterisation. */
export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectMeta(slug);

  return ogCard({
    eyebrow: `${site.name} — Selected work`,
    title: project?.title ?? "Work",
    subtitle: [project?.discipline, project?.year].filter(Boolean).join(" · "),
  });
}
