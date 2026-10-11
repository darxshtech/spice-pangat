/** Fine botanical linework in antique gold / leaf green. */
export function Sprig({ className, tone = "gold" }: { className?: string; tone?: "gold" | "leaf" | "ivory" }) {
  const c = tone === "gold" ? "#B69654" : tone === "leaf" ? "#315C3A" : "#E8DDCA";
  return (
    <svg className={className} viewBox="0 0 120 40" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 20 H 48" /><path d="M72 20 H 116" />
      <path d="M60 32 C 60 22 60 14 60 8" />
      <path d="M60 24 C 50 22 46 14 48 8 C 56 10 60 16 60 24Z" />
      <path d="M60 24 C 70 22 74 14 72 8 C 64 10 60 16 60 24Z" />
    </svg>
  );
}

export function LeafLine({ className, tone = "leaf" }: { className?: string; tone?: "gold" | "leaf" | "ivory" }) {
  const c = tone === "gold" ? "#B69654" : tone === "leaf" ? "#315C3A" : "#E8DDCA";
  return (
    <svg className={className} viewBox="0 0 300 300" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
      <path d="M20 280 C 90 220 180 120 280 20" />
      {Array.from({ length: 9 }, (_, i) => {
        const t = (i + 1) / 10;
        const x = 20 + 260 * t;
        const y = 280 - 260 * t;
        return (
          <g key={i}>
            <path d={`M${x} ${y} C ${x - 40} ${y - 6} ${x - 56} ${y + 20} ${x - 62} ${y + 40} C ${x - 30} ${y + 38} ${x - 6} ${y + 24} ${x} ${y}Z`} />
            <path d={`M${x} ${y} C ${x + 6} ${y + 40} ${x + 24} ${y + 56} ${x + 44} ${y + 62} C ${x + 44} ${y + 30} ${x + 30} ${y + 10} ${x} ${y}Z`} />
          </g>
        );
      })}
    </svg>
  );
}
