"use client";

import { TransitionLink } from "./transition-link";
import { Magnetic } from "./magnetic";

type Common = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
};

type AnchorProps = Common &
  React.ComponentProps<"a"> & {
    className: string;
    /* Magnetic clones its child with a ref; without this the wrapper has
       nothing to move and the effect silently does nothing. */
    ref?: React.Ref<HTMLAnchorElement>;
  };

function Anchor({ href, external, className, children, ref, ...rest }: AnchorProps) {
  const isPlainAnchor =
    external || href.startsWith("mailto:") || href.startsWith("tel:");

  if (isPlainAnchor) {
    return (
      <a
        ref={ref}
        href={href}
        className={className}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <TransitionLink ref={ref} href={href} className={className} {...rest}>
      {children}
    </TransitionLink>
  );
}

/**
 * Pill button with the accent fill that wipes up from the bottom on hover.
 */
export function PillButton({
  href,
  children,
  external,
  count,
  dark = false,
}: Common & { count?: number; dark?: boolean }) {
  return (
    <Magnetic strength={20}>
      <Anchor
        href={href}
        external={external}
        className={`group relative isolate inline-flex items-center gap-2 overflow-hidden rounded-full border px-[1.6em] py-[0.7em] text-body transition-colors duration-300 ${
          dark
            ? "border-hair-light text-paper"
            : "border-hair text-ink hover:text-paper"
        }`}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 translate-y-full rounded-[50%_50%_0_0] bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:rounded-none"
        />
        <span className="relative">{children}</span>
        {count !== undefined && (
          <span className="relative -translate-y-1.5 text-[0.7em] text-muted transition-colors duration-300 group-hover:text-paper/70">
            {count}
          </span>
        )}
      </Anchor>
    </Magnetic>
  );
}

/**
 * The oversized circular CTA that sits on the footer headline.
 */
export function RoundButton({ href, children, external }: Common) {
  return (
    <Magnetic strength={60}>
      <Anchor
        href={href}
        external={external}
        className="group relative isolate grid aspect-square w-[clamp(9rem,13vw,11.25rem)] place-items-center overflow-hidden rounded-full bg-accent text-paper"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 translate-y-full rounded-[50%_50%_0_0] bg-ink-black transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:rounded-none"
        />
        <span className="relative text-body">{children}</span>
      </Anchor>
    </Magnetic>
  );
}

/**
 * Text link with the underline that grows from the left, as in the fixed nav.
 */
export function UnderlineLink({
  href,
  children,
  external,
  className = "",
}: Common & { className?: string }) {
  return (
    <Magnetic strength={16}>
      <Anchor
        href={href}
        external={external}
        className={`group relative inline-block ${className}`}
      >
        <span className="relative">
          {children}
          <span
            aria-hidden="true"
            className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
          />
        </span>
      </Anchor>
    </Magnetic>
  );
}
