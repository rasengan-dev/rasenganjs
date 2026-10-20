import { Link } from 'rasengan';
import { ArrowRight } from 'lucide-react';
import FutonEngine from '@/components/home/futon-engine';
import CommandCopy from '@/components/common/molecules/command-copy';

/**
 * Landing hero (Direction A, "Layered Stack").
 *
 * Left: the pitch, the primary action and the copyable install command.
 * Right: the Futon engine animation (files from a Rasengan app and a
 * Rasengan Server app falling into Futon, which runs them on three
 * runtimes). A faint blueprint grid sits behind both columns.
 */
export default function Hero() {
  return (
    <section className="relative -mx-4 overflow-hidden border-b border-border px-4 py-16 lg:-mx-8 lg:px-8 lg:py-24">
      {/* Blueprint grid, faded out toward the bottom so it never fights the text. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <Link
            to="/blog/rasengan-2-beta"
            className="group mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background py-1 pl-1 pr-3 text-xs font-medium text-foreground/70 transition-colors duration-200 ease-out hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="rounded-full bg-foreground px-2 py-0.5 text-[10.5px] font-semibold text-background">
              2.0 beta
            </span>
            <span>A new foundation, powered by Futon</span>
            <ArrowRight
              size={13}
              aria-hidden="true"
              className="transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-0.5"
            />
          </Link>

          <h1 className="text-balance text-[clamp(2.4rem,5vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-foreground">
            One stack, from the{' '}
            <span className="text-layer-rasengan">React page</span> to the
            WebSocket.
          </h1>

          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-foreground/70">
            Rasengan.js pairs a modern React meta-framework with Futon and
            Rasengan Server. One ecosystem covering every layer of your stack,
            from rendering to WebSockets.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/docs/getting-started/introduction"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors duration-200 ease-out hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Get started
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1"
              />
            </Link>
            <CommandCopy command="npx create-rasengan@latest" />
          </div>
        </div>

        <div className="min-w-0">
          <FutonEngine />
        </div>
      </div>
    </section>
  );
}
