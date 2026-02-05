import { j as e } from './vendor-CfbgIbdB.js';
import { P as a } from './shared-components-CkrC6jAk.js';
function r(n) {
  const s = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    li: 'li',
    ol: 'ol',
    p: 'p',
    pre: 'pre',
    span: 'span',
    strong: 'strong',
    ul: 'ul',
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
      e.jsx(s.h1, { children: 'Server-side Rendering (SSR)' }),
      `
`,
      e.jsx(s.h2, { children: 'What is Server-Side Rendering?' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Server-Side Rendering (',
          e.jsx(s.code, { children: 'SSR' }),
          ') is a rendering technique where pages are pre-rendered on the server and sent as fully formed HTML to the client. This approach offers several benefits:',
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
              e.jsx(s.strong, { children: 'Better SEO' }),
              ' – Since the content is rendered before being sent, search engines can easily index it.',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'Faster Initial Load' }),
              ' – Users receive a ready-to-display page without waiting for JavaScript execution.',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'Always Up-to-Date Content' }),
              ' – The data is fetched and processed on each request.',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(s.p, {
        children:
          'However, SSR also introduces some trade-offs, such as increased server load and potential latency depending on data-fetching times.',
      }),
      `
`,
      e.jsx(s.h2, { children: 'How SSR Works in Rasengan.js' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          `Rasengan.js supports SSR by default for all pages. When a user visits a page, the server fetches the necessary data and renders the page on the server, sending the fully rendered HTML to the client.
This behavior can be disabled by setting `,
          e.jsx(s.strong, {
            children: e.jsx(s.code, { children: 'ssr: false' }),
          }),
          ' in the ',
          e.jsx(s.code, { children: 'rasengan.config.js' }),
          ' file.',
        ],
      }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'js',
            'data-theme': 'github-dark-dimmed',
            children: 'rasengan.config.js',
          }),
          e.jsx(s.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'js',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(s.code, {
              'data-line-numbers': '',
              'data-language': 'js',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              'data-line-numbers-max-digits': '1',
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
                      children: ' { defineConfig } ',
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
                      style: { color: '#DCBDFB' },
                      children: ' defineConfig',
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
                  'data-highlighted-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '  ssr: ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: 'true',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ', ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#768390' },
                      children: '// default value is set to true',
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
                      children: '})',
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
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Rasengan.js allows you to use SSR with the ',
          e.jsx(s.code, { children: 'loader' }),
          ' function inside your page component. This function runs on the ',
          e.jsx(s.code, { children: 'server' }),
          ' and fetches data before rendering the page.',
        ],
      }),
      `
`,
      e.jsx(s.h3, { children: 'Example: Fetching Data with loader' }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'profile.page.tsx',
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
                      children: ' { PageComponent } ',
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
                      children: ' Post',
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
                      children: '  id',
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
                      children: '  title',
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
                      children: '  content',
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
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '}',
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
                      children: 'const',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: ' Posts',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ' PageComponent',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '<{ ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'posts',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ' Post',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '[] }> ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ({ ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'posts',
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
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: '      {',
                  }),
                }),
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '        posts.',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: 'map',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'post',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' =>',
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
                      children: '          <',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' key',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'post.id',
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
                      children: '            <',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#8DDB8C' },
                      children: 'h2',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '{',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'post.title',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '</',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#8DDB8C' },
                      children: 'h2',
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
                      children: '            <',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#8DDB8C' },
                      children: 'p',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '{',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'post.content',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '</',
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
                      children: '          </',
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
                    children: '        ))',
                  }),
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: '      }',
                  }),
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
                      children: 'Posts.path ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "/posts"',
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
                      style: { color: '#ADBAC7' },
                      children: 'Posts.metadata ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '=',
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
                      style: { color: '#ADBAC7' },
                      children: '  title: ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '"Posts"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
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
                      children: '  description: ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '"Explore our posts"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ',',
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
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#768390' },
                    children:
                      '// Fetch posts data on the server before rendering the page',
                  }),
                }),
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'Posts.',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: 'loader',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' async',
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
                  'data-highlighted-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '  const',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' posts',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' await',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: ' fetch',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '`https://api.example.com/posts`',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ').',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: 'then',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'res',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' =>',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' res.',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: 'json',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '());',
                    }),
                  ],
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: ' ',
                }),
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '  return',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { props: { posts } }; ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#768390' },
                      children:
                        '// Ensure the returned object contains `props`',
                    }),
                  ],
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
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
                      style: { color: '#ADBAC7' },
                      children: ' Posts;',
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
      e.jsx(s.h3, { children: 'How It Works' }),
      `
`,
      e.jsxs(s.ol, {
        children: [
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'Request Handling' }),
              ' – When a user visits ',
              e.jsx(s.code, { children: '/profile/123' }),
              ', Rasengan.js executes the ',
              e.jsx(s.code, { children: 'loader' }),
              ' function before rendering the page.',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'Data Fetching' }),
              ' – The ',
              e.jsx(s.code, { children: 'loader' }),
              ' function retrieves user data from an API using the ',
              e.jsx(s.code, { children: 'params.id' }),
              ' from the URL.',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'Server-Side Rendering' }),
              ' – The page is rendered on the server using the fetched data.',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'HTML Delivery' }),
              ' – The fully rendered HTML is sent to the client.',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'Hydration' }),
              ' – Once received, React attaches event listeners and makes the page interactive.',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Dynamic Routes with SSR' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'The ',
          e.jsx(s.code, { children: 'loader' }),
          ' function is especially useful for dynamic routes. You can use URL parameters to fetch the necessary data.',
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
            children: 'profile.page.tsx',
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
                      children: ' { PageComponent } ',
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
                      children: ' Profile',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ' PageComponent',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '<{ ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'user',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'name',
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
                      children: '; ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'email',
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
                      children: ' } }> ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ({ ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'user',
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
                      children: '>',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '{',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'user.name',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '</',
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
                      children: 'p',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '{',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'user.email',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '</',
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
                      children: 'Profile.path ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "/profile/:id"',
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
                      style: { color: '#ADBAC7' },
                      children: 'Profile.metadata ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '=',
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
                      style: { color: '#ADBAC7' },
                      children: '  title: ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '"User Profile"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
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
                      children: '  description: ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '"View user details"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ',',
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
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#768390' },
                    children:
                      '// Fetch user data on the server before rendering the page',
                  }),
                }),
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'Profile.',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: 'loader',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' async',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' ({ ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'params',
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
                      children: ' {',
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
                      style: { color: '#6CB6FF' },
                      children: ' user',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' await',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: ' fetch',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '`https://api.example.com/users/${',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'params',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '.',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'id',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '}`',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ').',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: 'then',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'res',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' =>',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' res.',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: 'json',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '());',
                    }),
                  ],
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: ' ',
                }),
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '  return',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { props: { user } }; ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#768390' },
                      children:
                        '// Ensure the returned object contains `props`',
                    }),
                  ],
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
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
                      style: { color: '#ADBAC7' },
                      children: ' Profile;',
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
      e.jsx(s.h2, { children: 'When to Use SSR' }),
      `
`,
      e.jsx(s.p, { children: '✅ Use SSR when:' }),
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsxs(s.li, {
            children: [
              'The page content ',
              e.jsx(s.strong, { children: 'needs to be updated' }),
              ' on each request.',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              'The page is ',
              e.jsx(s.strong, { children: 'SEO-sensitive' }),
              ' and must be indexed correctly.',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              'The data is ',
              e.jsx(s.strong, {
                children: 'dynamic and cannot be pre-generated',
              }),
              '.',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(s.p, { children: '❌ Avoid SSR when:' }),
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsxs(s.li, {
            children: [
              'The content ',
              e.jsx(s.strong, { children: 'doesn’t change often' }),
              ' (use Static Site Generation instead).',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              'The page contains ',
              e.jsx(s.strong, { children: 'highly interactive elements' }),
              ' that don’t require fresh data on load.',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(a, {
        prev: { href: '/docs/routing/redirecting', label: 'Redirecting' },
        next: { href: '/docs/rendering/csr', label: 'Client-Side Rendering' },
      }),
    ],
  });
}
function l(n = {}) {
  const { wrapper: s } = n.components || {};
  return s ? e.jsx(s, { ...n, children: e.jsx(r, { ...n }) }) : r(n);
}
const c = {
    path: '/ssr',
    metadata: {
      title: 'Server-side Rendering - Rendering | Core concepts | Rasengan.js',
      description:
        'Learn about Server-Side Rendering (SSR) in Rasengan.js, a React framework for building web applications.',
    },
  },
  i = [
    {
      title: 'What is Server-Side Rendering?',
      anchor: {
        id: 'what-is-server-side-rendering?',
        text: 'What is Server-Side Rendering?',
      },
      level: 2,
      children: [],
    },
    {
      title: 'How SSR Works in Rasengan.js',
      anchor: {
        id: 'how-ssr-works-in-rasengan.js',
        text: 'How SSR Works in Rasengan.js',
      },
      level: 2,
      children: [
        {
          title: 'Example: Fetching Data with loader',
          anchor: {
            id: 'example:-fetching-data-with-loader',
            text: 'Example: Fetching Data with loader',
          },
          level: 3,
        },
        {
          title: 'How It Works',
          anchor: { id: 'how-it-works', text: 'How It Works' },
          level: 3,
        },
      ],
    },
    {
      title: 'Dynamic Routes with SSR',
      anchor: {
        id: 'dynamic-routes-with-ssr',
        text: 'Dynamic Routes with SSR',
      },
      level: 2,
      children: [],
    },
    {
      title: 'When to Use SSR',
      anchor: { id: 'when-to-use-ssr', text: 'When to Use SSR' },
      level: 2,
      children: [],
    },
  ];
l.metadata = c;
l.toc = i;
l.type = 'MDXPageComponent';
export { l as default };
