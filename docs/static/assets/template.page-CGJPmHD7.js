import { j as e } from './vendor-w5t4XTd4.js';
import { T as l, P as c } from './shared-components-DBceyN8p.js';
function t(n) {
  const s = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    li: 'li',
    p: 'p',
    pre: 'pre',
    span: 'span',
    ul: 'ul',
    ...n.components,
  };
  return (
    l || a('Tabs', !1),
    l.Item || a('Tabs.Item', !0),
    e.jsxs(e.Fragment, {
      children: [
        e.jsx('span', {
          className: 'text-[12px] font-mono-regular text-foreground/60',
          children: e.jsx(s.p, { children: 'API REFERENCE' }),
        }),
        `
`,
        e.jsx(s.h1, { children: 'Template' }),
        `
`,
        e.jsx(s.p, {
          children:
            'The HTML template component is a simple component that allows you to define the base structure of your html content inside your application.',
        }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'This file is ',
            e.jsx(s.code, { children: 'required' }),
            ' and has to be defined into the ',
            e.jsx(s.code, { children: 'src' }),
            ' folder.',
          ],
        }),
        `
`,
        e.jsx(s.h2, { children: 'Usage' }),
        `
`,
        e.jsxs(l, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            e.jsx(l.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/template.tsx',
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
                              children: ' { TemplateProps } ',
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
                              children: '        <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'title',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>Document</',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'title',
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
                      ],
                    }),
                  }),
                ],
              }),
            }),
            e.jsx(l.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/template.jsx',
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
                              children: '        <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'title',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>Document</',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'title',
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
        e.jsx(s.h2, { children: 'Props' }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'The ',
            e.jsx(s.code, { children: 'Template' }),
            ' component has the following properties:',
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
                e.jsx(s.code, { children: 'Head' }),
                ": The head of the component. It's used to define the head of the html document.",
              ],
            }),
            `
`,
            e.jsxs(s.li, {
              children: [
                e.jsx(s.code, { children: 'Body' }),
                ": The body of the component. It's used to define the body of the html document.",
              ],
            }),
            `
`,
            e.jsxs(s.li, {
              children: [
                e.jsx(s.code, { children: 'Script' }),
                ": The script of the component. It's used to define the script of the html document.",
              ],
            }),
            `
`,
          ],
        }),
        `
`,
        e.jsx(c, {
          prev: {
            href: '/docs/api-reference/components/component',
            label: 'Component',
          },
          next: {
            href: '/docs/api-reference/components/layout-component',
            label: 'Layout Component',
          },
        }),
      ],
    })
  );
}
function r(n = {}) {
  const { wrapper: s } = n.components || {};
  return s ? e.jsx(s, { ...n, children: e.jsx(t, { ...n }) }) : t(n);
}
function a(n, s) {
  throw new Error(
    'Expected ' +
      (s ? 'component' : 'object') +
      ' `' +
      n +
      '` to be defined: you likely forgot to import, pass, or provide it.'
  );
}
const o = {
    path: '/template',
    metadata: {
      title: 'Template - Components | API Reference | Rasengan.js',
      description: 'Learn how to use the Template component in Rasengan.js.',
    },
  },
  d = [
    {
      title: 'Usage',
      anchor: { id: 'usage', text: 'Usage' },
      level: 2,
      children: [],
    },
    {
      title: 'Props',
      anchor: { id: 'props', text: 'Props' },
      level: 2,
      children: [],
    },
  ];
r.metadata = o;
r.toc = d;
r.type = 'MDXPageComponent';
export { r as default };
