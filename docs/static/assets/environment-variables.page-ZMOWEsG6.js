import { j as e } from './vendor-w5t4XTd4.js';
import { P as i } from './shared-components-DBceyN8p.js';
function t(a) {
  const n = {
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
    ...a.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        children: e.jsx(n.p, { children: 'CORE CONCEPTS' }),
      }),
      `
`,
      e.jsx(n.h1, { children: 'Environment Variables' }),
      `
`,
      e.jsx(n.p, {
        children:
          'Rasengan.js comes with built-in support for environment variables, which allows you to do the following:',
      }),
      `
`,
      e.jsxs(n.ul, {
        children: [
          `
`,
          e.jsxs(n.li, {
            children: [
              'Use ',
              e.jsx(n.code, { children: '.env' }),
              ' to load environment variables',
            ],
          }),
          `
`,
          e.jsxs(n.li, {
            children: [
              'Bundle environment variables for the browser by prefixing with ',
              e.jsx(n.code, { children: 'RASENGAN_' }),
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'Load Environment Variables' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Rasengan.js has built-in support for loading environment variables from ',
          e.jsx(n.code, { children: '.env' }),
          ' into ',
          e.jsx(n.code, { children: 'import.meta.env' }),
          '.',
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
            children: '.env',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'txt',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(n.code, {
              'data-line-numbers': '',
              'data-language': 'txt',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              'data-line-numbers-max-digits': '1',
              children: [
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    children: 'RASENGAN_API_URL=https://api.example.com',
                  }),
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    children: 'RASENGAN_API_KEY=abc123',
                  }),
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, { children: 'RASENGAN_PORT=3000' }),
                }),
              ],
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'Access to Environment Variables' }),
      `
`,
      e.jsx(n.p, {
        children:
          'Using environment variables in your application is easy. You can access them like follow:',
      }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'js',
            'data-theme': 'github-dark-dimmed',
            children: 'src/app/home.page.js',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'js',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(n.code, {
              'data-line-numbers': '',
              'data-language': 'js',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              'data-line-numbers-max-digits': '1',
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
                      children: '.',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: 'meta',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '.env.',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: 'RASENGAN_API_URL',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '; ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#768390' },
                      children: "// 'https://api.example.com'",
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
                      children: 'import',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '.',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: 'meta',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '.env.',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: 'RASENGAN_API_KEY',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '; ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#768390' },
                      children: "// 'abc123'",
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
                      children: 'import',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '.',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: 'meta',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '.env.',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: 'RASENGAN_PORT',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '; ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#768390' },
                      children: "// '3000'",
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
      `
`,
      e.jsx(i, {
        prev: { href: '/docs/configuring/typescript', label: 'TypeScript' },
        next: {
          href: '/docs/configuring/modules-aliases',
          label: 'Modules Aliases',
        },
      }),
    ],
  });
}
function s(a = {}) {
  const { wrapper: n } = a.components || {};
  return n ? e.jsx(n, { ...a, children: e.jsx(t, { ...a }) }) : t(a);
}
const r = {
    path: '/environment-variables',
    metadata: {
      title:
        'Environment Variables - Configuring | Core concepts | Rasengan.js',
      description: 'Environment Variables in Rasengan.js',
    },
  },
  l = [
    {
      title: 'Load Environment Variables',
      anchor: {
        id: 'load-environment-variables',
        text: 'Load Environment Variables',
      },
      level: 2,
      children: [],
    },
    {
      title: 'Access to Environment Variables',
      anchor: {
        id: 'access-to-environment-variables',
        text: 'Access to Environment Variables',
      },
      level: 2,
      children: [],
    },
  ];
s.metadata = r;
s.toc = l;
s.type = 'MDXPageComponent';
export { s as default };
