import { site, socialLinks } from "@/lib/site";

/**
 * Structured data builders.
 *
 * Hand-written objects rather than a typed helper library: these are four
 * small shapes that change about once a year, and a dependency whose only
 * output is types would not earn its place in the lockfile.
 *
 * The `Person` node carries a stable `@id` so the other nodes can point at it
 * instead of repeating it.
 */

/** Site-relative path to the absolute URL search engines need. */
export function absolute(path: string) {
  return new URL(path, site.url).toString();
}

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

export function personSchema(description: string = site.description) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: site.name,
    url: site.url,
    jobTitle: site.role,
    description,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    image: absolute(site.avatar),
    address: {
      "@type": "PostalAddress",
      addressCountry: "CM",
      addressLocality: site.location,
    },
    knowsAbout: [
      "Software engineering",
      "Quality assurance",
      "Test automation",
      "Web development",
    ],
    sameAs: socialLinks.map((link) => link.href),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": personId },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: absolute(step.path),
    })),
  };
}

export function creativeWorkSchema(project: {
  title: string;
  slug: string;
  discipline?: string;
  year?: string;
  description?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    url: absolute(`/work/${project.slug}`),
    creator: { "@id": personId },
    ...(project.discipline ? { genre: project.discipline } : {}),
    ...(project.year ? { dateCreated: project.year } : {}),
    ...(project.description ? { description: project.description } : {}),
    ...(project.image ? { image: project.image } : {}),
  };
}
