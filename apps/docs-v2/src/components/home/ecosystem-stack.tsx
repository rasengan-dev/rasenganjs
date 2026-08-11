import { Link } from 'rasengan';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// A "Powered By" style diagram: a central Futon chip on a PCB, etched
// circuit traces routing out to Rasengan / Rasengan Server, and down into a
// row of runtime foundation cards. All animation is plain CSS (see the
// `comet` / `chip-shine` keyframes in styles/index.css) — no JS-driven
// state, everything loops on its own.

// ── Data ─────────────────────────────────────────────────────

const VIOLET = '#B06BFF';

const RUNTIMES = {
  node: '#68A063',
  bun: '#F9DA1B',
  workerd: '#F6821F',
};

type Trace = {
  id: string;
  d: string;
  /** Omit to render as an etched (unlit) trace only. */
  pulse?: {
    color: string;
    duration: number;
    delay?: number;
    reverse?: boolean;
  };
};

// Coordinates are hand-placed against the `0 0 780 300` board viewBox below
// — the chip sits at roughly (390, 136), pins at y=98/174.
const TRACES: Trace[] = [
  // "powers" — out from the chip to Rasengan / Rasengan Server
  {
    id: 'to-rasengan',
    d: 'M305 128 L214 128 C206 128 200 134 200 142 L142 142',
    pulse: { color: 'var(--color-primary)', duration: 2.6 },
  },
  {
    id: 'to-server',
    d: 'M475 128 L566 128 C574 128 580 134 580 142 L638 142',
    pulse: { color: VIOLET, duration: 2.6, delay: 0.5 },
  },
  // "runs on" — up from the runtime foundation, dissolving into the chip
  {
    id: 'from-node',
    d: 'M350 174 L350 204 C350 212 344 218 336 218 L146 218 C138 218 132 224 132 232 L132 292',
    pulse: { color: RUNTIMES.node, duration: 2.9, delay: 0.15, reverse: true },
  },
  {
    id: 'from-bun',
    d: 'M390 174 L390 292',
    pulse: { color: RUNTIMES.bun, duration: 2.5, delay: 0.55, reverse: true },
  },
  {
    id: 'from-workerd',
    d: 'M430 174 L430 204 C430 212 436 218 444 218 L634 218 C642 218 648 224 648 232 L648 292',
    pulse: {
      color: RUNTIMES.workerd,
      duration: 2.9,
      delay: 0.35,
      reverse: true,
    },
  },
  // decorative top traces — etched only, no signal
  { id: 'deco-left', d: 'M352 98 L352 62 C352 54 346 48 338 48 L302 48' },
  { id: 'deco-mid', d: 'M390 98 L390 40' },
  { id: 'deco-right', d: 'M428 98 L428 62 C428 54 434 48 442 48 L478 48' },
];

// Solder vias marking the end of each trace above.
const VIAS: Array<[number, number]> = [
  [132, 142],
  [648, 142],
  [132, 292],
  [390, 292],
  [648, 292],
  [302, 48],
  [390, 40],
  [478, 48],
];

type Foundation = {
  name: string;
  href: string;
  color: string;
  description: string;
  icon: React.ReactNode;
};

const FOUNDATIONS: Foundation[] = [
  {
    name: 'Node.js',
    href: 'https://nodejs.org',
    color: RUNTIMES.node,
    description:
      'The original JavaScript runtime — battle-tested, with the broadest ecosystem and deployment support anywhere.',
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
    name: 'Bun',
    href: 'https://bun.sh',
    color: RUNTIMES.bun,
    description:
      'An all-in-one toolkit built for speed — fast cold starts, a native bundler, and near drop-in node compatibility.',
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
    name: 'Workerd',
    href: 'https://github.com/cloudflare/workerd',
    color: RUNTIMES.workerd,
    description:
      "Cloudflare's Workers runtime for the edge — deploy Futon apps close to your users, in hundreds of locations worldwide.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        className="size-6"
      >
        <linearGradient
          id="a"
          x1="-.556"
          x2="-.628"
          y1="128.705"
          y2="128.977"
          gradientTransform="matrix(155.9359 0 0 -364.3 119.128 47001.098)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#eb6f07" />
          <stop offset="1" stop-color="#fab743" />
        </linearGradient>
        <path
          fill="url(#a)"
          d="M33.882 9.694 48.491 36.05 35.075 60.199a7.75 7.75 0 0 0 0 7.543l13.416 24.209-14.609 26.356a15.501 15.501 0 0 1-6.559-6.172L4.068 71.737a15.563 15.563 0 0 1 0-15.503l23.255-40.398a15.501 15.501 0 0 1 6.559-6.142z"
        />
        <linearGradient
          id="b"
          x1="-.594"
          x2="-.715"
          y1="129.358"
          y2="129.519"
          gradientTransform="matrix(149.7049 0 0 -194.8 131.59 25305.098)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#d96504" />
          <stop offset="1" stop-color="#d96504" stop-opacity="0" />
        </linearGradient>
        <path
          fill="url(#b)"
          d="M35.075 60.229a7.75 7.75 0 0 0 0 7.513l13.416 24.209-14.609 26.356a15.501 15.501 0 0 1-6.559-6.172L4.068 71.737c-1.848-3.19 8.497-7.006 31.007-11.478v-.03z"
          opacity=".7"
        />
        <linearGradient
          id="c"
          x1="-2.234"
          x2="-2.109"
          y1="128.901"
          y2="128.689"
          gradientTransform="matrix(95.8 0 0 -101.1 239.4 13048.3)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#eb6f07" />
          <stop offset="1" stop-color="#eb720a" stop-opacity="0" />
        </linearGradient>
        <path
          fill="url(#c)"
          d="m35.373 12.347 13.118 23.702-2.176 3.786-11.568-19.587c-3.339-5.456-8.437-2.624-14.818 8.408l.954-1.64 6.44-11.18a15.51 15.51 0 0 1 6.499-6.142l1.521 2.653h.03z"
          opacity=".5"
        />
        <linearGradient
          id="d"
          x1="-.847"
          x2="-.919"
          y1="128.688"
          y2="128.96"
          gradientTransform="matrix(207.975 0 0 -375 275.025 48376)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#ee6f05" />
          <stop offset="1" stop-color="#fab743" />
        </linearGradient>
        <path
          fill="url(#d)"
          d="m100.665 15.835 23.255 40.398a15.485 15.485 0 0 1 0 15.503l-23.255 40.398a15.504 15.504 0 0 1-13.416 7.752H63.994l28.92-52.145a7.75 7.75 0 0 0 0-7.513L63.994 8.084h23.255a15.502 15.502 0 0 1 13.416 7.751z"
        />
        <linearGradient
          id="e"
          x1="-2.602"
          x2="-2.229"
          y1="128.679"
          y2="128.977"
          gradientTransform="matrix(118.9101 0 0 -375.1 361.09 48388.902)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#d96504" stop-opacity=".8" />
          <stop offset=".498" stop-color="#d96504" stop-opacity=".2" />
          <stop offset="1" stop-color="#d96504" stop-opacity="0" />
        </linearGradient>
        <path
          fill="url(#e)"
          d="m86.057 119.708-22.957.208 27.787-52.413a8.053 8.053 0 0 0 0-7.573L63.1 8.084h5.247l29.158 51.608a8.048 8.048 0 0 1-.03 7.99 4670.283 4670.283 0 0 0-18.693 32.796c-5.665 9.957-3.22 16.367 7.275 19.23z"
        />
        <linearGradient
          id="f"
          x1="-.561"
          x2="-.634"
          y1="128.688"
          y2="128.96"
          gradientTransform="matrix(201.2571 0 0 -375 180.743 48376)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#ffa95f" />
          <stop offset="1" stop-color="#ffebc8" />
        </linearGradient>
        <path
          fill="url(#f)"
          d="M40.739 119.886c-2.385 0-4.77-.566-6.857-1.58l28.681-51.727a5.353 5.353 0 0 0 0-5.188L33.882 9.694a15.492 15.492 0 0 1 6.857-1.61h23.255l28.92 52.145a7.75 7.75 0 0 1 0 7.513l-28.92 52.145H40.739z"
        />
        <linearGradient
          id="g"
          x1="-2.816"
          x2="-2.552"
          y1="128.861"
          y2="128.719"
          gradientTransform="matrix(109.2571 0 0 -375 364.743 48376)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#fff" stop-opacity=".5" />
          <stop offset="1" stop-color="#fff" stop-opacity=".1" />
        </linearGradient>
        <path
          fill="url(#g)"
          d="M90.886 61.391 61.311 8.084h2.683l28.92 52.145a7.75 7.75 0 0 1 0 7.513l-28.92 52.145h-2.683l29.576-53.308a5.35 5.35 0 0 0-.001-5.188z"
          opacity=".6"
        />
        <linearGradient
          id="h"
          x1="-2.34"
          x2="-2.001"
          y1="128.779"
          y2="128.952"
          gradientTransform="matrix(107.2571 0 0 -371.4 274.743 47913.2)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#fff" stop-opacity=".5" />
          <stop offset="1" stop-color="#fff" stop-opacity=".1" />
        </linearGradient>
        <path
          fill="url(#h)"
          d="M62.563 61.391 33.882 9.694c.894-.477 1.968-.835 2.981-1.133 6.321 11.359 15.652 28.592 28.025 51.668a7.75 7.75 0 0 1 0 7.513L36.416 119.29c-1.014-.298-1.55-.507-2.504-.954l28.622-51.727a5.353 5.353 0 0 0 0-5.188l.029-.03z"
          opacity=".6"
        />
      </svg>
    ),
  },
];

// ── Trace path ───────────────────────────────────────────────

function TracePath({ trace }: { trace: Trace }) {
  const { pulse } = trace;

  return (
    <g>
      <path
        d={trace.d}
        pathLength={1}
        strokeWidth={1.25}
        className="fill-none stroke-border opacity-55"
      />

      {pulse && (
        <>
          <path
            d={trace.d}
            pathLength={1}
            stroke={pulse.color}
            strokeWidth={5}
            strokeDasharray="0.16 0.84"
            style={{
              animationName: 'comet',
              animationDuration: `${pulse.duration}s`,
              animationDelay: `${pulse.delay ?? 0}s`,
              animationDirection: pulse.reverse ? 'reverse' : 'normal',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              filter: 'url(#ecosystem-stack-soften)',
            }}
            className="motion-reduce:hidden fill-none opacity-90"
          />
          <path
            d={trace.d}
            pathLength={1}
            stroke={pulse.color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="0.16 0.84"
            style={{
              animationName: 'comet',
              animationDuration: `${pulse.duration}s`,
              animationDelay: `${pulse.delay ?? 0}s`,
              animationDirection: pulse.reverse ? 'reverse' : 'normal',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
            }}
            className="motion-reduce:hidden fill-none"
          />
        </>
      )}
    </g>
  );
}

// ── Stack tap (Rasengan / Rasengan Server labels) ───────────

function StackTap({
  name,
  href,
  color,
  left,
}: {
  name: string;
  href: string;
  color: string;
  left: string;
}) {
  return (
    <Link
      to={href}
      style={{ left, top: '47.3%', '--c': color } as React.CSSProperties}
      className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-md border border-border bg-background/90 px-2.5 py-1.5 font-mono text-[clamp(11px,2cqw,13px)] font-medium text-foreground backdrop-blur-sm transition-colors duration-200 ease-out hover:border-[var(--c)]/60 hover:text-[var(--c)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span
        aria-hidden="true"
        style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
        className="size-[5px] rounded-full"
      />
      {name}
    </Link>
  );
}

// ── Section ──────────────────────────────────────────────────

export default function EcosystemStack() {
  return (
    <section className="py-16 lg:py-20 border border-border p-4">
      <div className="border-b border-border pb-16 text-center lg:pb-20">
        <h2 className="mx-auto max-w-[620px] text-3xl font-bold text-foreground lg:text-4xl">
          Built on a Foundation of Fast, Production-Grade Runtimes
        </h2>
        <p className="mx-auto max-w-[620px] mt-4 text-lg leading-relaxed text-foreground/70">
          Futon powers Rasengan and Rasengan Server and runs unmodified on Node,
          Bun, or Workerd.
        </p>
      </div>

      <div className="relative mx-auto mt-12 aspect-[780/300] w-full max-w-[780px] [container-type:inline-size]">
        <svg
          viewBox="0 0 780 300"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <filter
              id="ecosystem-stack-soften"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation={2.4} />
            </filter>
          </defs>

          {/* halo the pulses dissolve into */}
          <ellipse
            cx={390}
            cy={136}
            rx={150}
            ry={86}
            fill="url(#ecosystem-stack-halo)"
          />

          {/* chip pin ticks */}
          <g className="stroke-border" strokeWidth={2} opacity={0.7}>
            <path d="M340 98 L340 90 M390 98 L390 90 M440 98 L440 90" />
            <path d="M340 174 L340 182 M390 174 L390 182 M440 174 L440 182" />
            <path d="M305 120 L297 120 M305 152 L297 152" />
            <path d="M475 120 L483 120 M475 152 L483 152" />
          </g>

          {TRACES.map((trace) => (
            <TracePath key={trace.id} trace={trace} />
          ))}

          {VIAS.map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r={3.5} className="fill-background" />
              <circle
                cx={cx}
                cy={cy}
                r={3.5}
                strokeWidth={1}
                className="fill-none stroke-border"
              />
            </g>
          ))}
        </svg>

        {/* Futon chip — a real IC package, so it stays dark on both themes */}
        <Link
          to="/docs/futon/getting-started/introduction"
          style={{ left: '50%', top: '45.3%' }}
          className="absolute z-10 grid h-[9.8cqw] min-h-[60px] w-[21.8cqw] min-w-[132px] -translate-x-1/2 -translate-y-1/2 place-items-center gap-0.5 overflow-hidden rounded-lg border border-[#2f3b56] bg-[linear-gradient(180deg,#1a2338_0%,#0a0e18_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-12px_20px_-16px_rgba(0,0,0,0.8),0_12px_28px_-14px_rgba(0,0,0,0.7),0_0_36px_-10px_rgba(77,157,255,0.45)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-[#4d9dff] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-12px_20px_-16px_rgba(0,0,0,0.8),0_12px_28px_-14px_rgba(0,0,0,0.7),0_0_46px_-6px_rgba(77,157,255,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d9dff] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {/* pin-1 orientation mark, like a real IC package */}
          <span
            aria-hidden="true"
            className="absolute left-[10%] top-[16%] size-[3px] rounded-full bg-[#6fa8ff]/70"
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 motion-safe:[animation:chip-shine_4.5s_ease-in-out_infinite] bg-linear-to-r from-transparent via-white/10 to-transparent"
          />

          <span className="font-mono text-[clamp(9px,2.1cqw,11px)] uppercase tracking-[0.22em] text-[#6fa8ff]">
            core
          </span>
          <span className="font-mono text-[clamp(13px,3.4cqw,15px)] font-semibold text-white">
            Futon
          </span>
        </Link>

        <StackTap
          name="Rasengan"
          href="/docs/getting-started/introduction"
          color="var(--color-primary)"
          left="9.5%"
        />
        <StackTap
          name="Rasengan Server"
          href="/docs/server/getting-started/introduction"
          color={VIOLET}
          left="90.5%"
        />
      </div>

      <div className="mx-auto mt-8 grid max-w-[900px] grid-cols-1 gap-4 sm:grid-cols-3">
        {FOUNDATIONS.map((foundation) => (
          <a
            key={foundation.name}
            href={foundation.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ '--c': foundation.color } as React.CSSProperties}
            className={cn(
              'group flex flex-col gap-3 rounded-xl border border-border p-5',
              'transition-[transform,border-color,box-shadow] duration-200 ease-out',
              'hover:-translate-y-1 hover:border-[var(--c)]/50 hover:shadow-[0_16px_34px_-18px_var(--c)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
            )}
          >
            <div
              aria-hidden="true"
              style={{
                color: foundation.color,
                backgroundColor: `${foundation.color}1f`,
                borderColor: `${foundation.color}52`,
              }}
              className="flex size-10 items-center justify-center rounded-lg border"
            >
              {foundation.icon}
            </div>

            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              {foundation.name}
              <ArrowUpRight
                size={14}
                aria-hidden="true"
                className="text-foreground/40 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--c)]"
              />
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
