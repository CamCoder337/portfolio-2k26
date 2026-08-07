export const site = {
  name: "Dennis Snellenberg",
  role: "Freelance Designer & Developer",
  location: "Located in the Netherlands",
  email: "info@dennissnellenberg.com",
  phone: "+31 6 27 84 74 30",
  phoneHref: "tel:+31627847430",
  edition: "2022 © Edition",
  timezone: "Europe/Amsterdam",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const socialLinks = [
  { label: "Awwwards", href: "https://www.awwwards.com/dennissnellenberg/" },
  { label: "Instagram", href: "https://www.instagram.com/codebydennis/" },
  { label: "Twitter", href: "https://twitter.com/codebydennis" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dennissnellenberg/" },
] as const;

export const business = [
  { label: "Dennis Snellenberg B.V." },
  { label: "CoC: 92411711" },
  { label: "VAT: NL866034080B01" },
  { label: "Location: The Netherlands" },
] as const;

/* ------------------------------------------------------------------ */
/*  Work                                                               */
/* ------------------------------------------------------------------ */

export type Project = {
  slug: string;
  title: string;
  discipline: string;
  country: string;
  year: string;
  thumb: string;
  /* Average colour of the thumbnail, shown while the image decodes. */
  tint: string;
};

export const projects: Project[] = [
  {
    slug: "twice",
    title: "TWICE",
    discipline: "Interaction & Development",
    country: "Spain",
    year: "2024",
    thumb: "/media/work/twice.jpg",
    tint: "#f1f1f1",
  },
  {
    slug: "the-damai",
    title: "The Damai",
    discipline: "Design & Development",
    country: "Bali, Indonesia",
    year: "2024",
    thumb: "/media/work/the-damai.jpg",
    tint: "#e0d9d1",
  },
  {
    slug: "fabric",
    title: "FABRIC™",
    discipline: "Design & Development",
    country: "United Kingdom",
    year: "2023",
    thumb: "/media/work/fabric.jpg",
    tint: "#48494a",
  },
  {
    slug: "aanstekelijk",
    title: "Aanstekelijk",
    discipline: "Design & Development",
    country: "The Netherlands",
    year: "2023",
    thumb: "/media/work/aanstekelijk.jpg",
    tint: "#101010",
  },
  {
    slug: "base-create",
    title: "Base Create",
    discipline: "Design & Development",
    country: "Hong Kong",
    year: "2023",
    thumb: "/media/work/base-create.jpg",
    tint: "#e9eaeb",
  },
  {
    slug: "avvr",
    title: "AVVR",
    discipline: "Design & Development",
    country: "The Netherlands",
    year: "2023",
    thumb: "/media/work/avvr.jpg",
    tint: "#1c1d20",
  },
  {
    slug: "graphichunters",
    title: "GraphicHunters",
    discipline: "Design & Development",
    country: "The Netherlands",
    year: "2022",
    thumb: "/media/work/graphichunters.jpg",
    tint: "#f1f1f1",
  },
  {
    slug: "future-goals",
    title: "Future Goals",
    discipline: "Interaction & Development",
    country: "Curaçao",
    year: "2022",
    thumb: "/media/work/future-goals.jpg",
    tint: "#455ce9",
  },
  {
    slug: "atypikal",
    title: "Atypikal",
    discipline: "Interaction & Development",
    country: "United States",
    year: "2021",
    thumb: "/media/work/atypikal.jpg",
    tint: "#e0d9d1",
  },
  {
    slug: "one-nil",
    title: "One:Nil",
    discipline: "Interaction & Development",
    country: "The Netherlands",
    year: "2021",
    thumb: "/media/work/one-nil.jpg",
    tint: "#101010",
  },
  {
    slug: "andy-hardy",
    title: "Andy Hardy",
    discipline: "Design & Development",
    country: "Australia",
    year: "2020",
    thumb: "/media/work/andy-hardy.jpg",
    tint: "#48494a",
  },
];

export const projectCount = projects.length;

export const featuredProjects = projects.slice(0, 4);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

/* ------------------------------------------------------------------ */
/*  Case studies                                                       */
/* ------------------------------------------------------------------ */

export type CaseBlock =
  | { kind: "device"; src: string; poster?: string; padBottom?: boolean }
  | { kind: "fullwidth"; src: string }
  | { kind: "mobile"; items: string[] };

export type CaseStudy = {
  slug: string;
  services: string;
  credits: string;
  liveUrl: string;
  cover: string;
  logo?: string;
  /* Stage colour the device blocks sit on. */
  stage: string;
  blocks: CaseBlock[];
};

export const caseStudies: Record<string, CaseStudy> = {
  twice: {
    slug: "twice",
    services: "Interaction & Development",
    credits: "Design: Dylan Brouwer",
    liveUrl: "https://twicemediahouse.com/",
    cover: "/media/case/twice/cover.jpg",
    logo: "/media/case/twice/logo.svg",
    stage: "#c0cac9",
    blocks: [
      {
        kind: "device",
        src: "/media/case/twice/home.mov",
        /* Chrome refuses this QuickTime container; the poster carries the block. */
        poster: "/media/case/twice/cover.jpg",
      },
      { kind: "device", src: "/media/case/twice/nav-hover.mp4", padBottom: true },
      { kind: "fullwidth", src: "/media/case/twice/starvie.mp4" },
      { kind: "device", src: "/media/case/twice/work.mp4" },
      {
        kind: "mobile",
        items: [
          "/media/case/twice/mobile-1.jpg",
          "/media/case/twice/mobile-2.jpg",
          "/media/case/twice/mobile-3.jpg",
        ],
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

export const services = [
  {
    index: "01",
    title: "Design",
    body: "With a solid track record in designing websites, I deliver strong and user-friendly digital designs. (Since 2024 only in combination with development)",
  },
  {
    index: "02",
    title: "Development",
    body: "I build scalable websites from scratch that fit seamlessly with design. My focus is on micro animations, transitions and interaction. Building with Webflow (or Kirby CMS).",
  },
  {
    index: "03",
    title: "The full package",
    body: "A complete website from concept to implementation, that's what makes me stand out. My great sense for design and my development skills enable me to create kick-ass projects.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Home                                                               */
/* ------------------------------------------------------------------ */

/* Greetings cycled by the preloader, in the original order. */
export const greetings = [
  "Hello",
  "Bonjour",
  "स्वागत हे",
  "Ciao",
  "Olá",
  "おい",
  "Hallå",
  "Guten tag",
  "Hallo",
] as const;

export type ShowcaseItem = { src: string; video?: boolean };

export const showcase: { rowOne: ShowcaseItem[]; rowTwo: ShowcaseItem[] } = {
  rowOne: [
    { src: "/media/home/item-1.jpg" },
    { src: "/media/home/item-2.mp4", video: true },
    { src: "/media/home/item-3.jpg" },
    { src: "/media/home/item-4.mp4", video: true },
  ],
  rowTwo: [
    { src: "/media/home/item-5.mp4", video: true },
    { src: "/media/home/item-6.jpg" },
    { src: "/media/home/item-7.mp4", video: true },
    { src: "/media/home/item-8.jpg" },
  ],
};
