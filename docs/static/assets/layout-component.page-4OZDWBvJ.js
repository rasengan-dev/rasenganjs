import { j as e } from './vendor-CfbgIbdB.js';
import { T as l, P as o } from './shared-components-CkrC6jAk.js';
function t(s) {
  const n = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    p: 'p',
    pre: 'pre',
    span: 'span',
    strong: 'strong',
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
        e.jsx(n.h1, { children: 'Layout Convention naming' }),
        `
`,
        e.jsxs(n.p, {
          children: [
            'In Rasengan.js, to create a ',
            e.jsx(n.code, { children: 'layout' }),
            ', you have to create a file that follow the following name pattern when you are using ',
            e.jsx(n.code, { children: 'config-based routing' }),
            ' system:',
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
              children: 'Layout',
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
                  children: e.jsx(n.span, { children: '[name].layout.js' }),
                }),
              }),
            }),
          ],
        }),
        `
`,
        e.jsx(n.p, {
          children:
            "Note that, it's not required to follow this convention but, it's recommended to do so.",
        }),
        `
`,
        e.jsx('br', {}),
        `
`,
        e.jsxs(n.p, {
          children: [
            'For ',
            e.jsxs(n.strong, {
              children: [
                e.jsx(n.code, { children: 'file-based routing' }),
                ' system',
              ],
            }),
            ', you have to create a file named ',
            e.jsx(n.code, { children: 'layout.tsx' }),
            ' or ',
            e.jsx(n.code, { children: 'layout.jsx' }),
            ' inside the ',
            e.jsx(n.code, { children: 'src/app/_routes' }),
            ' folder.',
          ],
        }),
        `
`,
        e.jsxs(n.p, {
          children: [
            'A ',
            e.jsx(n.code, { children: 'layout' }),
            ' is UI that is shared between routes.',
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
                    children: 'app.layout.tsx',
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
                              children: ' { LayoutComponent, Outlet } ',
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
                              ' * This AppLayout is located inside the app.layout.tsx file',
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
                              children: ' AppLayout',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ' LayoutComponent',
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
                              children: '>App Layout</',
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
                        e.jsx(n.span, { 'data-line': '', children: ' ' }),
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
                              children: 'Outlet',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' />',
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
                              children: 'AppLayout.path ',
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
                              children: ' AppLayout;',
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
                    children: 'app.layout.jsx',
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
                              children: ' { Outlet } ',
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
                              ' * This AppLayout is located inside the app.layout.tsx file',
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
                              children: ' AppLayout',
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
                              children: '>App Layout</',
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
                        e.jsx(n.span, { 'data-line': '', children: ' ' }),
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
                              children: 'Outlet',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' />',
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
                              children: 'AppLayout.path ',
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
                              children: ' AppLayout;',
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
            e.jsx(n.code, { children: 'app' }),
            ' in the convention name and we got ',
            e.jsx(n.code, { children: 'app.layout.jsx' }),
            '.',
          ],
        }),
        `
`,
        `
`,
        e.jsx(o, {
          prev: {
            href: '/docs/api-reference/functions/render-app',
            label: 'renderApp',
          },
          next: {
            href: '/docs/api-reference/conventions/page',
            label: '[name].page.tsx',
          },
        }),
      ],
    })
  );
}
function a(s = {}) {
  const { wrapper: n } = s.components || {};
  return n ? e.jsx(n, { ...s, children: e.jsx(t, { ...s }) }) : t(s);
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
const d = {
    path: '/layout-component',
    metadata: {
      title:
        'Layout Convention naming - Conventions | API Reference | Rasengan.js',
      description: 'In this section, we will learn how to name a layout.',
    },
  },
  i = [
    {
      title: 'Example',
      anchor: { id: 'example', text: 'Example' },
      level: 2,
      children: [],
    },
  ];
a.metadata = d;
a.toc = i;
a.type = 'MDXPageComponent';
export { a as default };
