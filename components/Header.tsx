"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { brand } from "@/config/brand";
import type { FeaturedEvent } from "@/config/events";
import { EASE } from "@/lib/motion";

export function Wordmark() {
  return (
    <a className="site-logo" href="#top" aria-label="Spice & Pangat — back to top">
      <Image
        src={brand.logo.transparent}
        alt="Spice & Pangat — Maharashtrian Supper Club"
        width={855}
        height={680}
        priority
        className="site-logo__img"
      />
    </a>
  );
}

export default function Header({ event }: { event: FeaturedEvent | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 40;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const ctaHref = event ? event.bookingUrl : brand.instagramUrl;
  const ctaLabel = event ? "Reserve Your Seat" : "Follow for Updates";

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="site-header__bar">
        <Wordmark />
        <nav className="site-nav" aria-label="Primary">
          {brand.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="btn btn--small site-header__cta" href={ctaHref} target="_blank" rel="noopener noreferrer">{ctaLabel}</a>
        <button
          className="menu-btn"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <nav aria-label="Mobile">
              {brand.nav.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: EASE }}
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <a className="btn" href={ctaHref} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>{ctaLabel}</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
