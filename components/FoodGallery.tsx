"use client";
import Image from "next/image";
import { brand } from "@/config/brand";
import { Reveal } from "./Motion";

interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  shape: "tall" | "wide" | "square";
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: "/images/gallery/g1-thali.jpg",
    alt: "A thali of many small dishes served on a banana leaf",
    caption: "The thali — many flavours, one plate",
    shape: "tall",
  },
  {
    src: "/images/gallery/g2-tables.jpg",
    alt: "A candlelit table laid for a shared meal",
    caption: "Tables set for gathering",
    shape: "wide",
  },
  {
    src: "/images/gallery/g3-faral.jpg",
    alt: "Festive sweets, diyas and petals on a green surface",
    caption: "Faral and festive sweets",
    shape: "square",
  },
  {
    src: "/images/gallery/g4-spices.jpg",
    alt: "Spoons of ground spices with fresh herbs",
    caption: "Spices, patiently ground",
    shape: "square",
  },
  {
    src: "/images/gallery/g5-leaf.jpg",
    alt: "A banana leaf meal with small bowls of accompaniments",
    caption: "Served on the leaf",
    shape: "wide",
  },
  {
    src: "/images/gallery/g6-sharing.jpg",
    alt: "Bowls of curries and rice shared across a table",
    caption: "Made for sharing",
    shape: "square",
  },
];

export default function FoodGallery() {
  return (
    <section id="gallery" className="gallery section section-tint" aria-labelledby="gallery-title">
      <div className="container">
        <Reveal className="section-head section-head--split">
          <div>
            <p className="eyebrow">From Our Kitchen &amp; Table</p>
            <h2 id="gallery-title" className="section-title">
              A feast for the eyes, <em>first</em>.
            </h2>
          </div>
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gallery-instagram"
            data-testid="gallery-instagram-link"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            Follow @spiceandpangat
          </a>
        </Reveal>

        <div className="gallery-grid" data-testid="gallery-grid">
          {GALLERY_ITEMS.map((item, i) => (
            <Reveal
              key={item.src}
              delay={(i % 3) * 0.08}
              className={`gallery-item gallery-item--${item.shape}`}
              data-testid={`gallery-item-${i + 1}`}
            >
              <figure>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="gallery-item__img"
                />
                <figcaption>{item.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="gallery-note">
            Photography shown is illustrative while we prepare images from our own table — visit our Instagram for moments from past gatherings.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
