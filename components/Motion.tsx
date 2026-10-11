"use client";
import { ReactNode, useRef } from "react";
import {
  MotionConfig,
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { clipReveal, fadeUp, lineUp, VIEWPORT } from "@/lib/motion";

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fade-up used for body copy. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p" | "li" | "span";
}) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

/** Line-by-line headline reveal. Pass the lines explicitly for good line breaks. */
export function LineReveal({
  lines,
  className,
  as = "h2",
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const Tag = as;
  return (
    <Tag className={className} aria-label={lines.join(" ")}>
      <motion.span
        aria-hidden="true"
        style={{ display: "block" }}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        {lines.map((l, i) => (
          <span key={i} className="line-mask">
            <motion.span variants={lineUp} custom={i} className="line-inner">
              {l}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Clip-mask image reveal. */
export function ImageReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={clipReveal}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

/** Subtle parallax for a wrapper; strength in px. */
export function Parallax({
  children,
  className,
  strength = 40,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }} className="parallax-inner">
        {children}
      </motion.div>
    </div>
  );
}
