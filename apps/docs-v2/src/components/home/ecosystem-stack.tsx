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
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinejoin="round"
      >
        <path d="M12 2.5 21 7.5v9L12 21.5 3 16.5v-9z" />
        <path d="M12 12v9.5M12 12 3 7.5M12 12l9-4.5" opacity={0.5} />
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
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <ellipse cx="12" cy="13" rx="9" ry="7" />
        <circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" />
        <path d="M10.5 15q1.5 1 3 0" strokeLinecap="round" />
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
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M7 17h10a3.5 3.5 0 0 0 .3-6.98A5 5 0 0 0 7.6 9.6 3.7 3.7 0 0 0 7 17z" />
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
    <section className="py-16 lg:py-20 border border-border">
      <div className="border-b border-border pb-16 text-center lg:pb-20">
        <h2 className="mx-auto max-w-[620px] text-3xl font-bold text-foreground lg:text-4xl">
          Built on a Foundation of Fast, Production-Grade Runtimes
        </h2>
        <p className="mx-auto max-w-[620px] mt-4 text-lg leading-relaxed text-foreground/70">
          Futon powers Rasengan and Rasengan Server — and runs unmodified on
          Node, Bun, or Workerd.
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

        {/* Futon chip */}
        <Link
          to="/docs/futon/getting-started/introduction"
          style={{ left: '50%', top: '45.3%' }}
          className="absolute z-10 grid h-[9.8cqw] min-h-[60px] w-[21.8cqw] min-w-[132px] -translate-x-1/2 -translate-y-1/2 place-items-center gap-0.5 overflow-hidden rounded-2xl border border-primary/40 bg-linear-to-b from-(--code-block-bg) to-background shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors duration-200 ease-out hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 motion-safe:[animation:chip-shine_4.5s_ease-in-out_infinite] bg-linear-to-r from-transparent via-white/15 to-transparent"
          />
          <span className="font-mono text-[clamp(9px,2.1cqw,11px)] uppercase tracking-[0.22em] text-primary/80">
            core
          </span>
          <span className="font-mono text-[clamp(13px,3.4cqw,15px)] font-semibold text-foreground">
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
