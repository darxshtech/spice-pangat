"use client";
/**
 * SpiceRitualAnimation — Signature scroll-driven sequence using realistic PNG assets.
 *
 * Sequence:
 *   0–12%   Headline, realistic banana-leaf.png unfolds
 *  12–40%   Realistic transparent spices enter from diverse corners & edges
 *  40–58%   Spices converge naturally over the realistic banana leaf into center
 *  55–76%   Transition reveals maharashtrian-thali-banana-leaf.png
 *  76–91%   Scene settles lower, original Spice & Pangat logo rises above the meal
 *  91–100%  Hold & releases smoothly into next section
 *
 * Preserves scroll timing, responsive sizing, and reduced-motion fallbacks.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { brand } from "@/config/brand";
import { EASE } from "@/lib/motion";
import { useNarrow, usePrefersReducedMotion } from "./useNarrow";

interface RealisticSpiceDef {
  key: string;
  file: string;
  name: string;
  marathi: string;
  size: number; // vmin
  from: [number, number]; // vw, vh offset from centre (off-screen start)
  rest: [number, number]; // where it lingers before converging
  enter: number; // scroll progress threshold
  rot: number; // initial rotation degrees
  trail?: string; // warm glow trail accent
  extra?: boolean; // hidden on small mobile
}

const REALISTIC_SPICES: RealisticSpiceDef[] = [
  {
    key: "turmeric",
    file: "/images/spice-pangat/spices/turmeric-powder.png",
    name: "Turmeric Powder",
    marathi: "Haldi",
    size: 26,
    from: [-64, -62],
    rest: [-27, -20],
    enter: 0.12,
    rot: -35,
    trail: "#EBA815",
  },
  {
    key: "chilliPowder",
    file: "/images/spice-pangat/spices/red-chilli-powder.png",
    name: "Red Chilli Powder",
    marathi: "Lal Tikhat",
    size: 25,
    from: [64, -64],
    rest: [27, -21],
    enter: 0.13,
    rot: 30,
    trail: "#C2281D",
  },
  {
    key: "cumin",
    file: "/images/spice-pangat/spices/cumin-seeds.png",
    name: "Cumin Seeds",
    marathi: "Jeera",
    size: 22,
    from: [-64, 58],
    rest: [-29, 20],
    enter: 0.15,
    rot: 45,
    trail: "#A1784A",
  },
  {
    key: "cinnamon",
    file: "/images/spice-pangat/spices/cinnamon-sticks.png",
    name: "Cinnamon Sticks",
    marathi: "Dalchini",
    size: 26,
    from: [64, 62],
    rest: [29, 23],
    enter: 0.16,
    rot: -25,
    trail: "#7A3E26",
  },
  {
    key: "chillies",
    file: "/images/spice-pangat/spices/dried-red-chillies.png",
    name: "Dried Red Chillies",
    marathi: "Sukya Mirchya",
    size: 25,
    from: [72, -24],
    rest: [33, -5],
    enter: 0.18,
    rot: 50,
    trail: "#C2281D",
  },
  {
    key: "cardamom",
    file: "/images/spice-pangat/spices/green-cardamom.png",
    name: "Green Cardamom",
    marathi: "Hirvi Velchi",
    size: 20,
    from: [32, 72],
    rest: [11, 28],
    enter: 0.20,
    rot: -45,
    trail: "#5B7846",
  },
  {
    key: "mustard",
    file: "/images/spice-pangat/spices/mustard-seeds.png",
    name: "Mustard Seeds",
    marathi: "Mohari",
    size: 19,
    from: [-26, -72],
    rest: [-10, -28],
    enter: 0.21,
    rot: 20,
    trail: "#3D2B1F",
  },
  {
    key: "coriander",
    file: "/images/spice-pangat/spices/coriander-seeds.png",
    name: "Coriander Seeds",
    marathi: "Dhane",
    size: 21,
    from: [-72, 18],
    rest: [-35, 3],
    enter: 0.22,
    rot: -25,
    trail: "#B89758",
    extra: true,
  },
  {
    key: "pepper",
    file: "/images/spice-pangat/spices/black-peppercorns.png",
    name: "Black Peppercorns",
    marathi: "Kali Miri",
    size: 19,
    from: [72, 38],
    rest: [35, 15],
    enter: 0.23,
    rot: 65,
    trail: "#2B201C",
    extra: true,
  },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function RealisticSpiceItem({
  def,
  index,
  progress,
}: {
  def: RealisticSpiceDef;
  index: number;
  progress: MotionValue<number>;
}) {
  const k = useMemo(() => {
    const e = def.enter;
    const l = Math.min(e + 0.2, 0.4);
    const c0 = 0.42;
    const c1 = 0.55 + index * 0.0045;
    const dir = index % 2 ? 1 : -1;
    const perp = (
      a: [number, number],
      b: [number, number],
      m: number
    ): [number, number] => {
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const len = Math.hypot(dx, dy) || 1;
      return [(-dy / len) * m, (dx / len) * m];
    };
    const pA = perp(def.from, def.rest, 8 * dir);
    const pB = perp(def.rest, [0, 0], 10 * -dir);
    const a: [number, number] = [
      lerp(def.from[0], def.rest[0], 0.5) + pA[0],
      lerp(def.from[1], def.rest[1], 0.5) + pA[1],
    ];
    const b: [number, number] = [
      lerp(def.rest[0], 0, 0.5) + pB[0],
      lerp(def.rest[1], 0, 0.5) + pB[1],
    ];
    const drift: [number, number] = [def.rest[0] * 0.92, def.rest[1] * 0.92];
    const jitter = [((index * 7) % 5) - 2, ((index * 3) % 5) - 2];
    const t = [e, (e + l) / 2, l, c0, (c0 + c1) / 2, c1];
    return {
      t,
      x: [def.from[0], a[0], def.rest[0], drift[0], b[0], jitter[0]].map((v) => `${v}vw`),
      y: [def.from[1], a[1], def.rest[1], drift[1], b[1], jitter[1]].map((v) => `${v}vh`),
      e,
      l,
      c0,
      c1,
      trailAngle: Math.round(
        (Math.atan2(def.rest[1] - def.from[1], def.rest[0] - def.from[0]) * 180) / Math.PI
      ),
    };
  }, [def, index]);

  const x = useTransform(progress, k.t, k.x);
  const y = useTransform(progress, k.t, k.y);
  const rotate = useTransform(
    progress,
    [k.e, k.l, k.c0, k.c1],
    [def.rot, def.rot * 0.3, def.rot * 0.2, def.rot * 0.2 + (index % 2 ? 180 : -180)]
  );
  const scale = useTransform(
    progress,
    [k.e, k.l, k.c0, k.c1, 0.64],
    [1.25, 1, 1, 0.65, 0.3]
  );
  const opacity = useTransform(
    progress,
    [k.e, k.e + 0.03, 0.54, 0.64],
    [0, 1, 1, 0]
  );
  const trailOpacity = useTransform(
    progress,
    [k.e, (k.e + k.l) / 2, k.l],
    [0, 0.5, 0]
  );

  const size = `${def.size}vmin`;
  const margin = `${-def.size / 2}vmin`;

  return (
    <>
      {def.trail && (
        <motion.div
          aria-hidden="true"
          className={`ritual__trail${def.extra ? " ritual__spice--extra" : ""}`}
          style={{
            x,
            y,
            opacity: trailOpacity,
            width: `${def.size * 1.5}vmin`,
            height: `${def.size * 0.24}vmin`,
            marginLeft: `${-def.size * 1.5 + def.size * 0.4}vmin`,
            marginTop: `${-def.size * 0.12}vmin`,
            rotate: k.trailAngle,
          }}
        >
          <i style={{ background: `linear-gradient(to left, ${def.trail}, transparent)` }} />
        </motion.div>
      )}

      <motion.div
        aria-hidden="true"
        className={`ritual__spice${def.extra ? " ritual__spice--extra" : ""}`}
        style={{
          x,
          y,
          rotate,
          scale,
          opacity,
          width: size,
          height: size,
          marginLeft: margin,
          marginTop: margin,
        }}
      >
        <Image
          src={def.file}
          alt={`${def.name} (${def.marathi})`}
          width={400}
          height={320}
          className="ritual__spice-realistic"
          priority
        />
      </motion.div>
    </>
  );
}

const EYEBROW = "A Maharashtrian supper club · Northwood, London";

function PinnedRitual({ narrow }: { narrow: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  // Stage A — Headline
  const introOpacity = useTransform(p, [0, 0.07, 0.11], [1, 0.8, 0]);
  const introY = useTransform(p, [0, 0.11], ["0px", "-48px"]);
  const hintOpacity = useTransform(p, [0, 0.03], [1, 0]);

  // Banana Leaf unfolds
  const leafOpacity = useTransform(p, [0.01, 0.06], [0, 1]);
  const leafClip = useTransform(
    p,
    [0.01, 0.13],
    ["inset(0% 46% 0% 46% round 40px)", "inset(0% 0% 0% 0% round 0px)"]
  );
  const leafScaleX = useTransform(p, [0.01, 0.13], [0.6, 1]);

  // Camera / Scene scale: push-in during spice mix, then settle low for logo reveal
  const sceneScale = useTransform(
    p,
    [0, 0.13, 0.5, 0.74, 0.88],
    narrow ? [0.82, 0.9, 0.96, 0.96, 0.74] : [0.82, 1, 1.06, 1.06, 0.66]
  );
  const sceneY = useTransform(
    p,
    [0.74, 0.88],
    ["0svh", narrow ? "18svh" : "18svh"]
  );

  // Blend Glow during convergence
  const glowOpacity = useTransform(p, [0.45, 0.56, 0.76], [0, 0.65, 0]);

  // Stage D — Realistic Maharashtrian Thali reveal on banana leaf
  const mealClip = useTransform(
    p,
    [0.55, 0.74],
    ["circle(0% at 50% 50%)", "circle(85% at 50% 50%)"]
  );
  const mealOpacity = useTransform(p, [0.55, 0.62], [0, 1]);
  const mealScale = useTransform(p, [0.55, 0.76], [0.92, 1]);

  // Stage E — Original Logo rises above the meal
  const logoOpacity = useTransform(p, [0.76, 0.87], [0, 1]);
  const logoY = useTransform(p, [0.76, 0.89], ["36px", "0px"]);
  const lineOpacity = useTransform(p, [0.87, 0.93], [0, 1]);
  const lineY = useTransform(p, [0.87, 0.93], ["14px", "0px"]);

  return (
    <div className="ritual__track" ref={track}>
      <div className="ritual__sticky">
        {/* 1. Realistic Banana Leaf */}
        <motion.div
          className="ritual__leaf"
          style={{
            opacity: leafOpacity,
            clipPath: leafClip,
            scaleX: leafScaleX,
            scale: sceneScale,
            y: sceneY,
          }}
        >
          <Image
            src="/images/spice-pangat/banana-leaf.png"
            alt="Fresh vibrant banana leaf overhead presentation"
            width={2076}
            height={757}
            priority
            className="ritual__leaf-img"
          />
        </motion.div>

        {/* Warm convergence glow */}
        <motion.div
          className="ritual__glow"
          aria-hidden="true"
          style={{ opacity: glowOpacity }}
        />

        {/* 2. Realistic Transparent Spices entering from corners */}
        {REALISTIC_SPICES.map((spice, idx) => (
          <RealisticSpiceItem
            key={spice.key}
            def={spice}
            index={idx}
            progress={p}
          />
        ))}

        {/* 3. Realistic Maharashtrian Feast reveal on banana leaf */}
        <motion.div
          className="ritual__meal"
          style={{
            clipPath: mealClip,
            opacity: mealOpacity,
            scale: mealScale,
            y: sceneY,
          }}
        >
          <motion.div
            style={{ scale: sceneScale }}
            className="ritual__meal-inner"
            role="img"
            aria-label="A traditional Maharashtrian vegetarian thali served on banana leaf"
          >
            <Image
              src="/images/spice-pangat/maharashtrian-thali-banana-leaf.png"
              alt="A complete Maharashtrian meal served on banana leaf"
              width={1774}
              height={887}
              priority
              className="ritual__meal-img"
            />
          </motion.div>
        </motion.div>

        {/* Stage A: Intro Title & Sub */}
        <motion.div
          className="ritual__intro"
          style={{ opacity: introOpacity, y: introY }}
        >
          <p className="eyebrow">{EYEBROW}</p>
          <motion.h1
            className="ritual__title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          >
            The flavours of Maharashtra.
            <br />
            <em>The feeling of home.</em>
          </motion.h1>
          <p className="ritual__sub">
            Familiar flavours. Shared stories. A little piece of home, brought to the table.
          </p>
        </motion.div>

        {/* Scroll Cue */}
        <motion.div
          className="ritual__scroll"
          style={{ opacity: hintOpacity }}
          aria-hidden="true"
        >
          <span>Scroll</span>
          <i />
        </motion.div>

        {/* Stage E: Original Spice & Pangat Logo above the meal */}
        <motion.div
          className="ritual__logo"
          style={{ opacity: logoOpacity, y: logoY }}
        >
          <Image
            src={brand.logo.transparent}
            alt="Spice & Pangat — Maharashtrian Supper Club"
            width={855}
            height={680}
            priority
            sizes="(max-width: 760px) 88vw, 460px"
            className="ritual__logo-img"
          />
        </motion.div>

        <motion.p
          className="ritual__line"
          style={{ opacity: lineOpacity, y: lineY }}
        >
          Every spice has a story. Every pangat brings us together.
        </motion.p>
      </div>
    </div>
  );
}

export default function SpiceRitualAnimation() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const narrow = useNarrow();

  return (
    <section
      className="ritual"
      aria-label="Spice & Pangat — the flavours of Maharashtra"
    >
      {mounted ? (
        <PinnedRitual narrow={narrow} />
      ) : (
        <div className="ritual__track">
          <div className="ritual__sticky">
            <div
              className="ritual__leaf"
              style={{
                opacity: 1,
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                transform: "scale(0.82)",
              }}
            >
              <Image
                src="/images/spice-pangat/banana-leaf.png"
                alt="Fresh vibrant banana leaf overhead presentation"
                width={2076}
                height={757}
                priority
                className="ritual__leaf-img"
              />
            </div>

            <div className="ritual__intro">
              <p className="eyebrow">{EYEBROW}</p>
              <h1 className="ritual__title">
                The flavours of Maharashtra.
                <br />
                <em>The feeling of home.</em>
              </h1>
              <p className="ritual__sub">
                Familiar flavours. Shared stories. A little piece of home, brought to the table.
              </p>
            </div>

            <div className="ritual__scroll" aria-hidden="true">
              <span>Scroll</span>
              <i />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
