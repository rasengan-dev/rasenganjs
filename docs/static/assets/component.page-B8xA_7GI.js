import { j as e } from './vendor-w5t4XTd4.js';
import { T as t, P as a } from './shared-components-DBceyN8p.js';
function r(n) {
  const s = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    li: 'li',
    mark: 'mark',
    p: 'p',
    pre: 'pre',
    span: 'span',
    ul: 'ul',
    ...n.components,
  };
  return (
    t || o('Tabs', !1),
    t.Item || o('Tabs.Item', !0),
    e.jsxs(e.Fragment, {
      children: [
        e.jsx('span', {
          className: 'text-[12px] font-mono-regular text-foreground/60',
          children: e.jsx(s.p, { children: 'API REFERENCE' }),
        }),
        `
`,
        e.jsx(s.h1, { children: 'Component' }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'The ',
            e.jsx(s.code, { children: 'Component' }),
            ' React component is the main component provided by Rasengan.js to setting up all the routing system based on the ',
            e.jsx(s.code, { children: 'AppRouter' }),
            ' that it receives as a prop.',
          ],
        }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'This component is used inside the ',
            e.jsx(s.code, { children: 'main.tsx' }),
            ' file (the entry point of the application) to set up the routing system.',
          ],
        }),
        `
`,
        e.jsx(s.h2, { children: 'Usage' }),
        `
`,
        e.jsxs(t, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            e.jsx(t.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'main.tsx',
                  }),
                  e.jsx(s.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsxs(s.code, {
                      'data-line-numbers': '',
                      'data-language': 'tsx',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      'data-line-numbers-max-digits': '1',
                      children: [
                        e.jsxs(s.span, {
                          'data-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' { ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'type',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' AppProps } ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "rasengan"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ';',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' AppRouter ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "@/app/app.router"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ';',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(s.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'export',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ' default',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ' function',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: ' App',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: '({ ',
                            }),
                            e.jsx(s.mark, {
                              'data-highlighted-chars': '',
                              children: e.jsx(s.span, {
                                style: { color: '#F69D50' },
                                children: 'Component',
                              }),
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: ', children }',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: ' AppProps) ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '{',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '  return',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' <',
                            }),
                            e.jsx(s.mark, {
                              'data-highlighted-chars': '',
                              children: e.jsx(s.span, {
                                style: { color: '#8DDB8C' },
                                children: 'Component',
                              }),
                            }),
                            e.jsx(s.span, {
                              style: { color: '#6CB6FF' },
                              children: ' router',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '={',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: 'AppRouter',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '}',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '{',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: 'children',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '}',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '</',
                            }),
                            e.jsx(s.mark, {
                              'data-highlighted-chars': '',
                              children: e.jsx(s.span, {
                                style: { color: '#8DDB8C' },
                                children: 'Component',
                              }),
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>;',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(s.span, {
                          'data-line': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: '}',
                          }),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
            e.jsx(t.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'main.jsx',
                  }),
                  e.jsx(s.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsxs(s.code, {
                      'data-line-numbers': '',
                      'data-language': 'jsx',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      'data-line-numbers-max-digits': '1',
                      children: [
                        e.jsxs(s.span, {
                          'data-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' AppRouter ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "@/app/app.router"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ';',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(s.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'export',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ' default',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ' function',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: ' App',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: '({ ',
                            }),
                            e.jsx(s.mark, {
                              'data-highlighted-chars': '',
                              children: e.jsx(s.span, {
                                style: { color: '#F69D50' },
                                children: 'Component',
                              }),
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: ', children }) ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '{',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '  return',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' <',
                            }),
                            e.jsx(s.mark, {
                              'data-highlighted-chars': '',
                              children: e.jsx(s.span, {
                                style: { color: '#8DDB8C' },
                                children: 'Component',
                              }),
                            }),
                            e.jsx(s.span, {
                              style: { color: '#6CB6FF' },
                              children: ' router',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '={',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: 'AppRouter',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '}',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '{',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: 'children',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '}',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '</',
                            }),
                            e.jsx(s.mark, {
                              'data-highlighted-chars': '',
                              children: e.jsx(s.span, {
                                style: { color: '#8DDB8C' },
                                children: 'Component',
                              }),
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>;',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(s.span, {
                          'data-line': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: '}',
                          }),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
          ],
        }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'The ',
            e.jsx(s.code, { children: 'Component' }),
            ' component receives the ',
            e.jsx(s.code, { children: 'router' }),
            ' prop, which is the ',
            e.jsx(s.code, { children: 'AppRouter' }),
            ` class that contains all the routes of the application.
It will be responsible for setting up the routing system based on the routes defined in the `,
            e.jsx(s.code, { children: 'AppRouter' }),
            ' class.',
          ],
        }),
        `
`,
        e.jsx(s.h2, { children: 'Props' }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'The ',
            e.jsx(s.code, { children: 'Component' }),
            ' component accepts two props:',
          ],
        }),
        `
`,
        e.jsxs(s.ul, {
          children: [
            `
`,
            e.jsxs(s.li, {
              children: [
                e.jsx(s.code, { children: 'router' }),
                ': The ',
                e.jsx(s.code, { children: 'AppRouter' }),
                ' class that contains all the routes of the application.',
              ],
            }),
            `
`,
            e.jsxs(s.li, {
              children: [
                e.jsx(s.code, { children: 'children' }),
                ': The children of the ',
                e.jsx(s.code, { children: 'Component' }),
                ' component, which represents all the routing system of the application.',
              ],
            }),
            `
`,
          ],
        }),
        `
`,
        e.jsx(a, {
          prev: {
            href: '/docs/api-reference/components/outlet',
            label: 'Outlet Component',
          },
          next: {
            href: '/docs/api-reference/components/template',
            label: 'Template',
          },
        }),
      ],
    })
  );
}
function l(n = {}) {
  const { wrapper: s } = n.components || {};
  return s ? e.jsx(s, { ...n, children: e.jsx(r, { ...n }) }) : r(n);
}
function o(n, s) {
  throw new Error(
    'Expected ' +
      (s ? 'component' : 'object') +
      ' `' +
      n +
      '` to be defined: you likely forgot to import, pass, or provide it.'
  );
}
const c = {
    path: '/component',
    metadata: {
      title: 'Component - Components | API Reference | Rasengan.js',
      description:
        'Is a React component that is used to set up the routing system based on the AppRouter that it receives as a prop.',
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
      title: 'Props',
      anchor: { id: 'props', text: 'Props' },
      level: 2,
      children: [],
    },
  ];
l.metadata = c;
l.toc = i;
l.type = 'MDXPageComponent';
export { l as default };
