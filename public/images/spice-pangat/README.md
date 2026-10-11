# Spice & Pangat — Realistic Animation Assets

This bundle contains high-resolution PNG assets for replacing the flat illustrated visuals in the Spice & Pangat scrolling animation. The ingredient and hero cutout PNGs use alpha transparency.

## Files

- `banana-leaf.png` — isolated realistic banana leaf; reveal it first in the scroll sequence.
- `maharashtrian-thali-banana-leaf.png` — final overhead Maharashtrian meal on a banana leaf; reveal after the spice convergence.
- `spices-sprite-sheet.png` — full 3×3 transparent spice sheet.
- `spices/*.png` — nine separately cropped transparent ingredient assets: turmeric, chilli powder, dried red chillies, cumin, coriander, peppercorns, cardamom, cinnamon and mustard seeds.

## Suggested integration

Copy this folder into your Next.js project's `public/images/spice-pangat/` directory. Then reference assets as `/images/spice-pangat/banana-leaf.png`, `/images/spice-pangat/maharashtrian-thali-banana-leaf.png`, and `/images/spice-pangat/spices/turmeric-powder.png`.

Animate each spice PNG with Framer Motion transforms (`x`, `y`, `rotate`, `scale`, `opacity`) tied to scroll progress. Begin with the leaf, bring spices in from the viewport edges, converge them in the centre, fade/reveal the meal cutout, and finally place the original supplied Spice & Pangat logo above the meal. Use the real logo asset rather than recreating it.

## Important

These are generated visual assets for a website concept. Confirm the food presentation matches the client's actual menu before presenting it as a photograph of a specific dish or event. Keep reduced-motion and mobile fallbacks.
