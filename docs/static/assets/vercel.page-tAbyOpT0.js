import { j as e, C as s } from './vendor-w5t4XTd4.js';
import { P as r } from './shared-components-DBceyN8p.js';
function a(o) {
  const n = { code: 'code', h1: 'h1', h2: 'h2', p: 'p', ...o.components };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        children: e.jsx(n.p, { children: 'CORE CONCEPTS' }),
      }),
      `
`,
      e.jsx(n.h1, { children: 'Deploying to Vercel' }),
      `
`,
      e.jsx(n.p, {
        children:
          'Vercel is a cloud platform for static sites and Serverless Functions that fits perfectly with Rasengan.js. It enables developers to host websites and web services that deploy instantly, scale automatically, and require no supervision, all with minimal configuration.',
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsx(n.p, {
        children:
          'In this guide, you will learn how to deploy a Rasengan.js app to Vercel.',
      }),
      `
`,
      e.jsx(n.h2, { children: 'Deploy' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'To deploy your Rasengan.js app to Vercel, you need to configure your project to use the ',
          e.jsx(n.code, { children: '@rasenganjs/vercel' }),
          ` adapter.
Have a look at the `,
          e.jsx(s, {
            to: '/packages/vercel',
            children: e.jsx(n.code, {
              children: 'Vercel adapter documentation',
            }),
          }),
          ' for more information.',
        ],
      }),
      `
`,
      e.jsx(r, {
        prev: {
          href: '/docs/configuring/modules-aliases',
          label: 'Modules Aliases',
        },
        next: {
          href: '/docs/deploying/node',
          label: 'Deploy to Node.js Server',
        },
      }),
    ],
  });
}
function t(o = {}) {
  const { wrapper: n } = o.components || {};
  return n ? e.jsx(n, { ...o, children: e.jsx(a, { ...o }) }) : a(o);
}
const l = {
    path: '/vercel',
    metadata: {
      title: 'Deploying to Vercel - Deploying | Core concepts | Rasengan.js',
      description: 'Deploy your Rasengan.js app to Vercel',
    },
  },
  c = [
    {
      title: 'Deploy',
      anchor: { id: 'deploy', text: 'Deploy' },
      level: 2,
      children: [],
    },
  ];
t.metadata = l;
t.toc = c;
t.type = 'MDXPageComponent';
export { t as default };
