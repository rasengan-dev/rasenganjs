import { j as e } from './vendor-CfbgIbdB.js';
function r(s) {
  const n = {
    a: 'a',
    code: 'code',
    h1: 'h1',
    h2: 'h2',
    li: 'li',
    p: 'p',
    strong: 'strong',
    table: 'table',
    tbody: 'tbody',
    td: 'td',
    th: 'th',
    thead: 'thead',
    tr: 'tr',
    ul: 'ul',
    ...s.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        children: e.jsx(n.p, { children: 'GETTING STARTED' }),
      }),
      `
`,
      e.jsx(n.h1, { children: 'Welcome to Rasengan.js Docs' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Welcome to the official documentation for ',
          e.jsx(n.code, { children: 'Rasengan.js' }),
          '! We hope you find everything you need to build amazing web applications.',
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'What is Rasengan.js?' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          e.jsx(n.strong, { children: 'Rasengan.js' }),
          ' is a ',
          e.jsx(n.code, { children: 'React framework' }),
          ' designed to help you create modern web applications with ease.',
        ],
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'You will build your UI using ',
          e.jsx(n.strong, { children: 'React components' }),
          ', and Rasengan.js will handle the rest—',
          e.jsx(n.strong, {
            children: e.jsx(n.code, {
              children: 'routing, optimization, and more',
            }),
          }),
          '.',
        ],
      }),
      `
`,
      e.jsx(n.p, {
        children:
          "With Rasengan.js, you don't have to worry about complex tasks like bundling or compiling. It simplifies the process so you can focus on building your application.",
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          "Whether you're just starting out or an experienced developer, Rasengan.js will help you build ",
          e.jsx(n.strong, {
            children: e.jsx(n.code, {
              children: 'fast, efficient, and scalable',
            }),
          }),
          ' web applications.',
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'Key Features' }),
      `
`,
      e.jsx(n.p, { children: 'Here’s what Rasengan.js offers:' }),
      `
`,
      e.jsxs(n.table, {
        children: [
          e.jsx(n.thead, {
            children: e.jsxs(n.tr, {
              children: [
                e.jsx(n.th, { children: 'Feature' }),
                e.jsx(n.th, { children: 'Description' }),
              ],
            }),
          }),
          e.jsxs(n.tbody, {
            children: [
              e.jsxs(n.tr, {
                children: [
                  e.jsx(n.td, {
                    children: e.jsx(n.strong, {
                      children: e.jsx(n.code, { children: 'Routing' }),
                    }),
                  }),
                  e.jsx(n.td, {
                    children:
                      'Built-in routing system with simple configuration.',
                  }),
                ],
              }),
              e.jsxs(n.tr, {
                children: [
                  e.jsx(n.td, {
                    children: e.jsx(n.strong, {
                      children: e.jsx(n.code, { children: 'Rendering' }),
                    }),
                  }),
                  e.jsxs(n.td, {
                    children: [
                      'Supports ',
                      e.jsx(n.strong, {
                        children: 'Client-Side Rendering (CSR)',
                      }),
                      ' and ',
                      e.jsx(n.strong, {
                        children: 'Server-Side Rendering (SSR)',
                      }),
                      ' for client components.',
                    ],
                  }),
                ],
              }),
              e.jsxs(n.tr, {
                children: [
                  e.jsx(n.td, {
                    children: e.jsx(n.strong, {
                      children: e.jsx(n.code, { children: 'Styling' }),
                    }),
                  }),
                  e.jsxs(n.td, {
                    children: [
                      'Works with ',
                      e.jsx(n.strong, {
                        children:
                          'CSS Modules, Preprocessors (Sass, Less), Tailwind CSS',
                      }),
                      ', and more.',
                    ],
                  }),
                ],
              }),
              e.jsxs(n.tr, {
                children: [
                  e.jsx(n.td, {
                    children: e.jsx(n.strong, {
                      children: e.jsx(n.code, { children: 'Optimization' }),
                    }),
                  }),
                  e.jsxs(n.td, {
                    children: [
                      'Features like ',
                      e.jsx(n.strong, {
                        children:
                          'code splitting, lazy loading, and image optimization',
                      }),
                      ' improve performance.',
                    ],
                  }),
                ],
              }),
              e.jsxs(n.tr, {
                children: [
                  e.jsx(n.td, {
                    children: e.jsx(n.strong, {
                      children: e.jsx(n.code, { children: 'TypeScript' }),
                    }),
                  }),
                  e.jsx(n.td, {
                    children:
                      'Full support for TypeScript, making development safer and more predictable.',
                  }),
                ],
              }),
              e.jsxs(n.tr, {
                children: [
                  e.jsx(n.td, {
                    children: e.jsx(n.strong, {
                      children: e.jsx(n.code, { children: 'MDX Support' }),
                    }),
                  }),
                  e.jsx(n.td, {
                    children:
                      'Allows you to use Markdown with JSX to create rich content pages.',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'How to Use This Documentation' }),
      `
`,
      e.jsxs(n.ul, {
        children: [
          `
`,
          e.jsxs(n.li, {
            children: [
              e.jsx(n.strong, { children: 'Navigation Bar (Left Side):' }),
              ' The docs are structured step by step, from ',
              e.jsx(n.strong, { children: 'basics to advanced' }),
              ' topics. You can follow the sequence or jump to what you need.',
            ],
          }),
          `
`,
          e.jsxs(n.li, {
            children: [
              e.jsx(n.strong, { children: 'Table of Contents (Right Side):' }),
              ' Easily navigate within a page.',
            ],
          }),
          `
`,
          e.jsxs(n.li, {
            children: [
              e.jsx(n.strong, { children: 'Search Bar:' }),
              ' Use ',
              e.jsx(n.code, { children: 'Ctrl+K' }),
              ' (Windows/Linux) or ',
              e.jsx(n.code, { children: 'Cmd+K' }),
              ' (Mac) to quickly find topics.',
            ],
          }),
          `
`,
          e.jsxs(n.li, {
            children: [
              e.jsx(n.strong, { children: 'Getting Started:' }),
              ' If you’re new, start with the ',
              e.jsx(n.a, {
                href: '/docs/getting-started/installation',
                children: 'Installation Guide',
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
      e.jsx(n.h2, {
        children: 'What You Should Know Before Using Rasengan.js',
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Rasengan.js is ',
          e.jsx(n.strong, { children: 'beginner-friendly' }),
          ', but this documentation focuses on the framework itself.',
        ],
      }),
      `
`,
      e.jsx(n.p, {
        children: 'For the best experience, you should be comfortable with:',
      }),
      `
`,
      e.jsxs(n.ul, {
        children: [
          `
`,
          e.jsxs(n.li, {
            children: [
              e.jsx(n.strong, { children: 'HTML, CSS, JavaScript, and React' }),
              '.',
            ],
          }),
          `
`,
          e.jsxs(n.li, {
            children: [
              "If you're new to React, check out the ",
              e.jsx('a', {
                href: 'https://react.dev/learn',
                target: '_blank',
                rel: 'noopener noreferrer',
                children: 'React Fundamentals',
              }),
              ' to learn the basics.',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'Join Our Community' }),
      `
`,
      e.jsx(n.p, { children: 'Need help? Connect with other developers:' }),
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
    ],
  });
}
function t(s = {}) {
  const { wrapper: n } = s.components || {};
  return n ? e.jsx(n, { ...s, children: e.jsx(r, { ...s }) }) : r(s);
}
const i = {
    path: '/introduction',
    metadata: {
      title: "What's Rasengan.js ? | Getting Started | Rasengan.js",
      description:
        'Discover the great React Framework for modern web applications',
    },
  },
  o = [
    {
      title: 'What is Rasengan.js?',
      anchor: { id: 'what-is-rasengan.js?', text: 'What is Rasengan.js?' },
      level: 2,
      children: [],
    },
    {
      title: 'Key Features',
      anchor: { id: 'key-features', text: 'Key Features' },
      level: 2,
      children: [],
    },
    {
      title: 'How to Use This Documentation',
      anchor: {
        id: 'how-to-use-this-documentation',
        text: 'How to Use This Documentation',
      },
      level: 2,
      children: [],
    },
    {
      title: 'What You Should Know Before Using Rasengan.js',
      anchor: {
        id: 'what-you-should-know-before-using-rasengan.js',
        text: 'What You Should Know Before Using Rasengan.js',
      },
      level: 2,
      children: [],
    },
    {
      title: 'Join Our Community',
      anchor: { id: 'join-our-community', text: 'Join Our Community' },
      level: 2,
      children: [],
    },
  ];
t.metadata = i;
t.toc = o;
t.type = 'MDXPageComponent';
export { t as default };
