import { j as e, C as t } from './vendor-w5t4XTd4.js';
import { A as a, a as c, P as i } from './shared-components-DBceyN8p.js';
function r(n) {
  const s = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
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
      e.jsx(s.h1, { children: 'Define Active Links' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          "Active links are links that are highlighted when the current route matches the link's ",
          e.jsx(s.code, { children: 'to' }),
          ' property.',
        ],
      }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Without extra tools, you can define active links manually by combining ',
          e.jsx(s.code, { children: 'useLocation' }),
          ' and ',
          e.jsx(t, {
            to: '/docs/api-reference/components/link',
            children: e.jsx(s.code, { children: 'Link' }),
          }),
          ' components.',
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
            children: 'src/components/ActiveLink.tsx',
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
                      children: ' React ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "react"',
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
                      children: ' { Link, useLocation } ',
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
                      children: 'type',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ' Props',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' =',
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
                      style: { color: '#F69D50' },
                      children: '  to',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' string',
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
                      style: { color: '#F69D50' },
                      children: '  children',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ' React',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '.',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'ReactNode',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
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
                      children: ' ActiveLink',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: '({ to, children }',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ' Props) ',
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
                      children: 'pathname',
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
                      children: ' useLocation',
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
                      children: 'Link',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' to',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'to',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '`${',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'pathname',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' ===',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' to',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' ?',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "active"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' :',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' ""}`',
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
                      style: { color: '#F47067' },
                      children: '      {',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'children',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
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
                      children: 'Link',
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
      e.jsx(s.h2, { children: 'NavLink Component' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Rasengan.js provides a ',
          e.jsx(s.code, { children: 'NavLink' }),
          ' component that makes it easier to define active links.',
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
            children: 'src/components/NavLink.tsx',
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
                      children: ' React ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "react"',
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
                      children: ' { NavLink } ',
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
                      children: 'type',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ' Props',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' =',
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
                      style: { color: '#F69D50' },
                      children: '  to',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' string',
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
                      style: { color: '#F69D50' },
                      children: '  children',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ' React',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '.',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'ReactNode',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
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
                      children: ' ActiveLink',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: '({ to, children }',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ' Props) ',
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
                    e.jsx(s.span, {
                      style: { color: '#8DDB8C' },
                      children: 'NavLink',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ',
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
                      style: { color: '#6CB6FF' },
                      children: '      to',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'to',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ',
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
                      style: { color: '#6CB6FF' },
                      children: '      className',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '({ ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'isActive',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'isPending',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' }) ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '=>',
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
                      children: '        isPending ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '?',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "pending"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' :',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' isActive ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '?',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "active"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' :',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' ""',
                    }),
                  ],
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: '      }',
                  }),
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '    >',
                  }),
                }),
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '      {',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'children',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
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
                    e.jsx(s.span, {
                      style: { color: '#8DDB8C' },
                      children: 'NavLink',
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
      e.jsx(a, {
        title: 'Active state',
        description:
          'The `NavLink` component becomes active when the current route start with the `to` prop value.',
        status: 'info',
      }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'txt',
          'data-theme': 'github-dark-dimmed',
          children: e.jsxs(s.code, {
            'data-language': 'txt',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: [
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, { children: 'When to="/docs"' }),
              }),
              `
`,
              e.jsx(s.span, { 'data-line': '', children: ' ' }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  children: 'Current route: /docs => isActive: true',
                }),
              }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  children:
                    'Current route: /docs/getting-started/introduction => isActive: true',
                }),
              }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  children: 'Current route: /packages => isActive: false',
                }),
              }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  children: 'Current route: /blog => isActive: false',
                }),
              }),
            ],
          }),
        }),
      }),
      `
`,
      e.jsx(s.h2, { children: 'Props' }),
      `
`,
      e.jsx(s.h3, { children: 'children' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Can be regular React children or a function that receives an object with the ',
          e.jsx(s.code, { children: 'active' }),
          ' and ',
          e.jsx(s.code, { children: 'pending' }),
          ' states of the link.',
        ],
      }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
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
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '<' }),
                  e.jsx(s.span, {
                    style: { color: '#8DDB8C' },
                    children: 'NavLink',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: ' to',
                  }),
                  e.jsx(s.span, { style: { color: '#F47067' }, children: '=' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '"/tasks"',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '>' }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: '  {',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '({ ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F69D50' },
                    children: 'isActive',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' }) ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: '=>',
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
                    children: 'span',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: ' className',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: '={',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: 'isActive ',
                  }),
                  e.jsx(s.span, { style: { color: '#F47067' }, children: '?' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' "active"',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: ' :',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' ""',
                  }),
                  e.jsx(s.span, { style: { color: '#F47067' }, children: '}' }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '>Tasks</',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#8DDB8C' },
                    children: 'span',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '>' }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '  )',
                  }),
                  e.jsx(s.span, { style: { color: '#F47067' }, children: '}' }),
                ],
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '</',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#8DDB8C' },
                    children: 'NavLink',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '>' }),
                ],
              }),
            ],
          }),
        }),
      }),
      `
`,
      e.jsx(s.h3, { children: 'end' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Changes the matching logic for the ',
          e.jsx(s.code, { children: 'active' }),
          ' and ',
          e.jsx(s.code, { children: 'pending' }),
          ' states to only match to the ',
          e.jsx(s.strong, { children: '"end"' }),
          ' of the ',
          e.jsx(s.code, { children: 'NavLinkProps.to' }),
          '. If the URL is longer, it will no longer be considered active.',
        ],
      }),
      `
`,
      e.jsxs(s.table, {
        children: [
          e.jsx(s.thead, {
            children: e.jsxs(s.tr, {
              children: [
                e.jsx(s.th, { children: 'Link' }),
                e.jsx(s.th, { children: 'URL' }),
                e.jsx(s.th, { children: 'isActive' }),
              ],
            }),
          }),
          e.jsxs(s.tbody, {
            children: [
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, {
                      children: '<NavLink to="/tasks" />',
                    }),
                  }),
                  e.jsx(s.td, { children: '/tasks' }),
                  e.jsx(s.td, { children: 'true' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, {
                      children: '<NavLink to="/tasks" />',
                    }),
                  }),
                  e.jsx(s.td, { children: '/tasks/123' }),
                  e.jsx(s.td, { children: 'true' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, {
                      children: '<NavLink to="/tasks" end />',
                    }),
                  }),
                  e.jsx(s.td, { children: '/tasks' }),
                  e.jsx(s.td, { children: 'true' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, {
                      children: '<NavLink to="/tasks" end />',
                    }),
                  }),
                  e.jsx(s.td, { children: '/tasks/123' }),
                  e.jsx(s.td, { children: 'false' }),
                ],
              }),
            ],
          }),
        ],
      }),
      `
`,
      e.jsx(c, {
        title: 'Learn more about NavLink',
        status: 'info',
        link: 'https://reactrouter.com/api/components/NavLink',
      }),
      `
`,
      e.jsx(i, {
        prev: { href: '/docs/routing/dynamic-routes', label: 'Dynamic Routes' },
        next: { href: '/docs/routing/error-handling', label: 'Error Handling' },
      }),
    ],
  });
}
function l(n = {}) {
  const { wrapper: s } = n.components || {};
  return s ? e.jsx(s, { ...n, children: e.jsx(r, { ...n }) }) : r(n);
}
const o = {
    path: '/active-link',
    metadata: {
      title: 'Define Active Links - Routing | Core concepts | Rasengan.js',
      description:
        'Learn how to define active links in your app navigation bar.',
    },
  },
  d = [
    {
      title: 'NavLink Component',
      anchor: { id: 'navlink-component', text: 'NavLink Component' },
      level: 2,
      children: [],
    },
    {
      title: 'Props',
      anchor: { id: 'props', text: 'Props' },
      level: 2,
      children: [
        {
          title: 'children',
          anchor: { id: 'children', text: 'children' },
          level: 3,
        },
        { title: 'end', anchor: { id: 'end', text: 'end' }, level: 3 },
      ],
    },
  ];
l.metadata = o;
l.toc = d;
l.type = 'MDXPageComponent';
export { l as default };
