import { defineQuery } from "next-sanity";

/** Fields every project card needs. */
const projectCard = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  discipline,
  country,
  year,
  thumb,
  tint
`;

/**
 * Metadata, resolved in the query rather than the component.
 *
 * `coalesce` means the frontend never has to ask "is there an override?" — it
 * reads one field that already holds the override, the page content, or an
 * empty string.
 */
const seoFields = /* groq */ `
  "seo": {
    "title": coalesce(seo.title, title, ""),
    "description": coalesce(seo.description, summary, ""),
    "image": seo.image,
    "noIndex": seo.noIndex == true
  }
`;

/** The whole work list, in editor-defined order. Drives the grids, the
 *  project count, and the "next case" cycle. */
export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(order asc) {
    ${projectCard}
  }
`);

/** Slug and title only — the page-transition curtain label. */
export const PROJECT_LABELS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(order asc) {
    "slug": slug.current,
    title
  }
`);

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] { "slug": slug.current }
`);

/** Everything `generateMetadata` needs for a case page, and nothing more. */
export const PROJECT_META_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    title,
    discipline,
    year,
    thumb,
    ${seoFields}
  }
`);

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    ${projectCard},
    summary,
    stack,
    caseStudy {
      services,
      credits,
      liveUrl,
      cover,
      logo,
      stage,
      blocks[] {
        _key,
        _type,
        _type == "caseDevice" => { videoUrl, poster, padBottom },
        _type == "caseFullWidth" => { videoUrl },
        _type == "caseMobileGallery" => { images[] { _key, ... } }
      }
    }
  }
`);

/**
 * The About singleton.
 *
 * Filtered on the type as well as the pinned id. The id alone would be enough
 * at runtime, but it tells TypeGen nothing about which type it matched, so the
 * generated result widens into a union covering every other document type.
 */
export const ABOUT_QUERY = defineQuery(`
  *[_type == "about" && _id == "about"][0] {
    headline,
    statement,
    portrait,
    secondary,
    practice[] { _key, label, body, tools },
    services[] { _key, title, body },
    passions[] { _key, name, body, trait, image },
    timeline[] { _key, year, title, body },
    "seo": {
      "title": coalesce(seo.title, ""),
      "description": coalesce(seo.description, ""),
      "image": seo.image,
      "noIndex": seo.noIndex == true
    }
  }
`);

/** Slugs and edit times for the sitemap. Pages hidden from search drop out. */
export const SITEMAP_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current) && seo.noIndex != true] | order(order asc) {
    "slug": slug.current,
    _updatedAt
  }
`);
