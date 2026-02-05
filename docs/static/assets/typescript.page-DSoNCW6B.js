import { j as e } from './vendor-CfbgIbdB.js';
import { S as a, P as r } from './shared-components-CkrC6jAk.js';
function t(s) {
  const n = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    p: 'p',
    pre: 'pre',
    span: 'span',
    ...s.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        children: e.jsx(n.p, { children: 'CORE CONCEPTS' }),
      }),
      `
`,
      e.jsx(n.h1, { children: 'TypeScript' }),
      `
`,
      e.jsx(n.p, {
        children:
          'Rasengan.js provides a TypeScript-first development experience for building your React application.',
      }),
      `
`,
      e.jsx(n.p, {
        children:
          'It comes with built-in TypeScript support for automatically installing the necessary packages and configuring the proper settings.',
      }),
      `
`,
      e.jsx(n.h2, { children: 'New Project' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          e.jsx(n.code, { children: 'create-rasengan' }),
          ' CLI can be used to create a new TypeScript project.',
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
                    children: 'npx',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' create-rasengan@latest',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' my-app',
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
          'During the project creation, you will be prompted to choose the language for your project. Select ',
          e.jsx(n.code, { children: 'TypeScript' }),
          ' to create a TypeScript project.',
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'Existing Project' }),
      `
`,
      e.jsx(n.p, {
        children:
          'If you have an existing project and want to add TypeScript support, you have to follow the following steps:',
      }),
      `
`,
      e.jsx(a, {
        step: '01',
        title: 'Install dependencies',
        content: `
First, install the following dependencies:
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
                      children: ' install',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: ' --save-dev',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: ' typescript',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: ' @types/react',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: ' @types/react-dom',
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
      e.jsx(a, {
        step: '02',
        title: 'Configure TypeScript',
        content:
          '\nThen, add the following `tsconfig.json` file to the root of your project.\n',
        children: e.jsx(n.figure, {
          'data-rehype-pretty-code-figure': '',
          children: e.jsx(n.pre, {
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
                      children: '  "compilerOptions"',
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
                      children: '    "baseUrl"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ': ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"."',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
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
                      style: { color: '#8DDB8C' },
                      children: '    "target"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ': ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"ES2020"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ',',
                    }),
                  ],
                }),
                `
`,
                e.jsx(n.span, { 'data-line': '', children: ' ' }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#768390' },
                    children: '    /* Bundler mode */',
                  }),
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#8DDB8C' },
                      children: '    "moduleResolution"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ': ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"bundler"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
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
                      style: { color: '#8DDB8C' },
                      children: '    "module"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ': ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"ESNext"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
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
                      style: { color: '#8DDB8C' },
                      children: '    "jsx"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ': ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"react-jsx"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ',',
                    }),
                  ],
                }),
                `
`,
                e.jsx(n.span, { 'data-line': '', children: ' ' }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#768390' },
                    children: '    /* Aliases for intellisence */',
                  }),
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#8DDB8C' },
                      children: '    "paths"',
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
                      children: '      "@/*"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ': [',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"src/*"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ']',
                    }),
                  ],
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '    }',
                  }),
                }),
                `
`,
                e.jsx(n.span, {
                  'data-line': '',
                  children: e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '  },',
                  }),
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#8DDB8C' },
                      children: '  "include"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ': [',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"src"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"rasengan-env.d.ts"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '],',
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
                      style: { color: '#8DDB8C' },
                      children: '  "extends"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ': ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"./node_modules/rasengan/tsconfig.base.json"',
                    }),
                  ],
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
        }),
      }),
      `
`,
      e.jsx(a, {
        step: '03',
        title: 'Add Typescript Types',
        content:
          '\nFinally, add the following `rasengan-env.d.ts` file to the root of your project.\n',
        children: e.jsx(n.figure, {
          'data-rehype-pretty-code-figure': '',
          children: e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'ts',
            'data-theme': 'github-dark-dimmed',
            children: e.jsx(n.code, {
              'data-line-numbers': '',
              'data-language': 'ts',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              'data-line-numbers-max-digits': '1',
              children: e.jsxs(n.span, {
                'data-line': '',
                children: [
                  e.jsx(n.span, {
                    style: { color: '#768390' },
                    children: '/// <',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#8DDB8C' },
                    children: 'reference',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#6CB6FF' },
                    children: ' types',
                  }),
                  e.jsx(n.span, { style: { color: '#F47067' }, children: '=' }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: '"rasengan/types/client"',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#768390' },
                    children: ' />',
                  }),
                ],
              }),
            }),
          }),
        }),
      }),
      `
`,
      e.jsx(a, {
        step: '04',
        title: 'Rename files and launch the dev server',
        content:
          '\nFinally, rename your files to `.tsx` and `.ts` extensions.\nThen run `npm run dev` to start the development server.\n',
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
                      children: ' dev',
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
      e.jsx(r, {
        prev: {
          href: '/docs/optimizing/static-assets',
          label: 'Static Assets',
        },
        next: {
          href: '/docs/configuring/environment-variables',
          label: 'Environment Variables',
        },
      }),
    ],
  });
}
function l(s = {}) {
  const { wrapper: n } = s.components || {};
  return n ? e.jsx(n, { ...s, children: e.jsx(t, { ...s }) }) : t(s);
}
const d = {
    path: '/typescript',
    metadata: {
      title:
        'Configuring Typescript - Configuring | Core concepts | Rasengan.js',
      description: 'Learn how to configure Typescript in Rasengan.js',
    },
  },
  i = void 0;
l.metadata = d;
l.toc = i;
l.type = 'MDXPageComponent';
export { l as default };
