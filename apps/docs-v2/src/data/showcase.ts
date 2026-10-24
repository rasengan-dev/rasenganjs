/** Kind of project, used by the showcase filters. */
export type ShowcaseCategory =
  'Site' | 'UI Library' | 'Marketplace' | 'Framework' | 'Tool' | 'Template';

export type ShowcaseProject = {
  title: string;
  /** Screenshot under /public. */
  image: string;
  link: string;
  category: ShowcaseCategory;
  /** One-line description, shown on the featured card. */
  summary?: string;
  /**
   * Rasengan packages the project uses, shown as chips. Only filled where it
   * is verified (e.g. from the project's package.json); leave it out
   * otherwise rather than guessing.
   */
  stack?: string[];
};

/**
 * Projects on the showcase page. The first entry is featured (large tile).
 * Moved out of showcase.page.tsx so other pages can reuse it.
 */
export const SHOWCASE: ShowcaseProject[] = [
  {
    title: 'Rasengan.js docs',
    image: '/assets/images/showcase/rasenganjs.png',
    link: 'https://rasengan.dev',
    category: 'Site',
    summary:
      'The site you are on: SSG documentation with MDX pages, Algolia search and a light/dark theme.',
    // From apps/docs-v2/package.json
    stack: [
      'rasengan',
      'mdx',
      'theme',
      'image',
      'kage-demo',
      'sitemap',
      'vercel',
    ],
  },
  {
    title: 'Rasengan UI',
    image: '/assets/images/showcase/rasengan-ui.png',
    link: 'https://ui.rasengan.dev',
    category: 'UI Library',
  },
  {
    title: 'Rasengan Hub',
    image: '/assets/images/showcase/rasengan-hub.png',
    link: 'https://hub.rasengan.dev',
    category: 'Marketplace',
  },
  {
    title: 'Chidori',
    image: '/assets/images/showcase/chidori.png',
    link: 'https://chidori.rasengan.dev',
    category: 'Framework',
  },
  {
    title: 'Nindo',
    image: '/assets/images/showcase/nindo.png',
    link: 'https://nindo.rasengan.dev',
    category: 'Framework',
  },
  {
    title: 'Chunin',
    image: '/assets/images/showcase/chunin.png',
    link: 'https://chunin.rasengan.dev',
    category: 'Tool',
  },
  {
    title: 'Kronix',
    image: '/assets/images/showcase/kronix.png',
    link: 'https://www.hub.rasengan.dev/templates/rh_saas-kronix',
    category: 'Template',
  },
  {
    title: 'Biccas',
    image: '/assets/images/showcase/biccas.png',
    link: 'https://www.hub.rasengan.dev/templates/rh_landing-biccas',
    category: 'Template',
  },
  {
    title: 'Enver',
    image: '/assets/images/showcase/enver.png',
    link: 'https://www.hub.rasengan.dev/templates/rh_landing-enver',
    category: 'Template',
  },
  {
    title: 'Rasengan',
    image: '/assets/images/showcase/rasengan.png',
    link: 'https://www.hub.rasengan.dev/templates/rh_saas-rasengan',
    category: 'Template',
  },
  {
    title: 'Hano',
    image: '/assets/images/showcase/hano.png',
    link: 'https://www.hub.rasengan.dev/templates/rh_saas-hano',
    category: 'Template',
  },
];

/** Where "Submit a project" points: a prefilled GitHub issue. */
export const SHOWCASE_SUBMIT_URL =
  'https://github.com/rasengan-dev/rasenganjs/issues/new?title=Showcase%3A%20';
