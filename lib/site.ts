export const site = {
  name: "Fred Tchiadeu",
  role: "Freelance Software & QA Engineer",
  /**
   * Production origin. Everything absolute in metadata is built from it.
   *
   * The `www` host is the one Vercel actually serves; the apex redirects to
   * it. This has to match, or every canonical points at a URL that redirects
   * and the browser's own origin stops matching the Sanity CORS allowlist.
   */
  url: "https://www.cam-coder.com",
  /* Shown as the search result description wherever a page sets nothing more
     specific. Written to say what the work is, not how good it is. */
  description:
    "Fred Tchiadeu builds and tests web products from Cameroon. Software engineering and QA in one pair of hands: shipping the feature and proving it holds.",
  tagline: "Software engineering and QA, from build to proof.",
  twitterHandle: "@camcoder337",
  location: "Cameroon",
  email: "fredtchiadeu@gmail.com",
  phone: "+237 693 926 443",
  phoneHref: "tel:+237693926443",
  edition: "2026 © Edition",
  timezone: "Africa/Douala",
  /* Round portrait set inline in the footer and contact headlines. Swap this
     one file to change both. */
  avatar: "/media/home/avatar.png",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/camcoder337/" },
  { label: "Twitter", href: "https://twitter.com/camcoder337" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/fredtchiadeu/" },
] as const;

export const business = [
  { label: "CamCoder Studio" },
  { label: "Location: Cameroon" },
] as const;

/* Work and case studies live in Sanity. See lib/work.ts. */

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

/* Services, the practice list and the passions live in Sanity.
   See lib/about.ts. */

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
