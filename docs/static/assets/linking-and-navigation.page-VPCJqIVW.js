import { j as s } from './vendor-w5t4XTd4.js';
import { P as r } from './shared-components-DBceyN8p.js';
function a(n) {
  const e = {
    a: 'a',
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    li: 'li',
    mark: 'mark',
    p: 'p',
    pre: 'pre',
    span: 'span',
    ul: 'ul',
    ...n.components,
  };
  return s.jsxs(s.Fragment, {
    children: [
      s.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        children: s.jsx(e.p, { children: 'CORE CONCEPTS' }),
      }),
      `
`,
      s.jsx(e.h1, { children: 'Linking and Navigation' }),
      `
`,
      s.jsx(e.p, {
        children:
          'There are two ways to navigate between routes in Rasengan.js:',
      }),
      `
`,
      s.jsxs(e.ul, {
        children: [
          `
`,
          s.jsxs(e.li, {
            children: [
              'Using the ',
              s.jsx(e.a, {
                href: '/docs/core/routing/linking#link-component',
                children: s.jsx(e.code, { children: '<Link>' }),
              }),
              ' Component',
            ],
          }),
          `
`,
          s.jsxs(e.li, {
            children: [
              'Using the ',
              s.jsx(e.a, {
                href: '/docs/core/routing/linking#useNavigate',
                children: s.jsx(e.code, { children: 'useNavigate' }),
              }),
              ' hook',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      s.jsx(e.p, {
        children:
          'This page will go through how to use each of these options, and dive deeper into how navigation works.',
      }),
      `
`,
      s.jsx(e.h2, { children: 'Using the Link Component' }),
      `
`,
      s.jsxs(e.p, {
        children: [
          'The ',
          s.jsx(e.code, { children: '<Link>' }),
          ` component is a React component that allows you to navigate between routes in your application.
It is the recommended way to navigate between routes in Rasengan.js.`,
        ],
      }),
      `
`,
      s.jsx(e.h3, { children: 'Example 1: Basic usage' }),
      `
`,
      s.jsxs(e.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          s.jsx(e.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'src/app/home.page.tsx',
          }),
          s.jsx(e.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: s.jsxs(e.code, {
              'data-line-numbers': '',
              'data-language': 'tsx',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              'data-line-numbers-max-digits': '2',
              children: [
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' React ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: ' "react"',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { PageComponent, ',
                    }),
                    s.jsx(e.mark, {
                      'data-highlighted-chars': '',
                      children: s.jsx(e.span, {
                        style: { color: '#ADBAC7' },
                        children: 'Link',
                      }),
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' } ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: ' "rasengan"',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'const',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' Home',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: ' PageComponent',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '  return',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' (',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '    <',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '      <',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'h1',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>Home</',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'h1',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '      <',
                    }),
                    s.jsx(e.mark, {
                      'data-highlighted-chars': '',
                      children: s.jsx(e.span, {
                        style: { color: '#8DDB8C' },
                        children: 'Link',
                      }),
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' to',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: '"/dashboard"',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>Go to Dashboard</',
                    }),
                    s.jsx(e.mark, {
                      'data-highlighted-chars': '',
                      children: s.jsx(e.span, {
                        style: { color: '#8DDB8C' },
                        children: 'Link',
                      }),
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '    </',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '  );',
                  }),
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '}',
                  }),
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: 'Home.path ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: ' "/"',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: 'Home.metadata ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '  title: ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: '"Home"',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ',',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '  description: ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: '"Home Page"',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ',',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '};',
                  }),
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'export',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' default',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' Home;',
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
      s.jsxs(e.p, {
        children: [
          'There are other option props available to ',
          s.jsx(e.code, { children: '<Link />' }),
          ', see the ',
          s.jsx(e.a, {
            href: '/docs/api-reference/components/link-component',
            children: s.jsx(e.code, { children: 'API Reference' }),
          }),
          ' for more details.',
        ],
      }),
      `
`,
      s.jsx(e.h3, { children: 'Examples 2: Using dynamic routes' }),
      `
`,
      s.jsxs(e.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          s.jsx(e.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'src/components/Posts.tsx',
          }),
          s.jsx(e.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: s.jsxs(e.code, {
              'data-line-numbers': '',
              'data-language': 'tsx',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              'data-line-numbers-max-digits': '2',
              children: [
                s.jsxs(e.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { ',
                    }),
                    s.jsx(e.mark, {
                      'data-highlighted-chars': '',
                      children: s.jsx(e.span, {
                        style: { color: '#ADBAC7' },
                        children: 'Link',
                      }),
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' } ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: ' "rasengan"',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'type',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: ' Props',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: '  posts',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: '    id',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' number',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: '    title',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' string',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '  }[];',
                  }),
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '};',
                  }),
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'export',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' default',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' function',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' PostList',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: '({ posts }',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: ' Props) ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '{',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '  return',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' (',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '    <',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '      {',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: 'posts.',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: 'map',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '((',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 'post',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ') ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' (',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '        <',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' key',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: 'post.id',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '          <',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'h2',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '{',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: 'post.title',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '</',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'h2',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '          <',
                    }),
                    s.jsx(e.mark, {
                      'data-highlighted-chars': '',
                      children: s.jsx(e.span, {
                        style: { color: '#8DDB8C' },
                        children: 'Link',
                      }),
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' to',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: '`/post/${',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: 'post',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: '.',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: 'id',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: '}`',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>Read More</',
                    }),
                    s.jsx(e.mark, {
                      'data-highlighted-chars': '',
                      children: s.jsx(e.span, {
                        style: { color: '#8DDB8C' },
                        children: 'Link',
                      }),
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '        </',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '      ))',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '    </',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '  );',
                  }),
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '};',
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
      `
`,
      s.jsx(e.h4, { children: 'Checking active links' }),
      `
`,
      s.jsxs(e.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          s.jsx(e.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'src/components/ActiveLink.tsx',
          }),
          s.jsx(e.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: s.jsxs(e.code, {
              'data-line-numbers': '',
              'data-language': 'tsx',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              'data-line-numbers-max-digits': '2',
              children: [
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' React ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: ' "react"',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { Link, useLocation } ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: ' "rasengan"',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'type',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: ' Props',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: '  to',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' string',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: '  children',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: ' React',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '.',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: 'ReactNode',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '};',
                  }),
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'export',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' default',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' function',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' ActiveLink',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: '({ to, children }',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: ' Props) ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '{',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '  const',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: 'pathname',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' } ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' useLocation',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '();',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '  return',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' (',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '    <',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'Link',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' to',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: 'to',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: '`${',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: 'pathname',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' ===',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' to',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' ?',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: ' "active"',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' :',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: ' ""}`',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '      {',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: 'children',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '    </',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'Link',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '  );',
                  }),
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
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
      s.jsx(e.h4, { children: 'Scrolling to an id' }),
      `
`,
      s.jsx(e.figure, {
        'data-rehype-pretty-code-figure': '',
        children: s.jsx(e.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'tsx',
          'data-theme': 'github-dark-dimmed',
          children: s.jsx(e.code, {
            'data-line-numbers': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            'data-line-numbers-max-digits': '1',
            children: s.jsxs(e.span, {
              'data-line': '',
              children: [
                s.jsx(e.span, { style: { color: '#ADBAC7' }, children: '<' }),
                s.jsx(e.span, {
                  style: { color: '#8DDB8C' },
                  children: 'Link',
                }),
                s.jsx(e.span, { style: { color: '#6CB6FF' }, children: ' to' }),
                s.jsx(e.span, { style: { color: '#F47067' }, children: '=' }),
                s.jsx(e.span, {
                  style: { color: '#96D0FF' },
                  children: '"/admin/dashboard',
                }),
                s.jsx(e.mark, {
                  'data-highlighted-chars': '',
                  children: s.jsx(e.span, {
                    style: { color: '#96D0FF' },
                    children: '#statistics',
                  }),
                }),
                s.jsx(e.span, { style: { color: '#96D0FF' }, children: '"' }),
                s.jsx(e.span, {
                  style: { color: '#ADBAC7' },
                  children: '>Statistics</',
                }),
                s.jsx(e.span, {
                  style: { color: '#8DDB8C' },
                  children: 'Link',
                }),
                s.jsx(e.span, { style: { color: '#ADBAC7' }, children: '>' }),
              ],
            }),
          }),
        }),
      }),
      `
`,
      s.jsx(e.h2, { children: 'useNavigate hook' }),
      `
`,
      s.jsxs(e.p, {
        children: [
          'The ',
          s.jsx(e.code, { children: 'useNavigate' }),
          ` hook is used to change the current route in your application.
It returns a function that you can call to navigate to a different route.`,
        ],
      }),
      `
`,
      s.jsx(e.h3, { children: 'Example 1: Basic usage' }),
      `
`,
      s.jsxs(e.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          s.jsx(e.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'src/app/home.page.tsx',
          }),
          s.jsx(e.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: s.jsxs(e.code, {
              'data-line-numbers': '',
              'data-language': 'tsx',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              'data-line-numbers-max-digits': '2',
              children: [
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' React ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: ' "react"',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { PageComponent, ',
                    }),
                    s.jsx(e.mark, {
                      'data-highlighted-chars': '',
                      children: s.jsx(e.span, {
                        style: { color: '#ADBAC7' },
                        children: 'useNavigate',
                      }),
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' } ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: ' "rasengan"',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'const',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' Home',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: ' PageComponent',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '  const',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' navigate',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' ',
                    }),
                    s.jsx(e.mark, {
                      'data-highlighted-chars': '',
                      children: s.jsx(e.span, {
                        style: { color: '#DCBDFB' },
                        children: 'useNavigate',
                      }),
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '();',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '  return',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' (',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '    <',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '      <',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'h1',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>Home</',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'h1',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '      <',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' onClick',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '() ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' navigate',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: '"/dashboard"',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ')',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>Go to Dashboard</',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '    </',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '  );',
                  }),
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '}',
                  }),
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: 'Home.path ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: ' "/"',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: 'Home.metadata ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '  title: ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: '"Home"',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ',',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '  description: ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: '"Home Page"',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ',',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '};',
                  }),
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'export',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' default',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' Home;',
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
      s.jsxs(e.p, {
        children: [
          'For a full list of ',
          s.jsx(e.code, { children: 'useNavigate' }),
          ' options, see the ',
          s.jsx(e.a, {
            href: 'https://reactrouter.com/en/main/hooks/use-navigate',
            children: 'API reference',
          }),
          ' on the documentation of ',
          s.jsx(e.code, { children: 'React Router' }),
          '.',
        ],
      }),
      `
`,
      `
`,
      s.jsx(e.h3, { children: 'Example 2: Logout with navigation' }),
      `
`,
      s.jsxs(e.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          s.jsx(e.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'src/components/LogoutButton.tsx',
          }),
          s.jsx(e.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: s.jsxs(e.code, {
              'data-line-numbers': '',
              'data-language': 'tsx',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              'data-line-numbers-max-digits': '2',
              children: [
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' React ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: ' "react"',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { ',
                    }),
                    s.jsx(e.mark, {
                      'data-highlighted-chars': '',
                      children: s.jsx(e.span, {
                        style: { color: '#ADBAC7' },
                        children: 'useNavigate',
                      }),
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' } ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: ' "rasengan"',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'export',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' default',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' function',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' LogoutButton',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F69D50' },
                      children: '() ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '{',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '  const',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' navigate',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' ',
                    }),
                    s.jsx(e.mark, {
                      'data-highlighted-chars': '',
                      children: s.jsx(e.span, {
                        style: { color: '#DCBDFB' },
                        children: 'useNavigate',
                      }),
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '();',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '  const',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: ' logout',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: ' async',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '    try',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#768390' },
                    children: '      // Logout logic Here',
                  }),
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  'data-highlighted-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: '      navigate',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#96D0FF' },
                      children: '"/sign-in"',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ');',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '    } ',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: 'catch',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' (error) {',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '      console.',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#DCBDFB' },
                      children: 'error',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '(error);',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '    }',
                  }),
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '  }',
                  }),
                }),
                `
`,
                s.jsx(e.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '  return',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: ' (',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(e.span, {
                  'data-line': '',
                  children: [
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '    <',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#6CB6FF' },
                      children: ' onClick',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: 'logout',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>Logout</',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
                    }),
                    s.jsx(e.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
                    style: { color: '#ADBAC7' },
                    children: '  )',
                  }),
                }),
                `
`,
                s.jsx(e.span, {
                  'data-line': '',
                  children: s.jsx(e.span, {
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
      s.jsx(r, {
        prev: {
          href: '/docs/routing/file-based-routing',
          label: 'File-Based Routing',
        },
        next: { href: '/docs/routing/dynamic-routes', label: 'Dynamic Routes' },
      }),
    ],
  });
}
function l(n = {}) {
  const { wrapper: e } = n.components || {};
  return e ? s.jsx(e, { ...n, children: s.jsx(a, { ...n }) }) : a(n);
}
const o = {
    path: '/linking-and-navigation',
    metadata: {
      title: 'Linking and Navigation - Routing | Core concepts | Rasengan.js',
      description:
        'Learn how to link and navigate between pages in Rasengan.js.',
    },
  },
  c = [
    {
      title: 'Using the Link Component',
      anchor: {
        id: 'using-the-link-component',
        text: 'Using the Link Component',
      },
      level: 2,
      children: [
        {
          title: 'Example 1: Basic usage',
          anchor: {
            id: 'example-1:-basic-usage',
            text: 'Example 1: Basic usage',
          },
          level: 3,
        },
        {
          title: 'Examples 2: Using dynamic routes',
          anchor: {
            id: 'examples-2:-using-dynamic-routes',
            text: 'Examples 2: Using dynamic routes',
          },
          level: 3,
        },
      ],
    },
    {
      title: 'useNavigate hook',
      anchor: { id: 'usenavigate-hook', text: 'useNavigate hook' },
      level: 2,
      children: [
        {
          title: 'Example 1: Basic usage',
          anchor: {
            id: 'example-1:-basic-usage',
            text: 'Example 1: Basic usage',
          },
          level: 3,
        },
        {
          title: 'Example 2: Logout with navigation',
          anchor: {
            id: 'example-2:-logout-with-navigation',
            text: 'Example 2: Logout with navigation',
          },
          level: 3,
        },
      ],
    },
  ];
l.metadata = o;
l.toc = c;
l.type = 'MDXPageComponent';
export { l as default };
