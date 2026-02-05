import { j as e } from './vendor-CfbgIbdB.js';
import { S as s } from './shared-components-CkrC6jAk.js';
function r(a) {
  const n = {
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
    ul: 'ul',
    ...a.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        style: { fontSize: 12 },
        children: e.jsx(n.p, { children: 'PACKAGES' }),
      }),
      `
`,
      e.jsx(n.h1, { children: 'Rasengan Serve' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          e.jsx(n.code, { children: '@rasenganjs/serve' }),
          ' is a simple utility to launch your Rasengan.js application in production mode. It serves the built application from the ',
          e.jsx(n.code, { children: 'dist' }),
          ' directory, ensuring a smooth and optimized deployment.',
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'Installation' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'To use ',
          e.jsx(n.code, { children: '@rasenganjs/serve' }),
          ', install it as a dependency in your project:',
        ],
      }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: 'Terminal',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: e.jsx(n.code, {
              'data-language': 'bash',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: e.jsxs(n.span, {
                'data-line': '',
                children: [
                  e.jsx(n.span, {
                    style: { color: '#F69D50' },
                    children: 'npm',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' install',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' @rasenganjs/serve',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'Usage' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'After building your application with Rasengan.js, you can start the production server using the ',
          e.jsx(n.code, { children: 'rasengan-serve' }),
          ' command.',
        ],
      }),
      `
`,
      e.jsx(n.h3, { children: 'Start the production server' }),
      `
`,
      e.jsx(s, {
        step: '01',
        title: 'Define the serve command',
        content:
          '\n  Add the following command to your `package.json` file to start the production server:\n',
        children: e.jsxs(n.figure, {
          'data-rehype-pretty-code-figure': '',
          children: [
            e.jsx(n.figcaption, {
              'data-rehype-pretty-code-title': '',
              'data-language': 'json',
              'data-theme': 'github-dark-dimmed',
              children: 'package.json',
            }),
            e.jsx(n.pre, {
              style: { backgroundColor: '#22272e', color: '#adbac7' },
              tabIndex: '0',
              'data-language': 'json',
              'data-theme': 'github-dark-dimmed',
              children: e.jsxs(n.code, {
                'data-language': 'json',
                'data-theme': 'github-dark-dimmed',
                style: { display: 'grid' },
                children: [
                  e.jsx(n.span, {
                    'data-line': '',
                    children: e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '{',
                    }),
                  }),
                  `
`,
                  e.jsxs(n.span, {
                    'data-line': '',
                    children: [
                      e.jsx(n.span, {
                        style: { color: '#8DDB8C' },
                        children: '  "scripts"',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: ': {',
                      }),
                    ],
                  }),
                  `
`,
                  e.jsxs(n.span, {
                    'data-line': '',
                    children: [
                      e.jsx(n.span, {
                        style: { color: '#8DDB8C' },
                        children: '    "serve"',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#ADBAC7' },
                        children: ': ',
                      }),
                      e.jsx(n.span, {
                        style: { color: '#96D0FF' },
                        children: '"rasengan-serve ./dist"',
                      }),
                    ],
                  }),
                  `
`,
                  e.jsx(n.span, {
                    'data-line': '',
                    children: e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '  }',
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
      }),
      `
`,
      e.jsx(s, {
        step: '02',
        title: 'Run the serve command',
        content: `
  Run the following command in your terminal:
`,
        children: e.jsxs(n.figure, {
          'data-rehype-pretty-code-figure': '',
          children: [
            e.jsx(n.figcaption, {
              'data-rehype-pretty-code-title': '',
              'data-language': 'bash',
              'data-theme': 'github-dark-dimmed',
              children: 'Terminal',
            }),
            e.jsx(n.pre, {
              style: { backgroundColor: '#22272e', color: '#adbac7' },
              tabIndex: '0',
              'data-language': 'bash',
              'data-theme': 'github-dark-dimmed',
              children: e.jsx(n.code, {
                'data-language': 'bash',
                'data-theme': 'github-dark-dimmed',
                style: { display: 'grid' },
                children: e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: 'npm',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: ' run',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: ' serve',
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'This will start a server that serves your application from the ',
          e.jsx(n.code, { children: 'dist' }),
          ' folder.',
        ],
      }),
      `
`,
      e.jsx(n.h3, { children: 'Options' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Currently, ',
          e.jsx(n.code, { children: '@rasenganjs/serve' }),
          ' provides a default configuration for serving your built project. Future updates may include additional options for customization.',
        ],
      }),
      `
`,
      e.jsx(n.h4, { children: 'Custom port' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'You can specify a custom port for the server by using the ',
          e.jsx(n.code, { children: '--p' }),
          ' or ',
          e.jsx(n.code, { children: '--port' }),
          ' option:',
        ],
      }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: 'Terminal',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: e.jsx(n.code, {
              'data-language': 'bash',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: e.jsxs(n.span, {
                'data-line': '',
                children: [
                  e.jsx(n.span, {
                    style: { color: '#F69D50' },
                    children: 'npm',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' run',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' serve',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#6CB6FF' },
                    children: ' --',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#6CB6FF' },
                    children: ' -p',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#6CB6FF' },
                    children: ' 3000',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(n.p, { children: 'or' }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: 'Terminal',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'bash',
            'data-theme': 'github-dark-dimmed',
            children: e.jsx(n.code, {
              'data-language': 'bash',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: e.jsxs(n.span, {
                'data-line': '',
                children: [
                  e.jsx(n.span, {
                    style: { color: '#F69D50' },
                    children: 'pnpm',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' run',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' serve',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#6CB6FF' },
                    children: ' -p',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#6CB6FF' },
                    children: ' 3000',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'The ',
          e.jsx(n.code, { children: '-p' }),
          ' option stands for ',
          e.jsx(n.code, { children: 'port' }),
          ', and allow you to specify a custom port for the server by replacing the default port ',
          e.jsx(n.code, { children: '4320' }),
          ' for production server.',
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'Community' }),
      `
`,
      e.jsx(n.p, {
        children:
          'Join the Rasengan.js community to get support, ask questions, and share your projects:',
      }),
      `
`,
      e.jsxs(n.ul, {
        children: [
          `
`,
          e.jsxs(n.li, {
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
      e.jsxs(n.ul, {
        children: [
          `
`,
          e.jsxs(n.li, {
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
          e.jsxs(n.li, {
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
      e.jsx(n.p, {
        children: "Let's build something amazing with Rasengan.js! 🚀",
      }),
      `
`,
      e.jsx(n.h2, { children: 'License' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'This package is ',
          e.jsx(n.a, {
            href: 'https://github.com/rasengan-dev/rasenganjs/blob/main/LICENSE',
            children: 'MIT licensed',
          }),
          '.',
        ],
      }),
    ],
  });
}
function t(a = {}) {
  const { wrapper: n } = a.components || {};
  return n ? e.jsx(n, { ...a, children: e.jsx(r, { ...a }) }) : r(a);
}
const i = {
    path: '/serve',
    metadata: {
      title: 'Rasengan Serve Package - Modules | Packages | Rasengan.js',
      description: 'Documentation for the Rasengan Serve package.',
    },
  },
  d = [
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
          title: 'Start the production server',
          anchor: {
            id: 'start-the-production-server',
            text: 'Start the production server',
          },
          level: 3,
        },
        {
          title: 'Options',
          anchor: { id: 'options', text: 'Options' },
          level: 3,
        },
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
t.metadata = i;
t.toc = d;
t.type = 'MDXPageComponent';
export { t as default };
