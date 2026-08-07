import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { CurveLip } from "@/components/ui/curve-lip";
import { Footer } from "@/components/sections/footer";
import { Media } from "@/components/ui/media";
import { MaskedWords } from "@/components/ui/masked-words";
import { LineGlobe } from "@/components/sections/line-globe";
import { services } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main>
      <PageHeader lines={["Helping brands thrive", "in the digital world"]} />

      <LineGlobe />

      {/* Portrait + statement */}
      <section className="shell grid gap-12 py-[clamp(3rem,8vw,7rem)] lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-mute">
          <Media
            src="/media/about/portrait.jpg"
            alt="Dennis at work"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col gap-[clamp(3rem,6vw,5rem)]">
          <MaskedWords
            as="h2"
            text="I help companies from all over the world with tailor-made solutions. With each project, I push my work to new horizons, always putting quality first."
            className="text-[clamp(1.4rem,2.3vw,2.15rem)] leading-[1.45]"
          />

          <div className="relative aspect-[3/2] w-full overflow-hidden bg-paper-mute">
            <Media
              src="/media/about/desk.jpg"
              alt="Always exploring"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <p className="absolute bottom-4 left-5 text-body text-paper mix-blend-difference">
              Always exploring...
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="shell py-[clamp(3rem,8vw,7rem)]">
        <p className="eyebrow mb-10">I can help you with ...</p>

        <ul className="border-t border-hair">
          {services.map((service) => (
            <li
              key={service.index}
              className="grid gap-4 border-b border-hair py-[clamp(2rem,4vw,3.5rem)] md:grid-cols-[4rem_1fr_1.2fr] md:gap-10"
            >
              <span className="eyebrow">{service.index}</span>
              <h3 className="text-[clamp(1.75rem,3vw,2.75rem)] leading-none">
                {service.title}
              </h3>
              <p className="max-w-xl text-body text-ink-soft">{service.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Awwwards jury */}
      <section className="shell grid gap-12 pb-[clamp(4rem,9vw,8rem)] lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05]">
            Awwwards
            <span className="block text-muted">judge &rsquo;19-25</span>
          </h2>
        </div>
        <div className="flex flex-col gap-10">
          <p className="max-w-xl text-body text-ink-soft">
            I am a proud member of the Awwwards International Jury, where I judge
            the best websites in the world using my expertise as a designer and
            developer. Micro animations and transitions have my full attention and
            get me thrilled with every move.
          </p>
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-mute">
            <Media
              src="/media/about/cutout.jpg"
              alt="Portrait"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <CurveLip />
      <Footer />
    </main>
  );
}
