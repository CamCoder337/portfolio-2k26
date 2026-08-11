import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Resolves an image field to a plain URL for `next/image`.
 *
 * Sanity's CDN does the heavy resize so Next is never asked to optimise a
 * 2160px original. SVGs are returned untouched — the transform pipeline does
 * not rasterise them.
 */
export function imageUrl(source: SanityImageSource | undefined, width = 1600) {
  if (!source) return undefined;

  const url = urlFor(source).url();
  if (url.endsWith(".svg")) return url;

  return urlFor(source).width(width).auto("format").url();
}