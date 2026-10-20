import { Link } from 'rasengan';
import { ArrowUpRight } from 'lucide-react';
import { PRODUCTS, TOOLS } from '@/data/ecosystem';

/**
 * "From empty folder to production": the CLI entry points of the ecosystem,
 * followed by a band of first-party products built on Rasengan.
 */
export default function Tooling() {
  return (
    <section className="mx-auto max-w-[1200px] py-16 lg:py-24">
      <div className="max-w-[620px]">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-foreground/50">
          Tooling
        </p>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-[-0.02em] text-foreground lg:text-4xl">
          From empty folder to production
        </h2>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TOOLS.map((tool) => (
          <li key={tool.command}>
            <Link
              to={tool.href}
              target={tool.href.startsWith('http') ? '_blank' : undefined}
              className="flex h-full flex-col gap-2 rounded-xl border border-border bg-background p-5 transition-colors duration-200 ease-out hover:border-primary/40 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <code className="font-mono text-[13px] font-medium text-foreground">
                <span aria-hidden="true" className="text-foreground/40">
                  ${' '}
                </span>
                {tool.command}
              </code>
              <p className="text-sm leading-relaxed text-foreground/60">
                {tool.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-foreground/50">
          Built on Rasengan
        </p>
        <ul className="mt-4 grid grid-cols-2 overflow-hidden rounded-xl border border-border sm:grid-cols-3 lg:grid-cols-5">
          {PRODUCTS.map((product) => (
            <li
              key={product.name}
              className="-mb-px -mr-px border-b border-r border-border"
            >
              <a
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col gap-1 p-5 transition-colors duration-200 ease-out hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none"
              >
                <span className="flex items-center gap-1.5 font-semibold text-foreground">
                  {product.name}
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                    className="text-foreground/40 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
                <span className="text-sm text-foreground/50">
                  {product.kind}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
