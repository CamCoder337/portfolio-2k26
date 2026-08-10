import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { ContactForm } from "@/components/sections/contact-form";
import { UnderlineLink } from "@/components/ui/buttons";
import { ArrowUpRight } from "@/components/ui/icons";
import { FooterMeta } from "@/components/sections/footer";
import { business, site, socialLinks } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="min-h-svh bg-ink text-paper">
      <PageHeader lines={["Let's start a", "project together"]} dark avatar />

      <div className="shell pb-[clamp(4rem,9vw,8rem)]">
        <ContactForm />

        <div className="mt-[clamp(4rem,9vw,8rem)] grid gap-10 sm:grid-cols-3">
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

      <FooterMeta className="shell border-t border-hair-light py-10" />
    </main>
  );
}
