import { ReactNode } from "react";

export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
export const r2 = (n: number) => Math.round(n * 100) / 100;

interface SeedsProps {
  n: number;
  seed: number;
  cx: number;
  cy: number;
  rx: number;
  ry?: number;
  size: number;
  shape?: "ellipse" | "circle";
  fills: string[];
  stroke?: string;
  highlight?: string;
}
/** Deterministic scatter of seeds inside an ellipse (SSR-safe). */
export function Seeds({
  n, seed, cx, cy, rx, ry = rx, size, shape = "circle", fills, stroke, highlight,
}: SeedsProps) {
  const rand = rng(seed);
  const items = Array.from({ length: n }, () => {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand());
    return {
      x: r2(cx + Math.cos(a) * d * rx),
      y: r2(cy + Math.sin(a) * d * ry),
      rot: r2(rand() * 180),
      s: r2(size * (0.8 + rand() * 0.4)),
      f: fills[Math.floor(rand() * fills.length)],
    };
  });
  return (
    <g>
      {items.map((it, i) => (
        <g key={i} transform={`translate(${it.x} ${it.y}) rotate(${it.rot})`}>
          {shape === "circle" ? (
            <circle r={it.s} fill={it.f} stroke={stroke} strokeWidth={0.5} />
          ) : (
            <ellipse rx={it.s * 1.6} ry={it.s * 0.7} fill={it.f} stroke={stroke} strokeWidth={0.5} />
          )}
          {highlight && (
            <circle cx={-it.s * 0.3} cy={-it.s * 0.3} r={it.s * 0.28} fill={highlight} opacity={0.6} />
          )}
        </g>
      ))}
    </g>
  );
}

/** Brass bowl (katori) seen from above. */
export function Katori({
  cx, cy, r, children, tone = "brass", id,
}: {
  cx: number; cy: number; r: number; children?: ReactNode; tone?: "brass" | "steel" | "clay" | "white"; id: string;
}) {
  const g = {
    brass: ["#E3C27A", "#A6792C", "#7A5518"],
    steel: ["#F0F0EE", "#B9BBBC", "#8A8D90"],
    clay: ["#C9754A", "#9A4E2B", "#6E3318"],
    white: ["#FFFFFF", "#E9E3D6", "#C9C0AE"],
  }[tone];
  return (
    <g>
      <defs>
        <radialGradient id={`kg-${id}`} cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor={g[0]} />
          <stop offset="0.6" stopColor={g[1]} />
          <stop offset="1" stopColor={g[2]} />
        </radialGradient>
        <clipPath id={`kc-${id}`}>
          <circle cx={cx} cy={cy} r={r * 0.8} />
        </clipPath>
      </defs>
      <circle cx={cx + r * 0.06} cy={cy + r * 0.1} r={r} fill="#000" opacity={0.22} filter="url(#blur6)" />
      <circle cx={cx} cy={cy} r={r} fill={`url(#kg-${id})`} />
      <circle cx={cx} cy={cy} r={r * 0.84} fill="none" stroke="#fff" strokeOpacity={0.35} strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={r * 0.8} fill={g[2]} opacity={0.5} />
      <g clipPath={`url(#kc-${id})`}>{children}</g>
    </g>
  );
}

export function SharedDefs() {
  return (
    <defs>
      <filter id="blur6" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
      <filter id="blur14" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="14" />
      </filter>
    </defs>
  );
}
