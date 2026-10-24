import { Link } from 'rasengan';
import { ArrowRight } from 'lucide-react';
import CommandCopy from '@/components/common/molecules/command-copy';

type Props = {
  title?: string;
  description?: string;
};

/**
 * Closing call to action shared by the landing, skills, blog and showcase
 * pages. `create-rasengan` scaffolds either product: Rasengan (full-stack
 * React) or Rasengan Server (standalone backend), both shipping with Futon,
 * so the actions point to each product's docs rather than implying one is
 * added on top of the other.
 */
export default function CTA({
  title = 'One command, the app you need.',
  description = 'Scaffold a full-stack React app with Rasengan, or a standalone backend with Rasengan Server. Futon comes built in with both.',
}: Props) {
  return (
    <section className="mx-auto max-w-[1200px] pt-8 pb-16 lg:pt-12 lg:pb-24">
      <div className="relative overflow-hidden rounded-2xl border border-border px-6 py-12 sm:px-10 lg:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:36px_36px] opacity-50 [mask-image:linear-gradient(to_left,black,transparent_70%)]"
        />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[560px]">
            <h2 className="text-balance text-3xl font-bold tracking-[-0.02em] text-foreground lg:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/70">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-start lg:items-end">
            <CommandCopy command="npx create-rasengan@latest" />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/docs/getting-started/introduction"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors duration-200 ease-out hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Rasengan docs
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/docs/server/getting-started/introduction"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors duration-200 ease-out hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Rasengan Server docs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
