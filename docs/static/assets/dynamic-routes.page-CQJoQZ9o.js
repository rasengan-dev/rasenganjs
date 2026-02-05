import { j as e } from './vendor-CfbgIbdB.js';
import { T as l, P as c } from './shared-components-CkrC6jAk.js';
function r(n) {
  const s = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    mark: 'mark',
    p: 'p',
    pre: 'pre',
    span: 'span',
    ...n.components,
  };
  return (
    l || i('Tabs', !1),
    l.Item || i('Tabs.Item', !0),
    e.jsxs(e.Fragment, {
      children: [
        e.jsx('span', {
          className: 'text-[12px] font-mono-regular text-foreground/60',
          children: e.jsx(s.p, { children: 'CORE CONCEPTS' }),
        }),
        `
`,
        e.jsx(s.h1, { children: 'Dynamic Routes' }),
        `
`,
        e.jsxs(s.p, {
          children: [
            e.jsx(s.code, { children: 'Dynamic Routes' }),
            ` are routes that are generated at runtime. This is useful when you have a large number of pages that are similar, but not exactly the same.
For example, you might want to create a page for each user on your website. Instead of creating a page for each user, you can create a single page that uses a dynamic route to load the user's data.`,
          ],
        }),
        `
`,
        e.jsx(s.h2, { children: 'Usage' }),
        `
`,
        e.jsx(s.h3, { children: 'Creating a Dynamic Route' }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'Here is an example of a ',
            e.jsx(s.code, { children: 'Dynamic Route' }),
            " to display a user's profile page.",
          ],
        }),
        `
`,
        e.jsxs(l, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            e.jsx(l.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'profile.page.tsx',
                  }),
                  e.jsx(s.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsxs(s.code, {
                      'data-line-numbers': '',
                      'data-language': 'tsx',
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
                              children: ' { PageComponent } ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "rasengan"',
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
                              children: 'const',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: ' Profile',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: ' PageComponent',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ' =',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' () ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=>',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '      <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>User Profile</',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '    </',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(s.span, {
                          'data-line': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: '  )',
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
                        `
`,
                        e.jsx(s.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: 'Profile.path ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/profile/:id"',
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
                              style: { color: '#ADBAC7' },
                              children: 'Profile.metadata ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: '  title: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"Profile"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
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
                              children: '  description: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"User Profile"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
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
                              style: { color: '#ADBAC7' },
                              children: ' Profile;',
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
            e.jsx(l.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'src/app/profile.page.jsx',
                  }),
                  e.jsx(s.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsxs(s.code, {
                      'data-line-numbers': '',
                      'data-language': 'tsx',
                      'data-theme': 'github-dark-dimmed',
                      style: { display: 'grid' },
                      'data-line-numbers-max-digits': '2',
                      children: [
                        e.jsxs(s.span, {
                          'data-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'const',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: ' Profile',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ' =',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' () ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=>',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {  ',
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
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '      <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>User Profile</',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '    </',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(s.span, {
                          'data-line': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: '  )',
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
                        `
`,
                        e.jsx(s.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: 'Profile.path ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/profile/:id"',
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
                              style: { color: '#ADBAC7' },
                              children: 'Profile.metadata ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: '  title: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"Profile"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
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
                              children: '  description: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"User Profile"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
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
                              style: { color: '#ADBAC7' },
                              children: ' Profile;',
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
          ],
        }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'In the example above, we have created a ',
            e.jsx(s.code, { children: 'Dynamic Route' }),
            ` to display a user's profile page.
The `,
            e.jsx(s.code, { children: ':id' }),
            " in the route path is a dynamic parameter that can be used to load the user's data based on his ",
            e.jsx(s.code, { children: 'userId' }),
            '.',
          ],
        }),
        `
`,
        e.jsx(s.h3, { children: 'Accessing Dynamic Route Parameters' }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'To access the dynamic route parameters, you can use the ',
            e.jsx(s.code, { children: 'useParams' }),
            ' hook.',
          ],
        }),
        `
`,
        e.jsxs(l, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            e.jsx(l.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'profile.page.tsx',
                  }),
                  e.jsx(s.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsxs(s.code, {
                      'data-line-numbers': '',
                      'data-language': 'tsx',
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
                              children: ' { PageComponent, ',
                            }),
                            e.jsx(s.mark, {
                              'data-highlighted-chars': '',
                              children: e.jsx(s.span, {
                                style: { color: '#ADBAC7' },
                                children: 'useParams',
                              }),
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' } ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "rasengan"',
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
                              children: 'const',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: ' Profile',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: ' PageComponent',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ' =',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' () ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=>',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              style: { color: '#F47067' },
                              children: '  const',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' { ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#6CB6FF' },
                              children: 'id',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' } ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: ' ',
                            }),
                            e.jsx(s.mark, {
                              'data-highlighted-chars': '',
                              children: e.jsx(s.span, {
                                style: { color: '#DCBDFB' },
                                children: 'useParams',
                              }),
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '();',
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
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '      <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>User Profile</',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              style: { color: '#ADBAC7' },
                              children: '      <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'p',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>User ID: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '{',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: 'id',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '}',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '</',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'p',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '    </',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(s.span, {
                          'data-line': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: '  )',
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
                        `
`,
                        e.jsx(s.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: 'Profile.path ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/profile/:id"',
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
                              style: { color: '#ADBAC7' },
                              children: 'Profile.metadata ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: '  title: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"Profile"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
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
                              children: '  description: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"User Profile"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
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
                              style: { color: '#ADBAC7' },
                              children: ' Profile;',
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
            e.jsx(l.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'profile.page.jsx',
                  }),
                  e.jsx(s.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsxs(s.code, {
                      'data-line-numbers': '',
                      'data-language': 'tsx',
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
                              children: ' { ',
                            }),
                            e.jsx(s.mark, {
                              'data-highlighted-chars': '',
                              children: e.jsx(s.span, {
                                style: { color: '#ADBAC7' },
                                children: 'useParams',
                              }),
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' } ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "rasengan"',
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
                              children: 'const',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: ' Profile',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ' =',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' () ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=>',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              style: { color: '#F47067' },
                              children: '  const',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' { ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#6CB6FF' },
                              children: 'id',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' } ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: ' ',
                            }),
                            e.jsx(s.mark, {
                              'data-highlighted-chars': '',
                              children: e.jsx(s.span, {
                                style: { color: '#DCBDFB' },
                                children: 'useParams',
                              }),
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '();',
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
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '      <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>User Profile</',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              style: { color: '#ADBAC7' },
                              children: '      <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'p',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>User ID: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '{',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: 'id',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '}',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '</',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'p',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '    </',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(s.span, {
                          'data-line': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: '  )',
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
                        `
`,
                        e.jsx(s.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: 'Profile.path ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/profile/:id"',
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
                              style: { color: '#ADBAC7' },
                              children: 'Profile.metadata ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: '  title: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"Profile"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
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
                              children: '  description: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"User Profile"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
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
                              style: { color: '#ADBAC7' },
                              children: ' Profile;',
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
          ],
        }),
        `
`,
        `
`,
        e.jsx(s.h3, { children: 'Dynamic Route with Optional Parameters' }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'You can also create a ',
            e.jsx(s.code, { children: 'Dynamic Route' }),
            ' with optional parameters.',
          ],
        }),
        `
`,
        e.jsxs(l, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            e.jsx(l.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'profile.page.tsx',
                  }),
                  e.jsx(s.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsxs(s.code, {
                      'data-line-numbers': '',
                      'data-language': 'tsx',
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
                              children: ' { PageComponent, useParams } ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "rasengan"',
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
                              children: 'const',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: ' Profile',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: ' PageComponent',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ' =',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' () ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=>',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: '  const',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' { ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#6CB6FF' },
                              children: 'id',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' } ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: ' useParams',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '();',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '  console.',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: 'log',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '(id) ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#768390' },
                              children: '// id can be undefined',
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
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '      <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>User Profile</',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '    </',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(s.span, {
                          'data-line': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: '  )',
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
                        `
`,
                        e.jsx(s.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: 'Profile.path ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/profile/:id?"',
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
                              style: { color: '#ADBAC7' },
                              children: 'Profile.metadata ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: '  title: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"Profile"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
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
                              children: '  description: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"User Profile"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
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
                              style: { color: '#ADBAC7' },
                              children: ' Profile;',
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
            e.jsx(l.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'profile.page.jsx',
                  }),
                  e.jsx(s.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsxs(s.code, {
                      'data-line-numbers': '',
                      'data-language': 'tsx',
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
                              children: ' { useParams } ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "rasengan"',
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
                              children: 'const',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: ' Profile',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ' =',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' () ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=>',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: '  const',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' { ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#6CB6FF' },
                              children: 'id',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' } ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: ' useParams',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '();',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '  console.',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: 'log',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '(id) ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#768390' },
                              children: '// id can be undefined',
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
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '      <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>User Profile</',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '    </',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(s.span, {
                          'data-line': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: '  )',
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
                        `
`,
                        e.jsx(s.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: 'Profile.path ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/profile/:id?"',
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
                              style: { color: '#ADBAC7' },
                              children: 'Profile.metadata ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: '  title: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"Profile"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
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
                              children: '  description: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"User Profile"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
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
                              style: { color: '#ADBAC7' },
                              children: ' Profile;',
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
          ],
        }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'In the example above, we have created a ',
            e.jsx(s.code, { children: 'Dynamic Route' }),
            ' with an optional parameter. The ',
            e.jsx(s.code, { children: '?' }),
            ' at the end of the route parameter makes it optional.',
          ],
        }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'By doing like this, when we access the ',
            e.jsx(s.code, { children: '/profile' }),
            ' route, the ',
            e.jsx(s.code, { children: 'id' }),
            ' will be ',
            e.jsx(s.code, { children: 'undefined' }),
            " and we won't get a ",
            e.jsx(s.code, { children: '404 error' }),
            '. But in the case where the ',
            e.jsx(s.code, { children: 'id' }),
            ' is not ',
            e.jsx(s.code, { children: 'optional' }),
            `,
navigating to `,
            e.jsx(s.code, { children: '/profile' }),
            ' will result in a ',
            e.jsx(s.code, { children: '404 error' }),
            '.',
          ],
        }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'You can have ',
            e.jsx(s.code, { children: 'optional static segments' }),
            ' too.',
          ],
        }),
        `
`,
        e.jsxs(s.figure, {
          'data-rehype-pretty-code-figure': '',
          children: [
            e.jsx(s.figcaption, {
              'data-rehype-pretty-code-title': '',
              'data-language': 'ts',
              'data-theme': 'github-dark-dimmed',
              children: 'src/app/profile.page.tsx',
            }),
            e.jsx(s.pre, {
              style: { backgroundColor: '#22272e', color: '#adbac7' },
              tabIndex: '0',
              'data-language': 'ts',
              'data-theme': 'github-dark-dimmed',
              children: e.jsx(s.code, {
                'data-line-numbers': '',
                'data-language': 'ts',
                'data-theme': 'github-dark-dimmed',
                style: { display: 'grid' },
                'data-line-numbers-max-digits': '1',
                children: e.jsxs(s.span, {
                  'data-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'Profile.path ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "/profile/:id?/',
                    }),
                    e.jsx(s.mark, {
                      'data-highlighted-chars': '',
                      children: e.jsx(s.span, {
                        style: { color: '#96D0FF' },
                        children: 'edit?',
                      }),
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
        `
`,
        e.jsx(s.h3, { children: 'Dynamic Route with Multiple Parameters' }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'You can also create a ',
            e.jsx(s.code, { children: 'Dynamic Route' }),
            ' with multiple parameters.',
          ],
        }),
        `
`,
        e.jsxs(l, {
          tabs: [{ title: 'TypeScript' }, { title: 'JavaScript' }],
          activeIndex: 0,
          children: [
            e.jsx(l.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'profile.page.tsx',
                  }),
                  e.jsx(s.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsxs(s.code, {
                      'data-line-numbers': '',
                      'data-language': 'tsx',
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
                              children: ' { PageComponent, useParams } ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "rasengan"',
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
                              children: 'const',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: ' Profile',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ':',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F69D50' },
                              children: ' PageComponent',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ' =',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' () ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=>',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: '  const',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' { ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#6CB6FF' },
                              children: 'id',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ', ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#6CB6FF' },
                              children: 'name',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' } ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: ' useParams',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '();',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '  console.',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: 'log',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '(id, name) ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#768390' },
                              children: '// id and name can be undefined',
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
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '      <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>User Profile</',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '    </',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(s.span, {
                          'data-line': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: '  )',
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
                        `
`,
                        e.jsx(s.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: 'Profile.path ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/profile/:id?/:name?"',
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
                              style: { color: '#ADBAC7' },
                              children: 'Profile.metadata ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: '  title: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"Profile"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
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
                              children: '  description: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"User Profile"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
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
                              style: { color: '#ADBAC7' },
                              children: ' Profile;',
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
            e.jsx(l.Item, {
              children: e.jsxs(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: [
                  e.jsx(s.figcaption, {
                    'data-rehype-pretty-code-title': '',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: 'profile.page.jsx',
                  }),
                  e.jsx(s.pre, {
                    style: { backgroundColor: '#22272e', color: '#adbac7' },
                    tabIndex: '0',
                    'data-language': 'tsx',
                    'data-theme': 'github-dark-dimmed',
                    children: e.jsxs(s.code, {
                      'data-line-numbers': '',
                      'data-language': 'tsx',
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
                              children: ' { useParams } ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: 'from',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "rasengan"',
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
                              children: 'const',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: ' Profile',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: ' =',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' () ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=>',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: '  const',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' { ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#6CB6FF' },
                              children: 'id',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ', ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#6CB6FF' },
                              children: 'name',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' } ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: ' useParams',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '();',
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
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '  console.',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#DCBDFB' },
                              children: 'log',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '(id, name) ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#768390' },
                              children: '// id and name can be undefined',
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
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '      <',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>User Profile</',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'h1',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
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
                              children: '    </',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#8DDB8C' },
                              children: 'div',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: '>',
                            }),
                          ],
                        }),
                        `
`,
                        e.jsx(s.span, {
                          'data-line': '',
                          children: e.jsx(s.span, {
                            style: { color: '#ADBAC7' },
                            children: '  )',
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
                        `
`,
                        e.jsx(s.span, { 'data-line': '', children: ' ' }),
                        `
`,
                        e.jsxs(s.span, {
                          'data-line': '',
                          'data-highlighted-line': '',
                          children: [
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: 'Profile.path ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: ' "/profile/:id?/:name?"',
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
                              style: { color: '#ADBAC7' },
                              children: 'Profile.metadata ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#F47067' },
                              children: '=',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ' {',
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
                              children: '  title: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"Profile"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
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
                              children: '  description: ',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#96D0FF' },
                              children: '"User Profile"',
                            }),
                            e.jsx(s.span, {
                              style: { color: '#ADBAC7' },
                              children: ',',
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
                              style: { color: '#ADBAC7' },
                              children: ' Profile;',
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
          ],
        }),
        `
`,
        e.jsxs(s.p, {
          children: [
            'You can chain multiple parameters in a ',
            e.jsx(s.code, { children: 'Dynamic Route' }),
            ' by separating them with a ',
            e.jsx(s.code, { children: '/' }),
            '.',
          ],
        }),
        `
`,
        e.jsx(c, {
          prev: {
            href: '/docs/routing/linking-and-navigation',
            label: 'Linking and Navigation',
          },
          next: { href: '/docs/routing/active-link', label: 'Active Links' },
        }),
      ],
    })
  );
}
function a(n = {}) {
  const { wrapper: s } = n.components || {};
  return s ? e.jsx(s, { ...n, children: e.jsx(r, { ...n }) }) : r(n);
}
function i(n, s) {
  throw new Error(
    'Expected ' +
      (s ? 'component' : 'object') +
      ' `' +
      n +
      '` to be defined: you likely forgot to import, pass, or provide it.'
  );
}
const d = {
    path: '/dynamic-routes',
    metadata: {
      title: 'Dynamic Routes - Routing | Core concepts | Rasengan.js',
      description: 'Learn how to create a Dynamic Route in Rasengan.js.',
    },
  },
  t = [
    {
      title: 'Usage',
      anchor: { id: 'usage', text: 'Usage' },
      level: 2,
      children: [
        {
          title: 'Creating a Dynamic Route',
          anchor: {
            id: 'creating-a-dynamic-route',
            text: 'Creating a Dynamic Route',
          },
          level: 3,
        },
        {
          title: 'Accessing Dynamic Route Parameters',
          anchor: {
            id: 'accessing-dynamic-route-parameters',
            text: 'Accessing Dynamic Route Parameters',
          },
          level: 3,
        },
        {
          title: 'Dynamic Route with Optional Parameters',
          anchor: {
            id: 'dynamic-route-with-optional-parameters',
            text: 'Dynamic Route with Optional Parameters',
          },
          level: 3,
        },
        {
          title: 'Dynamic Route with Multiple Parameters',
          anchor: {
            id: 'dynamic-route-with-multiple-parameters',
            text: 'Dynamic Route with Multiple Parameters',
          },
          level: 3,
        },
      ],
    },
  ];
a.metadata = d;
a.toc = t;
a.type = 'MDXPageComponent';
export { a as default };
