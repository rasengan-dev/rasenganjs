import { j as e } from './vendor-w5t4XTd4.js';
import { k as a } from './shared-components-DBceyN8p.js';
function r(s) {
  const n = {
    a: 'a',
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    li: 'li',
    p: 'p',
    pre: 'pre',
    span: 'span',
    strong: 'strong',
    ul: 'ul',
    ...s.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx(a, {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          e.jsx(n.code, { children: 'Rasengan v1.2.0' }),
          ' is now available on ',
          e.jsx(n.a, {
            href: 'https://www.npmjs.com/package/rasengan',
            children: 'npm',
          }),
          '.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsx(n.p, {
        children: `We are excited to announce the release of Rasengan.js v1.2.0 🎉
This version marks an important step forward for the framework by introducing some highly requested capabilities:`,
      }),
      `
`,
      e.jsxs(n.ul, {
        children: [
          `
`,
          e.jsx(n.li, {
            children: e.jsx(n.a, {
              href: '/blog/rasengan-v1-2-0#static-site-generation-(ssg):-the-3rd-rendering-mode-in-rasengan.js',
              children: e.jsx(n.strong, {
                children: 'Static Site Generation (SSG) rendering mode',
              }),
            }),
          }),
          `
`,
          e.jsx(n.li, {
            children: e.jsx(n.a, {
              href: '/blog/rasengan-v1-2-0#lazy-loaded-routes-for-file-based-routing',
              children: e.jsx(n.strong, {
                children: 'Lazy-loaded routes for File-based routing',
              }),
            }),
          }),
          `
`,
          e.jsx(n.li, {
            children: e.jsx(n.a, {
              href: '/blog/rasengan-v1-2-0#react-compiler-supports',
              children: e.jsx(n.strong, {
                children: 'Support for React Compiler',
              }),
            }),
          }),
          `
`,
          e.jsx(n.li, {
            children: e.jsx(n.a, {
              href: '/blog/rasengan-v1-2-0#introduction-of-kurama',
              children: e.jsx(n.strong, {
                children: 'Introduction of Kurama, a state management library',
              }),
            }),
          }),
          `
`,
          e.jsx(n.li, {
            children: e.jsx(n.a, {
              href: '/blog/rasengan-v1-2-0#introduction-of-kage-demo',
              children: e.jsx(n.strong, {
                children:
                  'Introduction of Kage Demo, a guiding tour utility package to onboard new users',
              }),
            }),
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(n.p, {
        children: `All these features are designed with one goal in mind:
better performance, better scalability, and more control over how your application is rendered and delivered.`,
      }),
      `
`,
      e.jsx(n.h2, { children: "What's new in Rasengan v1.2.0?" }),
      `
`,
      e.jsx(n.h3, {
        children:
          'Static Site Generation (SSG): the 3rd rendering mode in Rasengan.js',
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'With ',
          e.jsx(n.strong, { children: 'v1.2.0' }),
          ', Rasengan.js officially introduces ',
          e.jsx(n.strong, { children: 'Static Site Generation (SSG)' }),
          ' as its ',
          e.jsx(n.strong, { children: 'third rendering mode' }),
          ', alongside the existing ',
          e.jsx(n.strong, { children: 'SPA' }),
          ' and ',
          e.jsx(n.strong, { children: 'SSR' }),
          ' modes.',
        ],
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'This means Rasengan.js now gives you ',
          e.jsx(n.strong, {
            children: 'full control over how your application is rendered',
          }),
          ', depending on your needs:',
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
              e.jsx(n.strong, { children: 'SPA' }),
              ' → client-side rendering for highly interactive apps',
            ],
          }),
          `
`,
          e.jsxs(n.li, {
            children: [
              e.jsx(n.strong, { children: 'SSR' }),
              ' → server-side rendering for dynamic, SEO-critical pages',
            ],
          }),
          `
`,
          e.jsxs(n.li, {
            children: [
              e.jsx(n.strong, { children: 'SSG' }),
              ' → build-time rendering for ultra-fast, static content',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(n.p, {
        children:
          'SSG is designed for pages that don’t need to be rendered on every request, such as:',
      }),
      `
`,
      e.jsxs(n.ul, {
        children: [
          `
`,
          e.jsx(n.li, { children: 'Blogs' }),
          `
`,
          e.jsx(n.li, { children: 'Documentation' }),
          `
`,
          e.jsx(n.li, { children: 'Marketing pages' }),
          `
`,
          e.jsx(n.li, { children: 'Public content' }),
          `
`,
        ],
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'By generating HTML at ',
          e.jsx(n.strong, { children: 'build time' }),
          ', Rasengan.js allows your application to be deployed as ',
          e.jsx(n.strong, { children: 'static files' }),
          ', delivering instant page loads and excellent SEO performance.',
        ],
      }),
      `
`,
      e.jsx(n.h4, { children: 'How to enable SSG in Rasengan.js' }),
      `
`,
      e.jsx(n.p, {
        children:
          'Enabling SSG in Rasengan.js is intentionally simple and integrates directly into the existing configuration system.',
      }),
      `
`,
      e.jsx(n.h5, { children: 'Global prerendering' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'To statically generate ',
          e.jsx(n.strong, { children: 'all routes' }),
          ', you can enable prerendering globally:',
        ],
      }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'ts',
            'data-theme': 'github-dark-dimmed',
            children: 'rasengan.config.js',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'ts',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(n.code, {
              'data-language': 'ts',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
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
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { rasengan } ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: " 'rasengan/plugin'",
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
                e.jsxs(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '  prerender: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: 'true',
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
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '  vite: {',
                  }),
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '    plugins: [',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: 'rasengan',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '()],',
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
                      children: '  }',
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
      e.jsx(n.h5, { children: 'Selective prerendering (recommended)' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'You can also ',
          e.jsx(n.strong, {
            children:
              'choose exactly which routes should be statically generated',
          }),
          ' using glob patterns:',
        ],
      }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'ts',
            'data-theme': 'github-dark-dimmed',
            children: 'rasengan.config.js',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'ts',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(n.code, {
              'data-language': 'ts',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
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
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { rasengan } ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: " 'rasengan/plugin'",
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
                  'data-highlighted-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '  prerender: {',
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
                      children: '    routes: [',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: "'/'",
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: "'blog/**'",
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '],',
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
                      children: '  }',
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
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '  vite: {',
                  }),
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '    plugins: [',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: 'rasengan',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '()],',
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
                      children: '  }',
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
          'This approach is ideal for ',
          e.jsx(n.strong, { children: 'hybrid applications' }),
          ', where:',
        ],
      }),
      `
`,
      e.jsxs(n.ul, {
        children: [
          `
`,
          e.jsx(n.li, { children: 'Public pages are statically generated' }),
          `
`,
          e.jsx(n.li, {
            children:
              'Authenticated or dynamic routes remain rendered via SSR or SPA',
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(n.h4, { children: 'One framework, three rendering strategies' }),
      `
`,
      e.jsx(n.p, {
        children:
          'What makes this release important is not just the addition of SSG, but how it fits naturally into Rasengan.js’ architecture.',
      }),
      `
`,
      e.jsx(n.p, {
        children: `You don’t switch frameworks or mental models.
You don’t rewrite routes.
You don’t duplicate logic.`,
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'You simply ',
          e.jsx(n.strong, { children: 'choose the right rendering mode' }),
          ' for the right use case.',
        ],
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'With ',
          e.jsx(n.strong, { children: 'SPA, SSR, and now SSG' }),
          ', Rasengan.js gives you a complete rendering toolbox — all within a single, coherent framework.',
        ],
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Learn more about ',
          e.jsx(n.a, {
            href: '/docs/rendering/prerendering',
            children: 'Pre-rendering',
          }),
        ],
      }),
      `
`,
      e.jsx(n.h3, { children: 'Lazy-loaded routes for File-based routing' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Another minor improvement in v1.2.0 is ',
          e.jsx(n.strong, {
            children: 'lazy loading for File-based powered routes',
          }),
          '.',
        ],
      }),
      `
`,
      e.jsx(n.h4, { children: 'What problem does this solve?' }),
      `
`,
      e.jsx(n.p, {
        children:
          'In previous versions, all File-based routes could be bundled eagerly, which could:',
      }),
      `
`,
      e.jsxs(n.ul, {
        children: [
          `
`,
          e.jsx(n.li, { children: 'Increase initial bundle size' }),
          `
`,
          e.jsx(n.li, { children: 'Slow down first page load' }),
          `
`,
          e.jsx(n.li, { children: 'Load routes that users may never visit' }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(n.h4, { children: 'What’s new?' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'With ',
          e.jsx(n.strong, { children: 'lazy-loaded on File-based routes' }),
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
              'Routes are loaded ',
              e.jsx(n.strong, { children: 'only when needed' }),
            ],
          }),
          `
`,
          e.jsx(n.li, {
            children: 'The initial JavaScript payload is significantly smaller',
          }),
          `
`,
          e.jsx(n.li, {
            children: 'Navigation remains smooth and predictable',
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(n.p, { children: 'This is especially useful for:' }),
      `
`,
      e.jsxs(n.ul, {
        children: [
          `
`,
          e.jsx(n.li, { children: 'Large applications' }),
          `
`,
          e.jsx(n.li, { children: 'Admin dashboards' }),
          `
`,
          e.jsx(n.li, { children: 'Auth-protected areas' }),
          `
`,
          e.jsx(n.li, { children: 'Feature-based routing' }),
          `
`,
        ],
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Rasengan.js now intelligently bridges ',
          e.jsx(n.strong, { children: 'File-based routing' }),
          ' with ',
          e.jsx(n.strong, { children: 'code splitting' }),
          ", without requiring complex configuration. You don't have to worry about any configure because everything is handled internally.",
        ],
      }),
      `
`,
      e.jsx(n.h3, { children: 'React Compiler supports' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'On October 7, 2025 the ',
          e.jsx(n.a, {
            href: 'https://react.dev/blog/2025/10/07/react-compiler-1',
            children: 'React Team',
          }),
          ' has released the v1.0 of ',
          e.jsx(n.code, { children: 'React Compiler' }),
          ' which is a build-time tool that optimizes your React app through automatic memoization.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsx(n.p, {
        children:
          'Today, Rasengan.js supports that feature through a simple configuration.',
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'We are glad to introduce you ',
          e.jsx(n.code, { children: 'Sage Mode' }),
          ' into Rasengan.js, that will hold the ',
          e.jsx(n.code, { children: 'React Compiler' }),
          ' and next time the ',
          e.jsx(n.code, { children: 'React Server Component' }),
          '.',
        ],
      }),
      `
`,
      e.jsxs(n.h4, {
        children: [
          'How to configure ',
          e.jsx(n.code, { children: 'React Compiler' }),
          ' ?',
        ],
      }),
      `
`,
      e.jsx(n.p, {
        children: 'First, you need to install the following package',
      }),
      `
`,
      e.jsx(n.p, { children: 'npm' }),
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
                    style: { color: '#6CB6FF' },
                    children: ' --save-dev',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#6CB6FF' },
                    children: ' --save-exact',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' babel-plugin-react-compiler@latest',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(n.p, { children: 'pnpm' }),
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
                    children: 'pnpm',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' add',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#6CB6FF' },
                    children: ' --save-dev',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#6CB6FF' },
                    children: ' --save-exact',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' babel-plugin-react-compiler@latest',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(n.p, { children: 'yarn' }),
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
                    children: 'yarn',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' add',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#6CB6FF' },
                    children: ' --dev',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#6CB6FF' },
                    children: ' --exact',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' babel-plugin-react-compiler@latest',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Then you have to configure your ',
          e.jsx(n.code, { children: 'rasengan.config.js' }),
          ' file like follow:',
        ],
      }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'ts',
            'data-theme': 'github-dark-dimmed',
            children: 'rasengan.config.js',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'ts',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(n.code, {
              'data-line-numbers': '',
              'data-language': 'ts',
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
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { rasengan } ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: " 'rasengan/plugin'",
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
                  'data-highlighted-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '  sageMode: {',
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
                      children: '    reactCompiler: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: 'true',
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
                      children: '  }',
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
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '  vite: {',
                  }),
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '    plugins: [',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: 'rasengan',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '()],',
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
                      children: '  }',
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
          'Learn more about ',
          e.jsx(n.code, { children: 'React Compiler' }),
          ' in this ',
          e.jsx(n.a, {
            href: '/docs/optimizing/react-compiler',
            children: 'documentation',
          }),
          '.',
        ],
      }),
      `
`,
      e.jsxs(n.h3, {
        children: ['Introduction of ', e.jsx(n.code, { children: 'Kurama' })],
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'We are proud to introduce Kurama (',
          e.jsx(n.code, { children: '@rasenganjs/kurama' }),
          ') a ',
          e.jsx(n.strong, {
            children: 'lightweight and reactive state management library',
          }),
          ' designed for ',
          e.jsx(n.strong, { children: 'Rasengan.js' }),
          ' and ',
          e.jsx(n.strong, { children: 'any React application' }),
          `.
Inspired by `,
          e.jsx(n.strong, { children: 'Zustand' }),
          ', ',
          e.jsx(n.strong, { children: 'Jotai' }),
          ', and the raw energy of ',
          e.jsx(n.strong, { children: 'Kurama' }),
          ', it gives developers full control over their application’s chakra (state) — simple, fast, and scalable.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          e.jsx(n.code, { children: 'Kurama' }),
          ` provides a simple and concise API giving you the possibility to handle state globally into your application.
The configuration can fit into a simple file and the store created can be used everywhere in your application via the hook created.`,
        ],
      }),
      `
`,
      e.jsx(n.h4, { children: 'Usage' }),
      `
`,
      e.jsx(n.p, {
        children: 'First you need to install the it as a dependency',
      }),
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
                    children: 'pnpm',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' add',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' @rasenganjs/kurama',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(n.p, {
        children:
          'Then you can create your store and use it everywhere you want.',
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
            children: 'Counter.tsx',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(n.code, {
              'data-language': 'tsx',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
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
                      children: ' { createStore } ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: " '@rasenganjs/kurama'",
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
                      children: 'type',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: ' State',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: ' =',
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
                      style: { color: '#F69D50' },
                      children: '  count',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: ' number',
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
                      style: { color: '#DCBDFB' },
                      children: '  increment',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: ':',
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
                      style: { color: '#6CB6FF' },
                      children: ' void',
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
                      style: { color: '#DCBDFB' },
                      children: '  decrement',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: ':',
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
                      style: { color: '#6CB6FF' },
                      children: ' void',
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
                      children: 'const',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: ' useCounter',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: ' createStore',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '<',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: 'State',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '>((',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: 'set',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ') ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ({',
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
                      children: '  count: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: '0',
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
                      style: { color: '#DCBDFB' },
                      children: '  increment',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ': () ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: ' set',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '((',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: 's',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ') ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ({ count: s.count ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: '+',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: ' 1',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' })),',
                    }),
                  ],
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: '  decrement',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ': () ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: ' set',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '((',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: 's',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ') ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ({ count: s.count ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: '-',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: ' 1',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' })),',
                    }),
                  ],
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '}));',
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
                    style: { color: '#768390' },
                    children: '// Use it anywhere',
                  }),
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'function',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: ' Counter',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '() {',
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
                      children: '  const',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: 'count',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: 'increment',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: 'decrement',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' } ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: ' useCounter',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '();',
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
                      children: 'button',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: ' onClick',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: 'increment',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '>+</',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
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
                      children: '      <',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: ' onClick',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: 'decrement',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '>-</',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
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
                      children: '      Chakra Power: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: '{',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: 'count',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: '}',
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
      e.jsxs(n.p, {
        children: [
          'Learn more about Kurama ',
          e.jsx(n.a, { href: '/packages/kurama', children: 'here' }),
        ],
      }),
      `
`,
      e.jsxs(n.h3, {
        children: [
          'Introduction of ',
          e.jsx(n.code, { children: 'Kage Demo' }),
        ],
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'We are proud to introduce Kage Demo (',
          e.jsx(n.code, { children: '@rasenganjs/kage-demo' }),
          ') a lightweight tool that helps you create guided tours and onboarding experiences for your website.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          e.jsx(n.code, { children: 'Kage Demo' }),
          " provides a simple API with which you can play around. Whether you're building a dashboard, a web app, or any site where users might need a little guidance, this package makes it easy to get started.",
        ],
      }),
      `
`,
      e.jsx(n.p, {
        children: 'To start, just install the package as a dependency',
      }),
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
                    children: 'pnpm',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' add',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' @rasenganjs/kage-demo',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Learn more about how to integrate it into your application ',
          e.jsx(n.a, { href: '/packages/kage-demo', children: 'here' }),
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsx(n.p, {
        children: 'As always, feedback and contributions are welcome.',
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          e.jsx(n.strong, { children: 'Rasengan.js v1.2.0' }),
          ' is another step toward a flexible, modern, and developer-first React framework.',
        ],
      }),
      `
`,
      e.jsx(n.p, { children: 'Happy building 🌀' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          e.jsx(n.a, {
            href: '/docs/getting-started/upgrading#upgrade-from-1.1.x-to-1.2.x',
            children: 'Upgrade now',
          }),
          ' and have fun Ninja!',
        ],
      }),
    ],
  });
}
function l(s = {}) {
  const { wrapper: n } = s.components || {};
  return n ? e.jsx(n, { ...s, children: e.jsx(r, { ...s }) }) : r(s);
}
const i = {
    path: '/rasengan-v1-2-0',
    metadata: {
      title: 'Rasengan v1.2.0',
      description:
        'We are publishing Rasengan v1.2.0, a new version of the framework that introduces you lazy routes load, react compiler, SSG and more.',
      openGraph: {
        title: 'Rasengan v1.2.0',
        description:
          'We are publishing Rasengan v1.2.0, a new version of the framework that introduces you lazy routes load, react compiler, SSG and more.',
        url: 'https://rasengan.dev',
        image: 'https://rasengan.dev/assets/blog/rasengan-1.2.0.png',
      },
      twitter: {
        title: 'Rasengan v1.2.0',
        description:
          'We are publishing Rasengan v1.2.0, a new version of the framework that introduces you lazy routes load, react compiler, SSG and more.',
        image: 'https://rasengan.dev/assets/blog/rasengan-1.2.0.png',
      },
    },
  },
  t = void 0;
l.metadata = i;
l.toc = t;
l.type = 'MDXPageComponent';
export { l as default };
