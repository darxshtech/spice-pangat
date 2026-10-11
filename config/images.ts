// Image slots. Leave `src` undefined to use the built-in illustration; set it to a
// file in /public/images/... (e.g. "/images/food/thali.jpg") to swap in real photography.
import type { SceneKey } from "@/components/art/Scenes";

export interface ImageSlot { scene: SceneKey; src?: string; alt: string }

export const images = {
  storyLarge: { scene: "thali", src: "/images/food/story-thali.jpg", alt: "Authentic Maharashtrian vegetarian thali feast with puran poli and bowls of dal" },
  storySmall: { scene: "spices", src: "/images/food/story-spices.jpg", alt: "Bowls of turmeric, chilli powder, whole spices and aromatics" },
  expFlavours: { scene: "spices", src: "/images/food/exp-flavours.jpg", alt: "Fresh spices in rustic brass bowls and katoris" },
  expTables: { scene: "table", src: "/images/food/exp-tables.jpg", alt: "A warm shared table laid with food and hospitality" },
  expCulture: { scene: "faral", src: "/images/food/exp-culture.jpg", alt: "Diwali faral sweets, ladoos and traditional festive treats" },
  eventHero: { scene: "faral", src: "/images/gatherings/aathvanitali-diwali.png", alt: "Aathvanitali Diwali Supper Club official poster with code EARLYBIRD" },
  eventDiya: { scene: "diya", src: "/images/food/event-diya.jpg", alt: "Glowing festive diyas and celebratory warmth" },
  gThali: { scene: "thali", src: "/images/food/gallery-thali.jpg", alt: "A rich vegetarian Indian thali spread" },
  gFaral: { scene: "faral", src: "/images/food/gallery-faral.jpg", alt: "Traditional festive faral sweets and savoury snacks" },
  gSpices: { scene: "spices", src: "/images/food/gallery-spices.jpg", alt: "Aromatic Indian whole spices and herbs" },
  gLeaf: { scene: "leaf", src: "/images/food/gallery-leaf.jpg", alt: "Traditional feast served on a fresh green banana leaf" },
  gBrass: { scene: "brass", src: "/images/food/gallery-brass.jpg", alt: "Traditional brass dinnerware and serving vessels" },
  gTable: { scene: "table", src: "/images/food/gallery-table.jpg", alt: "A welcoming communal dining table shared with friends" },
  gRangoli: { scene: "rangoli", src: "/images/food/gallery-rangoli.jpg", alt: "Diwali rangoli decorated with marigold flowers and lamps" },
  gDiya: { scene: "diya", src: "/images/food/gallery-diya.jpg", alt: "Warm glowing clay oil lamps for festive celebration" },
} satisfies Record<string, ImageSlot>;
