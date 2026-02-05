import { j as e, C as a } from './vendor-CfbgIbdB.js';
import { k as o, a as r } from './shared-components-CkrC6jAk.js';
function l(s) {
  const n = {
    a: 'a',
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    pre: 'pre',
    span: 'span',
    strong: 'strong',
    ...s.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx(o, {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          e.jsx(n.code, { children: 'Rasengan v1.1.0' }),
          ' is now available on ',
          e.jsx(n.a, {
            href: 'https://www.npmjs.com/package/rasengan',
            children: 'npm',
          }),
          '.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsx(n.p, {
        children:
          'In this post, we will talk about the new features of Rasengan v1.1.0 and how you can adopt them into your projects.',
      }),
      `
`,
      e.jsx(n.p, {
        children: 'For a list of breaking changes, see the Change log.',
      }),
      `
`,
      e.jsx(n.h2, { children: "What's new in Rasengan v1.1.0?" }),
      `
`,
      e.jsx(n.h3, { children: 'Introduction of File-based routing' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Rasengan v1.1.0 introduces you the ',
          e.jsx(a, {
            to: '/docs/routing/file-based-routing',
            children: e.jsx(n.strong, { children: 'file-based routing' }),
          }),
          ' feature. This feature allows you to create routes based on the file structure of your project.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          'To use this feature, you have to create files in the ',
          e.jsx(n.code, { children: 'src/app/_routes' }),
          ' directory and always export a component from it by default in order to be considered.',
        ],
      }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'src/app/_routes/index.page.tsx',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(n.code, {
              'data-line-numbers': '',
              'data-language': 'tsx',
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
                      children: ' { PageComponent } ',
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
                e.jsx(n.span, { 'data-line': '', children: ' ' }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'const',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: ' Page',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: ' PageComponent',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
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
                      children: '  return',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' <',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#8DDB8C' },
                      children: 'h1',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '>Home</',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#8DDB8C' },
                      children: 'h1',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '>;',
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
                `
`,
                e.jsx(n.span, { 'data-line': '', children: ' ' }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: 'Page.metadata ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '  title: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"Home"',
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
                      style: { color: '#ADBAC7' },
                      children: '  description: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"Home page"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ',',
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
                      style: { color: '#ADBAC7' },
                      children: ' Page;',
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
      e.jsx('br', {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          'This will create a route for the ',
          e.jsx(n.code, { children: 'index' }),
          ' page with the path ',
          e.jsx(n.code, { children: '/' }),
          '.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          'You can also create nested routes by creating a directory in the ',
          e.jsx(n.code, { children: 'src/app/_routes' }),
          ' directory and exporting a component from it.',
        ],
      }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'src/app/_routes/blog/index.page.tsx',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(n.code, {
              'data-line-numbers': '',
              'data-language': 'tsx',
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
                      children: ' { PageComponent } ',
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
                e.jsx(n.span, { 'data-line': '', children: ' ' }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'const',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#DCBDFB' },
                      children: ' Page',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: ' PageComponent',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
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
                      children: '  return',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' <',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#8DDB8C' },
                      children: 'h1',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '>Blog</',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#8DDB8C' },
                      children: 'h1',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '>;',
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
                `
`,
                e.jsx(n.span, { 'data-line': '', children: ' ' }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: 'Page.metadata ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                e.jsxs(n.span, {
                  'data-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '  title: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"Blog"',
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
                      style: { color: '#ADBAC7' },
                      children: '  description: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: '"Blog page"',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ',',
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
                      style: { color: '#ADBAC7' },
                      children: ' Page;',
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
      e.jsx('br', {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          'This will create a route for the ',
          e.jsx(n.code, { children: 'blog' }),
          ' page with the path ',
          e.jsx(n.code, { children: '/blog' }),
          '.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          'In order to work perfectly, you need to cover a last step, by importing the Router component that represent your file-based routes into the ',
          e.jsx(n.code, { children: 'app.router.ts' }),
          ' file.',
        ],
      }),
      `
`,
      e.jsxs(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(n.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'src/app/app.router.ts',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(n.code, {
              'data-line-numbers': '',
              'data-language': 'tsx',
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
                      children: ' { RouterComponent, defineRouter } ',
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
                      children: ' Router ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#96D0FF' },
                      children: ' "virtual:rasengan/router"',
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
                      children: 'class',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: ' AppRouter',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F47067' },
                      children: ' extends',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: ' RouterComponent',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {}',
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
                      children: ' defineRouter',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
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
                      children: '  imports: [Router]',
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
                      children: '})(',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: 'AppRouter',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: ')',
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
      e.jsx(n.p, {
        children: 'Now you are ready to use the file-based routing feature 😊.',
      }),
      `
`,
      e.jsx(r, {
        status: 'info',
        title: 'Learn more about File-based routing',
        link: '/docs/routing/file-based-routing',
      }),
      `
`,
      e.jsx(n.h3, { children: 'Introduction of NavLink component' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Rasengan v1.1.0 introduces you the ',
          e.jsx(a, {
            to: '/docs/api-reference/components/navlink',
            children: e.jsx(n.strong, { children: 'NavLink' }),
          }),
          ' component. This component is a wrapper around the ',
          e.jsx(n.code, { children: '<Link>' }),
          ' component with additional props for styling ',
          e.jsx(n.code, { children: 'active' }),
          ' and ',
          e.jsx(n.code, { children: 'pending' }),
          ' states.',
        ],
      }),
      `
`,
      e.jsx(n.h3, { children: 'Introduction of @rasenganjs/i18n package' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'We are proud to announce you the release of the ',
          e.jsx(a, { to: '/packages/i18n', children: '@rasenganjs/i18n' }),
          ' package.',
        ],
      }),
      `
`,
      e.jsx(n.p, {
        children:
          'The purpose is to provide internationalization support to your application based on static files (JSON format) holding the translations.',
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          'The package is currently in ',
          e.jsx(n.code, { children: 'beta' }),
          ' and we are working on it to make it more stable and to add more features. If you want to try it out, you can install it via npm.',
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
                    children: ' @rasenganjs/i18n@1.0.0-beta.3',
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
          'For futher information, see the ',
          e.jsx(a, { to: '/packages/i18n', children: '@rasenganjs/i18n' }),
          ' package documentation.',
        ],
      }),
      `
`,
      e.jsx(n.h3, {
        children: 'Add support for shadcn into create-rasengan CLI',
      }),
      `
`,
      e.jsx(n.p, {
        children:
          'Building website is good, but doing it even faster is better.',
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          e.jsx(a, {
            to: 'https://ui.shadcn.com',
            target: '_blank',
            children: 'Shadcn',
          }),
          ' is a set of beautifully designed components that you can customize, extend, and build on.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          'In the previous version of ',
          e.jsx(a, {
            to: '/packages/create-rasengan',
            children: 'create-rasengan CLI',
          }),
          ' package, we were supporting only Tailwind CSS (both v3 and v4) and we were not supporting any UI framework.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsx(n.p, {
        children:
          'Now, we are supporting Shadcn UI, that means you have the possibility to initialize your project with Shadcn UI well configured with just one command.',
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
                    style: { color: '#6CB6FF' },
                    children: ' --with-shadcn',
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(n.p, {
        children:
          'This command will generate a new project with Shadcn UI configured and ready to use.',
      }),
      `
`,
      e.jsx(r, {
        status: 'info',
        title: 'Learn more about this feature',
        link: '/packages/create-rasengan#with-shadcn-(--with-shadcn)',
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Learn more about ',
          e.jsx(n.a, {
            href: '/docs/getting-started/introduction',
            children: 'Rasengan.js documentation',
          }),
          ' and have fun Ninja!',
        ],
      }),
    ],
  });
}
function t(s = {}) {
  const { wrapper: n } = s.components || {};
  return n ? e.jsx(n, { ...s, children: e.jsx(l, { ...s }) }) : l(s);
}
const i = {
    path: '/rasengan-v1-1-0',
    metadata: {
      title: 'Rasengan v1.1.0',
      description:
        'We are publishing Rasengan v1.1.0, a new version of the framework that introduces you the file-based routing feature.',
      openGraph: {
        title: 'Rasengan v1.1.0',
        description:
          'We are publishing Rasengan v1.1.0, a new version of the framework that introduces you the file-based routing feature.',
        url: 'https://rasengan.dev',
        image: 'https://rasengan.dev/assets/blog/rasengan-1.1.0.png',
      },
      twitter: {
        title: 'Rasengan v1.1.0',
        description:
          'We are publishing Rasengan v1.1.0, a new version of the framework that introduces you the file-based routing feature.',
        image: 'https://rasengan.dev/assets/blog/rasengan-1.1.0.png',
      },
    },
  },
  d = void 0;
t.metadata = i;
t.toc = d;
t.type = 'MDXPageComponent';
export { t as default };
