import { randomId } from '@/utils';
import { Author, Authors, AuthorUsernames } from './authors';

export type BlogDataType = {
  id: number;
  title: string;
  description: string;
  authors: Array<Author>;
  postedAt: string;
  link: string;
  image: string;
  readingTime: string;
};

export const BlogData: Array<BlogDataType> = [
  {
    id: randomId(),
    title: 'Rasengan v1.2.0 - Introducing SSG Rendering mode',
    description: `
      We are publishing Rasengan v1.2.0, a new version of the framework that introduces you the SSG rendering mode.
    `,
    authors: [Authors[AuthorUsernames.dilaneKombou]],
    postedAt: 'January 02, 2026',
    link: '/blog/rasengan-v1-2-0',
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
    image: '/assets/blog/rasengan-beta1.png',
    readingTime: '3 min',
  },
];
