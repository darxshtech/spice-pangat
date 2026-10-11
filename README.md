# Spice & Pangat — website

Next.js (App Router) · React · TypeScript · Framer Motion · custom CSS. No Tailwind/Bootstrap.

    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## Edit without touching components
- `config/events.ts` – featured gathering (title, date, venue, booking URL, status). Set `status: "none"` or let the date pass and the site switches every CTA to "Follow on Instagram".
- `config/brand.ts` – name, links, colours, navigation.
- `config/images.ts` – image slots. Set `src: "/images/food/thali.jpg"` on a slot to replace the built-in illustration with real photography.
- `lib/motion.ts` – shared easing/durations/variants.

## Signature animation
`components/SpiceRitualAnimation.tsx` – one `scrollYProgress` drives everything (no per-frame React state):
0–12% leaf unfolds · 12–40% spices enter · 40–58% converge · 55–76% meal revealed · 76–91% logo · 91–100% hold.
Reverses on upward scroll, reduced-motion and no-JS get a static finished composition.

## Assets
`public/logo/spice-and-pangat-logo.png` is the supplied original. `…-transparent.png` is the same artwork with the ivory background removed (used for the reveal).
Spices, banana leaf, meal and gallery visuals are **original SVG illustrations** in `components/art/` standing in for photography.
