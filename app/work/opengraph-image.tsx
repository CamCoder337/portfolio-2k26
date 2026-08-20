import { ogCard, ogContentType, ogSize } from "@/lib/og-card";
import { getProjects } from "@/lib/work";
import { site } from "@/lib/site";

export const alt = `Selected work by ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  const projects = await getProjects();

  return ogCard({
    eyebrow: `${site.name} — ${site.role}`,
    title: "Selected work",
    subtitle: `${projects.length} projects, built and tested`,
  });
}
