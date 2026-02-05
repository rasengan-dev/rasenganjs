import { j as e } from './vendor-CfbgIbdB.js';
import { A as a } from './shared-components-CkrC6jAk.js';
function r(n) {
  const s = {
    a: 'a',
    blockquote: 'blockquote',
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
        style: { fontSize: 12 },
        children: e.jsx(s.p, { children: 'PACKAGES' }),
      }),
      `
`,
      e.jsx(s.h1, { children: 'Rasengan I18n' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'The ',
          e.jsx(s.code, { children: '@rasenganjs/i18n' }),
          ' makes it easy to add internationalization (i18n) to your Rasengan.js applications. It lets you manage translations using simple, static JSON files—keeping your localization workflow clear, fast, and scalable.',
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Installation' }),
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
                    children: 'npm',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' install',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' @rasenganjs/i18n@1.0.0-beta.3',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Usage' }),
      `
`,
      e.jsx(s.h3, { children: 'Configuration' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'First thing first, you have to configure the ',
          e.jsx(s.code, { children: 'i18n' }),
          ' package into the ',
          e.jsx(s.code, { children: 'rasengan.config.js' }),
          ' file by importing the plugin and passing it to the vite ',
          e.jsx(s.code, { children: 'plugins' }),
          ' array.',
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
              'data-line-numbers': '',
              'data-language': 'js',
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
                      children: ' i18n ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: " '@rasenganjs/i18n/plugin'",
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
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'async',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
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
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '    vite: {',
                  }),
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '      plugins: [',
                  }),
                }),
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: '        i18n',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '({',
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
                      children: '          defaultLocale: ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: "'fr'",
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
                    children: '          resources: {',
                  }),
                }),
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '            source: ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: "'/src/messages'",
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#768390' },
                      children: '// The path to the messages directory',
                    }),
                  ],
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '          },',
                  }),
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '        }),',
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
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '  };',
                  }),
                }),
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '}',
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
      e.jsxs(s.p, {
        children: [
          'The ',
          e.jsx(s.code, { children: 'i18n plugin' }),
          ' takes a configuration object with the following properties:',
        ],
      }),
      `
`,
      e.jsxs(s.table, {
        children: [
          e.jsx(s.thead, {
            children: e.jsxs(s.tr, {
              children: [
                e.jsx(s.th, { children: 'Name' }),
                e.jsx(s.th, { children: 'Type' }),
                e.jsx(s.th, { children: 'Description' }),
                e.jsx(s.th, { children: 'Optional' }),
                e.jsx(s.th, { children: 'Default' }),
              ],
            }),
          }),
          e.jsxs(s.tbody, {
            children: [
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, { children: 'defaultLocale' }),
                  e.jsx(s.td, { children: 'string' }),
                  e.jsx(s.td, { children: 'The default locale to use.' }),
                  e.jsx(s.td, { children: 'false' }),
                  e.jsx(s.td, { children: '-' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, { children: 'resources.source' }),
                  e.jsx(s.td, { children: 'string' }),
                  e.jsx(s.td, {
                    children: 'The path to the messages directory.',
                  }),
                  e.jsx(s.td, { children: 'true' }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'src/messages' }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      `
`,
      e.jsx(s.h3, { children: 'Messages' }),
      `
`,
      e.jsx(s.p, {
        children:
          'The messages directory should contain JSON files for each locale, with the following structure:',
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
            children: 'src/messages/en.json',
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
                      children: '  "translation"',
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
                      children: '    "greeting"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ': ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '"Hello, World!"',
                    }),
                  ],
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
      e.jsx(a, {
        status: 'warning',
        title: 'Warning',
        description:
          'Every JSON file should have a `translation` key that contains the translations for that locale.',
      }),
      `
`,
      e.jsx(s.h3, { children: 'Register the Provider' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'You have to register the ',
          e.jsx(s.code, { children: 'RasenganI18nProvider' }),
          ' component at the root of your application inside the root layout file.',
        ],
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
            children: 'src/app/app.layout.tsx',
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
                      children: ' { LayoutComponent, Outlet } ',
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
                      children: ' { RasenganI18nProvider } ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: " '@rasenganjs/i18n'",
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
                      children: ' i18n ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: " 'virtual:rasengan/i18n'",
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
                      children: ' RootLayout',
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
                      children: 'RasenganI18nProvider',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' i18n',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'i18n',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
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
                      children: '    </',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#8DDB8C' },
                      children: 'RasenganI18nProvider',
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
                      children: 'RootLayout.path ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: " '/:locale?'",
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '; ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#768390' },
                      children:
                        '// Only work while using a Config-based routing',
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
                      style: { color: '#ADBAC7' },
                      children: ' RootLayout;',
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
          'If you prefere using the ',
          e.jsx(s.code, { children: 'file-based routing' }),
          ' feature, you have to put your RootLayout inside the ',
          e.jsx(s.code, { children: 'src/app/_routes/[_locale]/layout.tsx' }),
          ' file.',
        ],
      }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'This is recommended because the ',
          e.jsx(s.code, { children: '@rasenganjs/i18n' }),
          ' package will automatically detect the current ',
          e.jsx(s.code, { children: 'locale' }),
          ' from the url.',
        ],
      }),
      `
`,
      e.jsx(a, {
        status: 'warning',
        title: 'Warning',
        description:
          "Don't wrap your application with the `RasenganI18nProvider` inside the `main.tsx` file, prefer to wrap it inside the root layout file.",
      }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'If you are using ',
          e.jsx(s.code, { children: 'TypeScript' }),
          ', you have to configure types into the ',
          e.jsx(s.code, { children: 'rasengan-env.d.ts' }),
          ' file. This will add the types support for the virtual modules ',
          e.jsx(s.code, { children: 'virtual:rasengan/i18n' }),
          '.',
        ],
      }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'ts',
            'data-theme': 'github-dark-dimmed',
            children: 'rasengan-env.d.ts',
          }),
          e.jsx(s.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'ts',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(s.code, {
              'data-line-numbers': '',
              'data-language': 'ts',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              'data-line-numbers-max-digits': '1',
              children: [
                e.jsxs(s.span, {
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
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
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
                      children: '"@rasenganjs/i18n/types/client"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#768390' },
                      children: ' />',
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
      e.jsx(s.h3, { children: 'Hooks' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'The ',
          e.jsx(s.code, { children: '@rasenganjs/i18n' }),
          ' package provides a number of hooks to help you manage translations in your application.',
        ],
      }),
      `
`,
      e.jsxs(s.table, {
        children: [
          e.jsx(s.thead, {
            children: e.jsxs(s.tr, {
              children: [
                e.jsx(s.th, { children: 'Name' }),
                e.jsx(s.th, { children: 'Description' }),
              ],
            }),
          }),
          e.jsxs(s.tbody, {
            children: [
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'useTranslation' }),
                  }),
                  e.jsx(s.td, {
                    children:
                      'Returns a function that returns the current translation based on the key.',
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'useLocale' }),
                  }),
                  e.jsx(s.td, {
                    children:
                      'Returns the current locale and a function to change it.',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      `
`,
      e.jsx(s.h4, { children: 'useTranslation' }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'src/components/greeting.tsx',
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
                      children: ' { useTranslation } ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: " '@rasenganjs/i18n'",
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
                      children: ' Greeting',
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
                      children: '  const',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' t',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: ' useTranslation',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '();',
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
                      children: 'h1',
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
                      style: { color: '#DCBDFB' },
                      children: 't',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: "'greeting'",
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ')',
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
                      children: 'h1',
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
                      children: ' Greeting;',
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
          'The ',
          e.jsx(s.code, { children: 'useTranslation' }),
          ' hook takes an optional param called ',
          e.jsx(s.code, { children: 'namespace' }),
          ' that allows you to specify the namespace of the translation you want to use.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsx(s.p, { children: "Let's suppose we have the following message:" }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'json',
            'data-theme': 'github-dark-dimmed',
            children: 'src/messages/en.json',
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
                      children: '  "translation"',
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
                      children: '    "home"',
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
                      children: '      "header"',
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
                      children: '        "greeting"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ': ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '"Hello, World!"',
                    }),
                  ],
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '      }',
                  }),
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
          'And we can use the ',
          e.jsx(s.code, { children: 'useTranslation' }),
          ' hook like this:',
        ],
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
            children: 'src/components/greeting.tsx',
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
                      children: ' { useTranslation } ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: " '@rasenganjs/i18n'",
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
                      children: ' Greeting',
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
                      children: '  const',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' t',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: ' useTranslation',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: "'home'",
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ');',
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
                      children: 'h1',
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
                      style: { color: '#DCBDFB' },
                      children: 't',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: "'header.greeting'",
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ')',
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
                      children: 'h1',
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
                      children: ' Greeting;',
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
      e.jsx(s.h4, { children: 'useLocale' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'From the ',
          e.jsx(s.code, { children: 'useLocale' }),
          ' hook, you can get the current locale and a function to change it.',
        ],
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
            children: 'src/components/navbar.tsx',
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
                      children: ' { useLocale } ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: " '@rasenganjs/i18n'",
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
                      children: ' Navbar',
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
                      children: '  const',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: 'locale',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: 'setLocale',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' } ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: ' useLocale',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '();',
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
                      children: 'h1',
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
                      children: 'locale',
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
                      children: 'h1',
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
                      children: 'button',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' onClick',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '() ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: ' setLocale',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: "'en'",
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ')',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '>English</',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
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
                      children: 'button',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' onClick',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '() ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: ' setLocale',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: "'fr'",
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ')',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '>French</',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
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
                      children: ' Navbar;',
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
      e.jsxs(s.blockquote, {
        children: [
          `
`,
          e.jsxs(s.p, {
            children: [
              e.jsx(s.strong, { children: 'Note:' }),
              ' The value passed to ',
              e.jsx(s.code, { children: 'setLocale' }),
              ' must be one of the locales defined into your messages directory.',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Community' }),
      `
`,
      e.jsx(s.p, {
        children:
          'Join the Rasengan.js community to get support, ask questions, and share your projects:',
      }),
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsxs(s.li, {
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
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsxs(s.li, {
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
          e.jsxs(s.li, {
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
      e.jsx(s.p, {
        children: "Let's build something amazing with Rasengan.js! 🚀",
      }),
      `
`,
      e.jsx(s.h2, { children: 'License' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'This package is ',
          e.jsx(s.a, {
            href: 'https://github.com/rasengan-dev/rasenganjs/blob/main/LICENSE',
            children: 'MIT licensed',
          }),
          '.',
        ],
      }),
    ],
  });
}
function l(n = {}) {
  const { wrapper: s } = n.components || {};
  return s ? e.jsx(s, { ...n, children: e.jsx(r, { ...n }) }) : r(n);
}
const t = {
    path: '/i18n',
    metadata: {
      title: 'I18n Package - Modules | Packages | Rasengan.js',
      description: 'Documentation for the I18n package.',
    },
  },
  i = [
    {
      title: 'Installation',
      anchor: { id: 'installation', text: 'Installation' },
      level: 2,
      children: [],
    },
    {
      title: 'Usage',
      anchor: { id: 'usage', text: 'Usage' },
      level: 2,
      children: [
        {
          title: 'Configuration',
          anchor: { id: 'configuration', text: 'Configuration' },
          level: 3,
        },
        {
          title: 'Messages',
          anchor: { id: 'messages', text: 'Messages' },
          level: 3,
        },
        {
          title: 'Register the Provider',
          anchor: {
            id: 'register-the-provider',
            text: 'Register the Provider',
          },
          level: 3,
        },
        { title: 'Hooks', anchor: { id: 'hooks', text: 'Hooks' }, level: 3 },
      ],
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
l.metadata = t;
l.toc = i;
l.type = 'MDXPageComponent';
export { l as default };
