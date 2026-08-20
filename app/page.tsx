import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { WorkGrid } from "@/components/sections/work-grid";
import { WorkTiles } from "@/components/sections/work-tiles";
import { MoreWork } from "@/components/sections/more-work";
import { Showcase } from "@/components/sections/showcase";
import { CurveLip } from "@/components/ui/curve-lip";
import { Footer } from "@/components/sections/footer";
import { JsonLd } from "@/components/ui/json-ld";
import { getProjects } from "@/lib/work";
import { personSchema, websiteSchema } from "@/lib/schema-org";
import { site } from "@/lib/site";

/* The root layout already sets the default title, so this page only adds
   what is route-specific. Its canonical stays "/" as declared there. */
export const metadata: Metadata = {
  description: site.description,
  openGraph: { url: "/", type: "website" },
};

export default async function Home() {
  const projects = await getProjects();
  const featured = projects.slice(0, 4);

  return (
    <main>
      <JsonLd data={personSchema()} />
      <JsonLd data={websiteSchema()} />

      <Hero />
      <Intro />
      <WorkGrid items={featured} />
      <WorkTiles items={featured} />
      <MoreWork projectCount={projects.length} />
      <Showcase />
      <CurveLip />
      <Footer />
    </main>
  );
}
