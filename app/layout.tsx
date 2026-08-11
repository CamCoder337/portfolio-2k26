import type { Metadata } from "next";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import "./globals.css";
import { SanityLive } from "@/sanity/live";
import { getProjectLabels } from "@/lib/work";
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

export const metadata: Metadata = {
  title: {
    default: "Fred Tchiadeu • Freelance Software & QA Engineer",
    template: "%s - CamCoder",
  },
  description:
    "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.",
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
