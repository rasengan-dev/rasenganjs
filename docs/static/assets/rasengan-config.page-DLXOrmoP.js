import { j as e } from './vendor-CfbgIbdB.js';
import { P as r } from './shared-components-CkrC6jAk.js';
function l(s) {
  const n = {
    a: 'a',
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    pre: 'pre',
    span: 'span',
    ...s.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        children: e.jsx(n.p, { children: 'API REFERENCE' }),
      }),
      `
`,
      e.jsx(n.h1, { children: 'rasengan.config.js' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Rasengan.js can be configured through a ',
          e.jsx(n.code, { children: 'rasengan.config.js' }),
          ' file in the root of your project directory with a default export.',
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
              'data-line-numbers': '',
              'data-language': 'js',
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
                    style: { color: '#768390' },
                    children: '  /* your config */',
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
      e.jsx(n.h2, { children: 'Configuration as a Function' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'You can also pass a function to ',
          e.jsx(n.code, { children: 'defineConfig' }),
          ' to do some dynamic configuration.',
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
              'data-line-numbers': '',
              'data-language': 'js',
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
                      children: '(() ',
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
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#768390' },
                    children: '  // You can do some dynamic configuration here',
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
                      children: '  return',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#768390' },
                    children: '    /* your config */',
                  }),
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
                      style: { color: '#ADBAC7' },
                      children: '}',
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
      e.jsx(n.h3, { children: 'Async Configuration' }),
      `
`,
      e.jsx(n.p, {
        children:
          'You can also return a Promise from the function to do async configuration.',
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
              'data-line-numbers': '',
              'data-language': 'js',
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
                      children: '(',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'async',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
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
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#768390' },
                    children: '  // You can do some async configuration here',
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
                      children: '  return',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#768390' },
                    children: '    /* your config */',
                  }),
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
                      style: { color: '#ADBAC7' },
                      children: '}',
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
      e.jsx(n.h2, { children: 'Configuration Options' }),
      `
`,
      e.jsx(n.h3, { children: 'ssr' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Rasengan.js will use the ',
          e.jsx(n.code, { children: 'ssr' }),
          ' option to determine whether to use SSR or not. By default, it is set to ',
          e.jsx(n.code, { children: 'true' }),
          ' to enable SSR but you can set it to ',
          e.jsx(n.code, { children: 'false' }),
          ' to disable SSR and work in ',
          e.jsx(n.code, { children: 'SPA mode' }),
          '.',
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
              'data-line-numbers': '',
              'data-language': 'js',
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
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '  ssr: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: 'false',
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
      e.jsx(n.h3, { children: 'prerender' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Introduced in ',
          e.jsx(n.code, { children: 'v1.2.0' }),
          ', the ',
          e.jsx(n.code, { children: 'prerender' }),
          ` option lets you configure the pre-rendering mode (SSG) for your application.
It's either a boolean or an object containing a `,
          e.jsx(n.code, { children: 'routes' }),
          ' parameter giving you the possibility to set the list of routes you want to pre-render statically.',
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
              'data-line-numbers': '',
              'data-language': 'js',
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
      e.jsx(n.p, { children: 'or' }),
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
              'data-line-numbers': '',
              'data-language': 'js',
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
                    children: '  prerender: {',
                  }),
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
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
                      children: "'/about'",
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: "'/contact'",
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: "'/blog/**]",
                    }),
                    e.jsx(n.span, {
                      style: { color: '#FF938A', fontStyle: 'italic' },
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
                    children: '  },',
                  }),
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '});',
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(n.h3, { children: 'sageMode' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Introduced in ',
          e.jsx(n.code, { children: 'v1.2.0' }),
          ', the ',
          e.jsx(n.code, { children: 'sageMode' }),
          ' option lets you configure from now the ',
          e.jsx(n.code, { children: 'react compiler' }),
          ' mode.',
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
              'data-line-numbers': '',
              'data-language': 'js',
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
          'Lean more about ',
          e.jsx(n.a, {
            href: '/docs/optimizing/react-compiler',
            children: 'React Compiler',
          }),
          '.',
        ],
      }),
      `
`,
      e.jsx(n.h3, { children: 'server.development.port' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'You can use the ',
          e.jsx(n.code, { children: 'server.development.port' }),
          ' option to set the port for the development server by overriding the default port.',
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
              'data-line-numbers': '',
              'data-language': 'js',
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
                    children: '  server: {',
                  }),
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '    development: {',
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
                      children: '      port: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: '3000',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
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
                    children: '    }',
                  }),
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
      e.jsxs(n.p, {
        children: [
          'By running ',
          e.jsx(n.code, { children: 'npm run dev' }),
          ', the development server will be available at ',
          e.jsx(n.code, { children: 'http://localhost:3000' }),
          '.',
        ],
      }),
      `
`,
      e.jsx(n.h3, { children: 'server.development.open' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'You can use the ',
          e.jsx(n.code, { children: 'server.development.open' }),
          ' option to open the browser automatically when the development server starts.',
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
              'data-line-numbers': '',
              'data-language': 'js',
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
                    children: '  server: {',
                  }),
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '    development: {',
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
                      children: '      open: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: 'true',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
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
                    children: '    }',
                  }),
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
      e.jsx(n.h3, { children: 'vite.plugins' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'You can use the ',
          e.jsx(n.code, { children: 'vite.plugins' }),
          ' option to add Vite plugins to your project and enable extra features.',
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
              'data-line-numbers': '',
              'data-language': 'js',
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
                      children: '()]',
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
      e.jsx(n.h3, { children: 'vite.resolve.alias' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'You can use the ',
          e.jsx(n.code, { children: 'vite.resolve' }),
          " option to configure Vite's ",
          e.jsx(n.code, { children: 'resolve.alias' }),
          ' option.',
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
              'data-line-numbers': '',
              'data-language': 'js',
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
                e.jsx(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '    resolve: {',
                  }),
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '      alias: [',
                  }),
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '        {',
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
                      children: '          find: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: "'~'",
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
                  'data-highlighted-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '          replacement: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: "'/src'",
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
                    children: '        }',
                  }),
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '      ]',
                  }),
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
      e.jsx(n.p, {
        children: 'And then you can use the alias in your code like this:',
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
            children: 'src/pages/index.tsx',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'js',
            'data-theme': 'github-dark-dimmed',
            children: e.jsx(n.code, {
              'data-line-numbers': '',
              'data-language': 'js',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              'data-line-numbers-max-digits': '1',
              children: e.jsxs(n.span, {
                'data-line': '',
                children: [
                  e.jsx(n.span, {
                    style: { color: '#F47067' },
                    children: 'import',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: ' { Avatar } ',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#F47067' },
                    children: 'from',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: " '~/components/avatar'",
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
      e.jsx(n.h3, { children: 'vite.resolve.symbole' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'You can use the ',
          e.jsx(n.code, { children: 'vite.resolve.symbole' }),
          " option to configure Vite's ",
          e.jsx(n.code, { children: 'resolve.symbole' }),
          ' option. This is useful because by default, Rasengan.js is using ',
          e.jsx(n.code, { children: 'module aliases' }),
          ' with ',
          e.jsx(n.code, { children: '@' }),
          ' as the alias for the ',
          e.jsx(n.code, { children: 'src' }),
          ` directory.
You can decide to change the alias to something else.`,
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
              'data-line-numbers': '',
              'data-language': 'js',
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
                e.jsx(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '    resolve: {',
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
                      children: '      symbole: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: "'_'",
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ',',
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
                e.jsx(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '  }',
                  }),
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
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
      e.jsx(n.p, {
        children: 'And then you can use the alias in your code like this:',
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
            children: 'src/pages/index.tsx',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'js',
            'data-theme': 'github-dark-dimmed',
            children: e.jsx(n.code, {
              'data-line-numbers': '',
              'data-language': 'js',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              'data-line-numbers-max-digits': '1',
              children: e.jsxs(n.span, {
                'data-line': '',
                children: [
                  e.jsx(n.span, {
                    style: { color: '#F47067' },
                    children: 'import',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: ' { Avatar } ',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#F47067' },
                    children: 'from',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: " '_/components/avatar'",
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
      e.jsx(r, {
        prev: {
          href: '/docs/api-reference/conventions/router',
          label: '[name].router.tsx',
        },
        next: {
          href: '/docs/api-reference/create-rasengan-cli',
          label: 'Create Rasengan CLI',
        },
      }),
    ],
  });
}
function a(s = {}) {
  const { wrapper: n } = s.components || {};
  return n ? e.jsx(n, { ...s, children: e.jsx(l, { ...s }) }) : l(s);
}
const d = {
    path: '/rasengan-config',
    metadata: {
      title: 'Rasengan Configuration file | API Reference | Rasengan.js',
      description: 'Define Rasengan Configuration file',
    },
  },
  i = [
    {
      title: 'Configuration as a Function',
      anchor: {
        id: 'configuration-as-a-function',
        text: 'Configuration as a Function',
      },
      level: 2,
      children: [
        {
          title: 'Async Configuration',
          anchor: { id: 'async-configuration', text: 'Async Configuration' },
          level: 3,
        },
      ],
    },
    {
      title: 'Configuration Options',
      anchor: { id: 'configuration-options', text: 'Configuration Options' },
      level: 2,
      children: [
        { title: 'ssr', anchor: { id: 'ssr', text: 'ssr' }, level: 3 },
        {
          title: 'prerender',
          anchor: { id: 'prerender', text: 'prerender' },
          level: 3,
        },
        {
          title: 'sageMode',
          anchor: { id: 'sagemode', text: 'sageMode' },
          level: 3,
        },
        {
          title: 'server.development.port',
          anchor: {
            id: 'server.development.port',
            text: 'server.development.port',
          },
          level: 3,
        },
        {
          title: 'server.development.open',
          anchor: {
            id: 'server.development.open',
            text: 'server.development.open',
          },
          level: 3,
        },
        {
          title: 'vite.plugins',
          anchor: { id: 'vite.plugins', text: 'vite.plugins' },
          level: 3,
        },
        {
          title: 'vite.resolve.alias',
          anchor: { id: 'vite.resolve.alias', text: 'vite.resolve.alias' },
          level: 3,
        },
        {
          title: 'vite.resolve.symbole',
          anchor: { id: 'vite.resolve.symbole', text: 'vite.resolve.symbole' },
          level: 3,
        },
      ],
    },
  ];
a.metadata = d;
a.toc = i;
a.type = 'MDXPageComponent';
export { a as default };
