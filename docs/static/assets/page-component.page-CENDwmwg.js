import { j as e, C as t } from './vendor-CfbgIbdB.js';
import { T as l, P as d } from './shared-components-CkrC6jAk.js';
function o(s) {
  const n = {
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
    ul: 'ul',
    ...s.components,
  };
  return (
    l || r('Tabs', !1),
    l.Item || r('Tabs.Item', !0),
    e.jsxs(e.Fragment, {
      children: [
        e.jsx('span', {
          className: 'text-[12px] font-mono-regular text-foreground/60',
          children: e.jsx(n.p, { children: 'API REFERENCE' }),
        }),
        `
`,
        e.jsx(n.h1, { children: 'Page Component' }),
        `
`,
        e.jsxs(n.p, {
          children: [
            e.jsx(n.code, { children: 'PageComponent' }),
            ' is a functional component that defines a ',
            e.jsx(n.code, { children: 'page' }),
            ' in a Rasengan.js app.',
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
                              children: ' { ',
                            }),
                            e.jsx(n.mark, {
                              'data-highlighted-chars': '',
                              children: e.jsx(n.span, {
                                style: { color: '#ADBAC7' },
                                children: 'PageComponent',
                              }),
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' } ',
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
                              children: ' Home',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ' ',
                            }),
                            e.jsx(n.mark, {
                              'data-highlighted-chars': '',
                              children: e.jsx(n.span, {
                                style: { color: '#F69D50' },
                                children: 'PageComponent',
                              }),
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
                              children: '>Home page</',
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
                              children: '"Home Page"',
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
                              children: '>Home page</',
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
                              children: '"Home Page"',
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
            'Similar to ',
            e.jsx(t, {
              to: '/docs/api-reference/components/layout-component',
              children: e.jsx(n.code, { children: 'LayoutComponent' }),
            }),
            ', the ',
            e.jsx(n.code, { children: 'PageComponent' }),
            ' component requires a ',
            e.jsx(n.code, { children: 'path' }),
            ' property to define the route of the page.',
          ],
        }),
        `
`,
        e.jsx(n.h2, { children: 'Properties and Methods' }),
        `
`,
        e.jsxs(n.p, {
          children: [
            'The ',
            e.jsx(n.code, { children: 'PageComponent' }),
            ' functional component has the following properties and methods:',
          ],
        }),
        `
`,
        e.jsx(n.h3, { children: 'Properties' }),
        `
`,
        e.jsxs(n.ul, {
          children: [
            `
`,
            e.jsxs(n.li, {
              children: [
                e.jsx(n.code, { children: 'path' }),
                ': The path of the page. It is used to define the route of the page.',
              ],
            }),
            `
`,
            e.jsxs(n.li, {
              children: [
                e.jsx(n.code, { children: 'metadata' }),
                ': The metadata of the page. It is used to define the title, description of the page and other things.',
              ],
            }),
            `
`,
          ],
        }),
        `
`,
        e.jsx(n.h3, { children: 'Methods' }),
        `
`,
        e.jsxs(n.ul, {
          children: [
            `
`,
            e.jsxs(n.li, {
              children: [
                e.jsx(n.code, { children: 'loader()' }),
                ': Similar to ',
                e.jsx(n.code, { children: 'getServerSideProps()' }),
                ' in Next.js, this method is used to make some operations on the server before the page is rendered.',
              ],
            }),
            `
`,
          ],
        }),
        `
`,
        e.jsxs(n.p, {
          children: [
            'The ',
            e.jsx(n.code, { children: 'loader()' }),
            ' method is optional. The returned promise has to follow the following structure:',
          ],
        }),
        `
`,
        e.jsxs(n.figure, {
          'data-rehype-pretty-code-figure': '',
          children: [
            e.jsx(n.figcaption, {
              'data-rehype-pretty-code-title': '',
              'data-language': 'ts',
              'data-theme': 'github-dark-dimmed',
              children: 'JS',
            }),
            e.jsx(n.pre, {
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
                        style: { color: '#F47067' },
                        children: 'type',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F69D50' },
                        children: ' LoaderResponse',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: ' =',
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
                        style: { color: '#F69D50' },
                        children: '  props',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: '?:',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: ' { [',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F69D50' },
                        children: 'key',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: ':',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#6CB6FF' },
                        children: ' string',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: ']',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: ':',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#6CB6FF' },
                        children: ' any',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: ' };',
                      }),
                    ],
                  }),
                  `
`,
                  e.jsxs(n.span, {
                    'data-line': '',
                    children: [
                      e.jsx(n.span, {
                        style: { color: '#F69D50' },
                        children: '  redirect',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#F47067' },
                        children: '?:',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#6CB6FF' },
                        children: ' string',
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
                ],
              }),
            }),
          ],
        }),
        `
`,
        `
`,
        e.jsx(n.h2, {
          children: 'Example with loader() method [#loader-function]',
        }),
        `
`,
        e.jsxs(n.p, {
          children: [
            'All what was mentioned in the ',
            e.jsx(n.code, { children: 'LayoutComponent' }),
            ' section about ',
            e.jsx(n.code, { children: 'loader' }),
            ' is applied here.',
          ],
        }),
        `
`,
        e.jsxs(n.p, {
          children: [
            'Just read the ',
            e.jsx(t, {
              to: '/docs/api-reference/components/layout-component#loader-function',
              children: e.jsx(n.code, { children: 'loader' }),
            }),
            ' paragraph in the ',
            e.jsx(n.code, { children: 'LayoutComponent' }),
            ' section.',
          ],
        }),
        `
`,
        e.jsx(d, {
          prev: {
            href: '/docs/api-reference/components/layout-component',
            label: 'Layout Component',
          },
          next: {
            href: '/docs/api-reference/components/router-component',
            label: 'Router Component',
          },
        }),
      ],
    })
  );
}
function a(s = {}) {
  const { wrapper: n } = s.components || {};
  return n ? e.jsx(n, { ...s, children: e.jsx(o, { ...s }) }) : o(s);
}
function r(s, n) {
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
      title: 'Page Component - Components | API Reference | Rasengan.js',
      description:
        'The Page Component is a functional component that defines a page in a Rasengan.js app.',
    },
  },
  c = [
    {
      title: 'Example',
      anchor: { id: 'example', text: 'Example' },
      level: 2,
      children: [],
    },
    {
      title: 'Properties and Methods',
      anchor: { id: 'properties-and-methods', text: 'Properties and Methods' },
      level: 2,
      children: [
        {
          title: 'Properties',
          anchor: { id: 'properties', text: 'Properties' },
          level: 3,
        },
        {
          title: 'Methods',
          anchor: { id: 'methods', text: 'Methods' },
          level: 3,
        },
      ],
    },
    {
      title: 'Example with loader() method [#loader-function]',
      anchor: { id: 'loader-function', text: 'Example with loader() method' },
      level: 2,
      children: [],
    },
  ];
a.metadata = i;
a.toc = c;
a.type = 'MDXPageComponent';
export { a as default };
