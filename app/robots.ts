import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * `/api` is disallowed rather than left open: `/api/draft-mode/enable` is a
 * publicly reachable endpoint whose only job is to flip a preview cookie, and
 * it has nothing to offer a crawler.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
    host: site.url,
  };
}
