"use client";
import { useEffect, useState } from "react";

/** True on phones/small tablets. Updates only when the breakpoint is crossed. */
export function useNarrow(maxWidth = 760) {
  const [narrow, setNarrow] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= maxWidth;
    }
    return false;
  });
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [maxWidth]);
  return narrow;
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/** Reduced-motion preference. Keep scroll-driven tracks active so finger scrolling animates smoothly across all devices. */
export function usePrefersReducedMotion() {
  return false;
}
