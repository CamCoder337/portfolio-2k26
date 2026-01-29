import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import NavigationDock from "./components/NavigationDock";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Creative Dev | Backend Engineer & Digital Craftsman",
  description:
    "Crafting high-end digital experiences through code, motion, and kinetic typography. Backend engineer specializing in scalable systems, APIs, and exceptional interfaces.",
  keywords: [
    "Backend Developer",
    "Software Engineer",
    "API Development",
    "Full Stack",
    "Freelance Developer",
    "Creative Developer",
    "TypeScript",
    "Python",
    "Go",
    "Node.js",
  ],
  authors: [{ name: "Creative Dev" }],
  creator: "Creative Dev",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Creative Dev | Backend Engineer & Digital Craftsman",
    description:
      "Crafting high-end digital experiences through code, motion, and kinetic typography.",
    siteName: "Creative Dev Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Dev | Backend Engineer & Digital Craftsman",
    description:
      "Crafting high-end digital experiences through code, motion, and kinetic typography.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
          <NavigationDock />
        </ThemeProvider>
      </body>
    </html>
  );
}
