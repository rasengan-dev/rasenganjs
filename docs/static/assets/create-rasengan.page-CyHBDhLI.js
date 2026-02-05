import { j as e } from './vendor-CfbgIbdB.js';
import { T as t } from './shared-components-CkrC6jAk.js';
function r(n) {
  const a = {
    a: 'a',
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    li: 'li',
    p: 'p',
    pre: 'pre',
    span: 'span',
    strong: 'strong',
    ul: 'ul',
    ...n.components,
  };
  return (
    t || d('Tabs', !1),
    t.Item || d('Tabs.Item', !0),
    e.jsxs(e.Fragment, {
      children: [
        e.jsx('span', {
          className: 'text-[12px] font-mono-regular text-foreground/60',
          style: { fontSize: 12 },
          children: e.jsx(a.p, { children: 'PACKAGES' }),
        }),
        `
`,
        e.jsx(a.h1, { children: 'Create Rasengan CLI' }),
        `
`,
        e.jsxs(a.p, {
          children: [
            'The easiest way to get started with Rasengan.js is by using ',
            e.jsx(a.code, { children: 'create-rasengan' }),
            '. This CLI tool enables you to quickly start building a new Rasengan.js application, with everything set up for you.',
          ],
        }),
        `
`,
        e.jsx(a.h2, { children: 'Usage' }),
        `
`,
        e.jsx(a.p, {
          children:
            'You can create a new project just by running one of the following command:',
        }),
        `
`,
        e.jsxs(t, {
          tabs: [
            { title: 'npx' },
            { title: 'npm' },
            { title: 'pnpm' },
            { title: 'yarn' },
          ],
          activeIndex: 0,
          className: 'mb-4',
          children: [
            e.jsx(t.Item, {
              children: e.jsxs(a.figure, {
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
                            children: 'npx',
                          }),
                          e.jsx(a.span, {
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
            e.jsx(t.Item, {
              children: e.jsxs(a.figure, {
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
                            children: ' create',
                          }),
                          e.jsx(a.span, {
                            style: { color: '#96D0FF' },
                            children: ' rasengan',
                          }),
                        ],
                      }),
                    }),
                  }),
                ],
              }),
            }),
            e.jsx(t.Item, {
              children: e.jsxs(a.figure, {
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
                            children: 'pnpm',
                          }),
                          e.jsx(a.span, {
                            style: { color: '#96D0FF' },
                            children: ' create',
                          }),
                          e.jsx(a.span, {
                            style: { color: '#96D0FF' },
                            children: ' rasengan',
                          }),
                        ],
                      }),
                    }),
                  }),
                ],
              }),
            }),
            e.jsx(t.Item, {
              children: e.jsxs(a.figure, {
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
                            children: 'yarn',
                          }),
                          e.jsx(a.span, {
                            style: { color: '#96D0FF' },
                            children: ' create',
                          }),
                          e.jsx(a.span, {
                            style: { color: '#96D0FF' },
                            children: ' rasengan',
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
        `
`,
        e.jsx(a.p, {
          children: 'You will then be asked the following prompts:',
        }),
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
              children: e.jsxs(a.code, {
                'data-language': 'bash',
                'data-theme': 'github-dark-dimmed',
                style: { display: 'grid' },
                children: [
                  e.jsxs(a.span, {
                    'data-line': '',
                    children: [
                      e.jsx(a.span, {
                        style: { color: '#F69D50' },
                        children: '-',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' What',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' would',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' you',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' like',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' to',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' name',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' your',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' project?',
                      }),
                    ],
                  }),
                  `
`,
                  e.jsxs(a.span, {
                    'data-line': '',
                    children: [
                      e.jsx(a.span, {
                        style: { color: '#F69D50' },
                        children: '-',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' Which',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' language',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' would',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' you',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' like',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' to',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' use',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' for',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' your',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' project?',
                      }),
                    ],
                  }),
                  `
`,
                  e.jsxs(a.span, {
                    'data-line': '',
                    children: [
                      e.jsx(a.span, {
                        style: { color: '#F69D50' },
                        children: '-',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' Which',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' template',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' would',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' you',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' like',
                      }),
                      e.jsx(a.span, {
                        style: { color: '#96D0FF' },
                        children: ' to',
                      }),
                      e.jsx(a.span, {
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
        `
`,
        e.jsx(a.p, {
          children:
            "Once you've answered the prompts, a new project will be created with the correct configuration depending on your answers.",
        }),
        `
`,
        e.jsx(a.h3, { children: 'Options' }),
        `
`,
        e.jsxs(a.p, {
          children: [
            'You can also pass the following options to the ',
            e.jsx(a.code, { children: 'create-rasengan' }),
            ' command:',
          ],
        }),
        `
`,
        e.jsx(a.h4, { children: 'project name' }),
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
                      children: 'npx',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#96D0FF' },
                      children: ' create-rasengan@latest',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#96D0FF' },
                      children: ' my-app',
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
        `
`,
        e.jsx(a.h4, { children: 'skip questions (-y or --yes)' }),
        `
`,
        e.jsxs(a.p, {
          children: [
            e.jsx(a.code, { children: '-y' }),
            ' option stands for ',
            e.jsx(a.code, { children: 'yes' }),
            ', which means the CLI has to take all the default answers.',
          ],
        }),
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
                      children: 'npx',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#96D0FF' },
                      children: ' create-rasengan@latest',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#96D0FF' },
                      children: ' my-app',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#6CB6FF' },
                      children: ' -y',
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
        `
`,
        e.jsx(a.h4, { children: 'beta (--beta or --experimental)' }),
        `
`,
        e.jsxs(a.p, {
          children: [
            e.jsx(a.code, { children: '--beta' }),
            ' is used to initialize a new Rasengan.js project with the lastest beta version available. Note that, if the ',
            e.jsx(a.code, { children: 'stable' }),
            ' version is already available this option will not take effect.',
          ],
        }),
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
                      children: 'npx',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#96D0FF' },
                      children: ' create-rasengan@latest',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#96D0FF' },
                      children: ' my-app',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#6CB6FF' },
                      children: ' --beta',
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
        `
`,
        e.jsx(a.h4, { children: 'git (--git)' }),
        `
`,
        e.jsxs(a.p, {
          children: [
            e.jsx(a.code, { children: '--git' }),
            ' create the first commit after the project has been generated.',
          ],
        }),
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
                      children: 'npx',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#96D0FF' },
                      children: ' create-rasengan@latest',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#96D0FF' },
                      children: ' my-app',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#6CB6FF' },
                      children: ' --git',
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
        `
`,
        e.jsx(a.h4, { children: 'language (--language)' }),
        `
`,
        e.jsxs(a.p, {
          children: [
            e.jsx(a.code, { children: '--language' }),
            ' is used to selected a language directly from ',
            e.jsx(a.code, { children: '(javascript or typescript)' }),
            '.',
          ],
        }),
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
                      children: 'npx',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#96D0FF' },
                      children: ' create-rasengan@latest',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#96D0FF' },
                      children: ' my-app',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#6CB6FF' },
                      children: ' --language',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#96D0FF' },
                      children: ' typescript',
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
        `
`,
        e.jsx(a.h4, { children: 'with-shadcn (--with-shadcn)' }),
        `
`,
        e.jsxs(a.p, {
          children: [
            e.jsx(a.code, { children: '--with-shadcn' }),
            ' is used to initialize a new Rasengan.js project with Shadcn UI configured and ready to use.',
          ],
        }),
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
                      children: 'npx',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#96D0FF' },
                      children: ' create-rasengan@latest',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#96D0FF' },
                      children: ' my-app',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#6CB6FF' },
                      children: ' --with-shadcn',
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
            'The default language used is ',
            e.jsx(a.code, { children: 'typescript' }),
            ', but you can also use ',
            e.jsx(a.code, { children: 'javascript' }),
            ' by passing the ',
            e.jsx(a.code, { children: '--language javascript' }),
            ' option.',
          ],
        }),
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
                      children: 'npx',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#96D0FF' },
                      children: ' create-rasengan@latest',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#96D0FF' },
                      children: ' my-app',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#6CB6FF' },
                      children: ' --with-shadcn',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#6CB6FF' },
                      children: ' --language',
                    }),
                    e.jsx(a.span, {
                      style: { color: '#96D0FF' },
                      children: ' javascript',
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
        `
`,
        e.jsx(a.h2, { children: 'Why use create-rasengan ?' }),
        `
`,
        e.jsxs(a.p, {
          children: [
            e.jsx(a.code, { children: 'create-rasengan' }),
            ' allows you to create a new Rasengan.js app within seconds. It is officially maintained by the creators of Rasengan.js, and includes a number of benefits:',
          ],
        }),
        `
`,
        e.jsxs(a.ul, {
          children: [
            `
`,
            e.jsxs(a.li, {
              children: [
                e.jsx(a.strong, { children: 'Interactive Experience' }),
                ': Running ',
                e.jsx(a.code, { children: 'npx create-rasengan@latest' }),
                ' launches an interactive experience that guides you through setting up a project.',
              ],
            }),
            `
`,
            e.jsxs(a.li, {
              children: [
                e.jsx(a.strong, { children: 'Direct use' }),
                ": You don't need to install the CLI globally before using it.",
              ],
            }),
            `
`,
          ],
        }),
        `
`,
        e.jsx(a.h2, { children: 'Community' }),
        `
`,
        e.jsx(a.p, {
          children:
            'Join the Rasengan.js community to get support, ask questions, and share your projects:',
        }),
        `
`,
        e.jsxs(a.ul, {
          children: [
            `
`,
            e.jsxs(a.li, {
              children: [
                e.jsx('a', {
                  href: 'https://github.com/rasengan-dev/rasenganjs/discussions',
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  children: 'GitHub Discussions',
                }),
                ' – Ask questions and share ideas.',
              ],
            }),
            `
`,
          ],
        }),
        `
`,
        `
`,
        e.jsxs(a.ul, {
          children: [
            `
`,
            e.jsxs(a.li, {
              children: [
                e.jsx('a', {
                  href: 'https://x.com/rasenganjs',
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  children: 'X (Twitter)',
                }),
                ' – Stay updated with the latest news.',
              ],
            }),
            `
`,
            e.jsxs(a.li, {
              children: [
                e.jsx('a', {
                  href: 'https://www.linkedin.com/company/rasenganjs/',
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  children: 'Linkedin',
                }),
                ' – Follow the company page.',
              ],
            }),
            `
`,
          ],
        }),
        `
`,
        e.jsx(a.p, {
          children: "Let's build something amazing with Rasengan.js! 🚀",
        }),
        `
`,
        e.jsx(a.h2, { children: 'License' }),
        `
`,
        e.jsxs(a.p, {
          children: [
            'This package is ',
            e.jsx(a.a, {
              href: 'https://github.com/rasengan-dev/rasenganjs/blob/main/LICENSE',
              children: 'MIT licensed',
            }),
            '.',
          ],
        }),
      ],
    })
  );
}
function s(n = {}) {
  const { wrapper: a } = n.components || {};
  return a ? e.jsx(a, { ...n, children: e.jsx(r, { ...n }) }) : r(n);
}
function d(n, a) {
  throw new Error(
    'Expected ' +
      (a ? 'component' : 'object') +
      ' `' +
      n +
      '` to be defined: you likely forgot to import, pass, or provide it.'
  );
}
const l = {
    path: '/create-rasengan',
    metadata: {
      title: 'Create Rasengan Package - Modules | Packages | Rasengan.js',
      description: 'Documentation for the Create Rasengan package.',
    },
  },
  i = [
    {
      title: 'Usage',
      anchor: { id: 'usage', text: 'Usage' },
      level: 2,
      children: [
        {
          title: 'Options',
          anchor: { id: 'options', text: 'Options' },
          level: 3,
        },
      ],
    },
    {
      title: 'Why use create-rasengan ?',
      anchor: {
        id: 'why-use-create-rasengan-?',
        text: 'Why use create-rasengan ?',
      },
      level: 2,
      children: [],
    },
    {
      title: 'Community',
      anchor: { id: 'community', text: 'Community' },
      level: 2,
      children: [],
    },
    {
      title: 'License',
      anchor: { id: 'license', text: 'License' },
      level: 2,
      children: [],
    },
  ];
s.metadata = l;
s.toc = i;
s.type = 'MDXPageComponent';
export { s as default };
