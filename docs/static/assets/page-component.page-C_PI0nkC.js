import { j as e } from './vendor-CfbgIbdB.js';
import { T as l, P as o } from './shared-components-CkrC6jAk.js';
function r(s) {
  const n = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    p: 'p',
    pre: 'pre',
    span: 'span',
    ...s.components,
  };
  return (
    l || t('Tabs', !1),
    l.Item || t('Tabs.Item', !0),
    e.jsxs(e.Fragment, {
      children: [
        e.jsx('span', {
          className: 'text-[12px] font-mono-regular text-foreground/60',
          children: e.jsx(n.p, { children: 'API REFERENCE' }),
        }),
        `
`,
        e.jsx(n.h1, { children: 'Page Convention naming' }),
        `
`,
        e.jsxs(n.p, {
          children: [
            'In Rasengan.js, to create a ',
            e.jsx(n.code, { children: 'page' }),
            ', you have to create a file that follow the following name pattern:',
          ],
        }),
        `
`,
        e.jsxs(n.figure, {
          'data-rehype-pretty-code-figure': '',
          children: [
            e.jsx(n.figcaption, {
              'data-rehype-pretty-code-title': '',
              'data-language': 'txt',
              'data-theme': 'github-dark-dimmed',
              children: 'Page',
            }),
            e.jsx(n.pre, {
              style: { backgroundColor: '#22272e', color: '#adbac7' },
              tabIndex: '0',
              'data-language': 'txt',
              'data-theme': 'github-dark-dimmed',
              children: e.jsx(n.code, {
                'data-line-numbers': '',
                'data-language': 'txt',
                'data-theme': 'github-dark-dimmed',
                style: { display: 'grid' },
                'data-line-numbers-max-digits': '1',
                children: e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, { children: '[name].page.jsx' }),
                }),
              }),
            }),
          ],
        }),
        `
`,
        e.jsxs(n.p, {
          children: [
            'A ',
            e.jsx(n.code, { children: 'page' }),
            ' is UI that is unique to a route.',
          ],
        }),
        `
`,
        e.jsx(n.h2, { children: 'Example' }),
        `
`,
        e.jsxs(l, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            e.jsx(l.Item, {
              children: e.jsxs(n.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(n.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'home.page.tsx',
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
                              children: ' { PageComponent } ',
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
                            children: '/*',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children:
                              ' * This Home Page is located inside the home.page.tsx file',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children: ' */',
                          }),
                        }),
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
                              children: ' Home',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ' pageComponent',
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
                              style: { color: '#ADBAC7' },
                              children: ' (',
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
                              children: '    <',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '      <',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '>Home Page</',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '    </',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  )',
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
                              children: 'Home.path ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/"',
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
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: 'Home.metadata ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: '=',
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
                              style: { color: '#ADBAC7' },
                              children: '  title: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"Home"',
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
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '  description: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"This is the home page"',
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
                            children: '}',
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
            e.jsx(l.Item, {
              children: e.jsxs(n.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(n.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'home.page.jsx',
                  }),
                  e.jsx(n.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsxs(n.code, {
                      'data-line-numbers': '',
                      'data-language': 'jsx',
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
                              children: ' React ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: ' "react"',
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
                            children: '/*',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children:
                              ' * This Home Page is located inside the home.page.tsx file',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children: ' */',
                          }),
                        }),
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
                              children: ' Home',
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
                              style: { color: '#ADBAC7' },
                              children: ' (',
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
                              children: '    <',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '      <',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '>Home Page</',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '    </',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  )',
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
                              children: 'Home.path ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/"',
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
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: 'Home.metadata ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: '=',
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
                              style: { color: '#ADBAC7' },
                              children: '  title: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"Home"',
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
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '  description: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"This is the home page"',
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
                            children: '}',
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
        e.jsxs(n.p, {
          children: [
            'Based on the convention, we have juste replace the ',
            e.jsx(n.code, { children: '[name]' }),
            ' by ',
            e.jsx(n.code, { children: 'home' }),
            ' in the convention name and we got ',
            e.jsx(n.code, { children: 'home.page.jsx' }),
            '.',
          ],
        }),
        `
`,
        `
`,
        e.jsx(o, {
          prev: {
            href: '/docs/api-reference/conventions/layout',
            label: '[name].layout.tsx',
          },
          next: {
            href: '/docs/api-reference/conventions/router',
            label: '[name].router.tsx',
          },
        }),
      ],
    })
  );
}
function a(s = {}) {
  const { wrapper: n } = s.components || {};
  return n ? e.jsx(n, { ...s, children: e.jsx(r, { ...s }) }) : r(s);
}
function t(s, n) {
  throw new Error(
    'Expected ' +
      (n ? 'component' : 'object') +
      ' `' +
      s +
      '` to be defined: you likely forgot to import, pass, or provide it.'
  );
}
const i = {
    path: '/page-component',
    metadata: {
      title:
        'Page Convention naming - Conventions | API Reference | Rasengan.js',
      description: 'Page convention naming in Rasengan.js',
    },
  },
  c = [
    {
      title: 'Example',
      anchor: { id: 'example', text: 'Example' },
      level: 2,
      children: [],
    },
  ];
a.metadata = i;
a.toc = c;
a.type = 'MDXPageComponent';
export { a as default };
