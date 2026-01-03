import { j as e } from './vendor-w5t4XTd4.js';
import { A as l, P as a } from './shared-components-DBceyN8p.js';
function t(n) {
  const s = {
    blockquote: 'blockquote',
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
      e.jsx(s.h1, { children: 'File-Based Routing in Rasengan.js' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Rasengan.js introduces a powerful and intuitive ',
          e.jsx(s.strong, { children: 'file-based routing system' }),
          ', inspired by modern frameworks but tailored to its own conventions.',
        ],
      }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'All route definitions live inside the special folder: ',
          e.jsx(s.code, { children: 'app/_routes/' }),
        ],
      }),
      `
`,
      e.jsx(s.p, {
        children:
          'The file and folder structure under this directory determines your app’s routing automatically.',
      }),
      `
`,
      e.jsx(s.h2, { children: 'Directory Structure Example' }),
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
                  children: 'app/',
                }),
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#F69D50' },
                    children: '├──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' _routes/',
                  }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   ├──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' index.page.tsx',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#768390' },
                    children: '             # → /',
                  }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   ├──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' home.page.tsx',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#768390' },
                    children: '              # → /home',
                  }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   ├──',
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
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   │',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   ├──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' layout.tsx',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#768390' },
                    children: '             # Layout for /about/*',
                  }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   │',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   └──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' index.page.tsx',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#768390' },
                    children: '         # → /about',
                  }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   ├──',
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
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   │',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   ├──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' index.page.tsx',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#768390' },
                    children: '         # → /blog',
                  }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   │',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   ├──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' [id].page.tsx          ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#768390' },
                    children: '# → /blog/:id',
                  }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   │',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   └──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' [slug]/',
                  }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   │',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '       └──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' index.page.tsx',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#768390' },
                    children: '     # → /blog/:slug',
                  }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   ├──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' _settings/',
                  }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   │',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   └──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' index.page.tsx',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#768390' },
                    children: '         # → /, /settings',
                  }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   └──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' [_locale]/',
                  }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '       └──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' home.page.tsx',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#768390' },
                    children: '          # → /home, /en/home, /fr/home, etc.',
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
                    children: '└──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' app.router.ts',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#768390' },
                    children:
                      '                  # Entry point to register the routes',
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      `
`,
      e.jsxs(s.blockquote, {
        children: [
          `
`,
          e.jsxs(s.p, {
            children: [
              'Note: The ',
              e.jsx(s.code, { children: 'app.router.ts' }),
              ' file is the entry point to register the routes.',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Router' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'The file-based routing system in Rasengan.js automatically generates a ',
          e.jsx(s.code, { children: 'Router' }),
          ' component based on your folder and file structure.',
        ],
      }),
      `
`,
      e.jsx(s.p, {
        children:
          'To integrate this generated router into your app, create a file at:',
      }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'txt',
          'data-theme': 'github-dark-dimmed',
          children: e.jsx(s.code, {
            'data-language': 'txt',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: e.jsx(s.span, {
              'data-line': '',
              children: e.jsx(s.span, { children: 'src/app/app.router.ts' }),
            }),
          }),
        }),
      }),
      `
`,
      e.jsx(l, {
        title: 'Warning',
        description:
          '`app.router.ts` is a required file, you have to place it at the src/app/ folder.',
        status: 'warning',
      }),
      `
`,
      e.jsx(s.p, { children: 'And add the following:' }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'src/app/app.router.ts',
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
                      children: ' Router ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: " 'virtual:rasengan/router'",
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
                      children: '  imports: [Router]',
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
      e.jsx(s.h3, { children: 'How It Works' }),
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsxs(s.li, {
            children: [
              'Rasengan.js exposes a virtual module named ',
              e.jsx(s.code, { children: 'virtual:rasengan/router' }),
              '.',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              'This module automatically includes all pages, layouts, and routes defined in ',
              e.jsx(s.code, { children: '/app/_routes' }),
              '.',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              'You simply import it and inject it into your ',
              e.jsx(s.code, { children: 'AppRouter' }),
              ' using the ',
              e.jsx(s.code, { children: 'defineRouter' }),
              ' helper.',
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
          'This setup ensures that your routing configuration stays fully synchronized with your file structure — ',
          e.jsx(s.strong, { children: 'no manual registration required' }),
          '.',
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Pages' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Every file ending with ',
          e.jsx(s.code, { children: '.page.tsx' }),
          ' defines a route.',
        ],
      }),
      `
`,
      e.jsx(s.h3, { children: 'Naming Convention' }),
      `
`,
      e.jsxs(s.table, {
        children: [
          e.jsx(s.thead, {
            children: e.jsxs(s.tr, {
              children: [
                e.jsx(s.th, { children: 'File Name' }),
                e.jsx(s.th, { children: 'Route Path' }),
                e.jsx(s.th, { children: 'Description' }),
              ],
            }),
          }),
          e.jsxs(s.tbody, {
            children: [
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'index.page.tsx' }),
                  }),
                  e.jsx(s.td, { children: e.jsx(s.code, { children: '/' }) }),
                  e.jsx(s.td, { children: 'Index route' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'home.page.tsx' }),
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: '/home' }),
                  }),
                  e.jsx(s.td, { children: 'Normal route' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, {
                      children: 'about/index.page.tsx',
                    }),
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: '/about' }),
                  }),
                  e.jsxs(s.td, {
                    children: [
                      'Index route in ',
                      e.jsx(s.code, { children: 'about' }),
                      ' folder',
                    ],
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, {
                      children: 'blog/index.page.tsx',
                    }),
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: '/blog' }),
                  }),
                  e.jsxs(s.td, {
                    children: [
                      'Index route in ',
                      e.jsx(s.code, { children: 'blog' }),
                      ' folder',
                    ],
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'blog/[id].page.tsx' }),
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: '/blog/:id' }),
                  }),
                  e.jsx(s.td, { children: 'Dynamic route on file page' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, {
                      children: 'blog/[_slug].page.tsx',
                    }),
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: '/blog/:slug?' }),
                  }),
                  e.jsx(s.td, {
                    children: 'Optional dynamic route on file page',
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, {
                      children: '[_locale]/home.page.tsx',
                    }),
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: '/:locale?/home' }),
                  }),
                  e.jsx(s.td, { children: 'Optional dynamic route on folder' }),
                ],
              }),
            ],
          }),
        ],
      }),
      `
`,
      e.jsxs(s.blockquote, {
        children: [
          `
`,
          e.jsxs(s.p, {
            children: [
              '🖱 Only files located in ',
              e.jsx(s.code, { children: 'app/_routes/' }),
              ' are considered valid route definitions.',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(s.p, {
        children:
          'Page components have to be exported as default in order to be registered as routes.',
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
            children: 'src/app/_routes/home.page.tsx',
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
                      children: '>Home Page</',
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
      `
`,
      e.jsx(l, {
        title: 'Page Component',
        description:
          "Don't define `path` manually onto the page definition, because it's directly extracted from the file and folder structure.",
        status: 'info',
      }),
      `
`,
      e.jsx(s.h2, { children: 'Layouts' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Use ',
          e.jsx(s.code, { children: 'layout.tsx' }),
          ' files to define reusable structures (headers, sidebars, wrappers, etc.). A layout wraps all the routes inside its folder unless overridden by a deeper layout.',
        ],
      }),
      `
`,
      e.jsx(s.h3, { children: 'File Structure' }),
      `
`,
      e.jsx(s.p, {
        children:
          'pages located at the same level of the layout or deeper will be wrapped by the layout.',
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
                  children: 'app/',
                }),
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#F69D50' },
                    children: '├──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' _routes/',
                  }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   ├──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' layout.tsx',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#768390' },
                    children: '                 # Root Layout for all pages',
                  }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   ├──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' index.page.tsx',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#768390' },
                    children: '             # → /',
                  }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   ├──',
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
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   │',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   ├──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' layout.tsx',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#768390' },
                    children: '             # Layout for /about/*',
                  }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   │',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   └──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' index.page.tsx',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#768390' },
                    children: '         # → /about',
                  }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '   └──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' [_locale]/',
                  }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '       ├──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' layout.tsx',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#768390' },
                    children: '             # Layout for /:locale?/*',
                  }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: '│' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '       └──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' home.page.tsx',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#768390' },
                    children: '          # → /home, /en/home, /fr/home, etc.',
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
                    children: '└──',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' app.router.ts',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#768390' },
                    children:
                      '                  # Entry point to register the routes',
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'From this file structure, the ',
          e.jsx(s.code, { children: 'app/_routes/about/index.page.tsx' }),
          ' will be wrapped by the ',
          e.jsx(s.code, { children: 'app/_routes/about/layout.tsx' }),
          ' and the ',
          e.jsx(s.code, { children: 'app/_routes/layout.tsx' }),
          '.',
        ],
      }),
      `
`,
      e.jsx(s.h3, { children: 'Layout Component' }),
      `
`,
      e.jsx(s.p, {
        children:
          'The Layout Component has the be exported by default in order to be registered as a layout.',
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
            children: 'src/app/_routes/layout.tsx',
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
                      children: ' /> ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '{',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#768390' },
                      children: '/* Renders the current page */',
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
      `
`,
      e.jsxs(s.table, {
        children: [
          e.jsx(s.thead, {
            children: e.jsxs(s.tr, {
              children: [
                e.jsx(s.th, { children: 'Layout Path' }),
                e.jsx(s.th, { children: 'Applies To' }),
              ],
            }),
          }),
          e.jsxs(s.tbody, {
            children: [
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, {
                      children: 'app/_routes/layout.tsx',
                    }),
                  }),
                  e.jsx(s.td, { children: 'All routes' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, {
                      children: 'app/_routes/about/layout.tsx',
                    }),
                  }),
                  e.jsxs(s.td, {
                    children: [
                      'Routes under ',
                      e.jsx(s.code, { children: '/about' }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      `
`,
      e.jsx(l, {
        title: 'Path Definition',
        description:
          "When using `file based routing`, you don't need to define `path` manually onto the page and layout definition, because it's directly extracted from the file and folder structure.",
        status: 'info',
      }),
      `
`,
      e.jsx(s.h2, { children: 'Dynamic Routes' }),
      `
`,
      e.jsx(s.p, {
        children:
          'To create dynamic routes, wrap folder names in square brackets:',
      }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'txt',
          'data-theme': 'github-dark-dimmed',
          children: e.jsxs(s.code, {
            'data-language': 'txt',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: [
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  children:
                    'app/_routes/blog/[slug]/index.page.tsx → /blog/:slug',
                }),
              }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, { children: 'or' }),
              }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  children: 'app/_routes/blog/[slug].page.tsx → /blog/:slug',
                }),
              }),
            ],
          }),
        }),
      }),
      `
`,
      e.jsx(s.p, { children: 'You can access dynamic params using:' }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'tsx',
          'data-theme': 'github-dark-dimmed',
          children: e.jsx(s.code, {
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: e.jsxs(s.span, {
              'data-line': '',
              children: [
                e.jsx(s.span, {
                  style: { color: '#F47067' },
                  children: 'const',
                }),
                e.jsx(s.span, { style: { color: '#ADBAC7' }, children: ' { ' }),
                e.jsx(s.span, {
                  style: { color: '#6CB6FF' },
                  children: 'slug',
                }),
                e.jsx(s.span, { style: { color: '#ADBAC7' }, children: ' } ' }),
                e.jsx(s.span, { style: { color: '#F47067' }, children: '=' }),
                e.jsx(s.span, {
                  style: { color: '#DCBDFB' },
                  children: ' useParams',
                }),
                e.jsx(s.span, {
                  style: { color: '#ADBAC7' },
                  children: '(); ',
                }),
                e.jsx(s.span, {
                  style: { color: '#768390' },
                  children: '// Rasengan.js core hook',
                }),
              ],
            }),
          }),
        }),
      }),
      `
`,
      e.jsx(s.h2, { children: 'Optional Segments' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Rasengan.js supports optional ',
          e.jsx(s.strong, { children: 'static' }),
          ' and ',
          e.jsx(s.strong, { children: 'dynamic' }),
          ' segments using the underscore (',
          e.jsx(s.code, { children: '_' }),
          ') prefix.',
        ],
      }),
      `
`,
      e.jsx(s.h3, { children: 'Optional Static Segments' }),
      `
`,
      e.jsx(s.p, {
        children:
          'To create a route that optionally includes a folder, prefix it with an underscore:',
      }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'txt',
          'data-theme': 'github-dark-dimmed',
          children: e.jsx(s.code, {
            'data-language': 'txt',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: e.jsx(s.span, {
              'data-line': '',
              children: e.jsx(s.span, {
                children: 'app/_routes/_settings/index.page.tsx',
              }),
            }),
          }),
        }),
      }),
      `
`,
      e.jsx(s.p, { children: 'Routes matched:' }),
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsx(s.li, { children: e.jsx(s.code, { children: '/' }) }),
          `
`,
          e.jsx(s.li, { children: e.jsx(s.code, { children: '/settings' }) }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(s.h3, { children: 'Optional Dynamic Segments' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Wrap the param in brackets and prefix with ',
          e.jsx(s.code, { children: '_' }),
          ' to make it optional:',
        ],
      }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'txt',
          'data-theme': 'github-dark-dimmed',
          children: e.jsx(s.code, {
            'data-language': 'txt',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: e.jsx(s.span, {
              'data-line': '',
              children: e.jsx(s.span, {
                children: 'app/_routes/[_locale]/home.page.tsx',
              }),
            }),
          }),
        }),
      }),
      `
`,
      e.jsx(s.p, { children: 'Routes matched:' }),
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsx(s.li, { children: e.jsx(s.code, { children: '/home' }) }),
          `
`,
          e.jsx(s.li, { children: e.jsx(s.code, { children: '/en/home' }) }),
          `
`,
          e.jsx(s.li, { children: e.jsx(s.code, { children: '/fr/home' }) }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(s.p, { children: 'Inside the component:' }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'tsx',
          'data-theme': 'github-dark-dimmed',
          children: e.jsx(s.code, {
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: e.jsxs(s.span, {
              'data-line': '',
              children: [
                e.jsx(s.span, {
                  style: { color: '#F47067' },
                  children: 'const',
                }),
                e.jsx(s.span, { style: { color: '#ADBAC7' }, children: ' { ' }),
                e.jsx(s.span, {
                  style: { color: '#6CB6FF' },
                  children: 'locale',
                }),
                e.jsx(s.span, { style: { color: '#ADBAC7' }, children: ' } ' }),
                e.jsx(s.span, { style: { color: '#F47067' }, children: '=' }),
                e.jsx(s.span, {
                  style: { color: '#DCBDFB' },
                  children: ' useParams',
                }),
                e.jsx(s.span, {
                  style: { color: '#ADBAC7' },
                  children: '(); ',
                }),
                e.jsx(s.span, {
                  style: { color: '#768390' },
                  children: '// Might be undefined',
                }),
              ],
            }),
          }),
        }),
      }),
      `
`,
      e.jsx(s.h2, { children: 'Nested Routes' }),
      `
`,
      e.jsx(s.p, {
        children: 'You can create deeply nested routes by nesting folders:',
      }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'txt',
          'data-theme': 'github-dark-dimmed',
          children: e.jsx(s.code, {
            'data-language': 'txt',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: e.jsx(s.span, {
              'data-line': '',
              children: e.jsx(s.span, {
                children:
                  'app/_routes/dashboard/settings/index.page.tsx → /dashboard/settings',
              }),
            }),
          }),
        }),
      }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'If you include a ',
          e.jsx(s.code, { children: 'layout.tsx' }),
          ' in ',
          e.jsx(s.code, { children: 'dashboard/' }),
          ', it will wrap both ',
          e.jsx(s.code, { children: '/dashboard' }),
          ' and ',
          e.jsx(s.code, { children: '/dashboard/settings' }),
          '.',
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Grouping Routes' }),
      `
`,
      e.jsx(s.h3, { children: 'What is a Route Group?' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'A ',
          e.jsx(s.strong, { children: 'route group' }),
          ' is a ',
          e.jsx(s.strong, {
            children: 'folder used for organizational purposes only',
          }),
          '. It helps structure your codebase without affecting the actual URL path.',
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
              'It’s enclosed in parentheses: ',
              e.jsx(s.code, { children: '(groupName)' }),
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              'It does ',
              e.jsx(s.strong, { children: 'not' }),
              ' appear in the URL.',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              'Inspired by ',
              e.jsx(s.strong, { children: 'Next.js App Router' }),
              ' and other modern frameworks.',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(s.h3, { children: 'Example in Rasengan.js' }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'md',
          'data-theme': 'github-dark-dimmed',
          children: e.jsx(s.code, {
            'data-language': 'md',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: e.jsxs(s.span, {
              'data-line': '',
              children: [
                e.jsx(s.span, {
                  style: { color: '#ADBAC7' },
                  children: '/app/_routes/',
                }),
                e.jsx(s.mark, {
                  'data-highlighted-chars': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '(blog)',
                  }),
                }),
                e.jsx(s.span, {
                  style: { color: '#ADBAC7' },
                  children: '/home.page.tsx → /home',
                }),
              ],
            }),
          }),
        }),
      }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Even if the page is inside the ',
          e.jsx(s.code, { children: '(blog)' }),
          ' folder, the URL does ',
          e.jsx(s.strong, { children: 'not' }),
          ' include ',
          e.jsx(s.code, { children: '/blog' }),
          '.',
        ],
      }),
      `
`,
      e.jsx(s.h3, { children: 'Use Cases' }),
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsxs(s.li, {
            children: [
              'Organizing routes by domain (',
              e.jsx(s.code, { children: '(marketing)' }),
              ', ',
              e.jsx(s.code, { children: '(dashboard)' }),
              ', ',
              e.jsx(s.code, { children: '(auth)' }),
              ')',
            ],
          }),
          `
`,
          e.jsx(s.li, {
            children: 'Sharing layout or logic across grouped routes',
          }),
          `
`,
          e.jsx(s.li, { children: 'Improving readability in large apps' }),
          `
`,
        ],
      }),
      `
`,
      e.jsxs(s.blockquote, {
        children: [
          `
`,
          e.jsxs(s.p, {
            children: [
              '"',
              e.jsx(s.strong, { children: 'Route Groups' }),
              ' using parentheses ( ) to organize routes without affecting the final path."',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Routing Rules Summary' }),
      `
`,
      e.jsxs(s.table, {
        children: [
          e.jsx(s.thead, {
            children: e.jsxs(s.tr, {
              children: [
                e.jsx(s.th, { children: 'Type' }),
                e.jsx(s.th, { children: 'Convention' }),
                e.jsx(s.th, { children: 'Example Path' }),
                e.jsx(s.th, { children: 'Matches' }),
              ],
            }),
          }),
          e.jsxs(s.tbody, {
            children: [
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, { children: 'Routes folder' }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'app/_routes/' }),
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, {
                      children: 'app/_routes/home.page.tsx',
                    }),
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: '/home' }),
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, { children: 'Page file' }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: '*.page.tsx' }),
                  }),
                  e.jsxs(s.td, {
                    children: [
                      e.jsx(s.code, { children: 'index.page.tsx' }),
                      ', ',
                      e.jsx(s.code, { children: 'profile.page.tsx' }),
                    ],
                  }),
                  e.jsxs(s.td, {
                    children: [
                      e.jsx(s.code, { children: '/' }),
                      ', ',
                      e.jsx(s.code, { children: '/profile' }),
                    ],
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, { children: 'Dynamic segment' }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, {
                      children: '[param]/index.page.tsx',
                    }),
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, {
                      children: 'app/_routes/blog/[slug]/index.page.tsx',
                    }),
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: '/blog/:slug' }),
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, { children: 'Optional segment' }),
                  e.jsxs(s.td, {
                    children: [
                      e.jsx(s.code, { children: '_folder/' }),
                      ', ',
                      e.jsx(s.code, { children: '[_param]/' }),
                    ],
                  }),
                  e.jsxs(s.td, {
                    children: [
                      e.jsx(s.code, { children: '_settings' }),
                      ', ',
                      e.jsx(s.code, { children: '[_locale]' }),
                    ],
                  }),
                  e.jsxs(s.td, {
                    children: [
                      e.jsx(s.code, { children: '/' }),
                      ', ',
                      e.jsx(s.code, { children: '/settings' }),
                      ', ',
                      e.jsx(s.code, { children: '/en' }),
                    ],
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, { children: 'Layout wrapper' }),
                  e.jsxs(s.td, {
                    children: [
                      e.jsx(s.code, { children: 'layout.tsx' }),
                      ' in any folder',
                    ],
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, {
                      children: 'app/_routes/about/layout.tsx',
                    }),
                  }),
                  e.jsxs(s.td, {
                    children: [
                      'Applies to ',
                      e.jsx(s.code, { children: '/about/*' }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Coming Soon' }),
      `
`,
      e.jsx(s.p, { children: 'Rasengan.js plans to support:' }),
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'Catch-all routes' }),
              ' with ',
              e.jsx(s.code, { children: '[...param]' }),
            ],
          }),
          `
`,
          e.jsx(s.li, {
            children: e.jsx(s.strong, {
              children: 'Param validation & static type inference',
            }),
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Best Practices' }),
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsxs(s.li, {
            children: [
              'Always place route files under ',
              e.jsx(s.code, { children: 'app/_routes/' }),
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              'Prefer ',
              e.jsx(s.code, { children: 'index.page.tsx' }),
              ' for folder roots',
            ],
          }),
          `
`,
          e.jsx(s.li, {
            children: 'Use layouts to reduce duplication and enhance structure',
          }),
          `
`,
          e.jsx(s.li, {
            children:
              'Use optional segments thoughtfully to avoid ambiguous paths',
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(a, {
        prev: { href: '/docs/routing/layouts', label: 'Layouts' },
        next: {
          href: '/docs/routing/linking-and-navigation',
          label: 'Linking and Navigation',
        },
      }),
    ],
  });
}
function r(n = {}) {
  const { wrapper: s } = n.components || {};
  return s ? e.jsx(s, { ...n, children: e.jsx(t, { ...n }) }) : t(n);
}
const d = {
    path: '/file-based-routing',
    metadata: {
      title: 'File-Based Routing - Routing | Core Concepts | Rasengan.js',
      description:
        'File-based routing in Rasengan.js is a powerful and intuitive system that allows you to define routes in a simple and efficient way.',
    },
  },
  i = [
    {
      title: 'Directory Structure Example',
      anchor: {
        id: 'directory-structure-example',
        text: 'Directory Structure Example',
      },
      level: 2,
      children: [],
    },
    {
      title: 'Router',
      anchor: { id: 'router', text: 'Router' },
      level: 2,
      children: [
        {
          title: 'How It Works',
          anchor: { id: 'how-it-works', text: 'How It Works' },
          level: 3,
        },
      ],
    },
    {
      title: 'Pages',
      anchor: { id: 'pages', text: 'Pages' },
      level: 2,
      children: [
        {
          title: 'Naming Convention',
          anchor: { id: 'naming-convention', text: 'Naming Convention' },
          level: 3,
        },
      ],
    },
    {
      title: 'Layouts',
      anchor: { id: 'layouts', text: 'Layouts' },
      level: 2,
      children: [
        {
          title: 'File Structure',
          anchor: { id: 'file-structure', text: 'File Structure' },
          level: 3,
        },
        {
          title: 'Layout Component',
          anchor: { id: 'layout-component', text: 'Layout Component' },
          level: 3,
        },
      ],
    },
    {
      title: 'Dynamic Routes',
      anchor: { id: 'dynamic-routes', text: 'Dynamic Routes' },
      level: 2,
      children: [],
    },
    {
      title: 'Optional Segments',
      anchor: { id: 'optional-segments', text: 'Optional Segments' },
      level: 2,
      children: [
        {
          title: 'Optional Static Segments',
          anchor: {
            id: 'optional-static-segments',
            text: 'Optional Static Segments',
          },
          level: 3,
        },
        {
          title: 'Optional Dynamic Segments',
          anchor: {
            id: 'optional-dynamic-segments',
            text: 'Optional Dynamic Segments',
          },
          level: 3,
        },
      ],
    },
    {
      title: 'Nested Routes',
      anchor: { id: 'nested-routes', text: 'Nested Routes' },
      level: 2,
      children: [],
    },
    {
      title: 'Grouping Routes',
      anchor: { id: 'grouping-routes', text: 'Grouping Routes' },
      level: 2,
      children: [
        {
          title: 'What is a Route Group?',
          anchor: {
            id: 'what-is-a-route-group?',
            text: 'What is a Route Group?',
          },
          level: 3,
        },
        {
          title: 'Example in Rasengan.js',
          anchor: {
            id: 'example-in-rasengan.js',
            text: 'Example in Rasengan.js',
          },
          level: 3,
        },
        {
          title: 'Use Cases',
          anchor: { id: 'use-cases', text: 'Use Cases' },
          level: 3,
        },
      ],
    },
    {
      title: 'Routing Rules Summary',
      anchor: { id: 'routing-rules-summary', text: 'Routing Rules Summary' },
      level: 2,
      children: [],
    },
    {
      title: 'Coming Soon',
      anchor: { id: 'coming-soon', text: 'Coming Soon' },
      level: 2,
      children: [],
    },
    {
      title: 'Best Practices',
      anchor: { id: 'best-practices', text: 'Best Practices' },
      level: 2,
      children: [],
    },
  ];
r.metadata = d;
r.toc = i;
r.type = 'MDXPageComponent';
export { r as default };
