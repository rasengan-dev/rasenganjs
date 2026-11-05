/**
 * Illustrations for the ads cards (see `ads.tsx`). Drawn in code rather than
 * screenshots, so they stay sharp, follow light and dark mode, and weigh
 * nothing. Both are decorative: the card's text carries the message.
 */

const katon = 'oklch(0.68 0.19 48)';
const suiton = 'oklch(0.62 0.16 240)';
const raiton = 'oklch(0.6 0.2 290)';

const natures = [
  'oklch(0.68 0.19 48)', // Katon
  'oklch(0.75 0.15 75)', // Doton
  'oklch(0.68 0.15 160)', // Futon
  'oklch(0.62 0.16 240)', // Suiton
  'oklch(0.6 0.2 290)', // Raiton
];

/** A text line placeholder. */
function Bar({ className = '' }: { className?: string }) {
  return <span className={`block h-1 rounded-full ${className}`} />;
}

/**
 * Rasengan UI: the same small card in three villages, fanned out. Konoha is
 * warm and rounded, Kiri soft and translucent, Iwa square with a hard
 * shadow. The nature swatches sit underneath.
 */
export function RasenganUIIllustration() {
  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden bg-muted/60 dark:bg-muted/30"
    >
      <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:12px_12px] opacity-70" />

      <div className="relative flex h-full flex-col items-center justify-center gap-3.5">
        <div className="flex w-full items-start justify-center gap-2 px-3">
          {/* Konoha */}
          <div className="w-[30%] max-w-[112px] translate-y-1.5 -rotate-6 rounded-xl border border-black/5 bg-white p-2.5 shadow-md dark:border-white/10 dark:bg-stone-900">
            <span className="text-[9px] font-semibold text-stone-800 dark:text-stone-100">
              Konoha
            </span>
            <Bar className="mt-1.5 w-4/5 bg-stone-200 dark:bg-stone-700" />
            <Bar className="mt-1 w-3/5 bg-stone-200 dark:bg-stone-700" />
            <span
              className="mt-2 block h-3.5 w-12 rounded-md"
              style={{ background: katon }}
            />
          </div>

          {/* Kiri */}
          <div className="z-10 w-[30%] max-w-[112px] rounded-2xl border border-white/60 bg-white/70 p-2.5 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-slate-800/70">
            <span className="text-[9px] font-light tracking-wide text-slate-700 dark:text-slate-200">
              Kiri
            </span>
            <Bar className="mt-1.5 w-4/5 bg-slate-200/80 dark:bg-slate-600/80" />
            <Bar className="mt-1 w-2/5 bg-slate-200/80 dark:bg-slate-600/80" />
            <div className="mt-2 flex items-center gap-1.5">
              <span
                className="block h-3.5 w-6 shrink-0 rounded-full"
                style={{ background: suiton }}
              />
              <span
                className="flex h-2.5 w-4.5 shrink-0 items-center justify-end rounded-full px-px"
                style={{ background: suiton }}
              >
                <span className="block size-2 rounded-full bg-white" />
              </span>
            </div>
          </div>

          {/* Iwa */}
          <div className="w-[30%] max-w-[112px] translate-y-1.5 rotate-6 border-2 border-neutral-900 bg-white p-2.5 shadow-[3px_3px_0_0_#171717] dark:border-neutral-100 dark:bg-neutral-950 dark:shadow-[3px_3px_0_0_#f5f5f5]">
            <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Iwa
            </span>
            <span className="mt-1.5 block h-1 w-4/5 bg-neutral-300 dark:bg-neutral-700" />
            <span className="mt-1 block h-1 w-3/5 bg-neutral-300 dark:bg-neutral-700" />
            <span
              className="mt-2 block h-3.5 w-12 border-2 border-neutral-900 dark:border-neutral-100"
              style={{ background: raiton }}
            />
          </div>
        </div>

        {/* Natures */}
        <div className="flex justify-center gap-1.5">
          {natures.map((color) => (
            <span
              key={color}
              className="size-2.5 rounded-full ring-2 ring-background"
              style={{ background: color }}
            />
          ))}
          <span className="size-2.5 rounded-full bg-foreground ring-2 ring-background" />
        </div>
      </div>
    </div>
  );
}

const amber = '#eab308';

/**
 * Hiraiship's mark (a kunai), from the "Hiraiship Logo" pack in the Hiraiship
 * repo (apps/vitrine/src/components/layout/brand.tsx). Its own coordinates:
 * x 133–1147, y 15–1241, tip up.
 */
function KunaiMark() {
  return (
    <g fill={amber} fillRule="evenodd" clipRule="evenodd">
      <path
        d="M775.781 972.747L717.923 1040.04L717.746 1040.03L648.519 37.4592L648.535 33.7184L649.571 20.3699L775.781 972.746L775.781 972.747Z"
        fillOpacity={0.4}
      />
      <path
        d="M501.211 969.879L636.806 21.1436L637.81 35.6773L559.904 1039.11L559.719 1039.12L501.211 969.879Z"
        fillOpacity={0.4}
      />
      <path d="M712.923 1047.53L639.058 1135.53L565.631 1046.52L643.657 18.5084L712.923 1047.53ZM639.426 1041.05L639.428 1040.65L637.751 1040.84L639.426 1041.05Z" />
      <path
        d="M796.664 1005.76C796.876 1005.82 797.089 1005.88 797.301 1005.94C821.191 1012.53 845.62 1017.81 870.509 1021.72C903.364 1026.88 937.018 1029.62 971.286 1029.77C1029.7 1030.02 1086.39 1022.7 1140.43 1008.75C1035.86 1049.53 922.653 1072.94 804.379 1075.42C795.99 1075.59 787.576 1075.66 779.137 1075.63C765.44 1075.57 751.81 1075.23 738.251 1074.62L737.492 1074.58L796.664 1005.76V1005.76Z"
        fillOpacity={0.4}
      />
      <path d="M1136.4 1015.61C1138.58 1014.76 1140.76 1013.9 1142.93 1013.03L1141.99 1014.14C1058.66 1111.71 946.151 1183.58 818.107 1216.25C793.794 1222.46 768.923 1227.24 743.583 1230.53C715.943 1234.11 687.748 1235.9 659.119 1235.78L659.41 1167.58L733.465 1081.45L734.224 1081.48C747.784 1082.09 761.414 1082.43 775.11 1082.49C783.549 1082.53 791.963 1082.46 800.352 1082.28C918.627 1079.8 1031.84 1056.4 1136.4 1015.61Z" />
      <path
        d="M137.287 1002.85L137.068 1002.58C193.145 1018.64 252.275 1027.35 313.379 1027.61C345.839 1027.75 377.763 1025.5 408.987 1021.03C430.44 1017.95 451.563 1013.82 472.302 1008.7C476.193 1007.74 480.069 1006.74 483.932 1005.71L541.776 1074.95C539.73 1075.02 537.681 1075.09 535.63 1075.16C524.084 1075.52 512.488 1075.68 500.846 1075.63C495.249 1075.61 489.664 1075.53 484.089 1075.41C361.569 1072.79 244.632 1047.24 137.287 1002.85L137.287 1002.85Z"
        fillOpacity={0.4}
      />
      <path d="M619.458 1236.49C594.108 1236.38 569.111 1234.77 544.551 1231.76C519.139 1228.64 494.195 1224 469.811 1217.95C337.492 1185.12 221.66 1110.51 137.068 1009.02C245.641 1053.42 363.915 1078.98 487.834 1081.61C493.472 1081.73 499.121 1081.8 504.782 1081.82C516.558 1081.87 528.286 1081.71 539.964 1081.35C542.038 1081.29 544.11 1081.22 546.18 1081.14L619.75 1168.21L619.458 1236.49Z" />
    </g>
  );
}

/** Edge locations lit on the globe, in the globe's own coordinates. */
const edges: Array<[number, number]> = [
  [-30, -22],
  [8, -34],
  [30, -8],
  [-12, 6],
  [20, 26],
  [-36, 18],
];

/**
 * Hiraiship: a deploy command on the left, and the kunai (Hiraiship's mark)
 * flashing along its trail to a globe of lit edge locations. Always on a dark
 * panel with amber, Hiraiship's own colours, in both modes.
 */
export function HiraishipIllustration() {
  const cx = 230;
  const cy = 70;
  const r = 40;

  return (
    <div
      aria-hidden="true"
      className="h-full w-full overflow-hidden bg-[#0a0a0b]"
    >
      <svg
        viewBox="0 0 280 140"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
      >
        <defs>
          <radialGradient id="hs-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={amber} stopOpacity="0.28" />
            <stop offset="100%" stopColor={amber} stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={cx} cy={cy} r={r + 24} fill="url(#hs-glow)" />

        {/* Globe */}
        <g fill="none" stroke={amber} strokeOpacity="0.28" strokeWidth="0.8">
          <circle cx={cx} cy={cy} r={r} strokeOpacity="0.5" />
          <ellipse cx={cx} cy={cy} rx={r * 0.35} ry={r} />
          <ellipse cx={cx} cy={cy} rx={r * 0.72} ry={r} />
          <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} />
          <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.32} />
          <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} />
          <ellipse cx={cx} cy={cy - r * 0.6} rx={r * 0.8} ry={r * 0.14} />
          <ellipse cx={cx} cy={cy + r * 0.6} rx={r * 0.8} ry={r * 0.14} />
        </g>

        {/* Edge locations */}
        {edges.map(([x, y]) => (
          <g key={`${x}:${y}`}>
            <circle
              cx={cx + x * 0.8}
              cy={cy + y * 0.8}
              r="4"
              fill={amber}
              fillOpacity="0.2"
            />
            <circle cx={cx + x * 0.8} cy={cy + y * 0.8} r="1.8" fill={amber} />
          </g>
        ))}

        {/* The command */}
        <rect
          x="10"
          y="49"
          width="112"
          height="42"
          rx="5"
          fill="#ffffff"
          fillOpacity="0.04"
          stroke="#ffffff"
          strokeOpacity="0.12"
        />
        <g
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="8.5"
        >
          <text x="18" y="66" fill="#ffffff" fillOpacity="0.9">
            <tspan fillOpacity="0.45">$ </tspan>hiraiship deploy
          </text>
          <text x="18" y="80" fill={amber}>
            ✓ Live on the edge
          </text>
        </g>

        {/* The flash: from the command to the globe */}
        <path
          d={`M 126 72 Q 156 50 ${cx - r - 4} ${cy - 2}`}
          fill="none"
          stroke={amber}
          strokeWidth="1.1"
          strokeDasharray="2.5 3.5"
          strokeLinecap="round"
        />
        {/* The kunai, mid-flight, pointing at the globe */}
        <g transform="translate(157 58) rotate(100) scale(0.022) translate(-640 -626)">
          <KunaiMark />
        </g>
      </svg>
    </div>
  );
}
