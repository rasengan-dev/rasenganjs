import { j as e } from './vendor-w5t4XTd4.js';
import { T as n, S as a, P as i } from './shared-components-DBceyN8p.js';
function t(l) {
  const s = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    li: 'li',
    mark: 'mark',
    p: 'p',
    pre: 'pre',
    span: 'span',
    strong: 'strong',
    ul: 'ul',
    ...l.components,
  };
  return (
    n || o('Tabs', !1),
    n.Item || o('Tabs.Item', !0),
    e.jsxs(e.Fragment, {
      children: [
        e.jsx('span', {
          className: 'text-[12px] font-mono-regular text-foreground/60',
          children: e.jsx(s.p, { children: 'CORE CONCEPTS' }),
        }),
        `
`,
        e.jsx(s.h1, { children: 'Configuring a Router in Rasengan.js' }),
        `
`,
        e.jsx(s.p, {
          children:
            'In this guide, you will learn how to configure routers in Rasengan.js, including setting up pages and layouts to structure your application effectively.',
        }),
        `
`,
        e.jsx(s.h2, { children: 'Understanding Routers in Rasengan.js' }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'A ',
            e.jsx(s.strong, { children: 'Router' }),
            ' in Rasengan.js is a collection of pages grouped under a common structure ( ',
            e.jsx(s.code, { children: 'layout' }),
            ' ). It defines how different pages are connected and whether they share a common ',
            e.jsx(s.strong, { children: 'Layout' }),
            '.',
          ],
        }),
        `
`,
        e.jsx('br', {}),
        `
`,
        e.jsx(s.p, { children: 'Each router:' }),
        `
`,
        e.jsxs(s.ul, {
          children: [
            `
`,
            e.jsx(s.li, { children: 'Contains multiple pages.' }),
            `
`,
            e.jsx(s.li, {
              children: 'Can import other routers for modularity.',
            }),
            `
`,
            e.jsx(s.li, {
              children: 'Can have an optional layout that wraps all its pages.',
            }),
            `
`,
          ],
        }),
        `
`,
        e.jsx(s.h2, { children: 'Creating a Router' }),
        `
`,
        e.jsx(s.p, { children: 'To define a router, follow these steps:' }),
        `
`,
        e.jsx(a, {
          step: '01',
          title: 'Create the Router Component',
          content:
            '\n  A router is a class component that extends `RouterComponent`. Paste the following code inside the `src/app/app.router.ts` file.\n',
          className: 'mt-8',
          children: e.jsxs(s.figure, {
            'data-rehype-pretty-code-figure': '',
            children: [
              e.jsx(s.figcaption, {
                'data-rehype-pretty-code-title': '',
                'data-language': 'typescript',
                'data-theme': 'github-dark-dimmed',
                children: 'src/app/app.router.ts',
              }),
              e.jsx(s.pre, {
                style: { backgroundColor: '#22272e', color: '#adbac7' },
                tabIndex: '0',
                'data-language': 'typescript',
                'data-theme': 'github-dark-dimmed',
                children: e.jsxs(s.code, {
                  'data-line-numbers': '',
                  'data-language': 'typescript',
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
                          children: ' { RouterComponent } ',
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
                  ],
                }),
              }),
            ],
          }),
        }),
        `
`,
        e.jsx(a, {
          step: '02',
          title: 'Configure the Router',
          content: `
  Use the \`defineRouter\` function to configure the router by specifying:
  - Imported routers (if any)
  - The layout (optional)
  - The list of pages  
`,
          className: 'mt-8',
          children: e.jsxs(s.figure, {
            'data-rehype-pretty-code-figure': '',
            children: [
              e.jsx(s.figcaption, {
                'data-rehype-pretty-code-title': '',
                'data-language': 'typescript',
                'data-theme': 'github-dark-dimmed',
                children: 'src/app/app.router.ts',
              }),
              e.jsx(s.pre, {
                style: { backgroundColor: '#22272e', color: '#adbac7' },
                tabIndex: '0',
                'data-language': 'typescript',
                'data-theme': 'github-dark-dimmed',
                children: e.jsxs(s.code, {
                  'data-line-numbers': '',
                  'data-language': 'typescript',
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
                          children: ' { RouterComponent, ',
                        }),
                        e.jsx(s.mark, {
                          'data-highlighted-chars': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: 'defineRouter',
                          }),
                        }),
                        e.jsx(s.span, {
                          style: { color: '#ADBAC7' },
                          children: ' } ',
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
                      'data-highlighted-line': '',
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
                          children: ' ',
                        }),
                        e.jsx(s.mark, {
                          'data-highlighted-chars': '',
                          children: e.jsx(s.span, {
                            style: { color: '#DCBDFB' },
                            children: 'defineRouter',
                          }),
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
                      'data-highlighted-line': '',
                      children: [
                        e.jsx(s.span, {
                          style: { color: '#ADBAC7' },
                          children: '  imports: []',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#F69D50' },
                          children: ', ',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#768390' },
                          children: '// Import other routers',
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
                          style: { color: '#ADBAC7' },
                          children: '  layout: ',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#6CB6FF' },
                          children: 'null',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#F69D50' },
                          children: ', ',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#768390' },
                          children: '// Define a layout if needed',
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
                          style: { color: '#ADBAC7' },
                          children: '  pages: [] ',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#768390' },
                          children: '// Add pages',
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
        }),
        `
`,
        e.jsx(s.h3, { children: 'Adding a Layout' }),
        `
`,
        e.jsxs(n, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            e.jsx(n.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/app/app.layout.tsx',
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
                              children: ' React ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "react"',
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
                              children: ' { LayoutComponent, Outlet } ',
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
                              children: ' AppLayout',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: ' LayoutComponent',
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
                              children: '>',
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
                              children: '      <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'header',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>My Header</',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'header',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '      <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Outlet',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' />',
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
                              children: '      <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'footer',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>My Footer</',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'footer',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '    </',
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
                              children: 'AppLayout.path ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/"',
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
                              children: 'export',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ' default',
                            }),
                            e.jsx(s.span, {
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
            e.jsx(n.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/app/app.layout.jsx',
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
                              children: 'import',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' React ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "react"',
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
                              children: ' { Outlet } ',
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
                              children: ' AppLayout',
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
                              children: '>',
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
                              children: '      <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'header',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>My Header</',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'header',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '      <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Outlet',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' />',
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
                              children: '      <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'footer',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>My Footer</',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'footer',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '    </',
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
                              children: 'AppLayout.path ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/"',
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
                              children: 'export',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ' default',
                            }),
                            e.jsx(s.span, {
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
        e.jsx(s.h3, { children: 'Creating a Page' }),
        `
`,
        e.jsxs(n, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            e.jsx(n.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/app/home.page.tsx',
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
                              children: ' Home',
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
                              children: ' <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>Welcome to the Home Page</',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
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
                              children: 'Home.path ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/"',
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
                              children: 'Home.metadata ',
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
                              children: '"Home"',
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
                              children: '"Home Page"',
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
            e.jsx(n.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'javascript',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/app/home.page.jsx',
                  }),
                  e.jsx(s.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'javascript',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsxs(s.code, {
                      'data-line-numbers': '',
                      'data-language': 'javascript',
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
                              children: ' Home',
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
                              children: ' <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>Welcome to the Home Page</',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
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
                              children: 'Home.path ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/"',
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
                              children: 'Home.metadata ',
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
                              children: '"Home"',
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
                              children: '"Home Page"',
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
        e.jsx(s.h3, { children: 'Finalizing the Router' }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'Once you have set up your layout and pages, update your ',
            e.jsx(s.code, { children: 'app.router.ts' }),
            ' or ',
            e.jsx(s.code, { children: 'app.router.js' }),
            ' file:',
          ],
        }),
        `
`,
        e.jsxs(n, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            e.jsx(n.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'typescript',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/app/app.router.ts',
                  }),
                  e.jsx(s.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'typescript',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsxs(s.code, {
                      'data-line-numbers': '',
                      'data-language': 'typescript',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' AppLayout ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "./app.layout"',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' Home ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "./home.page"',
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
                              children: '  imports: []',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: ',',
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
                              style: { color: '#ADBAC7' },
                              children: '  layout: AppLayout',
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
                          'data-highlighted-line': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: '  pages: [Home]',
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
            }),
            e.jsx(n.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'javascript',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/app/app.router.js',
                  }),
                  e.jsx(s.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'javascript',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsxs(s.code, {
                      'data-line-numbers': '',
                      'data-language': 'javascript',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' AppLayout ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "./app.layout"',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' Home ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "./home.page"',
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
                              children: '  imports: []',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: ',',
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
                              style: { color: '#ADBAC7' },
                              children: '  layout: AppLayout',
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
                          'data-highlighted-line': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: '  pages: [Home]',
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
            }),
          ],
        }),
        `
`,
        e.jsx(s.h2, { children: 'Sub Routers' }),
        `
`,
        e.jsxs(s.p, {
          children: [
            e.jsx(s.code, { children: 'sub routers' }),
            ' are routers that are nested within another router. They are useful for creating modular and complex applications routing structure.',
          ],
        }),
        `
`,
        e.jsxs(s.p, {
          children: [
            "Let's take a situation where you want to create an application with a dashboard and an authentication section. You can create a ",
            e.jsx(s.code, { children: 'DashboardRouter' }),
            ' and an ',
            e.jsx(s.code, { children: 'AuthRouter' }),
            ' and nest them within the ',
            e.jsx(s.code, { children: 'AppRouter' }),
            '.',
          ],
        }),
        `
`,
        e.jsx(s.h3, { children: 'Creating a Sub Router' }),
        `
`,
        e.jsx(s.p, {
          children:
            'To create a sub router, you can just define a new router and import it into the parent router.',
        }),
        `
`,
        e.jsxs(s.figure, {
          'data-rehype-pretty-code-figure': '',
          children: [
            e.jsx(s.figcaption, {
              'data-rehype-pretty-code-title': '',
              'data-language': 'typescript',
              'data-theme': 'github-dark-dimmed',
              children: 'src/app/dashboard.router.ts',
            }),
            e.jsx(s.pre, {
              style: { backgroundColor: '#22272e', color: '#adbac7' },
              tabIndex: '0',
              'data-language': 'typescript',
              'data-theme': 'github-dark-dimmed',
              children: e.jsxs(s.code, {
                'data-line-numbers': '',
                'data-language': 'typescript',
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
                        children: ' DashboardRouter',
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
                        children: '  imports: []',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F69D50' },
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
                        children: '  layout: ',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#6CB6FF' },
                        children: 'null',
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
                      style: { color: '#ADBAC7' },
                      children: '  pages: []',
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
                        children: 'DashboardRouter',
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
        e.jsxs(s.figure, {
          'data-rehype-pretty-code-figure': '',
          children: [
            e.jsx(s.figcaption, {
              'data-rehype-pretty-code-title': '',
              'data-language': 'typescript',
              'data-theme': 'github-dark-dimmed',
              children: 'src/app/auth.router.ts',
            }),
            e.jsx(s.pre, {
              style: { backgroundColor: '#22272e', color: '#adbac7' },
              tabIndex: '0',
              'data-language': 'typescript',
              'data-theme': 'github-dark-dimmed',
              children: e.jsxs(s.code, {
                'data-line-numbers': '',
                'data-language': 'typescript',
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
                        children: ' AuthRouter',
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
                        children: '  import: []',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F69D50' },
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
                        children: '  layout: ',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#6CB6FF' },
                        children: 'null',
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
                      style: { color: '#ADBAC7' },
                      children: '  pages: []',
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
                        children: 'AuthRouter',
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
        e.jsx(s.h3, { children: 'Nesting Sub Routers' }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'To nest the sub routers within the parent router, import the sub routers into the parent router and add them to the ',
            e.jsx(s.code, { children: 'import' }),
            ' property.',
          ],
        }),
        `
`,
        e.jsxs(s.figure, {
          'data-rehype-pretty-code-figure': '',
          children: [
            e.jsx(s.figcaption, {
              'data-rehype-pretty-code-title': '',
              'data-language': 'typescript',
              'data-theme': 'github-dark-dimmed',
              children: 'src/app/app.router.ts',
            }),
            e.jsx(s.pre, {
              style: { backgroundColor: '#22272e', color: '#adbac7' },
              tabIndex: '0',
              'data-language': 'typescript',
              'data-theme': 'github-dark-dimmed',
              children: e.jsxs(s.code, {
                'data-line-numbers': '',
                'data-language': 'typescript',
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
                        children: ' AppLayout ',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F47067' },
                        children: 'from',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#96D0FF' },
                        children: ' "./app.layout"',
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
                        children: ' Home ',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F47067' },
                        children: 'from',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#96D0FF' },
                        children: ' "./home.page"',
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
                    'data-highlighted-line': '',
                    children: [
                      e.jsx(s.span, {
                        style: { color: '#F47067' },
                        children: 'import',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: ' DashboardRouter ',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F47067' },
                        children: 'from',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#96D0FF' },
                        children: ' "./dashboard.router"',
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
                    'data-highlighted-line': '',
                    children: [
                      e.jsx(s.span, {
                        style: { color: '#F47067' },
                        children: 'import',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: ' AuthRouter ',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F47067' },
                        children: 'from',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#96D0FF' },
                        children: ' "./auth.router"',
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
                    'data-highlighted-line': '',
                    children: [
                      e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: '  imports: [DashboardRouter, AuthRouter]',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F69D50' },
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
                        children: '  layout: AppLayout',
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
                      style: { color: '#ADBAC7' },
                      children: '  pages: [Home]',
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
            'Now you have two sub routers nested within the ',
            e.jsx(s.code, { children: 'AppRouter' }),
            '. These sub routers can have their own pages and layouts, making your application structure more modular and organized.',
          ],
        }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'By default, ',
            e.jsx(s.code, { children: 'sub routers' }),
            " inherit the layout of the parent router. However, you can specify whether or not a sub router should use the parent router's layout by setting the ",
            e.jsx(s.code, { children: 'useParentLayout' }),
            ' property to ',
            e.jsx(s.code, { children: 'true' }),
            ' or ',
            e.jsx(s.code, { children: 'false' }),
            '.',
          ],
        }),
        `
`,
        e.jsxs(s.figure, {
          'data-rehype-pretty-code-figure': '',
          children: [
            e.jsx(s.figcaption, {
              'data-rehype-pretty-code-title': '',
              'data-language': 'typescript',
              'data-theme': 'github-dark-dimmed',
              children: 'src/app/dashboard.router.ts',
            }),
            e.jsx(s.pre, {
              style: { backgroundColor: '#22272e', color: '#adbac7' },
              tabIndex: '0',
              'data-language': 'typescript',
              'data-theme': 'github-dark-dimmed',
              children: e.jsxs(s.code, {
                'data-line-numbers': '',
                'data-language': 'typescript',
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
                        children: ' DashboardRouter',
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
                        children: '  imports: []',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F69D50' },
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
                        children: '  layout: ',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#6CB6FF' },
                        children: 'null',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F69D50' },
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
                        children: '  pages: []',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F69D50' },
                        children: ',',
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
                        style: { color: '#ADBAC7' },
                        children: '  useParentLayout: ',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#6CB6FF' },
                        children: 'false',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#768390' },
                        children: ' // Do not use the parent layout',
                      }),
                    ],
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
                        children: 'DashboardRouter',
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
        `
`,
        e.jsx(i, {
          prev: {
            href: '/docs/routing/base-concepts',
            label: 'Routing - Base Concepts',
          },
          next: { href: '/docs/routing/routes', label: 'Routes' },
        }),
      ],
    })
  );
}
function r(l = {}) {
  const { wrapper: s } = l.components || {};
  return s ? e.jsx(s, { ...l, children: e.jsx(t, { ...l }) }) : t(l);
}
function o(l, s) {
  throw new Error(
    'Expected ' +
      (s ? 'component' : 'object') +
      ' `' +
      l +
      '` to be defined: you likely forgot to import, pass, or provide it.'
  );
}
const d = {
    path: '/router-configuration',
    metadata: {
      title: 'Router Configuration - Routing | Core concepts | Rasengan.js',
      description:
        'Learn how to configure routers in Rasengan.js, including setting up pages and layouts to structure your application effectively.',
    },
  },
  c = [
    {
      title: 'Understanding Routers in Rasengan.js',
      anchor: {
        id: 'understanding-routers-in-rasengan.js',
        text: 'Understanding Routers in Rasengan.js',
      },
      level: 2,
      children: [],
    },
    {
      title: 'Creating a Router',
      anchor: { id: 'creating-a-router', text: 'Creating a Router' },
      level: 2,
      children: [
        {
          title: 'Adding a Layout',
          anchor: { id: 'adding-a-layout', text: 'Adding a Layout' },
          level: 3,
        },
        {
          title: 'Creating a Page',
          anchor: { id: 'creating-a-page', text: 'Creating a Page' },
          level: 3,
        },
        {
          title: 'Finalizing the Router',
          anchor: {
            id: 'finalizing-the-router',
            text: 'Finalizing the Router',
          },
          level: 3,
        },
      ],
    },
    {
      title: 'Sub Routers',
      anchor: { id: 'sub-routers', text: 'Sub Routers' },
      level: 2,
      children: [
        {
          title: 'Creating a Sub Router',
          anchor: {
            id: 'creating-a-sub-router',
            text: 'Creating a Sub Router',
          },
          level: 3,
        },
        {
          title: 'Nesting Sub Routers',
          anchor: { id: 'nesting-sub-routers', text: 'Nesting Sub Routers' },
          level: 3,
        },
      ],
    },
  ];
r.metadata = d;
r.toc = c;
r.type = 'MDXPageComponent';
export { r as default };
