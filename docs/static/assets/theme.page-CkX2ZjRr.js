import { j as e } from './vendor-CfbgIbdB.js';
function r(l) {
  const s = {
    a: 'a',
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
    table: 'table',
    tbody: 'tbody',
    td: 'td',
    th: 'th',
    thead: 'thead',
    tr: 'tr',
    ul: 'ul',
    ...l.components,
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
      e.jsx(s.h1, { children: 'Rasengan Theme' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          "Easily manage your application's ",
          e.jsx(s.code, { children: 'theme' }),
          ' in Rasengan.js.',
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Installation' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'To install the ',
          e.jsx(s.code, { children: '@rasenganjs/theme' }),
          ' package, run one of the following commands:',
        ],
      }),
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
                    children: ' @rasenganjs/theme',
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
      e.jsx(s.h3, { children: '1. Wrap your application with ThemeProvider' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'To enable theme management, wrap your app with the ',
          e.jsx(s.code, { children: 'ThemeProvider' }),
          ' component.',
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
            children: 'main.tsx',
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
                      children: " 'rasengan'",
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '; ',
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
                      children: " '@app/app.router'",
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
                      children: ' ',
                    }),
                    e.jsx(s.mark, {
                      'data-highlighted-chars': '',
                      children: e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: 'ThemeProvider',
                      }),
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: " '@rasenganjs/theme'",
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
                      children: ' (',
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
                      children: '    <',
                    }),
                    e.jsx(s.mark, {
                      'data-highlighted-chars': '',
                      children: e.jsx(s.span, {
                        style: { color: '#8DDB8C' },
                        children: 'ThemeProvider',
                      }),
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
                      children: '>',
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
                      children: '    </',
                    }),
                    e.jsx(s.mark, {
                      'data-highlighted-chars': '',
                      children: e.jsx(s.span, {
                        style: { color: '#8DDB8C' },
                        children: 'ThemeProvider',
                      }),
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
      `
`,
      e.jsx(s.h3, { children: '2. Access and update the theme with useTheme' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Use the ',
          e.jsx(s.code, { children: 'useTheme' }),
          ' hook to get the current theme and modify it dynamically.',
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
            children: 'ThemeSwitcher.tsx',
          }),
          e.jsx(s.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(s.code, {
              'data-language': 'tsx',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
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
                    e.jsx(s.mark, {
                      'data-highlighted-chars': '',
                      children: e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: 'useTheme',
                      }),
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' } ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: " '@rasenganjs/theme'",
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
                      children: ' ThemeSwitcher',
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
                  'data-highlighted-line': '',
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
                      children: 'theme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: 'actualTheme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: 'setTheme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: 'isDark',
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
                      children: ' ',
                    }),
                    e.jsx(s.mark, {
                      'data-highlighted-chars': '',
                      children: e.jsx(s.span, {
                        style: { color: '#DCBDFB' },
                        children: 'useTheme',
                      }),
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
                      children: 'p',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '>Current Theme: ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '{',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'actualTheme',
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
                      children: 'p',
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
                      children: ' setTheme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: "'light'",
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
                      children: '>Light Mode</',
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
                      children: ' setTheme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: "'dark'",
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
                      children: '>Dark Mode</',
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
                      children: ' setTheme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: "'system'",
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
                      children: '>System Default</',
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
      e.jsx(s.h2, { children: 'API' }),
      `
`,
      e.jsx(s.h3, { children: 'ThemeProvider' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'The ',
          e.jsx(s.code, { children: 'ThemeProvider' }),
          ' component is used to wrap your application and enable theme management.',
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
            children: 'ThemeProvider.tsx',
          }),
          e.jsx(s.pre, {
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
                    children: 'import',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' { ThemeProvider } ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: 'from',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: " '@rasenganjs/theme'",
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ';  ',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(s.h3, { children: 'useTheme' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'The ',
          e.jsx(s.code, { children: 'useTheme' }),
          ' hook is used to access and modify the current theme.',
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
            children: 'useTheme.ts',
          }),
          e.jsx(s.pre, {
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
                    children: 'import',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' { useTheme } ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: 'from',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: " '@rasenganjs/theme'",
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ';  ',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'The ',
          e.jsx(s.code, { children: 'useTheme' }),
          ' hook returns the following properties:',
        ],
      }),
      `
`,
      e.jsxs(s.table, {
        children: [
          e.jsx(s.thead, {
            children: e.jsxs(s.tr, {
              children: [
                e.jsx(s.th, { children: 'Property' }),
                e.jsx(s.th, { children: 'Type' }),
                e.jsx(s.th, { children: 'Description' }),
                e.jsx(s.th, { children: 'Possible Values' }),
              ],
            }),
          }),
          e.jsxs(s.tbody, {
            children: [
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'theme' }),
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'string' }),
                  }),
                  e.jsx(s.td, { children: 'The user-selected theme.' }),
                  e.jsxs(s.td, {
                    children: [
                      e.jsx(s.code, { children: 'light' }),
                      ', ',
                      e.jsx(s.code, { children: 'dark' }),
                      ', ',
                      e.jsx(s.code, { children: 'system' }),
                    ],
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'actualTheme' }),
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'string' }),
                  }),
                  e.jsx(s.td, { children: 'The currently applied theme.' }),
                  e.jsxs(s.td, {
                    children: [
                      e.jsx(s.code, { children: 'light' }),
                      ', ',
                      e.jsx(s.code, { children: 'dark' }),
                    ],
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'setTheme' }),
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, {
                      children: '(theme: string) => void',
                    }),
                  }),
                  e.jsx(s.td, { children: 'Function to change the theme.' }),
                  e.jsx(s.td, { children: '-' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'isDark' }),
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'boolean' }),
                  }),
                  e.jsx(s.td, {
                    children: 'Checks if the active theme is dark.',
                  }),
                  e.jsxs(s.td, {
                    children: [
                      e.jsx(s.code, { children: 'true' }),
                      ' or ',
                      e.jsx(s.code, { children: 'false' }),
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
      e.jsx(s.h3, { children: 'Themes' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'The ',
          e.jsx(s.code, { children: '@rasenganjs/theme' }),
          ' package provides two themes out of the box:',
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
              e.jsx(s.code, { children: 'light' }),
              ': Light mode theme.',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.code, { children: 'dark' }),
              ': Dark mode theme.',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.code, { children: 'system' }),
              ": Theme based on the user's system preferences.",
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
          "This is useful when you don't want to use plain text values for themes in your application.",
      }),
      `
`,
      e.jsx(s.p, { children: 'See this example:' }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'ThemeSwitcher.tsx',
          }),
          e.jsx(s.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(s.code, {
              'data-language': 'tsx',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
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
                      children: ' { useTheme, ',
                    }),
                    e.jsx(s.mark, {
                      'data-highlighted-chars': '',
                      children: e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: 'Themes',
                      }),
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' } ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: " '@rasenganjs/theme'",
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
                      children: ' ThemeSwitcher',
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
                      children: 'theme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: 'actualTheme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: 'setTheme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: 'isDark',
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
                      children: ' useTheme',
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
                      children: 'p',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '>Current Theme: ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '{',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'actualTheme',
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
                      children: 'p',
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
                  'data-highlighted-line': '',
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
                      children: ' setTheme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.mark, {
                      'data-highlighted-chars': '',
                      children: e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: 'Themes',
                      }),
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '.light)',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '>Light Mode</',
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
                  'data-highlighted-line': '',
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
                      children: ' setTheme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.mark, {
                      'data-highlighted-chars': '',
                      children: e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: 'Themes',
                      }),
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '.dark)',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '>Dark Mode</',
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
                  'data-highlighted-line': '',
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
                      children: ' setTheme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.mark, {
                      'data-highlighted-chars': '',
                      children: e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: 'Themes',
                      }),
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '.system)',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '>System Default</',
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
      e.jsx(s.h3, { children: 'ThemesType' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'The ',
          e.jsx(s.code, { children: 'ThemesType' }),
          ' is used to define the type of themes available in your application.',
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
            children: 'ThemesType.ts',
          }),
          e.jsx(s.pre, {
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
                    children: 'import',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' { ThemesType } ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: 'from',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: " '@rasenganjs/theme'",
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ';  ',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(s.p, { children: 'You can use it like follow:' }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'ThemeSwitcher.tsx',
          }),
          e.jsx(s.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(s.code, {
              'data-language': 'tsx',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
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
                      children: ' { useTheme, Themes, ',
                    }),
                    e.jsx(s.mark, {
                      'data-highlighted-chars': '',
                      children: e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: 'ThemesType',
                      }),
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' } ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: " '@rasenganjs/theme'",
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
                      children: ' ThemeSwitcher',
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
                      children: 'theme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: 'actualTheme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: 'setTheme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: 'isDark',
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
                      children: ' useTheme',
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
                  'data-highlighted-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '  const',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: ' updateTheme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' (',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'theme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ' ',
                    }),
                    e.jsx(s.mark, {
                      'data-highlighted-chars': '',
                      children: e.jsx(s.span, {
                        style: { color: '#F69D50' },
                        children: 'ThemesType',
                      }),
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ') ',
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
                  'data-highlighted-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: '    setTheme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(theme);',
                    }),
                  ],
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '  }',
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
                      children: 'p',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '>Current Theme: ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '{',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'actualTheme',
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
                      children: 'p',
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
                      children: ' updateTheme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(Themes.light)',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '>Light Mode</',
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
                      children: ' updateTheme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(Themes.dark)',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '>Dark Mode</',
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
                      children: ' updateTheme',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(Themes.system)',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '>System Default</',
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
                    children: '};',
                  }),
                }),
                `
`,
                e.jsx(s.span, { 'data-line': '', children: ' ' }),
              ],
            }),
          }),
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
function n(l = {}) {
  const { wrapper: s } = l.components || {};
  return s ? e.jsx(s, { ...l, children: e.jsx(r, { ...l }) }) : r(l);
}
const a = {
    path: '/theme',
    metadata: {
      title: 'Rasengan Theme Package - Modules | Packages | Rasengan.js',
      description: 'Documentation for the Rasengan Theme package.',
    },
  },
  c = [
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
          title: '1. Wrap your application with ThemeProvider',
          anchor: {
            id: '1.-wrap-your-application-with-themeprovider',
            text: '1. Wrap your application with ThemeProvider',
          },
          level: 3,
        },
        {
          title: '2. Access and update the theme with useTheme',
          anchor: {
            id: '2.-access-and-update-the-theme-with-usetheme',
            text: '2. Access and update the theme with useTheme',
          },
          level: 3,
        },
      ],
    },
    {
      title: 'API',
      anchor: { id: 'api', text: 'API' },
      level: 2,
      children: [
        {
          title: 'ThemeProvider',
          anchor: { id: 'themeprovider', text: 'ThemeProvider' },
          level: 3,
        },
        {
          title: 'useTheme',
          anchor: { id: 'usetheme', text: 'useTheme' },
          level: 3,
        },
        { title: 'Themes', anchor: { id: 'themes', text: 'Themes' }, level: 3 },
        {
          title: 'ThemesType',
          anchor: { id: 'themestype', text: 'ThemesType' },
          level: 3,
        },
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
n.metadata = a;
n.toc = c;
n.type = 'MDXPageComponent';
export { n as default };
