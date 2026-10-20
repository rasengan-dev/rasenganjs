import { useMemo, useState } from 'react';
import { Link } from 'rasengan';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import LayerChip from '@/components/common/atoms/badges/layer-chip';
import { PACKAGES, type Layer } from '@/data/ecosystem';

/** Filter options of the registry. `all` shows every package. */
const FILTERS: Array<{ id: Layer | 'all'; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'rasengan', label: 'Frontend' },
  { id: 'futon', label: 'Runtime' },
  { id: 'server', label: 'Backend' },
  { id: 'tooling', label: 'Tooling' },
];

/**
 * Landing page package registry: every published package as one row with
 * its layer, status and a one-line description, filterable by layer. Rows
 * link to the package docs (or npm for packages without a docs page).
 */
export default function Ecosystem() {
  const [filter, setFilter] = useState<Layer | 'all'>('all');

  const rows = useMemo(
    () =>
      filter === 'all' ? PACKAGES : PACKAGES.filter((p) => p.layer === filter),
    [filter]
  );

  return (
    <section className="mx-auto max-w-[1200px] py-16 lg:py-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[620px]">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-foreground/50">
            Ecosystem
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-[-0.02em] text-foreground lg:text-4xl">
            {PACKAGES.length} packages, one registry
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/70">
            Every package is versioned in the same monorepo and usable on its
            own. Add what you need, when you need it.
          </p>
        </div>

        <div
          role="group"
          aria-label="Filter packages by layer"
          className="flex flex-wrap gap-1.5"
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ease-out',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                filter === f.id
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-foreground/70 hover:bg-muted hover:text-foreground'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-border">
        <div
          aria-hidden="true"
          className="hidden grid-cols-[240px_120px_minmax(0,1fr)_80px] gap-4 border-b border-border bg-muted/50 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-foreground/50 md:grid"
        >
          <span>Package</span>
          <span>Layer</span>
          <span>What it does</span>
          <span className="text-right">Status</span>
        </div>

        <ul>
          {rows.map((pkg) => {
            const external = pkg.href.startsWith('http');
            return (
              <li
                key={pkg.name}
                className="border-b border-border last:border-b-0"
              >
                <Link
                  to={pkg.href}
                  target={external ? '_blank' : undefined}
                  className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 px-5 py-3 text-sm transition-colors duration-150 hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none md:grid-cols-[240px_120px_minmax(0,1fr)_80px]"
                >
                  <span className="flex min-w-0 items-center gap-1.5 font-mono font-medium text-foreground">
                    <span className="truncate">{pkg.name}</span>
                    {external && (
                      <ArrowUpRight
                        size={12}
                        aria-hidden="true"
                        className="shrink-0 text-foreground/40"
                      />
                    )}
                  </span>
                  <span className="justify-self-end md:justify-self-start">
                    <LayerChip layer={pkg.layer} />
                  </span>
                  <span className="col-span-2 text-foreground/60 md:col-span-1">
                    {pkg.description}
                  </span>
                  <span
                    className={cn(
                      'hidden justify-self-end rounded-md border px-1.5 py-0.5 font-mono text-[10.5px] md:inline',
                      pkg.status === 'beta'
                        ? 'border-[color-mix(in_oklab,var(--layer-futon)_40%,transparent)] text-layer-futon'
                        : 'border-border text-foreground/60'
                    )}
                  >
                    {pkg.status}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6">
        <Link
          to="/packages"
          className="group inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Read the packages documentation
          <ArrowRight
            size={14}
            aria-hidden="true"
            className="transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
