import { j as e, C as l } from './vendor-CfbgIbdB.js';
import { P as t } from './shared-components-CkrC6jAk.js';
function r(a) {
  const s = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    pre: 'pre',
    span: 'span',
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
      e.jsx(s.h1, { children: 'Optimizing Images' }),
      `
`,
      e.jsx(s.p, {
        children: `Images are the most important part of a website. They are the first thing that a user sees when they visit a website.
So, it is important to optimize images to make the website load faster.`,
      }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Rasengan.js provides an external package called ',
          e.jsx(l, {
            to: '/packages/image',
            children: e.jsx(s.code, { children: '@rasenganjs/image' }),
          }),
          ` to display images on the website with a lazy loading feature.
The package doesn't compress images but it loads them only when they are in the viewport.`,
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Installation' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'By default, when using the ',
          e.jsx(l, {
            to: '/docs/api-reference/create-rasengan-cli',
            children: e.jsx(s.code, { children: 'Rasengan CLI' }),
          }),
          ' to create a new project, the ',
          e.jsx(s.code, { children: '@rasenganjs/image' }),
          ' package is already installed.',
        ],
      }),
      `
`,
      e.jsx(s.p, {
        children:
          'If not, you can install it by running the following command:',
      }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: 'Terminal',
          }),
          e.jsx(s.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: e.jsx(s.code, {
              'data-language': 'bash',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#F69D50' },
                    children: 'npm',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' install',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' @rasenganjs/image',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Usage' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'First of all, you have to import the ',
          e.jsx(s.code, { children: 'css' }),
          ' file in your project. You can do this by adding the following line in your ',
          e.jsx(s.code, { children: 'main.js' }),
          ' file:',
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
            children: 'main.js',
          }),
          e.jsx(s.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'js',
            'data-theme': 'github-dark-dimmed',
            children: e.jsx(s.code, {
              'data-line-numbers': '',
              'data-language': 'js',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              'data-line-numbers-max-digits': '1',
              children: e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: 'import',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' "@rasenganjs/image/css"',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: ';' }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Then, you can use the ',
          e.jsx(s.code, { children: 'Image' }),
          ' component to display images on your website.',
        ],
      }),
      `
`,
      e.jsx(s.h3, { children: 'Local Image' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'This package supports local images. You can import the image and pass it as a ',
          e.jsx(s.code, { children: 'src' }),
          ' prop to the ',
          e.jsx(s.code, { children: 'Image' }),
          ` component.
file extensions like `,
          e.jsx(s.code, { children: '.jpg' }),
          ', ',
          e.jsx(s.code, { children: '.jpeg' }),
          ', ',
          e.jsx(s.code, { children: '.png' }),
          ', ',
          e.jsx(s.code, { children: '.gif' }),
          ', ',
          e.jsx(s.code, { children: '.webp' }),
          ', ',
          e.jsx(s.code, { children: '.svg' }),
          ' are supported.',
        ],
      }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'jsx',
            'data-theme': 'github-dark-dimmed',
            children: 'Avatar.jsx',
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
                      children: ' React ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "react"',
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
                      children: ' Image ',
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
                e.jsxs(s.span, {
                  'data-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' avatar ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "@assets/images/avatar.jpg"',
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
                      children: ' Avatar',
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
                      style: { color: '#ADBAC7' },
                      children: 'avatar',
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
                      children: '=',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '"Avatar"',
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
                      children: '200',
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
                      children: '200',
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
      e.jsx(s.h3, { children: 'External Image' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'You can also use external images by passing an object with an ',
          e.jsx(s.code, { children: 'uri' }),
          ' property as a ',
          e.jsx(s.code, { children: 'src' }),
          ' prop to the ',
          e.jsx(s.code, { children: 'Image' }),
          ' component.',
        ],
      }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'jsx',
            'data-theme': 'github-dark-dimmed',
            children: 'Avatar.jsx',
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
                      children: ' React ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "react"',
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
                      children: ' Image ',
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
                      children: ' default',
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
                      children: 'Image',
                    }),
                  ],
                }),
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: '      src',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '{ uri: ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '"https://example.com/avatar.jpg"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' }',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                  ],
                }),
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: '      alt',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '"Avatar"',
                    }),
                  ],
                }),
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: '      width',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: '200',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                  ],
                }),
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: '      height',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: '200',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                  ],
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '    />',
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
          href: '/docs/styling/preprocessors',
          label: 'CSS Preprocessors',
        },
        next: { href: '/docs/optimizing/metadata', label: 'Metadata' },
      }),
    ],
  });
}
function n(a = {}) {
  const { wrapper: s } = a.components || {};
  return s ? e.jsx(s, { ...a, children: e.jsx(r, { ...a }) }) : r(a);
}
const i = {
    path: '/images',
    metadata: {
      title: 'Optimizing Images - Optimizing | Core concepts | Rasengan.js',
      description: 'Optimizing images to make the website load faster.',
    },
  },
  c = [
    {
      title: 'Installation',
      anchor: { id: 'installation', text: 'Installation' },
      level: 2,
      children: [],
    },
    {
      title: 'Usage',
      anchor: { id: 'usage', text: 'Usage' },
      level: 2,
      children: [
        {
          title: 'Local Image',
          anchor: { id: 'local-image', text: 'Local Image' },
          level: 3,
        },
        {
          title: 'External Image',
          anchor: { id: 'external-image', text: 'External Image' },
          level: 3,
        },
      ],
    },
  ];
n.metadata = i;
n.toc = c;
n.type = 'MDXPageComponent';
export { n as default };
