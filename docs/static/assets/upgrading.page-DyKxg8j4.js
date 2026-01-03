import { j as e } from './vendor-w5t4XTd4.js';
import { S as l, P as t } from './shared-components-DBceyN8p.js';
function r(n) {
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
    ...n.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        children: e.jsx(s.p, { children: 'GETTING STARTED' }),
      }),
      `
`,
      e.jsx(s.h1, { children: 'Upgrading' }),
      `
`,
      e.jsx(s.h2, { children: 'Latest Stable version' }),
      `
`,
      e.jsx(s.p, {
        children:
          'To update to the latest version of Rasengan.js, you just have to run the following command:',
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
                    children: ' add',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' rasengan@latest',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Latest Beta version' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'To update to the latest ',
          e.jsx(s.code, { children: 'beta' }),
          ' version of Rasengan.js, you just have to run the following command:',
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
                    children: ' add',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' rasengan@beta',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Upgrade from 1.1.x to 1.2.x' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'If you want to improve the performance of your application — especially as it grows in size — upgrading to ',
          e.jsxs(s.strong, {
            children: ['version ', e.jsx(s.code, { children: '1.2.x' })],
          }),
          ' is a great choice.',
        ],
      }),
      `
`,
      e.jsx(s.p, { children: 'This version introduces two major features:' }),
      `
`,
      e.jsx(s.h3, { children: 'Lazy Loaded Routes' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Routes are now loaded ',
          e.jsx(s.strong, { children: 'on demand' }),
          `, based on the page the user is visiting.
This means your app only loads what it needs, when it needs it — which helps reduce initial load time and makes navigation feel faster.`,
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsx(s.p, {
        children:
          'Everything is handled automatically, there is no option to opt out this feature.',
      }),
      `
`,
      e.jsx(s.h3, { children: 'SSG (Static Site Generation)' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'You can now generate ',
          e.jsx(s.strong, { children: 'static HTML files' }),
          ` for your pages ahead of time.
This improves performance, SEO, and allows your site to be served extremely fast, without waiting for server responses or client-side rendering.`,
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(s.p, {
        children: [
          'The configuration is simple, inside the ',
          e.jsx(s.code, { children: 'rasengan.config.js' }),
          ' file, you just have to enable the ',
          e.jsx(s.code, { children: 'prerender' }),
          ' option.',
        ],
      }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'js',
            'data-theme': 'github-dark-dimmed',
            children: 'rasengan.config.js',
          }),
          e.jsx(s.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'js',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(s.code, {
              'data-language': 'js',
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
      e.jsx(s.p, {
        children:
          'This is the minimal configuration, it will enable the prerender globally into your application. If you prefer, you can select what you really want to prerender.',
      }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'js',
            'data-theme': 'github-dark-dimmed',
            children: 'rasengan.config.js',
          }),
          e.jsx(s.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'js',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(s.code, {
              'data-language': 'js',
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
      e.jsxs(s.p, {
        children: [
          'This approach is ideal for ',
          e.jsx(s.strong, { children: 'hybrid applications' }),
          ', where:',
        ],
      }),
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsx(s.li, { children: 'Public pages are statically generated' }),
          `
`,
          e.jsx(s.li, {
            children:
              'Authenticated or dynamic routes remain rendered via SSR or SPA',
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
      e.jsx(s.p, {
        children: 'So, to upgrade you have to follow the following steps:',
      }),
      `
`,
      e.jsx(l, {
        step: '01',
        title: 'Install the target dependency',
        content: `
  Run the following command to install the correct version of Rasengan.js
`,
        className: 'mt-8',
        children: e.jsxs(s.figure, {
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
                      children: ' add',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' rasengan@~1.2.0',
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
      e.jsxs(l, {
        step: '02',
        title: 'Remove AppRouter from main.tsx file',
        content: `
  Get off the AppRouter instance from the main.tsx, because it's not longer important there.
`,
        className: 'mt-8',
        children: [
          e.jsx(s.p, { children: 'Before' }),
          e.jsxs(s.figure, {
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
                  'data-language': 'tsx',
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
                          style: { color: '#96D0FF' },
                          children: " '@/styles/index.css'",
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
                      'data-highlighted-line': '',
                      children: [
                        e.jsx(s.span, {
                          style: { color: '#F47067' },
                          children: 'import',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#ADBAC7' },
                          children: ' ',
                        }),
                        e.jsx(s.mark, {
                          'data-highlighted-chars': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: 'AppRouter',
                          }),
                        }),
                        e.jsx(s.span, {
                          style: { color: '#ADBAC7' },
                          children: ' ',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#F47067' },
                          children: 'from',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: " '@/app/app.router'",
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
                          children: '({ Component, children }',
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
                          children: 'Component',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#6CB6FF' },
                          children: ' router',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#F47067' },
                          children: '={',
                        }),
                        e.jsx(s.mark, {
                          'data-highlighted-chars': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: 'AppRouter',
                          }),
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
                        e.jsx(s.span, {
                          style: { color: '#8DDB8C' },
                          children: 'Component',
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
          e.jsx(s.p, { children: 'After' }),
          e.jsxs(s.figure, {
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
                  'data-language': 'tsx',
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
                          style: { color: '#96D0FF' },
                          children: " '@/styles/index.css'",
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
                          children: '({ Component, children }',
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
                          children: 'Component',
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
                        e.jsx(s.span, {
                          style: { color: '#8DDB8C' },
                          children: 'Component',
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
        ],
      }),
      `
`,
      e.jsxs(l, {
        step: '03',
        title: 'Move the AppRouter to the index.ts file',
        content: `
  Now import the AppRouter instance into the index.ts file
`,
        className: 'mt-8',
        children: [
          e.jsx(s.p, { children: 'Before' }),
          e.jsxs(s.figure, {
            'data-rehype-pretty-code-figure': '',
            children: [
              e.jsx(s.figcaption, {
                'data-rehype-pretty-code-title': '',
                'data-language': 'ts',
                'data-theme': 'github-dark-dimmed',
                children: 'index.ts',
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
                          children: ' { renderApp } ',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#F47067' },
                          children: 'from',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: " 'rasengan/client'",
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
                          children: ' App ',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#F47067' },
                          children: 'from',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: " './main'",
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
                          style: { color: '#DCBDFB' },
                          children: 'renderApp',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#ADBAC7' },
                          children: '(App, { reactStrictMode: ',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#6CB6FF' },
                          children: 'true',
                        }),
                        e.jsx(s.span, {
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
          e.jsx(s.p, { children: 'After' }),
          e.jsxs(s.figure, {
            'data-rehype-pretty-code-figure': '',
            children: [
              e.jsx(s.figcaption, {
                'data-rehype-pretty-code-title': '',
                'data-language': 'ts',
                'data-theme': 'github-dark-dimmed',
                children: 'index.ts',
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
                          children: ' { renderApp } ',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#F47067' },
                          children: 'from',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: " 'rasengan/client'",
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
                          children: ' App ',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#F47067' },
                          children: 'from',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: " './main'",
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
                          children: ' ',
                        }),
                        e.jsx(s.mark, {
                          'data-highlighted-chars': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: 'AppRouter',
                          }),
                        }),
                        e.jsx(s.span, {
                          style: { color: '#ADBAC7' },
                          children: ' ',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#F47067' },
                          children: 'from',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: " '@/app/app.router'",
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
                          style: { color: '#DCBDFB' },
                          children: 'renderApp',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#ADBAC7' },
                          children: '(App, ',
                        }),
                        e.jsx(s.mark, {
                          'data-highlighted-chars': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: 'AppRouter',
                          }),
                        }),
                        e.jsx(s.span, {
                          style: { color: '#ADBAC7' },
                          children: ', { reactStrictMode: ',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#6CB6FF' },
                          children: 'true',
                        }),
                        e.jsx(s.span, {
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
        ],
      }),
      `
`,
      e.jsx(l, {
        step: '04',
        title: 'Start the dev server',
        content: `
  Then run the dev command to start the local server
`,
        className: 'mt-8',
        children: e.jsxs(s.figure, {
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
      e.jsx(t, {
        prev: {
          href: '/docs/getting-started/project-structure',
          label: 'Project Structure',
        },
        next: {
          href: '/docs/routing/base-concepts',
          label: 'Routing - Base Concepts',
        },
      }),
    ],
  });
}
function a(n = {}) {
  const { wrapper: s } = n.components || {};
  return s ? e.jsx(s, { ...n, children: e.jsx(r, { ...n }) }) : r(n);
}
const d = {
    path: '/upgrading',
    metadata: {
      title: 'Upgrading | Getting Started | Rasengan.js',
      description:
        'Upgrading to the latest version or a particular one is easy to do with Rasengan.js',
    },
  },
  i = [
    {
      title: 'Latest Stable version',
      anchor: { id: 'latest-stable-version', text: 'Latest Stable version' },
      level: 2,
      children: [],
    },
    {
      title: 'Latest Beta version',
      anchor: { id: 'latest-beta-version', text: 'Latest Beta version' },
      level: 2,
      children: [],
    },
    {
      title: 'Upgrade from 1.1.x to 1.2.x',
      anchor: {
        id: 'upgrade-from-1.1.x-to-1.2.x',
        text: 'Upgrade from 1.1.x to 1.2.x',
      },
      level: 2,
      children: [
        {
          title: 'Lazy Loaded Routes',
          anchor: { id: 'lazy-loaded-routes', text: 'Lazy Loaded Routes' },
          level: 3,
        },
        {
          title: 'SSG (Static Site Generation)',
          anchor: {
            id: 'ssg-(static-site-generation)',
            text: 'SSG (Static Site Generation)',
          },
          level: 3,
        },
      ],
    },
  ];
a.metadata = d;
a.toc = i;
a.type = 'MDXPageComponent';
export { a as default };
