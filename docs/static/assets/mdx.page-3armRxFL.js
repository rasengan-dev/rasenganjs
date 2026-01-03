import { j as e } from './vendor-w5t4XTd4.js';
import { S as l } from './shared-components-DBceyN8p.js';
function r(s) {
  const n = {
    a: 'a',
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
    table: 'table',
    tbody: 'tbody',
    td: 'td',
    th: 'th',
    thead: 'thead',
    tr: 'tr',
    ul: 'ul',
    ...s.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        style: { fontSize: 12 },
        children: e.jsx(n.p, { children: 'PACKAGES' }),
      }),
      `
`,
      e.jsx(n.h1, { children: 'Rasengan MDX' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'The ',
          e.jsx(n.code, { children: '@rasenganjs/mdx' }),
          ' package allows you to use MDX (Markdown + JSX) files as pages in your Rasengan.js project. This enables you to write content using Markdown while embedding React components seamlessly.',
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'Installation' }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: 'Terminal',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: e.jsx(n.code, {
              'data-language': 'bash',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: e.jsxs(n.span, {
                'data-line': '',
                children: [
                  e.jsx(n.span, {
                    style: { color: '#F69D50' },
                    children: 'npm',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' install',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' @rasenganjs/mdx',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'Configuration' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Before you can use MDX pages in your Rasengan.js project, you need to configure the ',
          e.jsx(n.code, { children: 'mdx' }),
          ' plugin in your ',
          e.jsx(n.code, { children: 'rasengan.config.js' }),
          ' file.',
        ],
      }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'javascript',
            'data-theme': 'github-dark-dimmed',
            children: 'rasengan.config.js',
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
                      children: ' { defineConfig } ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: " 'rasengan'",
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
                      children: ' mdx ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: " '@rasenganjs/mdx/plugin'",
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
                      children: 'export',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: ' default',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: ' defineConfig',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: '({',
                    }),
                  ],
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '  vite: {',
                  }),
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '    plugins: [',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: 'mdx',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '()],',
                    }),
                  ],
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '  }',
                  }),
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
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
      e.jsx(n.h2, { children: 'Usage' }),
      `
`,
      e.jsx(n.h3, { children: 'From Markdown files to MDX Pages' }),
      `
`,
      e.jsx(n.p, {
        children:
          'Follow these steps to create an MDX page in your Rasengan.js project:',
      }),
      `
`,
      e.jsx(l, {
        step: '01',
        title: 'Create an MDX Page',
        content:
          '\n  Place an `.mdx` or `.md` file inside the `app` directory with the format `[name].page.mdx` or `[name].page.md`. For example, you can create a `blog.page.mdx` file with the following content:\n',
        children: e.jsxs(n.figure, {
          'data-rehype-pretty-code-figure': '',
          children: [
            e.jsx(n.figcaption, {
              'data-rehype-pretty-code-title': '',
              'data-language': 'mdx',
              'data-theme': 'github-dark-dimmed',
              children: 'blog.page.mdx',
            }),
            e.jsx(n.pre, {
              style: { backgroundColor: '#22272e', color: '#adbac7' },
              tabIndex: '0',
              'data-language': 'mdx',
              'data-theme': 'github-dark-dimmed',
              children: e.jsxs(n.code, {
                'data-language': 'mdx',
                'data-theme': 'github-dark-dimmed',
                style: { display: 'grid' },
                children: [
                  e.jsx(n.span, {
                    'data-line': '',
                    children: e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '---',
                    }),
                  }),
                  `
`,
                  e.jsxs(n.span, {
                    'data-line': '',
                    children: [
                      e.jsx(n.span, {
                        style: { color: '#8DDB8C' },
                        children: 'path',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: ': ',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#96D0FF' },
                        children: '/blog',
                      }),
                    ],
                  }),
                  `
`,
                  e.jsxs(n.span, {
                    'data-line': '',
                    children: [
                      e.jsx(n.span, {
                        style: { color: '#8DDB8C' },
                        children: 'metadata',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: ':',
                      }),
                    ],
                  }),
                  `
`,
                  e.jsxs(n.span, {
                    'data-line': '',
                    children: [
                      e.jsx(n.span, {
                        style: { color: '#8DDB8C' },
                        children: '  title',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: ': ',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#96D0FF' },
                        children: 'Blog Page',
                      }),
                    ],
                  }),
                  `
`,
                  e.jsxs(n.span, {
                    'data-line': '',
                    children: [
                      e.jsx(n.span, {
                        style: { color: '#8DDB8C' },
                        children: '  description',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: ': ',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#96D0FF' },
                        children: 'Discover our new blog posts',
                      }),
                    ],
                  }),
                  `
`,
                  e.jsx(n.span, {
                    'data-line': '',
                    children: e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '---',
                    }),
                  }),
                  `
`,
                  e.jsx(n.span, { 'data-line': '', children: ' ' }),
                  `
`,
                  e.jsx(n.span, {
                    'data-line': '',
                    children: e.jsx(n.span, {
                      style: { color: '#6CB6FF', fontWeight: 'bold' },
                      children: '# Blog Page',
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
                        children: 'This is a ',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#96D0FF' },
                        children: '`',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#6CB6FF' },
                        children: 'blog',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#96D0FF' },
                        children: '`',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: ' page.',
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
      e.jsx(l, {
        step: '02',
        title: 'Register the MDX Page in the Router',
        content: `
  Import the MDX page component you just created, then add it to your router configuration. For example:
`,
        children: e.jsxs(n.figure, {
          'data-rehype-pretty-code-figure': '',
          children: [
            e.jsx(n.figcaption, {
              'data-rehype-pretty-code-title': '',
              'data-language': 'typescript',
              'data-theme': 'github-dark-dimmed',
              children: 'app.router.ts',
            }),
            e.jsx(n.pre, {
              style: { backgroundColor: '#22272e', color: '#adbac7' },
              tabIndex: '0',
              'data-language': 'typescript',
              'data-theme': 'github-dark-dimmed',
              children: e.jsxs(n.code, {
                'data-line-numbers': '',
                'data-language': 'typescript',
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
                        children: " 'rasengan'",
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
                        children: " '@app/app.layout'",
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
                        children: ' Blog ',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: 'from',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#96D0FF' },
                        children: " '@app/blog.page.mdx'",
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
                        children: '  pages: [Blog]',
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
      }),
      `
`,
      e.jsx(l, {
        step: '03',
        title: 'Load the MDX Styles',
        content:
          '\n  To ensure proper styling for your MDX pages, import the CSS file from `@rasenganjs/mdx` in your `main.ts` file. For example:\n',
        children: e.jsxs(n.figure, {
          'data-rehype-pretty-code-figure': '',
          children: [
            e.jsx(n.figcaption, {
              'data-rehype-pretty-code-title': '',
              'data-language': 'typescript',
              'data-theme': 'github-dark-dimmed',
              children: 'main.ts',
            }),
            e.jsx(n.pre, {
              style: { backgroundColor: '#22272e', color: '#adbac7' },
              tabIndex: '0',
              'data-language': 'typescript',
              'data-theme': 'github-dark-dimmed',
              children: e.jsxs(n.code, {
                'data-line-numbers': '',
                'data-language': 'typescript',
                'data-theme': 'github-dark-dimmed',
                style: { display: 'grid' },
                'data-line-numbers-max-digits': '1',
                children: [
                  e.jsxs(n.span, {
                    'data-line': '',
                    'data-highlighted-line': '',
                    children: [
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: 'import',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#96D0FF' },
                        children: ' "@rasenganjs/mdx/css"',
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
                        children: ' { ',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: 'type',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: ' AppProps } ',
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
                        children: ' AppRouter ',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: 'from',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#96D0FF' },
                        children: ' "@/app/app.router"',
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
                        children: 'export',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: ' default',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: ' function',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#DCBDFB' },
                        children: ' App',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F69D50' },
                        children: '({ children, Component }',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: ':',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F69D50' },
                        children: ' AppProps) ',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: '{',
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
                        style: { color: '#F69D50' },
                        children: 'Component',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F69D50' },
                        children: ' router',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: '={',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F69D50' },
                        children: 'AppRouter',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: '}>{children}',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: '</',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: 'Component',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: '>',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: ';',
                      }),
                    ],
                  }),
                  `
`,
                  e.jsx(n.span, {
                    'data-line': '',
                    children: e.jsx(n.span, {
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
      `
`,
      e.jsx(l, {
        step: '04',
        title: 'Run the Project and Visit /blog',
        content: `
  Start your development server and navigate to the URL of the MDX page you created. For example:
`,
        children: e.jsxs(n.figure, {
          'data-rehype-pretty-code-figure': '',
          children: [
            e.jsx(n.figcaption, {
              'data-rehype-pretty-code-title': '',
              'data-language': 'bash',
              'data-theme': 'github-dark-dimmed',
              children: 'Terminal',
            }),
            e.jsx(n.pre, {
              style: { backgroundColor: '#22272e', color: '#adbac7' },
              tabIndex: '0',
              'data-language': 'bash',
              'data-theme': 'github-dark-dimmed',
              children: e.jsx(n.code, {
                'data-language': 'bash',
                'data-theme': 'github-dark-dimmed',
                style: { display: 'grid' },
                children: e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: 'npm',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: ' run',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: ' dev',
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
      }),
      `
`,
      e.jsx(n.h3, { children: 'From Markdown string to MDX Component' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'You can also use the ',
          e.jsx(n.code, { children: 'Markdown' }),
          ' component to render markdown content from a string. This is useful when you want to render dynamic content or when you need to render markdown content from an API response.',
        ],
      }),
      `
`,
      e.jsx(l, {
        step: '01',
        title: 'Load the MDX Styles',
        content:
          '\n  To ensure proper styling for your MDX pages, import the CSS file from `@rasenganjs/mdx` in your `main.ts` file. For example:\n',
        children: e.jsxs(n.figure, {
          'data-rehype-pretty-code-figure': '',
          children: [
            e.jsx(n.figcaption, {
              'data-rehype-pretty-code-title': '',
              'data-language': 'typescript',
              'data-theme': 'github-dark-dimmed',
              children: 'main.ts',
            }),
            e.jsx(n.pre, {
              style: { backgroundColor: '#22272e', color: '#adbac7' },
              tabIndex: '0',
              'data-language': 'typescript',
              'data-theme': 'github-dark-dimmed',
              children: e.jsxs(n.code, {
                'data-line-numbers': '',
                'data-language': 'typescript',
                'data-theme': 'github-dark-dimmed',
                style: { display: 'grid' },
                'data-line-numbers-max-digits': '1',
                children: [
                  e.jsxs(n.span, {
                    'data-line': '',
                    'data-highlighted-line': '',
                    children: [
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: 'import',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#96D0FF' },
                        children: ' "@rasenganjs/mdx/css"',
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
                        children: ' { ',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: 'type',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: ' AppProps } ',
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
                        children: ' AppRouter ',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: 'from',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#96D0FF' },
                        children: ' "@/app/app.router"',
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
                        children: 'export',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: ' default',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: ' function',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#DCBDFB' },
                        children: ' App',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F69D50' },
                        children: '({ children, Component }',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: ':',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F69D50' },
                        children: ' AppProps) ',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: '{',
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
                        style: { color: '#F69D50' },
                        children: 'Component',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F69D50' },
                        children: ' router',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: '={',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F69D50' },
                        children: 'AppRouter',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: '}>{children}',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: '</',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: 'Component',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: '>',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: ';',
                      }),
                    ],
                  }),
                  `
`,
                  e.jsx(n.span, {
                    'data-line': '',
                    children: e.jsx(n.span, {
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
      `
`,
      e.jsx(l, {
        step: '02',
        title: 'Create an MDX Component',
        content:
          '\n  Use the `Markdown` component from `@rasengan/mdx` to render markdown content from a string. For example:\n',
        children: e.jsxs(n.figure, {
          'data-rehype-pretty-code-figure': '',
          children: [
            e.jsx(n.figcaption, {
              'data-rehype-pretty-code-title': '',
              'data-language': 'tsx',
              'data-theme': 'github-dark-dimmed',
              children: 'MDX Component',
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
                    'data-highlighted-line': '',
                    children: [
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: 'import',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: ' { Markdown } ',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: 'from',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#96D0FF' },
                        children: " '@rasengan/mdx'",
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
                        style: { color: '#6CB6FF' },
                        children: ' mdContent',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: ' =',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#96D0FF' },
                        children: ' "# Hello, World!"',
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
                        children: 'const',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#DCBDFB' },
                        children: ' MyComponent',
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
                        children: ' <',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#8DDB8C' },
                        children: 'Markdown',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#6CB6FF' },
                        children: ' content',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: '={',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: 'mdContent',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: '}',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: ' />;',
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
      e.jsx(n.h2, { children: 'API' }),
      `
`,
      e.jsx(n.h3, { children: 'Markdown' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'The ',
          e.jsx(n.code, { children: 'Markdown' }),
          ' component is used to render markdown content from a string.',
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
            children: 'Markdown.tsx',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: e.jsx(n.code, {
              'data-language': 'tsx',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: e.jsxs(n.span, {
                'data-line': '',
                children: [
                  e.jsx(n.span, {
                    style: { color: '#F47067' },
                    children: 'import',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: ' { Markdown } ',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#F47067' },
                    children: 'from',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: " '@rasengan/mdx'",
                  }),
                  e.jsx(n.span, { style: { color: '#ADBAC7' }, children: ';' }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(n.h4, { children: 'Props' }),
      `
`,
      e.jsxs(n.table, {
        children: [
          e.jsx(n.thead, {
            children: e.jsxs(n.tr, {
              children: [
                e.jsx(n.th, { children: 'Name' }),
                e.jsx(n.th, { children: 'Type' }),
                e.jsx(n.th, { children: 'Description' }),
              ],
            }),
          }),
          e.jsxs(n.tbody, {
            children: [
              e.jsxs(n.tr, {
                children: [
                  e.jsx(n.td, { children: 'content' }),
                  e.jsx(n.td, { children: 'string' }),
                  e.jsx(n.td, { children: 'The markdown content to render.' }),
                ],
              }),
              e.jsxs(n.tr, {
                children: [
                  e.jsx(n.td, { children: 'className' }),
                  e.jsx(n.td, { children: 'string' }),
                  e.jsx(n.td, {
                    children:
                      'The class name to apply to the rendered markdown content.',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      `
`,
      e.jsx(n.h3, { children: 'mdx() Plugin' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'The ',
          e.jsx(n.code, { children: 'mdx()' }),
          ' plugin is used to enable MDX support in your Rasengan.js project.',
        ],
      }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'javascript',
            'data-theme': 'github-dark-dimmed',
            children: 'rasengan.config.js',
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
                      children: ' { defineConfig } ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: " 'rasengan'",
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
                      children: ' mdx ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: " '@rasengan/mdx/plugin'",
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
                      children: 'export',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: ' default',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: ' defineConfig',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: '({',
                    }),
                  ],
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '  vite: {',
                  }),
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '    plugins: [',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: 'mdx',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '()],',
                    }),
                  ],
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '  }',
                  }),
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
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
      `
`,
      e.jsx(n.h2, { children: 'Community' }),
      `
`,
      e.jsx(n.p, {
        children:
          'Join the Rasengan.js community to get support, ask questions, and share your projects:',
      }),
      `
`,
      e.jsxs(n.ul, {
        children: [
          `
`,
          e.jsxs(n.li, {
            children: [
              e.jsx('a', {
                href: 'https://github.com/rasengan-dev/rasenganjs/discussions',
                target: '_blank',
                rel: 'noopener noreferrer',
                children: 'GitHub Discussions',
              }),
              ' – Ask questions and share ideas.',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      `
`,
      e.jsxs(n.ul, {
        children: [
          `
`,
          e.jsxs(n.li, {
            children: [
              e.jsx('a', {
                href: 'https://x.com/rasenganjs',
                target: '_blank',
                rel: 'noopener noreferrer',
                children: 'X (Twitter)',
              }),
              ' – Stay updated with the latest news.',
            ],
          }),
          `
`,
          e.jsxs(n.li, {
            children: [
              e.jsx('a', {
                href: 'https://www.linkedin.com/company/rasenganjs/',
                target: '_blank',
                rel: 'noopener noreferrer',
                children: 'Linkedin',
              }),
              ' – Follow the company page.',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(n.p, {
        children: "Let's build something amazing with Rasengan.js! 🚀",
      }),
      `
`,
      e.jsx(n.h2, { children: 'License' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'This package is ',
          e.jsx(n.a, {
            href: 'https://github.com/rasengan-dev/rasenganjs/blob/main/LICENSE',
            children: 'MIT licensed',
          }),
          '.',
        ],
      }),
    ],
  });
}
function a(s = {}) {
  const { wrapper: n } = s.components || {};
  return n ? e.jsx(n, { ...s, children: e.jsx(r, { ...s }) }) : r(s);
}
const t = {
    path: '/mdx',
    metadata: {
      title: 'Rasengan MDX Package - Modules | Packages | Rasengan.js',
      description: 'Documentation for the Rasengan MDX package.',
    },
  },
  d = [
    {
      title: 'Installation',
      anchor: { id: 'installation', text: 'Installation' },
      level: 2,
      children: [],
    },
    {
      title: 'Configuration',
      anchor: { id: 'configuration', text: 'Configuration' },
      level: 2,
      children: [],
    },
    {
      title: 'Usage',
      anchor: { id: 'usage', text: 'Usage' },
      level: 2,
      children: [
        {
          title: 'From Markdown files to MDX Pages',
          anchor: {
            id: 'from-markdown-files-to-mdx-pages',
            text: 'From Markdown files to MDX Pages',
          },
          level: 3,
        },
        {
          title: 'From Markdown string to MDX Component',
          anchor: {
            id: 'from-markdown-string-to-mdx-component',
            text: 'From Markdown string to MDX Component',
          },
          level: 3,
        },
      ],
    },
    {
      title: 'API',
      anchor: { id: 'api', text: 'API' },
      level: 2,
      children: [
        {
          title: 'Markdown',
          anchor: { id: 'markdown', text: 'Markdown' },
          level: 3,
        },
        {
          title: 'mdx() Plugin',
          anchor: { id: 'mdx()-plugin', text: 'mdx() Plugin' },
          level: 3,
        },
      ],
    },
    {
      title: 'Community',
      anchor: { id: 'community', text: 'Community' },
      level: 2,
      children: [],
    },
    {
      title: 'License',
      anchor: { id: 'license', text: 'License' },
      level: 2,
      children: [],
    },
  ];
a.metadata = t;
a.toc = d;
a.type = 'MDXPageComponent';
export { a as default };
