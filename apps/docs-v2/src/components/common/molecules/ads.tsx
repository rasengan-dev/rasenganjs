import type { ComponentType } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  HiraishipIllustration,
  RasenganUIIllustration,
} from './ads-illustrations';

type Ad = {
  name: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  badge?: string;
  Illustration: ComponentType;
};

/** First-party products promoted on every docs page. */
const ADS: Ad[] = [
  {
    name: 'Rasengan UI',
    title: 'Rasengan UI, redesigned',
    description:
      '44 components on Base UI and Tailwind, themed by villages you switch at runtime.',
    cta: 'Browse components',
    href: 'https://ui.rasengan.dev',
    badge: 'New',
    Illustration: RasenganUIIllustration,
  },
  {
    name: 'Hiraiship',
    title: 'Deploy on Hiraiship',
    description:
      'Ship your Rasengan.js app to the edge in one command, with instant rollback and custom domains.',
    cta: 'Start deploying',
    href: 'https://hiraiship.com',
    Illustration: HiraishipIllustration,
  },
];

function AdCard({ ad }: { ad: Ad }) {
  const { title, description, cta, href, badge, Illustration } = ad;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-foreground transition-colors duration-200 ease-out hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="h-[120px] border-b border-border">
        <Illustration />
      </div>

      <div className="flex flex-col gap-1.5 p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          {title}
          {badge && (
            <span className="rounded-full bg-primary px-1.5 py-px text-[10px] font-semibold text-primary-foreground">
              {badge}
            </span>
          )}
        </h3>

        <p className="text-pretty text-[13px] leading-relaxed text-foreground/70">
          {description}
        </p>

        <span className="mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-primary">
          {cta}
          <ArrowUpRight
            size={14}
            aria-hidden="true"
            className="transition-transform duration-200 ease-out motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </a>
  );
}

/**
 * The ads shown on every docs page: under the table of contents on wide
 * screens, at the end of the page below that (where the table of contents is
 * hidden). The caller sets the layout through `className`.
 */
export function AdsCards({ className }: { className?: string }) {
  return (
    <aside aria-label="From the Rasengan ecosystem" className={cn(className)}>
      {ADS.map((ad) => (
        <AdCard key={ad.name} ad={ad} />
      ))}
    </aside>
  );
}
