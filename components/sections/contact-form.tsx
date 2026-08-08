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

  return (
    <form ref={root} onSubmit={submit} className="mt-[clamp(3rem,8vw,7rem)]">
      <div className="border-t border-hair-light">
        {fields.map((field) => (
          <div
            key={field.name}
            className="contact-field grid gap-2 border-b border-hair-light py-8 md:grid-cols-[4rem_1fr] md:gap-8"
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
                className="w-full bg-transparent text-[clamp(1.5rem,3vw,2.5rem)] text-paper placeholder:text-muted focus:outline-none"
              />
            </div>
          </div>
        ))}

        <div className="contact-field grid gap-2 border-b border-hair-light py-8 md:grid-cols-[4rem_1fr] md:gap-8">
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
              placeholder="Hello Dennis, can you help me with ... *"
              className="w-full resize-none bg-transparent text-[clamp(1.5rem,3vw,2.5rem)] text-paper placeholder:text-muted focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-end">
        <Magnetic strength={70}>
          <button
            type="submit"
            className="group relative isolate grid aspect-square w-[clamp(9rem,13vw,11.25rem)] place-items-center overflow-hidden rounded-full bg-accent text-paper"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 translate-y-full rounded-[50%_50%_0_0] bg-ink-black transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:rounded-none"
            />
            <span className="relative text-body">{sent ? "Sent" : "Send it!"}</span>
          </button>
        </Magnetic>
      </div>

      {sent && (
        <p role="status" className="mt-6 text-right text-body text-muted">
          Demo form — no message was actually delivered.
        </p>
      )}
    </form>
  );
}
