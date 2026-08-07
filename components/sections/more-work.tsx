import { PillButton } from "@/components/ui/buttons";
import { projectCount } from "@/lib/site";

export function MoreWork() {
  return (
    <section className="shell grid place-items-center py-[clamp(2rem,5vw,4.5rem)]">
      <PillButton href="/work" count={projectCount}>
        More work
      </PillButton>
    </section>
  );
}
