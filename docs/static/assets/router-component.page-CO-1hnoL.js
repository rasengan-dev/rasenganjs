import { j as e } from './vendor-w5t4XTd4.js';
import { T as r, P as a } from './shared-components-DBceyN8p.js';
function l(s) {
  const n = {
    a: 'a',
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    mark: 'mark',
    p: 'p',
    pre: 'pre',
    span: 'span',
    table: 'table',
    tbody: 'tbody',
    td: 'td',
    th: 'th',
    thead: 'thead',
    tr: 'tr',
    ...s.components,
  };
  return (
    r || o('Tabs', !1),
    r.Item || o('Tabs.Item', !0),
    e.jsxs(e.Fragment, {
      children: [
        e.jsx('span', {
          className: 'text-[12px] font-mono-regular text-foreground/60',
          children: e.jsx(n.p, { children: 'API REFERENCE' }),
        }),
        `
`,
        e.jsx(n.h1, { children: 'Router Component' }),
        `
`,
        e.jsxs(n.p, {
          children: [
            e.jsx(n.code, { children: 'RouterComponent' }),
            ' is a class provided by Rasengan.js used to create Routers in your application.',
          ],
        }),
        `
`,
        `
`,
        e.jsx(n.h2, { children: 'Usage' }),
        `
`,
        e.jsxs(r, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            e.jsx(r.Item, {
              children: e.jsxs(n.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(n.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'app.router.tsx',
                  }),
                  e.jsx(n.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsxs(n.code, {
                      'data-line-numbers': '',
                      'data-language': 'tsx',
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
                              children: ' { ',
                            }),
                            e.jsx(n.mark, {
                              'data-highlighted-chars': '',
                              children: e.jsx(n.span, {
                                style: { color: '#ADBAC7' },
                                children: 'RouterComponent',
                              }),
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ', defineRouter } ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: ' "rasengan"',
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
                              style: { color: '#F47067' },
                              children: 'class',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ' AppRouter',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ' extends',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#6CB6FF' },
                              children: ' ',
                            }),
                            e.jsx(n.mark, {
                              'data-highlighted-chars': '',
                              children: e.jsx(n.span, {
                                style: { color: '#6CB6FF' },
                                children: 'RouterComponent',
                              }),
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {};',
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
                              style: { color: '#F47067' },
                              children: 'export',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ' default',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#DCBDFB' },
                              children: ' defineRouter',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: '({',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '  imports: []',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ', ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#768390' },
                              children: '// Import others routers',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '  layout: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#6CB6FF' },
                              children: 'null',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ', ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#768390' },
                              children: '// Set a layout',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '  pages: [] ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#768390' },
                              children: '// Import pages',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: '})(',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: 'AppRouter',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ')',
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
            e.jsx(r.Item, {
              children: e.jsxs(n.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(n.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'app.router.jsx',
                  }),
                  e.jsx(n.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsxs(n.code, {
                      'data-line-numbers': '',
                      'data-language': 'jsx',
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
                              children: ' { ',
                            }),
                            e.jsx(n.mark, {
                              'data-highlighted-chars': '',
                              children: e.jsx(n.span, {
                                style: { color: '#ADBAC7' },
                                children: 'RouterComponent',
                              }),
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ', defineRouter } ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: ' "rasengan"',
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
                              style: { color: '#F47067' },
                              children: 'class',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ' AppRouter',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ' extends',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#6CB6FF' },
                              children: ' ',
                            }),
                            e.jsx(n.mark, {
                              'data-highlighted-chars': '',
                              children: e.jsx(n.span, {
                                style: { color: '#6CB6FF' },
                                children: 'RouterComponent',
                              }),
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {};',
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
                              style: { color: '#F47067' },
                              children: 'export',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ' default',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#DCBDFB' },
                              children: ' defineRouter',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: '({',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '  imports: []',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ', ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#768390' },
                              children: '// Import others routers',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '  layout: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#6CB6FF' },
                              children: 'null',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ', ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#768390' },
                              children: '// Set a layout',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '  pages: [] ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#768390' },
                              children: '// Import pages',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: '})(',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: 'AppRouter',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ')',
                            }),
                          ],
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
        e.jsx(n.h2, { children: 'Properties' }),
        `
`,
        e.jsxs(n.p, {
          children: [
            'Here is the list of all the properties of ',
            e.jsx(n.code, { children: 'RouterComponent' }),
            ' class.',
          ],
        }),
        `
`,
        e.jsxs(n.table, {
          children: [
            e.jsx(n.thead, {
              children: e.jsxs(n.tr, {
                children: [
                  e.jsx(n.th, { children: 'Properties' }),
                  e.jsx(n.th, { children: 'Type' }),
                  e.jsx(n.th, { children: 'Description' }),
                ],
              }),
            }),
            e.jsxs(n.tbody, {
              children: [
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'routers' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, {
                        children: 'RouterComponent[]',
                      }),
                    }),
                    e.jsxs(n.td, {
                      children: [
                        'An array of other ',
                        e.jsx(n.code, { children: 'Router' }),
                        ' classes to be imported.',
                      ],
                    }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'layout' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.a, {
                        href: '/docs/api-reference/components/layout-component',
                        children: e.jsx(n.code, {
                          children: 'LayoutComponent',
                        }),
                      }),
                    }),
                    e.jsx(n.td, {
                      children: 'The layout component to be used.',
                    }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'pages' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.a, {
                        href: '/docs/api-reference/components/page-component',
                        children: e.jsx(n.code, {
                          children: 'PageComponent[]',
                        }),
                      }),
                    }),
                    e.jsx(n.td, {
                      children: 'An array of page components to be used.',
                    }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, {
                        children: 'notFoundComponent',
                      }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'React.FC' }),
                    }),
                    e.jsx(n.td, {
                      children: 'The 404 page component to be used.',
                    }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'loaderComponent' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'React.FC' }),
                    }),
                    e.jsx(n.td, {
                      children: 'The loader component to be used.',
                    }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'useParentLayout' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'boolean' }),
                    }),
                    e.jsx(n.td, {
                      children: 'Whether to use the parent layout or not.',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        `
`,
        e.jsxs(n.p, {
          children: [
            'Rather than setting these values manually, the ',
            e.jsx(n.a, {
              href: '/docs/api-reference/functions/define-router',
              children: e.jsx(n.code, { children: 'defineRouter' }),
            }),
            ' does it for us and create a new instance of ',
            e.jsx(n.code, { children: 'RouterComponent' }),
            ' class and return it.',
          ],
        }),
        `
`,
        e.jsx(a, {
          prev: {
            href: '/docs/api-reference/components/page-component',
            label: 'Page Component',
          },
          next: {
            href: '/docs/api-reference/components/scroll-restoration',
            label: 'ScrollRestoration',
          },
        }),
      ],
    })
  );
}
function t(s = {}) {
  const { wrapper: n } = s.components || {};
  return n ? e.jsx(n, { ...s, children: e.jsx(l, { ...s }) }) : l(s);
}
function o(s, n) {
  throw new Error(
    'Expected ' +
      (n ? 'component' : 'object') +
      ' `' +
      s +
      '` to be defined: you likely forgot to import, pass, or provide it.'
  );
}
const d = {
    path: '/router-component',
    metadata: {
      title: 'Router Component - Components | API Reference | Rasengan.js',
      description: 'The Router Component of Rasengan.js.',
    },
  },
  c = [
    {
      title: 'Usage',
      anchor: { id: 'usage', text: 'Usage' },
      level: 2,
      children: [],
    },
    {
      title: 'Properties',
      anchor: { id: 'properties', text: 'Properties' },
      level: 2,
      children: [],
    },
  ];
t.metadata = d;
t.toc = c;
t.type = 'MDXPageComponent';
export { t as default };
