import { j as e } from './vendor-CfbgIbdB.js';
import { T as t, P as a } from './shared-components-CkrC6jAk.js';
function r(s) {
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
    ...s.components,
  };
  return (
    t || o('Tabs', !1),
    t.Item || o('Tabs.Item', !0),
    e.jsxs(e.Fragment, {
      children: [
        e.jsx('span', {
          className: 'text-[12px] font-mono-regular text-foreground/60',
          children: e.jsx(n.p, { children: 'API REFERENCE' }),
        }),
        `
`,
        e.jsx(n.h1, { children: 'Define Router' }),
        `
`,
        e.jsxs(n.p, {
          children: [
            e.jsx(n.code, { children: 'defineRouter()' }),
            ' is an utility function that allows you to define a router by attaching ',
            e.jsx(n.code, { children: 'pages' }),
            ' to it and setting a ',
            e.jsx(n.code, { children: 'layout' }),
            ' and other options.',
          ],
        }),
        `
`,
        e.jsxs(t, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            e.jsx(t.Item, {
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
                      'data-line-numbers-max-digits': '2',
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
                              children: ' { RouterComponent, defineRouter } ',
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
                        e.jsxs(n.span, {
                          'data-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' AppLayout ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: ' "@/app/app.layout"',
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
                              children: ' Home ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: ' "@/app/home.page"',
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
                              children: ' About ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: ' "@/app/about.page"',
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
                              children: ' RouterComponent',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {}',
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
                          'data-highlighted-line': '',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '  imports: []',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ',',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '  layout: AppLayout',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ',',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '  pages: [Home, About]',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ',',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
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
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ';',
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
            e.jsx(t.Item, {
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
                      'data-line-numbers-max-digits': '2',
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
                              children: ' { RouterComponent, defineRouter } ',
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
                        e.jsxs(n.span, {
                          'data-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' AppLayout ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: ' "@/app/app.layout"',
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
                              children: ' Home ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: ' "@/app/home.page"',
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
                              children: ' About ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: ' "@/app/about.page"',
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
                              children: ' RouterComponent',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {}',
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
                          'data-highlighted-line': '',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '  imports: []',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ',',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '  layout: AppLayout',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ',',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '  pages: [Home, About]',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ',',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
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
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ';',
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
        e.jsx(n.h2, { children: 'Options' }),
        `
`,
        e.jsxs(n.p, {
          children: [
            e.jsx(n.code, { children: 'defineRouter' }),
            ' accepts an object with the following options:',
          ],
        }),
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
                  e.jsx(n.th, { children: 'Optional' }),
                ],
              }),
            }),
            e.jsxs(n.tbody, {
              children: [
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, { children: 'imports' }),
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
                    e.jsx(n.td, { children: 'Yes' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, { children: 'layout' }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'LayoutComponent' }),
                    }),
                    e.jsx(n.td, {
                      children: 'The layout component to be used.',
                    }),
                    e.jsx(n.td, { children: 'Yes' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, { children: 'pages' }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'PageComponent[]' }),
                    }),
                    e.jsx(n.td, {
                      children: 'An array of page components to be used.',
                    }),
                    e.jsx(n.td, { children: 'No' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, { children: 'notFoundComponent' }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'React.FC' }),
                    }),
                    e.jsx(n.td, {
                      children: 'The 404 page component to be used.',
                    }),
                    e.jsx(n.td, { children: 'Yes' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, { children: 'loaderComponent' }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'React.FC' }),
                    }),
                    e.jsx(n.td, {
                      children: 'The loader component to be used.',
                    }),
                    e.jsx(n.td, { children: 'Yes' }),
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
                    e.jsx(n.td, { children: 'Yes' }),
                  ],
                }),
              ],
            }),
          ],
        }),
        `
`,
        e.jsx(n.h2, { children: 'Returned value' }),
        `
`,
        e.jsxs(n.p, {
          children: [
            e.jsx(n.code, { children: 'defineRouter' }),
            ' returns a function that accepts a ',
            e.jsx(n.code, { children: 'Router' }),
            ' class and returns a new ',
            e.jsx(n.code, { children: 'Router' }),
            ' instance object with the options defined.',
          ],
        }),
        `
`,
        e.jsx(a, {
          prev: {
            href: '/docs/api-reference/functions/define-config',
            label: 'defineConfig',
          },
          next: {
            href: '/docs/api-reference/functions/define-routes-group',
            label: 'defineRoutesGroup',
          },
        }),
      ],
    })
  );
}
function l(s = {}) {
  const { wrapper: n } = s.components || {};
  return n ? e.jsx(n, { ...s, children: e.jsx(r, { ...s }) }) : r(s);
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
    path: '/define-router',
    metadata: {
      title: 'Define Router - Functions | API Reference | Rasengan.js',
      description:
        'Define a router by attaching pages to it and setting a layout and other options.',
    },
  },
  i = [
    {
      title: 'Options',
      anchor: { id: 'options', text: 'Options' },
      level: 2,
      children: [],
    },
    {
      title: 'Returned value',
      anchor: { id: 'returned-value', text: 'Returned value' },
      level: 2,
      children: [],
    },
  ];
l.metadata = d;
l.toc = i;
l.type = 'MDXPageComponent';
export { l as default };
