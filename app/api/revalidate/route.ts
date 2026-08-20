import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Called by a Sanity webhook when a document is published.
 *
 * Every route here is statically generated, so without this the HTML keeps
 * whatever the last build saw. `<SanityLive />` refreshes content in the
 * browser after hydration, but a crawler never gets that far — it reads the
 * build-time snapshot. This is what puts published edits into that snapshot.
 *
 * Set up in Sanity under API → Webhooks:
 *   URL      https://cam-coder.com/api/revalidate
 *   Dataset  production
 *   Trigger  Create, Update, Delete
 *   Filter   _type in ["project", "about"]
 *   Projection  {_type, "slug": slug.current}
 *   Secret   the same value as SANITY_REVALIDATE_SECRET
 */
type WebhookPayload = {
  _type?: string;
  slug?: string;
};

/**
 * A project change is deliberately answered with a layout-wide revalidation
 * rather than a single path: the root layout resolves every project's slug and
 * title for the page-transition curtain, so one renamed project is stale on
 * every route at once.
 */
function pathsFor(body: WebhookPayload): [string, "page" | "layout"][] {
  if (body._type === "about") return [["/about", "page"]];
  if (body._type === "project") return [["/", "layout"]];
  return [];
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    console.error("Revalidate: SANITY_REVALIDATE_SECRET is not set.");
    return new NextResponse("Not configured", { status: 500 });
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      request,
      secret,
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }
    if (!body?._type) {
      return new NextResponse("Missing _type in the webhook projection", {
        status: 400,
      });
    }

    const targets = pathsFor(body);
    for (const [path, type] of targets) revalidatePath(path, type);

    return NextResponse.json({ revalidated: targets, now: Date.now() });
  } catch (error) {
    console.error("Revalidate: webhook failed.", error);
    return new NextResponse("Webhook failed", { status: 500 });
  }
}
