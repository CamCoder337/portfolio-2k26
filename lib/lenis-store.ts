import type Lenis from "lenis";

/**
 * Single slot holding the live Lenis instance so the page-transition layer can
 * stop the scroll and jump to the top without threading it through context.
 */
export const lenisStore: { current: Lenis | null } = { current: null };
