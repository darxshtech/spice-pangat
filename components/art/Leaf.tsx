import { SharedDefs, r2 } from "./primitives";

/** Overhead banana leaf. viewBox 1000×560. */
export function BananaLeaf({ className }: { className?: string }) {
  const veins = Array.from({ length: 46 }, (_, i) => i);
  return (
    <svg viewBox="0 0 1000 560" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <SharedDefs />
      <defs>
        <radialGradient id="leafg" cx="50%" cy="42%" r="70%">
          <stop offset="0" stopColor="#5C9A55" />
          <stop offset="0.55" stopColor="#3E7A44" />
          <stop offset="1" stopColor="#23502C" />
        </radialGradient>
        <clipPath id="leafclip">
          <path d="M14 282 C 110 118 340 62 500 70 C 680 62 890 122 986 282 C 890 440 680 504 500 496 C 340 500 110 450 14 282Z" />
        </clipPath>
        <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".22" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M30 312 C 130 168 350 112 500 120 C 670 112 880 170 975 312 C 880 470 670 534 500 526 C 350 530 130 480 30 312Z" fill="#000" opacity=".28" filter="url(#blur14)" />
      <path d="M14 282 C 110 118 340 62 500 70 C 680 62 890 122 986 282 C 890 440 680 504 500 496 C 340 500 110 450 14 282Z" fill="url(#leafg)" />
      <g clipPath="url(#leafclip)">
        {veins.map((i) => {
          const x = 40 + i * 20.8;
          const spread = 210 - Math.abs(500 - x) * 0.22;
          return (
            <g key={i} stroke="#9FD08F" strokeOpacity=".28" strokeWidth="1.6" fill="none">
              <path d={`M${x} 282 Q ${r2(x + 40)} ${r2(282 - spread * 0.6)} ${r2(x + 92)} ${r2(282 - spread)}`} />
              <path d={`M${x} 282 Q ${r2(x + 40)} ${r2(282 + spread * 0.6)} ${r2(x + 92)} ${r2(282 + spread)}`} />
            </g>
          );
        })}
        <path d="M0 282 L 1000 282" stroke="#B8DDA2" strokeWidth="7" strokeOpacity=".55" />
        <path d="M0 282 L 1000 282" stroke="#2D5E33" strokeWidth="2" strokeOpacity=".6" transform="translate(0 4)" />
        <rect width="1000" height="560" fill="url(#sheen)" />
        {/* soft tears along the edges, as on a real leaf */}
        {[120, 300, 700, 880].map((x, i) => (
          <path key={i} d={`M${x} ${i % 2 ? 495 : 70} l 5 ${i % 2 ? -34 : 34}`} stroke="#1D4326" strokeOpacity=".5" strokeWidth="1.5" />
        ))}
      </g>
      <path d="M14 282 C 110 118 340 62 500 70 C 680 62 890 122 986 282 C 890 440 680 504 500 496 C 340 500 110 450 14 282Z" fill="none" stroke="#1D4326" strokeOpacity=".5" strokeWidth="3" />
    </svg>
  );
}
