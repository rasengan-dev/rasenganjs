import { j as e } from './vendor-w5t4XTd4.js';
import { P as r } from './shared-components-DBceyN8p.js';
function a(s) {
  const n = {
    a: 'a',
    code: 'code',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    li: 'li',
    p: 'p',
    pre: 'pre',
    span: 'span',
    ul: 'ul',
    ...s.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        children: e.jsx(n.p, { children: 'API REFERENCE' }),
      }),
      `
`,
      e.jsx(n.h1, { children: 'NavLink Component' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Wraps ',
          e.jsx(n.code, { children: '<Link>' }),
          ' with additional props for styling ',
          e.jsx(n.code, { children: 'active' }),
          ' and ',
          e.jsx(n.code, { children: 'pending' }),
          ' states.',
        ],
      }),
      `
`,
      e.jsxs(n.ul, {
        children: [
          `
`,
          e.jsxs(n.li, {
            children: [
              'Automatically applies classes to the link based on its ',
              e.jsx(n.code, { children: 'active' }),
              ' and ',
              e.jsx(n.code, { children: 'pending' }),
              ' states',
              `
`,
              e.jsxs(n.ul, {
                children: [
                  `
`,
                  e.jsx(n.li, {
                    children:
                      'Note that pending is only available with Framework and Data modes.',
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
          e.jsxs(n.li, {
            children: [
              'Automatically applies ',
              e.jsx(n.code, { children: 'aria-current="page"' }),
              ' to the link when the link is active. See ',
              e.jsx(n.a, {
                href: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current',
                children: 'aria-current',
              }),
              ' on MDN.',
            ],
          }),
          `
`,
          e.jsx(n.li, {
            children:
              'States are additionally available through the className, style, and children render props.',
          }),
          `
`,
        ],
      }),
      `
`,
      e.jsx(n.h2, { children: 'Usage' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          "Here's an example of how to use the ",
          e.jsx(n.code, { children: '<NavLink>' }),
          ' component:',
        ],
      }),
      `
`,
      e.jsx(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(n.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'tsx',
          'data-theme': 'github-dark-dimmed',
          children: e.jsx(n.code, {
            'data-line-numbers': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            'data-line-numbers-max-digits': '1',
            children: e.jsxs(n.span, {
              'data-line': '',
              children: [
                e.jsx(n.span, {
                  style: { color: '#F47067' },
                  children: 'import',
                }),
                e.jsx(n.span, {
                  style: { color: '#ADBAC7' },
                  children: ' { NavLink } ',
                }),
                e.jsx(n.span, {
                  style: { color: '#F47067' },
                  children: 'from',
                }),
                e.jsx(n.span, {
                  style: { color: '#96D0FF' },
                  children: ' "rasengan"',
                }),
                e.jsx(n.span, { style: { color: '#ADBAC7' }, children: ';' }),
              ],
            }),
          }),
        }),
      }),
      `
`,
      e.jsx(n.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(n.pre, {
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
                  e.jsx(n.span, { style: { color: '#ADBAC7' }, children: '<' }),
                  e.jsx(n.span, {
                    style: { color: '#8DDB8C' },
                    children: 'NavLink',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#6CB6FF' },
                    children: ' to',
                  }),
                  e.jsx(n.span, { style: { color: '#F47067' }, children: '=' }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: '"/message"',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '>Messages</',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#8DDB8C' },
                    children: 'NavLink',
                  }),
                  e.jsx(n.span, { style: { color: '#ADBAC7' }, children: '>' }),
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
                  children: '// Using render props',
                }),
              }),
              `
`,
              e.jsxs(n.span, {
                'data-line': '',
                children: [
                  e.jsx(n.span, { style: { color: '#ADBAC7' }, children: '<' }),
                  e.jsx(n.span, {
                    style: { color: '#8DDB8C' },
                    children: 'NavLink',
                  }),
                ],
              }),
              `
`,
              e.jsxs(n.span, {
                'data-line': '',
                children: [
                  e.jsx(n.span, {
                    style: { color: '#6CB6FF' },
                    children: '  to',
                  }),
                  e.jsx(n.span, { style: { color: '#F47067' }, children: '=' }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: '"/messages"',
                  }),
                ],
              }),
              `
`,
              e.jsxs(n.span, {
                'data-line': '',
                children: [
                  e.jsx(n.span, {
                    style: { color: '#6CB6FF' },
                    children: '  className',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#F47067' },
                    children: '={',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '({ ',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#F69D50' },
                    children: 'isActive',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: ', ',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#F69D50' },
                    children: 'isPending',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: ' }) ',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#F47067' },
                    children: '=>',
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
                    children: '    isPending ',
                  }),
                  e.jsx(n.span, { style: { color: '#F47067' }, children: '?' }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' "pending"',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#F47067' },
                    children: ' :',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: ' isActive ',
                  }),
                  e.jsx(n.span, { style: { color: '#F47067' }, children: '?' }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' "active"',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#F47067' },
                    children: ' :',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#96D0FF' },
                    children: ' ""',
                  }),
                ],
              }),
              `
`,
              e.jsx(n.span, {
                'data-line': '',
                children: e.jsx(n.span, {
                  style: { color: '#F47067' },
                  children: '  }',
                }),
              }),
              `
`,
              e.jsx(n.span, {
                'data-line': '',
                children: e.jsx(n.span, {
                  style: { color: '#ADBAC7' },
                  children: '>',
                }),
              }),
              `
`,
              e.jsx(n.span, {
                'data-line': '',
                children: e.jsx(n.span, {
                  style: { color: '#ADBAC7' },
                  children: '  Messages',
                }),
              }),
              `
`,
              e.jsxs(n.span, {
                'data-line': '',
                children: [
                  e.jsx(n.span, {
                    style: { color: '#ADBAC7' },
                    children: '</',
                  }),
                  e.jsx(n.span, {
                    style: { color: '#8DDB8C' },
                    children: 'NavLink',
                  }),
                  e.jsx(n.span, { style: { color: '#ADBAC7' }, children: '>' }),
                ],
              }),
            ],
          }),
        }),
      }),
      `
`,
      e.jsx(n.h2, { children: 'Props' }),
      `
`,
      e.jsxs(n.p, {
        children: [
          'Learn more about the ',
          e.jsx(n.code, { children: '<NavLink>' }),
          ' component ',
          e.jsx(n.a, {
            href: 'https://reactrouter.com/api/components/NavLink',
            children: 'here',
          }),
          '.',
        ],
      }),
      `
`,
      e.jsx(r, {
        prev: {
          href: '/docs/api-reference/components/link',
          label: 'Link Component',
        },
        next: {
          href: '/docs/api-reference/components/outlet',
          label: 'Outlet Component',
        },
      }),
    ],
  });
}
function l(s = {}) {
  const { wrapper: n } = s.components || {};
  return n ? e.jsx(n, { ...s, children: e.jsx(a, { ...s }) }) : a(s);
}
const t = {
    path: '/navlink',
    metadata: {
      title: 'Link Component - Components | API Reference | Rasengan.js',
      description: 'Navigate between routes in your application.',
    },
  },
  i = [
    {
      title: 'Usage',
      anchor: { id: 'usage', text: 'Usage' },
      level: 2,
      children: [],
    },
    {
      title: 'Props',
      anchor: { id: 'props', text: 'Props' },
      level: 2,
      children: [],
    },
  ];
l.metadata = t;
l.toc = i;
l.type = 'MDXPageComponent';
export { l as default };
