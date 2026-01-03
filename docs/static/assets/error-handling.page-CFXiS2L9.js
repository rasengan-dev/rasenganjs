import { j as e } from './vendor-w5t4XTd4.js';
import { T as l, P as o } from './shared-components-DBceyN8p.js';
function a(n) {
  const s = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    img: 'img',
    p: 'p',
    pre: 'pre',
    span: 'span',
    ...n.components,
  };
  return (
    l || t('Tabs', !1),
    l.Item || t('Tabs.Item', !0),
    e.jsxs(e.Fragment, {
      children: [
        e.jsx('span', {
          className: 'text-[12px] font-mono-regular text-foreground/60',
          children: e.jsx(s.p, { children: 'CORE CONCEPTS' }),
        }),
        `
`,
        e.jsx(s.h1, { children: 'Error Handling' }),
        `
`,
        e.jsx(s.p, {
          children:
            'When you encounter an error, Rasengan.js will throw an error message specifying the error type and the line number where the error occurred.',
        }),
        `
`,
        e.jsx(s.p, {
          children:
            "It's important for debugging purposes to know where the error occurred, but in production the error details should be hidden from the user.",
        }),
        `
`,
        e.jsx(s.h2, { children: 'Handling 404 Error' }),
        `
`,
        e.jsx(s.p, {
          children:
            'By default, Rasengan.js will throw a 404 error if the page is not found by providing a predifined 404 page.',
        }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'You can customize the 404 page by creating a simple ',
            e.jsx(s.code, { children: 'React Component' }),
            ' and passing it to the ',
            e.jsx(s.code, { children: 'AppRouter' }),
            ' configuration.',
          ],
        }),
        `
`,
        e.jsx(s.h3, { children: 'Step 1: Create a 404 Page Component' }),
        `
`,
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
                    children: 'src/app/_404.tsx',
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
                              children: ' { Link } ',
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
                              children: ' NotFound',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: '() ',
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
                              children: '>404 - Page Not Found</',
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
                              children: 'Link',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#6CB6FF' },
                              children: ' to',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"/"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>Go to Home</',
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
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/app/_404.jsx',
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
                              children: ' { Link } ',
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
                              children: ' NotFound',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: '() ',
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
                              children: '>404 - Page Not Found</',
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
                              children: 'Link',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#6CB6FF' },
                              children: ' to',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"/"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>Go to Home</',
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
        e.jsx(s.h3, { children: 'Step 2: Using the 404 Page Component' }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'You now have to pass the 404 page component to the ',
            e.jsx(s.code, { children: 'AppRouter' }),
            ' configuration.',
          ],
        }),
        `
`,
        e.jsxs(l, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          children: [
            e.jsx(l.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'typescript',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/app/app.router.ts',
                  }),
                  e.jsx(s.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'typescript',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsxs(s.code, {
                      'data-line-numbers': '',
                      'data-language': 'typescript',
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
                              children: ' { RouterComponent, defineRouter } ',
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
                        e.jsxs(s.span, {
                          'data-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' Home ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "@/app/home.page"',
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
                              children: ' AppLayout ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "@/app/app.layout"',
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
                              children: ' NotFound ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "@/app/_404"',
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
                              children: 'class',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: ' AppRouter',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ' extends',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#6CB6FF' },
                              children: ' RouterComponent',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {}',
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
                              children: ' defineRouter',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
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
                              children: '  import: []',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: ',',
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
                              children: '  layout: AppLayout',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: ',',
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
                              children: '  pages: [Home]',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: ',',
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
                              children: '  notFoundComponent: NotFound ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#768390' },
                              children: '// set the 404 page here',
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
                              children: '})(',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: 'AppRouter',
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
            }),
            e.jsx(l.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'typescript',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/app/app.router.js',
                  }),
                  e.jsx(s.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'typescript',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsxs(s.code, {
                      'data-line-numbers': '',
                      'data-language': 'typescript',
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
                              children: ' { RouterComponent, defineRouter } ',
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
                        e.jsxs(s.span, {
                          'data-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'import',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' Home ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "@/app/home.page"',
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
                              children: ' AppLayout ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "@/app/app.layout"',
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
                              children: ' NotFound ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "@/app/_404"',
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
                              children: 'class',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: ' AppRouter',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ' extends',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#6CB6FF' },
                              children: ' RouterComponent',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {}',
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
                              children: ' defineRouter',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
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
                              children: '  import: []',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: ',',
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
                              children: '  layout: AppLayout',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: ',',
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
                              children: '  pages: [Home]',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: ',',
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
                              children: '  notFoundComponent: NotFound ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#768390' },
                              children: '// set the 404 page here',
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
                              children: '})(',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: 'AppRouter',
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
            }),
          ],
        }),
        `
`,
        e.jsx(s.h3, { children: 'Step 3: Test the 404 Page' }),
        `
`,
        e.jsx(s.p, {
          children:
            "Now, if you navigate to a page that doesn't exist, you should see the 404 page you created.",
        }),
        `
`,
        e.jsx(s.p, {
          children: 'With some simple styling, here is the result:',
        }),
        `
`,
        e.jsx(s.p, {
          children: e.jsx(s.img, {
            src: '/assets/images/404.webp',
            alt: '404 Page',
          }),
        }),
        `
`,
        e.jsx(s.p, {
          children:
            'You can provide a better UI for the 404 page by adding some CSS to the page.',
        }),
        `
`,
        e.jsx(o, {
          prev: {
            href: '/docs/routing/dynamic-routes',
            label: 'Dynamic Routes',
          },
          next: { href: '/docs/routing/redirecting', label: 'Redirecting' },
        }),
      ],
    })
  );
}
function r(n = {}) {
  const { wrapper: s } = n.components || {};
  return s ? e.jsx(s, { ...n, children: e.jsx(a, { ...n }) }) : a(n);
}
function t(n, s) {
  throw new Error(
    'Expected ' +
      (s ? 'component' : 'object') +
      ' `' +
      n +
      '` to be defined: you likely forgot to import, pass, or provide it.'
  );
}
const i = {
    path: '/error-handling',
    metadata: {
      title: 'Error Handling - Routing | Core concepts | Rasengan.js',
      description:
        'Handling errors in Rasengan.js is a crucial aspect of building robust and user-friendly applications.',
    },
  },
  c = [
    {
      title: 'Handling 404 Error',
      anchor: { id: 'handling-404-error', text: 'Handling 404 Error' },
      level: 2,
      children: [
        {
          title: 'Step 1: Create a 404 Page Component',
          anchor: {
            id: 'step-1:-create-a-404-page-component',
            text: 'Step 1: Create a 404 Page Component',
          },
          level: 3,
        },
        {
          title: 'Step 2: Using the 404 Page Component',
          anchor: {
            id: 'step-2:-using-the-404-page-component',
            text: 'Step 2: Using the 404 Page Component',
          },
          level: 3,
        },
        {
          title: 'Step 3: Test the 404 Page',
          anchor: {
            id: 'step-3:-test-the-404-page',
            text: 'Step 3: Test the 404 Page',
          },
          level: 3,
        },
      ],
    },
  ];
r.metadata = i;
r.toc = c;
r.type = 'MDXPageComponent';
export { r as default };
