import { j as s } from './vendor-CfbgIbdB.js';
import { T as n, P as c } from './shared-components-CkrC6jAk.js';
function r(l) {
  const e = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
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
    ...l.components,
  };
  return (
    n || o('Tabs', !1),
    n.Item || o('Tabs.Item', !0),
    s.jsxs(s.Fragment, {
      children: [
        s.jsx('span', {
          className: 'text-[12px] font-mono-regular text-foreground/60',
          children: s.jsx(e.p, { children: 'API REFERENCE' }),
        }),
        `
`,
        s.jsx(e.h1, { children: 'Link Component' }),
        `
`,
        s.jsxs(e.p, {
          children: [
            'The ',
            s.jsx(e.code, { children: '<Link>' }),
            ` component is a React component that allows you to navigate between routes in your application.
It is the recommended way to navigate between routes in Rasengan.js.`,
          ],
        }),
        `
`,
        s.jsx(e.h2, { children: 'Usage' }),
        `
`,
        s.jsx(e.h3, { children: 'to Property' }),
        `
`,
        s.jsxs(e.p, {
          children: [
            "Here's an example of how to use the ",
            s.jsx(e.code, { children: '<Link>' }),
            ' component:',
          ],
        }),
        `
`,
        s.jsxs(n, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            s.jsx(n.Item, {
              children: s.jsxs(e.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  s.jsx(e.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/app/home.page.tsx',
                  }),
                  s.jsx(e.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: s.jsxs(e.code, {
                      'data-line-numbers': '',
                      'data-language': 'tsx',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      'data-line-numbers-max-digits': '2',
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
                              children: ' React ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: ' "react"',
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
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: ' { PageComponent, Link } ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: ' "rasengan"',
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
                              children: 'const',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#DCBDFB' },
                              children: ' Home',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F69D50' },
                              children: ' PageComponent',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: ' =',
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
                        s.jsxs(e.span, {
                          'data-line': '',
                          children: [
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: '    <',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
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
                              children: 'h1',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: '>Home</',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
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
                              children: 'Link',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#6CB6FF' },
                              children: ' to',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: '"/dashboard"',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: '>Go to Dashboard</',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Link',
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
                              children: '    </',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
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
                              style: { color: '#ADBAC7' },
                              children: 'Home.path ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/"',
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
                              style: { color: '#ADBAC7' },
                              children: 'Home.metadata ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: '=',
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
                              style: { color: '#ADBAC7' },
                              children: '  title: ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: '"Home"',
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
                              style: { color: '#ADBAC7' },
                              children: '  description: ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: '"Home Page"',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
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
                              children: 'export',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: ' default',
                            }),
                            s.jsx(e.span, {
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
            s.jsx(n.Item, {
              children: s.jsxs(e.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  s.jsx(e.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/app/home.page.jsx',
                  }),
                  s.jsx(e.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: s.jsxs(e.code, {
                      'data-line-numbers': '',
                      'data-language': 'jsx',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      'data-line-numbers-max-digits': '2',
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
                              children: ' React ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: ' "react"',
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
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: ' { Link } ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: ' "rasengan"',
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
                              children: 'const',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#DCBDFB' },
                              children: ' Home',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: ' =',
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
                        s.jsxs(e.span, {
                          'data-line': '',
                          children: [
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: '    <',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
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
                              children: 'h1',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: '>Home</',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
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
                              children: 'Link',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#6CB6FF' },
                              children: ' to',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: '"/dashboard"',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: '>Go to Dashboard</',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Link',
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
                              children: '    </',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
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
                              style: { color: '#ADBAC7' },
                              children: 'Home.path ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/"',
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
                              style: { color: '#ADBAC7' },
                              children: 'Home.metadata ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: '=',
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
                              style: { color: '#ADBAC7' },
                              children: '  title: ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: '"Home"',
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
                              style: { color: '#ADBAC7' },
                              children: '  description: ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: '"Home Page"',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
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
                              children: 'export',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: ' default',
                            }),
                            s.jsx(e.span, {
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
          ],
        }),
        `
`,
        s.jsx(e.h3, { children: 'Passing data via (state) prop' }),
        `
`,
        s.jsxs(n, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            s.jsx(n.Item, {
              children: s.jsxs(e.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  s.jsx(e.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/app/home.page.tsx',
                  }),
                  s.jsx(e.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: s.jsxs(e.code, {
                      'data-line-numbers': '',
                      'data-language': 'tsx',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      'data-line-numbers-max-digits': '2',
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
                              children: ' React ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: ' "react"',
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
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: ' { PageComponent, Link } ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: ' "rasengan"',
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
                              children: 'const',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#DCBDFB' },
                              children: ' Home',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F69D50' },
                              children: ' PageComponent',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: ' =',
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
                        s.jsxs(e.span, {
                          'data-line': '',
                          children: [
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: '    <',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
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
                              children: 'h1',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: '>Home</',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
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
                              children: 'Link',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#6CB6FF' },
                              children: ' to',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: '"/dashboard"',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#6CB6FF' },
                              children: ' ',
                            }),
                            s.jsxs(e.mark, {
                              'data-highlighted-chars-mark': '',
                              'data-highlighted-chars': '',
                              children: [
                                s.jsx(e.span, {
                                  style: { color: '#6CB6FF' },
                                  children: 'state',
                                }),
                                s.jsx(e.span, {
                                  style: { color: '#F47067' },
                                  children: '={',
                                }),
                                s.jsx(e.span, {
                                  style: { color: '#ADBAC7' },
                                  children: '{ name: ',
                                }),
                                s.jsx(e.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"hello"',
                                }),
                                s.jsx(e.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ' }',
                                }),
                                s.jsx(e.span, {
                                  style: { color: '#F47067' },
                                  children: '}',
                                }),
                              ],
                            }),
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: '>Go to Dashboard</',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Link',
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
                              children: '    </',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
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
                              style: { color: '#ADBAC7' },
                              children: 'Home.path ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/"',
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
                              style: { color: '#ADBAC7' },
                              children: 'Home.metadata ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: '=',
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
                              style: { color: '#ADBAC7' },
                              children: '  title: ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: '"Home"',
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
                              style: { color: '#ADBAC7' },
                              children: '  description: ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: '"Home Page"',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
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
                              children: 'export',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: ' default',
                            }),
                            s.jsx(e.span, {
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
            s.jsx(n.Item, {
              children: s.jsxs(e.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  s.jsx(e.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/app/home.page.jsx',
                  }),
                  s.jsx(e.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: s.jsxs(e.code, {
                      'data-line-numbers': '',
                      'data-language': 'jsx',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      'data-line-numbers-max-digits': '2',
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
                              children: ' React ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: ' "react"',
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
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: ' { Link } ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: ' "rasengan"',
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
                              children: 'const',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#DCBDFB' },
                              children: ' Home',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: ' =',
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
                        s.jsxs(e.span, {
                          'data-line': '',
                          children: [
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: '    <',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
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
                              children: 'h1',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: '>Home</',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
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
                              children: 'Link',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#6CB6FF' },
                              children: ' to',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: '"/dashboard"',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#6CB6FF' },
                              children: ' ',
                            }),
                            s.jsxs(e.mark, {
                              'data-highlighted-chars-mark': '',
                              'data-highlighted-chars': '',
                              children: [
                                s.jsx(e.span, {
                                  style: { color: '#6CB6FF' },
                                  children: 'state',
                                }),
                                s.jsx(e.span, {
                                  style: { color: '#F47067' },
                                  children: '={',
                                }),
                                s.jsx(e.span, {
                                  style: { color: '#ADBAC7' },
                                  children: '{ name: ',
                                }),
                                s.jsx(e.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"hello"',
                                }),
                                s.jsx(e.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ' }',
                                }),
                                s.jsx(e.span, {
                                  style: { color: '#F47067' },
                                  children: '}',
                                }),
                              ],
                            }),
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: '>Go to Dashboard</',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Link',
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
                              children: '    </',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
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
                              style: { color: '#ADBAC7' },
                              children: 'Home.path ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/"',
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
                              style: { color: '#ADBAC7' },
                              children: 'Home.metadata ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: '=',
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
                              style: { color: '#ADBAC7' },
                              children: '  title: ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: '"Home"',
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
                              style: { color: '#ADBAC7' },
                              children: '  description: ',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#96D0FF' },
                              children: '"Home Page"',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
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
                              children: 'export',
                            }),
                            s.jsx(e.span, {
                              style: { color: '#F47067' },
                              children: ' default',
                            }),
                            s.jsx(e.span, {
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
          ],
        }),
        `
`,
        s.jsxs(e.p, {
          children: [
            'Then, you can access to the ',
            s.jsx(e.code, { children: 'state' }),
            ' like follow:',
          ],
        }),
        `
`,
        s.jsxs(e.figure, {
          'data-rehype-pretty-code-figure': '',
          children: [
            s.jsx(e.figcaption, {
              'data-rehype-pretty-code-title': '',
              'data-language': 'js',
              'data-theme': 'github-dark-dimmed',
              children: 'JS',
            }),
            s.jsx(e.pre, {
              style: { backgroundColor: '#22272e', color: '#adbac7' },
              tabIndex: '0',
              'data-language': 'js',
              'data-theme': 'github-dark-dimmed',
              children: s.jsx(e.code, {
                'data-line-numbers': '',
                'data-language': 'js',
                'data-theme': 'github-dark-dimmed',
                style: { display: 'grid' },
                'data-line-numbers-max-digits': '1',
                children: s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'const',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: 'state',
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
                      children: ' ',
                    }),
                    s.jsxs(e.mark, {
                      'data-highlighted-chars-mark': '',
                      'data-highlighted-chars': '',
                      children: [
                        s.jsx(e.span, {
                          style: { color: '#DCBDFB' },
                          children: 'useLocation',
                        }),
                        s.jsx(e.span, {
                          style: { color: '#ADBAC7' },
                          children: '()',
                        }),
                      ],
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
        `
`,
        s.jsx(e.h2, { children: 'Properties' }),
        `
`,
        s.jsxs(e.table, {
          children: [
            s.jsx(e.thead, {
              children: s.jsxs(e.tr, {
                children: [
                  s.jsx(e.th, { children: 'Props' }),
                  s.jsx(e.th, { children: 'Type' }),
                  s.jsx(e.th, { children: 'Description' }),
                ],
              }),
            }),
            s.jsxs(e.tbody, {
              children: [
                s.jsxs(e.tr, {
                  children: [
                    s.jsx(e.td, {
                      children: s.jsx(e.code, { children: 'to' }),
                    }),
                    s.jsx(e.td, {
                      children: s.jsx(e.code, { children: 'string' }),
                    }),
                    s.jsx(e.td, { children: 'The path to navigate to' }),
                  ],
                }),
                s.jsxs(e.tr, {
                  children: [
                    s.jsx(e.td, {
                      children: s.jsx(e.code, { children: 'state' }),
                    }),
                    s.jsx(e.td, {
                      children: s.jsx(e.code, { children: 'any' }),
                    }),
                    s.jsx(e.td, {
                      children: 'Data sent via URL to the destination page',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        `
`,
        s.jsx(c, {
          prev: {
            href: '/docs/deploying/node',
            label: 'Deploying: Node Server',
          },
          next: {
            href: '/docs/api-reference/components/navlink',
            label: 'NavLink Component',
          },
        }),
      ],
    })
  );
}
function a(l = {}) {
  const { wrapper: e } = l.components || {};
  return e ? s.jsx(e, { ...l, children: s.jsx(r, { ...l }) }) : r(l);
}
function o(l, e) {
  throw new Error(
    'Expected ' +
      (e ? 'component' : 'object') +
      ' `' +
      l +
      '` to be defined: you likely forgot to import, pass, or provide it.'
  );
}
const t = {
    path: '/link',
    metadata: {
      title: 'Link Component - Components | API Reference | Rasengan.js',
      description: 'Navigate between routes in your application.',
    },
  },
  d = [
    {
      title: 'Usage',
      anchor: { id: 'usage', text: 'Usage' },
      level: 2,
      children: [
        {
          title: 'to Property',
          anchor: { id: 'to-property', text: 'to Property' },
          level: 3,
        },
        {
          title: 'Passing data via (state) prop',
          anchor: {
            id: 'passing-data-via-(state)-prop',
            text: 'Passing data via (state) prop',
          },
          level: 3,
        },
      ],
    },
    {
      title: 'Properties',
      anchor: { id: 'properties', text: 'Properties' },
      level: 2,
      children: [],
    },
  ];
a.metadata = t;
a.toc = d;
a.type = 'MDXPageComponent';
export { a as default };
