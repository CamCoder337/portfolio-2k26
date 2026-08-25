import { stegaClean } from "next-sanity";
import type {
  PROJECTS_QUERY_RESULT,
  PROJECT_QUERY_RESULT,
} from "@/sanity.types";
import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import { imageUrl } from "@/sanity/image";
import {
  PROJECTS_QUERY,
  PROJECT_LABELS_QUERY,
  PROJECT_QUERY,
  PROJECT_SLUGS_QUERY,
  PROJECT_META_QUERY,
} from "@/sanity/queries";

/**
 * Server-side adapter between Sanity and the presentation components.
 *
 * Two things happen here and nowhere else:
 *  - image references become plain CDN URLs, so components keep taking a
 *    `src: string` and stay unaware of Sanity;
 *  - every string used as a URL, a colour or a route is run through
 *    `stegaClean`. Visual Editing hides invisible characters inside strings for
 *    click-to-edit; left in an `href` or a `backgroundColor` they break it.
 *    Display-only strings keep theirs, which is what makes the overlays work.
 */

export type Project = {
  slug: string;
  title: string;
  discipline: string;
  country: string;
  year: string;
  thumb: string;
  /** Average colour of the thumbnail, shown while the image decodes. */
  tint: string;
};

export type CaseBlock =
  | {
      _key: string;
      _type: "caseDevice";
      videoUrl: string;
      poster?: string;
      padBottom: boolean;
    }
  | { _key: string; _type: "caseFullWidth"; videoUrl: string }
  | {
      _key: string;
      _type: "caseMobileGallery";
      images: { _key: string; url: string; alt: string }[];
    };

export type CaseStudy = {
  services?: string;
  credits?: string;
  liveUrl?: string;
  cover: string;
  logo?: string;
  /** Stage colour the device blocks sit on. */
  stage: string;
  blocks: CaseBlock[];
};

type RawProjectCard = PROJECTS_QUERY_RESULT[number];
type RawCaseStudy = NonNullable<NonNullable<PROJECT_QUERY_RESULT>["caseStudy"]>;
type RawCaseBlock = NonNullable<RawCaseStudy["blocks"]>[number];

/** Drops anything the schema marks required but a document is still missing. */
function toProject(raw: RawProjectCard): Project | null {
  const slug = stegaClean(raw.slug);
  const thumb = imageUrl(raw.thumb ?? undefined);
  if (!slug || !thumb) return null;

  return {
    slug,
    title: raw.title ?? "",
    discipline: raw.discipline ?? "",
    country: raw.country ?? "",
    year: raw.year ?? "",
    thumb,
    tint: stegaClean(raw.tint) ?? "#101010",
  };
}

export async function getProjects(): Promise<Project[]> {
  const { data } = await sanityFetch({ query: PROJECTS_QUERY });
  return data.map(toProject).filter((project) => project !== null);
}

/** Slug/title pairs for the page-transition curtain label. */
export async function getProjectLabels() {
  const { data } = await sanityFetch({ query: PROJECT_LABELS_QUERY });
  return data
    .map((row) => ({ slug: stegaClean(row.slug) ?? "", title: row.title ?? "" }))
    .filter((row) => row.slug);
}

/**
 * Published slugs only. This feeds `generateStaticParams`, which must not see
 * drafts and runs outside the request scope `sanityFetch` needs.
 */
export async function getProjectSlugs() {
  const rows = await client
    .withConfig({ useCdn: false, stega: false, perspective: "published" })
    .fetch(PROJECT_SLUGS_QUERY);

  return rows.map((row) => row.slug).filter((slug) => slug !== null);
}

/**
 * Everything `generateMetadata` needs, and nothing more.
 *
 * `stega: false` is not optional here: the invisible characters Visual Editing
 * hides inside strings would end up in the `<title>` and the meta description.
 */
export async function getProjectMeta(slug: string) {
  const { data } = await sanityFetch({
    query: PROJECT_META_QUERY,
    params: { slug },
    stega: false,
  });
  if (!data) return null;

  return {
    title: data.title ?? "",
    discipline: data.discipline ?? "",
    year: data.year ?? "",
    thumb: imageUrl(data.thumb ?? undefined, 1200),
    seo: {
      title: data.seo.title || undefined,
      description: data.seo.description || undefined,
      image: data.seo.image ? imageUrl(data.seo.image, 1200) : undefined,
      noIndex: data.seo.noIndex,
    },
  };
}

export type ProjectPage = {
  project: Project;
  /** One or two sentences about the project, when the editor wrote them. */
  summary?: string;
  /** Technologies the project was built with. Empty when none are listed. */
  stack: string[];
  study?: CaseStudy;
  next: Project;
  projectCount: number;
};

/**
 * Everything `/work/[slug]` renders. The full list comes along because the
 * case footer teases the next project and links the index by count.
 */
export async function getProjectPage(
  slug: string,
): Promise<ProjectPage | null> {
  const [{ data: raw }, projects] = await Promise.all([
    sanityFetch({ query: PROJECT_QUERY, params: { slug } }),
    getProjects(),
  ]);

  if (!raw) return null;

  const project = toProject(raw);
  if (!project) return null;

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length] ?? project;

  return {
    project,
    summary: raw.summary ?? undefined,
    stack: raw.stack ?? [],
    study: toCaseStudy(raw.caseStudy),
    next,
    projectCount: projects.length,
  };
}

function toCaseStudy(raw: RawCaseStudy | null): CaseStudy | undefined {
  if (!raw) return undefined;

  const cover = imageUrl(raw.cover ?? undefined, 2400);
  if (!cover) return undefined;

  return {
    services: raw.services ?? undefined,
    credits: raw.credits ?? undefined,
    liveUrl: stegaClean(raw.liveUrl) ?? undefined,
    cover,
    logo: imageUrl(raw.logo ?? undefined),
    stage: stegaClean(raw.stage) ?? "#101010",
    blocks: (raw.blocks ?? [])
      .map(toCaseBlock)
      .filter((block) => block !== null),
  };
}

function toCaseBlock(raw: RawCaseBlock): CaseBlock | null {
  if (raw._type === "caseMobileGallery") {
    /* Alt text became required on these when the field moved to `figure`, but
       screens uploaded before that have none. Falling back to an empty string
       keeps an older case study rendering; the Studio flags the document so
       the gap is fixed where the answer is known. */
    const images = (raw.images ?? [])
      .map((image) => ({
        _key: image._key,
        url: imageUrl(image, 800),
        alt: image.alt ?? "",
      }))
      .filter((image) => image.url !== undefined) as {
      _key: string;
      url: string;
      alt: string;
    }[];

    return images.length
      ? { _key: raw._key, _type: "caseMobileGallery", images }
      : null;
  }

  const videoUrl = stegaClean(raw.videoUrl);
  if (!videoUrl) return null;

  if (raw._type === "caseFullWidth") {
    return { _key: raw._key, _type: "caseFullWidth", videoUrl };
  }

  return {
    _key: raw._key,
    _type: "caseDevice",
    videoUrl,
    poster: imageUrl(raw.poster ?? undefined, 2400),
    padBottom: raw.padBottom ?? false,
  };
}
