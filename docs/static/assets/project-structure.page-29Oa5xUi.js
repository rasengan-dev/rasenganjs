import { j as e } from './vendor-w5t4XTd4.js';
import { A as i, P as d } from './shared-components-DBceyN8p.js';
function t(r) {
  const s = {
    code: 'code',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    strong: 'strong',
    table: 'table',
    tbody: 'tbody',
    td: 'td',
    th: 'th',
    thead: 'thead',
    tr: 'tr',
    ...r.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        children: e.jsx(s.p, { children: 'GETTING STARTED' }),
      }),
      `
`,
      e.jsx(s.h1, { children: 'Rasengan.js Project Structure' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Welcome! This guide will walk you through the structure of a ',
          e.jsx(s.strong, { children: 'Rasengan.js' }),
          ' project, explaining its core directories, essential files, and conventions. By understanding this structure, you’ll be able to navigate and organize your project with ease.',
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Top-Level Directories' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'A ',
          e.jsx(s.strong, { children: 'Rasengan.js' }),
          " project follows a simple yet powerful structure. At the root of your project, you'll find these key directories:",
        ],
      }),
      `
`,
      e.jsxs(s.table, {
        children: [
          e.jsx(s.thead, {
            children: e.jsxs(s.tr, {
              children: [
                e.jsx(s.th, { children: 'Directory' }),
                e.jsx(s.th, { children: 'Description' }),
              ],
            }),
          }),
          e.jsxs(s.tbody, {
            children: [
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'public' }),
                  }),
                  e.jsx(s.td, {
                    children:
                      'Stores static assets such as images, icons, and fonts.',
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, { children: e.jsx(s.code, { children: 'src' }) }),
                  e.jsx(s.td, {
                    children:
                      'Contains all the source code for your application.',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Top-Level Files' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Alongside the main directories, a ',
          e.jsx(s.strong, { children: 'Rasengan.js' }),
          ' project includes important configuration and environment files:',
        ],
      }),
      `
`,
      e.jsxs(s.table, {
        children: [
          e.jsx(s.thead, {
            children: e.jsxs(s.tr, {
              children: [
                e.jsx(s.th, { children: 'File' }),
                e.jsx(s.th, { children: 'Description' }),
              ],
            }),
          }),
          e.jsxs(s.tbody, {
            children: [
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'rasengan.config.js' }),
                  }),
                  e.jsx(s.td, {
                    children: 'The main configuration file for your project.',
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'package.json' }),
                  }),
                  e.jsx(s.td, {
                    children:
                      'Manages dependencies, scripts, and project metadata.',
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: '.env' }),
                  }),
                  e.jsx(s.td, { children: 'Stores environment variables.' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: '.env.example' }),
                  }),
                  e.jsx(s.td, {
                    children: 'Provides a template for environment variables.',
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: '.gitignore' }),
                  }),
                  e.jsx(s.td, {
                    children:
                      'Specifies files and folders to be ignored by Git.',
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'README.md' }),
                  }),
                  e.jsx(s.td, { children: 'Documentation for your project.' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'rasengan-env.d.ts' }),
                  }),
                  e.jsx(s.td, {
                    children: 'TypeScript declarations for Rasengan.js.',
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'tsconfig.json' }),
                  }),
                  e.jsx(s.td, {
                    children: 'Configuration file for TypeScript projects.',
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'jsconfig.json' }),
                  }),
                  e.jsx(s.td, {
                    children: 'Configuration file for JavaScript projects.',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Inside the src Folder' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'The ',
          e.jsx(s.strong, { children: e.jsx(s.code, { children: 'src' }) }),
          " directory is the heart of your project, where you’ll define your application's logic, components, and pages.",
        ],
      }),
      `
`,
      e.jsx(s.h3, { children: 'Subdirectories' }),
      `
`,
      e.jsxs(s.table, {
        children: [
          e.jsx(s.thead, {
            children: e.jsxs(s.tr, {
              children: [
                e.jsx(s.th, { children: 'Directory' }),
                e.jsx(s.th, { children: 'Description' }),
                e.jsx(s.th, { children: 'Requirement' }),
              ],
            }),
          }),
          e.jsxs(s.tbody, {
            children: [
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, { children: e.jsx(s.code, { children: 'app' }) }),
                  e.jsx(s.td, {
                    children: 'Holds all the pages of your project.',
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.strong, { children: 'Required' }),
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'components' }),
                  }),
                  e.jsx(s.td, { children: 'Stores reusable UI components.' }),
                  e.jsx(s.td, { children: 'Optional' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'assets' }),
                  }),
                  e.jsx(s.td, {
                    children:
                      'Contains images, fonts, and other static assets.',
                  }),
                  e.jsx(s.td, { children: 'Optional' }),
                ],
              }),
            ],
          }),
        ],
      }),
      `
`,
      e.jsx(s.h3, { children: 'Essential Files' }),
      `
`,
      e.jsxs(s.table, {
        children: [
          e.jsx(s.thead, {
            children: e.jsxs(s.tr, {
              children: [
                e.jsx(s.th, { children: 'File' }),
                e.jsx(s.th, { children: 'Extensions' }),
                e.jsx(s.th, { children: 'Description' }),
                e.jsx(s.th, { children: 'Requirement' }),
              ],
            }),
          }),
          e.jsxs(s.tbody, {
            children: [
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'main' }),
                  }),
                  e.jsxs(s.td, {
                    children: [
                      e.jsx(s.code, { children: '.jsx' }),
                      ' ',
                      e.jsx(s.code, { children: '.tsx' }),
                    ],
                  }),
                  e.jsx(s.td, {
                    children: 'The main file that renders your app.',
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.strong, { children: 'Required' }),
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'template' }),
                  }),
                  e.jsxs(s.td, {
                    children: [
                      e.jsx(s.code, { children: '.jsx' }),
                      ' ',
                      e.jsx(s.code, { children: '.tsx' }),
                    ],
                  }),
                  e.jsx(s.td, {
                    children: 'Defines the HTML structure of your app.',
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.strong, { children: 'Required' }),
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'index' }),
                  }),
                  e.jsxs(s.td, {
                    children: [
                      e.jsx(s.code, { children: '.js' }),
                      ' ',
                      e.jsx(s.code, { children: '.ts' }),
                    ],
                  }),
                  e.jsx(s.td, {
                    children: 'The entry point of your application.',
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.strong, { children: 'Required' }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'The app Folder' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'The ',
          e.jsx(s.strong, { children: e.jsx(s.code, { children: 'app' }) }),
          ' folder is where your ',
          e.jsx(s.strong, { children: 'pages, routers, and layouts' }),
          ' live. It organizes the structure of your application, ensuring smooth navigation and rendering.',
        ],
      }),
      `
`,
      e.jsx(i, {
        title: 'Info',
        description:
          'The app folder is required for your project to function properly.',
        className: 'mb-4',
        status: 'info',
      }),
      `
`,
      e.jsx(s.h3, { children: 'File Types in app' }),
      `
`,
      e.jsxs(s.table, {
        children: [
          e.jsx(s.thead, {
            children: e.jsxs(s.tr, {
              children: [
                e.jsx(s.th, { children: 'File Type' }),
                e.jsx(s.th, { children: 'Extensions' }),
                e.jsx(s.th, { children: 'Purpose' }),
                e.jsx(s.th, { children: 'Example' }),
              ],
            }),
          }),
          e.jsxs(s.tbody, {
            children: [
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: '[name].page' }),
                  }),
                  e.jsxs(s.td, {
                    children: [
                      e.jsx(s.code, { children: '.js' }),
                      ' ',
                      e.jsx(s.code, { children: '.jsx' }),
                      ' ',
                      e.jsx(s.code, { children: '.ts' }),
                      ' ',
                      e.jsx(s.code, { children: '.tsx' }),
                      ' ',
                      e.jsx(s.code, { children: '.md' }),
                      ' ',
                      e.jsx(s.code, { children: '.mdx' }),
                    ],
                  }),
                  e.jsx(s.td, { children: 'Defines a page.' }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'home.page' }),
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: '[name].router' }),
                  }),
                  e.jsxs(s.td, {
                    children: [
                      e.jsx(s.code, { children: '.js' }),
                      ' ',
                      e.jsx(s.code, { children: '.ts' }),
                    ],
                  }),
                  e.jsx(s.td, { children: 'Manages routing logic.' }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'app.router' }),
                  }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: '[name].layout' }),
                  }),
                  e.jsxs(s.td, {
                    children: [
                      e.jsx(s.code, { children: '.js' }),
                      ' ',
                      e.jsx(s.code, { children: '.jsx' }),
                      ' ',
                      e.jsx(s.code, { children: '.ts' }),
                      ' ',
                      e.jsx(s.code, { children: '.tsx' }),
                    ],
                  }),
                  e.jsx(s.td, {
                    children: 'Creates a shared layout structure.',
                  }),
                  e.jsx(s.td, {
                    children: e.jsx(s.code, { children: 'app.layout' }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'With this structured approach, ',
          e.jsx(s.strong, { children: 'Rasengan.js' }),
          ' keeps your project ',
          e.jsx(s.strong, { children: 'clean, scalable, and easy to manage' }),
          '. Now you’re ready to start building with confidence! 🚀',
        ],
      }),
      `
`,
      e.jsx(d, {
        prev: {
          href: '/docs/getting-started/installation',
          label: 'Installation',
        },
        next: { href: '/docs/getting-started/upgrading', label: 'Upgrading' },
      }),
    ],
  });
}
function n(r = {}) {
  const { wrapper: s } = r.components || {};
  return s ? e.jsx(s, { ...r, children: e.jsx(t, { ...r }) }) : t(r);
}
const c = {
    path: '/project-structure',
    metadata: {
      title: 'Project Structure | Getting Started | Rasengan.js',
      description: 'Discover the structure of a Rasengan.js project.',
    },
  },
  l = [
    {
      title: 'Top-Level Directories',
      anchor: { id: 'top-level-directories', text: 'Top-Level Directories' },
      level: 2,
      children: [],
    },
    {
      title: 'Top-Level Files',
      anchor: { id: 'top-level-files', text: 'Top-Level Files' },
      level: 2,
      children: [],
    },
    {
      title: 'Inside the src Folder',
      anchor: { id: 'inside-the-src-folder', text: 'Inside the src Folder' },
      level: 2,
      children: [
        {
          title: 'Subdirectories',
          anchor: { id: 'subdirectories', text: 'Subdirectories' },
          level: 3,
        },
        {
          title: 'Essential Files',
          anchor: { id: 'essential-files', text: 'Essential Files' },
          level: 3,
        },
      ],
    },
    {
      title: 'The app Folder',
      anchor: { id: 'the-app-folder', text: 'The app Folder' },
      level: 2,
      children: [
        {
          title: 'File Types in app',
          anchor: { id: 'file-types-in-app', text: 'File Types in app' },
          level: 3,
        },
      ],
    },
  ];
n.metadata = c;
n.toc = l;
n.type = 'MDXPageComponent';
export { n as default };
