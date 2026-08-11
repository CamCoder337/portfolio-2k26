import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseFooter } from "@/components/sections/footer";
import { CurveLip } from "@/components/ui/curve-lip";
import { CaseHeader } from "@/components/sections/case-header";
import { CaseBlocks } from "@/components/sections/case-blocks";
import { getProjectPage, getProjectSlugs, getProjectTitle } from "@/lib/work";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: (await getProjectTitle(slug)) ?? "Work" };
}

export default async function CasePage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const page = await getProjectPage(slug);
  if (!page) notFound();

  const { project, study, next, projectCount } = page;

  return (
    <main>
      <CaseHeader project={project} study={study} />
      {study && <CaseBlocks study={study} />}
      <CurveLip />
      <CaseFooter next={next} projectCount={projectCount} />
    </main>
  );
}
