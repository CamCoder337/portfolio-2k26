import "server-only";

/**
 * Viewer token, used to read drafts. Server-only: never import this from a
 * module a client component can reach.
 */
export const token = process.env.SANITY_API_READ_TOKEN;

export function requireToken() {
  if (!token) {
    throw new Error(
      "Missing SANITY_API_READ_TOKEN. Create a Viewer token at https://sanity.io/manage and add it to .env.local.",
    );
  }
  return token;
}
