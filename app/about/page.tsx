import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/sections/page-header";
import { CurveLip } from "@/components/ui/curve-lip";
import { Footer } from "@/components/sections/footer";
import { Media } from "@/components/ui/media";
import { MaskedWords } from "@/components/ui/masked-words";
import { LineGlobe } from "@/components/sections/line-globe";
import { AboutPractice } from "@/components/sections/about-practice";
import { AboutServices } from "@/components/sections/about-services";
import { AboutPassions } from "@/components/sections/about-passions";
import { AboutTimeline } from "@/components/sections/about-timeline";
import { JsonLd } from "@/components/ui/json-ld";
import { getProfile, getProfileMeta } from "@/lib/about";
import { getResumeUrl } from "@/lib/resume";
import { breadcrumbSchema, personSchema } from "@/lib/schema-org";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfileMeta();

  const title = profile?.seo.title ?? "About";
  const description =
    profile?.seo.description ??
    profile?.statement ??
    `${site.name} — ${site.role}, based in ${site.location}.`;

  return {
    title,
    description,
    alternates: { canonical: "/about" },
    openGraph: { title, description, url: "/about", type: "profile" },
    ...(profile?.seo.noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function AboutPage() {
  const [profile, resumeUrl] = await Promise.all([getProfile(), getResumeUrl()]);
  if (!profile) notFound();

  return (
    <main>
      <JsonLd data={personSchema(profile.statement)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <PageHeader lines={profile.headline} />

      <LineGlobe />

      {/* Portrait + statement */}
      <section className="shell grid gap-12 py-[clamp(3rem,8vw,7rem)] lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-mute">
          <Media
            src={profile.portrait.src}
            alt={profile.portrait.alt}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col gap-[clamp(3rem,6vw,5rem)]">
          <MaskedWords
            as="h2"
            text={profile.statement}
            className="text-[clamp(1.4rem,2.3vw,2.15rem)] leading-[1.45]"
          />

          {profile.secondary && (
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-paper-mute">
              <Media
                src={profile.secondary.src}
                alt={profile.secondary.alt}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {profile.secondary.caption && (
                <p className="absolute bottom-4 left-5 text-body text-paper mix-blend-difference">
                  {profile.secondary.caption}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      <AboutPractice items={profile.practice} />

      <AboutServices items={profile.services} />

      <AboutPassions items={profile.passions} />

      <AboutTimeline items={profile.timeline} />

      <CurveLip />
      <Footer resumeUrl={resumeUrl} />
    </main>
  );
}
