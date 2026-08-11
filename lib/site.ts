export const site = {
  name: "Fred Tchiadeu",
  role: "Freelance Software & QA Engineer",
  location: "Located in the Cameroon",
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
  // { label: "Awwwards", href: "https://www.awwwards.com/dennissnellenberg/" },
  { label: "Instagram", href: "https://www.instagram.com/camcoder337/" },
  { label: "Twitter", href: "https://twitter.com/camcoder337" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/fredtchiadeu/" },
] as const;

export const business = [
  { label: "CamCoder Studio" },
  // { label: "CoC: 92411711" },
  // { label: "VAT: NL866034080B01" },
  { label: "Location: Cameroon" },
] as const;

/* Work and case studies live in Sanity. See lib/work.ts. */

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
