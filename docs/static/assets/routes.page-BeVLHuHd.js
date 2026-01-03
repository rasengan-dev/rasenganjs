import { j as e } from './vendor-w5t4XTd4.js';
import { T as a, a as d, P as o } from './shared-components-DBceyN8p.js';
function t(n) {
  const s = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    pre: 'pre',
    span: 'span',
    table: 'table',
    tbody: 'tbody',
    td: 'td',
    th: 'th',
    thead: 'thead',
    tr: 'tr',
    ...n.components,
  };
  return (
    a || r('Tabs', !1),
    a.Item || r('Tabs.Item', !0),
    e.jsxs(e.Fragment, {
      children: [
        e.jsx('span', {
          className: 'text-[12px] font-mono-regular text-foreground/60',
          children: e.jsx(s.p, { children: 'CORE CONCEPTS' }),
        }),
        `
`,
        e.jsx(s.h1, { children: 'Defining Routes' }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'In Rasengan.js, each page is defined as a ',
            e.jsx(s.code, { children: 'PageComponent' }),
            '. A page consists of a function returning a ',
            e.jsx(s.code, { children: 'JSX' }),
            ' element and includes metadata such as ',
            e.jsx(s.code, { children: 'title' }),
            ', ',
            e.jsx(s.code, { children: 'description' }),
            ', and ',
            e.jsx(s.code, { children: 'keywords' }),
            ' to improve SEO and page accessibility.',
          ],
        }),
        `
`,
        e.jsx(s.h2, { children: 'Define a Page' }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'To define a page, create a new ',
            e.jsx(s.code, { children: '.page.tsx' }),
            ' or ',
            e.jsx(s.code, { children: '.page.jsx' }),
            ' file inside the ',
            e.jsx(s.code, { children: 'app' }),
            ' folder. Then, specify the page’s ',
            e.jsx(s.code, { children: 'path' }),
            ' and ',
            e.jsx(s.code, { children: 'metadata' }),
            '.',
          ],
        }),
        `
`,
        e.jsxs(s.p, {
          children: [
            "Let's assume you are creating an ",
            e.jsx(s.code, { children: 'About' }),
            ' page accessible at ',
            e.jsx(s.code, { children: '/about' }),
            '. Below is how you can define it:',
          ],
        }),
        `
`,
        e.jsxs(a, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            e.jsx(a.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/app/about.page.tsx',
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
                      'data-line-numbers-max-digits': '2',
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
                              children: ' { PageComponent } ',
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
                        e.jsx(s.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'const',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: ' About',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: ' PageComponent',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ' =',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' () ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=>',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: '  return',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' (',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '    <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>About us</',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(s.span, {
                          'data-line': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: '  );',
                          }),
                        }),
                        `
`,
                        e.jsx(s.span, {
                          'data-line': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: '};',
                          }),
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
                              style: { color: '#ADBAC7' },
                              children: 'About.path ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/about"',
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
                              style: { color: '#ADBAC7' },
                              children: 'About.metadata ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '  title: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"About Us"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '  description: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"Learn more about our company"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(s.span, {
                          'data-line': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: '};',
                          }),
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
                              style: { color: '#ADBAC7' },
                              children: ' About;',
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
            e.jsx(a.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/app/about.page.jsx',
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
                      'data-line-numbers-max-digits': '2',
                      children: [
                        e.jsxs(s.span, {
                          'data-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'const',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: ' About',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ' =',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' () ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=>',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: '  return',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' (',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '    <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>About us</',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(s.span, {
                          'data-line': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: '  );',
                          }),
                        }),
                        `
`,
                        e.jsx(s.span, {
                          'data-line': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: '};',
                          }),
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
                              style: { color: '#ADBAC7' },
                              children: 'About.path ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/about"',
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
                              style: { color: '#ADBAC7' },
                              children: 'About.metadata ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '  title: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"About Us"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '  description: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"Learn more about our company"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(s.span, {
                          'data-line': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: '};',
                          }),
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
                              style: { color: '#ADBAC7' },
                              children: ' About;',
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
        e.jsx(s.h3, { children: 'Attach to a router' }),
        `
`,
        e.jsx(s.p, {
          children:
            'To attach a page to a router, import the page and attach it to the router.',
        }),
        `
`,
        e.jsxs(s.figure, {
          'data-rehype-pretty-code-figure': '',
          children: [
            e.jsx(s.figcaption, {
              'data-rehype-pretty-code-title': '',
              'data-language': 'tsx',
              'data-theme': 'github-dark-dimmed',
              children: 'src/app/app.router.tsx',
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
                        children: ' { RouterComponent, defineRouter } ',
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
                        children: ' About ',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F47067' },
                        children: 'from',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#96D0FF' },
                        children: ' "@/app/about.page"',
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
                        children: 'class',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F69D50' },
                        children: ' AppRouter',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F47067' },
                        children: ' extends',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#6CB6FF' },
                        children: ' RouterComponent',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: ' {}',
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
                        style: { color: '#DCBDFB' },
                        children: ' defineRouter',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F69D50' },
                        children: '({',
                      }),
                    ],
                  }),
                  `
`,
                  e.jsxs(s.span, {
                    'data-line': '',
                    children: [
                      e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: '  pages: [About]',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F69D50' },
                        children: ',',
                      }),
                    ],
                  }),
                  `
`,
                  e.jsx(s.span, {
                    'data-line': '',
                    children: e.jsx(s.span, {
                      style: { color: '#768390' },
                      children: '  //...',
                    }),
                  }),
                  `
`,
                  e.jsxs(s.span, {
                    'data-line': '',
                    children: [
                      e.jsx(s.span, {
                        style: { color: '#F69D50' },
                        children: '})(',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: 'AppRouter',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F69D50' },
                        children: ')',
                      }),
                      e.jsx(s.span, {
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
        e.jsxs(s.p, {
          children: [
            'Now when you visit ',
            e.jsx(s.code, { children: '/about' }),
            ', you will see the ',
            e.jsx(s.code, { children: 'About' }),
            ' page.',
          ],
        }),
        `
`,
        e.jsx(s.h2, { children: 'Understanding Metadata' }),
        `
`,
        e.jsx(s.p, {
          children:
            'Metadata helps search engines and social media platforms understand your page content.',
        }),
        `
`,
        e.jsxs(s.table, {
          children: [
            e.jsx(s.thead, {
              children: e.jsxs(s.tr, {
                children: [
                  e.jsx(s.th, { children: 'Property' }),
                  e.jsx(s.th, { children: 'Type' }),
                  e.jsx(s.th, { children: 'Description' }),
                ],
              }),
            }),
            e.jsxs(s.tbody, {
              children: [
                e.jsxs(s.tr, {
                  children: [
                    e.jsx(s.td, {
                      children: e.jsx(s.code, { children: 'title' }),
                    }),
                    e.jsx(s.td, { children: 'string' }),
                    e.jsx(s.td, { children: 'The title of the page' }),
                  ],
                }),
                e.jsxs(s.tr, {
                  children: [
                    e.jsx(s.td, {
                      children: e.jsx(s.code, { children: 'description' }),
                    }),
                    e.jsx(s.td, { children: 'string' }),
                    e.jsx(s.td, {
                      children: 'A short description of the page',
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
          title: 'Learn more about metadata',
          link: '/docs/optimizing/metadata',
          status: 'info',
        }),
        `
`,
        e.jsx(o, {
          prev: { href: '/docs/routing/router-configuration', label: 'Router' },
          next: { href: '/docs/routing/layouts', label: 'Layouts' },
        }),
      ],
    })
  );
}
function l(n = {}) {
  const { wrapper: s } = n.components || {};
  return s ? e.jsx(s, { ...n, children: e.jsx(t, { ...n }) }) : t(n);
}
function r(n, s) {
  throw new Error(
    'Expected ' +
      (s ? 'component' : 'object') +
      ' `' +
      n +
      '` to be defined: you likely forgot to import, pass, or provide it.'
  );
}
const i = {
    path: '/routes',
    metadata: {
      title: 'Defining Routes - Routing | Core concepts | Rasengan.js',
      description: 'Defining routes in Rasengan.js is straightforward.',
    },
  },
  c = [
    {
      title: 'Define a Page',
      anchor: { id: 'define-a-page', text: 'Define a Page' },
      level: 2,
      children: [
        {
          title: 'Attach to a router',
          anchor: { id: 'attach-to-a-router', text: 'Attach to a router' },
          level: 3,
        },
      ],
    },
    {
      title: 'Understanding Metadata',
      anchor: { id: 'understanding-metadata', text: 'Understanding Metadata' },
      level: 2,
      children: [],
    },
  ];
l.metadata = i;
l.toc = c;
l.type = 'MDXPageComponent';
export { l as default };
