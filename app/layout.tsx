import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import "./globals.css";
import { SanityLive } from "@/sanity/live";
import { getProjectLabels } from "@/lib/work";
import { site } from "@/lib/site";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { PageTransition } from "@/components/providers/page-transition";
import { Preloader } from "@/components/sections/preloader";
import { Nav } from "@/components/sections/nav";
import { MenuProvider } from "@/components/providers/menu";

/**
 * Neue Montreal, self-hosted from app/fonts (kept out of public/ so the
 * licensed files are not served raw at a guessable URL).
 *
 * The weight mapping mirrors the reference's own @font-face block, which is
 * not the usual one: Regular is declared at 450 and Bold at 800, so body copy
 * and headings sit at 450 rather than 400.
 *
 * Self-hosting also removes the build-time fetch to Google Fonts that made
 * `next build` fail intermittently.
 */
const display = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "./fonts/NeueMontreal-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/NeueMontreal-LightItalic.otf", weight: "300", style: "italic" },
    { path: "./fonts/NeueMontreal-Regular.otf", weight: "450", style: "normal" },
    { path: "./fonts/NeueMontreal-Italic.otf", weight: "450", style: "italic" },
    { path: "./fonts/NeueMontreal-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/NeueMontreal-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "./fonts/NeueMontreal-Bold.otf", weight: "800", style: "normal" },
    { path: "./fonts/NeueMontreal-BoldItalic.otf", weight: "800", style: "italic" },
  ],
});

/**
 * Site-wide metadata.
 *
 * `metadataBase` is what lets every page below write relative URLs for
 * canonicals and social images; without it, a relative value in a metadata
 * field fails the build rather than resolving.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: "CamCoder",
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitterHandle,
    creator: site.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const projectLabels = await getProjectLabels();

  return (
    <html lang="en" className={`${display.variable} h-full`}>
      <body className="min-h-full">
        <SmoothScroll>
          <PageTransition projectLabels={projectLabels}>
            <MenuProvider>
              <Preloader />
              <Nav />
              {children}
            </MenuProvider>
          </PageTransition>
        </SmoothScroll>
        {/* Required for the Live Content API to push updates. */}
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
