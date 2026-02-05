import { j as e } from './vendor-CfbgIbdB.js';
import { T as s, P as d } from './shared-components-CkrC6jAk.js';
function i(l) {
  const n = {
    a: 'a',
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    li: 'li',
    p: 'p',
    pre: 'pre',
    span: 'span',
    table: 'table',
    tbody: 'tbody',
    td: 'td',
    th: 'th',
    thead: 'thead',
    tr: 'tr',
    ul: 'ul',
    ...l.components,
  };
  return (
    s || t('Tabs', !1),
    s.Item || t('Tabs.Item', !0),
    e.jsxs(e.Fragment, {
      children: [
        e.jsx('span', {
          className: 'text-[12px] font-mono-regular text-foreground/60',
          children: e.jsx(n.p, { children: 'CORE CONCEPTS' }),
        }),
        `
`,
        e.jsx(n.h1, { children: 'Metadata' }),
        `
`,
        e.jsxs(n.p, {
          children: [
            'Rasengan.js has a Metadata API that can be used to define your application metadata (e.g. ',
            e.jsx(n.code, { children: 'meta' }),
            ' and ',
            e.jsx(n.code, { children: 'link' }),
            ' tags inside your HTML ',
            e.jsx(n.code, { children: 'head' }),
            ' element) for improved SEO and web shareability.',
          ],
        }),
        `
`,
        e.jsx(n.h2, { children: 'Usage' }),
        `
`,
        e.jsx(n.p, { children: 'There is two  ways to use the Metadata API:' }),
        `
`,
        e.jsxs(n.ul, {
          children: [
            `
`,
            e.jsxs(n.li, {
              children: [
                'Using ',
                e.jsx(n.a, {
                  href: '#using-static-metadata',
                  children: e.jsx(n.code, { children: 'static' }),
                }),
                ' metadata',
              ],
            }),
            `
`,
            e.jsxs(n.li, {
              children: [
                'Using ',
                e.jsx(n.a, {
                  href: '#using-dynamic-metadata',
                  children: e.jsx(n.code, { children: 'dynamic' }),
                }),
                ' metadata',
              ],
            }),
            `
`,
          ],
        }),
        `
`,
        e.jsx(n.h3, { children: 'Using static metadata' }),
        `
`,
        e.jsxs(s, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            e.jsx(s.Item, {
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
                              children: ' { Metadata, PageComponent } ',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: 'const',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#6CB6FF' },
                              children: ' metadata',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ' Metadata',
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
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children: '  // Title of the page',
                          }),
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
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
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: ' ',
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children: '  // Description of the page',
                          }),
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '  description: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"Home page"',
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
                          'data-highlighted-line': '',
                          children: ' ',
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children:
                              '  // Defines the meta tags to be added to the head element',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children:
                              '  // (e.g. <meta name="viewport" content="width=device-width, initial-scale=1.0">)',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  metaTags: [{',
                          }),
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    name: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"viewport"',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    content: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children:
                                '"width=device-width, initial-scale=1.0"',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  }],',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: ' ',
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children:
                              '  // Defines the link tags to be added to the head element',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children:
                              '  // (e.g. <link rel="icon" href="/favicon.ico">)',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  links: [{',
                          }),
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    rel: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"icon"',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    href: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"/favicon.ico"',
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
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  }],',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: ' ',
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children:
                              '  // Used for link previews on social media',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  openGraph: {',
                          }),
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    title: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"Rasengan.js"',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    description: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"Rasengan"',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    image: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"https://example.com/image.jpg"',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    url: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"https://example.com"',
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
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  },',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: ' ',
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children: '  // Used for Twitter link previews',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  twitter: {',
                          }),
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    title: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"Rasengan.js"',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    description: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"Rasengan.js"',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    image: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"https://example.com/image.jpg"',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    card: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"summary_large_image"',
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
                            children: '  },',
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
                              style: { color: '#F47067' },
                              children: 'const',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#DCBDFB' },
                              children: ' HomePage',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ' PageComponent',
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
                              children: 'section',
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
                              children: 'section',
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
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: ' ',
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: 'HomePage.path ',
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
                              children: 'HomePage.metadata ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' metadata;',
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
                              children: ' HomePage;',
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
            e.jsx(s.Item, {
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: 'const',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#6CB6FF' },
                              children: ' metadata',
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
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children: '  // Title of the page',
                          }),
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
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
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: ' ',
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children: '  // Description of the page',
                          }),
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '  description: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"Home page"',
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
                          'data-highlighted-line': '',
                          children: ' ',
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children:
                              '  // Defines the meta tags to be added to the head element',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children:
                              '  // (e.g. <meta name="viewport" content="width=device-width, initial-scale=1.0">)',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  metaTags: [{',
                          }),
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    name: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"viewport"',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    content: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children:
                                '"width=device-width, initial-scale=1.0"',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  }],',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: ' ',
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children:
                              '  // Defines the link tags to be added to the head element',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children:
                              '  // (e.g. <link rel="icon" href="/favicon.ico">)',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  links: [{',
                          }),
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    rel: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"icon"',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    href: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"/favicon.ico"',
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
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  }],',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: ' ',
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children:
                              '  // Used for link previews on social media',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  openGraph: {',
                          }),
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    title: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"Rasengan.js"',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    description: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"Rasengan.js"',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    image: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"https://example.com/image.jpg"',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    url: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"https://example.com"',
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
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  },',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: ' ',
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children: '  // Used for Twitter link previews',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  twitter: {',
                          }),
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    title: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"Rasengan.js"',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    description: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"Rasengan.js"',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    image: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"https://example.com/image.jpg"',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: '    card: ',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#96D0FF' },
                              children: '"summary_large_image"',
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
                            children: '  },',
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
                              children: 'section',
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
                              children: 'section',
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
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: ' ',
                        }),
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
                              children: ' metadata;',
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
        e.jsx(n.h3, { children: 'Using dynamic metadata' }),
        `
`,
        e.jsxs(n.p, {
          children: [
            'To use dynamic metadata, you have to rely on ',
            e.jsx(n.code, { children: 'loader' }),
            ' functions.',
          ],
        }),
        `
`,
        e.jsxs(s, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            e.jsx(s.Item, {
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
                              children: ' { Metadata, PageComponent } ',
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
                              children: ' PageComponent',
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
                              children: 'section',
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
                              children: 'section',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: 'Home.',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#DCBDFB' },
                              children: 'loader',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ' =',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ' async',
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
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children:
                              '  // You can fetch data from an API or a database here',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: ' ',
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: '  const',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#6CB6FF' },
                              children: ' metadata',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F69D50' },
                              children: ' Metadata',
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
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children: '    /* Your metaadata here */',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  }',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: ' ',
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: '  return',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '    meta: metadata,',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  }',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
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
            e.jsx(s.Item, {
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
                              children: 'section',
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
                              children: 'section',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: 'Home.',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#DCBDFB' },
                              children: 'loader',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ' =',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: ' async',
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
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children:
                              '  // You can fetch data from an API or a database here',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: ' ',
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: '  const',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#6CB6FF' },
                              children: ' metadata',
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
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#768390' },
                            children: '    /* Your metaadata here */',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  }',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: ' ',
                        }),
                        `
`,
                        e.jsxs(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(n.span, {
                              style: { color: '#F47067' },
                              children: '  return',
                            }),
                            e.jsx(n.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '    meta: metadata,',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: e.jsx(n.span, {
                            style: { color: '#ADBAC7' },
                            children: '  }',
                          }),
                        }),
                        `
`,
                        e.jsx(n.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
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
            'The ',
            e.jsx(n.code, { children: 'loader' }),
            ' function must return an object with a ',
            e.jsx(n.code, { children: 'meta' }),
            ' property. The ',
            e.jsx(n.code, { children: 'meta' }),
            ' property must be an object that contains the metadata to be added to the page. ',
            e.jsx('br', {}),
          ],
        }),
        `
`,
        e.jsxs(n.p, {
          children: [
            'You can decide to mix ',
            e.jsx(n.code, { children: 'static' }),
            ' and ',
            e.jsx(n.code, { children: 'dynamic' }),
            ' metadata, but the dynamic metadata has the highest priority.',
          ],
        }),
        `
`,
        e.jsx(n.h2, { children: 'API' }),
        `
`,
        e.jsx(n.h3, {
          children:
            'Metadata.title and Metadata.description [#title_description]',
        }),
        `
`,
        e.jsxs(n.table, {
          children: [
            e.jsx(n.thead, {
              children: e.jsxs(n.tr, {
                children: [
                  e.jsx(n.th, { children: 'Property' }),
                  e.jsx(n.th, { children: 'Type' }),
                  e.jsx(n.th, { children: 'Description' }),
                  e.jsx(n.th, { children: 'Optional' }),
                  e.jsx(n.th, { children: 'Default' }),
                ],
              }),
            }),
            e.jsxs(n.tbody, {
              children: [
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'title' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'string' }),
                    }),
                    e.jsx(n.td, { children: 'The title of the page' }),
                    e.jsx(n.td, { children: 'true' }),
                    e.jsx(n.td, { children: 'Name of the page component' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'description' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'string' }),
                    }),
                    e.jsx(n.td, { children: 'The description of the page' }),
                    e.jsx(n.td, { children: 'true' }),
                    e.jsx(n.td, { children: '-' }),
                  ],
                }),
              ],
            }),
          ],
        }),
        `
`,
        e.jsx(n.h3, { children: 'Metadata.metaTags [#tags]' }),
        `
`,
        e.jsx(n.p, {
          children: 'An array of meta tags to be added to the head element.',
        }),
        `
`,
        e.jsxs(n.table, {
          children: [
            e.jsx(n.thead, {
              children: e.jsxs(n.tr, {
                children: [
                  e.jsx(n.th, { children: 'Property' }),
                  e.jsx(n.th, { children: 'Type' }),
                  e.jsx(n.th, { children: 'Description' }),
                  e.jsx(n.th, { children: 'Optional' }),
                ],
              }),
            }),
            e.jsxs(n.tbody, {
              children: [
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'name' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'string' }),
                    }),
                    e.jsx(n.td, { children: 'The name of the meta tag.' }),
                    e.jsx(n.td, { children: 'true' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'property' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'string' }),
                    }),
                    e.jsxs(n.td, {
                      children: [
                        'The property of the meta tag. Can replace the ',
                        e.jsx(n.code, { children: 'name' }),
                        ' property sometimes',
                      ],
                    }),
                    e.jsx(n.td, { children: 'true' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'content' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'string' }),
                    }),
                    e.jsx(n.td, { children: 'The content of the meta tag.' }),
                    e.jsx(n.td, { children: 'false' }),
                  ],
                }),
              ],
            }),
          ],
        }),
        `
`,
        `
`,
        e.jsx(n.h3, { children: 'Metadata.links [#links]' }),
        `
`,
        e.jsx(n.p, {
          children: 'An array of link tags to be added to the head element.',
        }),
        `
`,
        e.jsxs(n.table, {
          children: [
            e.jsx(n.thead, {
              children: e.jsxs(n.tr, {
                children: [
                  e.jsx(n.th, { children: 'Property' }),
                  e.jsx(n.th, { children: 'Type' }),
                  e.jsx(n.th, { children: 'Description' }),
                  e.jsx(n.th, { children: 'Default' }),
                  e.jsx(n.th, { children: 'Optional' }),
                ],
              }),
            }),
            e.jsxs(n.tbody, {
              children: [
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'rel' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'string' }),
                    }),
                    e.jsx(n.td, {
                      children: 'The relationship of the link tag.',
                    }),
                    e.jsx(n.td, { children: '"icon"' }),
                    e.jsx(n.td, { children: 'false' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'href' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'string' }),
                    }),
                    e.jsx(n.td, { children: 'The href of the link tag.' }),
                    e.jsx(n.td, { children: '-' }),
                    e.jsx(n.td, { children: 'false' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'type' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'string' }),
                    }),
                    e.jsx(n.td, { children: 'The type of the link tag.' }),
                    e.jsx(n.td, { children: '"image/png"' }),
                    e.jsx(n.td, { children: 'true' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'sizes' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'string' }),
                    }),
                    e.jsx(n.td, { children: 'The sizes of the link tag.' }),
                    e.jsx(n.td, { children: '"32x32"' }),
                    e.jsx(n.td, { children: 'true' }),
                  ],
                }),
              ],
            }),
          ],
        }),
        `
`,
        `
`,
        e.jsx(n.h3, { children: 'Metadata.openGraph [#openGraph]' }),
        `
`,
        e.jsx(n.p, {
          children:
            'An object containing the Open Graph metadata for link previews on social media.',
        }),
        `
`,
        e.jsxs(n.table, {
          children: [
            e.jsx(n.thead, {
              children: e.jsxs(n.tr, {
                children: [
                  e.jsx(n.th, { children: 'Property' }),
                  e.jsx(n.th, { children: 'Type' }),
                  e.jsx(n.th, { children: 'Description' }),
                  e.jsx(n.th, { children: 'Default' }),
                  e.jsx(n.th, { children: 'Optional' }),
                ],
              }),
            }),
            e.jsxs(n.tbody, {
              children: [
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'title' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'string' }),
                    }),
                    e.jsx(n.td, { children: 'The title of the link preview.' }),
                    e.jsx(n.td, { children: '-' }),
                    e.jsx(n.td, { children: 'false' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'description' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'string' }),
                    }),
                    e.jsx(n.td, {
                      children: 'The description of the link preview.',
                    }),
                    e.jsx(n.td, { children: '-' }),
                    e.jsx(n.td, { children: 'false' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'image' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'string' }),
                    }),
                    e.jsx(n.td, { children: 'The image of the link preview.' }),
                    e.jsx(n.td, { children: '-' }),
                    e.jsx(n.td, { children: 'true' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'url' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'string' }),
                    }),
                    e.jsx(n.td, { children: 'The URL of the link preview.' }),
                    e.jsx(n.td, { children: '-' }),
                    e.jsx(n.td, { children: 'true' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'type' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'string' }),
                    }),
                    e.jsx(n.td, { children: 'The type of the link preview.' }),
                    e.jsx(n.td, { children: '"website"' }),
                    e.jsx(n.td, { children: 'false' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'width' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'number' }),
                    }),
                    e.jsx(n.td, { children: 'The width of the image.' }),
                    e.jsx(n.td, { children: '-' }),
                    e.jsx(n.td, { children: 'false' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'height' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'number' }),
                    }),
                    e.jsx(n.td, { children: 'The height of the image.' }),
                    e.jsx(n.td, { children: '-' }),
                    e.jsx(n.td, { children: 'false' }),
                  ],
                }),
              ],
            }),
          ],
        }),
        `
`,
        `
`,
        e.jsx(n.h3, { children: 'Metadata.twitter [#twitter]' }),
        `
`,
        e.jsx(n.p, {
          children:
            'An object containing the Twitter metadata for link previews.',
        }),
        `
`,
        e.jsxs(n.table, {
          children: [
            e.jsx(n.thead, {
              children: e.jsxs(n.tr, {
                children: [
                  e.jsx(n.th, { children: 'Property' }),
                  e.jsx(n.th, { children: 'Type' }),
                  e.jsx(n.th, { children: 'Description' }),
                  e.jsx(n.th, { children: 'Default' }),
                  e.jsx(n.th, { children: 'Optional' }),
                ],
              }),
            }),
            e.jsxs(n.tbody, {
              children: [
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'title' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'string' }),
                    }),
                    e.jsx(n.td, { children: 'The title of the link preview.' }),
                    e.jsx(n.td, { children: '-' }),
                    e.jsx(n.td, { children: 'true' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'description' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'string' }),
                    }),
                    e.jsx(n.td, {
                      children: 'The description of the link preview.',
                    }),
                    e.jsx(n.td, { children: '-' }),
                    e.jsx(n.td, { children: 'false' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'image' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'string' }),
                    }),
                    e.jsx(n.td, { children: 'The image of the link preview.' }),
                    e.jsx(n.td, { children: '-' }),
                    e.jsx(n.td, { children: 'true' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'card' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'string' }),
                    }),
                    e.jsx(n.td, { children: 'The type of the link preview.' }),
                    e.jsx(n.td, { children: '"summary_large_image"' }),
                    e.jsx(n.td, { children: 'true' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'site' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'string' }),
                    }),
                    e.jsx(n.td, { children: 'The site of the link preview.' }),
                    e.jsx(n.td, { children: '-' }),
                    e.jsx(n.td, { children: 'false' }),
                  ],
                }),
                e.jsxs(n.tr, {
                  children: [
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'creator' }),
                    }),
                    e.jsx(n.td, {
                      children: e.jsx(n.code, { children: 'string' }),
                    }),
                    e.jsx(n.td, {
                      children: 'The creator of the link preview.',
                    }),
                    e.jsx(n.td, { children: '-' }),
                    e.jsx(n.td, { children: 'false' }),
                  ],
                }),
              ],
            }),
          ],
        }),
        `
`,
        e.jsx(d, {
          prev: { href: '/docs/optimizing/images', label: 'Optimizing Images' },
          next: {
            href: '/docs/optimizing/static-assets',
            label: 'Static Assets',
          },
        }),
      ],
    })
  );
}
function a(l = {}) {
  const { wrapper: n } = l.components || {};
  return n ? e.jsx(n, { ...l, children: e.jsx(i, { ...l }) }) : i(l);
}
function t(l, n) {
  throw new Error(
    'Expected ' +
      (n ? 'component' : 'object') +
      ' `' +
      l +
      '` to be defined: you likely forgot to import, pass, or provide it.'
  );
}
const r = {
    path: '/metadata',
    metadata: {
      title: 'Metadata - Optimizing | Core concepts | Rasengan.js',
      description:
        'Learn how to optimize your application with Metadata API in Rasengan.js',
    },
  },
  c = [
    {
      title: 'Usage',
      anchor: { id: 'usage', text: 'Usage' },
      level: 2,
      children: [
        {
          title: 'Using static metadata',
          anchor: {
            id: 'using-static-metadata',
            text: 'Using static metadata',
          },
          level: 3,
        },
        {
          title: 'Using dynamic metadata',
          anchor: {
            id: 'using-dynamic-metadata',
            text: 'Using dynamic metadata',
          },
          level: 3,
        },
      ],
    },
    {
      title: 'API',
      anchor: { id: 'api', text: 'API' },
      level: 2,
      children: [
        {
          title: 'Metadata.title and Metadata.description [#title_description]',
          anchor: {
            id: 'title_description',
            text: 'Metadata.title and Metadata.description',
          },
          level: 3,
        },
        {
          title: 'Metadata.metaTags [#tags]',
          anchor: { id: 'tags', text: 'Metadata.metaTags' },
          level: 3,
        },
        {
          title: 'Metadata.links [#links]',
          anchor: { id: 'links', text: 'Metadata.links' },
          level: 3,
        },
        {
          title: 'Metadata.openGraph [#openGraph]',
          anchor: { id: 'opengraph', text: 'Metadata.openGraph' },
          level: 3,
        },
        {
          title: 'Metadata.twitter [#twitter]',
          anchor: { id: 'twitter', text: 'Metadata.twitter' },
          level: 3,
        },
      ],
    },
  ];
a.metadata = r;
a.toc = c;
a.type = 'MDXPageComponent';
export { a as default };
