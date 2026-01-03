import { j as e } from './vendor-w5t4XTd4.js';
import {
  T as a,
  S as n,
  A as i,
  P as c,
} from './shared-components-DBceyN8p.js';
function t(l) {
  const s = {
    a: 'a',
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    li: 'li',
    p: 'p',
    pre: 'pre',
    span: 'span',
    strong: 'strong',
    ul: 'ul',
    ...l.components,
  };
  return (
    a || d('Tabs', !1),
    a.Item || d('Tabs.Item', !0),
    e.jsxs(e.Fragment, {
      children: [
        e.jsx('span', {
          className: 'text-[12px] font-mono-regular text-foreground/60',
          style: { fontSize: 12 },
          children: e.jsx(s.p, { children: 'GETTING STARTED' }),
        }),
        `
`,
        e.jsx(s.h1, { children: 'Get started with Rasengan.js' }),
        `
`,
        e.jsxs(s.p, {
          children: [
            e.jsx(s.strong, { children: 'Rasengan.js' }),
            ' takes care of all the complex parts of web development —',
            e.jsx(s.strong, {
              children: 'routing, rendering, optimization, and performance',
            }),
            '— so you don’t have to. It scans your React components, automatically applies best practices, and generates the most efficient output for your project.',
          ],
        }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'With ',
            e.jsx(s.strong, { children: 'Rasengan.js' }),
            ', you can ',
            e.jsx(s.strong, { children: 'focus on building your app' }),
            ', while it handles the difficult technical details behind the scenes. It’s —',
            e.jsx(s.strong, { children: 'fast, flexible, and reliable' }),
            '— with minimal setup and zero hassle. 🚀',
          ],
        }),
        `
`,
        e.jsx(s.h2, { children: 'Pre-requisites' }),
        `
`,
        e.jsxs(s.ul, {
          children: [
            `
`,
            e.jsxs(s.li, {
              children: [
                e.jsx('a', {
                  href: 'https://nodejs.org',
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  children: 'Node.js 20.18',
                }),
                ' or later.',
              ],
            }),
            `
`,
            e.jsx(s.li, {
              children: 'macOS, Windows, and Linux are supported.',
            }),
            `
`,
          ],
        }),
        `
`,
        e.jsx(s.h2, { children: 'Installation' }),
        `
`,
        e.jsx(s.h3, { children: 'Automatic Installation' }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'The best way to start a new ',
            e.jsx(s.strong, { children: 'Rasengan.js' }),
            ' project is with ',
            e.jsx(s.strong, {
              children: e.jsx(s.a, {
                href: '/docs/api-reference/create-rasengan-cli',
                children: 'create-rasengan CLI',
              }),
            }),
            ', which sets everything up for you automatically.',
          ],
        }),
        `
`,
        e.jsx(s.p, {
          children: 'Just follow the following steps to get started:',
        }),
        `
`,
        e.jsx(n, {
          step: '01',
          title: 'Create a new project',
          content: `
  Run the following command to create a new project.
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
                        children: 'npx',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#96D0FF' },
                        children: ' create-rasengan@latest',
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
        e.jsx(n, {
          step: '02',
          title: 'Follow the prompts',
          content: `
  On the installation process, you will see the following prompts:
`,
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
                children: e.jsxs(s.code, {
                  'data-language': 'bash',
                  'data-theme': 'github-dark-dimmed',
                  style: { display: 'grid' },
                  children: [
                    e.jsxs(s.span, {
                      'data-line': '',
                      children: [
                        e.jsx(s.span, {
                          style: { color: '#F69D50' },
                          children: '-',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' What',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' would',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' you',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' like',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' to',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' name',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' your',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' project?',
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
                          children: '-',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' Which',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' language',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' would',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' you',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' like',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' to',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' use',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' for',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' your',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' project?',
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
                          children: '-',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' Which',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' template',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' would',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' you',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' like',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' to',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' use?',
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
        e.jsx(n, {
          step: '03',
          title: 'Install dependencies',
          content:
            '\n  After the prompts, `create-rasengan` will create a folder with your project name. Move yourself inside and install the required dependencies.\n',
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
                children: e.jsxs(s.code, {
                  'data-language': 'bash',
                  'data-theme': 'github-dark-dimmed',
                  style: { display: 'grid' },
                  children: [
                    e.jsxs(s.span, {
                      'data-line': '',
                      children: [
                        e.jsx(s.span, {
                          style: { color: '#6CB6FF' },
                          children: 'cd',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' my-app',
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
                          children: 'npm',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' install',
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
        e.jsx(n, {
          step: '04',
          title: 'Run the application',
          content: `
  Run the following command to start the development server.
`,
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
                        children: 'npm',
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
        e.jsx(s.h3, { children: 'Manual Installation' }),
        `
`,
        e.jsx(i, {
          title: 'Warning',
          description:
            'This method is not recommended for beginners. It is recommended to use the automatic installation method.',
          className: 'mb-4',
          status: 'warning',
        }),
        `
`,
        e.jsxs(a, {
          tabs: [{ title: 'Using JavaScript' }, { title: 'Using TypeScript' }],
          activeIndex: 1,
          children: [
            e.jsxs(a.Item, {
              children: [
                e.jsxs(s.p, {
                  children: [
                    'The following steps will guide you through setting up a new ',
                    e.jsx(s.strong, { children: 'Rasengan.js' }),
                    ' project manually using ',
                    e.jsx(s.code, { children: 'JavaScript' }),
                    '.',
                  ],
                }),
                e.jsx(n, {
                  step: '01',
                  title: 'Install dependencies',
                  content: `
  Create a new folder first and move yourself inside.

  Then generate a new \`package.json\` file and install the required dependencies.
`,
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
                        children: e.jsxs(s.code, {
                          'data-language': 'bash',
                          'data-theme': 'github-dark-dimmed',
                          style: { display: 'grid' },
                          children: [
                            e.jsxs(s.span, {
                              'data-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#F69D50' },
                                  children: 'mkdir',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' my-app',
                                }),
                              ],
                            }),
                            `
`,
                            e.jsxs(s.span, {
                              'data-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: 'cd',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' my-app',
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
                                  children: 'npm',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' init',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' -y',
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
                                  children: 'npm',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' install',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' rasengan@latest',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' @rasenganjs/serve@latest',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' react@latest',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' react-dom@latest',
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
                                  children: 'npm',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' install',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' --save-dev',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' cross-env',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' vite@latest',
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
                e.jsx(n, {
                  step: '02',
                  title: 'Add scripts into package.json',
                  content:
                    '\n  Open the `package.json` file and add the following scripts.\n',
                  children: e.jsxs(s.figure, {
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
                            e.jsxs(s.span, {
                              'data-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"scripts"',
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
                                  children: '  "dev"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ': ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"rasengan dev"',
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
                                  children: '  "build"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ': ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"rasengan build"',
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
                                  children: '  "serve"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ': ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"rasengan-serve ./dist"',
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
                }),
                e.jsx(n, {
                  step: '03',
                  title: 'Create root directories and files',
                  content: `
  First, create the necessary directories at the root of your project.
  
  - \`public\`: Contains static assets like icons and images.
  - \`src\`: Contains your application’s source code.
  
  Then, create the \`rasengan.config.js\` configuration file.
`,
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
                        children: e.jsxs(s.code, {
                          'data-language': 'bash',
                          'data-theme': 'github-dark-dimmed',
                          style: { display: 'grid' },
                          children: [
                            e.jsxs(s.span, {
                              'data-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#F69D50' },
                                  children: 'mkdir',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' public',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' src',
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
                                  children: 'touch',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' rasengan.config.js',
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
                e.jsx(n, {
                  step: '04',
                  title: 'Configure Rasengan.js',
                  content:
                    '\n  Open the `rasengan.config.js` file and add the following configuration. \n',
                  children: e.jsxs(s.figure, {
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
                                  children: '({})',
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
                }),
                e.jsx(n, {
                  step: '05',
                  title: 'Create sub-directories and files',
                  content:
                    "\n  Inside the `src` directory, create an `app` folder to store your application's pages.\n\n  Then create a `home.page.jsx` and `app.router.js` files inside the `app` directory.\n\n  Finally create a `main.jsx`, `template.jsx` and `index.js` files inside the `src` directory.\n",
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
                        children: e.jsxs(s.code, {
                          'data-language': 'bash',
                          'data-theme': 'github-dark-dimmed',
                          style: { display: 'grid' },
                          children: [
                            e.jsxs(s.span, {
                              'data-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#F69D50' },
                                  children: 'mkdir',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' src/app',
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
                                  style: { color: '#F69D50' },
                                  children: 'touch',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' src/app/home.page.jsx',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' src/app/app.router.js',
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
                                  style: { color: '#F69D50' },
                                  children: 'touch',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' src/main.jsx',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' src/template.jsx',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' src/index.js',
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
                e.jsx(n, {
                  step: '06',
                  title: 'Create a simple page',
                  content:
                    '\n  Open the `home.page.jsx` file and add the following code to create a simple page.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'jsx',
                        'data-theme': 'github-dark-dimmed',
                        children: 'home.page.jsx',
                      }),
                      e.jsx(s.pre, {
                        style: { backgroundColor: '#22272e', color: '#adbac7' },
                        tabIndex: '0',
                        'data-language': 'jsx',
                        'data-theme': 'github-dark-dimmed',
                        children: e.jsxs(s.code, {
                          'data-line-numbers': '',
                          'data-language': 'jsx',
                          'data-theme': 'github-dark-dimmed',
                          style: { display: 'grid' },
                          'data-line-numbers-max-digits': '2',
                          children: [
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
                                  children: 'main',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: '>Home Page</',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'main',
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
                                children: '  )',
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
                                  children: 'Home.path ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' "/"',
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
                                  children: '"Home page"',
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
                }),
                e.jsx(n, {
                  step: '07',
                  title: 'Create a router',
                  content:
                    '\n  Open the `app.router.js` file and add the following code to create a router.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'javascript',
                        'data-theme': 'github-dark-dimmed',
                        children: 'app.router.js',
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
                                  children:
                                    ' { RouterComponent, defineRouter } ',
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
                            e.jsxs(s.span, {
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
                                  children: ' "@/app/home.page"',
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
                            e.jsx(s.span, {
                              'data-line': '',
                              children: e.jsx(s.span, {
                                style: { color: '#ADBAC7' },
                                children: '  pages: [Home]',
                              }),
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
                }),
                e.jsx(n, {
                  step: '08',
                  title: 'Define the main component',
                  content:
                    '\n  Open the `main.jsx` file and add the following code to define the main component.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'jsx',
                        'data-theme': 'github-dark-dimmed',
                        children: 'main.jsx',
                      }),
                      e.jsx(s.pre, {
                        style: { backgroundColor: '#22272e', color: '#adbac7' },
                        tabIndex: '0',
                        'data-language': 'jsx',
                        'data-theme': 'github-dark-dimmed',
                        children: e.jsxs(s.code, {
                          'data-line-numbers': '',
                          'data-language': 'jsx',
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
                                  children: ' AppRouter ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: 'from',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' "@/app/app.router"',
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
                                  children: '({ Component, children }) ',
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
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: 'AppRouter',
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
                }),
                e.jsx(n, {
                  step: '9',
                  title: 'Define the template HTML',
                  content:
                    '\n  Open the `template.jsx` file and add the following code to define the template HTML.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'jsx',
                        'data-theme': 'github-dark-dimmed',
                        children: 'template.jsx',
                      }),
                      e.jsx(s.pre, {
                        style: { backgroundColor: '#22272e', color: '#adbac7' },
                        tabIndex: '0',
                        'data-language': 'jsx',
                        'data-theme': 'github-dark-dimmed',
                        children: e.jsxs(s.code, {
                          'data-line-numbers': '',
                          'data-language': 'jsx',
                          'data-theme': 'github-dark-dimmed',
                          style: { display: 'grid' },
                          'data-line-numbers-max-digits': '2',
                          children: [
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
                                  children: ' Template',
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
                                style: { color: '#F69D50' },
                                children: '  Head,',
                              }),
                            }),
                            `
`,
                            e.jsx(s.span, {
                              'data-line': '',
                              children: e.jsx(s.span, {
                                style: { color: '#F69D50' },
                                children: '  Body,',
                              }),
                            }),
                            `
`,
                            e.jsx(s.span, {
                              'data-line': '',
                              children: e.jsx(s.span, {
                                style: { color: '#F69D50' },
                                children: '  Script',
                              }),
                            }),
                            `
`,
                            e.jsxs(s.span, {
                              'data-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#F69D50' },
                                  children: '}) ',
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
                                  children: 'html',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' lang',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"en"',
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
                                  children: 'Head',
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
                                  children: '        <',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'meta',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' charSet',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"UTF-8"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ' />',
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
                                  children: '        <',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'link',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' rel',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"icon"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' type',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"image/svg+xml"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' href',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"/rasengan.svg"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ' />',
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
                                  children: '        <',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'meta',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' name',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"viewport"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' content',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children:
                                    '"width=device-width, initial-scale=1.0"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ' />',
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
                                  children: '      </',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'Head',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: '>',
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
                                  style: { color: '#ADBAC7' },
                                  children: '      <',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'Body',
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
                                  children: '        <',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'Script',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ' />',
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
                                  children: '      </',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'Body',
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
                                  children: 'html',
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
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
                e.jsx(n, {
                  step: '10',
                  title: 'Define the entry point',
                  content:
                    '\n  Open the `index.js` file and add the following code to define the entry point.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'jsx',
                        'data-theme': 'github-dark-dimmed',
                        children: 'index.js',
                      }),
                      e.jsx(s.pre, {
                        style: { backgroundColor: '#22272e', color: '#adbac7' },
                        tabIndex: '0',
                        'data-language': 'jsx',
                        'data-theme': 'github-dark-dimmed',
                        children: e.jsxs(s.code, {
                          'data-line-numbers': '',
                          'data-language': 'jsx',
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
                              'data-highlighted-line': '',
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
                }),
                e.jsx(n, {
                  step: '11',
                  title: 'Run the application',
                  content: `
  Run the following command to start the development server.
`,
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
                                children: 'npm',
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
              ],
            }),
            e.jsxs(a.Item, {
              children: [
                e.jsxs(s.p, {
                  children: [
                    'The following steps will guide you through setting up a new ',
                    e.jsx(s.strong, { children: 'Rasengan.js' }),
                    ' project manually using ',
                    e.jsx(s.code, { children: 'TypeScript' }),
                    '.',
                  ],
                }),
                e.jsx(n, {
                  step: '01',
                  title: 'Install dependencies',
                  content: `
  Create a new folder first and move yourself inside.

  Then generate a new \`package.json\` file and install the required dependencies.
`,
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
                        children: e.jsxs(s.code, {
                          'data-language': 'bash',
                          'data-theme': 'github-dark-dimmed',
                          style: { display: 'grid' },
                          children: [
                            e.jsxs(s.span, {
                              'data-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#F69D50' },
                                  children: 'mkdir',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' my-app',
                                }),
                              ],
                            }),
                            `
`,
                            e.jsxs(s.span, {
                              'data-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: 'cd',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' my-app',
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
                                  children: 'npm',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' init',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' -y',
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
                                  children: 'npm',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' install',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' rasengan@latest',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' @rasenganjs/serve@latest',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' react@latest',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' react-dom@latest',
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
                                  children: 'npm',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' install',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' --save-dev',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' cross-env',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' vite@latest',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' @types/react',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' @types/react-dom',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' @types/node',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' typescript',
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
                e.jsx(n, {
                  step: '02',
                  title: 'Add scripts into package.json',
                  content:
                    '\n  Open the `package.json` file and add the following scripts.\n',
                  children: e.jsxs(s.figure, {
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
                            e.jsxs(s.span, {
                              'data-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"scripts"',
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
                                  children: '  "dev"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ': ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"rasengan dev"',
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
                                  children: '  "build"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ': ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"rasengan build"',
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
                                  children: '  "serve"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ': ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"rasengan-serve ./dist"',
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
                }),
                e.jsx(n, {
                  step: '03',
                  title: 'Create root directories and files',
                  content: `
  First, create the necessary directories at the root of your project.
  
  - \`public\`: Contains static assets like icons and images.
  - \`src\`: Contains your application’s source code.
  
  Then, create the \`rasengan.config.js\` configuration file.
`,
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
                        children: e.jsxs(s.code, {
                          'data-language': 'bash',
                          'data-theme': 'github-dark-dimmed',
                          style: { display: 'grid' },
                          children: [
                            e.jsxs(s.span, {
                              'data-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#F69D50' },
                                  children: 'mkdir',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' public',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' src',
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
                                  children: 'touch',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' rasengan.config.js',
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
                e.jsx(n, {
                  step: '04',
                  title: 'Configure Rasengan.js',
                  content:
                    '\n  Open the `rasengan.config.js` file and add the following configuration. \n',
                  children: e.jsxs(s.figure, {
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
                                  children: '({})',
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
                }),
                e.jsx(n, {
                  step: '05',
                  title: 'Create sub-directories and files',
                  content:
                    "\n  Inside the `src` directory, create an `app` folder to store your application's pages.\n\n  Then create a `home.page.tsx` and `app.router.ts` files inside the `app` directory.\n\n  Finally create a `main.tsx`, `template.tsx` and `index.ts` files inside the `src` directory.\n",
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
                        children: e.jsxs(s.code, {
                          'data-language': 'bash',
                          'data-theme': 'github-dark-dimmed',
                          style: { display: 'grid' },
                          children: [
                            e.jsxs(s.span, {
                              'data-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#F69D50' },
                                  children: 'mkdir',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' src/app',
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
                                  style: { color: '#F69D50' },
                                  children: 'touch',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' src/app/home.page.tsx',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' src/app/app.router.ts',
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
                                  style: { color: '#F69D50' },
                                  children: 'touch',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' src/main.tsx',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' src/template.tsx',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' src/index.ts',
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
                e.jsx(n, {
                  step: '06',
                  title: 'Create a simple page',
                  content:
                    '\n  Open the `home.page.tsx` file and add the following code to create a simple page.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'jsx',
                        'data-theme': 'github-dark-dimmed',
                        children: 'home.page.tsx',
                      }),
                      e.jsx(s.pre, {
                        style: { backgroundColor: '#22272e', color: '#adbac7' },
                        tabIndex: '0',
                        'data-language': 'jsx',
                        'data-theme': 'github-dark-dimmed',
                        children: e.jsxs(s.code, {
                          'data-line-numbers': '',
                          'data-language': 'jsx',
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
                                  children: ' { ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: 'type',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ' PageComponent } ',
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
                                  children: 'main',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: '>Home Page</',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'main',
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
                                children: '  )',
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
                                  children: 'Home.path ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' "/"',
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
                                  children: '"Home page"',
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
                }),
                e.jsx(n, {
                  step: '07',
                  title: 'Create a router',
                  content:
                    '\n  Open the `app.router.ts` file and add the following code to create a router.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'javascript',
                        'data-theme': 'github-dark-dimmed',
                        children: 'app.router.ts',
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
                                  children:
                                    ' { RouterComponent, defineRouter } ',
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
                            e.jsxs(s.span, {
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
                                  children: ' "@/app/home.page"',
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
                            e.jsx(s.span, {
                              'data-line': '',
                              children: e.jsx(s.span, {
                                style: { color: '#ADBAC7' },
                                children: '  pages: [Home]',
                              }),
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
                }),
                e.jsx(n, {
                  step: '08',
                  title: 'Define the main component',
                  content:
                    '\n  Open the `main.tsx` file and add the following code to define the main component.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'jsx',
                        'data-theme': 'github-dark-dimmed',
                        children: 'main.tsx',
                      }),
                      e.jsx(s.pre, {
                        style: { backgroundColor: '#22272e', color: '#adbac7' },
                        tabIndex: '0',
                        'data-language': 'jsx',
                        'data-theme': 'github-dark-dimmed',
                        children: e.jsxs(s.code, {
                          'data-line-numbers': '',
                          'data-language': 'jsx',
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
                            e.jsxs(s.span, {
                              'data-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: 'import',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ' AppRouter ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: 'from',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' "@/app/app.router"',
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
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: 'AppRouter',
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
                }),
                e.jsx(n, {
                  step: '9',
                  title: 'Define the template HTML',
                  content:
                    '\n  Open the `template.tsx` file and add the following code to define the template HTML.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'jsx',
                        'data-theme': 'github-dark-dimmed',
                        children: 'template.tsx',
                      }),
                      e.jsx(s.pre, {
                        style: { backgroundColor: '#22272e', color: '#adbac7' },
                        tabIndex: '0',
                        'data-language': 'jsx',
                        'data-theme': 'github-dark-dimmed',
                        children: e.jsxs(s.code, {
                          'data-line-numbers': '',
                          'data-language': 'jsx',
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
                                  children: ' { ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: 'type',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ' TemplateProps } ',
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
                                  style: { color: '#F47067' },
                                  children: ' function',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#DCBDFB' },
                                  children: ' Template',
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
                                style: { color: '#F69D50' },
                                children: '  Head,',
                              }),
                            }),
                            `
`,
                            e.jsx(s.span, {
                              'data-line': '',
                              children: e.jsx(s.span, {
                                style: { color: '#F69D50' },
                                children: '  Body,',
                              }),
                            }),
                            `
`,
                            e.jsx(s.span, {
                              'data-line': '',
                              children: e.jsx(s.span, {
                                style: { color: '#F69D50' },
                                children: '  Script',
                              }),
                            }),
                            `
`,
                            e.jsxs(s.span, {
                              'data-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#F69D50' },
                                  children: '}',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: ':',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F69D50' },
                                  children: ' TemplateProps) ',
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
                                  children: 'html',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' lang',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"en"',
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
                                  children: 'Head',
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
                                  children: '        <',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'meta',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' charSet',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"UTF-8"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ' />',
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
                                  children: '        <',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'link',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' rel',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"icon"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' type',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"image/svg+xml"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' href',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"/rasengan.svg"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ' />',
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
                                  children: '        <',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'meta',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' name',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"viewport"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' content',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children:
                                    '"width=device-width, initial-scale=1.0"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ' />',
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
                                  children: '      </',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'Head',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: '>',
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
                                  style: { color: '#ADBAC7' },
                                  children: '      <',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'Body',
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
                                  children: '        <',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'Script',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ' />',
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
                                  children: '      </',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'Body',
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
                                  children: 'html',
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
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
                e.jsx(n, {
                  step: '10',
                  title: 'Define the entry point',
                  content:
                    '\n  Open the `index.ts` file and add the following code to define the entry point.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'jsx',
                        'data-theme': 'github-dark-dimmed',
                        children: 'index.ts',
                      }),
                      e.jsx(s.pre, {
                        style: { backgroundColor: '#22272e', color: '#adbac7' },
                        tabIndex: '0',
                        'data-language': 'jsx',
                        'data-theme': 'github-dark-dimmed',
                        children: e.jsxs(s.code, {
                          'data-line-numbers': '',
                          'data-language': 'jsx',
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
                              'data-highlighted-line': '',
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
                }),
                e.jsx(n, {
                  step: '11',
                  title: 'Add extract configuration file for TypeScript.',
                  content:
                    '\n  Create new files called `tsconfig.json` and `rasengan-env.d.ts` at the root of your project.\n',
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
                                children: 'touch',
                              }),
                              e.jsx(s.span, {
                                style: { color: '#96D0FF' },
                                children: ' tsconfig.json',
                              }),
                              e.jsx(s.span, {
                                style: { color: '#96D0FF' },
                                children: ' rasengan-env.d.ts',
                              }),
                            ],
                          }),
                        }),
                      }),
                    ],
                  }),
                }),
                e.jsxs(n, {
                  step: '12',
                  title: 'Configure TypeScript',
                  content:
                    '\n  Open the `tsconfig.json` and `rasengan-env.d.ts` files and add the following configuration.\n',
                  children: [
                    e.jsxs(s.figure, {
                      'data-rehype-pretty-code-figure': '',
                      children: [
                        e.jsx(s.figcaption, {
                          'data-rehype-pretty-code-title': '',
                          'data-language': 'json',
                          'data-theme': 'github-dark-dimmed',
                          children: 'tsconfig.json',
                        }),
                        e.jsx(s.pre, {
                          style: {
                            backgroundColor: '#22272e',
                            color: '#adbac7',
                          },
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
                                    children: '    "target"',
                                  }),
                                  e.jsx(s.span, {
                                    style: { color: '#ADBAC7' },
                                    children: ': ',
                                  }),
                                  e.jsx(s.span, {
                                    style: { color: '#96D0FF' },
                                    children: '"ES2020"',
                                  }),
                                  e.jsx(s.span, {
                                    style: { color: '#ADBAC7' },
                                    children: ',',
                                  }),
                                ],
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
                                  children: '    /* Bundler mode */',
                                }),
                              }),
                              `
`,
                              e.jsxs(s.span, {
                                'data-line': '',
                                children: [
                                  e.jsx(s.span, {
                                    style: { color: '#8DDB8C' },
                                    children: '    "moduleResolution"',
                                  }),
                                  e.jsx(s.span, {
                                    style: { color: '#ADBAC7' },
                                    children: ': ',
                                  }),
                                  e.jsx(s.span, {
                                    style: { color: '#96D0FF' },
                                    children: '"bundler"',
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
                                    children: '    "module"',
                                  }),
                                  e.jsx(s.span, {
                                    style: { color: '#ADBAC7' },
                                    children: ': ',
                                  }),
                                  e.jsx(s.span, {
                                    style: { color: '#96D0FF' },
                                    children: '"ESNext"',
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
                                    children: '    "jsx"',
                                  }),
                                  e.jsx(s.span, {
                                    style: { color: '#ADBAC7' },
                                    children: ': ',
                                  }),
                                  e.jsx(s.span, {
                                    style: { color: '#96D0FF' },
                                    children: '"react-jsx"',
                                  }),
                                  e.jsx(s.span, {
                                    style: { color: '#ADBAC7' },
                                    children: ',',
                                  }),
                                ],
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
                                    '    /* Aliases for intellisence */',
                                }),
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
                                    children: '      "@/*"',
                                  }),
                                  e.jsx(s.span, {
                                    style: { color: '#ADBAC7' },
                                    children: ': [',
                                  }),
                                  e.jsx(s.span, {
                                    style: { color: '#96D0FF' },
                                    children: '"src/*"',
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
                                  children: '  },',
                                }),
                              }),
                              `
`,
                              e.jsxs(s.span, {
                                'data-line': '',
                                children: [
                                  e.jsx(s.span, {
                                    style: { color: '#8DDB8C' },
                                    children: '  "include"',
                                  }),
                                  e.jsx(s.span, {
                                    style: { color: '#ADBAC7' },
                                    children: ': [',
                                  }),
                                  e.jsx(s.span, {
                                    style: { color: '#96D0FF' },
                                    children: '"src"',
                                  }),
                                  e.jsx(s.span, {
                                    style: { color: '#ADBAC7' },
                                    children: ', ',
                                  }),
                                  e.jsx(s.span, {
                                    style: { color: '#96D0FF' },
                                    children: '"rasengan-env.d.ts"',
                                  }),
                                  e.jsx(s.span, {
                                    style: { color: '#ADBAC7' },
                                    children: '],',
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
                                    style: { color: '#8DDB8C' },
                                    children: '  "extends"',
                                  }),
                                  e.jsx(s.span, {
                                    style: { color: '#ADBAC7' },
                                    children: ': ',
                                  }),
                                  e.jsx(s.span, {
                                    style: { color: '#96D0FF' },
                                    children:
                                      '"./node_modules/rasengan/tsconfig.base.json"',
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
                    e.jsxs(s.figure, {
                      'data-rehype-pretty-code-figure': '',
                      children: [
                        e.jsx(s.figcaption, {
                          'data-rehype-pretty-code-title': '',
                          'data-language': 'typescript',
                          'data-theme': 'github-dark-dimmed',
                          children: 'rasengan-env.d.ts',
                        }),
                        e.jsx(s.pre, {
                          style: {
                            backgroundColor: '#22272e',
                            color: '#adbac7',
                          },
                          tabIndex: '0',
                          'data-language': 'typescript',
                          'data-theme': 'github-dark-dimmed',
                          children: e.jsx(s.code, {
                            'data-language': 'typescript',
                            'data-theme': 'github-dark-dimmed',
                            style: { display: 'grid' },
                            children: e.jsxs(s.span, {
                              'data-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#768390' },
                                  children: '/// <',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'reference',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' types',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"rasengan/types/client"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#768390' },
                                  children: ' />',
                                }),
                              ],
                            }),
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsx(n, {
                  step: '13',
                  title: 'Run the application',
                  content: `
  Run the following command to start the development server.
`,
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
                                children: 'npm',
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
              ],
            }),
          ],
        }),
        `
`,
        e.jsx(c, {
          prev: {
            href: '/docs/getting-started/introduction',
            label: 'Introduction',
          },
          next: {
            href: '/docs/getting-started/project-structure',
            label: 'Project Structure',
          },
        }),
      ],
    })
  );
}
function r(l = {}) {
  const { wrapper: s } = l.components || {};
  return s ? e.jsx(s, { ...l, children: e.jsx(t, { ...l }) }) : t(l);
}
function d(l, s) {
  throw new Error(
    'Expected ' +
      (s ? 'component' : 'object') +
      ' `' +
      l +
      '` to be defined: you likely forgot to import, pass, or provide it.'
  );
}
const o = {
    path: '/installation',
    metadata: {
      title:
        'Creating your first Rasengan.js app | Getting Started | Rasengan.js',
      description:
        'Setting up your React project with the Create Rasengan CLI tool in seconds',
    },
  },
  h = void 0;
r.metadata = o;
r.toc = h;
r.type = 'MDXPageComponent';
export { r as default };
