import { j as e } from './vendor-w5t4XTd4.js';
import { P as d } from './shared-components-DBceyN8p.js';
function r(t) {
  const n = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    p: 'p',
    pre: 'pre',
    span: 'span',
    table: 'table',
    tbody: 'tbody',
    td: 'td',
    th: 'th',
    thead: 'thead',
    tr: 'tr',
    ...t.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        children: e.jsx(n.p, { children: 'API REFERENCE' }),
      }),
      `
`,
      e.jsx(n.h1, { children: 'Render App' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          e.jsx(n.code, { children: 'renderApp()' }),
          ' is a function that renders the application on the client side.',
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'Usage' }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'js',
            'data-theme': 'github-dark-dimmed',
            children: 'index.js',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'js',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(n.code, {
              'data-line-numbers': '',
              'data-language': 'js',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              'data-line-numbers-max-digits': '1',
              children: [
                e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { renderApp } ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: " 'rasengan/client'",
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' App ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: ' "./main"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                e.jsx(n.span, { 'data-line': '', children: ' ' }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: 'renderApp',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '(App, { reactStrictMode: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: 'true',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' });',
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'Options' }),
      `
`,
      e.jsxs(n.table, {
        children: [
          e.jsx(n.thead, {
            children: e.jsxs(n.tr, {
              children: [
                e.jsx(n.th, { children: 'Option' }),
                e.jsx(n.th, { children: 'Type' }),
                e.jsx(n.th, { children: 'Description' }),
                e.jsx(n.th, { children: 'Default' }),
              ],
            }),
          }),
          e.jsxs(n.tbody, {
            children: [
              e.jsxs(n.tr, {
                children: [
                  e.jsx(n.td, { children: e.jsx(n.code, { children: 'App' }) }),
                  e.jsx(n.td, {
                    children: e.jsx(n.code, {
                      children: 'React.FunctionComponent<AppProps>',
                    }),
                  }),
                  e.jsx(n.td, {
                    children: 'The root component of the application',
                  }),
                  e.jsx(n.td, { children: '-' }),
                ],
              }),
              e.jsxs(n.tr, {
                children: [
                  e.jsx(n.td, {
                    children: e.jsx(n.code, { children: 'reactStrictMode' }),
                  }),
                  e.jsx(n.td, {
                    children: e.jsx(n.code, { children: 'boolean' }),
                  }),
                  e.jsx(n.td, { children: 'Enable React Strict Mode' }),
                  e.jsx(n.td, {
                    children: e.jsx(n.code, { children: 'true' }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      `
`,
      e.jsx(d, {
        prev: {
          href: '/docs/api-reference/functions/define-static-paths',
          label: 'defineStaticPaths',
        },
        next: {
          href: '/docs/api-reference/conventions/layout',
          label: '[name].layout.tsx',
        },
      }),
    ],
  });
}
function s(t = {}) {
  const { wrapper: n } = t.components || {};
  return n ? e.jsx(n, { ...t, children: e.jsx(r, { ...t }) }) : r(t);
}
const a = {
    path: '/render-app',
    metadata: {
      title: 'Render App - Functions | API Reference | Rasengan.js',
      description: 'How to use the renderApp function in Rasengan.js.',
    },
  },
  i = [
    {
      title: 'Usage',
      anchor: { id: 'usage', text: 'Usage' },
      level: 2,
      children: [],
    },
    {
      title: 'Options',
      anchor: { id: 'options', text: 'Options' },
      level: 2,
      children: [],
    },
  ];
s.metadata = a;
s.toc = i;
s.type = 'MDXPageComponent';
export { s as default };
