"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Magnetic } from "@/components/ui/magnetic";

const fields = [
  {
    index: "01",
    name: "name",
    label: "What's your name?",
    placeholder: "John Doe *",
    type: "text",
  },
  {
    index: "02",
    name: "email",
    label: "What's your email?",
    placeholder: "john@doe.com *",
    type: "email",
  },
  {
    index: "03",
    name: "company",
    label: "What's the name of your organization?",
    placeholder: "John & Doe ®",
    type: "text",
  },
  {
    index: "04",
    name: "service",
    label: "What services are you looking for?",
    placeholder: "Web Development, Mobile App ...",
    type: "text",
  },
] as const;

export function ContactForm() {
  const root = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-field",
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 0.5 },
      );
    },
    { scope: root },
  );

  /* No backend here — the original posts to a Kirby endpoint. */
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  /* The bottom padding leaves room for the half of the send button that hangs
     below the last field's rule. */
  return (
    <form
      ref={root}
      onSubmit={submit}
      className="mt-[clamp(3rem,8vw,7rem)] pb-[clamp(5.5rem,7vw,6.5rem)]"
    >
      <div className="relative border-t border-hair-light">
        {fields.map((field) => (
          <div
            key={field.name}
            className="contact-field grid grid-cols-[clamp(1.75rem,7.6vw,3.95rem)_1fr] border-b border-hair-light py-8"
          >
            <label htmlFor={`form-${field.name}`} className="eyebrow pt-3">
              {field.index}
            </label>
            <div>
              <span className="sr-only">{field.label}</span>
              <input
                id={`form-${field.name}`}
                name={field.name}
                type={field.type}
                required={field.name !== "company"}
                placeholder={field.placeholder}
                className="w-full bg-transparent text-[clamp(1.15rem,2.77vw,1.436rem)] text-paper placeholder:text-muted focus:outline-none"
              />
            </div>
          </div>
        ))}

        <div className="contact-field grid grid-cols-[clamp(1.75rem,7.6vw,3.95rem)_1fr] border-b border-hair-light py-8">
          <label htmlFor="form-message" className="eyebrow pt-3">
            05
          </label>
          <div>
            <span className="sr-only">Your message</span>
            <textarea
              id="form-message"
              name="message"
              rows={6}
              required
              placeholder="Hello Fred, can you help me with ... *"
              className="w-full resize-none bg-transparent text-[clamp(1.15rem,2.77vw,1.436rem)] text-paper placeholder:text-muted focus:outline-none"
            />
          </div>
        </div>
        {/* Straddles the last field's rule, inset from the right — the
            reference sits its centre 14px above that rule at 390px and 16.5px
            at 1440px, not below the form as a separate block. */}
        <div className="absolute right-7 bottom-0 translate-y-[calc(50%-1rem)] md:right-9">
          <Magnetic strength={70}>
            <button
              type="submit"
              className="group relative isolate grid aspect-square w-[clamp(9rem,13vw,11.25rem)] place-items-center overflow-hidden rounded-full bg-accent text-paper"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 translate-y-full rounded-[50%_50%_0_0] bg-ink-black transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:rounded-none"
              />
              <span className="relative text-body">
                {sent ? "Sent" : "Send it!"}
              </span>
            </button>
          </Magnetic>
        </div>
      </div>

      {sent && (
        <p role="status" className="mt-6 text-right text-body text-muted">
          Demo form — no message was actually delivered.
        </p>
      )}
    </form>
  );
}
