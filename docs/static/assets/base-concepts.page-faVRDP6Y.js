import { j as e } from './vendor-w5t4XTd4.js';
import { T as l, a as i, P as o } from './shared-components-DBceyN8p.js';
function r(s) {
  const n = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    li: 'li',
    p: 'p',
    pre: 'pre',
    span: 'span',
    strong: 'strong',
    table: 'table',
    tbody: 'tbody',
    td: 'td',
    th: 'th',
    thead: 'thead',
    tr: 'tr',
    ul: 'ul',
    ...s.components,
  };
  return (
    l || t('Tabs', !1),
    l.Item || t('Tabs.Item', !0),
    e.jsxs(e.Fragment, {
      children: [
        e.jsx('span', {
          className: 'text-[12px] font-mono-regular text-foreground/60',
          children: e.jsx(n.p, { children: 'CORE CONCEPTS' }),
        }),
        `
`,
        e.jsx(n.h1, { children: 'Rasengan.js Routing Basics' }),
        `
`,
        e.jsxs(n.p, {
          children: [
            'Rasengan.js supports ',
            e.jsx(n.strong, {
              children: 'multi-page application (MPA) routing',
            }),
            ' by default, powered by ',
            e.jsx('a', {
              href: 'https://reactrouter.com/',
              target: '_blank',
              rel: 'noopener noreferrer',
              children: e.jsx(n.code, { children: 'React Router' }),
            }),
            '. This allows you to handle different URLs and render specific components based on the URL, making navigation seamless within your application.',
          ],
        }),
        `
`,
        e.jsx('br', {}),
        `
`,
        e.jsxs(n.p, {
          children: [
            'Rasengan.js introduces ',
            e.jsx(n.strong, { children: 'file-based routing' }),
            ' to make it easier to manage routes. That means you have actually two ways to manage routes:',
          ],
        }),
        `
`,
        e.jsxs(n.ul, {
          children: [
            `
`,
            e.jsxs(n.li, {
              children: [
                e.jsx(n.strong, {
                  children: 'Programmatic or Config-based routing',
                }),
                ': This is the default way to manage routes. It is the way to manage routes using code, you have to define routes manually.',
              ],
            }),
            `
`,
            e.jsxs(n.li, {
              children: [
                e.jsx(n.strong, { children: 'File-based routing' }),
                ': This is the second way to manage routes. It is based on the file structure of your application, routes are automatically generated based on the file structure.',
              ],
            }),
            `
`,
          ],
        }),
        `
`,
        e.jsx('br', {}),
        `
`,
        e.jsxs(n.p, {
          children: [
            'The whole documentation will follow the ',
            e.jsx(n.code, { children: 'Config-based routing' }),
            ' way.',
          ],
        }),
        `
`,
        e.jsx(i, {
          link: '/docs/routing/file-based-routing',
          title: 'Learn more about file-based routing in Rasengan.js.',
          status: 'info',
        }),
        `
`,
        e.jsx(n.h2, { children: 'Understanding Routing in Rasengan.js' }),
        `
`,
        e.jsxs(n.p, {
          children: [
            'Routing in Rasengan.js is managed through ',
            e.jsx(n.strong, { children: 'Routers, Layouts, and Pages' }),
            ':',
          ],
        }),
        `
`,
        e.jsxs(n.ul, {
          children: [
            `
`,
            e.jsxs(n.li, {
              children: [
                e.jsx(n.strong, { children: 'Router' }),
                ': A collection of pages, optionally grouped under a shared layout.',
              ],
            }),
            `
`,
            e.jsxs(n.li, {
              children: [
                e.jsx(n.strong, { children: 'Layout' }),
                ': A wrapper component for pages, providing a common structure.',
              ],
            }),
            `
`,
            e.jsxs(n.li, {
              children: [
                e.jsx(n.strong, { children: 'Page' }),
                ': A React component displayed when a specific URL is accessed.',
              ],
            }),
            `
`,
          ],
        }),
        `
`,
        e.jsx(n.h2, { children: 'Setting Up Routing' }),
        `
`,
        e.jsxs(n.p, {
          children: [
            'To configure routing in Rasengan.js, you need to define a ',
            e.jsx(n.strong, { children: 'Router' }),
            ', which organizes pages and layouts efficiently.',
          ],
        }),
        `
`,
        e.jsx(n.h3, { children: '1. Creating a Router' }),
        `
`,
        e.jsxs(n.p, {
          children: [
            'A ',
            e.jsx(n.strong, { children: 'Router' }),
            ' is a collection of pages that can share a layout. You create one by extending ',
            e.jsx(n.code, { children: 'RouterComponent' }),
            ' and configuring it using ',
            e.jsx(n.code, { children: 'defineRouter' }),
            '.',
          ],
        }),
        `
`,
        e.jsx(n.h4, { children: 'Example: Defining a Router' }),
        `
`,
        e.jsxs(n.figure, {
          'data-rehype-pretty-code-figure': '',
          children: [
            e.jsx(n.figcaption, {
              'data-rehype-pretty-code-title': '',
              'data-language': 'javascript',
              'data-theme': 'github-dark-dimmed',
              children: 'src/app/app.router.ts',
            }),
            e.jsx(n.pre, {
              style: { backgroundColor: '#22272e', color: '#adbac7' },
              tabIndex: '0',
              'data-language': 'javascript',
              'data-theme': 'github-dark-dimmed',
              children: e.jsxs(n.code, {
                'data-line-numbers': '',
                'data-language': 'javascript',
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
                        children: '// Import other routers',
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
                        children: '// Assign a layout (optional)',
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
                        children: '// Add page components',
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
        e.jsx(n.h4, { children: 'Router Configuration Options' }),
        `
`,
        e.jsxs(n.table, {
          children: [
            e.jsx(n.thead, {
              children: e.jsxs(n.tr, {
                children: [
                  e.jsx(n.th, { children: 'Property' }),
                  e.jsx(n.th, { children: 'Description' }),
                  e.jsx(n.th, { children: 'Type' }),
                  e.jsx(n.th, { children: 'Required' }),
                ],
              }),
            }),
            e.jsxs(n.tbody, {
              children: [
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'imports' }),
                    }),
                    e.jsx(n.td, { children: 'Import additional routers' }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, {
                        children: 'RouterComponent[]',
                      }),
                    }),
                    e.jsx(n.td, { children: 'No' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'layout' }),
                    }),
                    e.jsx(n.td, { children: 'Assign a layout component' }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'LayoutComponent' }),
                    }),
                    e.jsx(n.td, { children: 'No' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'pages' }),
                    }),
                    e.jsx(n.td, { children: 'Define page components' }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'PageComponent[]' }),
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
        e.jsx(n.h3, { children: '2. Creating a Layout' }),
        `
`,
        e.jsxs(n.p, {
          children: [
            'A ',
            e.jsx(n.strong, { children: 'Layout' }),
            ' wraps around multiple pages, providing a consistent structure (e.g., headers, footers). It is optional but recommended.',
          ],
        }),
        `
`,
        e.jsx(n.h4, { children: 'Example: Defining a Layout' }),
        `
`,
        e.jsxs(l, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            e.jsx(l.Item, {
              children: e.jsxs(n.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(n.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/app/app.layout.tsx',
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
                              children: ' React ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: ' "react"',
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
                              children: ' { LayoutComponent, Outlet } ',
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
                              children: 'const',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#DCBDFB' },
                              children: ' AppLayout',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ' LayoutComponent',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ' =',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' () ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: '=>',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: '  return',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' (',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '    <>',
                          }),
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '      <',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Outlet',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' />',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '    </>',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  );',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '};',
                          }),
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
                              style: { color: '#ADBAC7' },
                              children: 'AppLayout.path ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/"',
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
                              children: 'export',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ' default',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' AppLayout;',
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
            e.jsx(l.Item, {
              children: e.jsxs(n.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(n.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/app/app.layout.jsx',
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
                              children: ' React ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: ' "react"',
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
                              children: ' { Outlet } ',
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
                              children: 'const',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#DCBDFB' },
                              children: ' AppLayout',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ' =',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' () ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: '=>',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: '  return',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' (',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '    <>',
                          }),
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '      <',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Outlet',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' />',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '    </>',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  );',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '};',
                          }),
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
                              style: { color: '#ADBAC7' },
                              children: 'AppLayout.path ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/"',
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
                              children: 'export',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ' default',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' AppLayout;',
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
        e.jsx(n.h3, { children: '3. Creating a Page' }),
        `
`,
        e.jsxs(n.p, {
          children: [
            'A ',
            e.jsx(n.strong, { children: 'Page' }),
            ' is a React component that is displayed when a user visits a specific route.',
          ],
        }),
        `
`,
        e.jsx(n.h4, { children: 'Example: Defining a Page' }),
        `
`,
        e.jsxs(l, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            e.jsx(l.Item, {
              children: e.jsxs(n.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(n.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/app/home.page.tsx',
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
                              children: ' { PageComponent } ',
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
                              children: 'const',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#DCBDFB' },
                              children: ' Home',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ' PageComponent',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ' =',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' () ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: '=>',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: '  return',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' <',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '>Home Page</',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '>;',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '};',
                          }),
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
                              style: { color: '#ADBAC7' },
                              children: 'Home.path ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/"',
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
                              style: { color: '#ADBAC7' },
                              children: 'Home.metadata ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: '  title: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"Home"',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
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
                              style: { color: '#ADBAC7' },
                              children: '  description: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"Home Page"',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '};',
                          }),
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
                              style: { color: '#ADBAC7' },
                              children: ' Home;',
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
            e.jsx(l.Item, {
              children: e.jsxs(n.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(n.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/app/home.page.jsx',
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
                              children: 'const',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#DCBDFB' },
                              children: ' Home',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ' =',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' () ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: '=>',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: '  return',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' <',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '>Home Page</',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '>;',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '};',
                          }),
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
                              style: { color: '#ADBAC7' },
                              children: 'Home.path ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/"',
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
                              style: { color: '#ADBAC7' },
                              children: 'Home.metadata ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: '  title: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"Home"',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
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
                              style: { color: '#ADBAC7' },
                              children: '  description: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"Home Page"',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '};',
                          }),
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
                              style: { color: '#ADBAC7' },
                              children: ' Home;',
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
        e.jsx(o, {
          prev: {
            href: '/docs/getting-started/project-structure',
            label: 'Project Structure',
          },
          next: {
            href: '/docs/routing/router-configuration',
            label: 'Router Configuration',
          },
        }),
      ],
    })
  );
}
function a(s = {}) {
  const { wrapper: n } = s.components || {};
  return n ? e.jsx(n, { ...s, children: e.jsx(r, { ...s }) }) : r(s);
}
function t(s, n) {
  throw new Error(
    'Expected ' +
      (n ? 'component' : 'object') +
      ' `' +
      s +
      '` to be defined: you likely forgot to import, pass, or provide it.'
  );
}
const d = {
    path: '/base-concepts',
    metadata: {
      title: 'Base Concepts - Routing | Core concepts | Rasengan.js',
      description:
        'Rasengan.js is a powerful and flexible JavaScript framework for building web applications. This article covers the basics of routing in Rasengan.js.',
    },
  },
  c = [
    {
      title: 'Understanding Routing in Rasengan.js',
      anchor: {
        id: 'understanding-routing-in-rasengan.js',
        text: 'Understanding Routing in Rasengan.js',
      },
      level: 2,
      children: [],
    },
    {
      title: 'Setting Up Routing',
      anchor: { id: 'setting-up-routing', text: 'Setting Up Routing' },
      level: 2,
      children: [
        {
          title: '1. Creating a Router',
          anchor: { id: '1.-creating-a-router', text: '1. Creating a Router' },
          level: 3,
        },
        {
          title: '2. Creating a Layout',
          anchor: { id: '2.-creating-a-layout', text: '2. Creating a Layout' },
          level: 3,
        },
        {
          title: '3. Creating a Page',
          anchor: { id: '3.-creating-a-page', text: '3. Creating a Page' },
          level: 3,
        },
      ],
    },
  ];
a.metadata = d;
a.toc = c;
a.type = 'MDXPageComponent';
export { a as default };
