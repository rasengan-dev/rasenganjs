import { j as e } from './vendor-CfbgIbdB.js';
import { P as a } from './shared-components-CkrC6jAk.js';
function t(s) {
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
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        children: e.jsx(n.p, { children: 'API REFERENCE' }),
      }),
      `
`,
      e.jsx(n.h1, { children: 'Define Routes Group' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          e.jsx(n.code, { children: 'defineRoutesGroup()' }),
          ' is an utility function that allows you to create a routes group by attaching ',
          e.jsx(n.code, { children: 'pages' }),
          ' under a same ',
          e.jsx(n.code, { children: 'path' }),
          '.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsx(n.p, {
        children:
          'Imagine you have multiple pages that share the same path, you can use this function to group them together.',
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
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'admin.group.ts',
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
                      children: ' { defineRoutesGroup } ',
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
                      children: ' Dashboard ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: ' "@/app/admin/dashboard.page"',
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
                      children: ' Users ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: ' "@/app/admin/users.page"',
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
                      children: ' Settings ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: ' "@/app/admin/settings.page"',
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
                      children: ' Profile ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: ' "@/app/admin/profile.page"',
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
                      children: ' defineRoutesGroup',
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
                      children: '  path:  ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"/admin"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: ',',
                    }),
                  ],
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '  children: [',
                  }),
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '    Dashboard,',
                  }),
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '    Users,',
                  }),
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '    Settings,',
                  }),
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '    Profile,',
                  }),
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '  ]',
                  }),
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: '})',
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
      `
`,
      e.jsxs(n.p, {
        children: [
          'As you can see, all the pages are grouped under the same ',
          e.jsx(n.code, { children: 'path' }),
          '. This group can be easily imported in your router.',
        ],
      }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'app.router.ts',
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
                  'data-highlighted-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' AdminGroup ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: ' "@/app/admin.group"',
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
                      children: '  pages: [AdminGroup]',
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
      `
`,
      e.jsx(n.h2, { children: 'Options' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          e.jsx(n.code, { children: 'defineRoutesGroup()' }),
          ' accepts an object with the following properties:',
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
                  e.jsx(n.td, {
                    children: e.jsx(n.code, { children: 'path' }),
                  }),
                  e.jsx(n.td, {
                    children: e.jsx(n.code, { children: 'string' }),
                  }),
                  e.jsx(n.td, { children: 'The path of the routes group' }),
                  e.jsx(n.td, { children: 'No' }),
                ],
              }),
              e.jsxs(n.tr, {
                children: [
                  e.jsx(n.td, {
                    children: e.jsx(n.code, { children: 'children' }),
                  }),
                  e.jsxs(n.td, {
                    children: [
                      e.jsx(n.code, { children: 'PageComponent[]' }),
                      ' | ',
                      e.jsx(n.code, { children: 'MDXPageComponent[]' }),
                    ],
                  }),
                  e.jsx(n.td, {
                    children: 'The pages to be grouped under the same path',
                  }),
                  e.jsx(n.td, { children: 'No' }),
                ],
              }),
            ],
          }),
        ],
      }),
      `
`,
      e.jsx(a, {
        prev: {
          href: '/docs/api-reference/functions/define-routes-group',
          label: 'defineRoutesGroup',
        },
        next: {
          href: '/docs/api-reference/functions/define-static-paths',
          label: 'defintStaticPaths',
        },
      }),
    ],
  });
}
function l(s = {}) {
  const { wrapper: n } = s.components || {};
  return n ? e.jsx(n, { ...s, children: e.jsx(t, { ...s }) }) : t(s);
}
const r = {
    path: '/define-routes-group',
    metadata: {
      title: 'Define Routes Group - Functions | API Reference | Rasengan.js',
      description: 'Define routes group in Rasengan.js',
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
l.metadata = r;
l.toc = i;
l.type = 'MDXPageComponent';
export { l as default };
