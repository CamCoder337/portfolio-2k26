import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseFooter } from "@/components/sections/footer";
import { CurveLip } from "@/components/ui/curve-lip";
import { CaseHeader } from "@/components/sections/case-header";
import { CaseBlocks } from "@/components/sections/case-blocks";
import { caseStudies, getNextProject, getProject, projects } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: getProject(slug)?.title ?? "Work" };
}

export default async function CasePage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const study = caseStudies[slug];
  const next = getNextProject(slug);

  return (
    <main>
      <CaseHeader project={project} study={study} />
      {study && <CaseBlocks study={study} />}
      <CurveLip />
      <CaseFooter next={next} />
    </main>
  );
}
