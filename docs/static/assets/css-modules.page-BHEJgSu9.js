import { j as s } from './vendor-w5t4XTd4.js';
import { T as e, P as o } from './shared-components-DBceyN8p.js';
function a(n) {
  const l = {
    a: 'a',
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    pre: 'pre',
    span: 'span',
    ...n.components,
  };
  return (
    e || c('Tabs', !1),
    e.Item || c('Tabs.Item', !0),
    s.jsxs(s.Fragment, {
      children: [
        s.jsx('span', {
          className: 'text-[12px] font-mono-regular text-foreground/60',
          children: s.jsx(l.p, { children: 'CORE CONCEPTS' }),
        }),
        `
`,
        s.jsx(l.h1, { children: 'CSS Modules' }),
        `
`,
        s.jsxs(l.p, {
          children: [
            'Rasengan.js provides built-in support for CSS Modules using the ',
            s.jsx(l.code, { children: '.module.css' }),
            ' extension.',
          ],
        }),
        `
`,
        s.jsx(l.p, {
          children:
            'CSS Modules ensure locally scoped styles by automatically generating unique class names. This allows you to reuse class names across different files without worrying about conflicts, making it the preferred approach for styling individual components.',
        }),
        `
`,
        s.jsx(l.h2, { children: 'Importing CSS Modules' }),
        `
`,
        s.jsxs(l.p, {
          children: [
            'CSS Modules can be imported into any file within the ',
            s.jsx(l.code, { children: 'src' }),
            ' directory to style components.',
          ],
        }),
        `
`,
        s.jsxs(e, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            s.jsx(e.Item, {
              children: s.jsxs(l.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  s.jsx(l.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'Card.tsx',
                  }),
                  s.jsx(l.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: s.jsxs(l.code, {
                      'data-line-numbers': '',
                      'data-language': 'tsx',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      'data-line-numbers-max-digits': '2',
                      children: [
                        s.jsxs(l.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' styles ',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: ' "./layout.module.css"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ';',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsx(l.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'type',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F69D50' },
                              children: ' CardProps',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: ' =',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F69D50' },
                              children: '  title',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' string',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ';',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F69D50' },
                              children: '  content',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' string',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ';',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsx(l.span, {
                          'data-line': '',
                          children: s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: '};',
                          }),
                        }),
                        `
`,
                        s.jsx(l.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'export',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: ' default',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: ' function',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#DCBDFB' },
                              children: ' Card',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F69D50' },
                              children: '({ title, content }',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F69D50' },
                              children: ' CardProps) ',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '{',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '  return',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' (',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '    <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' className',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '={',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: 'styles.card',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '}',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '      <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' className',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '={',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: 'styles.card__title',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '}',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '{',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: 'title',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '}',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '</',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '      <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'p',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' className',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '={',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: 'styles.card__content',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '}',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '{',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: 'content',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '}',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '</',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'p',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '    </',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsx(l.span, {
                          'data-line': '',
                          children: s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: '  );',
                          }),
                        }),
                        `
`,
                        s.jsx(l.span, {
                          'data-line': '',
                          children: s.jsx(l.span, {
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
            s.jsx(e.Item, {
              children: s.jsxs(l.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  s.jsx(l.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'Card.jsx',
                  }),
                  s.jsx(l.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: s.jsxs(l.code, {
                      'data-line-numbers': '',
                      'data-language': 'jsx',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      'data-line-numbers-max-digits': '2',
                      children: [
                        s.jsxs(l.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' styles ',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: ' "./layout.module.css"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ';',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsx(l.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'export',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: ' default',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: ' function',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#DCBDFB' },
                              children: ' Card',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F69D50' },
                              children: '({ title, content }) ',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '{',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '  return',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' (',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '    <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' className',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '={',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: 'styles.card',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '}',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '      <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' className',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '={',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: 'styles.card__title',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '}',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '{',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: 'title',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '}',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '</',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '      <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'p',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' className',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '={',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: 'styles.card__content',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '}',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '{',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: 'content',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '}',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '</',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'p',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '    </',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsx(l.span, {
                          'data-line': '',
                          children: s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: '  );',
                          }),
                        }),
                        `
`,
                        s.jsx(l.span, {
                          'data-line': '',
                          children: s.jsx(l.span, {
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
        s.jsx(l.h2, { children: 'Global Styles' }),
        `
`,
        s.jsxs(l.p, {
          children: [
            'Global styles should be placed inside the ',
            s.jsx(l.code, { children: 'src/styles' }),
            ' directory and imported into the ',
            s.jsx(l.a, {
              href: '/docs/api-reference/file-conventions/main',
              children: s.jsx(l.code, { children: 'src/main.tsx' }),
            }),
            ' file.',
          ],
        }),
        `
`,
        s.jsx(l.h3, { children: 'styles/index.css' }),
        `
`,
        s.jsxs(l.figure, {
          'data-rehype-pretty-code-figure': '',
          children: [
            s.jsx(l.figcaption, {
              'data-rehype-pretty-code-title': '',
              'data-language': 'css',
              'data-theme': 'github-dark-dimmed',
              children: 'src/styles/index.css',
            }),
            s.jsx(l.pre, {
              style: { backgroundColor: '#22272e', color: '#adbac7' },
              tabIndex: '0',
              'data-language': 'css',
              'data-theme': 'github-dark-dimmed',
              children: s.jsxs(l.code, {
                'data-line-numbers': '',
                'data-language': 'css',
                'data-theme': 'github-dark-dimmed',
                style: { display: 'grid' },
                'data-line-numbers-max-digits': '2',
                children: [
                  s.jsxs(l.span, {
                    'data-line': '',
                    children: [
                      s.jsx(l.span, {
                        style: { color: '#8DDB8C' },
                        children: 'body',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#ADBAC7' },
                        children: ',',
                      }),
                    ],
                  }),
                  `
`,
                  s.jsxs(l.span, {
                    'data-line': '',
                    children: [
                      s.jsx(l.span, {
                        style: { color: '#8DDB8C' },
                        children: 'html',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#ADBAC7' },
                        children: ' {',
                      }),
                    ],
                  }),
                  `
`,
                  s.jsxs(l.span, {
                    'data-line': '',
                    children: [
                      s.jsx(l.span, {
                        style: { color: '#6CB6FF' },
                        children: '  box-sizing',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#ADBAC7' },
                        children: ': ',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#6CB6FF' },
                        children: 'border-box',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#ADBAC7' },
                        children: ';',
                      }),
                    ],
                  }),
                  `
`,
                  s.jsxs(l.span, {
                    'data-line': '',
                    children: [
                      s.jsx(l.span, {
                        style: { color: '#6CB6FF' },
                        children: '  margin',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#ADBAC7' },
                        children: ': ',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#6CB6FF' },
                        children: '0',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#ADBAC7' },
                        children: ';',
                      }),
                    ],
                  }),
                  `
`,
                  s.jsxs(l.span, {
                    'data-line': '',
                    children: [
                      s.jsx(l.span, {
                        style: { color: '#6CB6FF' },
                        children: '  padding',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#ADBAC7' },
                        children: ': ',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#6CB6FF' },
                        children: '0',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#ADBAC7' },
                        children: ';',
                      }),
                    ],
                  }),
                  `
`,
                  s.jsxs(l.span, {
                    'data-line': '',
                    children: [
                      s.jsx(l.span, {
                        style: { color: '#6CB6FF' },
                        children: '  width',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#ADBAC7' },
                        children: ': ',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#6CB6FF' },
                        children: '100',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#F47067' },
                        children: 'vw',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#ADBAC7' },
                        children: ';',
                      }),
                    ],
                  }),
                  `
`,
                  s.jsxs(l.span, {
                    'data-line': '',
                    children: [
                      s.jsx(l.span, {
                        style: { color: '#6CB6FF' },
                        children: '  min-height',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#ADBAC7' },
                        children: ': ',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#6CB6FF' },
                        children: '100',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#F47067' },
                        children: 'vh',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#ADBAC7' },
                        children: ';',
                      }),
                    ],
                  }),
                  `
`,
                  s.jsxs(l.span, {
                    'data-line': '',
                    children: [
                      s.jsx(l.span, {
                        style: { color: '#6CB6FF' },
                        children: '  overflow-x',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#ADBAC7' },
                        children: ': ',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#6CB6FF' },
                        children: 'hidden',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#ADBAC7' },
                        children: ';',
                      }),
                    ],
                  }),
                  `
`,
                  s.jsx(l.span, {
                    'data-line': '',
                    children: s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '}',
                    }),
                  }),
                  `
`,
                  s.jsx(l.span, { 'data-line': '', children: ' ' }),
                  `
`,
                  s.jsxs(l.span, {
                    'data-line': '',
                    children: [
                      s.jsx(l.span, {
                        style: { color: '#8DDB8C' },
                        children: 'a',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#ADBAC7' },
                        children: ' {',
                      }),
                    ],
                  }),
                  `
`,
                  s.jsxs(l.span, {
                    'data-line': '',
                    children: [
                      s.jsx(l.span, {
                        style: { color: '#6CB6FF' },
                        children: '  text-decoration',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#ADBAC7' },
                        children: ': ',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#6CB6FF' },
                        children: 'none',
                      }),
                      s.jsx(l.span, {
                        style: { color: '#ADBAC7' },
                        children: ';',
                      }),
                    ],
                  }),
                  `
`,
                  s.jsx(l.span, {
                    'data-line': '',
                    children: s.jsx(l.span, {
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
        s.jsx(l.h3, { children: 'Importing Global Styles in src/main.tsx' }),
        `
`,
        s.jsxs(l.p, {
          children: [
            'To apply global styles across your application, import them in ',
            s.jsx(l.code, { children: 'src/main.tsx' }),
            '.',
          ],
        }),
        `
`,
        s.jsxs(e, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            s.jsx(e.Item, {
              children: s.jsxs(l.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  s.jsx(l.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/main.tsx',
                  }),
                  s.jsx(l.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: s.jsxs(l.code, {
                      'data-line-numbers': '',
                      'data-language': 'tsx',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      'data-line-numbers-max-digits': '1',
                      children: [
                        s.jsx(l.span, {
                          'data-line': '',
                          children: s.jsx(l.span, {
                            style: { color: '#768390' },
                            children: '// Global styles applied to all routes',
                          }),
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: ' "@/styles/index.css"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ';',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsx(l.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' { ',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'type',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' AppProps } ',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: ' "rasengan"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ';',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' AppRouter ',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: ' "@/app/app.router"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ';',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsx(l.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'export',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: ' default',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: ' function',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#DCBDFB' },
                              children: ' App',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F69D50' },
                              children: '({ Component, children }',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F69D50' },
                              children: ' AppProps) ',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '{',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '  return',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Component',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' router',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '={',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: 'AppRouter',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '}',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '{',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: 'children',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '}',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '</',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Component',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>;',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsx(l.span, {
                          'data-line': '',
                          children: s.jsx(l.span, {
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
            s.jsx(e.Item, {
              children: s.jsxs(l.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  s.jsx(l.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/main.jsx',
                  }),
                  s.jsx(l.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: s.jsxs(l.code, {
                      'data-line-numbers': '',
                      'data-language': 'jsx',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      'data-line-numbers-max-digits': '1',
                      children: [
                        s.jsx(l.span, {
                          'data-line': '',
                          children: s.jsx(l.span, {
                            style: { color: '#768390' },
                            children: '// Global styles applied to all routes',
                          }),
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: ' "@/styles/index.css"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ';',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsx(l.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' AppRouter ',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: ' "@/app/app.router"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ';',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsx(l.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'export',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: ' default',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: ' function',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#DCBDFB' },
                              children: ' App',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F69D50' },
                              children: '({ Component, children }) ',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '{',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '  return',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Component',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' router',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '={',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: 'AppRouter',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '}',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '{',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: 'children',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '}',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '</',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Component',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>;',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsx(l.span, {
                          'data-line': '',
                          children: s.jsx(l.span, {
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
        s.jsx(l.h2, { children: 'External Stylesheets' }),
        `
`,
        s.jsxs(l.p, {
          children: [
            'Stylesheets from external packages can be imported in ',
            s.jsx(l.code, { children: 'src/main.tsx' }),
            ' or any other file where they are needed.',
          ],
        }),
        `
`,
        s.jsxs(e, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            s.jsx(e.Item, {
              children: s.jsx(l.figure, {
                'data-rehype-pretty-code-figure': '',
                children: s.jsx(l.pre, {
                  style: { backgroundColor: '#22272e', color: '#adbac7' },
                  tabIndex: '0',
                  'data-language': 'tsx',
                  'data-theme': 'github-dark-dimmed',
                  children: s.jsxs(l.code, {
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    style: { display: 'grid' },
                    children: [
                      s.jsxs(l.span, {
                        'data-line': '',
                        'data-highlighted-line': '',
                        children: [
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: 'import',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#96D0FF' },
                            children: ' "@rasenganjs/image/css"',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: ';',
                          }),
                        ],
                      }),
                      `
`,
                      s.jsx(l.span, { 'data-line': '', children: ' ' }),
                      `
`,
                      s.jsxs(l.span, {
                        'data-line': '',
                        children: [
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: 'import',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: ' { ',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: 'type',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: ' AppProps } ',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: 'from',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#96D0FF' },
                            children: ' "rasengan"',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: ';',
                          }),
                        ],
                      }),
                      `
`,
                      s.jsxs(l.span, {
                        'data-line': '',
                        children: [
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: 'import',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: ' AppRouter ',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: 'from',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#96D0FF' },
                            children: ' "@/app/app.router"',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: ';',
                          }),
                        ],
                      }),
                      `
`,
                      s.jsx(l.span, { 'data-line': '', children: ' ' }),
                      `
`,
                      s.jsxs(l.span, {
                        'data-line': '',
                        children: [
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: 'export',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: ' default',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: ' function',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#DCBDFB' },
                            children: ' App',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F69D50' },
                            children: '({ Component, children }',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: ':',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F69D50' },
                            children: ' AppProps) ',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: '{',
                          }),
                        ],
                      }),
                      `
`,
                      s.jsxs(l.span, {
                        'data-line': '',
                        children: [
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: '  return',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: ' <',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#8DDB8C' },
                            children: 'Component',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#6CB6FF' },
                            children: ' router',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: '={',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: 'AppRouter',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: '}',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: '>',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: '{',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: 'children',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: '}',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: '</',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#8DDB8C' },
                            children: 'Component',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: '>;',
                          }),
                        ],
                      }),
                      `
`,
                      s.jsx(l.span, {
                        'data-line': '',
                        children: s.jsx(l.span, {
                          style: { color: '#ADBAC7' },
                          children: '}',
                        }),
                      }),
                    ],
                  }),
                }),
              }),
            }),
            s.jsx(e.Item, {
              children: s.jsx(l.figure, {
                'data-rehype-pretty-code-figure': '',
                children: s.jsx(l.pre, {
                  style: { backgroundColor: '#22272e', color: '#adbac7' },
                  tabIndex: '0',
                  'data-language': 'jsx',
                  'data-theme': 'github-dark-dimmed',
                  children: s.jsxs(l.code, {
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    style: { display: 'grid' },
                    children: [
                      s.jsxs(l.span, {
                        'data-line': '',
                        'data-highlighted-line': '',
                        children: [
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: 'import',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#96D0FF' },
                            children: ' "@rasenganjs/image/css"',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: ';',
                          }),
                        ],
                      }),
                      `
`,
                      s.jsx(l.span, { 'data-line': '', children: ' ' }),
                      `
`,
                      s.jsxs(l.span, {
                        'data-line': '',
                        children: [
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: 'import',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: ' AppRouter ',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: 'from',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#96D0FF' },
                            children: ' "@/app/app.router"',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: ';',
                          }),
                        ],
                      }),
                      `
`,
                      s.jsx(l.span, { 'data-line': '', children: ' ' }),
                      `
`,
                      s.jsxs(l.span, {
                        'data-line': '',
                        children: [
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: 'export',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: ' default',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: ' function',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#DCBDFB' },
                            children: ' App',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F69D50' },
                            children: '({ Component, children }) ',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: '{',
                          }),
                        ],
                      }),
                      `
`,
                      s.jsxs(l.span, {
                        'data-line': '',
                        children: [
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: '  return',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: ' <',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#8DDB8C' },
                            children: 'Component',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#6CB6FF' },
                            children: ' router',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: '={',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: 'AppRouter',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: '}',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: '>',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: '{',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: 'children',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: '}',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: '</',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#8DDB8C' },
                            children: 'Component',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: '>;',
                          }),
                        ],
                      }),
                      `
`,
                      s.jsx(l.span, {
                        'data-line': '',
                        children: s.jsx(l.span, {
                          style: { color: '#ADBAC7' },
                          children: '}',
                        }),
                      }),
                    ],
                  }),
                }),
              }),
            }),
          ],
        }),
        `
`,
        s.jsxs(l.p, {
          children: [
            'You can also load stylesheets from a CDN into the ',
            s.jsx(l.code, { children: 'src/template.tsx' }),
            ' file.',
          ],
        }),
        `
`,
        s.jsxs(e, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            s.jsx(e.Item, {
              children: s.jsxs(l.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  s.jsx(l.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/template.tsx',
                  }),
                  s.jsx(l.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: s.jsxs(l.code, {
                      'data-line-numbers': '',
                      'data-language': 'tsx',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      'data-line-numbers-max-digits': '2',
                      children: [
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' { ',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'type',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' TemplateProps } ',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: " 'rasengan'",
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ';',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsx(l.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'export',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: ' default',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: ' function',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#DCBDFB' },
                              children: ' Template',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F69D50' },
                              children: '({ Head, Body, Script }',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F69D50' },
                              children: ' TemplateProps) ',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '{',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '  return',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' (',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '    <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'html',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' lang',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: '"en"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '      <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Head',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '        <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'meta',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' charSet',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: '"UTF-8"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' />',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '        <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'link',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' rel',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: '"icon"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' type',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: '"image/svg+xml"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' href',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: '"/rasengan.svg"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' />',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '        <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'meta',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' name',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: '"viewport"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' content',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children:
                                '"width=device-width, initial-scale=1.0"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' />',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsx(l.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '        <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'link',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' rel',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: '"stylesheet"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' href',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children:
                                '"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' />',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '      </',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Head',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsx(l.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '      <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Body',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '        <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Script',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' />',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '      </',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Body',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '    </',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'html',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsx(l.span, {
                          'data-line': '',
                          children: s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: '  );',
                          }),
                        }),
                        `
`,
                        s.jsx(l.span, {
                          'data-line': '',
                          children: s.jsx(l.span, {
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
            s.jsx(e.Item, {
              children: s.jsxs(l.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  s.jsx(l.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/template.jsx',
                  }),
                  s.jsx(l.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: s.jsxs(l.code, {
                      'data-line-numbers': '',
                      'data-language': 'jsx',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      'data-line-numbers-max-digits': '2',
                      children: [
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: 'export',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: ' default',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: ' function',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#DCBDFB' },
                              children: ' Template',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F69D50' },
                              children: '({ Head, Body, Script }) ',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '{',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '  return',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' (',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '    <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'html',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' lang',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: '"en"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '      <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Head',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '        <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'meta',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' charSet',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: '"UTF-8"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' />',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '        <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'link',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' rel',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: '"icon"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' type',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: '"image/svg+xml"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' href',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: '"/rasengan.svg"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' />',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '        <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'meta',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' name',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: '"viewport"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' content',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children:
                                '"width=device-width, initial-scale=1.0"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' />',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsx(l.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '        <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'link',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' rel',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children: '"stylesheet"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#6CB6FF' },
                              children: ' href',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#96D0FF' },
                              children:
                                '"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' />',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '      </',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Head',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsx(l.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '      <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Body',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '        <',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Script',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: ' />',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '      </',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'Body',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsxs(l.span, {
                          'data-line': '',
                          children: [
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '    </',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#8DDB8C' },
                              children: 'html',
                            }),
                            s.jsx(l.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        s.jsx(l.span, {
                          'data-line': '',
                          children: s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: '  );',
                          }),
                        }),
                        `
`,
                        s.jsx(l.span, {
                          'data-line': '',
                          children: s.jsx(l.span, {
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
        s.jsx(o, {
          prev: {
            href: '/docs/rendering/prerendering',
            label: 'Pre-rendering',
          },
          next: { href: '/docs/styling/tailwindcss', label: 'Tailwind CSS' },
        }),
      ],
    })
  );
}
function r(n = {}) {
  const { wrapper: l } = n.components || {};
  return l ? s.jsx(l, { ...n, children: s.jsx(a, { ...n }) }) : a(n);
}
function c(n, l) {
  throw new Error(
    'Expected ' +
      (l ? 'component' : 'object') +
      ' `' +
      n +
      '` to be defined: you likely forgot to import, pass, or provide it.'
  );
}
const t = {
    path: '/css-modules',
    metadata: {
      title: 'CSS Modules - Styling | Core concepts | Rasengan.js',
      description: 'Built-in support for CSS Modules in Rasengan.js.',
    },
  },
  d = [
    {
      title: 'Importing CSS Modules',
      anchor: { id: 'importing-css-modules', text: 'Importing CSS Modules' },
      level: 2,
      children: [],
    },
    {
      title: 'Global Styles',
      anchor: { id: 'global-styles', text: 'Global Styles' },
      level: 2,
      children: [
        {
          title: 'styles/index.css',
          anchor: { id: 'styles/index.css', text: 'styles/index.css' },
          level: 3,
        },
        {
          title: 'Importing Global Styles in src/main.tsx',
          anchor: {
            id: 'importing-global-styles-in-src/main.tsx',
            text: 'Importing Global Styles in src/main.tsx',
          },
          level: 3,
        },
      ],
    },
    {
      title: 'External Stylesheets',
      anchor: { id: 'external-stylesheets', text: 'External Stylesheets' },
      level: 2,
      children: [],
    },
  ];
r.metadata = t;
r.toc = d;
r.type = 'MDXPageComponent';
export { r as default };
