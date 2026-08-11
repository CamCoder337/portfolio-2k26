import type { Project } from "@/lib/work";
import { TransitionLink } from "@/components/ui/transition-link";
import { Media } from "@/components/ui/media";

/** Stacked tile variant of the work list, used on narrow viewports. */
export function WorkTiles({ items }: { items: Project[] }) {
  return (
    <section className="shell pb-12 md:hidden">
      <p className="eyebrow mb-6">Recent work</p>
      <ul className="flex flex-col gap-10">
        {items.map((project) => (
          <li key={project.slug}>
            <TransitionLink
              href={`/work/${project.slug}`}
              className="flex flex-col gap-4"
            >
              {/* Square, as on the reference's small-screen tiles. */}
              <div
                className="relative aspect-square w-full overflow-hidden"
                style={{ backgroundColor: project.tint }}
              >
                <Media
                  src={project.thumb}
                  alt={project.title}
                  sizes="100vw"
                  tint={project.tint}
                />
              </div>
              <div className="flex items-baseline justify-between border-b border-hair pb-3">
                <h3 className="text-[1.97rem] leading-none">{project.title}</h3>
                <span className="text-body text-muted">{project.year}</span>
              </div>
              <p className="text-body text-ink-soft">{project.discipline}</p>
            </TransitionLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
