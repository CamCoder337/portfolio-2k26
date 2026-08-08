import { MaskedWords } from "@/components/ui/masked-words";
import { RoundButton } from "@/components/ui/buttons";

const statement =
  "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.";

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
            The combination of my passion for design, code &amp; interaction
            positions me in a unique place in the web design world.
          </p>
          <RoundButton href="/about">About me</RoundButton>
        </div>
      </div>
    </section>
  );
}
