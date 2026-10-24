import { useEffect, useRef, useState } from 'react';
import { Link } from 'rasengan';
import { cn } from '@/lib/utils';

// "Two apps, one engine": the landing hero animation.
//
// An isometric scene modelled on vite.dev's hero (which is a Rive canvas).
// Source files fall, one after another, into a central Futon plate. The
// stream alternates between a Rasengan app's files and a Rasengan Server
// app's files: both products ship with Futon inside, but they are
// independent, so their files never fall together. Each time a file lands,
// Futon lights up the three runtime tiles it runs on.
//
// How it is built:
// - Pure CSS 3D, no canvas or extra dependency. A zero-size "floor" point is
//   placed at the engine's center and tilted into true isometric projection
//   with `rotateX(54.7356deg) rotateZ(-45deg)`; everything on it is placed
//   with plane coordinates (u, v) and lifted with `translateZ`.
// - Proportions match vite.dev's animation, measured from its canvas
//   (620 x 608 px at a 700 px column): engine plate 46% of the width, one
//   plate level every 20% of the width, engine center at 66.6% of
//   the height.
// - Every size is in `cqw`, so the scene scales with its column.
// - Labels lie flat on their plate, in the plane like vite.dev's. Font
//   sizes are chosen so the longest label fits inside its plate (see
//   PlateLabel).
// - One `step` counter drives the loop. Each plate's height and opacity come
//   from its distance to `step`; CSS transitions do the motion.
// - The first frame is server-rendered, so the scene is complete without
//   JavaScript. The loop pauses on hover/focus, off-screen and in background
//   tabs, and never starts under `prefers-reduced-motion`.

// ── Data ─────────────────────────────────────────────────────

type App = 'rasengan' | 'server';

/** Layer color and docs entry of each app. */
const APPS: Record<App, { name: string; color: string; href: string }> = {
  rasengan: {
    name: 'Rasengan app',
    color: 'var(--layer-rasengan)',
    href: '/docs/getting-started/introduction',
  },
  server: {
    name: 'Rasengan Server app',
    color: 'var(--layer-server)',
    href: '/docs/server/getting-started/introduction',
  },
};

/** Files dropped into Futon, in loop order: one Rasengan app, then one Server app. */
const FILES: Array<{ name: string; app: App }> = [
  { name: 'index.page.tsx', app: 'rasengan' },
  { name: 'layout.tsx', app: 'rasengan' },
  { name: 'post.page.mdx', app: 'rasengan' },
  { name: 'rasengan.config.js', app: 'rasengan' },
  { name: 'app.module.ts', app: 'server' },
  { name: 'users.controller.ts', app: 'server' },
  { name: 'chat.gateway.ts', app: 'server' },
  { name: 'rasengan.server.ts', app: 'server' },
];

const fileAt = (index: number) =>
  FILES[((index % FILES.length) + FILES.length) % FILES.length];

// ── Geometry (all in cqw) ────────────────────────────────────

/** Side of the engine plate and of the falling file plates. */
const PLATE = 32.5;
/** Thickness of the engine plate. */
const ENGINE_DEPTH = 5;
/** Side and thickness of the runtime tiles (larger than vite.dev's 8.1cqw, so runtime names stay readable). */
const TILE = 13;
const TILE_DEPTH = 3.2;
/** Height between two plate levels. */
const LEVEL = 24.5;

/**
 * Runtime tiles in plane coordinates, at the middle of three edges like
 * vite.dev's output tiles: (0,-38) reads as upper-left on screen, (-38,0)
 * as lower-left and (0,38) as lower-right.
 */
const RUNTIMES = [
  { name: 'Node.js', color: 'var(--runtime-node)', u: 0, v: -38 },
  { name: 'Bun', color: 'var(--runtime-bun)', u: -38, v: 0 },
  { name: 'Workerd', color: 'var(--runtime-workerd)', u: 0, v: 38 },
];

/**
 * Plate states by distance to the current step: 0 has just merged into
 * Futon, 1 and 2 hang in the air, 3 is the spawn slot above the scene.
 */
const SLOTS = [
  { z: 0.5, opacity: 0, accent: 1 },
  { z: LEVEL, opacity: 1, accent: 1 },
  { z: LEVEL * 2, opacity: 0.6, accent: 0.2 },
  { z: LEVEL * 3, opacity: 0, accent: 0 },
];

const STEP_MS = 1500;

// ── Loop ─────────────────────────────────────────────────────

/**
 * Advances `step` every STEP_MS while the scene is visible, the tab is in
 * the foreground, nothing is hovered or focused, and the user has not asked
 * for reduced motion.
 */
function useLoop(
  sceneRef: React.RefObject<HTMLDivElement | null>,
  paused: boolean
) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setAllowed(!media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [sceneRef]);

  useEffect(() => {
    if (!allowed || !visible || paused) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') setStep((s) => s + 1);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [allowed, visible, paused]);

  return step;
}

// ── Scene pieces ─────────────────────────────────────────────

/** Places a square of side `size`, centered on plane point (u, v), at height z. */
const onPlane = (
  u: number,
  v: number,
  size: number,
  z = 0
): React.CSSProperties => ({
  position: 'absolute',
  left: `${u - size / 2}cqw`,
  top: `${v - size / 2}cqw`,
  width: `${size}cqw`,
  height: `${size}cqw`,
  transform: `translateZ(${z}cqw)`,
  transformStyle: 'preserve-3d',
});

/**
 * Text lying flat on a plate, in the plate's own plane.
 *
 * `edge` puts it along the plate's bottom edge (the lower-left edge on
 * screen, where vite.dev puts its file names); `center` centers it. Width is
 * capped to the plate's inner width (7% margins) so a label never spills
 * out; font sizes at the call sites are picked so the longest label fits
 * without hitting that cap:
 * - file plates: 19 chars ("users.controller.ts") x ~0.6em <= 86% of 32.5cqw
 * - runtime tiles: 7 chars ("Workerd") x ~0.6em <= 86% of 13cqw
 */
function PlateLabel({
  children,
  placement = 'center',
  className,
  style,
}: {
  children: React.ReactNode;
  placement?: 'center' | 'edge';
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={style}
      className={cn(
        'absolute max-w-[86%] overflow-hidden text-ellipsis whitespace-nowrap font-mono leading-none',
        placement === 'center'
          ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
          : 'bottom-[7%] left-[7%]',
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * A solid-looking slab: stacked outlines give it a visible thickness at the
 * isometric angle, with the top face on the last layer.
 */
function Slab({
  color,
  layers,
  depth,
  children,
  className,
}: {
  color: string;
  layers: number;
  /** Total thickness, cqw. */
  depth: number;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      {Array.from({ length: layers }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            transform: `translateZ(${(-depth * (layers - 1 - i)) / (layers - 1)}cqw)`,
            borderColor: `color-mix(in oklab, ${color} ${40 + (60 * i) / layers}%, transparent)`,
            backgroundColor:
              i === 0
                ? `color-mix(in oklab, ${color} 55%, transparent)`
                : undefined,
            boxShadow: i === 0 ? `0 0 5cqw -1cqw ${color}` : undefined,
          }}
          className="absolute inset-0 rounded-[1.6cqw] border transition-[border-color,background-color,box-shadow] duration-700"
        />
      ))}
      <span
        style={{ borderColor: color }}
        className={cn(
          'absolute inset-0 rounded-[1.6cqw] border bg-background transition-[border-color] duration-700',
          className
        )}
      >
        {children}
      </span>
    </>
  );
}

/** Thin falling plate for one source file. */
function FilePlate({ index, step }: { index: number; step: number }) {
  const file = fileAt(index);
  const slot = SLOTS[index - step] ?? SLOTS[SLOTS.length - 1];
  const app = APPS[file.app];
  // Far plates are neutral, near ones take their app color (like vite.dev).
  const border = `color-mix(in oklab, ${app.color} ${Math.round(slot.accent * 100)}%, color-mix(in oklab, var(--foreground) 30%, transparent))`;
  const interactive = slot.opacity > 0.4;

  return (
    <Link
      to={app.href}
      tabIndex={interactive ? 0 : -1}
      aria-label={`${file.name}, part of a ${app.name}. Open the docs`}
      style={{
        ...onPlane(0, 0, PLATE, slot.z),
        opacity: slot.opacity,
        pointerEvents: interactive ? 'auto' : 'none',
      }}
      className="group transition-[transform,opacity] duration-[1200ms] ease-[cubic-bezier(.6,0,.3,1)] motion-reduce:transition-none focus-visible:outline-none"
    >
      <span
        style={{ borderColor: border }}
        className="absolute inset-0 rounded-[1.6cqw] border-[1.5px] bg-background/75 transition-colors duration-700 group-focus-visible:ring-2 group-focus-visible:ring-primary"
      >
        {/* Sits toward the screen-bottom corner of the plate, like vite.dev. */}
        <PlateLabel
          placement="edge"
          style={{ color: border }}
          className="text-[2.2cqw] font-semibold transition-colors duration-700"
        >
          {file.name}
        </PlateLabel>
      </span>
    </Link>
  );
}

// ── Scene ────────────────────────────────────────────────────

export default function FutonEngine() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const step = useLoop(sceneRef, paused);

  // Futon takes the color of the app whose file landed last.
  const current = fileAt(step).app;
  const accent = APPS[current].color;
  const indices = Array.from({ length: SLOTS.length }, (_, i) => step + i);

  return (
    <div className="grid gap-4">
      <div
        ref={sceneRef}
        role="group"
        aria-label="Animation: files from a Rasengan app and a Rasengan Server app fall into Futon, which runs them on Node.js, Bun and Workerd"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="relative aspect-[641/629] w-full [container-type:inline-size]"
      >
        {/* soft glow under the engine, in the current app color */}
        <div
          aria-hidden="true"
          style={{
            background: `radial-gradient(closest-side, color-mix(in oklab, ${accent} 22%, transparent), transparent)`,
          }}
          className="pointer-events-none absolute left-1/2 top-[66.6%] h-[50%] w-[95%] -translate-x-1/2 -translate-y-1/2 transition-[background] duration-700"
        />

        {/* The floor: a zero-size point at the engine center, tilted to isometric. */}
        <div
          style={{
            transform: 'rotateX(54.7356deg) rotateZ(-45deg)',
            transformStyle: 'preserve-3d',
          }}
          className="absolute left-1/2 top-[66.6%] size-0"
        >
          {/* wires from Futon to each runtime; a dash runs on every landing */}
          <svg
            viewBox="-50 -50 100 100"
            aria-hidden="true"
            style={{
              left: '-50cqw',
              top: '-50cqw',
              width: '100cqw',
              height: '100cqw',
            }}
            className="absolute overflow-visible"
          >
            {RUNTIMES.map((r) => (
              <g key={r.name}>
                <line
                  x1={0}
                  y1={0}
                  x2={r.u}
                  y2={r.v}
                  stroke="var(--border)"
                  strokeWidth={0.3}
                />
                <line
                  key={step}
                  x1={0}
                  y1={0}
                  x2={r.u}
                  y2={r.v}
                  stroke={r.color}
                  strokeWidth={0.5}
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="0.2 1"
                  className="motion-safe:animate-[engine-wire_900ms_ease-out_both] motion-reduce:hidden"
                  style={{ animationDelay: step === 0 ? '0ms' : '700ms' }}
                />
              </g>
            ))}
          </svg>

          {/* runtime tiles */}
          {RUNTIMES.map((r) => (
            <Link
              key={r.name}
              to="/docs/futon/adapters/runtime"
              aria-label={`Futon on ${r.name}: runtime adapters docs`}
              style={onPlane(r.u, r.v, TILE, TILE_DEPTH)}
              className="group focus-visible:outline-none"
            >
              <Slab
                color={r.color}
                layers={4}
                depth={TILE_DEPTH}
                className="group-focus-visible:ring-2 group-focus-visible:ring-primary"
              >
                <span
                  key={step}
                  aria-hidden="true"
                  style={{
                    backgroundColor: r.color,
                    animationDelay: step === 0 ? '0ms' : '1100ms',
                  }}
                  className="absolute inset-0 rounded-[1.6cqw] opacity-0 motion-safe:animate-[engine-flash_700ms_ease-out_both]"
                />
                <PlateLabel className="text-[2.2cqw] font-semibold text-foreground/85">
                  {r.name}
                </PlateLabel>
              </Slab>
            </Link>
          ))}

          {/* Futon: the engine */}
          <Link
            to="/docs/futon/getting-started/introduction"
            aria-label="Futon, the HTTP runtime inside every Rasengan and Rasengan Server app: open the docs"
            style={onPlane(0, 0, PLATE, ENGINE_DEPTH)}
            className="group focus-visible:outline-none"
          >
            <Slab
              color={accent}
              layers={8}
              depth={ENGINE_DEPTH}
              className="group-focus-visible:ring-2 group-focus-visible:ring-primary"
            >
              {/* landing pulse */}
              <span
                key={step}
                aria-hidden="true"
                style={{
                  boxShadow: `inset 0 0 6cqw -1cqw ${accent}`,
                  animationDelay: step === 0 ? '0ms' : '800ms',
                }}
                className="absolute inset-0 rounded-[1.6cqw] opacity-0 motion-safe:animate-[engine-flash_800ms_ease-out_both]"
              />
              {/* spinning ring, like the die of a chip */}
              <span
                aria-hidden="true"
                style={{ borderTopColor: accent, borderRightColor: accent }}
                className="absolute left-1/2 top-1/2 size-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.5cqw] border-transparent transition-colors duration-700 motion-safe:animate-[spin_3s_linear_infinite]"
              />
              <PlateLabel className="text-[4.4cqw] font-bold tracking-tight text-foreground">
                futon
              </PlateLabel>
              <PlateLabel
                placement="edge"
                style={{ color: accent }}
                className="text-[1.8cqw] font-medium uppercase tracking-[0.15em] transition-colors duration-700"
              >
                core
              </PlateLabel>
            </Slab>
          </Link>

          {/* falling source files */}
          {indices.map((index) => (
            <FilePlate key={index} index={index} step={step} />
          ))}
        </div>
      </div>

      {/* Caption: which app is being fed, and the shared message. */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-center text-sm">
        {(Object.keys(APPS) as App[]).map((key) => (
          <span
            key={key}
            style={{ '--c': APPS[key].color } as React.CSSProperties}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs transition-colors duration-500',
              current === key
                ? 'border-[color-mix(in_oklab,var(--c)_45%,transparent)] bg-[color-mix(in_oklab,var(--c)_10%,transparent)] text-[var(--c)]'
                : 'border-border text-foreground/45'
            )}
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-[var(--c)]"
            />
            {APPS[key].name}
          </span>
        ))}
        <span className="w-full text-xs text-foreground/50">
          Futon comes inside both. Your app runs on Node.js, Bun or Workerd.
        </span>
      </div>
    </div>
  );
}
