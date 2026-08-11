import { defineLive } from "next-sanity/live";
import { client } from "./client";

/**
 * Live Content API. Published content stays fresh without a token; drafts and
 * the Presentation tool need SANITY_API_READ_TOKEN (a Viewer token from
 * https://sanity.io/manage) in .env.local.
 */
const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});