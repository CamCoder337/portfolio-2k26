import { stegaClean } from "next-sanity";
import type { ABOUT_QUERY_RESULT, Figure } from "@/sanity.types";
import { sanityFetch } from "@/sanity/live";
import { imageUrl } from "@/sanity/image";
import { ABOUT_QUERY } from "@/sanity/queries";

/**
 * Server-side adapter between Sanity and the About page, mirroring
 * `lib/work.ts`. The same two rules apply and apply only here:
 *  - image references become plain CDN URLs, so components keep taking a
 *    `src: string` and stay unaware of Sanity;
 *  - `stegaClean` runs on strings used as a URL, a colour or a route, and on
 *    nothing else. Visual Editing hides invisible characters inside strings
 *    for click-to-edit; left in an `href` they break it, but stripped from
 *    display copy they take the overlays with them.
 */

/** An image that carries its own alt text, resolved to a URL. */
export type Figured = {
  src: string;
  alt: string;
  caption?: string;
};

export type PracticeItem = {
  _key: string;
  label: string;
  body: string;
  tools: string[];
};

export type ServiceItem = {
  _key: string;
  /** Position, rendered as "01", "02" — derived here so reordering renumbers. */
  index: string;
  title: string;
  body: string;
};

export type Passion = {
  _key: string;
  name: string;
  body: string;
  /** What the pastime feeds back into the work. */
  trait: string;
  image?: Figured;
};

export type Milestone = {
  _key: string;
  year: string;
  title: string;
  body?: string;
};

export type Profile = {
  headline: string[];
  statement: string;
  portrait: Figured;
  secondary?: Figured;
  practice: PracticeItem[];
  services: ServiceItem[];
  passions: Passion[];
  timeline: Milestone[];
  seo: {
    title?: string;
    description?: string;
    image?: string;
    noIndex: boolean;
  };
};

type RawAbout = NonNullable<ABOUT_QUERY_RESULT>;

/**
 * Alt text is required in the schema, so an empty one means the document is
 * mid-edit rather than deliberately decorative. Dropping the figure is safer
 * than shipping an unlabelled image.
 */
function toFigure(raw: Figure | null, width = 1600): Figured | undefined {
  if (!raw) return undefined;

  const src = imageUrl(raw, width);
  if (!src || !raw.alt) return undefined;

  return { src, alt: raw.alt, caption: raw.caption };
}

function toPractice(raw: NonNullable<RawAbout["practice"]>[number]) {
  if (!raw.label || !raw.body) return null;
  return {
    _key: raw._key,
    label: raw.label,
    body: raw.body,
    tools: raw.tools ?? [],
  };
}

function toService(
  raw: NonNullable<RawAbout["services"]>[number],
  position: number,
) {
  if (!raw.title || !raw.body) return null;
  return {
    _key: raw._key,
    index: String(position + 1).padStart(2, "0"),
    title: raw.title,
    body: raw.body,
  };
}

function toPassion(raw: NonNullable<RawAbout["passions"]>[number]) {
  if (!raw.name || !raw.body || !raw.trait) return null;
  return {
    _key: raw._key,
    name: raw.name,
    body: raw.body,
    trait: raw.trait,
    image: toFigure(raw.image, 1200),
  };
}

function toMilestone(raw: NonNullable<RawAbout["timeline"]>[number]) {
  if (!raw.year || !raw.title) return null;
  return {
    _key: raw._key,
    year: raw.year,
    title: raw.title,
    body: raw.body ?? undefined,
  };
}

function toProfile(raw: RawAbout): Profile | null {
  const portrait = toFigure(raw.portrait);
  if (!raw.headline?.length || !raw.statement || !portrait) return null;

  return {
    headline: raw.headline,
    statement: raw.statement,
    portrait,
    secondary: toFigure(raw.secondary, 1400),
    practice: (raw.practice ?? []).map(toPractice).filter((item) => item !== null),
    services: (raw.services ?? []).map(toService).filter((item) => item !== null),
    passions: (raw.passions ?? []).map(toPassion).filter((item) => item !== null),
    timeline: (raw.timeline ?? []).map(toMilestone).filter((item) => item !== null),
    seo: {
      /* Metadata is machine-read, so it is cleaned even though it is text. */
      title: stegaClean(raw.seo.title) || undefined,
      description: stegaClean(raw.seo.description) || undefined,
      image: raw.seo.image ? imageUrl(raw.seo.image, 1200) : undefined,
      noIndex: raw.seo.noIndex,
    },
  };
}

export async function getProfile(): Promise<Profile | null> {
  const { data } = await sanityFetch({ query: ABOUT_QUERY });
  return data ? toProfile(data) : null;
}

/** The same document without stega, for `generateMetadata`. */
export async function getProfileMeta() {
  const { data } = await sanityFetch({ query: ABOUT_QUERY, stega: false });
  if (!data) return null;

  return {
    headline: data.headline ?? [],
    statement: data.statement ?? "",
    seo: {
      title: data.seo.title || undefined,
      description: data.seo.description || undefined,
      image: data.seo.image ? imageUrl(data.seo.image, 1200) : undefined,
      noIndex: data.seo.noIndex,
    },
  };
}
