import { Katori, Seeds, SharedDefs, r2, rng } from "./primitives";

/** The items of a Maharashtrian thali, arranged inside a 600×600 box (no background). */
export function MealItems({ prefix = "ml" }: { prefix?: string }) {
  const p = (s: string) => `${prefix}-${s}`;
  return (
    <g>
      {/* puran poli, two stacked */}
      <g>
        <circle cx={452} cy={196} r={70} fill="#000" opacity=".25" filter="url(#blur6)" transform="translate(5 8)" />
        <circle cx={460} cy={186} r={68} fill="#E4B65A" />
        <defs>
          <radialGradient id={p("poli")} cx="40%" cy="35%" r="75%">
            <stop offset="0" stopColor="#F4CF7D" />
            <stop offset="0.7" stopColor="#DCA548" />
            <stop offset="1" stopColor="#B87A2A" />
          </radialGradient>
        </defs>
        <circle cx={444} cy={200} r={68} fill={`url(#${p("poli")})`} />
        <Seeds n={34} seed={7} cx={444} cy={200} rx={56} size={4.6} fills={["#B9742A", "#A5611F", "#C98A38"]} />
        <path d="M398 176 C 420 150 458 142 486 156" stroke="#fff" strokeOpacity=".4" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx={444} cy={200} r={68} fill="none" stroke="#8F5A1E" strokeOpacity=".4" strokeWidth="2" />
      </g>
      {/* varan-bhaat */}
      <g>
        <circle cx={296} cy={316} r={92} fill="#000" opacity=".22" filter="url(#blur6)" transform="translate(6 10)" />
        <defs>
          <radialGradient id={p("rice")} cx="38%" cy="32%" r="80%">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="0.7" stopColor="#F4EFE2" />
            <stop offset="1" stopColor="#D9D0BB" />
          </radialGradient>
        </defs>
        <circle cx={296} cy={316} r={88} fill={`url(#${p("rice")})`} />
        <Seeds n={120} seed={19} cx={296} cy={316} rx={80} size={2.4} shape="ellipse" fills={["#FFFFFF", "#EDE6D4", "#E0D6BE"]} />
        <circle cx={290} cy={308} r={32} fill="#E6A61F" />
        <circle cx={290} cy={308} r={28} fill="#F7C93E" />
        <path d="M274 298 C 284 286 300 286 308 296" stroke="#fff" strokeOpacity=".65" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx={300} cy={316} r={5} fill="#FFF3B0" opacity=".9" />
      </g>
      {/* amti */}
      <Katori id={p("amti")} cx={132} cy={206} r={56}>
        <circle cx={132} cy={206} r={50} fill="#C24E1E" />
        <circle cx={132} cy={206} r={36} fill="#D2652A" opacity=".8" />
        <Seeds n={14} seed={3} cx={132} cy={206} rx={34} size={2.4} fills={["#4C8F3C", "#76B04F"]} />
        <path d="M110 190 C 124 178 144 178 156 190" stroke="#fff" strokeOpacity=".3" strokeWidth="4" fill="none" />
      </Katori>
      {/* usal */}
      <Katori id={p("usal")} cx={128} cy={410} r={52}>
        <circle cx={128} cy={410} r={48} fill="#8E3B1B" />
        <Seeds n={30} seed={27} cx={128} cy={410} rx={38} size={2.6} shape="ellipse" fills={["#D8BC84", "#B88A4C", "#C9A25D"]} />
        <Seeds n={12} seed={9} cx={128} cy={410} rx={36} size={2} fills={["#4C8F3C"]} />
      </Katori>
      {/* bhaji */}
      <Katori id={p("bhaji")} cx={452} cy={412} r={54}>
        <circle cx={452} cy={412} r={50} fill="#C8A23A" />
        <Seeds n={24} seed={13} cx={452} cy={412} rx={38} size={4} fills={["#E8C24A", "#B88F2A", "#D8B442"]} />
        <Seeds n={16} seed={4} cx={452} cy={412} rx={38} size={2.5} shape="ellipse" fills={["#3F8A3A", "#6FB34D"]} />
      </Katori>
      {/* koshimbir */}
      <Katori id={p("kosh")} cx={300} cy={512} r={50} tone="white">
        <circle cx={300} cy={512} r={46} fill="#F2F6E4" />
        {Array.from({ length: 9 }, (_, i) => {
          const a = (i / 9) * Math.PI * 2;
          return (
            <g key={i}>
              <circle cx={r2(300 + Math.cos(a) * 24)} cy={r2(512 + Math.sin(a) * 24)} r={10} fill="#C5DD9A" stroke="#7FA85A" />
              <circle cx={r2(300 + Math.cos(a) * 24)} cy={r2(512 + Math.sin(a) * 24)} r={3.5} fill="#EEF5D4" />
            </g>
          );
        })}
        <Seeds n={9} seed={31} cx={300} cy={512} rx={14} size={3.6} fills={["#D8402E", "#B92A22"]} />
        <Seeds n={14} seed={32} cx={300} cy={512} rx={30} size={1.6} fills={["#5A9A46"]} />
      </Katori>
      {/* pickle & chutney */}
      <Katori id={p("pickle")} cx={214} cy={92} r={30}>
        <circle cx={214} cy={92} r={27} fill="#A63A12" />
        <Seeds n={10} seed={51} cx={214} cy={92} rx={18} size={3.4} fills={["#E4B03A", "#7D2A0C"]} />
      </Katori>
      <Katori id={p("chutney")} cx={352} cy={86} r={32}>
        <circle cx={352} cy={86} r={29} fill="#4F8A3A" />
        <Seeds n={30} seed={61} cx={352} cy={86} rx={22} size={1.8} fills={["#8FC66E", "#3C6F2D", "#F2F0DA"]} />
      </Katori>
      {/* lemon */}
      <g transform="translate(528 330) rotate(-24)">
        <ellipse cx={4} cy={6} rx={44} ry={26} fill="#000" opacity=".2" filter="url(#blur6)" />
        <path d="M-42 0 C -24 -30 24 -30 42 0 C 24 18 -24 18 -42 0Z" fill="#F4D84A" stroke="#C9A81F" strokeWidth="2" />
        <path d="M-34 0 C -20 -22 20 -22 34 0 C 20 12 -20 12 -34 0Z" fill="#FBEC8C" />
        {[-24, -12, 0, 12, 24].map((x) => (
          <path key={x} d={`M${x} -2 L ${x * 0.4} -16`} stroke="#E0C23A" strokeWidth="1.4" />
        ))}
      </g>
      {/* modak */}
      <g transform="translate(520 470)">
        <ellipse cx={4} cy={14} rx={30} ry={14} fill="#000" opacity=".22" filter="url(#blur6)" />
        <path d="M0 -34 C 14 -26 34 -6 30 14 C 24 30 -24 30 -30 14 C -34 -6 -14 -26 0 -34Z" fill="#F7EBCF" stroke="#D5BF8A" strokeWidth="1.5" />
        {[-18, -9, 0, 9, 18].map((x) => (
          <path key={x} d={`M${x} 24 C ${x * 0.6} 4 ${x * 0.2} -10 0 -30`} stroke="#D5BF8A" strokeWidth="1.2" fill="none" />
        ))}
        <circle cx={0} cy={-31} r={3.5} fill="#E8C85A" />
      </g>
    </g>
  );
}

/** Meal as served on the leaf. Transparent background, 600×600. */
export function MaharashtrianMeal() {
  return (
    <svg viewBox="0 0 600 600" aria-hidden="true">
      <SharedDefs />
      <MealItems prefix="hero" />
    </svg>
  );
}

/** Steel thali variant: round plate underneath the same food. */
export function ThaliPlate({ prefix = "th" }: { prefix?: string }) {
  return (
    <svg viewBox="0 0 600 600" aria-hidden="true">
      <SharedDefs />
      <defs>
        <radialGradient id={`${prefix}-plate`} cx="40%" cy="32%" r="80%">
          <stop offset="0" stopColor="#F7F7F5" />
          <stop offset="0.6" stopColor="#C9CBCC" />
          <stop offset="1" stopColor="#8E9295" />
        </radialGradient>
      </defs>
      <circle cx={306} cy={312} r={296} fill="#000" opacity=".3" filter="url(#blur14)" />
      <circle cx={300} cy={300} r={296} fill={`url(#${prefix}-plate)`} />
      <circle cx={300} cy={300} r={268} fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="3" />
      <circle cx={300} cy={300} r={250} fill="#000" opacity=".06" />
      <g transform="translate(300 300) scale(.84) translate(-300 -300)">
        <MealItems prefix={prefix} />
      </g>
    </svg>
  );
}

export function seedRand(n: number) {
  return rng(n);
}
