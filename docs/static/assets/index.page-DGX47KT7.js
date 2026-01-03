import { j as e } from './vendor-w5t4XTd4.js';
function t(n) {
  const a = {
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
    strong: 'strong',
    ul: 'ul',
    ...n.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        style: { fontSize: 12 },
        children: e.jsx(a.p, { children: 'PACKAGES' }),
      }),
      `
`,
      e.jsx(a.h1, { children: 'Rasengan.js Packages' }),
      `
`,
      e.jsx(a.p, {
        children:
          'Rasengan.js is a powerful and flexible React framework designed to enhance developer productivity. It is composed of multiple packages that provide essential functionalities for building modern web applications. Below is a list of all Rasengan.js packages and their purposes.',
      }),
      `
`,
      e.jsx(a.h2, { children: 'Core Packages' }),
      `
`,
      e.jsx(a.h3, { children: 'rasengan' }),
      `
`,
      e.jsxs(a.ul, {
        children: [
          `
`,
          e.jsxs(a.li, {
            children: [
              e.jsx(a.strong, { children: 'Description' }),
              ': The core framework package that provides essential functionalities such as routing, layout management, and component composition.',
            ],
          }),
          `
`,
          e.jsxs(a.li, {
            children: [
              e.jsx(a.strong, { children: 'Installation' }),
              ':',
              `
`,
              e.jsxs(a.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(a.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'bash',
                    'data-theme': 'github-dark-dimmed',
                    children: 'Terminal',
                  }),
                  e.jsx(a.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'bash',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsx(a.code, {
                      'data-language': 'bash',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      children: e.jsxs(a.span, {
                        'data-line': '',
                        children: [
                          e.jsx(a.span, {
                            style: { color: '#F69D50' },
                            children: 'npm',
                          }),
                          e.jsx(a.span, {
                            style: { color: '#96D0FF' },
                            children: ' install',
                          }),
                          e.jsx(a.span, {
                            style: { color: '#96D0FF' },
                            children: ' rasengan',
                          }),
                        ],
                      }),
                    }),
                  }),
                ],
              }),
              `
`,
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(a.h3, { children: 'create-rasengan' }),
      `
`,
      e.jsxs(a.ul, {
        children: [
          `
`,
          e.jsxs(a.li, {
            children: [
              e.jsx(a.strong, { children: 'Description' }),
              ': A CLI tool to create new Rasengan.js projects.',
            ],
          }),
          `
`,
          e.jsxs(a.li, {
            children: [
              e.jsx(a.strong, { children: 'Installation' }),
              ':',
              `
`,
              e.jsxs(a.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(a.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'bash',
                    'data-theme': 'github-dark-dimmed',
                    children: 'Terminal',
                  }),
                  e.jsx(a.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'bash',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsx(a.code, {
                      'data-language': 'bash',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      children: e.jsxs(a.span, {
                        'data-line': '',
                        children: [
                          e.jsx(a.span, {
                            style: { color: '#F69D50' },
                            children: 'npx',
                          }),
                          e.jsx(a.span, {
                            style: { color: '#96D0FF' },
                            children: ' create-rasengan@latest',
                          }),
                        ],
                      }),
                    }),
                  }),
                ],
              }),
              `
`,
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
      e.jsx(a.h2, { children: 'Utility Packages' }),
      `
`,
      e.jsx(a.h3, { children: '@rasenganjs/theme' }),
      `
`,
      e.jsxs(a.ul, {
        children: [
          `
`,
          e.jsxs(a.li, {
            children: [
              e.jsx(a.strong, { children: 'Description' }),
              ': Provides theme management features, including light and dark mode switching.',
            ],
          }),
          `
`,
          e.jsxs(a.li, {
            children: [
              e.jsx(a.strong, { children: 'Installation' }),
              ':',
              `
`,
              e.jsxs(a.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(a.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'bash',
                    'data-theme': 'github-dark-dimmed',
                    children: 'Terminal',
                  }),
                  e.jsx(a.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'bash',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsx(a.code, {
                      'data-language': 'bash',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      children: e.jsxs(a.span, {
                        'data-line': '',
                        children: [
                          e.jsx(a.span, {
                            style: { color: '#F69D50' },
                            children: 'npm',
                          }),
                          e.jsx(a.span, {
                            style: { color: '#96D0FF' },
                            children: ' install',
                          }),
                          e.jsx(a.span, {
                            style: { color: '#96D0FF' },
                            children: ' @rasenganjs/theme',
                          }),
                        ],
                      }),
                    }),
                  }),
                ],
              }),
              `
`,
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(a.h3, { children: '@rasenganjs/image' }),
      `
`,
      e.jsxs(a.ul, {
        children: [
          `
`,
          e.jsxs(a.li, {
            children: [
              e.jsx(a.strong, { children: 'Description' }),
              ': An optimized image component with lazy loading and animated previews.',
            ],
          }),
          `
`,
          e.jsxs(a.li, {
            children: [
              e.jsx(a.strong, { children: 'Installation' }),
              ':',
              `
`,
              e.jsxs(a.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(a.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'bash',
                    'data-theme': 'github-dark-dimmed',
                    children: 'Terminal',
                  }),
                  e.jsx(a.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'bash',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsx(a.code, {
                      'data-language': 'bash',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      children: e.jsxs(a.span, {
                        'data-line': '',
                        children: [
                          e.jsx(a.span, {
                            style: { color: '#F69D50' },
                            children: 'npm',
                          }),
                          e.jsx(a.span, {
                            style: { color: '#96D0FF' },
                            children: ' install',
                          }),
                          e.jsx(a.span, {
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
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(a.h3, { children: '@rasenganjs/mdx' }),
      `
`,
      e.jsxs(a.ul, {
        children: [
          `
`,
          e.jsxs(a.li, {
            children: [
              e.jsx(a.strong, { children: 'Description' }),
              ': Enables MDX (Markdown with JSX) support in Rasengan.js projects.',
            ],
          }),
          `
`,
          e.jsxs(a.li, {
            children: [
              e.jsx(a.strong, { children: 'Installation' }),
              ':',
              `
`,
              e.jsxs(a.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(a.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'bash',
                    'data-theme': 'github-dark-dimmed',
                    children: 'Terminal',
                  }),
                  e.jsx(a.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'bash',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsx(a.code, {
                      'data-language': 'bash',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      children: e.jsxs(a.span, {
                        'data-line': '',
                        children: [
                          e.jsx(a.span, {
                            style: { color: '#F69D50' },
                            children: 'npm',
                          }),
                          e.jsx(a.span, {
                            style: { color: '#96D0FF' },
                            children: ' install',
                          }),
                          e.jsx(a.span, {
                            style: { color: '#96D0FF' },
                            children: ' @rasenganjs/mdx',
                          }),
                        ],
                      }),
                    }),
                  }),
                ],
              }),
              `
`,
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(a.h3, { children: '@rasenganjs/kurama' }),
      `
`,
      e.jsxs(a.ul, {
        children: [
          `
`,
          e.jsxs(a.li, {
            children: [
              e.jsx(a.strong, { children: 'Description' }),
              ': A global state management solution built for Rasengan.js.',
            ],
          }),
          `
`,
          e.jsxs(a.li, {
            children: [
              e.jsx(a.strong, { children: 'Installation' }),
              ':',
              `
`,
              e.jsxs(a.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(a.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'bash',
                    'data-theme': 'github-dark-dimmed',
                    children: 'Terminal',
                  }),
                  e.jsx(a.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'bash',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsx(a.code, {
                      'data-language': 'bash',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      children: e.jsxs(a.span, {
                        'data-line': '',
                        children: [
                          e.jsx(a.span, {
                            style: { color: '#F69D50' },
                            children: 'npm',
                          }),
                          e.jsx(a.span, {
                            style: { color: '#96D0FF' },
                            children: ' install',
                          }),
                          e.jsx(a.span, {
                            style: { color: '#96D0FF' },
                            children: ' @rasenganjs/kurama',
                          }),
                        ],
                      }),
                    }),
                  }),
                ],
              }),
              `
`,
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(a.h3, { children: '@rasenganjs/kage-demo' }),
      `
`,
      e.jsxs(a.ul, {
        children: [
          `
`,
          e.jsxs(a.li, {
            children: [
              e.jsx(a.strong, { children: 'Description' }),
              ': A lightweight, framework-native library that allows you to create guided step-by-step demos, onboarding flows, and product tours inside your Rasengan.js application.',
            ],
          }),
          `
`,
          e.jsxs(a.li, {
            children: [
              e.jsx(a.strong, { children: 'Installation' }),
              ':',
              `
`,
              e.jsxs(a.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(a.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'bash',
                    'data-theme': 'github-dark-dimmed',
                    children: 'Terminal',
                  }),
                  e.jsx(a.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'bash',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsx(a.code, {
                      'data-language': 'bash',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      children: e.jsxs(a.span, {
                        'data-line': '',
                        children: [
                          e.jsx(a.span, {
                            style: { color: '#F69D50' },
                            children: 'npm',
                          }),
                          e.jsx(a.span, {
                            style: { color: '#96D0FF' },
                            children: ' install',
                          }),
                          e.jsx(a.span, {
                            style: { color: '#96D0FF' },
                            children: ' @rasenganjs/kage-demo',
                          }),
                        ],
                      }),
                    }),
                  }),
                ],
              }),
              `
`,
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(a.h2, { children: 'Deployment & Server Packages' }),
      `
`,
      e.jsx(a.h3, { children: '@rasenganjs/serve' }),
      `
`,
      e.jsxs(a.ul, {
        children: [
          `
`,
          e.jsxs(a.li, {
            children: [
              e.jsx(a.strong, { children: 'Description' }),
              ': A CLI tool to serve the Rasengan.js app in production mode.',
            ],
          }),
          `
`,
          e.jsxs(a.li, {
            children: [
              e.jsx(a.strong, { children: 'Installation' }),
              ':',
              `
`,
              e.jsxs(a.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(a.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'bash',
                    'data-theme': 'github-dark-dimmed',
                    children: 'Terminal',
                  }),
                  e.jsx(a.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'bash',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsx(a.code, {
                      'data-language': 'bash',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      children: e.jsxs(a.span, {
                        'data-line': '',
                        children: [
                          e.jsx(a.span, {
                            style: { color: '#F69D50' },
                            children: 'npm',
                          }),
                          e.jsx(a.span, {
                            style: { color: '#96D0FF' },
                            children: ' install',
                          }),
                          e.jsx(a.span, {
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
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(a.h3, { children: '@rasenganjs/vercel' }),
      `
`,
      e.jsxs(a.ul, {
        children: [
          `
`,
          e.jsxs(a.li, {
            children: [
              e.jsx(a.strong, { children: 'Description' }),
              ': A Vercel adapter for deploying Rasengan.js applications.',
            ],
          }),
          `
`,
          e.jsxs(a.li, {
            children: [
              e.jsx(a.strong, { children: 'Installation' }),
              ':',
              `
`,
              e.jsxs(a.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(a.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'bash',
                    'data-theme': 'github-dark-dimmed',
                    children: 'Terminal',
                  }),
                  e.jsx(a.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'bash',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsx(a.code, {
                      'data-language': 'bash',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      children: e.jsxs(a.span, {
                        'data-line': '',
                        children: [
                          e.jsx(a.span, {
                            style: { color: '#F69D50' },
                            children: 'npm',
                          }),
                          e.jsx(a.span, {
                            style: { color: '#96D0FF' },
                            children: ' install',
                          }),
                          e.jsx(a.span, {
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
      e.jsx(a.h2, { children: 'Community & Support' }),
      `
`,
      e.jsx(a.p, {
        children:
          'Join the Rasengan.js community to get support, ask questions, and share your projects:',
      }),
      `
`,
      e.jsxs(a.ul, {
        children: [
          `
`,
          e.jsxs(a.li, {
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
      e.jsxs(a.ul, {
        children: [
          `
`,
          e.jsxs(a.li, {
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
          e.jsxs(a.li, {
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
      e.jsx(a.p, {
        children: "Let's build something amazing with Rasengan.js! 🚀",
      }),
      `
`,
      e.jsx(a.h2, { children: 'License' }),
      `
`,
      e.jsxs(a.p, {
        children: [
          'These packages are ',
          e.jsx(a.a, {
            href: 'https://github.com/rasengan-dev/rasenganjs/blob/main/LICENSE',
            children: 'MIT licensed',
          }),
          '.',
        ],
      }),
    ],
  });
}
function s(n = {}) {
  const { wrapper: a } = n.components || {};
  return a ? e.jsx(a, { ...n, children: e.jsx(t, { ...n }) }) : t(n);
}
const r = {
    path: '/index',
    metadata: {
      title: 'Discover RasenganJS Packages | Packages | Rasengan.js',
      description: 'Discover the packages that make up RasenganJS.',
    },
  },
  i = [
    {
      title: 'Core Packages',
      anchor: { id: 'core-packages', text: 'Core Packages' },
      level: 2,
      children: [
        {
          title: 'rasengan',
          anchor: { id: 'rasengan', text: 'rasengan' },
          level: 3,
        },
        {
          title: 'create-rasengan',
          anchor: { id: 'create-rasengan', text: 'create-rasengan' },
          level: 3,
        },
      ],
    },
    {
      title: 'Utility Packages',
      anchor: { id: 'utility-packages', text: 'Utility Packages' },
      level: 2,
      children: [
        {
          title: '@rasenganjs/theme',
          anchor: { id: '@rasenganjs/theme', text: '@rasenganjs/theme' },
          level: 3,
        },
        {
          title: '@rasenganjs/image',
          anchor: { id: '@rasenganjs/image', text: '@rasenganjs/image' },
          level: 3,
        },
        {
          title: '@rasenganjs/mdx',
          anchor: { id: '@rasenganjs/mdx', text: '@rasenganjs/mdx' },
          level: 3,
        },
        {
          title: '@rasenganjs/kurama',
          anchor: { id: '@rasenganjs/kurama', text: '@rasenganjs/kurama' },
          level: 3,
        },
        {
          title: '@rasenganjs/kage-demo',
          anchor: {
            id: '@rasenganjs/kage-demo',
            text: '@rasenganjs/kage-demo',
          },
          level: 3,
        },
      ],
    },
    {
      title: 'Deployment & Server Packages',
      anchor: {
        id: 'deployment-&-server-packages',
        text: 'Deployment & Server Packages',
      },
      level: 2,
      children: [
        {
          title: '@rasenganjs/serve',
          anchor: { id: '@rasenganjs/serve', text: '@rasenganjs/serve' },
          level: 3,
        },
        {
          title: '@rasenganjs/vercel',
          anchor: { id: '@rasenganjs/vercel', text: '@rasenganjs/vercel' },
          level: 3,
        },
      ],
    },
    {
      title: 'Community & Support',
      anchor: { id: 'community-&-support', text: 'Community & Support' },
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
s.metadata = r;
s.toc = i;
s.type = 'MDXPageComponent';
export { s as default };
