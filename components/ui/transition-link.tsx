"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { useTransitionNavigate } from "@/components/providers/page-transition";

type Props = React.ComponentPropsWithoutRef<typeof Link> & { href: string };

/**
 * Internal link that hands navigation to the curtain transition. External
 * links, new-tab clicks and modifier clicks fall through to the browser.
 */
export const TransitionLink = forwardRef<HTMLAnchorElement, Props>(
  function TransitionLink({ href, onClick, onPointerEnter, ...rest }, ref) {
    const navigate = useTransitionNavigate();
    const router = useRouter();

    return (
      <Link
        ref={ref}
        href={href}
        onPointerEnter={(event) => {
          onPointerEnter?.(event);
          /* Intent to click: fetch the route while the cursor is still
             travelling, so the curtain never waits on the network. */
          router.prefetch(href);
        }}
        onClick={(event) => {
          onClick?.(event);
          if (
            event.defaultPrevented ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            event.button !== 0
          ) {
            return;
          }
          event.preventDefault();
          navigate(href);
        }}
        {...rest}
      />
    );
  },
);
