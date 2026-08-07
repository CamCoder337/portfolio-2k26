import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { PageTransition } from "@/components/providers/page-transition";
import { Preloader } from "@/components/sections/preloader";
import { Nav } from "@/components/sections/nav";

/**
 * The reference site ships Neue Montreal, which is licensed and cannot be
 * redistributed here. Inter Tight is the closest freely available neo-grotesque:
 * same tight display rhythm, near-identical metrics at large sizes.
 */
const display = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dennis Snellenberg • Freelance Designer & Developer",
    template: "%s - Dennis Snellenberg",
  },
  description:
    "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} h-full`}>
      <body className="min-h-full">
        <SmoothScroll>
          <PageTransition>
            <Preloader />
            <Nav />
            {children}
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
