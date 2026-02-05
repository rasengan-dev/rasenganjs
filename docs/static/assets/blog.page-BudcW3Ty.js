import { j as s } from './vendor-CfbgIbdB.js';
import {
  e as n,
  H as i,
  f as o,
  C as l,
} from './shared-components-CkrC6jAk.js';
const r = () => {
  const { blog: e } = n();
  return s.jsxs('section', {
    className: 'w-full h-full',
    children: [
      s.jsxs('section', {
        className:
          'grid-section relative px-4 xl:px-20 py-20 pt-40 overflow-x-hidden',
        children: [
          s.jsx(i, {
            title: 'Blog',
            description:
              'Insights, tips, and updates from the Rasengan.js community.',
          }),
          s.jsx('div', {
            className:
              'relative showcase-containe grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 z-20',
            children: e.map((a, t) => s.jsx(o, { post: a }, t)),
          }),
        ],
      }),
      s.jsx('section', {
        className: 'relative px-4 xl:px-20 py-20 pt-20',
        children: s.jsx(l, {}),
      }),
    ],
  });
};
r.metadata = {
  title: 'Rasengan.js - Blog',
  description: 'Discover the latest news and updates about Rasengan.js.',
  openGraph: {
    title: 'Rasengan.js - Blog',
    description: 'Discover the latest news and updates about Rasengan.js.',
    url: 'https://rasengan.dev',
    image: 'https://rasengan.dev/assets/images/metadata/blog.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rasengan.js - Blog',
    description: 'Discover the latest news and updates about Rasengan.js.',
    image: 'https://rasengan.dev/assets/images/metadata/blog.png',
  },
};
export { r as default };
