import { randomId } from '@/utils';
import { Author, Authors, AuthorUsernames } from './authors';
import type { Layer } from '@/data/ecosystem';

/** What a post is about; drives its tag and whether it joins the release track. */
export type BlogKind = 'release' | 'announcement' | 'package';

export type BlogDataType = {
  id: number;
  title: string;
  description: string;
  authors: Array<Author>;
  postedAt: string;
  link: string;
  /** Social / legacy image. The blog index renders a generated cover instead. */
  image: string;
  readingTime: string;
  kind: BlogKind;
  /** Released version, for `release` posts. Shown on the release track. */
  version?: string;
  /** Generated cover: big label and the layer colors drawn as bars. */
  cover: { label: string; layers: Layer[] };
};

export const BlogData: Array<BlogDataType> = [
  {
    id: randomId(),
    title: 'Rasengan 2.0 Beta: A New Foundation',
    description: `
      Rasengan v2.0.0 beta is here: a Futon-powered core, colocated API routes, a Cloudflare Workers adapter, automatic sitemap generation, and a cleaner environment variable story.
    `,
    authors: [Authors[AuthorUsernames.dilaneKombou]],
    postedAt: 'August 15, 2026',
    link: '/blog/rasengan-2-beta',
    kind: 'release',
    version: 'v2.0.0-beta',
    cover: { label: '2.0 beta', layers: ['rasengan', 'futon'] },
    image: '/assets/blog/rasengan-2-beta.png',
    readingTime: '8 min',
  },
  {
    id: randomId(),
    title: 'Introducing Futon and Rasengan Server',
    description: `
      Rasengan.js grows beyond the frontend. Meet Futon, a WinterCG-compatible HTTP runtime, and Rasengan Server, a NestJS-inspired backend framework built on top of it.
    `,
    authors: [Authors[AuthorUsernames.dilaneKombou]],
    postedAt: 'August 1, 2026',
    link: '/blog/rasengan-futon-and-server',
    kind: 'announcement',
    cover: { label: 'Futon + Server', layers: ['futon', 'server'] },
    image: '/assets/blog/rasengan-futon-and-server.png',
    readingTime: '6 min',
  },
  {
    id: randomId(),
    title: '@rasenganjs/i18n Stable & Introducing @rasenganjs/io',
    description: `
      We are excited to announce the stable release of @rasenganjs/i18n and introduce @rasenganjs/io, a new real-time communication package for Rasengan.js.
    `,
    authors: [Authors[AuthorUsernames.dilaneKombou]],
    postedAt: 'June 11, 2026',
    link: '/blog/rasengan-i18n-stable-and-io',
    kind: 'package',
    cover: { label: 'i18n + io', layers: ['rasengan'] },
    image: '/assets/blog/rasengan-i18n-io.png',
    readingTime: '3 min',
  },
  {
    id: randomId(),
    title: 'Rasengan v1.2.2 - Error overlay, LLM support & agent skills',
    description: `
      We are publishing Rasengan v1.2.2, a new version of the framework that introduces a developer-friendly error overlay, LLM support files, and agent skills for AI-powered development.
    `,
    authors: [Authors[AuthorUsernames.dilaneKombou]],
    postedAt: 'June 01, 2026',
    link: '/blog/rasengan-v1-2-2',
    kind: 'release',
    version: 'v1.2.2',
    cover: { label: '1.2.2', layers: ['rasengan'] },
    image: '/assets/blog/rasengan-1.2.2.png',
    readingTime: '4 min',
  },
  {
    id: randomId(),
    title: 'Rasengan v1.2.1 - Introducing custom MDX components',
    description: `
      We are publishing Rasengan v1.2.1, a new version of the framework that introduces you custom MDX components.
    `,
    authors: [Authors[AuthorUsernames.dilaneKombou]],
    postedAt: 'April 04, 2026',
    link: '/blog/rasengan-v1-2-1',
    kind: 'release',
    version: 'v1.2.1',
    cover: { label: '1.2.1', layers: ['rasengan'] },
    image: '/assets/blog/rasengan-1.2.1.png',
    readingTime: '3 min',
  },
  {
    id: randomId(),
    title: 'Rasengan v1.2.0 - Introducing SSG Rendering mode',
    description: `
      We are publishing Rasengan v1.2.0, a new version of the framework that introduces you the SSG rendering mode.
    `,
    authors: [Authors[AuthorUsernames.dilaneKombou]],
    postedAt: 'January 03, 2026',
    link: '/blog/rasengan-v1-2-0',
    kind: 'release',
    version: 'v1.2.0',
    cover: { label: '1.2.0', layers: ['rasengan'] },
    image: '/assets/blog/rasengan-1.2.0.png',
    readingTime: '5 min',
  },
  {
    id: randomId(),
    title: 'Rasengan v1.1.3 - Introducing ScrollRestoration',
    description: `
      We are publishing Rasengan v1.1.3, a new version of the framework that introduces you the ScrollRestoration component.
    `,
    authors: [Authors[AuthorUsernames.dilaneKombou]],
    postedAt: 'August 30, 2025',
    link: '/blog/rasengan-v1-1-3',
    kind: 'release',
    version: 'v1.1.3',
    cover: { label: '1.1.3', layers: ['rasengan'] },
    image: '/assets/blog/rasengan-1.1.3.png',
    readingTime: '2 min',
  },
  {
    id: randomId(),
    title: 'Rasengan v1.1.0 - Introducing file-based routing',
    description: `
      We are publishing Rasengan v1.1.0, a new version of the framework that introduces you the file-based routing feature.
    `,
    authors: [Authors[AuthorUsernames.dilaneKombou]],
    postedAt: 'August 16, 2025',
    link: '/blog/rasengan-v1-1-0',
    kind: 'release',
    version: 'v1.1.0',
    cover: { label: '1.1.0', layers: ['rasengan'] },
    image: '/assets/blog/rasengan-1.1.0.png',
    readingTime: '3 min',
  },
  {
    id: randomId(),
    title: 'Rasengan v1 Stable',
    description: `
      Rasengan v1 is now stable and ready for production use. This release includes a lot of new features and code base improvements.
    `,
    authors: [Authors[AuthorUsernames.dilaneKombou]],
    postedAt: 'April 26, 2025',
    link: '/blog/rasengan-v1-stable',
    kind: 'release',
    version: 'v1.0.0',
    cover: { label: '1.0', layers: ['rasengan'] },
    image: '/assets/blog/rasengan-stable1.png',
    readingTime: '5 min',
  },
  {
    id: randomId(),
    title: 'Rasengan 1.0.0 Beta',
    description: `
      We are launching the first beta version of Rasengan.js, a modern React Framework that you can use to create high-quality web applications.
    `,
    authors: [Authors[AuthorUsernames.dilaneKombou]],
    postedAt: 'April 25, 2024',
    link: '/blog/rasengan-1-beta',
    kind: 'release',
    version: 'v1.0.0-beta',
    cover: { label: '1.0 beta', layers: ['rasengan'] },
    image: '/assets/blog/rasengan-beta1.png',
    readingTime: '3 min',
  },
];
