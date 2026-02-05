import { j as s } from './vendor-CfbgIbdB.js';
import { K as c } from './shared-components-CkrC6jAk.js';
function r(e) {
  const l = {
    a: 'a',
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    li: 'li',
    p: 'p',
    pre: 'pre',
    span: 'span',
    strong: 'strong',
    ul: 'ul',
    ...e.components,
  };
  return s.jsxs(s.Fragment, {
    children: [
      s.jsx('span', {
        className: 'text-[12px] font-mono-regular text-foreground/60',
        style: { fontSize: 12 },
        children: s.jsx(l.p, { children: 'PACKAGES' }),
      }),
      `
`,
      s.jsx(l.h1, { children: 'Kage Demo' }),
      `
`,
      s.jsxs(l.p, {
        children: [
          'Welcome! This guide will show you how to use ',
          s.jsx(l.strong, { children: '@rasenganjs/kage-demo' }),
          ' in your project.',
        ],
      }),
      `
`,
      s.jsxs(l.p, {
        children: [
          s.jsx(l.strong, { children: '@rasenganjs/kage-demo' }),
          " is a lightweight tool that helps you create guided tours and onboarding experiences for your website. Think of it as a way to walk new users through your app's features, step-by-step, with helpful tips and highlights along the way.",
        ],
      }),
      `
`,
      s.jsx(l.p, {
        children:
          "Whether you're building a dashboard, a web app, or any site where users might need a little guidance, this package makes it easy to get started.",
      }),
      `
`,
      s.jsx(l.h2, { children: 'Usage' }),
      `
`,
      s.jsx(l.figure, {
        'data-rehype-pretty-code-figure': '',
        children: s.jsx(l.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'tsx',
          'data-theme': 'github-dark-dimmed',
          children: s.jsxs(l.code, {
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: [
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#F47067' },
                    children: 'import',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: ' Step01 ',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#F47067' },
                    children: 'from',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#96D0FF' },
                    children: " '@/components/common/demo/step-01'",
                  }),
                  s.jsx(l.span, { style: { color: '#ADBAC7' }, children: ';' }),
                ],
              }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#F47067' },
                    children: 'import',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: ' Step02 ',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#F47067' },
                    children: 'from',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#96D0FF' },
                    children: " '@/components/common/demo/step-02'",
                  }),
                  s.jsx(l.span, { style: { color: '#ADBAC7' }, children: ';' }),
                ],
              }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#F47067' },
                    children: 'import',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: ' KageDemoContainer, {',
                  }),
                ],
              }),
              `
`,
              s.jsx(l.span, {
                'data-line': '',
                children: s.jsx(l.span, {
                  style: { color: '#ADBAC7' },
                  children: '  useKageDemo,',
                }),
              }),
              `
`,
              s.jsx(l.span, {
                'data-line': '',
                children: s.jsx(l.span, {
                  style: { color: '#ADBAC7' },
                  children: '  KageDemoStep,',
                }),
              }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '} ',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#F47067' },
                    children: 'from',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#96D0FF' },
                    children: " '@rasenganjs/kage-demo'",
                  }),
                  s.jsx(l.span, { style: { color: '#ADBAC7' }, children: ';' }),
                ],
              }),
              `
`,
              s.jsx(l.span, { 'data-line': '', children: ' ' }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#F47067' },
                    children: 'const',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#6CB6FF' },
                    children: ' steps',
                  }),
                  s.jsx(l.span, { style: { color: '#F47067' }, children: ':' }),
                  s.jsx(l.span, {
                    style: { color: '#F69D50' },
                    children: ' KageDemoStep',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '[] ',
                  }),
                  s.jsx(l.span, { style: { color: '#F47067' }, children: '=' }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: ' [',
                  }),
                ],
              }),
              `
`,
              s.jsx(l.span, {
                'data-line': '',
                children: s.jsx(l.span, {
                  style: { color: '#ADBAC7' },
                  children: '  {',
                }),
              }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '    target: ',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#96D0FF' },
                    children: "'#get-started'",
                  }),
                  s.jsx(l.span, { style: { color: '#ADBAC7' }, children: ',' }),
                ],
              }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#DCBDFB' },
                    children: '    render',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: ': (',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#F69D50' },
                    children: 'props',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: ') ',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#F47067' },
                    children: '=>',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: ' <',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#8DDB8C' },
                    children: 'Step01',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#F47067' },
                    children: ' {...',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: 'props',
                  }),
                  s.jsx(l.span, { style: { color: '#F47067' }, children: '}' }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: ' />,',
                  }),
                ],
              }),
              `
`,
              s.jsx(l.span, {
                'data-line': '',
                children: s.jsx(l.span, {
                  style: { color: '#ADBAC7' },
                  children: '  },',
                }),
              }),
              `
`,
              s.jsx(l.span, {
                'data-line': '',
                children: s.jsx(l.span, {
                  style: { color: '#ADBAC7' },
                  children: '  {',
                }),
              }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '    target: ',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#96D0FF' },
                    children: "'#end'",
                  }),
                  s.jsx(l.span, { style: { color: '#ADBAC7' }, children: ',' }),
                ],
              }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#DCBDFB' },
                    children: '    render',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: ': (',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#F69D50' },
                    children: 'props',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: ') ',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#F47067' },
                    children: '=>',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: ' <',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#8DDB8C' },
                    children: 'Step02',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#F47067' },
                    children: ' {...',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: 'props',
                  }),
                  s.jsx(l.span, { style: { color: '#F47067' }, children: '}' }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: ' />,',
                  }),
                ],
              }),
              `
`,
              s.jsx(l.span, {
                'data-line': '',
                children: s.jsx(l.span, {
                  style: { color: '#ADBAC7' },
                  children: '  },',
                }),
              }),
              `
`,
              s.jsx(l.span, {
                'data-line': '',
                children: s.jsx(l.span, {
                  style: { color: '#ADBAC7' },
                  children: '];',
                }),
              }),
              `
`,
              s.jsx(l.span, { 'data-line': '', children: ' ' }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#F47067' },
                    children: 'export',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#F47067' },
                    children: ' default',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#F47067' },
                    children: ' function',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#DCBDFB' },
                    children: ' Page',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#F69D50' },
                    children: '() ',
                  }),
                  s.jsx(l.span, { style: { color: '#ADBAC7' }, children: '{' }),
                ],
              }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#F47067' },
                    children: '  const',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#6CB6FF' },
                    children: ' props',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#F47067' },
                    children: ' =',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#DCBDFB' },
                    children: ' useKageDemo',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '(steps);',
                  }),
                ],
              }),
              `
`,
              s.jsx(l.span, {
                'data-line': '',
                children: s.jsx(l.span, {
                  style: { color: '#ADBAC7' },
                  children: '  ',
                }),
              }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#F47067' },
                    children: '  return',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: ' (',
                  }),
                ],
              }),
              `
`,
              s.jsx(l.span, {
                'data-line': '',
                children: s.jsx(l.span, {
                  style: { color: '#ADBAC7' },
                  children: '    <>',
                }),
              }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '      <',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#8DDB8C' },
                    children: 'section',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#6CB6FF' },
                    children: ' className',
                  }),
                  s.jsx(l.span, { style: { color: '#F47067' }, children: '=' }),
                  s.jsx(l.span, {
                    style: { color: '#96D0FF' },
                    children:
                      '"w-screen h-screen bg-blue-300 flex flex-col justify-center items-center"',
                  }),
                  s.jsx(l.span, { style: { color: '#ADBAC7' }, children: '>' }),
                ],
              }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '        <',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#8DDB8C' },
                    children: 'KageDemoContainer',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#F47067' },
                    children: ' {...',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: 'props',
                  }),
                  s.jsx(l.span, { style: { color: '#F47067' }, children: '}' }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: ' />',
                  }),
                ],
              }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '        <',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#8DDB8C' },
                    children: 'div',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#6CB6FF' },
                    children: ' className',
                  }),
                  s.jsx(l.span, { style: { color: '#F47067' }, children: '=' }),
                  s.jsx(l.span, {
                    style: { color: '#96D0FF' },
                    children: '"p-4 flex flex-col items-center gap-2"',
                  }),
                  s.jsx(l.span, { style: { color: '#ADBAC7' }, children: '>' }),
                ],
              }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '          <',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#8DDB8C' },
                    children: 'button',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#6CB6FF' },
                    children: ' id',
                  }),
                  s.jsx(l.span, { style: { color: '#F47067' }, children: '=' }),
                  s.jsx(l.span, {
                    style: { color: '#96D0FF' },
                    children: '"get-started"',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '>Get Started</',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#8DDB8C' },
                    children: 'button',
                  }),
                  s.jsx(l.span, { style: { color: '#ADBAC7' }, children: '>' }),
                ],
              }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '          <',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#8DDB8C' },
                    children: 'button',
                  }),
                ],
              }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#6CB6FF' },
                    children: '            onClick',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#F47067' },
                    children: '={',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: 'props.start',
                  }),
                  s.jsx(l.span, { style: { color: '#F47067' }, children: '}' }),
                ],
              }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#6CB6FF' },
                    children: '            className',
                  }),
                  s.jsx(l.span, { style: { color: '#F47067' }, children: '=' }),
                  s.jsx(l.span, {
                    style: { color: '#96D0FF' },
                    children: '"bg-black text-white py-2 px-4 rounded-lg"',
                  }),
                ],
              }),
              `
`,
              s.jsx(l.span, {
                'data-line': '',
                children: s.jsx(l.span, {
                  style: { color: '#ADBAC7' },
                  children: '          >',
                }),
              }),
              `
`,
              s.jsx(l.span, {
                'data-line': '',
                children: s.jsx(l.span, {
                  style: { color: '#ADBAC7' },
                  children: '            Start',
                }),
              }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '          </',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#8DDB8C' },
                    children: 'button',
                  }),
                  s.jsx(l.span, { style: { color: '#ADBAC7' }, children: '>' }),
                ],
              }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '          <',
                  }),
                  s.jsx(l.span, { style: { color: '#8DDB8C' }, children: 'p' }),
                  s.jsx(l.span, {
                    style: { color: '#6CB6FF' },
                    children: ' id',
                  }),
                  s.jsx(l.span, { style: { color: '#F47067' }, children: '=' }),
                  s.jsx(l.span, {
                    style: { color: '#96D0FF' },
                    children: '"end"',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '>End demo</',
                  }),
                  s.jsx(l.span, { style: { color: '#8DDB8C' }, children: 'p' }),
                  s.jsx(l.span, { style: { color: '#ADBAC7' }, children: '>' }),
                ],
              }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '        </',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#8DDB8C' },
                    children: 'div',
                  }),
                  s.jsx(l.span, { style: { color: '#ADBAC7' }, children: '>' }),
                ],
              }),
              `
`,
              s.jsxs(l.span, {
                'data-line': '',
                children: [
                  s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '      </',
                  }),
                  s.jsx(l.span, {
                    style: { color: '#8DDB8C' },
                    children: 'section',
                  }),
                  s.jsx(l.span, { style: { color: '#ADBAC7' }, children: '>' }),
                ],
              }),
              `
`,
              s.jsx(l.span, {
                'data-line': '',
                children: s.jsx(l.span, {
                  style: { color: '#ADBAC7' },
                  children: '    </>',
                }),
              }),
              `
`,
              s.jsx(l.span, {
                'data-line': '',
                children: s.jsx(l.span, {
                  style: { color: '#ADBAC7' },
                  children: '  );',
                }),
              }),
              `
`,
              s.jsx(l.span, {
                'data-line': '',
                children: s.jsx(l.span, {
                  style: { color: '#ADBAC7' },
                  children: '}',
                }),
              }),
            ],
          }),
        }),
      }),
      `
`,
      s.jsxs(l.p, {
        children: [
          'And here is the definition of the ',
          s.jsx(l.code, { children: 'Step01' }),
          ' and ',
          s.jsx(l.code, { children: 'Step02' }),
          ' components',
        ],
      }),
      `
`,
      s.jsxs(l.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          s.jsx(l.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'step-01.tsx',
          }),
          s.jsx(l.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: s.jsxs(l.code, {
              'data-language': 'tsx',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: [
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: ' React ',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: " 'react'",
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: 'interface',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F69D50' },
                      children: ' Step01Props',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#DCBDFB' },
                      children: '  next',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' void',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#DCBDFB' },
                      children: '  prev',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' void',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#DCBDFB' },
                      children: '  end',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' void',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '}',
                  }),
                }),
                `
`,
                s.jsx(l.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: 'export',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: ' default',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: ' function',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#DCBDFB' },
                      children: ' Step01',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F69D50' },
                      children: '({ next, end }',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F69D50' },
                      children: ' Step01Props) ',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '{',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '  return',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: ' (',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '    <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"bg-white rounded-lg shadow-xl p-6 max-w-md"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '      {',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#768390' },
                      children: '/* Header */',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '      <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"mb-4"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'h2',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"text-2xl font-bold text-gray-900 mb-2"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '          Welcome to Our App! 👋',
                  }),
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'h2',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'p',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"text-gray-600"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children:
                      "          Let's take a quick tour to help you get started with the key features.",
                  }),
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'p',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '      </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '      {',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#768390' },
                      children: '/* Content */',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '      <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"mb-6"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'p',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"text-gray-700"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children:
                      '          This is your starting point. Click the "Get Started" button below to',
                  }),
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children:
                      "          begin exploring the amazing features we've built for you.",
                  }),
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'p',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '      </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '      {',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#768390' },
                      children: '/* Progress indicator */',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '      <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"flex items-center gap-2 mb-6"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"h-2 w-2 rounded-full bg-blue-600"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '></',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"h-2 w-2 rounded-full bg-gray-300"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '></',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'span',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"text-sm text-gray-500 ml-2"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>Step 1 of 2</',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'span',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '      </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '      {',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#768390' },
                      children: '/* Actions */',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '      <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"flex justify-between items-center"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: '          onClick',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: 'end',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: '          className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children:
                        '"text-gray-500 hover:text-gray-700 text-sm font-medium"',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '        >',
                  }),
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '          Skip tour',
                  }),
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: '          onClick',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: 'next',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: '          className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children:
                        '"bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '        >',
                  }),
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '          Next',
                  }),
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '      </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '    </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '  );',
                  }),
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
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
      s.jsxs(l.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          s.jsx(l.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: 'step-02.tsx',
          }),
          s.jsx(l.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'tsx',
            'data-theme': 'github-dark-dimmed',
            children: s.jsxs(l.code, {
              'data-language': 'tsx',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: [
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: 'import',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: ' React ',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: 'from',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: " 'react'",
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: 'interface',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F69D50' },
                      children: ' Step02Props',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: ' {',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#DCBDFB' },
                      children: '  next',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' void',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#DCBDFB' },
                      children: '  prev',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' void',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#DCBDFB' },
                      children: '  end',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: ' () ',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=>',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' void',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: ';',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '}',
                  }),
                }),
                `
`,
                s.jsx(l.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: 'export',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: ' default',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: ' function',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#DCBDFB' },
                      children: ' Step02',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F69D50' },
                      children: '({ prev, end }',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: ':',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F69D50' },
                      children: ' Step02Props) ',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '{',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '  return',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: ' (',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '    <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"bg-white rounded-lg shadow-xl p-6 max-w-md"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '      {',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#768390' },
                      children: '/* Header */',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '      <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"mb-4"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'h2',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"text-2xl font-bold text-gray-900 mb-2"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: "          You're All Set! 🎉",
                  }),
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'h2',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'p',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"text-gray-600"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children:
                      "          That's the end of our quick tour. You're ready to dive in!",
                  }),
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'p',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '      </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '      {',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#768390' },
                      children: '/* Content */',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '      <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"mb-6"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'p',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"text-gray-700 mb-4"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children:
                      '          Now you know the basics. Feel free to explore on your own, and remember',
                  }),
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children:
                      '          you can always come back to this tour anytime.',
                  }),
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'p',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children:
                        '"bg-blue-50 border border-blue-200 rounded-lg p-4"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '          <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'p',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"text-sm text-blue-800"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '            💡 <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'strong',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>Pro tip:</',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'strong',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '> Check out our documentation for more',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children:
                      '            advanced features and customization options.',
                  }),
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '          </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'p',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '      </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '      {',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#768390' },
                      children: '/* Progress indicator */',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '      <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"flex items-center gap-2 mb-6"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"h-2 w-2 rounded-full bg-blue-600"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '></',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"h-2 w-2 rounded-full bg-blue-600"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '></',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'span',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"text-sm text-gray-500 ml-2"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>Step 2 of 2</',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'span',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '      </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, { 'data-line': '', children: ' ' }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '      {',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#768390' },
                      children: '/* Actions */',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '      <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: ' className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children: '"flex justify-between items-center"',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: '          onClick',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: 'prev',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: '          className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children:
                        '"text-gray-500 hover:text-gray-700 text-sm font-medium"',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '        >',
                  }),
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '          ← Previous',
                  }),
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        <',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: '          onClick',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '={',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: 'end',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '}',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#6CB6FF' },
                      children: '          className',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#F47067' },
                      children: '=',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#96D0FF' },
                      children:
                        '"bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '        >',
                  }),
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '          Finish Tour',
                  }),
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '        </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'button',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '      </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsxs(l.span, {
                  'data-line': '',
                  children: [
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '    </',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#8DDB8C' },
                      children: 'div',
                    }),
                    s.jsx(l.span, {
                      style: { color: '#ADBAC7' },
                      children: '>',
                    }),
                  ],
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
                    style: { color: '#ADBAC7' },
                    children: '  );',
                  }),
                }),
                `
`,
                s.jsx(l.span, {
                  'data-line': '',
                  children: s.jsx(l.span, {
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
      s.jsx(l.p, {
        children:
          'But feel free to style them as you want to meet the system design of your application.',
      }),
      `
`,
      s.jsx(c, {}),
      `
`,
      s.jsx(l.h2, { children: 'Core API' }),
      `
`,
      s.jsxs(l.ul, {
        children: [
          `
`,
          s.jsxs(l.li, {
            children: [
              s.jsx(l.strong, {
                children: s.jsx(l.code, { children: 'KageDemoContainer' }),
              }),
              ' – The main container component that renders the tour overlay and manages the spotlight effect',
            ],
          }),
          `
`,
          s.jsxs(l.li, {
            children: [
              s.jsx(l.strong, {
                children: s.jsx(l.code, { children: 'useKageDemo' }),
              }),
              ' – A React hook that initializes the tour system. Pass in an array of steps following the ',
              s.jsx(l.code, { children: 'KageDemoStep' }),
              ' schema',
            ],
          }),
          `
`,
          s.jsxs(l.li, {
            children: [
              s.jsx(l.strong, {
                children: s.jsx(l.code, { children: 'KageDemoStep' }),
              }),
              ' – Type definition for tour steps:',
              `
`,
              s.jsx(l.figure, {
                'data-rehype-pretty-code-figure': '',
                children: s.jsx(l.pre, {
                  style: { backgroundColor: '#22272e', color: '#adbac7' },
                  tabIndex: '0',
                  'data-language': 'ts',
                  'data-theme': 'github-dark-dimmed',
                  children: s.jsxs(l.code, {
                    'data-language': 'ts',
                    'data-theme': 'github-dark-dimmed',
                    style: { display: 'grid' },
                    children: [
                      s.jsxs(l.span, {
                        'data-line': '',
                        children: [
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: 'type',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F69D50' },
                            children: ' KageDemoStep',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: ' =',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: ' {',
                          }),
                        ],
                      }),
                      `
`,
                      s.jsxs(l.span, {
                        'data-line': '',
                        children: [
                          s.jsx(l.span, {
                            style: { color: '#F69D50' },
                            children: '  target',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: ':',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#6CB6FF' },
                            children: ' string',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: ';  ',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#768390' },
                            children:
                              '// CSS selector for the element to highlight',
                          }),
                        ],
                      }),
                      `
`,
                      s.jsxs(l.span, {
                        'data-line': '',
                        children: [
                          s.jsx(l.span, {
                            style: { color: '#F69D50' },
                            children: '  render',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: ':',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F69D50' },
                            children: ' React',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: '.',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F69D50' },
                            children: 'FC',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: '<{ ',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#DCBDFB' },
                            children: 'next',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: ':',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: ' () ',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: '=>',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#6CB6FF' },
                            children: ' void',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: '; ',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#DCBDFB' },
                            children: 'prev',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: ':',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: ' () ',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: '=>',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#6CB6FF' },
                            children: ' void',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: '; ',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#DCBDFB' },
                            children: 'end',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: ':',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: ' () ',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#F47067' },
                            children: '=>',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#6CB6FF' },
                            children: ' void',
                          }),
                          s.jsx(l.span, {
                            style: { color: '#ADBAC7' },
                            children: ' }>;',
                          }),
                        ],
                      }),
                      `
`,
                      s.jsx(l.span, {
                        'data-line': '',
                        children: s.jsx(l.span, {
                          style: { color: '#ADBAC7' },
                          children: '}',
                        }),
                      }),
                    ],
                  }),
                }),
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
      s.jsx(l.h2, { children: 'Why use Kage Demo ?' }),
      `
`,
      s.jsxs(l.ul, {
        children: [
          `
`,
          s.jsxs(l.li, {
            children: [
              s.jsx(l.strong, { children: 'Minimal Setup' }),
              " – Define your steps and you're ready to go, no complex configuration",
            ],
          }),
          `
`,
          s.jsxs(l.li, {
            children: [
              s.jsx(l.strong, { children: 'Element Targeting' }),
              ' – Highlight any element using CSS selectors',
            ],
          }),
          `
`,
          s.jsxs(l.li, {
            children: [
              s.jsx(l.strong, { children: 'Custom Step Content' }),
              " – Full control over what's displayed at each step with custom React components",
            ],
          }),
          `
`,
          s.jsxs(l.li, {
            children: [
              s.jsx(l.strong, { children: 'Navigation Controls' }),
              ' – Built-in next, previous, and end functions for seamless tour flow',
            ],
          }),
          `
`,
          s.jsxs(l.li, {
            children: [
              s.jsx(l.strong, { children: 'Lightweight & Performant' }),
              ' – Zero dependencies beyond React',
            ],
          }),
          `
`,
          s.jsxs(l.li, {
            children: [
              s.jsx(l.strong, { children: 'Type-safe' }),
              ' – Written in TypeScript with full type inference',
            ],
          }),
          `
`,
          s.jsxs(l.li, {
            children: [
              s.jsx(l.strong, { children: 'Framework Ready' }),
              ' – Works seamlessly with Rasengan.js and other React frameworks',
            ],
          }),
          `
`,
        ],
      }),
      `
`,
      s.jsx(l.h2, { children: 'Community' }),
      `
`,
      s.jsx(l.p, {
        children:
          'Join the Rasengan.js community to get support, ask questions, and share your projects:',
      }),
      `
`,
      s.jsxs(l.ul, {
        children: [
          `
`,
          s.jsxs(l.li, {
            children: [
              s.jsx('a', {
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
      s.jsxs(l.ul, {
        children: [
          `
`,
          s.jsxs(l.li, {
            children: [
              s.jsx('a', {
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
          s.jsxs(l.li, {
            children: [
              s.jsx('a', {
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
      s.jsx(l.p, {
        children: "Let's build something amazing with Rasengan.js! 🚀",
      }),
      `
`,
      s.jsx(l.h2, { children: 'License' }),
      `
`,
      s.jsxs(l.p, {
        children: [
          'This package is ',
          s.jsx(l.a, {
            href: 'https://github.com/rasengan-dev/rasenganjs/blob/main/LICENSE',
            children: 'MIT licensed',
          }),
          '.',
        ],
      }),
    ],
  });
}
function n(e = {}) {
  const { wrapper: l } = e.components || {};
  return l ? s.jsx(l, { ...e, children: s.jsx(r, { ...e }) }) : r(e);
}
const o = {
    path: '/kage-demo',
    metadata: {
      title: 'Kage Demo Package - Modules | Packages | Rasengan.js',
      description:
        'Documentation for the Kage demo package - a guiding tour utility package to onboard new users to Rasengan.js applications.',
    },
  },
  a = [
    {
      title: 'Usage',
      anchor: { id: 'usage', text: 'Usage' },
      level: 2,
      children: [],
    },
    {
      title: 'Core API',
      anchor: { id: 'core-api', text: 'Core API' },
      level: 2,
      children: [],
    },
    {
      title: 'Why use Kage Demo ?',
      anchor: { id: 'why-use-kage-demo-?', text: 'Why use Kage Demo ?' },
      level: 2,
      children: [],
    },
    {
      title: 'Community',
      anchor: { id: 'community', text: 'Community' },
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
n.metadata = o;
n.toc = a;
n.type = 'MDXPageComponent';
export { n as default };
