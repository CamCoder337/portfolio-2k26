import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { client } from "@/sanity/client";
import { SITEMAP_QUERY } from "@/sanity/queries";

/** Routes that exist regardless of what is in the dataset. */
const staticRoutes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/work", priority: 0.9 },
  { path: "/about", priority: 0.8 },
  { path: "/contact", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: new URL(route.path, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route.priority,
  }));

  /* The raw client, not `sanityFetch`: a sitemap is generated outside the
     request scope the live fetch needs, and must never see drafts. A failure
     here should cost the project URLs, not the whole file. */
  try {
    const rows = await client
      .withConfig({ useCdn: false, stega: false, perspective: "published" })
      .fetch(SITEMAP_QUERY);

    for (const row of rows) {
      if (!row.slug) continue;
      entries.push({
        url: new URL(`/work/${row.slug}`, site.url).toString(),
        lastModified: new Date(row._updatedAt),
        changeFrequency: "yearly",
        priority: 0.6,
      });
    }
  } catch (error) {
    console.error("Sitemap: could not read projects from Sanity.", error);
  }

  return entries;
}
