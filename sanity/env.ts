/** Publishable config. Safe to reach the browser. */
export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing NEXT_PUBLIC_SANITY_PROJECT_ID",
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing NEXT_PUBLIC_SANITY_DATASET",
);

/**
 * Pinned so the API contract cannot shift under the app. Bump deliberately,
 * never to "today".
 */
export const apiVersion = "2026-08-10";

/** Studio origin, used by the Presentation tool and the draft-mode link. */
export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? "http://localhost:3333";

function assertValue<T>(value: T | undefined, message: string): T {
  if (value === undefined) throw new Error(message);
  return value;
}