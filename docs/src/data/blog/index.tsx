import { Author, Authors, AuthorUsernames } from './authors';

export type BlogDataType = {
  id: number;
  title: string;
  description: string;
  authors: Array<Author>;
  postedAt: string;
  link: string;
  image: string;
};

export const BlogData: Array<BlogDataType> = [
  {
    id: 1,
    title: 'Rasengan 1.0.0 Beta',
    description: `
      We are launching the first beta version of Rasengan.js, a modern React Framework that you can use to create high-quality web applications.
    `,
    authors: [Authors[AuthorUsernames.dilaneKombou]],
    postedAt: 'April 25, 2024',
    link: '/blog/rasengan-1-beta',
    image: '/assets/blog/rasengan-beta1.png',
  },
  {
    id: 1,
    title: 'Rasengan v1 Stable',
    description: `
      Rasengan v1 is now stable and ready for production use. This release includes a lot of new features and code base improvements.
    `,
    authors: [Authors[AuthorUsernames.dilaneKombou]],
    postedAt: 'April 26, 2025',
    link: '/blog/rasengan-v1-stable',
    image: '/assets/blog/rasengan-stable1.png',
  },
];
