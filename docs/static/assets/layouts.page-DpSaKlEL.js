import { j as e } from './vendor-CfbgIbdB.js';
import { P as r } from './shared-components-CkrC6jAk.js';
function a(n) {
  const s = {
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
        children: e.jsx(s.p, { children: 'CORE CONCEPTS' }),
      }),
      `
`,
      e.jsx(s.h1, { children: 'Layouts' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'A ',
          e.jsx(s.strong, { children: 'layout' }),
          ' is a component that provides a common structure for multiple pages, such as a ',
          e.jsx(s.strong, { children: 'header, sidebar, or footer' }),
          '. Instead of repeating these elements in every page, you can define them in a layout and apply it to multiple routes.',
        ],
      }),
      `
`,
      e.jsx(s.p, {
        children:
          'Rasengan.js allows you to define layouts using a simple component-based approach.',
      }),
      `
`,
      e.jsx(s.h2, { children: 'Defining a Layout' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'To define a layout, create a React component and use the ',
          e.jsx(s.code, { children: '<Outlet />' }),
          ' component from ',
          e.jsx(s.code, { children: 'rasengan' }),
          '. The ',
          e.jsx(s.code, { children: '<Outlet />' }),
          ' component will render the current page based on the active route.',
        ],
      }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Here is an example of a ',
          e.jsx(s.strong, { children: 'main layout' }),
          ' that applies to all pages:',
        ],
      }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'src/app/app.layout.tsx',
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
                      children: ' React ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "react"',
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
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { LayoutComponent, Outlet } ',
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
                      children: ' AppLayout',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ' LayoutComponent',
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
                      children: 'header',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '>My Header</',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#8DDB8C' },
                      children: 'header',
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
                      children: 'Outlet',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' /> ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '{',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#768390' },
                      children: '/* Renders the current page */',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
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
                      children: 'footer',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '>My Footer</',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#8DDB8C' },
                      children: 'footer',
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
                    children: '  );',
                  }),
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '};',
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
                      style: { color: '#ADBAC7' },
                      children: 'AppLayout.path ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "/"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '; ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#768390' },
                      children: '// This layout applies to all pages',
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
                      children: 'export',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' default',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' AppLayout;',
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
      e.jsx(s.h2, { children: 'Applying a Layout' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'To apply a layout, define it inside a ',
          e.jsx(s.code, { children: 'Router' }),
          '. All pages within that router will automatically use the specified layout.',
        ],
      }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'src/app/app.router.ts',
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
                      children: ' { RouterComponent, defineRouter } ',
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
                e.jsxs(s.span, {
                  'data-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' Home ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "./home.page"',
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
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' AppLayout ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "./app.layout"',
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
                      children: 'class',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ' AppRouter',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' extends',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' RouterComponent',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {}',
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
                      children: 'export',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' default',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: ' defineRouter',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: '({',
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
                      children: '  layout: AppLayout',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ', ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#768390' },
                      children: '// Apply the layout here',
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
                      children: '  pages: [Home]',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ', ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#768390' },
                      children: '// Pages using the layout',
                    }),
                  ],
                }),
                `
`,
                e.jsxs(s.span, {
                  'data-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: '})(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'AppRouter',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ')',
                    }),
                    e.jsx(s.span, {
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
      e.jsx(s.h2, { children: 'Nested Layouts Example' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'You can create multiple layouts to structure different sections of your application. Here’s how to define a ',
          e.jsx(s.strong, { children: 'dedicated Admin layout' }),
          ' and apply it to specific pages.',
        ],
      }),
      `
`,
      e.jsx(s.h3, { children: '1. Define the Admin Layout' }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'src/app/admin.layout.tsx',
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
                      children: ' React ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "react"',
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
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' { LayoutComponent, Outlet } ',
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
                      children: ' AdminLayout',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ' LayoutComponent',
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
                      children: '>Admin Section</',
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
                      children: '      <',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#8DDB8C' },
                      children: 'Outlet',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' /> ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '{',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#768390' },
                      children: '/* Renders admin pages */',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '}',
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
                    children: '  );',
                  }),
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '};',
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
                      style: { color: '#ADBAC7' },
                      children: 'AdminLayout.path ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "/admin"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '; ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#768390' },
                      children: '// This layout applies to admin pages',
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
                      children: 'export',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' default',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' AdminLayout;',
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
      e.jsx(s.h3, { children: '2. Define an Admin Page' }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'src/app/dashboard.page.tsx',
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
                      children: ' React ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "react"',
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
                      children: ' Dashboard',
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
                      children: ' <',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#8DDB8C' },
                      children: 'h2',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '>Admin Dashboard</',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#8DDB8C' },
                      children: 'h2',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '>;',
                    }),
                  ],
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '};',
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
                      style: { color: '#ADBAC7' },
                      children: 'Dashboard.path ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "/dashboard"',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '; ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#768390' },
                      children: '// Will be available at /admin/dashboard',
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
                      children: 'Dashboard.metadata ',
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
                      children: '"Dashboard"',
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
                      children: '"Admin Dashboard"',
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
                    children: '};',
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
                      children: ' Dashboard;',
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
      e.jsx(s.h3, { children: '3. Create an Admin Router' }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'src/app/admin.router.ts',
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
                      children: ' { RouterComponent, defineRouter } ',
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
                e.jsxs(s.span, {
                  'data-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' Dashboard ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "./dashboard.page"',
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
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' AdminLayout ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "./admin.layout"',
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
                      children: 'class',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ' AdminRouter',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' extends',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' RouterComponent',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {}',
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
                      children: 'export',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' default',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: ' defineRouter',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: '({',
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
                      children: '  layout: AdminLayout',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ', ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#768390' },
                      children: '// Apply the Admin layout',
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
                      children: '  pages: [Dashboard]',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
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
                      style: { color: '#F69D50' },
                      children: '})(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'AdminRouter',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ')',
                    }),
                    e.jsx(s.span, {
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
      e.jsx(s.h3, {
        children: '4. Include the Admin Router in the Main Router',
      }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'src/app/app.router.ts',
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
                      children: ' { RouterComponent, defineRouter } ',
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
                e.jsxs(s.span, {
                  'data-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' Home ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "./home.page"',
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
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' AppLayout ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "./app.layout"',
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
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' AdminRouter ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: ' "./admin.router"',
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
                      children: 'class',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ' AppRouter',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' extends',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' RouterComponent',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {}',
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
                      children: 'export',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' default',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: ' defineRouter',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: '({',
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
                      children: '  imports: [AdminRouter]',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ', ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#768390' },
                      children: '// Import the Admin router',
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
                      children: '  layout: AppLayout',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
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
                      children: '  pages: [Home]',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
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
                      style: { color: '#F69D50' },
                      children: '})(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: 'AppRouter',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: ')',
                    }),
                    e.jsx(s.span, {
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
      e.jsxs(s.p, {
        children: [
          'Now, visiting ',
          e.jsx(s.strong, {
            children: e.jsx(s.code, { children: '/admin/dashboard' }),
          }),
          ' will render the ',
          e.jsx(s.code, { children: 'AdminLayout' }),
          ' with the ',
          e.jsx(s.code, { children: 'Dashboard' }),
          ' page inside it.',
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Summary' }),
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'Layouts' }),
              ' provide a shared structure for pages (e.g., headers, sidebars, footers).',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsxs(s.strong, {
                children: ['Use ', e.jsx(s.code, { children: '<Outlet />' })],
              }),
              ' inside a layout to render the active page.',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'Define the layout in a router' }),
              ', and all pages within that router will use it.',
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              e.jsx(s.strong, { children: 'Nested layouts' }),
              ' allow different sections of the app to have different structures.',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(r, {
        prev: { href: '/docs/routing/routes', label: 'Routes' },
        next: {
          href: '/docs/routing/file-based-routing',
          label: 'File-Based Routing',
        },
      }),
    ],
  });
}
function l(n = {}) {
  const { wrapper: s } = n.components || {};
  return s ? e.jsx(s, { ...n, children: e.jsx(a, { ...n }) }) : a(n);
}
const t = {
    path: '/layouts',
    metadata: {
      title: 'Defining Layouts - Routing | Core concepts | Rasengan.js',
      description:
        'Defining layouts in Rasengan.js for a consistent user experience.',
    },
  },
  o = [
    {
      title: 'Defining a Layout',
      anchor: { id: 'defining-a-layout', text: 'Defining a Layout' },
      level: 2,
      children: [],
    },
    {
      title: 'Applying a Layout',
      anchor: { id: 'applying-a-layout', text: 'Applying a Layout' },
      level: 2,
      children: [],
    },
    {
      title: 'Nested Layouts Example',
      anchor: { id: 'nested-layouts-example', text: 'Nested Layouts Example' },
      level: 2,
      children: [
        {
          title: '1. Define the Admin Layout',
          anchor: {
            id: '1.-define-the-admin-layout',
            text: '1. Define the Admin Layout',
          },
          level: 3,
        },
        {
          title: '2. Define an Admin Page',
          anchor: {
            id: '2.-define-an-admin-page',
            text: '2. Define an Admin Page',
          },
          level: 3,
        },
        {
          title: '3. Create an Admin Router',
          anchor: {
            id: '3.-create-an-admin-router',
            text: '3. Create an Admin Router',
          },
          level: 3,
        },
        {
          title: '4. Include the Admin Router in the Main Router',
          anchor: {
            id: '4.-include-the-admin-router-in-the-main-router',
            text: '4. Include the Admin Router in the Main Router',
          },
          level: 3,
        },
      ],
    },
    {
      title: 'Summary',
      anchor: { id: 'summary', text: 'Summary' },
      level: 2,
      children: [],
    },
  ];
l.metadata = t;
l.toc = o;
l.type = 'MDXPageComponent';
export { l as default };
