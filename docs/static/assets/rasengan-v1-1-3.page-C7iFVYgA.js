import { j as e, C as r } from './vendor-w5t4XTd4.js';
import { k as i, a as t } from './shared-components-DBceyN8p.js';
function o(s) {
  const n = {
    a: 'a',
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h2: 'h2',
    h3: 'h3',
    li: 'li',
    mark: 'mark',
    p: 'p',
    pre: 'pre',
    span: 'span',
    strong: 'strong',
    ul: 'ul',
    ...s.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx(i, {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          e.jsx(n.code, { children: 'Rasengan v1.1.3' }),
          ' is now available on ',
          e.jsx(n.a, {
            href: 'https://www.npmjs.com/package/rasengan',
            children: 'npm',
          }),
          '.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsx(n.p, {
        children:
          'In this post, we will talk about the new features of Rasengan v1.1.3 and how you can adopt them into your projects.',
      }),
      `
`,
      e.jsx(n.p, {
        children: 'For a list of breaking changes, see the Change log.',
      }),
      `
`,
      e.jsx(n.h2, { children: "What's new in Rasengan v1.1.3?" }),
      `
`,
      e.jsxs(n.h3, {
        children: [
          'Introduction of ',
          e.jsx(n.code, { children: 'ScrollRestoration' }),
          ' component',
        ],
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Rasengan v1.1.3 introduces you the ',
          e.jsx(r, {
            to: '/docs/api-reference/components/scroll-restoration',
            children: e.jsx(n.strong, { children: 'ScrollRestoration' }),
          }),
          ' component. It is a special component that is used to restore the scroll position of the current page.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          'To use this feature, you have to put the ',
          e.jsx(n.code, { children: '<ScrollRestoration />' }),
          ' component where you want to restore the scroll position, generally in your root layout.',
        ],
      }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'src/app/app.layout.tsx',
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
                      children: ' { LayoutComponent, Outlet, ',
                    }),
                    e.jsx(n.mark, {
                      'data-highlighted-chars': '',
                      children: e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: 'ScrollRestoration',
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
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '    <>',
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
                      children: '      <',
                    }),
                    e.jsx(n.mark, {
                      'data-highlighted-chars': '',
                      children: e.jsx(n.span, {
                        style: { color: '#8DDB8C' },
                        children: 'ScrollRestoration',
                      }),
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
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '    </>',
                  }),
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '  );',
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
              ],
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(t, {
        status: 'info',
        title: 'Learn more about the ScrollRestoration Component',
        link: '/docs/api-reference/components/scroll-restoration',
      }),
      `
`,
      e.jsxs(n.h3, {
        children: [
          'Logs update into ',
          e.jsx(n.code, { children: '@rasenganjs/serve' }),
          ' package',
        ],
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'When hosting your application on production or just trying to preview your application in a production environment, you have to use the ',
          e.jsx(n.code, { children: '@rasenganjs/serve' }),
          ' adapter package.',
        ],
      }),
      `
`,
      e.jsx(n.p, {
        children:
          'This package is a simple and fast way to deploy your application on a private server (VPS).',
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          'This new release also updates the ',
          e.jsx(n.code, { children: '@rasenganjs/serve' }),
          ' package to the latest version, by adding some new features and fixing some bugs.',
        ],
      }),
      `
`,
      e.jsxs(n.ul, {
        children: [
          `
`,
          e.jsxs(n.li, {
            children: [
              'Added ',
              e.jsx(n.code, { children: '--port' }),
              ' option to specify the port on which the server will run',
            ],
          }),
          `
`,
          e.jsxs(n.li, {
            children: [
              'Enhanced the ',
              e.jsx(n.code, { children: 'logs' }),
              ' to be more readable and identifiable by adding timestamps for each log',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(t, {
        status: 'info',
        title: 'Learn more about the @rasenganjs/serve package',
        link: '/packages/serve#custom-port',
      }),
      `
`,
      e.jsxs(n.h3, {
        children: [
          'Fixing bugs into ',
          e.jsx(n.code, { children: 'rasengan' }),
          ' regarding ',
          e.jsx(n.code, { children: 'file-based routing' }),
        ],
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'This new release also fixes some bugs into ',
          e.jsx(n.code, { children: 'rasengan' }),
          ' regarding ',
          e.jsx(n.code, { children: 'file-based routing' }),
          '.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Learn more about ',
          e.jsx(n.a, {
            href: '/docs/getting-started/introduction',
            children: 'Rasengan.js documentation',
          }),
          ' and have fun Ninja!',
        ],
      }),
    ],
  });
}
function a(s = {}) {
  const { wrapper: n } = s.components || {};
  return n ? e.jsx(n, { ...s, children: e.jsx(o, { ...s }) }) : o(s);
}
const l = {
    path: '/rasengan-v1-1-3',
    metadata: {
      title: 'Rasengan v1.1.3',
      description:
        'We are publishing Rasengan v1.1.3, a new version of the framework that introduces you the ScrollRestoration component.',
      openGraph: {
        title: 'Rasengan v1.1.3',
        description:
          'We are publishing Rasengan v1.1.3, a new version of the framework that introduces you the ScrollRestoration component.',
        url: 'https://rasengan.dev',
        image: 'https://rasengan.dev/assets/blog/rasengan-1.1.3.png',
      },
      twitter: {
        title: 'Rasengan v1.1.3',
        description:
          'We are publishing Rasengan v1.1.3, a new version of the framework that introduces you the ScrollRestoration component.',
        image: 'https://rasengan.dev/assets/blog/rasengan-1.1.3.png',
      },
    },
  },
  c = void 0;
a.metadata = l;
a.toc = c;
a.type = 'MDXPageComponent';
export { a as default };
