import { j as e, C as s } from './vendor-CfbgIbdB.js';
import { P as o } from './shared-components-CkrC6jAk.js';
function r(n) {
  const a = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    p: 'p',
    pre: 'pre',
    span: 'span',
    ...n.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        children: e.jsx(a.p, { children: 'API REFERENCE' }),
      }),
      `
`,
      e.jsx(a.h1, { children: 'Create Rasengan CLI' }),
      `
`,
      e.jsx(a.p, {
        children:
          'Rasengan.js comes with a CLI that can be used to create a new project. This CLI is very useful for creating automatically a new project with the a clear process of steps.',
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsx(a.p, {
        children: 'To use the CLI, you can run the following command:',
      }),
      `
`,
      e.jsxs(a.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(a.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: 'Terminal',
          }),
          e.jsx(a.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: e.jsx(a.code, {
              'data-language': 'bash',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: e.jsxs(a.span, {
                'data-line': '',
                children: [
                  e.jsx(a.span, {
                    style: { color: '#F69D50' },
                    children: 'npx',
                  }),
                  e.jsx(a.span, {
                    style: { color: '#96D0FF' },
                    children: ' create-rasengan@latest',
                  }),
                  e.jsx(a.span, {
                    style: { color: '#96D0FF' },
                    children: ' my-app',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(a.h2, { children: 'Configuration' }),
      `
`,
      e.jsxs(a.p, {
        children: [
          'Learn more about the ',
          e.jsx(s, {
            to: '/packages/create-rasengan',
            children: 'Create Rasengan CLI',
          }),
          ' in the ',
          e.jsx(a.code, { children: 'packages' }),
          ' page.',
        ],
      }),
      `
`,
      e.jsx(o, {
        prev: {
          href: '/docs/api-reference/rasengan-config',
          label: 'rasengan.config.js',
        },
        next: {
          href: '/docs/api-reference/rasengan-cli',
          label: 'Rasengan CLI',
        },
      }),
    ],
  });
}
function t(n = {}) {
  const { wrapper: a } = n.components || {};
  return a ? e.jsx(a, { ...n, children: e.jsx(r, { ...n }) }) : r(n);
}
const c = {
    path: '/create-rasengan-cli',
    metadata: {
      title: 'Create Rasengan CLI | API Reference | Rasengan.js',
      description: 'Create a new project with the Rasengan.js CLI.',
    },
  },
  i = [
    {
      title: 'Configuration',
      anchor: { id: 'configuration', text: 'Configuration' },
      level: 2,
      children: [],
    },
  ];
t.metadata = c;
t.toc = i;
t.type = 'MDXPageComponent';
export { t as default };
