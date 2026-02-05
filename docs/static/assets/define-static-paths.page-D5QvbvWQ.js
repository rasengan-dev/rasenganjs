import { j as e } from './vendor-CfbgIbdB.js';
import { a as r, P as t } from './shared-components-CkrC6jAk.js';
function a(s) {
  const n = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    li: 'li',
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
      e.jsx(n.h1, { children: 'defineStaticPaths' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          e.jsx(n.code, { children: 'defineStaticPaths()' }),
          ' is a utility function used to declare which dynamic routes should be ',
          e.jsx(n.strong, { children: 'pre-rendered' }),
          ' when using Rasengan.js in SSG (Static Site Generation) mode.',
        ],
      }),
      `
`,
      e.jsx(n.p, {
        children:
          'It allows you to generate a list of parameters (such as usernames, slugs, or IDs) that Rasengan.js will convert into individual static HTML files during the build.',
      }),
      `
`,
      e.jsx(n.h2, { children: 'Usage' }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'app/_routes/users/[username].page.tsx',
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
                      children: ' { defineStaticPaths } ',
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
                e.jsx(n.span, { 'data-line': '', children: ' ' }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#768390' },
                    children: '// Page definition...',
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
                      children: 'Page.',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: 'generatePaths',
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
                      style: { color: '#F47067' },
                      children: '  return',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: ' defineStaticPaths',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '([',
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
                      children: '    { username: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"nina"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' },',
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
                      children: '    { username: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"dilane3"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' },',
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
                      children: '    { username: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"michel"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' },',
                    }),
                  ],
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '  ]);',
                  }),
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
              ],
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(n.p, {
        children: 'This creates three static pages at build time:',
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
          children: e.jsxs(n.code, {
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: [
              e.jsx(n.span, {
                'data-line': '',
                children: e.jsx(n.span, {
                  style: { color: '#F69D50' },
                  children: '/static/users/nina/index.html',
                }),
              }),
              `
`,
              e.jsx(n.span, {
                'data-line': '',
                children: e.jsx(n.span, {
                  style: { color: '#F69D50' },
                  children: '/static/users/dilane3/index.html',
                }),
              }),
              `
`,
              e.jsx(n.span, {
                'data-line': '',
                children: e.jsx(n.span, {
                  style: { color: '#F69D50' },
                  children: '/static/users/michel/index.html',
                }),
              }),
            ],
          }),
        }),
      }),
      `
`,
      e.jsx(n.h2, { children: 'When to Use' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Use ',
          e.jsx(n.code, { children: 'defineStaticPaths()' }),
          ' when:',
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
              'You have ',
              e.jsx(n.strong, { children: 'dynamic routes' }),
              ' (',
              e.jsx(n.code, { children: '[slug]' }),
              ', ',
              e.jsx(n.code, { children: '[id]' }),
              ', ',
              e.jsx(n.code, { children: '[username]' }),
              ', etc.)',
            ],
          }),
          `
`,
          e.jsxs(n.li, {
            children: [
              'You know the list of values ',
              e.jsx(n.strong, { children: 'before build time' }),
            ],
          }),
          `
`,
          e.jsxs(n.li, {
            children: [
              'The pages do ',
              e.jsx(n.strong, { children: 'not' }),
              ' need runtime generation',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(n.p, { children: 'Not recommended for pages that:' }),
      `
`,
      e.jsxs(n.ul, {
        children: [
          `
`,
          e.jsx(n.li, { children: 'Depend on real-time data' }),
          `
`,
          e.jsx(n.li, {
            children: 'Change constantly or need personalization',
          }),
          `
`,
          e.jsx(n.li, { children: 'Are behind authentication' }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'Function Signature' }),
      `
`,
      e.jsx(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(n.pre, {
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
                    style: { color: '#DCBDFB' },
                    children: 'defineStaticPaths',
                  }),
                  e.jsx(n.span, { style: { color: '#ADBAC7' }, children: '(' }),
                ],
              }),
              `
`,
              e.jsxs(n.span, {
                'data-line': '',
                children: [
                  e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '  paths: Array',
                  }),
                  e.jsx(n.span, { style: { color: '#F47067' }, children: '<' }),
                  e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: 'Record',
                  }),
                  e.jsx(n.span, { style: { color: '#F47067' }, children: '<' }),
                  e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: 'string, string ',
                  }),
                  e.jsx(n.span, { style: { color: '#F47067' }, children: '|' }),
                  e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: ' number',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#F47067' },
                    children: '>>',
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
                    children: '): { paths: Array',
                  }),
                  e.jsx(n.span, { style: { color: '#F47067' }, children: '<' }),
                  e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: 'Record',
                  }),
                  e.jsx(n.span, { style: { color: '#F47067' }, children: '<' }),
                  e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: 'string, string | number>> }',
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      `
`,
      e.jsxs(n.table, {
        children: [
          e.jsx(n.thead, {
            children: e.jsxs(n.tr, {
              children: [
                e.jsx(n.th, { children: 'Parameter' }),
                e.jsx(n.th, { children: 'Type' }),
                e.jsx(n.th, { children: 'Description' }),
              ],
            }),
          }),
          e.jsx(n.tbody, {
            children: e.jsxs(n.tr, {
              children: [
                e.jsx(n.td, { children: e.jsx(n.code, { children: 'paths' }) }),
                e.jsx(n.td, {
                  children: e.jsx(n.code, {
                    children: 'Record<string, string | number>[]',
                  }),
                }),
                e.jsx(n.td, {
                  children:
                    'A list of dynamic parameters to generate as static pages',
                }),
              ],
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'Example with Component' }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'pages/users/[username].tsx',
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
                      children:
                        ' { PageComponent, useParams, defineStaticPaths } ',
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
                      style: { color: '#DCBDFB' },
                      children: ' Page',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: ' PageComponent',
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
                      style: { color: '#F47067' },
                      children: '  const',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: 'username',
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
                      children: ' useParams',
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
                      children: ' <',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#8DDB8C' },
                      children: 'h1',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '>Hello ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: '{',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: 'username',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '</',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#8DDB8C' },
                      children: 'h1',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '>;',
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
                      style: { color: '#ADBAC7' },
                      children: 'Page.',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: 'generatePaths',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: ' async',
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
                      style: { color: '#F47067' },
                      children: '  return',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: ' defineStaticPaths',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '([',
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
                      children: '    { username: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"nina"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' },',
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
                      children: '    { username: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"dilane3"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' },',
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
                      children: '    { username: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"michel"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' },',
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
                      children: '    { username: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"bros"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' },',
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
                      children: '    { username: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"adora"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' },',
                    }),
                  ],
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '  ]);',
                  }),
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
                      children: 'export',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: ' default',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' Page;',
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
      e.jsx(n.h2, { children: 'Returned Output Format' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          e.jsx(n.code, { children: 'defineStaticPaths()' }),
          ' returns an object with a ',
          e.jsx(n.code, { children: 'paths' }),
          ' property:',
        ],
      }),
      `
`,
      e.jsx(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(n.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'ts',
          'data-theme': 'github-dark-dimmed',
          children: e.jsxs(n.code, {
            'data-language': 'ts',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: [
              e.jsx(n.span, {
                'data-line': '',
                children: e.jsx(n.span, {
                  style: { color: '#ADBAC7' },
                  children: '{',
                }),
              }),
              `
`,
              e.jsxs(n.span, {
                'data-line': '',
                children: [
                  e.jsx(n.span, {
                    style: { color: '#F69D50' },
                    children: '  paths',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: ': [',
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
                    children: '    { username: ',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: '"nina"',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: ' },',
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
                    children: '    { username: ',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: '"dilane3"',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: ' },',
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
                    children: '    { username: ',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: '"michel"',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: ' },',
                  }),
                ],
              }),
              `
`,
              e.jsx(n.span, {
                'data-line': '',
                children: e.jsx(n.span, {
                  style: { color: '#ADBAC7' },
                  children: '  ]',
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
      }),
      `
`,
      e.jsx(r, {
        title: 'Learn more about dynamic pre-rendering',
        link: '/docs/rendering/prerendering#pre-rendering-dynamic-routes',
        status: 'info',
      }),
      `
`,
      e.jsx(t, {
        prev: {
          href: '/docs/api-reference/functions/define-routes-group',
          label: 'defineRoutesGroup',
        },
        next: {
          href: '/docs/api-reference/functions/render-app',
          label: 'renderApp',
        },
      }),
    ],
  });
}
function l(s = {}) {
  const { wrapper: n } = s.components || {};
  return n ? e.jsx(n, { ...s, children: e.jsx(a, { ...s }) }) : a(s);
}
const i = {
    path: '/define-static-paths',
    metadata: {
      title: 'defineStaticPaths - Functions | API Reference | Rasengan.js',
      description: 'Generate static paths for dynamic routes in Rasengan.js.',
    },
  },
  d = [
    {
      title: 'Usage',
      anchor: { id: 'usage', text: 'Usage' },
      level: 2,
      children: [],
    },
    {
      title: 'When to Use',
      anchor: { id: 'when-to-use', text: 'When to Use' },
      level: 2,
      children: [],
    },
    {
      title: 'Function Signature',
      anchor: { id: 'function-signature', text: 'Function Signature' },
      level: 2,
      children: [],
    },
    {
      title: 'Example with Component',
      anchor: { id: 'example-with-component', text: 'Example with Component' },
      level: 2,
      children: [],
    },
    {
      title: 'Returned Output Format',
      anchor: { id: 'returned-output-format', text: 'Returned Output Format' },
      level: 2,
      children: [],
    },
  ];
l.metadata = i;
l.toc = d;
l.type = 'MDXPageComponent';
export { l as default };
