import { ReactNode } from "react";
import { Katori, Seeds, SharedDefs, r2, rng } from "./primitives";
import { BananaLeaf } from "./Leaf";
import { MealItems, ThaliPlate } from "./Meal";
import { Turmeric, ChilliPowder, Cumin, Coriander, Pepper, Cardamom, Cinnamon } from "./Spices";

const S = ({ children, label }: { children: ReactNode; label?: string }) => (
  <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
    <SharedDefs />
    {children}
  </svg>
);

/* ---------- reusable top-down vessels (transparent) ---------- */
export function Ladoo({ x, y, r = 30, id }: { x: number; y: number; r?: number; id: string }) {
  return (
    <g>
      <defs>
        <radialGradient id={`ld-${id}`} cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#F6B24A" /><stop offset="0.7" stopColor="#DE8A22" /><stop offset="1" stopColor="#A9600F" />
        </radialGradient>
      </defs>
      <circle cx={x + 3} cy={y + 6} r={r} fill="#000" opacity=".25" filter="url(#blur6)" />
      <circle cx={x} cy={y} r={r} fill={`url(#ld-${id})`} />
      <Seeds n={22} seed={x + y} cx={x} cy={y} rx={r * 0.8} size={1.6} fills={["#FBD58A", "#B8690F", "#EDB45C"]} />
    </g>
  );
}
function Chakli({ x, y, r = 36 }: { x: number; y: number; r?: number }) {
  const pts = Array.from({ length: 70 }, (_, i) => {
    const t = i / 70;
    const a = t * Math.PI * 6;
    const d = 4 + t * r;
    return `${i ? "L" : "M"}${r2(x + Math.cos(a) * d)} ${r2(y + Math.sin(a) * d)}`;
  }).join(" ");
  return (
    <g>
      <circle cx={x + 3} cy={y + 5} r={r} fill="#000" opacity=".2" filter="url(#blur6)" />
      <circle cx={x} cy={y} r={r + 3} fill="#C8862E" />
      <path d={pts} stroke="#E3A64A" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d={pts} stroke="#F7CB7A" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".6" />
    </g>
  );
}
function Karanji({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <ellipse cx={3} cy={8} rx={40} ry={22} fill="#000" opacity=".2" filter="url(#blur6)" />
      <path d="M-40 14 C -34 -34 34 -34 40 14 Z" fill="#E1A64B" stroke="#B87A2A" strokeWidth="2" />
      <path d="M-36 12 C -30 -26 30 -26 36 12" stroke="#B87A2A" strokeWidth="5" strokeDasharray="2 5" fill="none" strokeLinecap="round" />
      <path d="M-22 0 C -14 -18 14 -18 22 0" stroke="#F8D488" strokeOpacity=".6" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  );
}
function Shankarpali({ x, y, rot }: { x: number; y: number; rot: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x={-17} y={-17} width={34} height={34} rx={6} fill="#EBC372" stroke="#BE8A38" strokeWidth="1.5" />
      <rect x={-12} y={-12} width={12} height={12} rx={3} fill="#F8DCA0" opacity=".7" />
    </g>
  );
}
export function FaralPlate({ id = "fp" }: { id?: string }) {
  return (
    <svg viewBox="0 0 600 600" aria-hidden="true">
      <SharedDefs />
      <defs>
        <radialGradient id={`${id}-b`} cx="38%" cy="30%" r="80%">
          <stop offset="0" stopColor="#F0D28A" /><stop offset="0.6" stopColor="#C49A44" /><stop offset="1" stopColor="#8A6420" />
        </radialGradient>
      </defs>
      <circle cx={306} cy={312} r={290} fill="#000" opacity=".3" filter="url(#blur14)" />
      <circle cx={300} cy={300} r={290} fill={`url(#${id}-b)`} />
      <circle cx={300} cy={300} r={250} fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="3" />
      <circle cx={300} cy={300} r={236} fill="#7E5A1D" opacity=".35" />
      <Seeds n={120} seed={71} cx={300} cy={300} rx={200} size={4} shape="ellipse" fills={["#F0C65A", "#E3A93A", "#F7DE8A"]} />
      <Seeds n={30} seed={72} cx={300} cy={300} rx={190} size={3.4} fills={["#C9935A", "#E4B887"]} />
      <Chakli x={190} y={200} />
      <Chakli x={420} y={390} r={32} />
      <Ladoo x={300} y={160} id={`${id}1`} />
      <Ladoo x={380} y={230} r={28} id={`${id}2`} />
      <Ladoo x={190} y={380} r={30} id={`${id}3`} />
      <Karanji x={320} y={350} rot={-12} />
      <Karanji x={440} y={190} rot={32} />
      <Shankarpali x={250} y={270} rot={14} />
      <Shankarpali x={140} y={290} rot={-20} />
      <Shankarpali x={400} y={300} rot={28} />
      <Shankarpali x={270} y={450} rot={8} />
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={i} cx={r2(120 + ((i * 53) % 360))} cy={r2(120 + ((i * 97) % 360))} r={5} fill="#E8751A" opacity=".9" />
      ))}
    </svg>
  );
}

export function Diya({ id = "dy", glow = true }: { id?: string; glow?: boolean }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <SharedDefs />
      <defs>
        <radialGradient id={`${id}-g`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#FFD27A" stopOpacity=".9" /><stop offset="1" stopColor="#FFB347" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-c`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C9764A" /><stop offset="1" stopColor="#7C3A1B" />
        </linearGradient>
        <radialGradient id={`${id}-f`} cx="50%" cy="70%" r="60%">
          <stop offset="0" stopColor="#FFF6C8" /><stop offset=".5" stopColor="#FFC23C" /><stop offset="1" stopColor="#F26A1B" />
        </radialGradient>
      </defs>
      {glow && <circle cx="100" cy="86" r="90" fill={`url(#${id}-g)`} />}
      <ellipse cx="100" cy="162" rx="56" ry="9" fill="#000" opacity=".3" filter="url(#blur6)" />
      <path d="M36 112 C 44 160 156 160 164 112 C 140 124 60 124 36 112Z" fill={`url(#${id}-c)`} />
      <path d="M30 108 C 60 124 140 124 170 108 C 150 100 50 100 30 108Z" fill="#E08A58" />
      <path d="M44 114 C 80 124 120 124 156 114" stroke="#F4C79A" strokeOpacity=".5" strokeWidth="3" fill="none" />
      <path d="M100 106 C 80 80 92 56 100 36 C 108 56 120 80 100 106Z" fill={`url(#${id}-f)`} />
      <path d="M100 100 C 92 86 96 74 100 64 C 104 74 108 86 100 100Z" fill="#fff" opacity=".7" />
    </svg>
  );
}

/* ---------- vessels used in the Pangat animation (transparent, 300×300) ---------- */
export function DalBowl() {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <SharedDefs />
      <Katori id="dalbowl" cx={100} cy={100} r={84}>
        <circle cx={100} cy={100} r={72} fill="#E2A12B" />
        <circle cx={100} cy={100} r={54} fill="#F0B83A" />
        <path d="M60 86 C 80 62 118 62 140 84" stroke="#fff" strokeOpacity=".45" strokeWidth="6" fill="none" strokeLinecap="round" />
        <Seeds n={14} seed={5} cx={100} cy={100} rx={48} size={2.2} fills={["#C0501E", "#4F8E3F"]} />
      </Katori>
    </svg>
  );
}
export function Lota() {
  return (
    <svg viewBox="0 0 200 240" aria-hidden="true">
      <SharedDefs />
      <defs>
        <linearGradient id="lota" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8A6420" /><stop offset=".3" stopColor="#F0D28A" /><stop offset=".6" stopColor="#C49A44" /><stop offset="1" stopColor="#7A5518" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="222" rx="62" ry="10" fill="#000" opacity=".3" filter="url(#blur6)" />
      <path d="M70 52 C 66 80 22 104 22 160 C 22 206 60 220 100 220 C 140 220 178 206 178 160 C 178 104 134 80 130 52Z" fill="url(#lota)" />
      <ellipse cx="100" cy="50" rx="31" ry="9" fill="#E7C673" stroke="#8A6420" strokeWidth="2" />
      <ellipse cx="100" cy="52" rx="24" ry="5.5" fill="#5E4112" />
      <path d="M30 150 C 60 168 140 168 170 150" stroke="#7A5518" strokeWidth="3" fill="none" opacity=".6" />
      <path d="M40 120 C 44 100 62 88 76 82" stroke="#fff" strokeOpacity=".5" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}
export function DrinkGlass() {
  return (
    <svg viewBox="0 0 160 220" aria-hidden="true">
      <SharedDefs />
      <defs>
        <linearGradient id="drink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F9B2A0" /><stop offset="1" stopColor="#D8506A" />
        </linearGradient>
      </defs>
      <ellipse cx="80" cy="208" rx="46" ry="8" fill="#000" opacity=".3" filter="url(#blur6)" />
      <path d="M28 30 L 40 198 C 41 206 119 206 120 198 L 132 30Z" fill="#F4F0E8" fillOpacity=".55" stroke="#D7D0C0" strokeWidth="2" />
      <path d="M32 62 L 41 196 C 42 202 118 202 119 196 L 128 62Z" fill="url(#drink)" opacity=".92" />
      <path d="M46 70 L 52 186" stroke="#fff" strokeOpacity=".5" strokeWidth="5" strokeLinecap="round" />
      <circle cx="104" cy="46" r="16" fill="#E7C43C" />
      <path d="M96 40 L 112 52" stroke="#B9971F" strokeWidth="1.5" />
    </svg>
  );
}
export function PoliStack() {
  return (
    <svg viewBox="0 0 220 220" aria-hidden="true">
      <SharedDefs />
      <defs>
        <radialGradient id="ps" cx="40%" cy="35%" r="75%">
          <stop offset="0" stopColor="#F4CF7D" /><stop offset=".7" stopColor="#DCA548" /><stop offset="1" stopColor="#B87A2A" />
        </radialGradient>
      </defs>
      <circle cx="116" cy="124" r="86" fill="#000" opacity=".25" filter="url(#blur6)" />
      <circle cx="116" cy="102" r="82" fill="#C58A33" />
      <circle cx="104" cy="112" r="82" fill="url(#ps)" />
      <Seeds n={40} seed={91} cx={104} cy={112} rx={68} size={4.6} fills={["#B9742A", "#A5611F"]} />
      <path d="M56 90 C 78 62 124 58 152 82" stroke="#fff" strokeOpacity=".4" strokeWidth="6" fill="none" strokeLinecap="round" />
    </svg>
  );
}
export function SweetsDish() {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <SharedDefs />
      <Katori id="sweets" cx={100} cy={100} r={84} tone="white">
        <circle cx={100} cy={100} r={70} fill="#FBF7EC" />
        <Ladoo x={78} y={92} r={22} id="sw1" />
        <Ladoo x={124} y={96} r={22} id="sw2" />
        <Ladoo x={100} y={130} r={22} id="sw3" />
      </Katori>
    </svg>
  );
}

/* ---------- full scenes (used as "photographs") ---------- */
export function SceneThali() {
  return (
    <S label="A Maharashtrian vegetarian thali served on a steel plate">
      <defs>
        <linearGradient id="wood" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5A3A24" /><stop offset="1" stopColor="#33201A" /></linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#wood)" />
      {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M0 ${i * 62 + 10} C 200 ${i * 62 - 6} 400 ${i * 62 + 22} 600 ${i * 62 + 6}`} stroke="#000" strokeOpacity=".16" strokeWidth="2" fill="none" />)}
      <g transform="translate(20 20) scale(.93)"><ThaliPlate prefix="sc" /></g>
    </S>
  );
}
export function SceneFaral() {
  return (
    <S label="Diwali faral and traditional sweets on a brass plate">
      <rect width="600" height="600" fill="#6B1A2D" />
      <rect width="600" height="600" fill="#2B0A12" opacity=".25" />
      <g transform="translate(30 30) scale(.9)"><FaralPlate id="sf" /></g>
    </S>
  );
}
export function SceneSpices() {
  return (
    <S label="Bowls of fresh Indian spices">
      <rect width="600" height="600" fill="#D9C7A6" />
      {Array.from({ length: 30 }, (_, i) => <path key={i} d={`M${i * 22} 0 L ${i * 22 + 40} 600`} stroke="#B9A47C" strokeOpacity=".22" strokeWidth="2" />)}
      {[
        [150, 150, Turmeric], [440, 150, ChilliPowder], [150, 440, Cumin], [440, 440, Coriander],
      ].map(([x, y, C], i) => {
        const Comp = C as () => ReactNode;
        return (
          <g key={i}>
            <Katori id={`sp${i}`} cx={x as number} cy={y as number} r={118} tone={i % 2 ? "steel" : "brass"} />
            <g transform={`translate(${(x as number) - 105} ${(y as number) - 105}) scale(1.05)`}><svg width="200" height="200"><Comp /></svg></g>
          </g>
        );
      })}
      <g transform="translate(250 250) scale(.5)"><svg width="200" height="200"><Cinnamon /></svg></g>
    </S>
  );
}
export function SceneBrass() {
  return (
    <S label="Traditional brass serving vessels">
      <rect width="600" height="600" fill="#E8DDCA" />
      <rect y="400" width="600" height="200" fill="#C9B38A" opacity=".5" />
      <g transform="translate(60 160) scale(1.5)"><svg width="200" height="240"><Lota /></svg></g>
      <g transform="translate(330 250) scale(1.1)"><svg width="200" height="240"><Lota /></svg></g>
      <g transform="translate(300 40) scale(.9)"><svg width="200" height="200"><DalBowl /></svg></g>
    </S>
  );
}
export function SceneLeaf() {
  return (
    <S label="Food served on a banana leaf">
      <rect width="600" height="600" fill="#2F4A2E" />
      <svg x="-380" y="90" width="1360" height="420"><BananaLeaf /></svg>
      <g transform="translate(110 100) scale(.65)"><MealItems prefix="sl" /></g>
    </S>
  );
}
export function SceneRangoli() {
  const rand = rng(8);
  const rings = [
    { n: 16, r: 210, c: "#B52332", len: 70 },
    { n: 16, r: 160, c: "#E8751A", len: 62 },
    { n: 12, r: 112, c: "#F4C542", len: 52 },
    { n: 8, r: 66, c: "#FBF7EC", len: 40 },
  ];
  return (
    <S label="A rangoli pattern with marigold colours">
      <rect width="600" height="600" fill="#3A1A22" />
      {rings.map((ring, ri) => (
        <g key={ri} transform="translate(300 300)">
          {Array.from({ length: ring.n }, (_, i) => (
            <g key={i} transform={`rotate(${(i * 360) / ring.n + ri * 8})`}>
              <path d={`M0 -${ring.r - ring.len} C 18 -${ring.r - ring.len / 2} 12 -${ring.r} 0 -${ring.r + 10} C -12 -${ring.r} -18 -${ring.r - ring.len / 2} 0 -${ring.r - ring.len}Z`} fill={ring.c} opacity={0.95} />
              <Seeds n={5} seed={ri * 20 + i} cx={0} cy={-(ring.r - 18)} rx={6} ry={10} size={1.6} fills={["#fff"]} />
            </g>
          ))}
        </g>
      ))}
      <circle cx="300" cy="300" r="26" fill="#B69654" />
      <circle cx="300" cy="300" r="12" fill="#640D26" />
      {Array.from({ length: 28 }, (_, i) => (
        <circle key={i} cx={r2(300 + Math.cos((i / 28) * 6.283) * 262)} cy={r2(300 + Math.sin((i / 28) * 6.283) * 262)} r={4 + rand() * 3} fill="#E8751A" />
      ))}
    </S>
  );
}
export function SceneDiya() {
  return (
    <S label="Diyas glowing for Diwali">
      <rect width="600" height="600" fill="#2A0C16" />
      <circle cx="300" cy="320" r="300" fill="#FFB347" opacity=".12" filter="url(#blur14)" />
      {[[40, 260, 1.5], [330, 320, 1.15], [140, 80, .9]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}><svg width="200" height="200"><Diya id={`sd${i}`} /></svg></g>
      ))}
    </S>
  );
}

/** Round shared table seen from above. Plates sit on leaf place-mats. */
export function SharedTable({ showPlates = true, bare = false }: { showPlates?: boolean; bare?: boolean }) {
  const seats = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    return { x: r2(300 + Math.cos(a) * 190), y: r2(300 + Math.sin(a) * 190), a: r2((a * 180) / Math.PI + 90) };
  });
  return (
    <svg viewBox="0 0 600 600" aria-hidden="true">
      <SharedDefs />
      <defs>
        <radialGradient id="tbl" cx="45%" cy="40%" r="70%"><stop offset="0" stopColor="#A5683A" /><stop offset="1" stopColor="#6A3C20" /></radialGradient>
        <radialGradient id="cloth" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#7C1230" /><stop offset="1" stopColor="#5A0A22" /></radialGradient>
      </defs>
      <circle cx="306" cy="314" r="292" fill="#000" opacity=".3" filter="url(#blur14)" />
      <circle cx="300" cy="300" r="292" fill="url(#tbl)" />
      {[270, 230].map((r) => <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="#3E2010" strokeOpacity=".25" strokeWidth="2" />)}
      <circle cx="300" cy="300" r="120" fill="url(#cloth)" />
      <circle cx="300" cy="300" r="112" fill="none" stroke="#B69654" strokeWidth="2" strokeDasharray="3 6" />
      {seats.map((s, i) => (
        <g key={i} transform={`translate(${s.x} ${s.y}) rotate(${s.a})`}>
          <ellipse cx="0" cy="0" rx="46" ry="68" fill="#2F6A3A" />
          <ellipse cx="0" cy="0" rx="46" ry="68" fill="none" stroke="#1D4326" strokeWidth="2" />
          <path d="M0 -66 L 0 66" stroke="#9FD08F" strokeOpacity=".5" strokeWidth="2" />
          {showPlates && <>
            <circle cx="0" cy="6" r="30" fill="#F2EEE6" stroke="#CFC6B2" strokeWidth="2" />
            <circle cx="-7" cy="0" r="12" fill="#F7C93E" />
            <circle cx="10" cy="12" r="10" fill="#C8A23A" />
            <circle cx="-4" cy="18" r="7" fill="#fff" />
          </>}
          <circle cx="34" cy="-30" r="9" fill="#D8A93F" stroke="#8A6420" />
        </g>
      ))}
      {!bare && (
        <>
      <Katori id="tb1" cx={262} cy={282} r={34}><circle cx={262} cy={282} r={30} fill="#E2A12B" /></Katori>
      <Katori id="tb2" cx={338} cy={290} r={30}><circle cx={338} cy={290} r={26} fill="#B8441F" /></Katori>
      <Katori id="tb3" cx={300} cy={344} r={30}><circle cx={300} cy={344} r={26} fill="#4F8A3A" /></Katori>
      <g transform="translate(280 252)"><Ladoo x={20} y={0} r={14} id="tbl1" /></g>
        </>
      )}
    </svg>
  );
}
export function SceneTable() {
  return (
    <S label="A shared dining table laid for six guests">
      <rect width="600" height="600" fill="#E8DDCA" />
      <g transform="translate(-8 -8) scale(1.03)"><svg width="600" height="600"><SharedTable /></svg></g>
    </S>
  );
}

export const scenes = {
  thali: SceneThali,
  faral: SceneFaral,
  spices: SceneSpices,
  brass: SceneBrass,
  leaf: SceneLeaf,
  rangoli: SceneRangoli,
  diya: SceneDiya,
  table: SceneTable,
} as const;
export type SceneKey = keyof typeof scenes;
export { Cardamom, Pepper, Cumin };
