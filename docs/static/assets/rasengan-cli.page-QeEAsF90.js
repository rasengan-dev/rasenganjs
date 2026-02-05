import { j as e } from './vendor-CfbgIbdB.js';
import { P as t } from './shared-components-CkrC6jAk.js';
function s(n) {
  const a = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    pre: 'pre',
    span: 'span',
    ...n.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        children: e.jsx(a.p, { children: 'API REFERENCE' }),
      }),
      `
`,
      e.jsx(a.h1, { children: 'Rasengan CLI' }),
      `
`,
      e.jsx(a.p, {
        children:
          'The Rasengan CLI is a command-line interface integrated natively in Rasengan.js. It provides a set of commands to help you with your development workflow.',
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(a.p, {
        children: [
          'To use the CLI, you have to pass through the ',
          e.jsx(a.code, { children: 'scripts' }),
          ' property in your ',
          e.jsx(a.code, { children: 'package.json' }),
          ' file.',
        ],
      }),
      `
`,
      e.jsx(a.h2, { children: 'Commands' }),
      `
`,
      e.jsx(a.h3, { children: 'rasengan dev' }),
      `
`,
      e.jsxs(a.p, {
        children: [
          'The ',
          e.jsx(a.code, { children: 'rasengan dev' }),
          ' command starts the development server.',
        ],
      }),
      `
`,
      e.jsxs(a.p, {
        children: [
          'First, you need to set the ',
          e.jsx(a.code, { children: 'dev' }),
          ' script in your ',
          e.jsx(a.code, { children: 'package.json' }),
          ' file.',
        ],
      }),
      `
`,
      e.jsxs(a.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(a.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'json',
            'data-theme': 'github-dark-dimmed',
            children: 'package.json',
          }),
          e.jsx(a.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'json',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(a.code, {
              'data-line-numbers': '',
              'data-language': 'json',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              'data-line-numbers-max-digits': '1',
              children: [
                e.jsx(a.span, {
                  'data-line': '',
                  children: e.jsx(a.span, {
                    style: { color: '#ADBAC7' },
                    children: '{',
                  }),
                }),
                `
`,
                e.jsxs(a.span, {
                  'data-line': '',
                  children: [
                    e.jsx(a.span, {
                      style: { color: '#8DDB8C' },
                      children: '  "scripts"',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#ADBAC7' },
                      children: ': {',
                    }),
                  ],
                }),
                `
`,
                e.jsxs(a.span, {
                  'data-line': '',
                  children: [
                    e.jsx(a.span, {
                      style: { color: '#8DDB8C' },
                      children: '    "dev"',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#ADBAC7' },
                      children: ': ',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#96D0FF' },
                      children: '"rasengan dev"',
                    }),
                  ],
                }),
                `
`,
                e.jsx(a.span, {
                  'data-line': '',
                  children: e.jsx(a.span, {
                    style: { color: '#ADBAC7' },
                    children: '  } ',
                  }),
                }),
                `
`,
                e.jsx(a.span, {
                  'data-line': '',
                  children: e.jsx(a.span, {
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
      e.jsx(a.p, { children: 'Then, you can run the following command:' }),
      `
`,
      e.jsxs(a.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(a.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: 'Terminal',
          }),
          e.jsx(a.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: e.jsx(a.code, {
              'data-language': 'bash',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: e.jsxs(a.span, {
                'data-line': '',
                children: [
                  e.jsx(a.span, {
                    style: { color: '#F69D50' },
                    children: 'npm',
                  }),
                  e.jsx(a.span, {
                    style: { color: '#96D0FF' },
                    children: ' run',
                  }),
                  e.jsx(a.span, {
                    style: { color: '#96D0FF' },
                    children: ' dev',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsxs(a.p, {
        children: [
          'This will start the application in dev mode. The application will be available at ',
          e.jsx(a.code, { children: 'http://localhost:5320' }),
          '.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(a.p, {
        children: [
          'The default port can be changed with ',
          e.jsx(a.code, { children: '-p' }),
          ' or ',
          e.jsx(a.code, { children: '--port' }),
          ' option, like follow:',
        ],
      }),
      `
`,
      e.jsxs(a.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(a.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'json',
            'data-theme': 'github-dark-dimmed',
            children: 'package.json',
          }),
          e.jsx(a.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'json',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(a.code, {
              'data-line-numbers': '',
              'data-language': 'json',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              'data-line-numbers-max-digits': '1',
              children: [
                e.jsx(a.span, {
                  'data-line': '',
                  children: e.jsx(a.span, {
                    style: { color: '#ADBAC7' },
                    children: '{',
                  }),
                }),
                `
`,
                e.jsxs(a.span, {
                  'data-line': '',
                  children: [
                    e.jsx(a.span, {
                      style: { color: '#8DDB8C' },
                      children: '  "scripts"',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#ADBAC7' },
                      children: ': {',
                    }),
                  ],
                }),
                `
`,
                e.jsxs(a.span, {
                  'data-line': '',
                  children: [
                    e.jsx(a.span, {
                      style: { color: '#8DDB8C' },
                      children: '    "dev"',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#ADBAC7' },
                      children: ': ',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#96D0FF' },
                      children: '"rasengan dev -p 3000"',
                    }),
                  ],
                }),
                `
`,
                e.jsx(a.span, {
                  'data-line': '',
                  children: e.jsx(a.span, {
                    style: { color: '#ADBAC7' },
                    children: '  } ',
                  }),
                }),
                `
`,
                e.jsx(a.span, {
                  'data-line': '',
                  children: e.jsx(a.span, {
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
      e.jsx(a.p, { children: 'or just' }),
      `
`,
      e.jsxs(a.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(a.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: 'Terminal',
          }),
          e.jsx(a.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: e.jsx(a.code, {
              'data-language': 'bash',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: e.jsxs(a.span, {
                'data-line': '',
                children: [
                  e.jsx(a.span, {
                    style: { color: '#F69D50' },
                    children: 'npm',
                  }),
                  e.jsx(a.span, {
                    style: { color: '#96D0FF' },
                    children: ' run',
                  }),
                  e.jsx(a.span, {
                    style: { color: '#96D0FF' },
                    children: ' dev',
                  }),
                  e.jsx(a.span, {
                    style: { color: '#6CB6FF' },
                    children: ' --',
                  }),
                  e.jsx(a.span, {
                    style: { color: '#6CB6FF' },
                    children: ' -p',
                  }),
                  e.jsx(a.span, {
                    style: { color: '#6CB6FF' },
                    children: ' 3000',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(a.h3, { children: 'rasengan build' }),
      `
`,
      e.jsxs(a.p, {
        children: [
          'The ',
          e.jsx(a.code, { children: 'rasengan build' }),
          ' command builds the application for production.',
        ],
      }),
      `
`,
      e.jsxs(a.p, {
        children: [
          'First, you need to set the ',
          e.jsx(a.code, { children: 'build' }),
          ' script in your ',
          e.jsx(a.code, { children: 'package.json' }),
          ' file.',
        ],
      }),
      `
`,
      e.jsxs(a.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(a.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'json',
            'data-theme': 'github-dark-dimmed',
            children: 'package.json',
          }),
          e.jsx(a.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'json',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(a.code, {
              'data-line-numbers': '',
              'data-language': 'json',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              'data-line-numbers-max-digits': '1',
              children: [
                e.jsx(a.span, {
                  'data-line': '',
                  children: e.jsx(a.span, {
                    style: { color: '#ADBAC7' },
                    children: '{',
                  }),
                }),
                `
`,
                e.jsxs(a.span, {
                  'data-line': '',
                  children: [
                    e.jsx(a.span, {
                      style: { color: '#8DDB8C' },
                      children: '  "scripts"',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#ADBAC7' },
                      children: ': {',
                    }),
                  ],
                }),
                `
`,
                e.jsxs(a.span, {
                  'data-line': '',
                  children: [
                    e.jsx(a.span, {
                      style: { color: '#8DDB8C' },
                      children: '    "build"',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#ADBAC7' },
                      children: ': ',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#96D0FF' },
                      children: '"rasengan build"',
                    }),
                  ],
                }),
                `
`,
                e.jsx(a.span, {
                  'data-line': '',
                  children: e.jsx(a.span, {
                    style: { color: '#ADBAC7' },
                    children: '  }',
                  }),
                }),
                `
`,
                e.jsx(a.span, {
                  'data-line': '',
                  children: e.jsx(a.span, {
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
      e.jsx(a.p, { children: 'Then, you can run the following command:' }),
      `
`,
      e.jsxs(a.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(a.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: 'Terminal',
          }),
          e.jsx(a.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: e.jsx(a.code, {
              'data-language': 'bash',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: e.jsxs(a.span, {
                'data-line': '',
                children: [
                  e.jsx(a.span, {
                    style: { color: '#F69D50' },
                    children: 'npm',
                  }),
                  e.jsx(a.span, {
                    style: { color: '#96D0FF' },
                    children: ' run',
                  }),
                  e.jsx(a.span, {
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
      e.jsx(t, {
        prev: {
          href: '/docs/api-reference/create-rasengan-cli',
          label: 'Create Rasengan CLI',
        },
      }),
    ],
  });
}
function d(n = {}) {
  const { wrapper: a } = n.components || {};
  return a ? e.jsx(a, { ...n, children: e.jsx(s, { ...n }) }) : s(n);
}
const l = {
    path: '/rasengan-cli',
    metadata: {
      title: 'Rasengan CLI | API Reference | Rasengan.js',
      description: 'Commands available in the Rasengan CLI.',
    },
  },
  r = [
    {
      title: 'Commands',
      anchor: { id: 'commands', text: 'Commands' },
      level: 2,
      children: [
        {
          title: 'rasengan dev',
          anchor: { id: 'rasengan-dev', text: 'rasengan dev' },
          level: 3,
        },
        {
          title: 'rasengan build',
          anchor: { id: 'rasengan-build', text: 'rasengan build' },
          level: 3,
        },
      ],
    },
  ];
d.metadata = l;
d.toc = r;
d.type = 'MDXPageComponent';
export { d as default };
