import { j as e } from './vendor-w5t4XTd4.js';
import { T as l, S as n, P as r } from './shared-components-DBceyN8p.js';
function i(a) {
  const s = {
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    p: 'p',
    pre: 'pre',
    span: 'span',
    ...a.components,
  };
  return (
    l || d('Tabs', !1),
    l.Item || d('Tabs.Item', !0),
    e.jsxs(e.Fragment, {
      children: [
        e.jsx('span', {
          className: 'text-[12px] font-mono-regular text-foreground/60',
          children: e.jsx(s.p, { children: 'CORE CONCEPTS' }),
        }),
        `
`,
        e.jsx(s.h1, { children: 'Tailwind CSS' }),
        `
`,
        e.jsx(s.p, {
          children:
            'Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.',
        }),
        `
`,
        e.jsx(s.p, {
          children: "It's fast, flexible, and reliable — with zero-runtime.",
        }),
        `
`,
        e.jsx(s.h2, { children: 'Installation' }),
        `
`,
        e.jsx(s.p, {
          children:
            'To install Tailwind CSS, follow one of the following guides depending on your project specifications:',
        }),
        `
`,
        e.jsxs(l, {
          tabs: [{ title: 'Version 3' }, { title: 'Version 4' }],
          activeIndex: 1,
          children: [
            e.jsxs(l.Item, {
              children: [
                e.jsx(n, {
                  step: '01',
                  title: 'Install Tailwind CSS',
                  content:
                    '\nInstall `tailwindcss` and its peer dependencies via npm, and create your `tailwind.config.js` file.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'bash',
                        'data-theme': 'github-dark-dimmed',
                        children: 'Terminal',
                      }),
                      e.jsx(s.pre, {
                        style: { backgroundColor: '#22272e', color: '#adbac7' },
                        tabIndex: '0',
                        'data-language': 'bash',
                        'data-theme': 'github-dark-dimmed',
                        children: e.jsxs(s.code, {
                          'data-line-numbers': '',
                          'data-language': 'bash',
                          'data-theme': 'github-dark-dimmed',
                          style: { display: 'grid' },
                          'data-line-numbers-max-digits': '1',
                          children: [
                            e.jsxs(s.span, {
                              'data-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#F69D50' },
                                  children: 'npm',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' install',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' -D',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' tailwindcss@3',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' postcss',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' autoprefixer',
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
                                  children: 'npx',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' tailwindcss',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: ' init',
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
                e.jsx(n, {
                  step: '02',
                  title: 'Add Tailwind to your PostCSS configuration',
                  content:
                    '\nAdd `tailwindcss` and `autoprefixer` to your `postcss.config.js`file, or wherever PostCSS is configured in your project.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'js',
                        'data-theme': 'github-dark-dimmed',
                        children: 'postcss.config.js',
                      }),
                      e.jsx(s.pre, {
                        style: { backgroundColor: '#22272e', color: '#adbac7' },
                        tabIndex: '0',
                        'data-language': 'js',
                        'data-theme': 'github-dark-dimmed',
                        children: e.jsxs(s.code, {
                          'data-line-numbers': '',
                          'data-language': 'js',
                          'data-theme': 'github-dark-dimmed',
                          style: { display: 'grid' },
                          'data-line-numbers-max-digits': '1',
                          children: [
                            e.jsxs(s.span, {
                              'data-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: 'module',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: '.',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: 'exports',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: ' =',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ' {',
                                }),
                              ],
                            }),
                            `
`,
                            e.jsx(s.span, {
                              'data-line': '',
                              children: e.jsx(s.span, {
                                style: { color: '#ADBAC7' },
                                children: '  plugins: {',
                              }),
                            }),
                            `
`,
                            e.jsx(s.span, {
                              'data-line': '',
                              'data-highlighted-line': '',
                              children: e.jsx(s.span, {
                                style: { color: '#ADBAC7' },
                                children: '    tailwindcss: {},',
                              }),
                            }),
                            `
`,
                            e.jsx(s.span, {
                              'data-line': '',
                              'data-highlighted-line': '',
                              children: e.jsx(s.span, {
                                style: { color: '#ADBAC7' },
                                children: '    autoprefixer: {},',
                              }),
                            }),
                            `
`,
                            e.jsx(s.span, {
                              'data-line': '',
                              children: e.jsx(s.span, {
                                style: { color: '#ADBAC7' },
                                children: '  }',
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
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
                e.jsx(n, {
                  step: '03',
                  title: 'Configure your template paths',
                  content:
                    '\nAdd the paths to all of your template files in your `tailwind.config.js` file.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'js',
                        'data-theme': 'github-dark-dimmed',
                        children: 'tailwind.config.js',
                      }),
                      e.jsx(s.pre, {
                        style: { backgroundColor: '#22272e', color: '#adbac7' },
                        tabIndex: '0',
                        'data-language': 'js',
                        'data-theme': 'github-dark-dimmed',
                        children: e.jsxs(s.code, {
                          'data-line-numbers': '',
                          'data-language': 'js',
                          'data-theme': 'github-dark-dimmed',
                          style: { display: 'grid' },
                          'data-line-numbers-max-digits': '1',
                          children: [
                            e.jsxs(s.span, {
                              'data-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#768390' },
                                  children: '/** ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '@type',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F69D50' },
                                  children: " {import('tailwindcss').Config}",
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#768390' },
                                  children: ' */',
                                }),
                              ],
                            }),
                            `
`,
                            e.jsxs(s.span, {
                              'data-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: 'module',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: '.',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: 'exports',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: ' =',
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
                                  style: { color: '#ADBAC7' },
                                  children: '  content: [',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"./src/**/*.{js,ts,jsx,tsx}"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: '],',
                                }),
                              ],
                            }),
                            `
`,
                            e.jsx(s.span, {
                              'data-line': '',
                              children: e.jsx(s.span, {
                                style: { color: '#ADBAC7' },
                                children: '  theme: {',
                              }),
                            }),
                            `
`,
                            e.jsx(s.span, {
                              'data-line': '',
                              children: e.jsx(s.span, {
                                style: { color: '#ADBAC7' },
                                children: '    extend: {},',
                              }),
                            }),
                            `
`,
                            e.jsx(s.span, {
                              'data-line': '',
                              children: e.jsx(s.span, {
                                style: { color: '#ADBAC7' },
                                children: '  },',
                              }),
                            }),
                            `
`,
                            e.jsx(s.span, {
                              'data-line': '',
                              children: e.jsx(s.span, {
                                style: { color: '#ADBAC7' },
                                children: '  plugins: [],',
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
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
                e.jsx(n, {
                  step: '04',
                  title: 'Add the Tailwind directives to your CSS',
                  content:
                    '\nAdd the `@tailwind` directives for each of Tailwind’s layers to your main CSS file.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'css',
                        'data-theme': 'github-dark-dimmed',
                        children: 'CSS',
                      }),
                      e.jsx(s.pre, {
                        style: { backgroundColor: '#22272e', color: '#adbac7' },
                        tabIndex: '0',
                        'data-language': 'css',
                        'data-theme': 'github-dark-dimmed',
                        children: e.jsxs(s.code, {
                          'data-line-numbers': '',
                          'data-language': 'css',
                          'data-theme': 'github-dark-dimmed',
                          style: { display: 'grid' },
                          'data-line-numbers-max-digits': '1',
                          children: [
                            e.jsxs(s.span, {
                              'data-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '@tailwind',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ' base;',
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
                                  children: '@tailwind',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ' components;',
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
                                  children: '@tailwind',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ' utilities;',
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
                e.jsx(n, {
                  step: '05',
                  title: 'Add Tailwind CSS to your Component page',
                  content:
                    '\nUse Tailwind CSS `classes` to your component page or whatever you want.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'jsx',
                        'data-theme': 'github-dark-dimmed',
                        children: 'home.page.jsx',
                      }),
                      e.jsx(s.pre, {
                        style: { backgroundColor: '#22272e', color: '#adbac7' },
                        tabIndex: '0',
                        'data-language': 'jsx',
                        'data-theme': 'github-dark-dimmed',
                        children: e.jsxs(s.code, {
                          'data-line-numbers': '',
                          'data-language': 'jsx',
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
                                  children: ' { Button } ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: 'from',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: " '@/components/common/button'",
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
                                  children: 'export',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: ' default',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: ' function',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#DCBDFB' },
                                  children: ' Home',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F69D50' },
                                  children: '() ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: '{',
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
                              'data-highlighted-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: '    <',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'section',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' className',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children:
                                    '"flex flex-col items-center justify-center h-screen"',
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
                                  children: 'Button',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' className',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"bg-primary rounded-lg px-4"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: '>Hello World</',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'Button',
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
                                  children: 'section',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: '>  ',
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
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: 'Home.path ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: " '/'",
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
                e.jsx(n, {
                  step: '06',
                  title: 'Start your app to see the magic',
                  content: '\nRun your dev server with `npm run dev`.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'bash',
                        'data-theme': 'github-dark-dimmed',
                        children: 'Terminal',
                      }),
                      e.jsx(s.pre, {
                        style: { backgroundColor: '#22272e', color: '#adbac7' },
                        tabIndex: '0',
                        'data-language': 'bash',
                        'data-theme': 'github-dark-dimmed',
                        children: e.jsx(s.code, {
                          'data-language': 'bash',
                          'data-theme': 'github-dark-dimmed',
                          style: { display: 'grid' },
                          children: e.jsxs(s.span, {
                            'data-line': '',
                            children: [
                              e.jsx(s.span, {
                                style: { color: '#F69D50' },
                                children: 'npm',
                              }),
                              e.jsx(s.span, {
                                style: { color: '#96D0FF' },
                                children: ' run',
                              }),
                              e.jsx(s.span, {
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
              ],
            }),
            e.jsxs(l.Item, {
              children: [
                e.jsx(n, {
                  step: '01',
                  title: 'Install Tailwind CSS',
                  content:
                    '\nInstall `tailwindcss` and `@tailwindcss/vite` via npm.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'bash',
                        'data-theme': 'github-dark-dimmed',
                        children: 'Terminal',
                      }),
                      e.jsx(s.pre, {
                        style: { backgroundColor: '#22272e', color: '#adbac7' },
                        tabIndex: '0',
                        'data-language': 'bash',
                        'data-theme': 'github-dark-dimmed',
                        children: e.jsx(s.code, {
                          'data-line-numbers': '',
                          'data-language': 'bash',
                          'data-theme': 'github-dark-dimmed',
                          style: { display: 'grid' },
                          'data-line-numbers-max-digits': '1',
                          children: e.jsxs(s.span, {
                            'data-line': '',
                            children: [
                              e.jsx(s.span, {
                                style: { color: '#F69D50' },
                                children: 'npm',
                              }),
                              e.jsx(s.span, {
                                style: { color: '#96D0FF' },
                                children: ' install',
                              }),
                              e.jsx(s.span, {
                                style: { color: '#96D0FF' },
                                children: ' tailwindcss',
                              }),
                              e.jsx(s.span, {
                                style: { color: '#96D0FF' },
                                children: ' @tailwindcss/vite',
                              }),
                            ],
                          }),
                        }),
                      }),
                    ],
                  }),
                }),
                e.jsx(n, {
                  step: '02',
                  title: 'Configure the Vite plugin',
                  content:
                    '\nAdd the `@tailwindcss/vite` plugin to your Rasengan configuration.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'js',
                        'data-theme': 'github-dark-dimmed',
                        children: 'rasengan.config.js',
                      }),
                      e.jsx(s.pre, {
                        style: { backgroundColor: '#22272e', color: '#adbac7' },
                        tabIndex: '0',
                        'data-language': 'js',
                        'data-theme': 'github-dark-dimmed',
                        children: e.jsxs(s.code, {
                          'data-line-numbers': '',
                          'data-language': 'js',
                          'data-theme': 'github-dark-dimmed',
                          style: { display: 'grid' },
                          'data-line-numbers-max-digits': '1',
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
                                  children: ' { defineConfig } ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: 'from',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: " 'rasengan'",
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
                              'data-highlighted-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: 'import',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: ' tailwindcss ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: 'from',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: " '@tailwindcss/vite'",
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
                                  children: 'export',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: ' default',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#DCBDFB' },
                                  children: ' defineConfig',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F69D50' },
                                  children: '({',
                                }),
                              ],
                            }),
                            `
`,
                            e.jsx(s.span, {
                              'data-line': '',
                              children: e.jsx(s.span, {
                                style: { color: '#ADBAC7' },
                                children: '  vite: {',
                              }),
                            }),
                            `
`,
                            e.jsxs(s.span, {
                              'data-line': '',
                              'data-highlighted-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: '    plugins: [',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#DCBDFB' },
                                  children: 'tailwindcss',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: '()],',
                                }),
                              ],
                            }),
                            `
`,
                            e.jsx(s.span, {
                              'data-line': '',
                              children: e.jsx(s.span, {
                                style: { color: '#ADBAC7' },
                                children: '  }',
                              }),
                            }),
                            `
`,
                            e.jsxs(s.span, {
                              'data-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#F69D50' },
                                  children: '})',
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
                }),
                e.jsx(n, {
                  step: '03',
                  title: 'Import Tailwind CSS',
                  content:
                    '\nAdd an `@import` to your CSS file that imports Tailwind CSS.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'css',
                        'data-theme': 'github-dark-dimmed',
                        children: 'CSS',
                      }),
                      e.jsx(s.pre, {
                        style: { backgroundColor: '#22272e', color: '#adbac7' },
                        tabIndex: '0',
                        'data-language': 'css',
                        'data-theme': 'github-dark-dimmed',
                        children: e.jsx(s.code, {
                          'data-language': 'css',
                          'data-theme': 'github-dark-dimmed',
                          style: { display: 'grid' },
                          children: e.jsxs(s.span, {
                            'data-line': '',
                            children: [
                              e.jsx(s.span, {
                                style: { color: '#F47067' },
                                children: '@import',
                              }),
                              e.jsx(s.span, {
                                style: { color: '#96D0FF' },
                                children: ' "tailwindcss"',
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
                }),
                e.jsx(n, {
                  step: '04',
                  title: 'Add Tailwind CSS to your Component page',
                  content:
                    '\nUse Tailwind CSS `classes` to your component page or whatever you want.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'jsx',
                        'data-theme': 'github-dark-dimmed',
                        children: 'home.page.jsx',
                      }),
                      e.jsx(s.pre, {
                        style: { backgroundColor: '#22272e', color: '#adbac7' },
                        tabIndex: '0',
                        'data-language': 'jsx',
                        'data-theme': 'github-dark-dimmed',
                        children: e.jsxs(s.code, {
                          'data-line-numbers': '',
                          'data-language': 'jsx',
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
                                  children: ' { Button } ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: 'from',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: " '@/components/common/button'",
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
                                  children: 'export',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: ' default',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: ' function',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#DCBDFB' },
                                  children: ' Home',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F69D50' },
                                  children: '() ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: '{',
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
                              'data-highlighted-line': '',
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: '    <',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'section',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' className',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children:
                                    '"flex flex-col items-center justify-center h-screen"',
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
                                  children: 'Button',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#6CB6FF' },
                                  children: ' className',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: '"bg-primary rounded-lg px-4"',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: '>Hello World</',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#8DDB8C' },
                                  children: 'Button',
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
                                  children: 'section',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: '>  ',
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
                              children: [
                                e.jsx(s.span, {
                                  style: { color: '#ADBAC7' },
                                  children: 'Home.path ',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#F47067' },
                                  children: '=',
                                }),
                                e.jsx(s.span, {
                                  style: { color: '#96D0FF' },
                                  children: " '/'",
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
                e.jsx(n, {
                  step: '05',
                  title: 'Start your app to see the magic',
                  content: '\nRun your dev server with `npm run dev`.\n',
                  children: e.jsxs(s.figure, {
                    'data-rehype-pretty-code-figure': '',
                    children: [
                      e.jsx(s.figcaption, {
                        'data-rehype-pretty-code-title': '',
                        'data-language': 'bash',
                        'data-theme': 'github-dark-dimmed',
                        children: 'Terminal',
                      }),
                      e.jsx(s.pre, {
                        style: { backgroundColor: '#22272e', color: '#adbac7' },
                        tabIndex: '0',
                        'data-language': 'bash',
                        'data-theme': 'github-dark-dimmed',
                        children: e.jsx(s.code, {
                          'data-language': 'bash',
                          'data-theme': 'github-dark-dimmed',
                          style: { display: 'grid' },
                          children: e.jsxs(s.span, {
                            'data-line': '',
                            children: [
                              e.jsx(s.span, {
                                style: { color: '#F69D50' },
                                children: 'npm',
                              }),
                              e.jsx(s.span, {
                                style: { color: '#96D0FF' },
                                children: ' run',
                              }),
                              e.jsx(s.span, {
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
              ],
            }),
          ],
        }),
        `
`,
        e.jsx(r, {
          prev: { href: '/docs/styling/css-modules', label: 'CSS Modules' },
          next: {
            href: '/docs/styling/preprocessors',
            label: 'CSS Preprocessors',
          },
        }),
      ],
    })
  );
}
function t(a = {}) {
  const { wrapper: s } = a.components || {};
  return s ? e.jsx(s, { ...a, children: e.jsx(i, { ...a }) }) : i(a);
}
function d(a, s) {
  throw new Error(
    'Expected ' +
      (s ? 'component' : 'object') +
      ' `' +
      a +
      '` to be defined: you likely forgot to import, pass, or provide it.'
  );
}
const o = {
    path: '/tailwindcss',
    metadata: {
      title: 'Tailwind CSS - Styling | Core concepts | Rasengan.js',
      description:
        'Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.',
    },
  },
  c = void 0;
t.metadata = o;
t.toc = c;
t.type = 'MDXPageComponent';
export { t as default };
