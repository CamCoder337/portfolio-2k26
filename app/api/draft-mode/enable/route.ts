import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/client";
import { requireToken } from "@/sanity/token";

/**
 * Entry point the Presentation tool calls to turn on draft previews.
 *
 * The handler is built per request, not at module scope: the token is only
 * needed by whoever actually opens a preview, and demanding it eagerly fails
 * the production build on machines that never preview drafts.
 */
export async function GET(request: Request) {
  const { GET: handler } = defineEnableDraftMode({
    client: client.withConfig({ token: requireToken() }),
  });

  return handler(request);
}
