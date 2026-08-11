import { PillButton } from "@/components/ui/buttons";

export function MoreWork({ projectCount }: { projectCount: number }) {
  return (
    <section className="shell grid place-items-center py-[clamp(2rem,5vw,4.5rem)]">
      <PillButton href="/work" count={projectCount}>
        More work
      </PillButton>
    </section>
  );
}
