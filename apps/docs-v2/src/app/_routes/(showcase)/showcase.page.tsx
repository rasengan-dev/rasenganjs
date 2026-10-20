import { PageComponent } from 'rasengan';
import { useMemo, useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import Image from '@rasenganjs/image';
import { cn } from '@/lib/utils';
import CTA from '@/components/common/molecules/cta';
import PageHeader from '@/components/common/molecules/page-header';
import {
  SHOWCASE,
  SHOWCASE_SUBMIT_URL,
  type ShowcaseCategory,
  type ShowcaseProject,
} from '@/data/showcase';

/** Filter chips: "All" plus every category that has at least one project. */
const CATEGORIES: Array<ShowcaseCategory | 'All'> = [
  'All',
  ...Array.from(new Set(SHOWCASE.map((p) => p.category))),
];

/** "https://www.hub.rasengan.dev/templates/x" → "hub.rasengan.dev". */
const domainOf = (link: string) => new URL(link).hostname.replace(/^www\./, '');

/**
 * One showcase tile. `featured` makes it span two columns and two rows on
 * desktop and shows the summary and the verified package stack.
 */
function ProjectCard({
  project,
  featured,
}: {
  project: ShowcaseProject;
  featured?: boolean;
}) {
  return (
    <li className={cn(featured && 'sm:col-span-2 lg:row-span-2')}>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background transition-[border-color,box-shadow] duration-200 ease-out hover:border-primary/40 hover:shadow-[0_20px_40px_-28px_rgba(15,26,51,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div
          className={cn(
            'relative overflow-hidden border-b border-border bg-muted',
            featured
              ? 'aspect-[16/10] lg:aspect-auto lg:flex-1'
              : 'aspect-[16/10]'
          )}
        >
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            width="100%"
            height="100%"
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-col gap-2.5 p-4">
          <div className="flex items-baseline justify-between gap-3">
            <h2
              className={cn(
                'font-semibold text-foreground transition-colors group-hover:text-primary',
                featured && 'text-lg'
              )}
            >
              {project.title}
            </h2>
            <span className="flex shrink-0 items-center gap-1 font-mono text-[11px] text-foreground/50">
              {domainOf(project.link)}
              <ArrowUpRight size={12} aria-hidden="true" />
            </span>
          </div>

          {featured && project.summary && (
            <p className="text-sm leading-relaxed text-foreground/70">
              {project.summary}
            </p>
          )}

          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10.5px] text-foreground/60">
              {project.category.toLowerCase()}
            </span>
            {project.stack?.map((pkg) => (
              <span
                key={pkg}
                className={cn(
                  'rounded-md border px-1.5 py-0.5 font-mono text-[10.5px]',
                  pkg === 'rasengan'
                    ? 'border-[color-mix(in_oklab,var(--layer-rasengan)_40%,transparent)] text-layer-rasengan'
                    : 'border-border text-foreground/60'
                )}
              >
                {pkg}
              </span>
            ))}
          </div>
        </div>
      </a>
    </li>
  );
}

/**
 * Showcase (Direction A): a bento grid with the first project featured,
 * category filters with counts, and a link to submit a project.
 */
const Page: PageComponent = () => {
  const [category, setCategory] = useState<ShowcaseCategory | 'All'>('All');

  const projects = useMemo(
    () =>
      category === 'All'
        ? SHOWCASE
        : SHOWCASE.filter((p) => p.category === category),
    [category]
  );

  const countOf = (c: ShowcaseCategory | 'All') =>
    c === 'All'
      ? SHOWCASE.length
      : SHOWCASE.filter((p) => p.category === c).length;

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <PageHeader
        eyebrow="Showcase"
        title="Built with Rasengan.js"
        description="Sites, frameworks and templates running on Rasengan in production."
        aside={
          <a
            href={SHOWCASE_SUBMIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors duration-200 ease-out hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Plus size={16} aria-hidden="true" />
            Submit a project
          </a>
        }
      />

      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-1.5"
      >
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
            className={cn(
              'flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ease-out',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              category === c
                ? 'border-foreground bg-foreground text-background'
                : 'border-border text-foreground/70 hover:bg-muted hover:text-foreground'
            )}
          >
            {c}
            <span
              className={cn(
                'font-mono text-xs',
                category === c ? 'text-background/60' : 'text-foreground/40'
              )}
            >
              {countOf(c)}
            </span>
          </button>
        ))}
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-5 pb-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            featured={category === 'All' && index === 0}
          />
        ))}
      </ul>

      <CTA
        title="Built something with Rasengan?"
        description="Open an issue with a link and a screenshot and we will add it to the showcase."
      />
    </div>
  );
};

Page.metadata = {
  title: 'Rasengan.js - Showcase',
  description: 'Sites, frameworks and templates built with Rasengan.js.',
  openGraph: {
    title: 'Rasengan.js - Showcase',
    description: 'Sites, frameworks and templates built with Rasengan.js.',
    url: 'https://rasengan.dev/showcase',
    image: 'https://rasengan.dev/assets/images/metadata/showcase.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rasengan.js - Showcase',
    description: 'Sites, frameworks and templates built with Rasengan.js.',
    image: 'https://rasengan.dev/assets/images/metadata/showcase.png',
  },
};

export default Page;
