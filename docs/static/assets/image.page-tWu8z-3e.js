import { j as e } from './vendor-w5t4XTd4.js';
import './shared-components-DBceyN8p.js';
function r(n) {
  const s = {
    a: 'a',
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    li: 'li',
    p: 'p',
    pre: 'pre',
    span: 'span',
    strong: 'strong',
    table: 'table',
    tbody: 'tbody',
    td: 'td',
    th: 'th',
    thead: 'thead',
    tr: 'tr',
    ul: 'ul',
    ...n.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        style: { fontSize: 12 },
        children: e.jsx(s.p, { children: 'PACKAGES' }),
      }),
      `
`,
      e.jsx(s.h1, { children: 'Rasengan Image' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'An utility component for handling images in Rasengan.js, offering ',
          e.jsx(s.strong, { children: 'lazy loading' }),
          ' with a smooth ',
          e.jsx(s.strong, { children: 'preview animation' }),
          ' to enhance user experience.',
        ],
      }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'By default, images load ',
          e.jsx(s.strong, {
            children: 'only when they appear in the viewport',
          }),
          ', and a preview animation is shown while the image is loading. You can customize this behavior as needed.',
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
          e.jsx(s.a, {
            href: '/docs/api-reference/create-rasengan',
            children: e.jsx(s.code, { children: 'create-rasengan CLI' }),
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
      e.jsx(s.h3, { children: 'Import the CSS file' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Before using the ',
          e.jsx(s.code, { children: 'Image' }),
          ' component, import the necessary styles in your ',
          e.jsx(s.code, { children: 'main.ts' }),
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
            children: 'main.ts',
          }),
          e.jsx(s.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'js',
            'data-theme': 'github-dark-dimmed',
            children: e.jsx(s.code, {
              'data-language': 'js',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
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
      e.jsx(s.h3, { children: 'Displaying Images' }),
      `
`,
      e.jsx(s.h4, { children: 'Local Image' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'The package supports local images. You can import an image and pass it as the ',
          e.jsx(s.code, { children: 'src' }),
          ' prop. Supported file extensions: ',
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
            'data-language': 'jsx',
            'data-theme': 'github-dark-dimmed',
            children: 'Avatar.tsx',
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
                      children: '100',
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
                      children: '100',
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
      e.jsx(s.h4, { children: 'External Image' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'You can also use external images by passing an object with a ',
          e.jsx(s.code, { children: 'uri' }),
          ' property as the ',
          e.jsx(s.code, { children: 'src' }),
          ' prop.',
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
            children: 'Avatar.tsx',
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
                  'data-highlighted-line': '',
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
      e.jsx(s.h2, { children: 'API' }),
      `
`,
      e.jsx(s.h3, { children: 'Image' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'The ',
          e.jsx(s.code, { children: 'Image' }),
          ' component is exported by default from the ',
          e.jsx(s.code, { children: '@rasenganjs/image' }),
          ' package.',
        ],
      }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'tsx',
          'data-theme': 'github-dark-dimmed',
          children: e.jsx(s.code, {
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: e.jsxs(s.span, {
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
                e.jsx(s.span, { style: { color: '#ADBAC7' }, children: ';' }),
              ],
            }),
          }),
        }),
      }),
      `
`,
      e.jsx(s.h4, { children: 'Props' }),
      `
`,
      e.jsxs(s.table, {
        children: [
          e.jsx(s.thead, {
            children: e.jsxs(s.tr, {
              children: [
                e.jsx(s.th, { children: 'Name' }),
                e.jsx(s.th, { children: 'Type' }),
                e.jsx(s.th, { children: 'Description' }),
              ],
            }),
          }),
          e.jsxs(s.tbody, {
            children: [
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, { children: e.jsx(s.code, { children: 'src' }) }),
                  e.jsxs(s.td, {
                    children: [
                      e.jsx(s.code, { children: 'string' }),
                      ' | ',
                      e.jsx(s.code, { children: '{ uri: string }' }),
                    ],
                  }),
                  e.jsx(s.td, {
                    children:
                      'Specifies the image source, either as a local path or a remote URL.',
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, { children: e.jsx(s.code, { children: 'alt' }) }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'string' }),
                  }),
                  e.jsx(s.td, {
                    children:
                      'Provides a short description of the image for accessibility.',
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'width' }),
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'number' }),
                  }),
                  e.jsx(s.td, {
                    children: 'Sets the width of the image in pixels.',
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'height' }),
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'number' }),
                  }),
                  e.jsx(s.td, {
                    children: 'Sets the height of the image in pixels.',
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'className' }),
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'string' }),
                  }),
                  e.jsx(s.td, {
                    children: 'Adds custom CSS classes for styling.',
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'style' }),
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'object' }),
                  }),
                  e.jsx(s.td, {
                    children:
                      'Allows inline styling using a JavaScript object.',
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'loading' }),
                  }),
                  e.jsxs(s.td, {
                    children: [
                      e.jsx(s.code, { children: "'lazy'" }),
                      ' | ',
                      e.jsx(s.code, { children: "'eager'" }),
                    ],
                  }),
                  e.jsxs(s.td, {
                    children: [
                      'Determines how the image loads: ',
                      e.jsx(s.code, { children: 'lazy' }),
                      ' for deferred loading or ',
                      e.jsx(s.code, { children: 'eager' }),
                      ' for immediate loading.',
                    ],
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'mode' }),
                  }),
                  e.jsxs(s.td, {
                    children: [
                      e.jsx(s.code, { children: "'blur'" }),
                      ' | ',
                      e.jsx(s.code, { children: "'wave'" }),
                    ],
                  }),
                  e.jsxs(s.td, {
                    children: [
                      'Defines the loading animation style, applicable only when ',
                      e.jsx(s.code, { children: 'loading' }),
                      ' is set to ',
                      e.jsx(s.code, { children: 'lazy' }),
                      '.',
                    ],
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'objectFit' }),
                  }),
                  e.jsxs(s.td, {
                    children: [
                      e.jsx(s.code, { children: "'contain'" }),
                      ' | ',
                      e.jsx(s.code, { children: "'cover'" }),
                      ' | ',
                      e.jsx(s.code, { children: "'fill'" }),
                      ' | ',
                      e.jsx(s.code, { children: "'inherit'" }),
                      ' | ',
                      e.jsx(s.code, { children: "'initial'" }),
                      ' | ',
                      e.jsx(s.code, { children: "'none'" }),
                    ],
                  }),
                  e.jsx(s.td, {
                    children:
                      'Controls how the image fits within its container.',
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'loadingOnViewport' }),
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'boolean' }),
                  }),
                  e.jsxs(s.td, {
                    children: [
                      'If ',
                      e.jsx(s.code, { children: 'true' }),
                      ', the image loads only when it enters the viewport.',
                    ],
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'fallbackSrc' }),
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'string' }),
                  }),
                  e.jsx(s.td, {
                    children:
                      'Specifies an alternative image to display if the main image fails to load.',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Community' }),
      `
`,
      e.jsx(s.p, {
        children:
          'Join the Rasengan.js community to get support, ask questions, and share your projects:',
      }),
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx('a', {
                href: 'https://github.com/rasengan-dev/rasenganjs/discussions',
                target: '_blank',
                rel: 'noopener noreferrer',
                children: 'GitHub Discussions',
              }),
              ' – Ask questions and share ideas.',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx('a', {
                href: 'https://x.com/rasenganjs',
                target: '_blank',
                rel: 'noopener noreferrer',
                children: 'X (Twitter)',
              }),
              ' – Stay updated with the latest news.',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx('a', {
                href: 'https://www.linkedin.com/company/rasenganjs/',
                target: '_blank',
                rel: 'noopener noreferrer',
                children: 'Linkedin',
              }),
              ' – Follow the company page.',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(s.p, {
        children: "Let's build something amazing with Rasengan.js! 🚀",
      }),
      `
`,
      e.jsx(s.h2, { children: 'License' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'This package is ',
          e.jsx(s.a, {
            href: 'https://github.com/rasengan-dev/rasenganjs/blob/main/LICENSE',
            children: 'MIT licensed',
          }),
          '.',
        ],
      }),
    ],
  });
}
function l(n = {}) {
  const { wrapper: s } = n.components || {};
  return s ? e.jsx(s, { ...n, children: e.jsx(r, { ...n }) }) : r(n);
}
const a = {
    path: '/image',
    metadata: {
      title: 'Rasengan Image Package - Modules | Packages | Rasengan.js',
      description: 'Documentation for the Rasengan Image package.',
    },
  },
  i = [
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
          title: 'Import the CSS file',
          anchor: { id: 'import-the-css-file', text: 'Import the CSS file' },
          level: 3,
        },
        {
          title: 'Displaying Images',
          anchor: { id: 'displaying-images', text: 'Displaying Images' },
          level: 3,
        },
      ],
    },
    {
      title: 'API',
      anchor: { id: 'api', text: 'API' },
      level: 2,
      children: [
        { title: 'Image', anchor: { id: 'image', text: 'Image' }, level: 3 },
      ],
    },
    {
      title: 'Community',
      anchor: { id: 'community', text: 'Community' },
      level: 2,
      children: [],
    },
    {
      title: 'License',
      anchor: { id: 'license', text: 'License' },
      level: 2,
      children: [],
    },
  ];
l.metadata = a;
l.toc = i;
l.type = 'MDXPageComponent';
export { l as default };
