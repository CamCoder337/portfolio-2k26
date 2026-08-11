import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { WorkGrid } from "@/components/sections/work-grid";
import { WorkTiles } from "@/components/sections/work-tiles";
import { MoreWork } from "@/components/sections/more-work";
import { Showcase } from "@/components/sections/showcase";
import { CurveLip } from "@/components/ui/curve-lip";
import { Footer } from "@/components/sections/footer";
import { getProjects } from "@/lib/work";

export default async function Home() {
  const projects = await getProjects();
  const featured = projects.slice(0, 4);

  return (
    <main>
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
