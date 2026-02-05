import { j as e } from './vendor-CfbgIbdB.js';
function t(a) {
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
      e.jsx(n.h1, { children: 'Rasengan Vercel' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'The ',
          e.jsx(n.code, { children: '@rasenganjs/vercel' }),
          " package is an adapter that configures Rasengan.js applications for deployment on the Vercel platform. It ensures that the project is properly structured and optimized for Vercel's serverless environment.",
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'Installation' }),
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
                    children: ' @rasenganjs/vercel',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'Configuration' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'To configure Rasengan.js for Vercel, you need to import the adapter in your ',
          e.jsx(n.code, { children: 'rasengan.config.js' }),
          ' file and integrate it with the Rasengan.js plugin.',
        ],
      }),
      `
`,
      e.jsx(n.h3, { children: 'Example Configuration' }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'javascript',
            'data-theme': 'github-dark-dimmed',
            children: 'rasengan.config.js',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'javascript',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(n.code, {
              'data-line-numbers': '',
              'data-language': 'javascript',
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
                      children: ' { defineConfig } ',
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
                e.jsxs(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { rasengan } ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: ' "rasengan/plugin"',
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
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { configure } ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: ' "@rasenganjs/vercel"',
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
                      children: 'export',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: ' default',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: ' defineConfig',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: '({',
                    }),
                  ],
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '	vite: {',
                  }),
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '		plugins: [',
                  }),
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: '			rasengan',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '({',
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
                      children: '				adapter: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: 'configure',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '(),',
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
                    children: '			}),',
                  }),
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '		],',
                  }),
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '	}',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: ',',
                    }),
                  ],
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: '})',
                    }),
                    e.jsx(n.span, {
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
      e.jsxs(n.p, {
        children: [
          'In the example above, the ',
          e.jsx(n.code, { children: 'configure' }),
          ' function from ',
          e.jsx(n.code, { children: '@rasenganjs/vercel' }),
          ' is used to set up the Vercel adapter for the Rasengan.js application. The adapter is then passed to the ',
          e.jsx(n.code, { children: 'rasengan' }),
          ' plugin exported from ',
          e.jsx(n.code, { children: 'rasengan/plugin' }),
          ' to enable the necessary features for Vercel deployment.',
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'Deployment' }),
      `
`,
      e.jsx(n.p, {
        children:
          "Once the adapter is configured, you can deploy your Rasengan.js application using Vercel's CLI:",
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
              children: e.jsx(n.span, {
                'data-line': '',
                children: e.jsx(n.span, {
                  style: { color: '#F69D50' },
                  children: 'vercel',
                }),
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(n.p, {
        children:
          'Alternatively, you can link your GitHub repository to Vercel, and it will automatically detect the configuration and deploy your application.',
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
function s(a = {}) {
  const { wrapper: n } = a.components || {};
  return n ? e.jsx(n, { ...a, children: e.jsx(t, { ...a }) }) : t(a);
}
const l = {
    path: '/vercel',
    metadata: {
      title: 'Rasengan Vercel Package - Modules | Packages | Rasengan.js',
      description: 'Documentation for the Rasengan Vercel package.',
    },
  },
  r = [
    {
      title: 'Installation',
      anchor: { id: 'installation', text: 'Installation' },
      level: 2,
      children: [],
    },
    {
      title: 'Configuration',
      anchor: { id: 'configuration', text: 'Configuration' },
      level: 2,
      children: [
        {
          title: 'Example Configuration',
          anchor: {
            id: 'example-configuration',
            text: 'Example Configuration',
          },
          level: 3,
        },
      ],
    },
    {
      title: 'Deployment',
      anchor: { id: 'deployment', text: 'Deployment' },
      level: 2,
      children: [],
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
s.metadata = l;
s.toc = r;
s.type = 'MDXPageComponent';
export { s as default };
