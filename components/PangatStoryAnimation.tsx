"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useMediaQuery } from "./useNarrow";

interface IngredientCardItem {
  key: string;
  image: { src: string; alt: string };
  label: string;
  from: { x: number; y: number; r: number };
  to: { x: number; y: number; r: number };
}

const CARDS: IngredientCardItem[] = [
  {
    key: "spices",
    image: {
      src: "/images/scroll/spices.jpg",
      alt: "Spoons of vibrant roasted Maharashtrian spices",
    },
    label: "Spices, patiently ground",
    from: { x: -520, y: -230, r: -12 },
    to: { x: -185, y: -140, r: -4 },
  },
  {
    key: "ingredients",
    image: {
      src: "/images/scroll/ingredients.jpg",
      alt: "Turmeric, dried chillies, cardamom and whole spices",
    },
    label: "Fresh from the market",
    from: { x: 520, y: -240, r: 10 },
    to: { x: 185, y: -140, r: 4 },
  },
  {
    key: "meal",
    image: {
      src: "/images/scroll/meal.jpg",
      alt: "A thali of curries and rice served with a banana leaf",
    },
    label: "Cooked with care",
    from: { x: -540, y: 230, r: 8 },
    to: { x: -185, y: 140, r: 3 },
  },
  {
    key: "faral",
    image: {
      src: "/images/scroll/faral.jpg",
      alt: "Festive sweets with diyas and petals",
    },
    label: "A little something sweet",
    from: { x: 540, y: 240, r: -9 },
    to: { x: 185, y: 140, r: -3 },
  },
];

interface TableSeatItem {
  id: string;
  type: "thali" | "faral";
  image: string;
  alt: string;
  seatAngleDeg: number; // Angle around table (-90 is top)
  fromOffset: [number, number]; // [vw, vh] offscreen start
  enterProgress: number;
}

const SEATS: TableSeatItem[] = [
  {
    id: "seat-top",
    type: "thali",
    image: "/images/table/thali-plate.png",
    alt: "Maharashtrian brass thali with varan bhaat, katoris and puran poli",
    seatAngleDeg: -90,
    fromOffset: [0, -80],
    enterProgress: 0.44,
  },
  {
    id: "seat-top-right",
    type: "faral",
    image: "/images/table/faral-plate.png",
    alt: "Diwali faral plate with crispy chakli, karanji and ladoos",
    seatAngleDeg: -30,
    fromOffset: [75, -45],
    enterProgress: 0.49,
  },
  {
    id: "seat-bottom-right",
    type: "thali",
    image: "/images/table/thali-plate.png",
    alt: "Maharashtrian brass thali feast",
    seatAngleDeg: 30,
    fromOffset: [75, 45],
    enterProgress: 0.54,
  },
  {
    id: "seat-bottom",
    type: "faral",
    image: "/images/table/faral-plate.png",
    alt: "Festive sweets plate on the pangat table",
    seatAngleDeg: 90,
    fromOffset: [0, 80],
    enterProgress: 0.59,
  },
  {
    id: "seat-bottom-left",
    type: "thali",
    image: "/images/table/thali-plate.png",
    alt: "Traditional brass thali for seated guest",
    seatAngleDeg: 150,
    fromOffset: [-75, 45],
    enterProgress: 0.64,
  },
  {
    id: "seat-top-left",
    type: "faral",
    image: "/images/table/faral-plate.png",
    alt: "Faral sweet plate on the shared table",
    seatAngleDeg: 210,
    fromOffset: [-75, -45],
    enterProgress: 0.69,
  },
];

function IngredientCard({
  card,
  progress,
}: {
  card: IngredientCardItem;
  progress: MotionValue<number>;
}) {
  const x = useTransform(progress, [0, 0.32], [card.from.x, card.to.x]);
  const y = useTransform(progress, [0, 0.32], [card.from.y, card.to.y]);
  const rotate = useTransform(progress, [0, 0.32], [card.from.r, card.to.r]);
  const opacity = useTransform(progress, [0, 0.08, 0.38, 0.48], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0.38, 0.48], [1, 0.8]);

  return (
    <motion.figure
      className="pangat-card"
      style={{ x, y, rotate, opacity, scale }}
      data-testid={`scroll-thali-card-${card.key}`}
    >
      <div className="pangat-card__img-wrap">
        <Image
          src={card.image.src}
          alt={card.image.alt}
          width={400}
          height={500}
          sizes="(max-width: 860px) 160px, 250px"
          className="pangat-card__img"
        />
      </div>
      <figcaption>{card.label}</figcaption>
    </motion.figure>
  );
}

function TableSeatPlate({
  seat,
  index,
  progress,
}: {
  seat: TableSeatItem;
  index: number;
  progress: MotionValue<number>;
}) {
  // Radius from center of table in vmin
  const R = 21; // vmin
  const rad = (seat.seatAngleDeg * Math.PI) / 180;
  const targetX = Math.cos(rad) * R;
  const targetY = Math.sin(rad) * R;

  const e = seat.enterProgress;
  const l = e + 0.22;

  // Arc curve calculation
  const curveDir = index % 2 === 0 ? 1 : -1;
  const midX = (seat.fromOffset[0] + targetX) / 2 + 6 * curveDir;
  const midY = (seat.fromOffset[1] + targetY) / 2 - 4 * curveDir;

  const x = useTransform(
    progress,
    [e, (e + l) / 2, l],
    [`${seat.fromOffset[0]}vw`, `${midX}vmin`, `${targetX}vmin`]
  );
  const y = useTransform(
    progress,
    [e, (e + l) / 2, l],
    [`${seat.fromOffset[1]}vh`, `${midY}vmin`, `${targetY}vmin`]
  );
  const rotate = useTransform(
    progress,
    [e, l],
    [seat.seatAngleDeg + 45, seat.seatAngleDeg + 90]
  );
  const scale = useTransform(progress, [e, l], [1.4, 1]);
  const opacity = useTransform(progress, [e, e + 0.05], [0, 1]);

  return (
    <motion.div
      className="shared-table__seat-plate"
      style={{ x, y, rotate, scale, opacity }}
      aria-hidden="true"
    >
      <Image
        src={seat.image}
        alt={seat.alt}
        width={300}
        height={300}
        sizes="(max-width: 640px) 120px, (max-width: 1024px) 150px, 180px"
        quality={85}
        loading="lazy"
        className="shared-table__plate-img"
      />
    </motion.div>
  );
}

function SharedCommunalTable({ progress }: { progress: MotionValue<number> }) {
  // Table entrance: appears as ingredient cards fade out (0.42 to 0.58)
  const tableOpacity = useTransform(progress, [0.42, 0.52], [0, 1]);
  const tableScale = useTransform(progress, [0.42, 0.72], [0.82, 1]);
  const placematsOpacity = useTransform(progress, [0.46, 0.56], [0, 1]);
  const placematsScale = useTransform(progress, [0.46, 0.62], [0.75, 1]);
  const glowOpacity = useTransform(progress, [0.65, 0.85], [0, 0.7]);
  const centerSpicesOpacity = useTransform(progress, [0.55, 0.68], [0, 1]);

  // Leaf placemats positioning around 6 seats
  const leafAngles = [-90, -30, 30, 90, 150, 210];
  const leafRadius = 23; // vmin

  return (
    <motion.div
      className="shared-table"
      style={{ opacity: tableOpacity, scale: tableScale }}
      role="img"
      aria-label="A realistic shared round table laid for six guests with Maharashtrian brass thalis and banana leaf placemats"
    >
      {/* Ambient warm table glow */}
      <motion.div
        className="shared-table__glow"
        style={{ opacity: glowOpacity }}
        aria-hidden="true"
      />

      {/* 1. Realistic Round Teak Table Cutout */}
      <div className="shared-table__wood">
        <Image
          src="/images/table/round-table.png"
          alt="Polished circular teak dining table with burgundy centerpiece"
          width={900}
          height={900}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 62vmin, 540px"
          quality={85}
          loading="lazy"
          className="shared-table__wood-img"
        />
      </div>

      {/* 2. 6 Banana Leaf Placemats radiating outward at each seat */}
      <motion.div
        className="shared-table__placemats"
        style={{ opacity: placematsOpacity, scale: placematsScale }}
        aria-hidden="true"
      >
        {leafAngles.map((angleDeg, i) => {
          const rad = (angleDeg * Math.PI) / 180;
          const lx = Math.cos(rad) * leafRadius;
          const ly = Math.sin(rad) * leafRadius;
          return (
            <div
              key={i}
              className="shared-table__leaf-wrap"
              style={{
                transform: `translate(${lx}vmin, ${ly}vmin) rotate(${angleDeg + 90}deg)`,
              }}
            >
              <Image
                src="/images/table/leaf-placemat.png"
                alt="Fresh banana leaf placemat"
                width={360}
                height={140}
                sizes="(max-width: 640px) 130px, 180px"
                quality={85}
                loading="lazy"
                className="shared-table__leaf-img"
              />
            </div>
          );
        })}
      </motion.div>

      {/* 3. Center Spices / Brass Katoris on the burgundy runner */}
      <motion.div
        className="shared-table__center-decor"
        style={{ opacity: centerSpicesOpacity }}
        aria-hidden="true"
      >
        <Image
          src="/images/spice-pangat/spices/green-cardamom.png"
          alt="Green cardamom pods"
          width={70}
          height={60}
          className="shared-table__center-spice"
        />
        <Image
          src="/images/spice-pangat/spices/turmeric-powder.png"
          alt="Turmeric powder"
          width={80}
          height={65}
          className="shared-table__center-spice"
        />
      </motion.div>

      {/* 4. Realistic Plates Drifting in onto the 6 Seats */}
      {SEATS.map((seat, idx) => (
        <TableSeatPlate
          key={seat.id}
          seat={seat}
          index={idx}
          progress={progress}
        />
      ))}
    </motion.div>
  );
}

function PinnedSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Eyebrow and Headline: crossfade from Ingredient Journey to A Shared Table
  const ingredientHeadOpacity = useTransform(
    scrollYProgress,
    [0, 0.06, 0.36, 0.44],
    [0, 1, 1, 0]
  );
  const ingredientHeadY = useTransform(scrollYProgress, [0, 0.06], [30, 0]);

  const tableHeadOpacity = useTransform(
    scrollYProgress,
    [0.44, 0.52, 0.88, 0.96],
    [0, 1, 1, 0.6]
  );
  const tableHeadY = useTransform(scrollYProgress, [0.44, 0.52], [28, 0]);

  // Climax statement
  const stmtOpacity = useTransform(scrollYProgress, [0.82, 0.94], [0, 1]);
  const stmtY = useTransform(scrollYProgress, [0.82, 0.94], [30, 0]);

  return (
    <div className="pangat-track" ref={ref} data-testid="scroll-thali-container">
      <div className="pangat-sticky">
        {/* Stage 1 Header: From Ingredients to a Pangat */}
        <motion.div
          className="pangat-head"
          style={{ opacity: ingredientHeadOpacity, y: ingredientHeadY }}
        >
          <p className="eyebrow">From Ingredients to a Pangat</p>
          <h2 className="section-title">
            The Journey to <em>the Table</em>
          </h2>
        </motion.div>

        {/* Stage 2 Header: A Shared Table — Every flavour has a place. Every person has a seat. */}
        <motion.div
          className="pangat-head"
          style={{ opacity: tableHeadOpacity, y: tableHeadY }}
        >
          <p className="eyebrow">A Shared Table</p>
          <h2 className="section-title">
            Every flavour has a place. <em>Every person has a seat.</em>
          </h2>
        </motion.div>

        {/* 1. Floating Ingredient Cards (Phase 1) */}
        {CARDS.map((card) => (
          <IngredientCard key={card.key} card={card} progress={scrollYProgress} />
        ))}

        {/* 2. Realistic Shared Communal Table Animation (Phase 2 & Climax) */}
        <SharedCommunalTable progress={scrollYProgress} />

        {/* 3. Final Statement & Booking CTA */}
        <motion.div
          className="pangat-statement"
          style={{ opacity: stmtOpacity, y: stmtY }}
        >
          <p
            className="pangat-statement-text"
            data-testid="scroll-thali-statement"
          >
            Come for the flavours. <em>Stay for the feeling.</em>
          </p>
          <div className="pangat-statement-btn-wrap">
            <a href="#gatherings" className="btn btn--primary btn--sm">
              Reserve Your Seat at the Table
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StaticFallback() {
  return (
    <div className="pangat-static container" data-testid="scroll-thali-static">
      <div className="section-head center">
        <p className="eyebrow">A Shared Table</p>
        <h2 className="section-title">
          Every flavour has a place. <em>Every person has a seat.</em>
        </h2>
        <p className="section-sub">
          From stone-ground spices to a full communal table where strangers sit shoulder-to-shoulder as friends.
        </p>
      </div>

      {/* Ingredient cards */}
      <div className="pangat-static-grid">
        {CARDS.map((card) => (
          <figure key={card.key} className="pangat-static-card">
            <Image
              src={card.image.src}
              alt={card.image.alt}
              width={400}
              height={500}
              sizes="(max-width: 600px) 45vw, 220px"
            />
            <figcaption>{card.label}</figcaption>
          </figure>
        ))}
      </div>

      {/* Realistic Table Laid For Guests */}
      <div className="shared-table-static">
        <div className="shared-table-static__wrap">
          <Image
            src="/images/table/round-table.png"
            alt="Shared dining table"
            width={700}
            height={700}
            sizes="(max-width: 640px) 90vw, 520px"
            quality={85}
            loading="lazy"
            className="shared-table-static__table"
          />
          {/* Static Thalis & Faral on the seats */}
          <div className="shared-table-static__plate shared-table-static__plate--1">
            <Image
              src="/images/table/thali-plate.png"
              alt="Brass thali"
              width={160}
              height={160}
              sizes="(max-width: 640px) 110px, 150px"
              quality={85}
              loading="lazy"
            />
          </div>
          <div className="shared-table-static__plate shared-table-static__plate--2">
            <Image
              src="/images/table/faral-plate.png"
              alt="Faral plate"
              width={160}
              height={160}
              sizes="(max-width: 640px) 110px, 150px"
              quality={85}
              loading="lazy"
            />
          </div>
          <div className="shared-table-static__plate shared-table-static__plate--3">
            <Image
              src="/images/table/thali-plate.png"
              alt="Brass thali"
              width={160}
              height={160}
              sizes="(max-width: 640px) 110px, 150px"
              quality={85}
              loading="lazy"
            />
          </div>
          <div className="shared-table-static__plate shared-table-static__plate--4">
            <Image
              src="/images/table/faral-plate.png"
              alt="Faral plate"
              width={160}
              height={160}
              sizes="(max-width: 640px) 110px, 150px"
              quality={85}
              loading="lazy"
            />
          </div>
          <div className="shared-table-static__plate shared-table-static__plate--5">
            <Image
              src="/images/table/thali-plate.png"
              alt="Brass thali"
              width={160}
              height={160}
              sizes="(max-width: 640px) 110px, 150px"
              quality={85}
              loading="lazy"
            />
          </div>
          <div className="shared-table-static__plate shared-table-static__plate--6">
            <Image
              src="/images/table/faral-plate.png"
              alt="Faral plate"
              width={160}
              height={160}
              sizes="(max-width: 640px) 110px, 150px"
              quality={85}
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="center pangat-static-foot">
        <p className="pangat-statement-text">
          Come for the flavours. <em>Stay for the feeling.</em>
        </p>
        <a href="#gatherings" className="btn btn--primary" style={{ marginTop: "1.2rem" }}>
          Reserve Your Seat at the Table
        </a>
      </div>
    </div>
  );
}

export default function PangatStoryAnimation() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isNarrow = useMediaQuery("(max-width: 860px)");
  const prefersReduced = useReducedMotion();

  if (!mounted) {
    return (
      <section
        className="pangat"
        id="ingredients-to-pangat"
        aria-label="A Shared Table — From Ingredients to a Pangat"
      >
        <StaticFallback />
      </section>
    );
  }

  return (
    <section
      className="pangat"
      id="ingredients-to-pangat"
      aria-label="A Shared Table — From Ingredients to a Pangat"
    >
      {isNarrow || prefersReduced ? <StaticFallback /> : <PinnedSequence />}
    </section>
  );
}
