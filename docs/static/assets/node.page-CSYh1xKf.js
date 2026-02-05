import { j as e, C as r } from './vendor-CfbgIbdB.js';
import { P as s } from './shared-components-CkrC6jAk.js';
function a(n) {
  const o = { code: 'code', h1: 'h1', h2: 'h2', p: 'p', ...n.components };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        children: e.jsx(o.p, { children: 'CORE CONCEPTS' }),
      }),
      `
`,
      e.jsx(o.h1, { children: 'Deploying to Node.js Server' }),
      `
`,
      e.jsx(o.p, {
        children:
          'Rasengan.js is a framework for building web applications using React. It is designed to be used with Node.js.',
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsx(o.p, {
        children:
          'In this guide, you will learn how to deploy a Rasengan.js app to a Node Server.',
      }),
      `
`,
      e.jsx(o.h2, { children: 'Deploy' }),
      `
`,
      e.jsxs(o.p, {
        children: [
          'To deploy your Rasengan.js app to a Node.js server, you need to configure your project to use the ',
          e.jsx(o.code, { children: '@rasenganjs/serve' }),
          ` adapter.
Have a look at the `,
          e.jsx(r, {
            to: '/packages/serve',
            children: e.jsx(o.code, { children: 'Node adapter documentation' }),
          }),
          ' for more information.',
        ],
      }),
      `
`,
      e.jsx(s, {
        prev: { href: '/docs/deploying/vercel', label: 'Deploy to Vercel' },
        next: {
          href: '/docs/api-reference/components/link',
          label: 'Link Component',
        },
      }),
    ],
  });
}
function t(n = {}) {
  const { wrapper: o } = n.components || {};
  return o ? e.jsx(o, { ...n, children: e.jsx(a, { ...n }) }) : a(n);
}
const i = {
    path: '/node',
    metadata: {
      title:
        'Deploying to Node.js Server - Deploying | Core concepts | Rasengan.js',
      description: 'Deploy your Rasengan.js app to a Node.js server',
    },
  },
  d = [
    {
      title: 'Deploy',
      anchor: { id: 'deploy', text: 'Deploy' },
      level: 2,
      children: [],
    },
  ];
t.metadata = i;
t.toc = d;
t.type = 'MDXPageComponent';
export { t as default };
