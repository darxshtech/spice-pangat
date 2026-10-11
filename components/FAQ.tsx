"use client";
import { KeyboardEvent, ReactNode, useRef, useState } from "react";
import { brand } from "@/config/brand";
import type { FeaturedEvent } from "@/config/events";
import { LineReveal, Reveal } from "./Motion";

export default function FAQ({ event }: { event: FeaturedEvent | null }) {
  const [open, setOpen] = useState<number | null>(0);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  const items: { q: string; a: ReactNode }[] = [
    { q: "What does Pangat mean?", a: "Pangat refers to people coming together to share a meal, reflecting the spirit of hospitality and togetherness at the heart of the brand." },
    { q: "What kind of experience is Spice & Pangat?", a: "Spice & Pangat is a Maharashtrian supper club celebrating regional food, traditions and shared dining experiences." },
    { q: "Where do your gatherings take place?", a: "Spice & Pangat is based in Northwood, London. Please check the details of each gathering for its exact venue." },
    {
      q: "How can I reserve a place?",
      a: event ? (
        <>Visit our <a href={event.bookingUrl} {...ext}>official event booking page</a> to explore the current gathering and its available booking options.</>
      ) : (
        <>There is no gathering open for booking right now. <a href={brand.instagramUrl} {...ext}>Follow us on Instagram</a> to hear about the next one.</>
      ),
    },
    { q: "Can you accommodate food allergies?", a: "Please contact the organisers before booking to discuss any food allergies. Accommodation cannot be guaranteed, and the absence of allergen cross-contact cannot be promised." },
    { q: "Where can I find your latest updates?", a: <><a href={brand.instagramUrl} {...ext}>Follow Spice &amp; Pangat on Instagram</a> for updates and information about upcoming gatherings.</> },
  ];

  const onKey = (e: KeyboardEvent, i: number) => {
    const last = items.length - 1;
    let n = -1;
    if (e.key === "ArrowDown") n = i === last ? 0 : i + 1;
    else if (e.key === "ArrowUp") n = i === 0 ? last : i - 1;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = last;
    if (n >= 0) { e.preventDefault(); btns.current[n]?.focus(); }
  };

  return (
    <section id="faq" className="faq section" aria-labelledby="faq-title">
      <div className="container container--narrow">
        <header className="section-head center">
          <Reveal><p className="eyebrow">Good to know</p></Reveal>
          <h2 id="faq-title" className="visually-hidden">Frequently asked questions</h2>
          <LineReveal as="h3" lines={["Questions, answered."]} className="display display--lg" />
        </header>
        <div className="faq__list">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} className={`faq__item${isOpen ? " is-open" : ""}`}>
                <h3 className="faq__q">
                  <button
                    ref={(el) => { btns.current[i] = el; }}
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    onKeyDown={(e) => onKey(e, i)}
                  >
                    <span>{it.q}</span>
                    <i aria-hidden="true" />
                  </button>
                </h3>
                <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} className="faq__panel">
                  <div className="faq__panel-inner"><p>{it.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
