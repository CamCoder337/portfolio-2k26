import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { WorkGrid } from "@/components/sections/work-grid";
import { WorkTiles } from "@/components/sections/work-tiles";
import { CurveLip } from "@/components/ui/curve-lip";
import { Footer } from "@/components/sections/footer";
import { getProjects } from "@/lib/work";

export const metadata: Metadata = { title: "Work" };

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <main>
      <PageHeader lines={["Creating next level", "digital products"]}>
        <div className="mt-12 flex items-baseline justify-between border-t border-hair pt-4">
          <p className="eyebrow">All projects</p>
          <p className="eyebrow">{projects.length}</p>
        </div>
      </PageHeader>

      <WorkGrid items={projects} detailed heading="" />
      <WorkTiles items={projects} />

      <CurveLip />
      <Footer />
    </main>
  );
}
