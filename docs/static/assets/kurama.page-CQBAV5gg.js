import { j as s } from './vendor-CfbgIbdB.js';
function r(l) {
  const e = {
    a: 'a',
    blockquote: 'blockquote',
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    input: 'input',
    li: 'li',
    mark: 'mark',
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
    ...l.components,
  };
  return s.jsxs(s.Fragment, {
    children: [
      s.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        style: { fontSize: 12 },
        children: s.jsx(e.p, { children: 'PACKAGES' }),
      }),
      `
`,
      s.jsx(e.h1, { children: 'Kurama' }),
      `
`,
      s.jsx(e.h3, {
        children:
          'The Nine-Tails of State Management — Control Your Chakra, Control Your State.',
      }),
      `
`,
      s.jsxs(e.p, {
        children: [
          s.jsx(e.code, { children: '@rasenganjs/kurama' }),
          ' is a ',
          s.jsx(e.strong, {
            children: 'lightweight and reactive state management library',
          }),
          ' designed for ',
          s.jsx(e.strong, { children: 'Rasengan.js' }),
          ' and ',
          s.jsx(e.strong, { children: 'any React application' }),
          `.
Inspired by `,
          s.jsx(e.strong, { children: 'Zustand' }),
          ', ',
          s.jsx(e.strong, { children: 'Jotai' }),
          ', and the raw energy of ',
          s.jsx(e.strong, { children: 'Kurama' }),
          ', it gives developers full control over their application’s chakra (state) — simple, fast, and scalable.',
        ],
      }),
      `
`,
      s.jsx(e.h2, { children: 'Features' }),
      `
`,
      s.jsxs(e.ul, {
        children: [
          `
`,
          s.jsxs(e.li, {
            children: [
              s.jsx(e.strong, { children: 'Minimal API' }),
              ' – Simple store creation, no boilerplate.',
            ],
          }),
          `
`,
          s.jsxs(e.li, {
            children: [
              s.jsx(e.strong, { children: 'Reactive Selectors' }),
              ' – Subscribe to specific slices for performance.',
            ],
          }),
          `
`,
          s.jsxs(e.li, {
            children: [
              s.jsx(e.strong, { children: 'Type-safe by Design' }),
              ' – Written in TypeScript, fully inferred.',
            ],
          }),
          `
`,
          s.jsxs(e.li, {
            children: [
              s.jsx(e.strong, { children: 'Persistent Stores' }),
              ' – Save state to ',
              s.jsx(e.code, { children: 'localStorage' }),
              ' or custom drivers.',
            ],
          }),
          `
`,
          s.jsxs(e.li, {
            children: [
              s.jsx(e.strong, { children: 'SSR + Hydration' }),
              ' – Works seamlessly with Rasengan.js server rendering.',
            ],
          }),
          `
`,
          s.jsxs(e.li, {
            children: [
              s.jsx(e.strong, { children: 'Middleware System' }),
              ' – Extend store behavior (logger, persist, devtools, etc.).',
            ],
          }),
          `
`,
          s.jsxs(e.li, {
            children: [
              s.jsx(e.strong, { children: 'Framework Agnostic' }),
              ' – Works in Rasengan.js, Next.js, Remix, React Router & more.',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      s.jsx(e.h2, { children: 'Installation' }),
      `
`,
      s.jsxs(e.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          s.jsx(e.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: 'Terminal',
          }),
          s.jsx(e.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: s.jsx(e.code, {
              'data-language': 'bash',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: s.jsxs(e.span, {
                'data-line': '',
                children: [
                  s.jsx(e.span, {
                    style: { color: '#F69D50' },
                    children: 'pnpm',
                  }),
                  s.jsx(e.span, {
                    style: { color: '#96D0FF' },
                    children: ' add',
                  }),
                  s.jsx(e.span, {
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
      s.jsx(e.p, { children: 'or' }),
      `
`,
      s.jsxs(e.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          s.jsx(e.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: 'Terminal',
          }),
          s.jsx(e.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: s.jsx(e.code, {
              'data-language': 'bash',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: s.jsxs(e.span, {
                'data-line': '',
                children: [
                  s.jsx(e.span, {
                    style: { color: '#F69D50' },
                    children: 'npm',
                  }),
                  s.jsx(e.span, {
                    style: { color: '#96D0FF' },
                    children: ' install',
                  }),
                  s.jsx(e.span, {
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
      s.jsx(e.h2, { children: 'Quick Start' }),
      `
`,
      s.jsxs(e.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          s.jsx(e.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'Counter.tsx',
          }),
          s.jsx(e.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: s.jsxs(e.code, {
              'data-language': 'tsx',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: [
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { createStore } ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: " '@rasenganjs/kurama'",
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'type',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: ' State',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: '  count',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' number',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '  increment',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' void',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '  decrement',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' void',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '};',
                  }),
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'const',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' useCounter',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' createStore',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '<',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 'State',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>((',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 'set',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ') ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ({',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '  count: ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: '0',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ',',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '  increment',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ': () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' set',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '((',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 's',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ') ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ({ count: s.count ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '+',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' 1',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' })),',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '  decrement',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ': () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' set',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '((',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 's',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ') ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ({ count: s.count ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '-',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' 1',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' })),',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '}));',
                  }),
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#768390' },
                    children: '// Use it anywhere',
                  }),
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'function',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' Counter',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '() {',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '  const',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: 'count',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: 'increment',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: 'decrement',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' } ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' useCounter',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '();',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '  return',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' (',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '    <>',
                  }),
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '      <',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' onClick',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: 'increment',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>+</',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '      <',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' onClick',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: 'decrement',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>-</',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '      Chakra Power: ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '{',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: 'count',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '    </>',
                  }),
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '  );',
                  }),
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
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
      s.jsx(e.h2, { children: 'API Reference' }),
      `
`,
      s.jsx(e.h3, { children: 'createStore' }),
      `
`,
      s.jsxs(e.p, {
        children: [
          'The ',
          s.jsx(e.code, { children: 'createStore' }),
          ' function is the primary entry point for creating a store. It takes a configuration object as its first argument and returns a store instance as a hook.',
        ],
      }),
      `
`,
      s.jsxs(e.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          s.jsx(e.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'Counter.tsx',
          }),
          s.jsx(e.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: s.jsxs(e.code, {
              'data-language': 'tsx',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: [
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { createStore } ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: " '@rasenganjs/kurama'",
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'type',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: ' State',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: '  count',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' number',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '  increment',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' void',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '  decrement',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' void',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '}',
                  }),
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'const',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' useCounter',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' createStore',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '<',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 'State',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>((',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 'set',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ') ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ({',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '  count: ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: '0',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ',',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '  increment',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ': () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' set',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '((',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 'state',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ') ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ({ count: state.count ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '+',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' 1',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' })),',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '  decrement',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ': () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' set',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '((',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 'state',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ') ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ({ count: state.count ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '-',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' 1',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' })),',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '}));',
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
      `
`,
      s.jsx(e.h3, { children: 'Middleware' }),
      `
`,
      s.jsxs(e.p, {
        children: [
          s.jsx(e.code, { children: '@rasenganjs/kurama' }),
          ' provides a middleware system to extend store behavior. It allows you to add custom logic to your store, such as logging, persisting.',
        ],
      }),
      `
`,
      s.jsx(e.h4, { children: 'logger' }),
      `
`,
      s.jsxs(e.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          s.jsx(e.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'Counter.tsx',
          }),
          s.jsx(e.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: s.jsxs(e.code, {
              'data-language': 'tsx',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: [
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { createStore, middleware } ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: " '@rasenganjs/kurama'",
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'type',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: ' State',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: '  count',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' number',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '  increment',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' void',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '  decrement',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' void',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '}',
                  }),
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'const',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' useCounter',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' createStore',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '<',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 'State',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>(',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '  middleware.',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: 'logger',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '((',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 'set',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ') ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ({',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '    chakra: ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: '100',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ',',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '    decrease',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ': () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' set',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '((',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 's',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ') ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ({ chakra: s.chakra ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '-',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' 10',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' })),',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '  }))',
                  }),
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: ');',
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
      `
`,
      s.jsxs(e.p, {
        children: [
          'The ',
          s.jsx(e.code, { children: 'logger' }),
          ' middleware logs every action and state change to the console, making it easier to debug and understand the flow of your application.',
        ],
      }),
      `
`,
      s.jsx(e.h4, { children: 'persist' }),
      `
`,
      s.jsxs(e.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          s.jsx(e.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'Counter.tsx',
          }),
          s.jsx(e.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: s.jsxs(e.code, {
              'data-language': 'tsx',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: [
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { createStore, middleware } ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: " '@rasenganjs/kurama'",
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'type',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: ' State',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: '  count',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' number',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '  increment',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' void',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '  decrement',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' void',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '}',
                  }),
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'const',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' useCounter',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' createStore',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '<',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 'State',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>(',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '  middleware.',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: 'persist',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '({ name: ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: "'counter'",
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ', storage: ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: "'local'",
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' })((',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 'set',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ') ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ({',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '    chakra: ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: '100',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ',',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '    decrease',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ': () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' set',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '((',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 's',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ') ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ({ chakra: s.chakra ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '-',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' 10',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' })),',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '  }))',
                  }),
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: ');',
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
      `
`,
      s.jsxs(e.p, {
        children: [
          'The ',
          s.jsx(e.code, { children: 'persist' }),
          ' middleware allows you to save the state of your store to ',
          s.jsx(e.code, { children: 'localStorage' }),
          ' or custom drivers, making it easier to persist state across page reloads.',
        ],
      }),
      `
`,
      s.jsxs(e.p, {
        children: [
          'By default, the ',
          s.jsx(e.code, { children: 'persist' }),
          ' middleware uses ',
          s.jsx(e.code, { children: 'localStorage' }),
          ' as the storage driver by default, but you can also use ',
          s.jsx(e.code, { children: 'sessionStorage' }),
          '.',
        ],
      }),
      `
`,
      s.jsxs(e.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          s.jsx(e.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'Counter.tsx',
          }),
          s.jsx(e.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: s.jsxs(e.code, {
              'data-language': 'tsx',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: [
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { createStore, middleware } ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: " '@rasenganjs/kurama'",
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'type',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: ' State',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: '  count',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' number',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '  increment',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' void',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '  decrement',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' void',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '}',
                  }),
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'const',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' useCounter',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' createStore',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '<',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 'State',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>(',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '  middleware.',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: 'persist',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '({ name: ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: "'counter'",
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    s.jsxs(e.mark, {
                      'data-highlighted-chars-mark': '',
                      'data-highlighted-chars': '',
                      children: [
                        s.jsx(e.span, {
                          style: { color: '#ADBAC7' },
                          children: 'storage: ',
                        }),
                        s.jsx(e.span, {
                          style: { color: '#96D0FF' },
                          children: "'session'",
                        }),
                      ],
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' })((',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 'set',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ') ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ({',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '    chakra: ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: '100',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ',',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '    decrease',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ': () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' set',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '((',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 's',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ') ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ({ chakra: s.chakra ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '-',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' 10',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' })),',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '  }))',
                  }),
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: ');',
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
      `
`,
      s.jsxs(e.table, {
        children: [
          s.jsx(e.thead, {
            children: s.jsxs(e.tr, {
              children: [
                s.jsx(e.th, { children: 'Option' }),
                s.jsx(e.th, { children: 'Description' }),
                s.jsx(e.th, { children: 'Type' }),
              ],
            }),
          }),
          s.jsxs(e.tbody, {
            children: [
              s.jsxs(e.tr, {
                children: [
                  s.jsx(e.td, { children: 'name' }),
                  s.jsxs(e.td, {
                    children: [
                      'The name of the store used to save the state in ',
                      s.jsx(e.code, { children: 'localStorage' }),
                      ' or ',
                      s.jsx(e.code, { children: 'sessionStorage' }),
                      '.',
                    ],
                  }),
                  s.jsx(e.td, { children: 'string' }),
                ],
              }),
              s.jsxs(e.tr, {
                children: [
                  s.jsx(e.td, { children: 'storage' }),
                  s.jsx(e.td, { children: 'The storage driver to use.' }),
                  s.jsxs(e.td, {
                    children: [
                      s.jsx(e.code, { children: 'local' }),
                      ', ',
                      s.jsx(e.code, { children: 'session' }),
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
      s.jsx(e.h4, { children: 'compose' }),
      `
`,
      s.jsxs(e.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          s.jsx(e.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'Counter.tsx',
          }),
          s.jsx(e.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: s.jsxs(e.code, {
              'data-language': 'tsx',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: [
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { createStore, middleware } ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: " '@rasenganjs/kurama'",
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'type',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: ' State',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: '  count',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' number',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '  increment',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' void',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '  decrement',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' void',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '}',
                  }),
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'const',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' useCounter',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' createStore',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '<',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 'State',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>(',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '  middleware.',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: 'compose',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '    middleware.logger,',
                  }),
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '    middleware.',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: 'persist',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '({ name: ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: "'counter'",
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ', storage: ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: "'session'",
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' })',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '  )((',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 'set',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ') ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ({',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '    chakra: ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: '100',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ',',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '    decrease',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ': () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' set',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '((',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 's',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ') ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ({ chakra: s.chakra ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '-',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' 10',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' })),',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '  }))',
                  }),
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: ');',
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
      `
`,
      s.jsxs(e.p, {
        children: [
          'The ',
          s.jsx(e.code, { children: 'compose' }),
          ' middleware allows you to combine multiple middleware functions into a single middleware function, making it easier to reuse middleware logic.',
        ],
      }),
      `
`,
      s.jsx(e.h2, { children: 'Roadmap' }),
      `
`,
      s.jsxs(e.ul, {
        className: 'contains-task-list',
        children: [
          `
`,
          s.jsxs(e.li, {
            className: 'task-list-item',
            children: [
              s.jsx(e.input, { type: 'checkbox', checked: !0, disabled: !0 }),
              ' ',
              'Middleware composition',
            ],
          }),
          `
`,
          s.jsxs(e.li, {
            className: 'task-list-item',
            children: [
              s.jsx(e.input, { type: 'checkbox', disabled: !0 }),
              ' ',
              'DevTools integration (Kurama Vision)',
            ],
          }),
          `
`,
          s.jsxs(e.li, {
            className: 'task-list-item',
            children: [
              s.jsx(e.input, { type: 'checkbox', disabled: !0 }),
              ' ',
              'Store dependency tracking',
            ],
          }),
          `
`,
          s.jsxs(e.li, {
            className: 'task-list-item',
            children: [
              s.jsx(e.input, { type: 'checkbox', disabled: !0 }),
              ' ',
              'Multi-tab state synchronization',
            ],
          }),
          `
`,
          s.jsxs(e.li, {
            className: 'task-list-item',
            children: [
              s.jsx(e.input, { type: 'checkbox', disabled: !0 }),
              ' ',
              'Asynchronous action queue',
            ],
          }),
          `
`,
          s.jsxs(e.li, {
            className: 'task-list-item',
            children: [
              s.jsx(e.input, { type: 'checkbox', disabled: !0 }),
              ' ',
              'Integration with ',
              s.jsx(e.code, { children: '@rasenganjs/query' }),
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      s.jsx(e.h2, { children: 'Philosophy' }),
      `
`,
      s.jsxs(e.blockquote, {
        children: [
          `
`,
          s.jsxs(e.p, {
            children: [
              `“Kurama represents raw, limitless chakra.
In Rasengan.js, that chakra is your `,
              s.jsx(e.strong, { children: 'state' }),
              ' — energy you can control, share, and master.”',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      s.jsx(e.p, {
        children: `Simple. Reactive. Controlled.
That’s the power of Kurama.`,
      }),
      `
`,
      s.jsx(e.h2, { children: 'Community' }),
      `
`,
      s.jsx(e.p, {
        children:
          'Join the Rasengan.js community to get support, ask questions, and share your projects:',
      }),
      `
`,
      s.jsxs(e.ul, {
        children: [
          `
`,
          s.jsxs(e.li, {
            children: [
              s.jsx('a', {
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
      s.jsxs(e.ul, {
        children: [
          `
`,
          s.jsxs(e.li, {
            children: [
              s.jsx('a', {
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
          s.jsxs(e.li, {
            children: [
              s.jsx('a', {
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
      s.jsx(e.p, {
        children: "Let's build something amazing with Rasengan.js! 🚀",
      }),
      `
`,
      s.jsx(e.h2, { children: 'License' }),
      `
`,
      s.jsxs(e.p, {
        children: [
          'This package is ',
          s.jsx(e.a, {
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
  const { wrapper: e } = l.components || {};
  return e ? s.jsx(e, { ...l, children: s.jsx(r, { ...l }) }) : r(l);
}
const a = {
    path: '/kurama',
    metadata: {
      title: 'Kurama Package - Modules | Packages | Rasengan.js',
      description: 'Documentation for the Kurama package.',
    },
  },
  c = [
    {
      title: 'Features',
      anchor: { id: 'features', text: 'Features' },
      level: 2,
      children: [],
    },
    {
      title: 'Installation',
      anchor: { id: 'installation', text: 'Installation' },
      level: 2,
      children: [],
    },
    {
      title: 'Quick Start',
      anchor: { id: 'quick-start', text: 'Quick Start' },
      level: 2,
      children: [],
    },
    {
      title: 'API Reference',
      anchor: { id: 'api-reference', text: 'API Reference' },
      level: 2,
      children: [
        {
          title: 'createStore',
          anchor: { id: 'createstore', text: 'createStore' },
          level: 3,
        },
        {
          title: 'Middleware',
          anchor: { id: 'middleware', text: 'Middleware' },
          level: 3,
        },
      ],
    },
    {
      title: 'Roadmap',
      anchor: { id: 'roadmap', text: 'Roadmap' },
      level: 2,
      children: [],
    },
    {
      title: 'Philosophy',
      anchor: { id: 'philosophy', text: 'Philosophy' },
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
n.metadata = a;
n.toc = c;
n.type = 'MDXPageComponent';
export { n as default };
