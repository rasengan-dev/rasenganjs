import { j as e } from './vendor-CfbgIbdB.js';
import { P as r } from './shared-components-CkrC6jAk.js';
function l(s) {
  const n = {
    a: 'a',
    blockquote: 'blockquote',
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    p: 'p',
    pre: 'pre',
    span: 'span',
    strong: 'strong',
    ...s.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        children: e.jsx(n.p, { children: 'CORE CONCEPTS' }),
      }),
      `
`,
      e.jsx(n.h1, { children: 'React Compiler' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Rasengan.js includes support for the ',
          e.jsx(n.a, {
            href: 'https://react.dev/learn/react-compiler/introduction',
            children: 'React Compiler',
          }),
          ', a tool designed to improve performance by automatically optimizing component rendering. This reduces the need for manual memoization using ',
          e.jsx(n.code, { children: 'useMemo' }),
          ' and ',
          e.jsx(n.code, { children: 'useCallback' }),
          '.',
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'How It Works' }),
      `
`,
      e.jsx(n.p, {
        children: 'The React Compiler runs through a Babel plugin.',
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'To use it, install the ',
          e.jsx(n.code, { children: 'babel-plugin-react-compiler' }),
          ':',
        ],
      }),
      `
`,
      e.jsx(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(n.pre, {
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
                e.jsx(n.span, { style: { color: '#F69D50' }, children: 'npm' }),
                e.jsx(n.span, {
                  style: { color: '#96D0FF' },
                  children: ' install',
                }),
                e.jsx(n.span, { style: { color: '#6CB6FF' }, children: ' -D' }),
                e.jsx(n.span, {
                  style: { color: '#96D0FF' },
                  children: ' babel-plugin-react-compiler',
                }),
              ],
            }),
          }),
        }),
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Then, add ',
          e.jsx(n.code, { children: 'reactCompiler' }),
          ' option in ',
          e.jsx(n.code, { children: 'rasengan.config.js' }),
          ' via the ',
          e.jsx(n.code, { children: 'sageMode' }),
          ' option:',
        ],
      }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'js',
            'data-theme': 'github-dark-dimmed',
            children: 'rasengan.config.js',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'js',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(n.code, {
              'data-language': 'js',
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
      e.jsx(n.h2, { children: 'Annotations' }),
      `
`,
      e.jsx(n.p, {
        children:
          'You can configure the compiler to run in "opt-in" mode as follows:',
      }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'js',
            'data-theme': 'github-dark-dimmed',
            children: 'rasengan.config.js',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'js',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(n.code, {
              'data-language': 'js',
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
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '  sageMode: {',
                  }),
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '    reactCompiler: {',
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
                      children: '      compilationMode: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: "'annotation'",
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
                  'data-highlighted-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '    }',
                  }),
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
          'Then, you can annotate specific components or hooks with the ',
          e.jsx(n.code, { children: '"use memo"' }),
          ' directive from React to opt-in:',
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
            children: 'app/_routes/index.page.tsx',
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
                      children: ' Page',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: '() ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '{',
                    }),
                  ],
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: "  'use memo'",
                  }),
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#768390' },
                    children: '  // ...',
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
      e.jsxs(n.blockquote, {
        children: [
          `
`,
          e.jsxs(n.p, {
            children: [
              e.jsx(n.strong, { children: 'Note:' }),
              ' You can also use the ',
              e.jsx(n.code, { children: '"use no memo"' }),
              ' directive from React for the opposite effect, to opt-out a component or hook.',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(r, {
        prev: {
          href: '/docs/optimizing/static-assets',
          label: 'Static Assets',
        },
        next: { href: '/docs/configuring/typescript', label: 'Typescript' },
      }),
    ],
  });
}
function a(s = {}) {
  const { wrapper: n } = s.components || {};
  return n ? e.jsx(n, { ...s, children: e.jsx(l, { ...s }) }) : l(s);
}
const t = {
    path: '/react-compiler',
    metadata: {
      title: 'React Compiler - Optimizing | Core concepts | Rasengan.js',
      description:
        'React Compiler is a build-time tool that optimizes your React app through automatic memoization',
    },
  },
  o = [
    {
      title: 'How It Works',
      anchor: { id: 'how-it-works', text: 'How It Works' },
      level: 2,
      children: [],
    },
    {
      title: 'Annotations',
      anchor: { id: 'annotations', text: 'Annotations' },
      level: 2,
      children: [],
    },
  ];
a.metadata = t;
a.toc = o;
a.type = 'MDXPageComponent';
export { a as default };
