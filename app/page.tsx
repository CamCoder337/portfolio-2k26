import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { WorkGrid } from "@/components/sections/work-grid";
import { WorkTiles } from "@/components/sections/work-tiles";
import { MoreWork } from "@/components/sections/more-work";
import { Showcase } from "@/components/sections/showcase";
import { CurveLip } from "@/components/ui/curve-lip";
import { Footer } from "@/components/sections/footer";
import { featuredProjects } from "@/lib/site";

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <WorkGrid items={featuredProjects} />
      <WorkTiles items={featuredProjects} />
      <MoreWork />
      <Showcase />
      <CurveLip />
      <Footer />
    </main>
  );
}
