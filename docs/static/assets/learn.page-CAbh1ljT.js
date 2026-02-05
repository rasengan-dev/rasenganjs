import { j as e, C as t, L as a } from './vendor-CfbgIbdB.js';
import { B as s } from './shared-components-CkrC6jAk.js';
const r = '/assets/learn-loading-CNIhqUNH.gif',
  n = () =>
    e.jsxs('section', {
      className:
        'w-full h-(--hero-height) flex flex-col items-center justify-center',
      children: [
        e.jsx(t, {
          to: 'https://icons8.com/illustrations/author/7WmtYU90j36d',
          target: '_blank',
          children: e.jsx(a, {
            src: r,
            alt: 'Learn Rasengan.js loading gif',
            width: 'auto',
          }),
        }),
        e.jsx('h1', {
          className: 'text-[50px] leading-[45px] mb-2 text-center',
          children: 'Learn Rasengan.js',
        }),
        e.jsx('p', {
          className: 'text-center mt-2',
          children:
            'This is a work in progress. You can help us by contributing to the docs',
        }),
        e.jsxs('div', {
          className: 'flex flex-col md:flex-row items-center gap-2 mt-4',
          children: [
            e.jsx(t, {
              to: '/docs/getting-started/installation',
              children: e.jsx(s, {
                className:
                  'mt-4 w-full md:w-auto bg-primary text-primary-foreground',
                children: 'Read the Documentation',
              }),
            }),
            e.jsx(t, {
              to: '/packages',
              children: e.jsx(s, {
                className:
                  'mt-4 w-full md:w-auto bg-transparent border border-border text-foreground',
                children: 'Explore packages',
              }),
            }),
          ],
        }),
      ],
    });
n.metadata = {
  title: 'Rasengan.js - Learn',
  description: 'Learn how to use Rasengan.js',
};
export { n as default };
