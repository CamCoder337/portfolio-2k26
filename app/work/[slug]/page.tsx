import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseFooter } from "@/components/sections/footer";
import { CurveLip } from "@/components/ui/curve-lip";
import { CaseHeader } from "@/components/sections/case-header";
import { CaseBlocks } from "@/components/sections/case-blocks";
import { JsonLd } from "@/components/ui/json-ld";
import { getProjectMeta, getProjectPage, getProjectSlugs } from "@/lib/work";
import { breadcrumbSchema, creativeWorkSchema } from "@/lib/schema-org";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getProjectMeta(slug);
  if (!meta) return { title: "Work" };

  const title = meta.seo.title || meta.title;
  /* Falls back to the project's own facts rather than the site description,
     so two case pages never share one search result snippet. */
  const description =
    meta.seo.description ||
    `${meta.title} — ${[meta.discipline, meta.year].filter(Boolean).join(", ")}. Built by ${site.name}.`;

  return {
    title,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title,
      description,
      url: `/work/${slug}`,
      type: "article",
      ...(meta.seo.image ? { images: [meta.seo.image] } : {}),
    },
    ...(meta.seo.noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function CasePage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const page = await getProjectPage(slug);
  if (!page) notFound();

  const { project, study, next, projectCount } = page;

  return (
    <main>
      <JsonLd
        data={creativeWorkSchema({
          title: project.title,
          slug: project.slug,
          discipline: project.discipline,
          year: project.year,
          description: page.summary,
          image: project.thumb,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.title, path: `/work/${project.slug}` },
        ])}
      />

      <CaseHeader project={project} summary={page.summary} study={study} />
      {study && <CaseBlocks study={study} />}
      <CurveLip />
      <CaseFooter next={next} projectCount={projectCount} />
    </main>
  );
}
