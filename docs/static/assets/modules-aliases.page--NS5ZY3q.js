import { j as e } from './vendor-CfbgIbdB.js';
import { P as i } from './shared-components-CkrC6jAk.js';
function l(n) {
  const s = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    p: 'p',
    pre: 'pre',
    span: 'span',
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
      e.jsx(s.h1, { children: 'Modules Aliases' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          `Configuring aliases for your modules is a great way to make your code more readable and maintainable.
Rasengan.js provides a way to configure aliases for your modules via the `,
          e.jsx(s.code, { children: 'rasengan.config.js' }),
          ' file.',
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Configure Aliases' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'To configure aliases for modules, you have to define first ',
          e.jsx(s.code, { children: 'paths' }),
          ' in ',
          e.jsx(s.code, { children: 'tsconfig.json' }),
          ' or ',
          e.jsx(s.code, { children: 'jsconfig.json' }),
          ' file:',
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
            children: 'JSON',
          }),
          e.jsx(s.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'json',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(s.code, {
              'data-line-numbers': '',
              'data-language': 'json',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              'data-line-numbers-max-digits': '1',
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
                      children: '  "compilerOptions"',
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
                      children: '    "baseUrl"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ': ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '"."',
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
                      style: { color: '#8DDB8C' },
                      children: '    "paths"',
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
                      children: '      "@app/*"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ': [',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '"src/app/*"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ']',
                    }),
                  ],
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '    }',
                  }),
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
          'This first configuration is for intellisense and code navigation. To make it work in runtime, you have to configure ',
          e.jsx(s.code, { children: 'aliases' }),
          ' inside the ',
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
            'data-language': 'javascript',
            'data-theme': 'github-dark-dimmed',
            children: 'rasengan.config.js',
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
                      children: ' { defineConfig } ',
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
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '  vite: {',
                  }),
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '    resolve: {',
                  }),
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '      alias: [',
                  }),
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '        {',
                  }),
                }),
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '          find: ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '"@app"',
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
                      children: '          replacement: ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '"./src/app"',
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
                    children: '        },',
                  }),
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '      ],',
                  }),
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '    },',
                  }),
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
      e.jsx(s.h2, { children: 'Use Aliases' }),
      `
`,
      e.jsx(s.p, { children: 'Now you can import modules using the alias:' }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'typescript',
            'data-theme': 'github-dark-dimmed',
            children: 'app.router.ts',
          }),
          e.jsx(s.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'typescript',
            'data-theme': 'github-dark-dimmed',
            children: e.jsx(s.code, {
              'data-line-numbers': '',
              'data-language': 'typescript',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              'data-line-numbers-max-digits': '1',
              children: e.jsxs(s.span, {
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
                    children: ' "@app/home.page.tsx"',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: ';' }),
                ],
              }),
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
          href: '/docs/configuring/environment-variables',
          label: 'Environment Variables',
        },
        next: { href: '/docs/deploying/vercel', label: 'Deploy to Vercel' },
      }),
    ],
  });
}
function a(n = {}) {
  const { wrapper: s } = n.components || {};
  return s ? e.jsx(s, { ...n, children: e.jsx(l, { ...n }) }) : l(n);
}
const r = {
    path: '/modules-aliases',
    metadata: {
      title: 'Modules Aliases - Configuring | Core concepts | Rasengan.js',
      description: 'Modules Aliases in Rasengan.js',
    },
  },
  t = [
    {
      title: 'Configure Aliases',
      anchor: { id: 'configure-aliases', text: 'Configure Aliases' },
      level: 2,
      children: [],
    },
    {
      title: 'Use Aliases',
      anchor: { id: 'use-aliases', text: 'Use Aliases' },
      level: 2,
      children: [],
    },
  ];
a.metadata = r;
a.toc = t;
a.type = 'MDXPageComponent';
export { a as default };
