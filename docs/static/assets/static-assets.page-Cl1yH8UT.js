import { j as e } from './vendor-CfbgIbdB.js';
import { P as l } from './shared-components-CkrC6jAk.js';
function n(a) {
  const s = {
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
    strong: 'strong',
    ul: 'ul',
    ...a.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        children: e.jsx(s.p, { children: 'CORE CONCEPTS' }),
      }),
      `
`,
      e.jsx(s.h1, { children: 'Static Assets' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Rasengan.js allows you to serve static files like images, fonts, and other assets from a special folder called ',
          e.jsx(s.code, { children: 'public' }),
          '.',
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Using the public Folder' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Any file placed inside the ',
          e.jsx(s.code, { children: 'public' }),
          ' folder is automatically available at the base URL (',
          e.jsx(s.code, { children: '/' }),
          '). This means you don’t need to import assets manually or use special loaders—just reference them directly in your code.',
        ],
      }),
      `
`,
      e.jsx(s.h3, { children: 'Example' }),
      `
`,
      e.jsx(s.p, { children: 'If you have an image located at:' }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'txt',
          'data-theme': 'github-dark-dimmed',
          children: e.jsx(s.code, {
            'data-language': 'txt',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: e.jsx(s.span, {
              'data-line': '',
              children: e.jsx(s.span, { children: '/public/avatars/1.png' }),
            }),
          }),
        }),
      }),
      `
`,
      e.jsx(s.p, { children: 'You can access it in your browser at:' }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'txt',
          'data-theme': 'github-dark-dimmed',
          children: e.jsx(s.code, {
            'data-language': 'txt',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: e.jsx(s.span, {
              'data-line': '',
              children: e.jsx(s.span, { children: '/avatars/1.png' }),
            }),
          }),
        }),
      }),
      `
`,
      e.jsx(s.p, { children: 'And use it in your code like this:' }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'jsx',
            'data-theme': 'github-dark-dimmed',
            children: 'src/components/Avatar.jsx',
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
                      children: ' { Image } ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "@rasenganjs/image"',
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
                      children: ' function',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: ' Avatar',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '({ ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'id',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'alt',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' }) {',
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
                      children: ' <',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#8DDB8C' },
                      children: 'Image',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' src',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '`/avatars/${',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'id',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '}.png`',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' alt',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'alt',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' width',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: '64',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' height',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: '64',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' />;',
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
              ],
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Best Practices' }),
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsxs(s.strong, {
                children: [
                  'Store all static assets inside the ',
                  e.jsx(s.code, { children: 'public' }),
                  ' folder',
                ],
              }),
              ' to keep them easily accessible.',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsxs(s.strong, {
                children: [
                  'Use relative paths (',
                  e.jsx(s.code, { children: '/your-file.png' }),
                  ')',
                ],
              }),
              ' instead of importing images directly.',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'Optimize images' }),
              ' to reduce load times and improve performance.',
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
          'This feature makes it easy to serve assets without additional configuration! 🚀',
      }),
      `
`,
      e.jsx(l, {
        prev: { href: '/docs/optimizing/metadata', label: 'Metadata' },
        next: {
          href: '/docs/optimizing/react-compiler',
          label: 'React Compiler',
        },
      }),
    ],
  });
}
function t(a = {}) {
  const { wrapper: s } = a.components || {};
  return s ? e.jsx(s, { ...a, children: e.jsx(n, { ...a }) }) : n(a);
}
const r = {
    path: '/static-assets',
    metadata: {
      title: 'Static Assets - Optimizing | Core concepts | Rasengan.js',
      description: 'Adding static assets to your project',
    },
  },
  i = [
    {
      title: 'Using the public Folder',
      anchor: {
        id: 'using-the-public-folder',
        text: 'Using the public Folder',
      },
      level: 2,
      children: [
        {
          title: 'Example',
          anchor: { id: 'example', text: 'Example' },
          level: 3,
        },
      ],
    },
    {
      title: 'Best Practices',
      anchor: { id: 'best-practices', text: 'Best Practices' },
      level: 2,
      children: [],
    },
  ];
t.metadata = r;
t.toc = i;
t.type = 'MDXPageComponent';
export { t as default };
