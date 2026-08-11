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

export const PROJECT_TITLE_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] { title }
`);

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    ${projectCard},
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
