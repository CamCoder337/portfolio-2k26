import { MaskedWords } from "@/components/ui/masked-words";
import { RoundButton } from "@/components/ui/buttons";

const statement =
  "I help product teams ship software that holds up under load. No demos that break in prod architectures that are tested, monitored, and built to scale.";

export function Intro() {
  return (
    <section className="shell py-[clamp(5rem,12vw,11rem)]">
      <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
        <MaskedWords
          as="h2"
          text={statement}
          className="text-[clamp(1.4rem,2.3vw,2.15rem)] leading-[1.45]"
        />

        <div className="flex flex-col items-start gap-10 lg:pt-2">
          <p className="max-w-[14rem] text-body text-ink-soft md:max-w-md">
            The combination of my drive for quality, my passion for backend code & performance optimization positions me at the intersection of development and quality assurance.
          </p>
          <RoundButton href="/about">About me</RoundButton>
        </div>
      </div>
    </section>
  );
}
