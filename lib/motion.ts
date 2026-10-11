// Shared motion language: one easing family, a few durations, reusable variants.
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_SOFT = [0.45, 0, 0.2, 1] as const;
export const DUR = { quick: 0.35, base: 0.8, slow: 1.2 } as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
};
export const lineUp = {
  hidden: { y: "108%" },
  show: (i: number = 0) => ({
    y: "0%",
    transition: { duration: DUR.slow, ease: EASE, delay: 0.08 * i },
  }),
};
export const clipReveal = {
  hidden: { clipPath: "inset(12% 12% 12% 12%)", opacity: 0, scale: 1.06 },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    scale: 1,
    transition: { duration: DUR.slow, ease: EASE },
  },
};
export const VIEWPORT = { once: true, margin: "-12% 0px -8% 0px" } as const;
