/**
 * Survives client-side navigation so the preloader only ever plays on the
 * first paint, and entrance animations know what they are waiting behind.
 */
export const intro = { played: false };

/** True while a route change arrived under the transition curtain. */
export const route = { fromTransition: false };

/**
 * Delay an above-the-fold entrance should sit on: behind the preloader on a
 * cold load, behind the curtain on a transition, otherwise just a beat.
 */
export function enterDelay() {
  if (!intro.played) return 2.1;
  /* The reveal runs 0.9s; starting at 0.55 means the content is already
     rising as the curtain clears rather than after it. */
  return route.fromTransition ? 0.55 : 0.15;
}
