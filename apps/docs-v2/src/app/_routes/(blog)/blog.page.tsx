import { PageComponent, Link } from 'rasengan';
import { useMemo, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import CTA from '@/components/common/molecules/cta';
import BlogCover from '@/components/common/molecules/blog-cover';
import PageHeader from '@/components/common/molecules/page-header';
import { useBlogStore } from '@/store/blog';
import type { BlogDataType } from '@/data/blog';

/** "August 15, 2026" → 2026. Dates are stored as display strings. */
const yearOf = (post: BlogDataType) => post.postedAt.split(', ')[1] ?? '';

/** "August 15, 2026" → "Aug 15". */
const shortDate = (post: BlogDataType) => {
  const [monthDay] = post.postedAt.split(', ');
  const [month, day] = monthDay.split(' ');
  return `${month.slice(0, 3)} ${day.padStart(2, '0')}`;
};

/** "Rasengan v1.2.0 - Introducing SSG Rendering mode" → "Introducing SSG Rendering mode". */
const subtitle = (post: BlogDataType) =>
  post.title.split(/ - |: /)[1] ?? post.title;

/** Posts grouped by year, newest year first, keeping the data order inside. */
function groupByYear(posts: BlogDataType[]) {
  const groups = new Map<string, BlogDataType[]>();
  for (const post of posts) {
    const year = yearOf(post);
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }
  return [...groups.entries()];
}

/** Small monospace tag naming the kind of post. */
function KindTag({ kind }: { kind: BlogDataType['kind'] }) {
  return (
    <span
      className={cn(
        'rounded-md border px-1.5 py-0.5 font-mono text-[10.5px]',
        kind === 'release' &&
          'border-[color-mix(in_oklab,var(--layer-rasengan)_40%,transparent)] text-layer-rasengan',
        kind === 'announcement' &&
          'border-[color-mix(in_oklab,var(--layer-server)_40%,transparent)] text-layer-server',
        kind === 'package' &&
          'border-[color-mix(in_oklab,var(--layer-futon)_40%,transparent)] text-layer-futon'
      )}
    >
      {kind}
    </span>
  );
}

/**
 * Blog index (Direction A).
 *
 * The newest post is featured with its own image (falling back to the
 * generated cover if it fails to load) next to a release
 * track (every release post, as a version timeline). Everything else is a
 * dense list grouped by year. Searching collapses the page into the
 * grouped list of matches.
 */
const Page: PageComponent = () => {
  const { blog: posts } = useBlogStore();
  const [query, setQuery] = useState('');
  const [featuredImageFailed, setFeaturedImageFailed] = useState(false);

  const q = query.trim().toLowerCase();
  const matches = useMemo(
    () =>
      q
        ? posts.filter(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q) ||
              (p.version ?? '').includes(q)
          )
        : posts,
    [posts, q]
  );

  const [featured, ...rest] = posts;
  const releases = posts.filter((p) => p.kind === 'release');
  const listed = q ? matches : rest;

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <PageHeader
        eyebrow="Blog"
        title="Releases, announcements and deep dives"
        description="What shipped, why it changed and how to upgrade, across every layer of the stack."
        aside={
          <div className="relative w-full lg:w-[300px]">
            <Search
              size={16}
              aria-hidden="true"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40"
            />
            <input
              id="blog-search"
              type="search"
              aria-label="Search posts"
              placeholder="Search posts or versions"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-foreground/40 transition-colors focus:border-primary/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            />
          </div>
        }
      />

      {!q && featured && (
        <section className="grid grid-cols-1 gap-10 border-b border-border pb-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <Link
            to={featured.link}
            className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            {featuredImageFailed ? (
              <BlogCover
                post={featured}
                className="transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-0.5"
              />
            ) : (
              <img
                src={featured.image}
                alt=""
                onError={() => setFeaturedImageFailed(true)}
                className="block aspect-[1540/1037] w-full rounded-xl border border-border object-cover transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-0.5"
              />
            )}
            <div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-xs text-foreground/50">
              <KindTag kind={featured.kind} />
              <span>{featured.postedAt}</span>
              <span>{featured.readingTime} read</span>
            </div>
            <h2 className="mt-3 text-balance text-2xl font-bold tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary lg:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 max-w-[60ch] leading-relaxed text-foreground/70">
              {featured.description.trim()}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Read the post
              <ArrowRight
                size={14}
                aria-hidden="true"
                className="transition-transform duration-200 motion-safe:group-hover:translate-x-1"
              />
            </span>
          </Link>

          <nav aria-label="Release track">
            <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-foreground/50">
              Release track
            </h2>
            <ol className="mt-5 grid gap-4 border-l border-border pl-5">
              {releases.map((post) => {
                const major = /^v\d+\.0\.0/.test(post.version ?? '');
                return (
                  <li key={post.id} className="relative">
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute -left-[26px] top-1.5 size-2.5 rounded-full border-2',
                        major
                          ? 'border-primary bg-primary'
                          : 'border-foreground/30 bg-background'
                      )}
                    />
                    <Link
                      to={post.link}
                      className="group grid gap-0.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <span className="font-mono text-[13px] font-medium text-foreground group-hover:text-primary">
                        {post.version}
                      </span>
                      <span className="text-sm text-foreground/50">
                        {shortDate(post)} {yearOf(post)} · {subtitle(post)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>
        </section>
      )}

      <section aria-label={q ? 'Search results' : 'All posts'} className="pb-8">
        {listed.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-foreground/60">
              No posts match “{query}”.
            </p>
            <p className="mt-1 text-sm text-foreground/40">
              Try a version number like 1.2 or a package name.
            </p>
          </div>
        ) : (
          groupByYear(listed).map(([year, yearPosts]) => (
            <div
              key={year}
              className="grid grid-cols-1 gap-2 border-b border-border py-6 last:border-b-0 md:grid-cols-[100px_minmax(0,1fr)] md:gap-8"
            >
              <h2 className="font-mono text-sm text-foreground/50">{year}</h2>
              <ul>
                {yearPosts.map((post) => (
                  <li
                    key={post.id}
                    className="border-b border-dashed border-border last:border-b-0"
                  >
                    <Link
                      to={post.link}
                      className="group grid grid-cols-1 gap-1 py-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6"
                    >
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2">
                          <KindTag kind={post.kind} />
                          <span className="font-semibold text-foreground transition-colors group-hover:text-primary">
                            {post.title}
                          </span>
                        </span>
                        <span className="mt-1 block text-sm text-foreground/60 sm:line-clamp-1">
                          {post.description.trim()}
                        </span>
                      </span>
                      <span className="font-mono text-xs text-foreground/50 sm:pt-1">
                        {shortDate(post)} · {post.readingTime}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>

      <CTA />
    </div>
  );
};

Page.metadata = {
  title: 'Rasengan.js - Blog',
  description:
    'Releases, announcements and deep dives from the Rasengan.js team.',
  openGraph: {
    title: 'Rasengan.js - Blog',
    description:
      'Releases, announcements and deep dives from the Rasengan.js team.',
    url: 'https://rasengan.dev/blog',
    image: 'https://rasengan.dev/assets/images/metadata/blog.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rasengan.js - Blog',
    description:
      'Releases, announcements and deep dives from the Rasengan.js team.',
    image: 'https://rasengan.dev/assets/images/metadata/blog.png',
  },
};

export default Page;
