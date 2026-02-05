import { j as e } from './vendor-CfbgIbdB.js';
import { A as a, P as t } from './shared-components-CkrC6jAk.js';
function r(n) {
  const s = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    li: 'li',
    ol: 'ol',
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
    ...n.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        children: e.jsx(s.p, { children: 'CORE CONCEPTS' }),
      }),
      `
`,
      e.jsx(s.h1, { children: 'Pre-rendering Mode (SSG)' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Introduced into the version ',
          e.jsx(s.code, { children: '1.2.0' }),
          ', the Pre-rendering mode, also known as ',
          e.jsx(s.strong, { children: 'Static Site Generation (SSG)' }),
          ', allows Rasengan.js to generate HTML pages ',
          e.jsx(s.strong, { children: 'ahead of time' }),
          `, during the build process.
Instead of rendering pages in the browser (SPA) or on the server at request time (SSR), Rasengan creates static HTML files that can be deployed anywhere—CDN, file storage, or any static hosting provider.`,
        ],
      }),
      `
`,
      e.jsx(s.p, { children: 'This results in:' }),
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'Faster load times' }),
              ' (no server needed to generate pages)',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'Better SEO' }),
              ', since pages are already rendered for search engines',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'More stability' }),
              ', because there’s no runtime server to fail',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'Lower hosting cost' }),
              ', as static hosting is usually cheaper',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'How It Works' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'When building your project, Rasengan.js scans specific routes and ',
          e.jsx(s.strong, { children: 'pre-renders them' }),
          ' into static ',
          e.jsx(s.code, { children: '.html' }),
          ` files.
These files represent your pages exactly as users will see them, without needing JavaScript to generate the initial view.`,
        ],
      }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'But to enable this feature, you have first to configure your ',
          e.jsx(s.code, { children: 'rasengan.config.js' }),
          ' file.',
        ],
      }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'ts',
            'data-theme': 'github-dark-dimmed',
            children: 'rasengan.config.js',
          }),
          e.jsx(s.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'ts',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(s.code, {
              'data-language': 'ts',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
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
                      children: ' { defineConfig } ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: " 'rasengan'",
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
                      children: ' { rasengan } ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: " 'rasengan/plugin'",
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
                      style: { color: '#DCBDFB' },
                      children: ' defineConfig',
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
                      children: '  prerender: ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: 'true',
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
                    children: '  vite: {',
                  }),
                }),
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '    plugins: [',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: 'rasengan',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '()],',
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
                      children: '  }',
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
                      style: { color: '#F69D50' },
                      children: '})',
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
          'Then run the ',
          e.jsx(s.code, { children: 'build' }),
          ' command.',
        ],
      }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: 'Terminal',
          }),
          e.jsx(s.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: e.jsx(s.code, {
              'data-language': 'bash',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#F69D50' },
                    children: 'pnpm',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' run',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' build',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(s.p, {
        children: 'After running the build, you’ll get a structure similar to:',
      }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'bash',
          'data-theme': 'github-dark-dimmed',
          children: e.jsxs(s.code, {
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: [
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#F69D50' },
                  children: '/static',
                }),
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#F69D50' },
                    children: '  ├─',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' index.html',
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
                    children: '  ├─',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' about/',
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
                    children: '  |',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F69D50' },
                    children: '  └─',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' index.html',
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
                    children: '  ├─',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' contact/',
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
                    children: '  |',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F69D50' },
                    children: '  └─',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' index.html',
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
                    children: '  └─',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' blog/',
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
                    children: '       └─',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' article-1/',
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
                    children: '          └─',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' index.html',
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      `
`,
      e.jsx(s.p, { children: 'Each file is a ready-to-serve static page.' }),
      `
`,
      e.jsx(a, {
        title: 'Info',
        description:
          'When the `prerender` is enabled, the production output is located into the `static` folder, instead of the `dist` one',
        status: 'info',
      }),
      `
`,
      e.jsx(s.h2, { children: 'Enabling SSG for a Route' }),
      `
`,
      e.jsx(s.p, {
        children:
          'To mark a route for static generation, simply specify the exact route or a generic one to match a set of routes:',
      }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'ts',
            'data-theme': 'github-dark-dimmed',
            children: 'rasengan.config.js',
          }),
          e.jsx(s.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'ts',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(s.code, {
              'data-language': 'ts',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
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
                      children: ' { defineConfig } ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: " 'rasengan'",
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
                      children: ' { rasengan } ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: " 'rasengan/plugin'",
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
                      style: { color: '#DCBDFB' },
                      children: ' defineConfig',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: '({',
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
                    children: '  prerender: {',
                  }),
                }),
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '    routes: [',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: "'/'",
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: "'blog/**'",
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '],',
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
                      children: '  }',
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
                    children: '  vite: {',
                  }),
                }),
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '    plugins: [',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: 'rasengan',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '()],',
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
                      children: '  }',
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
                      style: { color: '#F69D50' },
                      children: '})',
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
      e.jsx(s.p, {
        children:
          'Rasengan.js will detect this and include them in the pre-rendering process automatically.',
      }),
      `
`,
      e.jsx(s.h2, { children: 'Fetching Data Before Rendering' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'If your page depends on data (like a blog post, product list, or API call), use ',
          e.jsx(s.code, { children: 'loader' }),
          ' to provide data ',
          e.jsx(s.strong, { children: 'at build time' }),
          ':',
        ],
      }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'jsx',
            'data-theme': 'github-dark-dimmed',
            children: 'blog.page.jsx',
          }),
          e.jsx(s.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'jsx',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(s.code, {
              'data-language': 'jsx',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: [
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#768390' },
                    children: '// src/app/_routes/blog.page.jsx => blog.html',
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
                      style: { color: '#F47067' },
                      children: ' function',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: ' Blog',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: '({ posts }) ',
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
                      children: 'ul',
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
                      style: { color: '#F47067' },
                      children: '      {',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'posts.',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: 'map',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'post',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' =>',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' <',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#8DDB8C' },
                      children: 'li',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' key',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'post.id',
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
                      children: 'post.title',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '</',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#8DDB8C' },
                      children: 'li',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '>)',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
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
                      children: 'ul',
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
                    children: '}',
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
                      children: 'Blog.',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: 'loader',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' async',
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
                      children: '  const',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' posts',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' await',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: ' fetch',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '"https://api.example.com/posts"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ').',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: 'then',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'res',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' =>',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' res.',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: 'json',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '());',
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
                      children: ' { props: { posts } };',
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
      `
`,
      e.jsxs(s.p, {
        children: [
          'The data is fetched ',
          e.jsx(s.strong, { children: 'once during build' }),
          ', and the generated HTML ships with the content already rendered.',
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Pre-rendering Dynamic Routes' }),
      `
`,
      e.jsx(s.p, {
        children: `In Rasengan.js, you can statically generate pages that depend on dynamic parameters (like usernames, slugs, or product IDs).
This is useful for pages such as:`,
      }),
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsxs(s.li, {
            children: [
              'User profiles (',
              e.jsx(s.code, { children: '/users/:username' }),
              ')',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              'Blog posts (',
              e.jsx(s.code, { children: '/blog/:slug' }),
              ')',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              'Product pages (',
              e.jsx(s.code, { children: '/products/:id' }),
              ')',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Instead of generating these pages when the user visits them, Rasengan.js creates the HTML files ',
          e.jsx(s.strong, { children: 'during the build' }),
          ', one for each parameter.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsx(s.p, { children: 'To pre-render dynamic routes, you need to:' }),
      `
`,
      e.jsxs(s.ol, {
        children: [
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'Use a dynamic parameter' }),
              ` in your page route
(for example: `,
              e.jsx(s.code, {
                children: 'src/app/_routes/users/[username].page.tsx',
              }),
              ')',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'Return a list of paths' }),
              ' to generate using ',
              e.jsx(s.code, { children: 'generatePaths' }),
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, {
                children: 'Access the parameter in the component',
              }),
              ' with ',
              e.jsx(s.code, { children: 'useParams()' }),
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(s.h3, { children: 'Example: User Profile Pages' }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'tsx',
          'data-theme': 'github-dark-dimmed',
          children: e.jsxs(s.code, {
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: [
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#768390' },
                  children: '// src/app/_routes/users/[username].page.tsx',
                }),
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
                    children:
                      ' { PageComponent, useParams, defineStaticPaths } ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: 'from',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' "rasengan"',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: ';' }),
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
                    children: ' Page',
                  }),
                  e.jsx(s.span, { style: { color: '#F47067' }, children: ':' }),
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
                    children: '	const',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' { ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: 'username',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' } ',
                  }),
                  e.jsx(s.span, { style: { color: '#F47067' }, children: '=' }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: ' useParams',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '();',
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
                    children: '	return',
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
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '		<' }),
                  e.jsx(s.span, {
                    style: { color: '#8DDB8C' },
                    children: 'section',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: ' className',
                  }),
                  e.jsx(s.span, { style: { color: '#F47067' }, children: '=' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children:
                      "'w-screen h-screen bg-red-300 flex justify-center items-center'",
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '>' }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '			Hello ',
                  }),
                  e.jsx(s.span, { style: { color: '#F47067' }, children: '{' }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: 'username',
                  }),
                  e.jsx(s.span, { style: { color: '#F47067' }, children: '}' }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '		</',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#8DDB8C' },
                    children: 'section',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '>' }),
                ],
              }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#ADBAC7' },
                  children: '	);',
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
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#768390' },
                  children:
                    '// List of dynamic values to pre-render at build time',
                }),
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: 'Page.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'generatePaths',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: ' =',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: ' async',
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
                    children: '	return',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: ' defineStaticPaths',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '([',
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
                    children: '		{ username: ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '"nina"',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' },',
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
                    children: '		{ username: ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '"dilane3"',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' },',
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
                    children: '		{ username: ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '"michel"',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' },',
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
                    children: '		{ username: ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '"adora"',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' },',
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
                    children: '		{ username: ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '"donald"',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' },',
                  }),
                ],
              }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#ADBAC7' },
                  children: '	]);',
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
                    style: { color: '#F47067' },
                    children: 'export',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: ' default',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' Page;',
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      `
`,
      e.jsx(s.h3, { children: 'What Rasengan.js Generates' }),
      `
`,
      e.jsx(s.p, {
        children:
          'After running the build, Rasengan.js will create one page for each username:',
      }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'yml',
          'data-theme': 'github-dark-dimmed',
          children: e.jsxs(s.code, {
            'data-language': 'yml',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: [
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#96D0FF' },
                  children: '/static/users/nina/index.html',
                }),
              }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#96D0FF' },
                  children: '/static/users/dilane3/index.html',
                }),
              }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#96D0FF' },
                  children: '/static/users/michel/index.html',
                }),
              }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#96D0FF' },
                  children: '/static/users/adora/index.html',
                }),
              }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#96D0FF' },
                  children: '/static/users/donald/index.html',
                }),
              }),
            ],
          }),
        }),
      }),
      `
`,
      e.jsx(s.p, {
        children: 'Each page is fully static and ready to be served.',
      }),
      `
`,
      e.jsx(s.h2, { children: 'How to preview the static pages' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'To preview the static pages, you have first to run the ',
          e.jsx(s.code, { children: 'build' }),
          ' command.',
        ],
      }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: 'Terminal',
          }),
          e.jsx(s.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: e.jsx(s.code, {
              'data-language': 'bash',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#F69D50' },
                    children: 'pnpm',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' run',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' build',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Then, you need to add a new script into your ',
          e.jsx(s.code, { children: 'package.json' }),
          ' file or just updating the actual ',
          e.jsx(s.code, { children: 'serve' }),
          ' command in order to consider the new ',
          e.jsx(s.code, { children: 'static' }),
          ` folder as the production output.
You will always need to use `,
          e.jsx(s.code, { children: 'rasengan-serve' }),
          ' CLI coming from ',
          e.jsx(s.code, { children: '@rasenganjs/serve' }),
          " adapter to achieve this. It's the same adapter used to preview ",
          e.jsx(s.code, { children: 'SPA' }),
          ' and ',
          e.jsx(s.code, { children: 'SSR' }),
          ' apps in Rasengan.js.',
        ],
      }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'json',
            'data-theme': 'github-dark-dimmed',
            children: 'package.json',
          }),
          e.jsx(s.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'json',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(s.code, {
              'data-language': 'json',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: [
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '{',
                  }),
                }),
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#8DDB8C' },
                      children: '  "scripts"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ': {',
                    }),
                  ],
                }),
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#8DDB8C' },
                      children: '    "serve"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ': ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '"rasengan-serve ./static"',
                    }),
                  ],
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '  }',
                  }),
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
      `
`,
      e.jsxs(s.p, {
        children: [
          'Finally, running ',
          e.jsx(s.code, { children: 'pnpm run serve' }),
          ' will start the server and you can preview your static pages.',
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'When to Use Pre-rendering' }),
      `
`,
      e.jsxs(s.table, {
        children: [
          e.jsx(s.thead, {
            children: e.jsxs(s.tr, {
              children: [
                e.jsx(s.th, { children: 'Scenario' }),
                e.jsx(s.th, { children: 'Recommended?' }),
              ],
            }),
          }),
          e.jsxs(s.tbody, {
            children: [
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: 'Marketing pages (Landing, About, Contact)',
                  }),
                  e.jsx(s.td, { children: '✅ Yes' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, { children: 'Blogs / Documentation' }),
                  e.jsx(s.td, { children: '✅ Yes' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, { children: 'Content that rarely changes' }),
                  e.jsx(s.td, { children: '✅ Yes' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children:
                      'Dashboard, authenticated routes, user-specific pages',
                  }),
                  e.jsx(s.td, { children: '❌ No (use CSR or SSR)' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: 'Real-time data (prices, live feeds, dashboards)',
                  }),
                  e.jsx(s.td, { children: '⚠️ Not ideal' }),
                ],
              }),
            ],
          }),
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Key Benefits' }),
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'Instant page load' }),
              ' → no waiting for rendering',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'SEO-friendly' }),
              ' → content is visible immediately',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'Scales automatically' }),
              ' → no server load per request',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'Deploy anywhere' }),
              ' → Netlify, Vercel, S3, GitHub Pages, etc.',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(t, {
        prev: { href: '/docs/rendering/csr', label: 'Client-Side Rendering' },
        next: { href: '/docs/styling/css-modules', label: 'CSS Modules' },
      }),
    ],
  });
}
function l(n = {}) {
  const { wrapper: s } = n.components || {};
  return s ? e.jsx(s, { ...n, children: e.jsx(r, { ...n }) }) : r(n);
}
const i = {
    path: '/prerendering',
    metadata: {
      title: 'Prerendering - Rendering | Core concepts | Rasengan.js',
      description: null,
    },
  },
  d = [
    {
      title: 'How It Works',
      anchor: { id: 'how-it-works', text: 'How It Works' },
      level: 2,
      children: [],
    },
    {
      title: 'Enabling SSG for a Route',
      anchor: {
        id: 'enabling-ssg-for-a-route',
        text: 'Enabling SSG for a Route',
      },
      level: 2,
      children: [],
    },
    {
      title: 'Fetching Data Before Rendering',
      anchor: {
        id: 'fetching-data-before-rendering',
        text: 'Fetching Data Before Rendering',
      },
      level: 2,
      children: [],
    },
    {
      title: 'Pre-rendering Dynamic Routes',
      anchor: {
        id: 'pre-rendering-dynamic-routes',
        text: 'Pre-rendering Dynamic Routes',
      },
      level: 2,
      children: [
        {
          title: 'Example: User Profile Pages',
          anchor: {
            id: 'example:-user-profile-pages',
            text: 'Example: User Profile Pages',
          },
          level: 3,
        },
        {
          title: 'What Rasengan.js Generates',
          anchor: {
            id: 'what-rasengan.js-generates',
            text: 'What Rasengan.js Generates',
          },
          level: 3,
        },
      ],
    },
    {
      title: 'How to preview the static pages',
      anchor: {
        id: 'how-to-preview-the-static-pages',
        text: 'How to preview the static pages',
      },
      level: 2,
      children: [],
    },
    {
      title: 'When to Use Pre-rendering',
      anchor: {
        id: 'when-to-use-pre-rendering',
        text: 'When to Use Pre-rendering',
      },
      level: 2,
      children: [],
    },
    {
      title: 'Key Benefits',
      anchor: { id: 'key-benefits', text: 'Key Benefits' },
      level: 2,
      children: [],
    },
  ];
l.metadata = i;
l.toc = d;
l.type = 'MDXPageComponent';
export { l as default };
