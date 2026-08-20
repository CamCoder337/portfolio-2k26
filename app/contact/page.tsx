import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { ContactForm } from "@/components/sections/contact-form";
import { UnderlineLink } from "@/components/ui/buttons";
import { ArrowUpRight } from "@/components/ui/icons";
import { FooterMeta } from "@/components/sections/footer";
import { JsonLd } from "@/components/ui/json-ld";
import { business, site, socialLinks } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema-org";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project with ${site.name}. Freelance software engineering and QA, working remotely from ${site.location}.`,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact", url: "/contact", type: "website" },
};

export default function ContactPage() {
  return (
    <main className="min-h-svh bg-ink text-paper">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageHeader
        lines={["Let's start a", "project together"]}
        dark
        avatar
        narrow
      />

      {/* Two columns from md up — the reference keeps a 73/27 split at both
          768 and 1440, with the details stacked in the right column beside the
          form, not underneath it. Below md they collapse and move above it. */}
      <div className="shell-narrow grid gap-12 pb-[clamp(4rem,9vw,8rem)] md:grid-cols-[73%_27%] md:gap-0">
        <div className="order-2 md:order-none">
          <ContactForm />
        </div>

        <div className="order-1 flex flex-col gap-10 md:order-none md:mt-[clamp(3rem,8vw,7rem)] md:pl-[clamp(2rem,4.5vw,3.5rem)]">
          <div>
            <p className="eyebrow mb-3">Contact details</p>
            <ul className="flex flex-col gap-1">
              <li>
                <UnderlineLink href={`mailto:${site.email}`}>
                  {site.email}
                </UnderlineLink>
              </li>
              <li>
                <UnderlineLink href={site.phoneHref}>{site.phone}</UnderlineLink>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-3">Business details</p>
            <ul className="flex flex-col gap-1 text-body text-muted">
              {business.map((item) => (
                <li key={item.label}>{item.label}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-3">Socials</p>
            <ul className="flex flex-col gap-1">
              {socialLinks.map((social) => (
                <li key={social.href}>
                  <UnderlineLink href={social.href} external>
                    <span className="inline-flex items-center gap-1">
                      {social.label}
                      <ArrowUpRight className="size-2.5" />
                    </span>
                  </UnderlineLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <FooterMeta className="shell-narrow border-t border-hair-light py-10" />
    </main>
  );
}
