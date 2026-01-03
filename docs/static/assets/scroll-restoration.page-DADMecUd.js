import { j as e } from './vendor-w5t4XTd4.js';
import { T as n, P as t } from './shared-components-DBceyN8p.js';
function a(l) {
  const s = {
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
    ...l.components,
  };
  return (
    n || o('Tabs', !1),
    n.Item || o('Tabs.Item', !0),
    e.jsxs(e.Fragment, {
      children: [
        e.jsx('span', {
          className: 'text-[12px] font-mono-regular text-foreground/60',
          children: e.jsx(s.p, { children: 'API REFERENCE' }),
        }),
        `
`,
        e.jsx(s.h1, { children: 'ScrollRestoration' }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'The ',
            e.jsx(s.code, { children: 'ScrollRestoration' }),
            ' React component is a special component that is used to restore the scroll position of the current page.',
          ],
        }),
        `
`,
        e.jsx(s.p, {
          children:
            'By default, the scroll position is not well resotored because of the client side navigation. The scroll position is tracked and maintained for all the pages of your website.',
        }),
        `
`,
        e.jsxs(s.p, {
          children: [
            "This means, if you are on page 2 and you scroll down, and then you navigate to page 3, the scroll position will be restored to the position you were on page 2. That's why the ",
            e.jsx(s.code, { children: 'ScrollRestoration' }),
            ' component is useful.',
          ],
        }),
        `
`,
        e.jsx(s.h2, { children: 'Usage' }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'The ',
            e.jsx(s.code, { children: 'ScrollRestoration' }),
            ' component is a functional that you have to put where you want to restore the scroll position, generally in your root layout.',
          ],
        }),
        `
`,
        e.jsxs(n, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            e.jsx(n.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'app.layout.tsx',
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
                              children: ' { LayoutComponent, Outlet, ',
                            }),
                            e.jsx(s.mark, {
                              'data-highlighted-chars': '',
                              children: e.jsx(s.span, {
                                style: { color: '#ADBAC7' },
                                children: 'ScrollRestoration',
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
                              children: 'const',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: ' AppLayout',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: ' LayoutComponent',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '      <',
                            }),
                            e.jsx(s.mark, {
                              'data-highlighted-chars': '',
                              children: e.jsx(s.span, {
                                style: { color: '#8DDB8C' },
                                children: 'ScrollRestoration',
                              }),
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' />',
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
                              style: { color: '#ADBAC7' },
                              children: '      <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'header',
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
                              children: 'h1',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>Header</',
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
                              children: '      </',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'header',
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
                              children: 'main',
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
                              children: 'Outlet',
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
                              children: 'main',
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
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: 'AppLayout.path ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/"',
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
            e.jsx(n.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'jsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'app.layout.jsx',
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
                              children: 'import',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' { Outlet, ',
                            }),
                            e.jsx(s.mark, {
                              'data-highlighted-chars': '',
                              children: e.jsx(s.span, {
                                style: { color: '#ADBAC7' },
                                children: 'ScrollRestoration',
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
                              children: 'const',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: ' AppLayout',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '      <',
                            }),
                            e.jsx(s.mark, {
                              'data-highlighted-chars': '',
                              children: e.jsx(s.span, {
                                style: { color: '#8DDB8C' },
                                children: 'ScrollRestoration',
                              }),
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' />',
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
                              style: { color: '#ADBAC7' },
                              children: '      <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'header',
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
                              children: 'h1',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>Header</',
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
                              children: '      </',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'header',
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
                              children: 'main',
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
                              children: 'Outlet',
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
                              children: 'main',
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
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: 'AppLayout.path ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/"',
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
        e.jsx('br', {}),
        `
`,
        e.jsx(s.h2, { children: 'Props' }),
        `
`,
        e.jsx(s.h3, { children: e.jsx(s.code, { children: 'alwaysToTop' }) }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'By default, the ',
            e.jsx(s.code, { children: 'ScrollRestoration' }),
            ' component will keep track of the scroll position of the current page and restore it when the page is reloaded.',
          ],
        }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'But, you can configure your ',
            e.jsx(s.code, { children: 'ScrollRestoration' }),
            ' component to restore the scroll position to the top of the page.',
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
              children: 'scroll-restoration',
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
                        children: ' { ScrollRestoration } ',
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
                  e.jsx(s.span, {
                    'data-line': '',
                    children: e.jsx(s.span, {
                      style: { color: '#768390' },
                      children: '// Usage',
                    }),
                  }),
                  `
`,
                  e.jsxs(s.span, {
                    'data-line': '',
                    children: [
                      e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: '<',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#8DDB8C' },
                        children: 'ScrollRestoration',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#6CB6FF' },
                        children: ' alwaysToTop',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: ' />',
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
        `
`,
        e.jsx(s.h3, { children: e.jsx(s.code, { children: 'target' }) }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'The ',
            e.jsx(s.code, { children: 'target' }),
            ' prop is used to specify the element in which the scroll position will be restored. If not specified, the scroll position will be applied to the ',
            e.jsx(s.code, { children: 'window' }),
            '.',
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
              children: 'scroll-restoration',
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
                        children: ' { ScrollRestoration } ',
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
                  e.jsx(s.span, {
                    'data-line': '',
                    children: e.jsx(s.span, {
                      style: { color: '#768390' },
                      children: '// Usage',
                    }),
                  }),
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
                        children: ' const',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#DCBDFB' },
                        children: ' ScrollRestorationExample',
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
                        style: { color: '#6CB6FF' },
                        children: ' ref',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F47067' },
                        children: ' =',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#DCBDFB' },
                        children: ' useRef',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: '<',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F69D50' },
                        children: 'HTMLDivElement',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: '>(',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#6CB6FF' },
                        children: 'null',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: ');',
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
                  e.jsx(s.span, {
                    'data-line': '',
                    children: e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '    <>',
                    }),
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
                        children: 'ScrollRestoration',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#6CB6FF' },
                        children: ' target',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F47067' },
                        children: '={',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: 'ref',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F47067' },
                        children: '}',
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
                        children: '      <',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#8DDB8C' },
                        children: 'div',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#6CB6FF' },
                        children: ' ref',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#F47067' },
                        children: '={',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: 'ref',
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
                        style: { color: '#ADBAC7' },
                        children: '        <',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#8DDB8C' },
                        children: 'h1',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children: '>ScrollRestoration Example</',
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
                        children: '        <',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#8DDB8C' },
                        children: 'p',
                      }),
                      e.jsx(s.span, {
                        style: { color: '#ADBAC7' },
                        children:
                          '>Scroll down and navigate to another page, then navigate back to this page. The scroll position will be restored.</',
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
                        children: '      </',
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
                      children: '    </>',
                    }),
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
        e.jsx(t, {
          prev: {
            href: '/docs/api-reference/components/router-component',
            label: 'Router Component',
          },
          next: {
            href: '/docs/api-reference/functions/define-config',
            label: 'defineConfig',
          },
        }),
      ],
    })
  );
}
function r(l = {}) {
  const { wrapper: s } = l.components || {};
  return s ? e.jsx(s, { ...l, children: e.jsx(a, { ...l }) }) : a(l);
}
function o(l, s) {
  throw new Error(
    'Expected ' +
      (s ? 'component' : 'object') +
      ' `' +
      l +
      '` to be defined: you likely forgot to import, pass, or provide it.'
  );
}
const c = {
    path: '/scroll-restoration',
    metadata: {
      title: 'ScrollRestoration - Components | API Reference | Rasengan.js',
      description:
        'ScrollRestoration is a special component that is used to restore the scroll position of the current page.',
    },
  },
  i = [
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
      children: [
        {
          title: '`alwaysToTop`',
          anchor: { id: '`alwaystotop`', text: '`alwaysToTop`' },
          level: 3,
        },
        {
          title: '`target`',
          anchor: { id: '`target`', text: '`target`' },
          level: 3,
        },
      ],
    },
  ];
r.metadata = c;
r.toc = i;
r.type = 'MDXPageComponent';
export { r as default };
