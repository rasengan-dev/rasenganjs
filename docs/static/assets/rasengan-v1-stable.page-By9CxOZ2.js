import { j as e } from './vendor-w5t4XTd4.js';
import { k as r } from './shared-components-DBceyN8p.js';
function t(s) {
  const n = {
    a: 'a',
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    li: 'li',
    p: 'p',
    pre: 'pre',
    span: 'span',
    ul: 'ul',
    ...s.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx(r, {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Rasengan v1 is now available on ',
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
          'In this post, we will talk about the new features of Rasengan v1.0.0 and how you can adopt them into your projects.',
      }),
      `
`,
      e.jsx(n.p, {
        children: 'For a list of breaking changes, see the Change log.',
      }),
      `
`,
      e.jsx(n.h2, { children: "What's new in Rasengan v1.0.0?" }),
      `
`,
      e.jsx(n.h3, { children: 'Code base refactor' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          `We have refactored the code base to make it more readable and maintainable. At the beginning the project was organized into different github repositories, each one representing a different package.
Now, the code base is organized into a single repository managed by `,
          e.jsx(n.a, {
            href: 'https://pnpm.io/workspaces',
            children: e.jsx(n.code, { children: 'pnpm workspaces' }),
          }),
          ' as a ',
          e.jsx(n.code, { children: 'mono-repo' }),
          '. This allows us to have a single repository with all the packages and dependencies.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Also, the initial code base of ',
          e.jsx(n.code, { children: 'rasenganjs' }),
          ' has been rewritten based on the existing logic but by organizing the different features under a specific folder and well structured code, allowing contributors to contribute to the project in a easy way.',
        ],
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'So, to contribute to the project, you can clone the repository and run ',
          e.jsx(n.code, { children: 'pnpm install' }),
          ' to install all the dependencies of the different packages and other.',
        ],
      }),
      `
`,
      e.jsx(n.h3, { children: 'SSR and CSR' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Rasengan.js was designed to support ',
          e.jsx(n.code, { children: 'SSR' }),
          ' since the beginning. The main reason for this is that we wanted to empower developers to create high-quality web applications that are fast, performant and ',
          e.jsx(n.code, { children: 'SEO' }),
          ` friendly.
But we have discovered that there are some limitations with the current implementation of `,
          e.jsx(n.code, { children: 'SSR' }),
          ' in Rasengan.js and also the ',
          e.jsx(n.code, { children: 'SSR' }),
          " mode is not benefit for all the use cases, that's why we have improved the ",
          e.jsx(n.code, { children: 'SSR' }),
          " mode and we've introduced the ",
          e.jsx(n.code, { children: 'CSR' }),
          ' mode.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Now, you can use ',
          e.jsx(n.code, { children: 'SSR' }),
          ' or ',
          e.jsx(n.code, { children: 'CSR' }),
          ' mode depending on your use case. ',
          e.jsx(n.code, { children: 'SSR' }),
          " mode is the default mode and it's the best option for most of the use cases. ",
          e.jsx(n.code, { children: 'CSR' }),
          " mode is the alternative mode and it's the best option for use cases that require more control over the rendering process.",
        ],
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'To configure the mode, you can use the ',
          e.jsx(n.code, { children: 'ssr' }),
          ' option into your ',
          e.jsx(n.code, { children: 'rasengan.config.ts' }),
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
            'data-language': 'js',
            'data-theme': 'github-dark-dimmed',
            children: 'rasengan.config.js',
          }),
          e.jsx(n.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'js',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(n.code, {
              'data-language': 'js',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
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
                      children: " 'rasengan'",
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
                e.jsxs(n.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    e.jsx(n.span, {
                      style: { color: '#ADBAC7' },
                      children: '  ssr: ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#6CB6FF' },
                      children: 'false',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#F69D50' },
                      children: ', ',
                    }),
                    e.jsx(n.span, {
                      style: { color: '#768390' },
                      children: '// CSR mode. Default: true',
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
      e.jsx(n.h4, { children: 'SSR mode' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'The ',
          e.jsx(n.code, { children: 'SSR' }),
          ' mode (Server Side Rendering) in Rasengan.js depends on a server part powered by ',
          e.jsx(n.a, {
            href: 'https://expressjs.com/en/starter/installing.html',
            children: e.jsx(n.code, { children: 'express' }),
          }),
          ' coupled to the ',
          e.jsx(n.a, {
            href: 'https://vite.dev/guide/api-environment.html',
            children: e.jsx(n.code, { children: 'vite Environment API' }),
          }),
          ', the ',
          e.jsx(n.a, {
            href: 'https://react.dev/reference/react-dom/server',
            children: e.jsx(n.code, { children: 'react-dom/server' }),
          }),
          ' module and ',
          e.jsx(n.a, {
            href: 'https://reactrouter.com/start/data/custom#server-rendering',
            children: e.jsx(n.code, { children: 'React Router Static Router' }),
          }),
          '.',
        ],
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'The main goal of the ',
          e.jsx(n.code, { children: 'SSR' }),
          ' mode is to provide a fast and performant way to render the application on the server side. This behavior is so useful for SEO purposes and for performance reasons.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          'With ',
          e.jsx(n.code, { children: 'SSR' }),
          ' mode enabled, the application is SEO friendly allowing search engines to index the application pages and to provide a better ranking in search results.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Hosting this kind online require a server that can handle the requests and the responses. This is the reason why we have introduced the ',
          e.jsxs(n.a, {
            href: '#adapters',
            children: [
              e.jsx(n.code, { children: 'vercel' }),
              ' and ',
              e.jsx(n.code, { children: 'node' }),
              ' adapters',
            ],
          }),
          ` to make it easier to deploy the application on a server.
We plan to add more adapters in the future.`,
        ],
      }),
      `
`,
      e.jsx(n.h4, { children: 'CSR mode' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'The ',
          e.jsx(n.code, { children: 'CSR' }),
          ' mode (Client Side Rendering) in Rasengan.js is the alternative mode to the ',
          e.jsx(n.code, { children: 'SSR' }),
          " mode. This mode is useful when you need to have more control over the rendering process and don't want to rely on the server side or you don't have to worry about SEO.",
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          'With ',
          e.jsx(n.code, { children: 'CSR' }),
          " mode enabled, your application's pages are generated on the client side and the server only serves the initial HTML and the JavaScript bundle. All the requests are handled by the client on the browser.",
        ],
      }),
      `
`,
      e.jsx(n.p, { children: 'If you want to build application like:' }),
      `
`,
      e.jsxs(n.ul, {
        children: [
          `
`,
          e.jsx(n.li, { children: 'Single Page Applications (SPA)' }),
          `
`,
          e.jsx(n.li, { children: 'Administration Dashboard' }),
          `
`,
          e.jsx(n.li, { children: 'Chatbot' }),
          `
`,
          e.jsx(n.li, { children: 'etc.' }),
          `
`,
        ],
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'then you should use the ',
          e.jsx(n.code, { children: 'CSR' }),
          ' mode.',
        ],
      }),
      `
`,
      e.jsx(n.h3, {
        children: 'Update to React 19, Vite 6 and React Router 7',
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'The initial version of Rasengan.js was built on top of ',
          e.jsx(n.code, { children: 'React 18' }),
          ', ',
          e.jsx(n.code, { children: 'Vite 5' }),
          ' and ',
          e.jsx(n.code, { children: 'React Router 6' }),
          '. But now, we have updated the dependencies to the latest versions of ',
          e.jsx(n.code, { children: 'React 19' }),
          ', ',
          e.jsx(n.code, { children: 'Vite 6' }),
          ' and ',
          e.jsx(n.code, { children: 'React Router 7' }),
          '.',
        ],
      }),
      `
`,
      e.jsx(n.h4, { children: 'React 19' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'React 19 is the latest version of React and it brings a lot of improvements and new features. You can read more about the new features in the ',
          e.jsx(n.a, {
            href: 'https://react.dev/blog/2024/12/05/react-19',
            children: 'React 19 release notes',
          }),
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
          "Actually, Rasengan.js doesn't support all the new features of React 19, like ",
          e.jsx(n.code, { children: 'RSC' }),
          ' (React Server Components), ',
          e.jsx(n.code, { children: 'RC' }),
          ' (React Compiler) and others. But we plan to support them in the future.',
        ],
      }),
      `
`,
      e.jsx(n.h4, { children: 'Vite 6' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'The more important change of Vite 6 is the ',
          e.jsx(n.code, { children: 'Environment API' }),
          ' that allows us to manage the different environments in Rasengan.js more easily. The ',
          e.jsx(n.code, { children: 'build process' }),
          ' is now more flexible and depending on the mode (SSR or CSR) the build process will be different.',
        ],
      }),
      `
`,
      e.jsx(n.p, {
        children: 'Vite 6 allows Rasengan.js to be very fast and performant.',
      }),
      `
`,
      e.jsx(n.h4, { children: 'React Router 7' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          "There's no big changes in React Router 7 since the v6 for Rasengan.js. But we have improved the ",
          e.jsx(n.code, { children: 'Static Router' }),
          ' to be more flexible and to support the new features of React Router 7.',
        ],
      }),
      `
`,
      e.jsx(n.h3, { children: 'TailwindCSS v4 support' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          e.jsx(n.code, { children: 'TailwindCSS' }),
          " is a popular CSS framework that is used by many developers. It's a great tool to create beautiful and responsive websites.",
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Rasengan.js now supports ',
          e.jsx(n.code, { children: 'TailwindCSS' }),
          ' v4 and can be accessed from the ',
          e.jsx(n.code, { children: 'create-rasengan' }),
          ' CLI directly.',
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
          'This command will prompt you to select ',
          e.jsx(n.code, { children: 'tailwindcss' }),
          ' as a template and ask you to choose the version (v3 or v4).',
        ],
      }),
      `
`,
      e.jsx(n.h3, { children: 'MDX support' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Supporting ',
          e.jsx(n.code, { children: 'MDX' }),
          ' was a big step for Rasengan.js. MDX is a powerful tool that allows you to write your components in a markdown file and use them in your application.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          'We have improved the ',
          e.jsx(n.code, { children: 'MDX' }),
          ' support in Rasengan.js and now you can use ',
          e.jsx(n.code, { children: 'MDX' }),
          ' in your application via the ',
          e.jsx(n.a, {
            href: '/packages/mdx',
            children: e.jsx(n.code, { children: '@rasenganjs/mdx' }),
          }),
          ' package.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsx(n.p, {
        children:
          'This new package allows us to rebuild the documentation of Rasengan.js migrating from Next.js to Rasengan.js 🔥.',
      }),
      `
`,
      e.jsx(n.h3, { children: 'create-rasengan CLI improvements' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'We have improved the ',
          e.jsx(n.a, {
            href: '/packages/create-rasengan',
            children: e.jsx(n.code, { children: 'create-rasengan' }),
          }),
          ' CLI to be more flexible and to support more templates. Actually, the CLI supports the following templates:',
        ],
      }),
      `
`,
      e.jsxs(n.ul, {
        children: [
          `
`,
          e.jsx(n.li, { children: e.jsx(n.code, { children: 'blank-ts' }) }),
          `
`,
          e.jsx(n.li, { children: e.jsx(n.code, { children: 'blank-js' }) }),
          `
`,
          e.jsx(n.li, {
            children: e.jsx(n.code, { children: 'tailwindcss-js-v3' }),
          }),
          `
`,
          e.jsx(n.li, {
            children: e.jsx(n.code, { children: 'tailwindcss-ts-v3' }),
          }),
          `
`,
          e.jsx(n.li, {
            children: e.jsx(n.code, { children: 'tailwindcss-js-v4' }),
          }),
          `
`,
          e.jsx(n.li, {
            children: e.jsx(n.code, { children: 'tailwindcss-ts-v4' }),
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(n.p, { children: 'We plan to add more templates in the future.' }),
      `
`,
      e.jsx(n.h3, {
        children: 'new adapters for vercel and node server [#adapters]',
      }),
      `
`,
      e.jsx(n.p, {
        children:
          'Adapters are a way to make it easier to deploy your application. They are just modules that allow your application to work fine on a specific server.',
      }),
      `
`,
      e.jsx(n.p, { children: 'We have added two new adapters:' }),
      `
`,
      e.jsxs(n.ul, {
        children: [
          `
`,
          e.jsxs(n.li, {
            children: [
              e.jsx(n.code, { children: 'vercel' }),
              ': ',
              e.jsx(n.a, {
                href: '/packages/vercel',
                children: e.jsx(n.code, { children: '@rasenganjs/vercel' }),
              }),
            ],
          }),
          `
`,
          e.jsxs(n.li, {
            children: [
              e.jsx(n.code, { children: 'node' }),
              ': ',
              e.jsx(n.a, {
                href: '/packages/serve',
                children: e.jsx(n.code, { children: '@rasenganjs/serve' }),
              }),
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'If you want to deploy your application on ',
          e.jsx(n.code, { children: 'vercel' }),
          ', using the ',
          e.jsx(n.code, { children: 'vercel' }),
          " adapter is the best way to do it. It's a simple and fast way to deploy your application on ",
          e.jsx(n.code, { children: 'vercel' }),
          '.',
        ],
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'The ',
          e.jsx(n.code, { children: 'node' }),
          ' adapter is simpler than the ',
          e.jsx(n.code, { children: 'vercel' }),
          " adapter. It's a good way to deploy your application on a server that you own.",
        ],
      }),
      `
`,
      e.jsx(n.h3, { children: 'Image component improvements' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Rasengan.js provides a component to display images in your application coming from ',
          e.jsx(n.a, {
            href: '/packages/image',
            children: e.jsx(n.code, { children: '@rasenganjs/image' }),
          }),
          ' package.',
        ],
      }),
      `
`,
      e.jsx(n.p, {
        children:
          'For performance optimization and UX Experience we have added some warning messages when the Image component is not well configured.',
      }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'We have also added a ',
          e.jsx(n.code, { children: 'fallbackSrc' }),
          ' prop to the Image component to allow you to display a fallback image when the main image is not loaded.',
        ],
      }),
      `
`,
      e.jsx(n.h3, { children: 'New documentation' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'As mentioned above in the ',
          e.jsx(n.code, { children: 'MDX' }),
          ' section, we have migrated the documentation of Rasengan.js from Next.js to Rasengan.js.',
        ],
      }),
      `
`,
      e.jsx('br', {}),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Learn more about ',
          e.jsx(n.a, {
            href: '/docs/getting-started/installation',
            children: 'Rasengan.js documentation',
          }),
          ' and have fun Ninja!',
        ],
      }),
    ],
  });
}
function a(s = {}) {
  const { wrapper: n } = s.components || {};
  return n ? e.jsx(n, { ...s, children: e.jsx(t, { ...s }) }) : t(s);
}
const o = {
    path: '/rasengan-v1-stable',
    metadata: {
      title: 'Rasengan v1 Stable',
      description:
        'Rasengan v1 is now stable and ready for production use. This release includes a lot of new features and code base improvements',
      openGraph: {
        title: 'Rasengan v1 Stable',
        description:
          'Rasengan v1 is now stable and ready for production use. This release includes a lot of new features and code base improvements',
        url: 'https://rasengan.dev',
        image: 'https://rasengan.dev/assets/blog/rasengan-stable1.png',
      },
      twitter: {
        title: 'Rasengan v1 Stable',
        description:
          'Rasengan v1 is now stable and ready for production use. This release includes a lot of new features and code base improvements',
        card: 'summary_large_image',
        image: 'https://rasengan.dev/assets/blog/rasengan-stable1.png',
      },
    },
  },
  i = void 0;
a.metadata = o;
a.toc = i;
a.type = 'MDXPageComponent';
export { a as default };
