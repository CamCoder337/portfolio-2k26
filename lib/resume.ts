import { stegaClean } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { RESUME_QUERY } from "@/sanity/queries";
import { site } from "@/lib/site";

/** What the browser saves the file as, rather than the asset's hashed id. */
const filename = `${site.name.replace(/\s+/g, "-")}-CV.pdf`;

/**
 * The CV as a URL the download button can point at, or `undefined` when no
 * file is uploaded — every caller hides the button in that case.
 *
 * `?dl=` is what makes it download instead of opening in a tab: the file sits
 * on Sanity's CDN, and the `download` attribute is ignored cross-origin.
 * `stegaClean` runs because this string is a URL, not display copy.
 */
export async function getResumeUrl(): Promise<string | undefined> {
  const { data } = await sanityFetch({ query: RESUME_QUERY });

  const url = stegaClean(data?.resume);
  if (!url) return undefined;

  return `${url}?dl=${encodeURIComponent(filename)}`;
}
