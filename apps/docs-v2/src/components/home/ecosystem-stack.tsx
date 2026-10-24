import { useState } from 'react';
import { Link } from 'rasengan';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// "Runs anywhere" section: a circuit board with Futon as the central chip,
// Rasengan and Rasengan Server as modules wired to it by three-lane buses,
// and the three runtimes as sockets on the board's lower edge. Light pulses
// travel from each runtime up into Futon and out to the two frameworks.
//
// Hovering (or focusing) any part lights up its own traces and dims the
// rest, so the board doubles as an explanation of who depends on whom.
// Pulses are plain CSS (the `comet` keyframes in styles/index.css) and stop
// under prefers-reduced-motion. The board is a physical object, so it stays
// dark in both themes, like the hero terminal.
//
// Below `lg` the SVG would shrink its labels to unreadable sizes, so a
// simplified vertical version (`CompactBoard`) is rendered instead.

// ── Data ─────────────────────────────────────────────────────

/** Every part of the board that can be hovered. */
type PartKey = 'futon' | 'rasengan' | 'server' | 'node' | 'bun' | 'workerd';

const RUNTIMES = {
  node: 'var(--runtime-node)',
  bun: 'var(--runtime-bun)',
  workerd: 'var(--runtime-workerd)',
};

/** Board colors: fixed, because the board is always dark. */
const PCB = {
  substrate: '#0a1222',
  edge: '#1f2b47',
  trace: '#22314f',
  silk: '#55658f',
  pad: '#c9a45c',
  chipTop: '#16203a',
  chipBottom: '#0b1120',
};

/** Viewbox the coordinates below are hand-placed against. */
const W = 960;
const H = 460;

/**
 * One copper trace. `part` is the hoverable part it belongs to (a trace
 * lights up when its part, or Futon, is active). `pulse` makes it carry an
 * animated signal; `reverse` runs it from the end of the path to the start.
 */
type Trace = {
  id: string;
  part: PartKey;
  points: Array<[number, number]>;
  color: string;
  delay: number;
  reverse?: boolean;
};

/** Builds an SVG path through orthogonal/diagonal points. */
const toPath = (points: Array<[number, number]>) =>
  points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ');

const LANES = [0, 1, 2];

const TRACES: Trace[] = [
  // Futon (left pins) → Rasengan module, three lanes with a 45° jog.
  ...LANES.map((k) => ({
    id: `rasengan-${k}`,
    part: 'rasengan' as const,
    points: [
      [378, 200 + 14 * k],
      [330, 200 + 14 * k],
      [310, 180 + 14 * k],
      [272, 180 + 14 * k],
    ] as Array<[number, number]>,
    color: 'var(--layer-rasengan)',
    delay: 0.2 * k,
  })),
  // Futon (right pins) → Rasengan Server module, mirrored.
  ...LANES.map((k) => ({
    id: `server-${k}`,
    part: 'server' as const,
    points: [
      [582, 200 + 14 * k],
      [630, 200 + 14 * k],
      [650, 180 + 14 * k],
      [688, 180 + 14 * k],
    ] as Array<[number, number]>,
    color: 'var(--layer-server)',
    delay: 0.5 + 0.2 * k,
  })),
  // Runtime sockets → Futon (bottom pins). Two lanes each; lane order is
  // chosen so the lanes never cross on their two turns.
  ...[0, 1].map((k) => ({
    id: `node-${k}`,
    part: 'node' as const,
    points: [
      [420 + 14 * k, 302],
      [420 + 14 * k, 330 + 14 * k],
      [188 + 14 * k, 330 + 14 * k],
      [188 + 14 * k, 370],
    ] as Array<[number, number]>,
    color: RUNTIMES.node,
    delay: 0.1 + 0.3 * k,
    reverse: true,
  })),
  ...[0, 1].map((k) => ({
    id: `bun-${k}`,
    part: 'bun' as const,
    points: [
      [473 + 14 * k, 302],
      [473 + 14 * k, 370],
    ] as Array<[number, number]>,
    color: RUNTIMES.bun,
    delay: 0.4 + 0.3 * k,
    reverse: true,
  })),
  ...[0, 1].map((k) => ({
    id: `workerd-${k}`,
    part: 'workerd' as const,
    points: [
      [526 + 14 * k, 302],
      [526 + 14 * k, 344 - 14 * k],
      [758 + 14 * k, 344 - 14 * k],
      [758 + 14 * k, 370],
    ] as Array<[number, number]>,
    color: RUNTIMES.workerd,
    delay: 0.25 + 0.3 * k,
    reverse: true,
  })),
];

/** Etched-only decorative traces (no signal, never highlighted). */
const DECOR: Array<Array<[number, number]>> = [
  [
    [440, 158],
    [440, 120],
    [420, 100],
    [360, 100],
  ],
  [
    [480, 158],
    [480, 92],
  ],
  [
    [520, 158],
    [520, 120],
    [540, 100],
    [600, 100],
  ],
  [
    [160, 150],
    [160, 110],
    [140, 90],
    [80, 90],
  ],
  [
    [800, 150],
    [800, 110],
    [820, 90],
    [880, 90],
  ],
];

/** Small passive components scattered on the board, with silkscreen refs. */
const PASSIVES: Array<{
  x: number;
  y: number;
  w: number;
  h: number;
  ref: string;
}> = [
  { x: 340, y: 92, w: 18, h: 9, ref: 'C1' },
  { x: 604, y: 92, w: 18, h: 9, ref: 'C2' },
  { x: 62, y: 84, w: 16, h: 9, ref: 'R1' },
  { x: 882, y: 84, w: 16, h: 9, ref: 'R2' },
  { x: 300, y: 300, w: 18, h: 9, ref: 'C3' },
  { x: 642, y: 300, w: 18, h: 9, ref: 'C4' },
];

/** The two framework modules on either side of Futon. */
const MODULES = [
  {
    key: 'rasengan' as const,
    ref: 'U2',
    name: 'Rasengan',
    detail: 'SSR · SSG · routing',
    href: '/docs/getting-started/introduction',
    color: 'var(--layer-rasengan)',
    x: 60,
    pinsSide: 'right' as const,
  },
  {
    key: 'server' as const,
    ref: 'U3',
    name: 'Rasengan Server',
    detail: 'modules · DI · WS',
    href: '/docs/server/getting-started/introduction',
    color: 'var(--layer-server)',
    x: 700,
    pinsSide: 'left' as const,
  },
];

/** Runtime sockets along the bottom edge (center x). */
const SOCKETS: Array<{
  key: 'node' | 'bun' | 'workerd';
  ref: string;
  label: string;
  cx: number;
  pins: number[];
}> = [
  { key: 'node', ref: 'J1', label: 'NODE.JS', cx: 195, pins: [188, 202] },
  { key: 'bun', ref: 'J2', label: 'BUN', cx: 480, pins: [473, 487] },
  { key: 'workerd', ref: 'J3', label: 'WORKERD', cx: 765, pins: [758, 772] },
];

type Foundation = {
  key: 'node' | 'bun' | 'workerd';
  name: string;
  href: string;
  color: string;
  description: string;
  icon: React.ReactNode;
};

const FOUNDATIONS: Foundation[] = [
  {
    key: 'node',
    name: 'Node.js',
    href: 'https://nodejs.org',
    color: RUNTIMES.node,
    description:
      'The original JavaScript runtime, battle-tested, with the broadest ecosystem and deployment support anywhere.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        className="size-6"
      >
        <path
          fill="#83CD29"
          d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 41 42.061 41 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L18.723 90.73c-.424-.23-.723-.693-.723-1.181V38.407c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-44.086 25.576c-.378.227-.847.227-1.261 0l-11.307-6.749c-.341-.198-.746-.269-1.073-.086-3.146 1.783-3.726 2.02-6.677 3.043-.726.253-1.797.692.41 1.929l14.798 8.754a9.294 9.294 0 004.647 1.246c1.642 0 3.25-.426 4.667-1.246l43.885-25.582c2.87-1.672 4.23-4.764 4.23-8.083V38.407c0-3.319-1.36-6.414-4.229-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.709 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.453 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645.991 1.24.991h5.754c.354 0 .692-.143.94-.396.24-.272.367-.613.335-.979-.891-10.568-7.912-15.493-22.112-15.493-12.631 0-20.166 5.334-20.166 14.275 0 9.698 7.497 12.378 19.622 13.577 14.505 1.422 15.633 3.542 15.633 6.395 0 4.955-3.978 7.066-13.309 7.066z"
        />
      </svg>
    ),
  },
  {
    key: 'bun',
    name: 'Bun',
    href: 'https://bun.sh',
    color: RUNTIMES.bun,
    description:
      'An all-in-one toolkit built for speed, fast cold starts, a native bundler, and near drop-in node compatibility.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        className="size-6"
      >
        <path d="M113.744 41.999a18.558 18.558 0 0 0-.8-.772c-.272-.246-.528-.524-.8-.771s-.528-.525-.8-.771c-.272-.247-.528-.525-.8-.772s-.528-.524-.8-.771-.528-.525-.8-.772-.528-.524-.8-.771c7.936 7.52 12.483 17.752 12.656 28.481 0 25.565-26.912 46.363-60 46.363-18.528 0-35.104-6.526-46.128-16.756l.8.772.8.771.8.772.8.771.8.772.8.771.8.771c11.008 10.662 27.952 17.527 46.928 17.527 33.088 0 60-20.797 60-46.285 0-10.893-4.864-21.215-13.456-29.33z" />
        <path
          fill="#fbf0df"
          d="M116.8 65.08c0 23.467-25.072 42.49-56 42.49s-56-19.023-56-42.49c0-14.55 9.6-27.401 24.352-35.023C43.904 22.435 53.088 14.628 60.8 14.628S75.104 21 92.448 30.058C107.2 37.677 116.8 50.53 116.8 65.08Z"
        />
        <path
          fill="#f6dece"
          d="M116.8 65.08a32.314 32.314 0 0 0-1.28-8.918c-4.368 51.377-69.36 53.846-94.912 38.48 11.486 8.584 25.66 13.144 40.192 12.928 30.88 0 56-19.054 56-42.49z"
        />
        <path
          fill="#fffefc"
          d="M39.248 27.234c7.152-4.135 16.656-11.896 26-11.911a15.372 15.372 0 0 0-4.448-.695c-3.872 0-8 1.93-13.2 4.83-1.808 1.018-3.68 2.144-5.664 3.317-3.728 2.222-8 4.736-12.8 7.251C13.904 37.972 4.8 51.071 4.8 65.08v1.836c9.696-33.033 27.312-35.547 34.448-39.682z"
        />
        <path
          fill="#ccbea7"
          d="M56.192 18.532A24.553 24.553 0 0 1 53.867 29.1a25.407 25.407 0 0 1-6.683 8.671c-.448.386-.096 1.127.48.91 5.392-2.02 12.672-8.068 9.6-20.272-.128-.695-1.072-.51-1.072.123zm3.632 0a24.474 24.474 0 0 1 3.646 10.12c.445 3.587.08 7.224-1.07 10.662-.192.54.496 1.003.88.556 3.504-4.32 6.56-12.899-2.592-22.156-.464-.4-1.184.216-.864.756zm4.416-.262a25.702 25.702 0 0 1 7.521 7.925A24.71 24.71 0 0 1 75.2 36.414c-.016.13.02.26.101.365a.543.543 0 0 0 .718.117.509.509 0 0 0 .221-.313c1.472-5.384.64-14.564-11.472-19.332-.64-.246-1.056.587-.528.957zM34.704 34.315a27.418 27.418 0 0 0 9.91-5.222 26.262 26.262 0 0 0 6.842-8.663c.288-.556 1.2-.34 1.056.277-2.768 12.343-12.032 14.92-17.792 14.58-.608.016-.592-.802-.016-.972z"
        />
        <path d="M60.8 111.443c-33.088 0-60-20.798-60-46.363 0-15.429 9.888-29.823 26.448-38.448 4.8-2.469 8.912-4.953 12.576-7.128 2.016-1.203 3.92-2.33 5.76-3.379C51.2 12.916 56 10.771 60.8 10.771c4.8 0 8.992 1.852 14.24 4.845 1.6.88 3.2 1.836 4.912 2.885 3.984 2.376 8.48 5.06 14.4 8.131 16.56 8.625 26.448 23.004 26.448 38.448 0 25.565-26.912 46.363-60 46.363zm0-96.814c-3.872 0-8 1.928-13.2 4.829-1.808 1.018-3.68 2.144-5.664 3.317-3.728 2.222-8 4.736-12.8 7.251C13.904 37.972 4.8 51.071 4.8 65.08c0 23.436 25.12 42.506 56 42.506s56-19.07 56-42.506c0-14.01-9.104-27.108-24.352-35.023-6.048-3.086-10.768-5.986-14.592-8.27-1.744-1.033-3.344-1.99-4.8-2.838-4.848-2.778-8.384-4.32-12.256-4.32z" />
        <path
          fill="#b71422"
          d="M72.08 76.343c-.719 2.839-2.355 5.383-4.672 7.267a11.07 11.07 0 0 1-6.4 2.9 11.13 11.13 0 0 1-6.608-2.9c-2.293-1.892-3.906-4.436-4.608-7.267a1.073 1.073 0 0 1 .05-.5 1.11 1.11 0 0 1 .272-.428 1.19 1.19 0 0 1 .958-.322h19.744a1.185 1.185 0 0 1 .947.33 1.073 1.073 0 0 1 .317.92z"
        />
        <path
          fill="#ff6164"
          d="M54.4 83.733a11.24 11.24 0 0 0 6.592 2.932 11.239 11.239 0 0 0 6.576-2.932 16.652 16.652 0 0 0 1.6-1.65 10.904 10.904 0 0 0-3.538-2.564 11.26 11.26 0 0 0-4.302-1 10.121 10.121 0 0 0-4.549 1.192 9.71 9.71 0 0 0-3.451 3.097c.368.323.688.632 1.072.925z"
        />
        <path d="M54.656 82.514a8.518 8.518 0 0 1 2.97-2.347 8.836 8.836 0 0 1 3.734-.862 9.78 9.78 0 0 1 6.4 2.608c.368-.386.72-.787 1.056-1.188-2.035-1.87-4.726-2.933-7.536-2.978a10.487 10.487 0 0 0-4.335.975 10.125 10.125 0 0 0-3.489 2.666c.378.396.779.772 1.2 1.126z" />
        <path d="M60.944 87.436a12.078 12.078 0 0 1-7.12-3.086c-2.477-2.02-4.22-4.75-4.976-7.791-.054-.27-.045-.55.027-.817a1.83 1.83 0 0 1 .389-.726 2.25 2.25 0 0 1 .81-.595 2.32 2.32 0 0 1 .998-.192h19.744c.343-.007.683.06.996.196a2.3 2.3 0 0 1 .812.591c.182.212.313.46.382.728.07.267.076.545.018.815-.756 3.042-2.5 5.771-4.976 7.791a12.078 12.078 0 0 1-7.104 3.086zm-9.872-11.417c-.256 0-.32.108-.336.139.676 2.638 2.206 4.999 4.368 6.742a10.122 10.122 0 0 0 5.84 2.7 10.207 10.207 0 0 0 5.84-2.67c2.155-1.745 3.679-4.106 4.352-6.741a.333.333 0 0 0-.14-.113.348.348 0 0 0-.18-.026z" />
        <path
          fill="#febbd0"
          d="M85.152 77.3c5.17 0 9.36-2.377 9.36-5.308s-4.19-5.307-9.36-5.307c-5.17 0-9.36 2.376-9.36 5.307 0 2.931 4.19 5.307 9.36 5.307zm-48.432 0c5.17 0 9.36-2.377 9.36-5.308s-4.19-5.307-9.36-5.307c-5.17 0-9.36 2.376-9.36 5.307 0 2.931 4.19 5.307 9.36 5.307z"
        />
        <path d="M41.12 69.863a9.052 9.052 0 0 0 4.902-1.425 8.578 8.578 0 0 0 3.254-3.812 8.22 8.22 0 0 0 .508-4.913 8.41 8.41 0 0 0-2.408-4.357 8.92 8.92 0 0 0-4.514-2.33 9.12 9.12 0 0 0-5.096.48 8.755 8.755 0 0 0-3.96 3.131 8.287 8.287 0 0 0-1.486 4.725c0 2.252.927 4.412 2.577 6.005 1.65 1.594 3.888 2.492 6.223 2.496zm39.632 0a9.054 9.054 0 0 0 4.915-1.403 8.582 8.582 0 0 0 3.275-3.802 8.22 8.22 0 0 0 .528-4.917 8.408 8.408 0 0 0-2.398-4.368 8.92 8.92 0 0 0-4.512-2.344 9.12 9.12 0 0 0-5.103.473 8.756 8.756 0 0 0-3.967 3.13 8.287 8.287 0 0 0-1.49 4.73c-.004 2.245.914 4.4 2.555 5.994 1.64 1.593 3.869 2.495 6.197 2.507z" />
        <path
          fill="#fff"
          d="M38.4 61.902a3.4 3.4 0 0 0 1.844-.531c.547-.35.974-.847 1.227-1.43a3.088 3.088 0 0 0 .195-1.847 3.16 3.16 0 0 0-.902-1.639 3.351 3.351 0 0 0-1.696-.878 3.426 3.426 0 0 0-1.916.179 3.29 3.29 0 0 0-1.489 1.176 3.113 3.113 0 0 0-.559 1.776c0 .844.347 1.654.964 2.253a3.374 3.374 0 0 0 2.332.94zm39.632 0a3.4 3.4 0 0 0 1.844-.531c.547-.35.974-.847 1.227-1.43a3.088 3.088 0 0 0 .195-1.847 3.16 3.16 0 0 0-.902-1.639 3.351 3.351 0 0 0-1.696-.878 3.426 3.426 0 0 0-1.916.179 3.29 3.29 0 0 0-1.489 1.176 3.113 3.113 0 0 0-.559 1.776c0 .84.342 1.644.953 2.242.61.598 1.44.94 2.311.952z"
        />
      </svg>
    ),
  },
  {
    key: 'workerd',
    name: 'Workerd',
    href: 'https://github.com/cloudflare/workerd',
    color: RUNTIMES.workerd,
    description:
      "Cloudflare's Workers runtime for the edge, deploy Futon apps close to your users, in hundreds of locations worldwide.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        className="size-6"
      >
        <linearGradient
          id="workerd-a"
          x1="-.556"
          x2="-.628"
          y1="128.705"
          y2="128.977"
          gradientTransform="matrix(155.9359 0 0 -364.3 119.128 47001.098)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#eb6f07" />
          <stop offset="1" stopColor="#fab743" />
        </linearGradient>
        <path
          fill="url(#workerd-a)"
          d="M33.882 9.694 48.491 36.05 35.075 60.199a7.75 7.75 0 0 0 0 7.543l13.416 24.209-14.609 26.356a15.501 15.501 0 0 1-6.559-6.172L4.068 71.737a15.563 15.563 0 0 1 0-15.503l23.255-40.398a15.501 15.501 0 0 1 6.559-6.142z"
        />
        <linearGradient
          id="workerd-b"
          x1="-.594"
          x2="-.715"
          y1="129.358"
          y2="129.519"
          gradientTransform="matrix(149.7049 0 0 -194.8 131.59 25305.098)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#d96504" />
          <stop offset="1" stopColor="#d96504" stopOpacity="0" />
        </linearGradient>
        <path
          fill="url(#workerd-b)"
          d="M35.075 60.229a7.75 7.75 0 0 0 0 7.513l13.416 24.209-14.609 26.356a15.501 15.501 0 0 1-6.559-6.172L4.068 71.737c-1.848-3.19 8.497-7.006 31.007-11.478v-.03z"
          opacity=".7"
        />
        <linearGradient
          id="workerd-c"
          x1="-2.234"
          x2="-2.109"
          y1="128.901"
          y2="128.689"
          gradientTransform="matrix(95.8 0 0 -101.1 239.4 13048.3)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#eb6f07" />
          <stop offset="1" stopColor="#eb720a" stopOpacity="0" />
        </linearGradient>
        <path
          fill="url(#workerd-c)"
          d="m35.373 12.347 13.118 23.702-2.176 3.786-11.568-19.587c-3.339-5.456-8.437-2.624-14.818 8.408l.954-1.64 6.44-11.18a15.51 15.51 0 0 1 6.499-6.142l1.521 2.653h.03z"
          opacity=".5"
        />
        <linearGradient
          id="workerd-d"
          x1="-.847"
          x2="-.919"
          y1="128.688"
          y2="128.96"
          gradientTransform="matrix(207.975 0 0 -375 275.025 48376)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#ee6f05" />
          <stop offset="1" stopColor="#fab743" />
        </linearGradient>
        <path
          fill="url(#workerd-d)"
          d="m100.665 15.835 23.255 40.398a15.485 15.485 0 0 1 0 15.503l-23.255 40.398a15.504 15.504 0 0 1-13.416 7.752H63.994l28.92-52.145a7.75 7.75 0 0 0 0-7.513L63.994 8.084h23.255a15.502 15.502 0 0 1 13.416 7.751z"
        />
        <linearGradient
          id="workerd-e"
          x1="-2.602"
          x2="-2.229"
          y1="128.679"
          y2="128.977"
          gradientTransform="matrix(118.9101 0 0 -375.1 361.09 48388.902)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#d96504" stopOpacity=".8" />
          <stop offset=".498" stopColor="#d96504" stopOpacity=".2" />
          <stop offset="1" stopColor="#d96504" stopOpacity="0" />
        </linearGradient>
        <path
          fill="url(#workerd-e)"
          d="m86.057 119.708-22.957.208 27.787-52.413a8.053 8.053 0 0 0 0-7.573L63.1 8.084h5.247l29.158 51.608a8.048 8.048 0 0 1-.03 7.99 4670.283 4670.283 0 0 0-18.693 32.796c-5.665 9.957-3.22 16.367 7.275 19.23z"
        />
        <linearGradient
          id="workerd-f"
          x1="-.561"
          x2="-.634"
          y1="128.688"
          y2="128.96"
          gradientTransform="matrix(201.2571 0 0 -375 180.743 48376)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#ffa95f" />
          <stop offset="1" stopColor="#ffebc8" />
        </linearGradient>
        <path
          fill="url(#workerd-f)"
          d="M40.739 119.886c-2.385 0-4.77-.566-6.857-1.58l28.681-51.727a5.353 5.353 0 0 0 0-5.188L33.882 9.694a15.492 15.492 0 0 1 6.857-1.61h23.255l28.92 52.145a7.75 7.75 0 0 1 0 7.513l-28.92 52.145H40.739z"
        />
        <linearGradient
          id="workerd-g"
          x1="-2.816"
          x2="-2.552"
          y1="128.861"
          y2="128.719"
          gradientTransform="matrix(109.2571 0 0 -375 364.743 48376)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fff" stopOpacity=".5" />
          <stop offset="1" stopColor="#fff" stopOpacity=".1" />
        </linearGradient>
        <path
          fill="url(#workerd-g)"
          d="M90.886 61.391 61.311 8.084h2.683l28.92 52.145a7.75 7.75 0 0 1 0 7.513l-28.92 52.145h-2.683l29.576-53.308a5.35 5.35 0 0 0-.001-5.188z"
          opacity=".6"
        />
        <linearGradient
          id="workerd-h"
          x1="-2.34"
          x2="-2.001"
          y1="128.779"
          y2="128.952"
          gradientTransform="matrix(107.2571 0 0 -371.4 274.743 47913.2)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fff" stopOpacity=".5" />
          <stop offset="1" stopColor="#fff" stopOpacity=".1" />
        </linearGradient>
        <path
          fill="url(#workerd-h)"
          d="M62.563 61.391 33.882 9.694c.894-.477 1.968-.835 2.981-1.133 6.321 11.359 15.652 28.592 28.025 51.668a7.75 7.75 0 0 1 0 7.513L36.416 119.29c-1.014-.298-1.55-.507-2.504-.954l28.622-51.727a5.353 5.353 0 0 0 0-5.188l.029-.03z"
          opacity=".6"
        />
      </svg>
    ),
  },
];

// ── Helpers ──────────────────────────────────────────────────

/** Converts viewBox coordinates into CSS percentages for HTML overlays. */
const pct = (value: number, total: number) => `${(value / total) * 100}%`;

/**
 * Whether a trace should be lit for the current hover target. Futon is the
 * hub, so hovering it lights every trace; nothing hovered lights everything
 * at normal strength.
 */
function traceState(
  trace: Trace,
  active: PartKey | null
): 'normal' | 'lit' | 'dim' {
  if (!active) return 'normal';
  if (active === 'futon' || active === trace.part) return 'lit';
  return 'dim';
}

// ── SVG pieces ───────────────────────────────────────────────

/** One copper trace with its animated pulse (two strokes: glow + core). */
function TracePath({
  trace,
  state,
}: {
  trace: Trace;
  state: 'normal' | 'lit' | 'dim';
}) {
  const d = toPath(trace.points);
  const pulseStyle = {
    animationName: 'comet',
    animationDuration: '2.6s',
    animationDelay: `${trace.delay}s`,
    animationDirection: trace.reverse ? 'reverse' : 'normal',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  } as React.CSSProperties;

  return (
    <g
      style={{ opacity: state === 'dim' ? 0.18 : 1 }}
      className="transition-opacity duration-300 ease-out"
    >
      {/* copper: tinted by the signal color when lit */}
      <path
        d={d}
        pathLength={1}
        fill="none"
        strokeWidth={2}
        strokeLinejoin="round"
        stroke={state === 'lit' ? trace.color : PCB.trace}
        strokeOpacity={state === 'lit' ? 0.55 : 1}
        className="transition-[stroke] duration-300"
      />
      <path
        d={d}
        pathLength={1}
        fill="none"
        stroke={trace.color}
        strokeWidth={6}
        strokeDasharray="0.14 0.86"
        style={{ ...pulseStyle, filter: 'url(#board-soften)' }}
        className="opacity-70 motion-reduce:hidden"
      />
      <path
        d={d}
        pathLength={1}
        fill="none"
        stroke={trace.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray="0.14 0.86"
        style={pulseStyle}
        className="motion-reduce:hidden"
      />
    </g>
  );
}

/** A row of gold pins along one side of a package. */
function Pins({
  side,
  x,
  y,
  count,
  step,
  length = 12,
}: {
  side: 'left' | 'right' | 'top' | 'bottom';
  x: number;
  y: number;
  count: number;
  step: number;
  length?: number;
}) {
  return (
    <g fill={PCB.pad} opacity={0.75}>
      {Array.from({ length: count }, (_, i) => {
        if (side === 'left' || side === 'right') {
          const py = y + i * step;
          return (
            <rect
              key={i}
              x={side === 'left' ? x - length : x}
              y={py - 2.5}
              width={length}
              height={5}
              rx={1}
            />
          );
        }
        const px = x + i * step;
        return (
          <rect
            key={i}
            x={px - 2.5}
            y={side === 'top' ? y - length : y}
            width={5}
            height={length}
            rx={1}
          />
        );
      })}
    </g>
  );
}

/** The SVG artwork of the board (everything except the HTML hit areas). */
function BoardArt({ active }: { active: PartKey | null }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <filter id="board-soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={2.6} />
        </filter>
        <pattern
          id="board-dots"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="0.9" fill="#ffffff" opacity="0.05" />
        </pattern>
        <linearGradient id="board-chip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={PCB.chipTop} />
          <stop offset="1" stopColor={PCB.chipBottom} />
        </linearGradient>
        <radialGradient id="board-futon-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--layer-futon)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--layer-futon)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* substrate, dot texture, edge */}
      <rect
        x={8}
        y={8}
        width={W - 16}
        height={H - 16}
        rx={22}
        fill={PCB.substrate}
      />
      <rect
        x={8}
        y={8}
        width={W - 16}
        height={H - 16}
        rx={22}
        fill="url(#board-dots)"
      />
      <rect
        x={8}
        y={8}
        width={W - 16}
        height={H - 16}
        rx={22}
        fill="none"
        stroke={PCB.edge}
        strokeWidth={1.5}
      />

      {/* mounting holes */}
      {[
        [36, 36],
        [W - 36, 36],
        [36, H - 36],
        [W - 36, H - 36],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle
            cx={cx}
            cy={cy}
            r={11}
            fill="none"
            stroke={PCB.pad}
            strokeOpacity={0.45}
            strokeWidth={3}
          />
          <circle cx={cx} cy={cy} r={6} fill="#04070e" />
        </g>
      ))}

      {/* silkscreen */}
      <text
        x={60}
        y={42}
        fill={PCB.silk}
        className="font-mono"
        fontSize={11}
        letterSpacing={2}
      >
        RASENGAN.JS · STACK BOARD
      </text>
      <text
        x={W - 60}
        y={42}
        fill={PCB.silk}
        className="font-mono"
        fontSize={11}
        letterSpacing={2}
        textAnchor="end"
      >
        REV 2.0-BETA
      </text>

      {/* decorative etched traces and passives */}
      {DECOR.map((points, i) => (
        <path
          key={i}
          d={toPath(points)}
          fill="none"
          stroke={PCB.trace}
          strokeWidth={1.5}
        />
      ))}
      {PASSIVES.map((p) => (
        <g key={p.ref}>
          <rect
            x={p.x}
            y={p.y}
            width={p.w}
            height={p.h}
            rx={1.5}
            fill="#1a2440"
            stroke={PCB.pad}
            strokeOpacity={0.5}
          />
          <text
            x={p.x + p.w / 2}
            y={p.y - 4}
            fill={PCB.silk}
            fontSize={8.5}
            textAnchor="middle"
            className="font-mono"
          >
            {p.ref}
          </text>
        </g>
      ))}

      {/* glow under Futon, stronger when the board is "live" on Futon */}
      <ellipse
        cx={480}
        cy={230}
        rx={170}
        ry={110}
        fill="url(#board-futon-halo)"
        style={{ opacity: active === 'futon' ? 1 : 0.6 }}
        className="transition-opacity duration-300"
      />

      {/* traces + pulses */}
      {TRACES.map((trace) => (
        <TracePath
          key={trace.id}
          trace={trace}
          state={traceState(trace, active)}
        />
      ))}

      {/* framework modules */}
      {MODULES.map((m) => {
        const lit = active === m.key || active === 'futon';
        return (
          <g key={m.key}>
            <text
              x={m.x}
              y={142}
              fill={PCB.silk}
              fontSize={10}
              className="font-mono"
            >
              {m.ref}
            </text>
            <Pins
              side={m.pinsSide}
              x={m.pinsSide === 'right' ? m.x + 200 : m.x}
              y={180}
              count={3}
              step={14}
            />
            <rect
              x={m.x}
              y={150}
              width={200}
              height={110}
              rx={10}
              fill="url(#board-chip)"
              stroke={m.color}
              strokeOpacity={lit ? 0.9 : 0.4}
              strokeWidth={1.5}
              className="transition-[stroke-opacity] duration-300"
            />
            <circle
              cx={m.x + 14}
              cy={164}
              r={2.5}
              fill={m.color}
              opacity={0.8}
            />
            <text
              x={m.x + 100}
              y={203}
              fill="#ffffff"
              fontSize={16}
              fontWeight={600}
              textAnchor="middle"
              className="font-mono"
            >
              {m.name}
            </text>
            <text
              x={m.x + 100}
              y={225}
              fill={m.color}
              fontSize={11}
              textAnchor="middle"
              className="font-mono"
            >
              {m.detail}
            </text>
          </g>
        );
      })}

      {/* Futon: the central chip */}
      <g>
        <text
          x={390}
          y={146}
          fill={PCB.silk}
          fontSize={10}
          className="font-mono"
        >
          U1
        </text>
        <Pins side="left" x={390} y={200} count={3} step={14} />
        <Pins side="right" x={570} y={200} count={3} step={14} />
        <Pins side="top" x={420} y={170} count={6} step={24} />
        <Pins side="bottom" x={420} y={290} count={2} step={14} />
        <Pins side="bottom" x={473} y={290} count={2} step={14} />
        <Pins side="bottom" x={526} y={290} count={2} step={14} />
        <rect
          x={390}
          y={170}
          width={180}
          height={120}
          rx={12}
          fill="url(#board-chip)"
          stroke="var(--layer-futon)"
          strokeOpacity={active === 'futon' ? 1 : 0.6}
          strokeWidth={1.75}
          className="transition-[stroke-opacity] duration-300"
        />
        <circle
          cx={406}
          cy={186}
          r={3}
          fill="var(--layer-futon)"
          opacity={0.8}
        />
        <text
          x={480}
          y={214}
          fill="var(--layer-futon)"
          fontSize={10.5}
          letterSpacing={3}
          textAnchor="middle"
          className="font-mono"
        >
          CORE
        </text>
        <text
          x={480}
          y={240}
          fill="#ffffff"
          fontSize={22}
          fontWeight={600}
          textAnchor="middle"
          className="font-mono"
        >
          Futon
        </text>
        <text
          x={480}
          y={262}
          fill="#8fa4d6"
          fontSize={10.5}
          textAnchor="middle"
          className="font-mono"
        >
          WinterCG HTTP runtime
        </text>
      </g>

      {/* runtime sockets */}
      {SOCKETS.map((s) => {
        const lit = active === s.key || active === 'futon';
        const color = RUNTIMES[s.key];
        return (
          <g key={s.key}>
            <text
              x={s.cx - 85}
              y={H - 22}
              fill={PCB.silk}
              fontSize={9.5}
              className="font-mono"
            >
              {s.ref}
            </text>
            <rect
              x={s.cx - 85}
              y={370}
              width={170}
              height={54}
              rx={8}
              fill="#0d1528"
              stroke={color}
              strokeOpacity={lit ? 0.95 : 0.35}
              strokeWidth={1.5}
              className="transition-[stroke-opacity] duration-300"
            />
            {s.pins.map((px) => (
              <rect
                key={px}
                x={px - 4}
                y={366}
                width={8}
                height={8}
                rx={1.5}
                fill={PCB.pad}
                opacity={0.8}
              />
            ))}
            <circle cx={s.cx - 58} cy={400} r={4} fill={color} />
            <text
              x={s.cx - 46}
              y={404.5}
              fill="#e5ebfa"
              fontSize={13}
              fontWeight={600}
              letterSpacing={1.5}
              className="font-mono"
            >
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Interactive board ────────────────────────────────────────

/** Shared classes for the transparent, focusable hit areas over the board. */
const hitArea =
  'absolute z-10 rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80';

/**
 * The full-size board (lg and up): SVG art plus HTML hit areas laid over each
 * part, so every part is a real link with keyboard focus.
 */
function Board({
  active,
  setActive,
}: {
  active: PartKey | null;
  setActive: (key: PartKey | null) => void;
}) {
  const hover = (key: PartKey) => ({
    onMouseEnter: () => setActive(key),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(key),
    onBlur: () => setActive(null),
  });

  return (
    <div className="relative mx-auto aspect-[960/460] w-full max-w-[1100px]">
      <BoardArt active={active} />

      <Link
        to="/docs/futon/getting-started/introduction"
        aria-label="Futon documentation"
        style={{
          left: pct(390, W),
          top: pct(170, H),
          width: pct(180, W),
          height: pct(120, H),
        }}
        className={hitArea}
        {...hover('futon')}
      />

      {MODULES.map((m) => (
        <Link
          key={m.key}
          to={m.href}
          aria-label={`${m.name} documentation`}
          style={{
            left: pct(m.x, W),
            top: pct(150, H),
            width: pct(200, W),
            height: pct(110, H),
          }}
          className={hitArea}
          {...hover(m.key)}
        />
      ))}

      {SOCKETS.map((s) => {
        const foundation = FOUNDATIONS.find((f) => f.key === s.key)!;
        return (
          <a
            key={s.key}
            href={foundation.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${foundation.name} website`}
            style={{
              left: pct(s.cx - 85, W),
              top: pct(370, H),
              width: pct(170, W),
              height: pct(54, H),
            }}
            className={hitArea}
            {...hover(s.key)}
          />
        );
      })}
    </div>
  );
}

/**
 * The small-screen version: the same relationships as a vertical stack of
 * labelled blocks, readable at phone width.
 */
function CompactBoard() {
  return (
    <div className="grid gap-3 rounded-2xl border border-[#1f2b47] bg-[#0a1222] p-4 font-mono text-sm text-[#e5ebfa]">
      <div className="grid grid-cols-2 gap-3">
        {MODULES.map((m) => (
          <Link
            key={m.key}
            to={m.href}
            style={{ '--c': m.color } as React.CSSProperties}
            className="grid gap-1 rounded-lg border border-[color-mix(in_oklab,var(--c)_50%,transparent)] bg-[#0f182c] p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            <span className="font-semibold">{m.name}</span>
            <span className="text-[11px] text-[var(--c)]">{m.detail}</span>
          </Link>
        ))}
      </div>
      <p
        aria-hidden="true"
        className="text-center text-[10px] tracking-[0.2em] text-[#55658f]"
      >
        ▲ POWERED BY ▲
      </p>
      <Link
        to="/docs/futon/getting-started/introduction"
        className="grid gap-1 rounded-lg border border-[color-mix(in_oklab,var(--layer-futon)_60%,transparent)] bg-[#0f182c] p-3 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
      >
        <span className="text-[10px] tracking-[0.25em] text-layer-futon">
          CORE
        </span>
        <span className="text-lg font-semibold">Futon</span>
      </Link>
      <p
        aria-hidden="true"
        className="text-center text-[10px] tracking-[0.2em] text-[#55658f]"
      >
        ▲ RUNS ON ▲
      </p>
      <div className="grid grid-cols-3 gap-2">
        {SOCKETS.map((s) => (
          <span
            key={s.key}
            style={{ '--c': RUNTIMES[s.key] } as React.CSSProperties}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-[color-mix(in_oklab,var(--c)_45%,transparent)] py-2 text-[11px]"
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-[var(--c)]"
            />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────

export default function EcosystemStack() {
  const [active, setActive] = useState<PartKey | null>(null);

  return (
    <section className="mx-auto max-w-[1200px] py-16 lg:py-24">
      <div className="max-w-[720px]">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-foreground/50">
          Runs anywhere
        </p>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-[-0.02em] text-foreground lg:text-4xl">
          One runtime under both frameworks
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-foreground/70">
          Futon powers Rasengan and Rasengan Server, and runs unmodified on
          Node.js, Bun and Workerd.{' '}
          <span className="hidden lg:inline">
            Hover any part of the board to trace its connections.
          </span>
        </p>
      </div>

      <div className="mt-10 hidden lg:block">
        <Board active={active} setActive={setActive} />
      </div>
      <div className="mt-8 lg:hidden">
        <CompactBoard />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {FOUNDATIONS.map((foundation) => (
          <a
            key={foundation.name}
            href={foundation.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setActive(foundation.key)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(foundation.key)}
            onBlur={() => setActive(null)}
            style={{ '--c': foundation.color } as React.CSSProperties}
            className={cn(
              'group flex flex-col gap-3 rounded-xl border border-border bg-background p-5',
              'transition-[transform,border-color,box-shadow] duration-200 ease-out',
              'motion-safe:hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--c)_50%,transparent)] hover:shadow-[0_16px_34px_-22px_var(--c)]',
              active === foundation.key &&
                'border-[color-mix(in_oklab,var(--c)_50%,transparent)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
            )}
          >
            <div className="flex items-center gap-3">
              <div
                aria-hidden="true"
                className="flex size-10 items-center justify-center rounded-lg border border-[color-mix(in_oklab,var(--c)_35%,transparent)] bg-[color-mix(in_oklab,var(--c)_12%,transparent)]"
              >
                {foundation.icon}
              </div>
              <span className="flex items-center gap-1.5 font-semibold text-foreground">
                {foundation.name}
                <ArrowUpRight
                  size={14}
                  aria-hidden="true"
                  className="text-foreground/40 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--c)]"
                />
              </span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/70">
              {foundation.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
