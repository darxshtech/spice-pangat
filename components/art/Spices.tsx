import { Seeds, SharedDefs, r2, rng } from "./primitives";

const V = "0 0 200 200";

function Mound({ id, c0, c1, c2, speck }: { id: string; c0: string; c1: string; c2: string; speck: string[] }) {
  return (
    <>
      <defs>
        <radialGradient id={`m-${id}`} cx="42%" cy="30%" r="75%">
          <stop offset="0" stopColor={c0} />
          <stop offset="0.55" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </radialGradient>
        <clipPath id={`mc-${id}`}>
          <path d="M18 150 C 28 96 60 62 100 58 C 142 62 174 98 184 150 C 150 176 52 176 18 150Z" />
        </clipPath>
      </defs>
      <ellipse cx="102" cy="160" rx="84" ry="16" fill="#000" opacity="0.25" filter="url(#blur6)" />
      <path d="M18 150 C 28 96 60 62 100 58 C 142 62 174 98 184 150 C 150 176 52 176 18 150Z" fill={`url(#m-${id})`} />
      <g clipPath={`url(#mc-${id})`}>
        <Seeds n={90} seed={id.length * 77 + 3} cx={100} cy={118} rx={80} ry={52} size={1.3} fills={speck} />
        <path d="M60 100 C 80 76 118 70 140 88" stroke="#fff" strokeOpacity="0.22" strokeWidth="6" fill="none" strokeLinecap="round" />
      </g>
    </>
  );
}

export function Turmeric() {
  return (
    <svg viewBox={V} aria-hidden="true">
      <SharedDefs />
      <Mound id="turmeric" c0="#FFD34E" c1="#EBA815" c2="#B87408" speck={["#FFE79A", "#D69210", "#F7BE2B"]} />
      {[[-16, 40, 138], [14, 30, 152]].map(([rot, x, y], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
          <rect x="0" y="0" width="52" height="15" rx="7.5" fill="#C9791B" />
          <rect x="2" y="2" width="48" height="5" rx="2.5" fill="#E8A13C" opacity=".7" />
          {[10, 20, 31, 41].map((l) => (
            <path key={l} d={`M${l} 1 Q ${l + 2} 7.5 ${l} 14`} stroke="#8A4E0E" strokeWidth="1" fill="none" opacity=".6" />
          ))}
        </g>
      ))}
    </svg>
  );
}

export function ChilliPowder() {
  return (
    <svg viewBox={V} aria-hidden="true">
      <SharedDefs />
      <Mound id="chillipowder" c0="#E2402F" c1="#B8231A" c2="#6E0F0D" speck={["#F26B4F", "#8E1410", "#C92E22"]} />
    </svg>
  );
}

function Chilli({ x, y, rot, s = 1, id }: { x: number; y: number; rot: number; s?: number; id: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <defs>
        <linearGradient id={`ch-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E23A2C" />
          <stop offset="0.6" stopColor="#B21D1D" />
          <stop offset="1" stopColor="#7C1010" />
        </linearGradient>
      </defs>
      <path d="M0 0 C 18 -4 36 6 50 30 C 62 52 70 84 74 120 C 75 128 70 130 66 122 C 50 96 24 70 8 44 C 2 34 -2 14 0 0Z" fill={`url(#ch-${id})`} />
      <path d="M12 8 C 28 10 40 26 48 46 C 56 66 62 90 66 112" stroke="#FF8A70" strokeOpacity=".55" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M-5 0 C -2 -9 10 -12 18 -6 L 15 3 C 9 0 2 2 -5 0Z" fill="#3E7B3A" />
      <path d="M8 -6 C 8 -18 16 -24 24 -26" stroke="#3E7B3A" strokeWidth="4.5" fill="none" strokeLinecap="round" />
    </g>
  );
}
export function Chillies() {
  return (
    <svg viewBox={V} aria-hidden="true">
      <SharedDefs />
      <ellipse cx="100" cy="150" rx="70" ry="12" fill="#000" opacity=".2" filter="url(#blur6)" />
      <Chilli x={34} y={36} rot={-8} id="a" />
      <Chilli x={78} y={30} rot={14} s={0.95} id="b" />
      <Chilli x={120} y={44} rot={34} s={0.8} id="c" />
    </svg>
  );
}

function SeedPile({ id, n, size, shape, fills, hl, stroke }: {
  id: number; n: number; size: number; shape: "circle" | "ellipse"; fills: string[]; hl?: string; stroke?: string;
}) {
  return (
    <svg viewBox={V} aria-hidden="true">
      <SharedDefs />
      <ellipse cx="100" cy="132" rx="66" ry="46" fill="#000" opacity=".2" filter="url(#blur6)" />
      <Seeds n={n} seed={id} cx={100} cy={112} rx={66} ry={42} size={size} shape={shape} fills={fills} highlight={hl} stroke={stroke} />
    </svg>
  );
}
export const Cumin = () => (
  <SeedPile id={11} n={110} size={3.1} shape="ellipse" fills={["#A9814A", "#8E6733", "#BE9A60"]} stroke="#5B4120" />
);
export const Coriander = () => (
  <SeedPile id={23} n={80} size={5.2} shape="circle" fills={["#C9A25D", "#B98F48", "#D8B574"]} hl="#F5E2B5" stroke="#8A6A2E" />
);
export const Pepper = () => (
  <SeedPile id={37} n={70} size={5.6} shape="circle" fills={["#2A201B", "#3A2D25", "#1D1612"]} hl="#9C8A7C" />
);
export const Mustard = () => (
  <SeedPile id={41} n={190} size={2.4} shape="circle" fills={["#5E3A1D", "#7A4C25", "#3F2813"]} hl="#C9A06A" />
);

export function Cardamom() {
  const pods = [[30, 110, -20], [68, 74, 10], [110, 100, 36], [76, 124, -52], [120, 56, -8]];
  return (
    <svg viewBox={V} aria-hidden="true">
      <SharedDefs />
      <defs>
        <linearGradient id="card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B7D68B" />
          <stop offset="1" stopColor="#5E8F45" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="150" rx="70" ry="12" fill="#000" opacity=".2" filter="url(#blur6)" />
      {pods.map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <path d="M0 0 C 14 -16 42 -16 56 0 C 42 16 14 16 0 0Z" fill="url(#card)" stroke="#43703A" strokeWidth="1" />
          {[10, 20, 30, 40].map((l) => (
            <path key={l} d={`M${l} -9 Q ${l + 3} 0 ${l} 9`} stroke="#43703A" strokeWidth="0.9" fill="none" opacity=".7" />
          ))}
          <path d="M6 -4 C 18 -10 38 -10 50 -3" stroke="#fff" strokeOpacity=".4" strokeWidth="2" fill="none" />
        </g>
      ))}
    </svg>
  );
}

export function Cinnamon() {
  const sticks = [[22, 56, -14, 150], [28, 88, -4, 156], [34, 120, 8, 146]];
  return (
    <svg viewBox={V} aria-hidden="true">
      <SharedDefs />
      <defs>
        <linearGradient id="cin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B4713F" />
          <stop offset="0.5" stopColor="#8D4F26" />
          <stop offset="1" stopColor="#5E3216" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="150" rx="78" ry="12" fill="#000" opacity=".2" filter="url(#blur6)" />
      {sticks.map(([x, y, r, w], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <rect width={w} height="24" rx="12" fill="url(#cin)" />
          <path d={`M12 8 L ${w - 10} 8`} stroke="#D49A66" strokeWidth="1.5" opacity=".6" />
          <path d={`M10 16 L ${w - 14} 16`} stroke="#3F200D" strokeWidth="1.2" opacity=".5" />
          <ellipse cx={w - 10} cy="12" rx="9" ry="11" fill="#7A4220" />
          <path d={`M${w - 10} 12 m -5 0 a 5 6 0 1 1 6 5 a 3 4 0 1 1 -3 -5`} stroke="#E0B07A" strokeWidth="1.3" fill="none" />
        </g>
      ))}
    </svg>
  );
}

export function CurryLeaves() {
  const rand = rng(5);
  const leaves = Array.from({ length: 7 }, (_, i) => ({
    x: r2(30 + i * 24),
    y: r2(112 - Math.sin(i * 0.9) * 26),
    rot: r2(-70 + (i % 2 ? 130 : -10) + rand() * 24),
    s: r2(0.9 + rand() * 0.3),
  }));
  return (
    <svg viewBox={V} aria-hidden="true">
      <SharedDefs />
      <path d="M18 120 C 60 84 120 90 184 100" stroke="#4C6B2F" strokeWidth="3" fill="none" strokeLinecap="round" />
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.rot}) scale(${l.s})`}>
          <path d="M0 0 C 8 -22 30 -26 44 -4 C 30 22 8 18 0 0Z" fill={i % 2 ? "#3E7B34" : "#4F8E3F"} />
          <path d="M2 -2 L 40 -4" stroke="#A9CE86" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
}

export const spiceArt = {
  turmeric: Turmeric,
  chilliPowder: ChilliPowder,
  chillies: Chillies,
  cumin: Cumin,
  coriander: Coriander,
  pepper: Pepper,
  cardamom: Cardamom,
  cinnamon: Cinnamon,
  mustard: Mustard,
  curryLeaves: CurryLeaves,
} as const;
export type SpiceKey = keyof typeof spiceArt;

/** Mixed-spice swirl used at the convergence moment: many tiny dots in spice colours on a spiral. */
export function SpiceSwirl() {
  const cols = ["#EBA815", "#B8231A", "#8E6733", "#C9A25D", "#2A201B", "#4F8E3F", "#C9791B", "#7A4C25"];
  const rand = rng(99);
  const dots = Array.from({ length: 220 }, (_, i) => {
    const t = i / 220;
    const a = t * Math.PI * 9 + rand() * 0.5;
    const d = 12 + t * 150 + rand() * 14;
    return { x: r2(200 + Math.cos(a) * d), y: r2(200 + Math.sin(a) * d * 0.78), r: r2(1.5 + rand() * 3.4), c: cols[i % cols.length] };
  });
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.c} opacity={0.9} />
      ))}
    </svg>
  );
}
