import {
  j as e,
  m as v,
  t as x,
  C as u,
  a as Q,
  b as ee,
  M as F,
  R as z,
  A as te,
  I as K,
  T as G,
  c as L,
  d as U,
  u as B,
  e as A,
  f as se,
  S as ne,
  P as re,
  H as ae,
  B as ie,
  U as le,
  g as I,
  L as w,
  h as W,
  E as oe,
  r as p,
  i as T,
  k as ce,
  l as de,
  n as me,
  o as xe,
  p as ue,
  F as pe,
  q as M,
  s as he,
  v as Z,
  w as ge,
  x as fe,
  y as be,
  z as ve,
  X as je,
} from './vendor-w5t4XTd4.js';
function k({
  children: t,
  onClick: s,
  className: r,
  hover: a = !1,
  tap: i = !1,
  ...l
}) {
  return e.jsx(v.div, {
    whileHover: { scale: a ? 1.05 : 1 },
    whileTap: { scale: i ? 0.95 : 1 },
    children: e.jsx('button', {
      onClick: s,
      className: x(
        'px-4 py-2 rounded-md hover:cursor-pointer font-lexend-regular transition-all duration-300',
        r
      ),
      ...l,
      children: t,
    }),
  });
}
function Ue({ next: t, prev: s }) {
  return e.jsxs('section', {
    className:
      'pagination w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-10',
    children: [
      e.jsx(u, {
        to: s.href,
        className:
          'w-full sm:w-1/2 border-[1px] border-border hover:border-primary transition-all py-4 px-2 rounded-sm',
        children: e.jsxs('div', {
          className: 'w-full flex items-center justify-start gap-4',
          children: [
            e.jsx(Q, { size: 20, className: 'text-foreground/70' }),
            e.jsx('span', { children: s.label }),
          ],
        }),
      }),
      t &&
        e.jsx(u, {
          to: t.href,
          className:
            'w-full sm:w-1/2 border-[1px] border-border hover:border-primary transition-all py-4 px-2 rounded-sm',
          children: e.jsxs('div', {
            className: 'w-full flex justify-end items-center gap-4',
            children: [
              e.jsx('span', { children: t.label }),
              e.jsx(ee, { size: 20, className: 'text-foreground/70' }),
            ],
          }),
        }),
    ],
  });
}
function We({ children: t, step: s, title: r, content: a, className: i }) {
  return e.jsxs('article', {
    className: x('w-full flex flex-col lg:flex-row my-8', i),
    children: [
      e.jsxs('div', {
        className: 'w-full lg:w-[45%] pr-8',
        children: [
          e.jsxs('div', {
            className: 'flex items-start gap-4 mb-4 mt-1',
            children: [
              e.jsxs('span', {
                className: 'font-mono-regular text-[12px] mt-1',
                children: ['[', s, ']'],
              }),
              e.jsx('span', { className: 'font-lexend-medium', children: r }),
            ],
          }),
          e.jsx('span', {
            className: 'text-sm',
            children: e.jsx(F, { content: a, overwriteStyle: !0 }),
          }),
        ],
      }),
      e.jsx('div', { className: 'w-full lg:w-[55%]', children: t }),
    ],
  });
}
const Ne = ({ children: t, activeIndex: s, tabs: r }) => {
  const [a, i] = z.useState(s ?? 0);
  z.useEffect(() => {
    i(s ?? 0);
  }, [s]);
  const l = (d) => {
    i(d);
  };
  return e.jsxs('section', {
    className: 'w-full flex-col',
    children: [
      e.jsxs('div', {
        className: 'relative w-full flex items-center gap-4 mb-8',
        children: [
          r.map((d, o) =>
            e.jsx(
              we,
              { title: d.title, active: a === o, onClick: () => l(o) },
              o
            )
          ),
          e.jsx('div', {
            className:
              'absolute bottom-0 w-full border-b-[1px] border-b-border z-0',
          }),
        ],
      }),
      e.jsx('div', {
        className: 'w-full',
        children: z.Children.map(t, (d, o) => (o === a ? d : null)),
      }),
    ],
  });
};
Ne.Item = ({ children: t }) => e.jsx(e.Fragment, { children: t });
const we = ({ title: t, active: s, onClick: r }) =>
    e.jsx('div', {
      className: `z-10 cursor-pointer ${s ? 'text-primary border-b-primary hover:border-b-primary hover:text-primary' : 'text-body hover:border-b-primary/70'} font-lexend-medium py-4 border-b-[1px] border-b-border transition-all`,
      onClick: r,
      children: t,
    }),
  Ze = ({ title: t, description: s, status: r, className: a, children: i }) => {
    const l = {
        success:
          'bg-success/10 text-success-800 border-[1px] border-success-800/60',
        error: 'bg-error/10 text-error-800 border-[1px] border-error-800/60',
        warning:
          'bg-warning/10 text-warning-800 border-[1px] border-warning-800/60',
        info: 'bg-info/10 text-info border-[1px] border-info-800/60',
      },
      d = {
        success: e.jsx(U, { className: 'size-5 text-success' }),
        error: e.jsx(L, { className: 'size-5 text-error' }),
        warning: e.jsx(G, { className: 'size-5 text-warning' }),
        info: e.jsx(K, { className: 'size-5 text-info' }),
      };
    return e.jsxs('div', {
      className: x(
        'w-full rounded-lg px-4 py-4 flex items-start gap-3 my-4',
        l[r],
        a
      ),
      children: [
        e.jsx('div', { children: d[r] }),
        e.jsxs('div', {
          children: [
            e.jsxs('div', {
              className: 'flex flex-col gap-2',
              children: [
                e.jsx('span', {
                  className: 'font-lexend-medium text-sm',
                  children: t,
                }),
                s && e.jsx('span', { className: 'text-sm', children: s }),
              ],
            }),
            i &&
              e.jsx('div', {
                className: 'mt-6 flex items-center gap-2',
                children: i,
              }),
          ],
        }),
      ],
    });
  },
  qe = ({ title: t, status: s, link: r, className: a }) => {
    const i = {
        success:
          'bg-success/10 text-success-800 border-[1px] border-success-800/60',
        error: 'bg-error/10 text-error-800 border-[1px] border-error-800/60',
        warning:
          'bg-warning/10 text-warning-800 border-[1px] border-warning-800/60',
        info: 'bg-info/10 text-info border-[1px] border-info-800/60',
      },
      l = {
        success: e.jsx(U, { className: 'size-5 text-success' }),
        error: e.jsx(L, { className: 'size-5 text-error' }),
        warning: e.jsx(G, { className: 'size-5 text-warning' }),
        info: e.jsx(K, { className: 'size-5 text-info' }),
      };
    return e.jsxs('div', {
      className: x(
        'w-full rounded-lg px-4 py-4 flex items-start gap-3 my-4',
        i[s],
        a
      ),
      children: [
        e.jsx('div', { children: l[s] }),
        e.jsxs('div', {
          className: 'flex items-start justify-between w-full',
          children: [
            e.jsx('div', {
              className: 'flex flex-col gap-2',
              children: e.jsx('span', {
                className: 'font-lexend-light text-sm',
                children: t,
              }),
            }),
            e.jsx(u, {
              to: r,
              children: e.jsxs('div', {
                className: 'flex items-center gap-2',
                children: [
                  e.jsx('span', { className: 'text-sm', children: 'Details' }),
                  e.jsx(te, { className: 'size-4' }),
                ],
              }),
            }),
          ],
        }),
      ],
    });
  };
function q({ size: t = 'normal' }) {
  const { setTheme: s, isDark: r } = B(),
    a = () => {
      s(r ? 'light' : 'dark');
    };
  return e.jsx(v.button, {
    id: 'theme-button',
    onClick: a,
    className: x(
      'relative  rounded-md border-[1px] border-primary/40 bg-primary/10 flex items-center justify-center overflow-hidden hover:cursor-pointer',
      t === 'small' ? 'size-7' : 'size-8'
    ),
    whileHover: { scale: 1.05 },
    children: e.jsx(A, {
      children: r
        ? e.jsx(
            v.div,
            {
              initial: { scale: 0 },
              animate: { scale: 1 },
              exit: { scale: 0 },
              className:
                'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
              children: e.jsx(se, { size: 20, className: 'text-primary' }),
            },
            'moon'
          )
        : e.jsx(
            v.div,
            {
              initial: { scale: 0 },
              animate: { scale: 1 },
              exit: { scale: 0 },
              className:
                'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
              children: e.jsx(ne, { size: 20, className: 'text-primary' }),
            },
            'sun'
          ),
    }),
  });
}
const n = () => Math.floor(Math.random() * 1e6),
  N = {
    DOCUMENTATION: 'documentation',
    PACKAGES: 'packages',
    NAVBAR: 'navbar',
  },
  V = {
    [N.DOCUMENTATION]: [
      {
        id: n(),
        name: 'GETTING STARTED',
        icon: e.jsx(ae, { size: 20 }),
        level: 1,
        children: [
          {
            id: n(),
            name: 'Introduction',
            link: '/docs/getting-started/introduction',
            level: 2,
          },
          {
            id: n(),
            name: 'Installation',
            link: '/docs/getting-started/installation',
            level: 2,
          },
          {
            id: n(),
            name: 'Project Structure',
            link: '/docs/getting-started/project-structure',
            level: 2,
          },
          {
            id: n(),
            name: 'Upgrading',
            link: '/docs/getting-started/upgrading',
            level: 2,
            isNew: !0,
          },
        ],
      },
      {
        id: n(),
        name: 'CORE CONCEPTS',
        icon: e.jsx(ie, { size: 20 }),
        level: 1,
        children: [
          {
            id: n(),
            name: 'Routing',
            level: 2,
            children: [
              {
                id: n(),
                name: 'Base Concepts',
                link: '/docs/routing/base-concepts',
                level: 3,
              },
              {
                id: n(),
                name: 'Router',
                link: '/docs/routing/router-configuration',
                level: 3,
              },
              {
                id: n(),
                name: 'Routes',
                link: '/docs/routing/routes',
                level: 3,
              },
              {
                id: n(),
                name: 'Layouts',
                link: '/docs/routing/layouts',
                level: 3,
              },
              {
                id: n(),
                name: 'File-Based Routing',
                link: '/docs/routing/file-based-routing',
                level: 3,
                isNew: !0,
              },
              {
                id: n(),
                name: 'Linking & Navigation',
                link: '/docs/routing/linking-and-navigation',
                level: 3,
              },
              {
                id: n(),
                name: 'Dynamic Routes',
                link: '/docs/routing/dynamic-routes',
                level: 3,
              },
              {
                id: n(),
                name: 'Active Links',
                link: '/docs/routing/active-link',
                level: 3,
                isNew: !0,
              },
              {
                id: n(),
                name: 'Error Handling',
                link: '/docs/routing/error-handling',
                level: 3,
              },
              {
                id: n(),
                name: 'Redirecting',
                link: '/docs/routing/redirecting',
                level: 3,
              },
            ],
          },
          {
            id: n(),
            name: 'Rendering',
            level: 2,
            children: [
              {
                id: n(),
                name: 'Server Side Rendering',
                link: '/docs/rendering/ssr',
                level: 3,
              },
              {
                id: n(),
                name: 'Client Side Rendering',
                link: '/docs/rendering/csr',
                level: 3,
              },
              {
                id: n(),
                name: 'Prerendering',
                link: '/docs/rendering/prerendering',
                level: 3,
                isNew: !0,
              },
            ],
          },
          {
            id: n(),
            name: 'Styling',
            level: 2,
            children: [
              {
                id: n(),
                name: 'CSS Modules',
                link: '/docs/styling/css-modules',
                level: 3,
              },
              {
                id: n(),
                name: 'Tailwind CSS',
                link: '/docs/styling/tailwindcss',
                level: 3,
              },
              {
                id: n(),
                name: 'CSS Preprocessors',
                link: '/docs/styling/preprocessors',
                level: 3,
              },
            ],
          },
          {
            id: n(),
            name: 'Optimizing',
            level: 2,
            children: [
              {
                id: n(),
                name: 'Images',
                link: '/docs/optimizing/images',
                level: 3,
              },
              {
                id: n(),
                name: 'Metadata',
                link: '/docs/optimizing/metadata',
                level: 3,
              },
              {
                id: n(),
                name: 'Static Assets',
                link: '/docs/optimizing/static-assets',
                level: 3,
              },
              {
                id: n(),
                name: 'React Compiler',
                link: '/docs/optimizing/react-compiler',
                level: 3,
                isNew: !0,
              },
            ],
          },
          {
            id: n(),
            name: 'Configuring',
            level: 2,
            children: [
              {
                id: n(),
                name: 'TypeScript',
                link: '/docs/configuring/typescript',
                level: 3,
              },
              {
                id: n(),
                name: 'Environment Variables',
                link: '/docs/configuring/environment-variables',
                level: 3,
              },
              {
                id: n(),
                name: 'Modules Aliases',
                link: '/docs/configuring/modules-aliases',
                level: 3,
              },
            ],
          },
          {
            id: n(),
            name: 'Deploying',
            level: 2,
            children: [
              {
                id: n(),
                name: 'Vercel',
                link: '/docs/deploying/vercel',
                level: 3,
              },
              {
                id: n(),
                name: 'Node Server',
                link: '/docs/deploying/node',
                level: 3,
              },
            ],
          },
        ],
      },
      {
        id: n(),
        name: 'API REFERENCE',
        icon: e.jsx(le, { size: 20 }),
        level: 1,
        children: [
          {
            id: n(),
            name: 'Components',
            level: 2,
            children: [
              {
                id: n(),
                name: 'Link',
                link: '/docs/api-reference/components/link',
                level: 3,
              },
              {
                id: n(),
                name: 'NavLink',
                link: '/docs/api-reference/components/navlink',
                level: 3,
                isNew: !0,
              },
              {
                id: n(),
                name: 'Outlet',
                link: '/docs/api-reference/components/outlet',
                level: 3,
              },
              {
                id: n(),
                name: 'Component',
                link: '/docs/api-reference/components/component',
                level: 3,
              },
              {
                id: n(),
                name: 'Template',
                link: '/docs/api-reference/components/template',
                level: 3,
              },
              {
                id: n(),
                name: 'Layout Component',
                link: '/docs/api-reference/components/layout-component',
                level: 3,
              },
              {
                id: n(),
                name: 'Page Component',
                link: '/docs/api-reference/components/page-component',
                level: 3,
              },
              {
                id: n(),
                name: 'Router Component',
                link: '/docs/api-reference/components/router-component',
                level: 3,
              },
              {
                id: n(),
                name: 'ScrollRestoration',
                link: '/docs/api-reference/components/scroll-restoration',
                level: 3,
                isNew: !0,
              },
            ],
          },
          {
            id: n(),
            name: 'Functions',
            level: 2,
            children: [
              {
                id: n(),
                name: 'defineConfig',
                link: '/docs/api-reference/functions/define-config',
                level: 3,
              },
              {
                id: n(),
                name: 'defineRouter',
                link: '/docs/api-reference/functions/define-router',
                level: 3,
              },
              {
                id: n(),
                name: 'defineRoutesGroup',
                link: '/docs/api-reference/functions/define-routes-group',
                level: 3,
              },
              {
                id: n(),
                name: 'defineStaticPaths',
                link: '/docs/api-reference/functions/define-static-paths',
                level: 3,
                isNew: !0,
              },
              {
                id: n(),
                name: 'renderApp',
                link: '/docs/api-reference/functions/render-app',
                level: 3,
              },
            ],
          },
          {
            id: n(),
            name: 'File Conventions',
            level: 2,
            children: [
              {
                id: n(),
                name: '[name].layout.js',
                link: '/docs/api-reference/conventions/layout-component',
                level: 3,
              },
              {
                id: n(),
                name: '[name].router.js',
                link: '/docs/api-reference/conventions/router-component',
                level: 3,
              },
              {
                id: n(),
                name: '[name].page.js',
                link: '/docs/api-reference/conventions/page-component',
                level: 3,
              },
            ],
          },
          {
            id: n(),
            name: 'rasengan.config.js',
            link: '/docs/api-reference/rasengan-config',
            level: 2,
            children: [],
          },
          {
            id: n(),
            name: 'create-rasengan CLI',
            link: '/docs/api-reference/create-rasengan-cli',
            level: 2,
            children: [],
          },
          {
            id: n(),
            name: 'Rasengan CLI',
            link: '/docs/api-reference/rasengan-cli',
            level: 2,
            children: [],
          },
        ],
      },
    ],
    [N.PACKAGES]: [
      {
        id: n(),
        name: 'Packages',
        icon: e.jsx(re, { size: 20 }),
        level: 1,
        children: [
          { id: n(), name: 'Image', link: '/packages/image', level: 2 },
          { id: n(), name: 'MDX', link: '/packages/mdx', level: 2 },
          { id: n(), name: 'Theme', link: '/packages/theme', level: 2 },
          {
            id: n(),
            name: 'Kurama',
            link: '/packages/kurama',
            level: 2,
            isNew: !0,
          },
          { id: n(), name: 'Query', link: '#', level: 2, isComingSoon: !0 },
          {
            id: n(),
            name: 'Kage Demo',
            link: '/packages/kage-demo',
            level: 2,
            isNew: !0,
          },
          { id: n(), name: 'Sitemap', link: '#', level: 2, isComingSoon: !0 },
          {
            id: n(),
            name: 'I18n',
            link: '/packages/i18n',
            level: 2,
            isNew: !0,
            isBeta: !0,
          },
          {
            id: n(),
            name: 'Create Rasengan CLI',
            link: '/packages/create-rasengan',
            level: 2,
          },
          {
            id: n(),
            name: 'Adapters',
            level: 2,
            children: [
              { id: n(), name: 'Vercel', link: '/packages/vercel', level: 3 },
              { id: n(), name: 'Node', link: '/packages/serve', level: 3 },
              {
                id: n(),
                name: 'Netlify',
                link: '#',
                level: 3,
                isComingSoon: !0,
              },
            ],
          },
        ],
      },
    ],
    [N.NAVBAR]: [
      {
        id: n(),
        name: 'Docs',
        level: 1,
        link: '/docs/getting-started/introduction',
      },
      { id: n(), name: 'Blog', level: 1, link: '/blog' },
      { id: n(), name: 'Showcase', level: 1, link: '/showcase' },
    ],
  },
  ye = I((t) => ({
    isOpen: !1,
    toggle: () => t((s) => ({ isOpen: !s.isOpen })),
  }));
function Y({ size: t = 'md' }) {
  const { isDark: s } = B();
  return e.jsxs(u, {
    to: '/',
    id: 'logo',
    children: [
      e.jsx('div', {
        className: 'md:hidden',
        children: e.jsx(w, {
          src: '/rasengan.svg',
          alt: 'Rasengan Logo',
          width: 40,
          height: 'auto',
        }),
      }),
      e.jsx('div', {
        className: 'hidden md:block',
        children: e.jsx(w, {
          src: s ? '/rasengan-large-white.svg' : '/rasengan-large-normal.svg',
          alt: 'Rasengan Logo',
          width: 160,
          height: 'auto',
        }),
      }),
    ],
  });
}
const ke = I((t) => ({ show: !1, setShow: (s) => t(() => ({ show: s })) }));
function Ve({ className: t }) {
  const { toggle: s } = ye(),
    { show: r } = ke();
  return e.jsx('div', {
    className: x(
      'fixed top-0 left-0 w-full z-30 border-b-[1px] border-b-border/60',
      r ? 'top-[60px]' : 'top-0'
    ),
    children: e.jsxs('header', {
      className: x(
        'w-full h-[60px] bg-background/85 flex items-center justify-between px-2 lg:px-4 backdrop-blur-sm',
        t
      ),
      children: [
        e.jsx('div', {
          className: 'flex items-center gap-2',
          children: e.jsx(Y, { size: 'lg' }),
        }),
        e.jsxs('div', {
          id: 'navigation',
          className: 'hidden md:flex items-center gap-6',
          children: [
            e.jsx('nav', {
              children: e.jsxs('ul', {
                className: 'flex items-center gap-6',
                children: [
                  V.navbar.map((a) =>
                    e.jsx(
                      u,
                      {
                        to: a.link ?? '#',
                        children: e.jsx('li', { children: a.name }),
                      },
                      a.id
                    )
                  ),
                  e.jsx(u, {
                    to: 'https://coff.ee/dilane3',
                    target: '_blank',
                    className: 'relative z-10',
                    children: e.jsxs('li', {
                      className:
                        'flex items-center gap-2 text-primary hover:text-primary/80',
                      children: [
                        e.jsx(W, { size: 20 }),
                        e.jsx('span', { children: 'Support us' }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
            e.jsx('div', {
              className: 'pl-6 border-l border-l-border',
              children: e.jsx(q, {}),
            }),
            e.jsx(u, {
              to: 'https://github.com/rasengan-dev/rasenganjs/tree/main/docs',
              target: '_blank',
              id: 'github',
              children: e.jsx('div', {
                className:
                  'size-8 rounded-full flex items-center justify-center',
                children: e.jsx('svg', {
                  width: '24',
                  height: '24',
                  viewBox: '0 0 1024 1024',
                  fill: 'none',
                  xmlns: 'http://www.w3.org/2000/svg',
                  className: 'fill-foreground',
                  children: e.jsx('path', {
                    fillRule: 'evenodd',
                    clipRule: 'evenodd',
                    d: 'M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z',
                    transform: 'scale(64)',
                  }),
                }),
              }),
            }),
          ],
        }),
        e.jsxs('div', {
          className: 'flex md:hidden gap-4',
          children: [
            e.jsx(u, {
              to: 'https://github.com/rasengan-dev/rasenganjs/tree/main/docs',
              target: '_blank',
              children: e.jsx('div', {
                className:
                  'size-8 rounded-full flex items-center justify-center',
                children: e.jsx('svg', {
                  width: '24',
                  height: '24',
                  viewBox: '0 0 1024 1024',
                  fill: 'none',
                  xmlns: 'http://www.w3.org/2000/svg',
                  className: 'fill-foreground',
                  children: e.jsx('path', {
                    fillRule: 'evenodd',
                    clipRule: 'evenodd',
                    d: 'M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z',
                    transform: 'scale(64)',
                  }),
                }),
              }),
            }),
            e.jsx('div', {
              className: 'flex items-center justify-center cursor-pointer',
              onClick: s,
              children: e.jsx(oe, {
                size: 20,
                className: 'text-foreground/70 rotate-90',
              }),
            }),
          ],
        }),
      ],
    }),
  });
}
function Ye({ className: t, onClose: s }) {
  const [r, a] = p.useState(null),
    { pathname: i } = T();
  p.useEffect(() => {
    i.includes('/docs')
      ? a(N.DOCUMENTATION)
      : i.includes('/packages') && a(N.PACKAGES);
  }, [i]);
  const l = (o) => i.includes(o),
    d = (o) => o.sort((c, m) => c.name.localeCompare(m.name));
  return e.jsx('aside', {
    className: x(
      'w-[280px] border-r-[1px] border-r-border/60 text-foreground',
      t
    ),
    children: e.jsxs('section', {
      className:
        'lg:sticky lg:top-8 w-full h-(--mobile-main-height) lg:h-full max-h-[calc(100vh)] overflow-y-auto pb-16 lg:pt-16 p-6',
      children: [
        e.jsxs('div', {
          className:
            'flex flex-col gap-4 text-sm border-b-[1px] border-b-border pb-8',
          children: [
            e.jsxs('div', {
              className: 'flex items-center mb-6 gap-2',
              children: [
                e.jsx('div', {
                  className:
                    'size-10 rounded-md border-[1px] border-primary/40 bg-primary/10 flex items-center justify-center',
                  children: e.jsx(ce, { size: 20, className: 'text-primary' }),
                }),
                e.jsxs('div', {
                  className: 'flex flex-col gap-1',
                  children: [
                    e.jsx('span', { children: 'Using stable version' }),
                    e.jsx('span', {
                      className: 'text-[12px] text-foreground/60',
                      children: 'v1.2.0',
                    }),
                  ],
                }),
              ],
            }),
            e.jsx(u, {
              to: '/docs/getting-started/introduction',
              children: e.jsxs('div', {
                className: x(
                  'flex items-center gap-4 hover:cursor-pointer hover:text-primary transition-all',
                  l('/docs')
                    ? 'text-primary font-lexend-medium'
                    : 'text-foreground/90'
                ),
                onClick: () => {
                  (a(N.DOCUMENTATION), s && s());
                },
                children: [
                  e.jsx(de, { size: 20 }),
                  e.jsx('span', { children: 'Documentation' }),
                ],
              }),
            }),
            e.jsx(u, {
              to: '/packages',
              children: e.jsxs('div', {
                className: x(
                  'flex items-center gap-4 hover:cursor-pointer hover:text-primary transition-all',
                  l('/packages')
                    ? 'text-primary font-lexend-medium'
                    : 'text-foreground/90'
                ),
                onClick: () => {
                  (a(N.PACKAGES), s && s());
                },
                children: [
                  e.jsx(me, { size: 20 }),
                  e.jsx('span', { children: 'Packages' }),
                ],
              }),
            }),
            e.jsx(u, {
              to: 'https://hub.rasengan.dev',
              target: '_blank',
              children: e.jsxs('div', {
                className:
                  'flex items-center gap-4 text-foreground/90 hover:cursor-pointer hover:text-primary transition-all',
                children: [
                  e.jsx(xe, { size: 20 }),
                  e.jsx('span', { children: 'Templates' }),
                ],
              }),
            }),
            e.jsx(u, {
              to: 'https://ui.rasengan.dev',
              target: '_blank',
              children: e.jsxs('div', {
                className:
                  'flex items-center gap-4 text-foreground/90 hover:cursor-pointer hover:text-primary transition-all',
                children: [
                  e.jsx(ue, { size: 20 }),
                  e.jsx('span', { children: 'Rasengan UI Kit' }),
                ],
              }),
            }),
          ],
        }),
        r &&
          V[r].map((o) =>
            e.jsxs(
              'div',
              {
                className: 'mt-8',
                children: [
                  e.jsxs('div', {
                    className: 'flex items-center gap-2 text-foreground/60',
                    children: [
                      o.icon,
                      e.jsx('span', {
                        className: 'font-mono text-[12px]',
                        children: o.name,
                      }),
                    ],
                  }),
                  e.jsx('div', {
                    className: 'flex flex-col w-full text-sm py-4',
                    children:
                      o.children &&
                      (r === N.DOCUMENTATION ? o.children : d(o.children)).map(
                        (c) =>
                          c.visible === !1
                            ? null
                            : e.jsx(
                                p.Fragment,
                                {
                                  children: e.jsx(E, {
                                    item: c,
                                    isActive: l,
                                    onClose: s,
                                  }),
                                },
                                c.id
                              )
                      ),
                  }),
                ],
              },
              o.id
            )
          ),
      ],
    }),
  });
}
const E = ({ item: t, className: s, isActive: r, onClose: a }) => {
    const [i, l] = p.useState(!1),
      { pathname: d } = T();
    p.useEffect(() => {
      o() && l(!0);
    }, []);
    const o = () =>
        t.children ? t.children.some((m) => r(m.link ?? '#nothing')) : !1,
      c = (m) =>
        d.includes('/docs')
          ? m
          : d.includes('/packages')
            ? m.sort((g, j) => g.name.localeCompare(j.name))
            : m.sort((g, j) => g.name.localeCompare(j.name));
    return t.link
      ? e.jsxs(u, {
          to: t.link,
          onClick: () => a && a(),
          children: [
            e.jsxs('div', {
              className: x(
                'flex items-center justify-between pl-4 py-1 border-l-[1px] border-l-border  cursor-pointer hover:text-primary/80 hover:border-l-primary/60 transition-all duration-300',
                s,
                r(t.link)
                  ? 'text-primary border-l-primary hover:text-primary hover:border-l-primary font-lexend-medium'
                  : 'text-foreground/90',
                t.isComingSoon && 'text-foreground/40 hover:text-foreground/40'
              ),
              onClick: () => l((m) => !m),
              children: [
                t.isBeta
                  ? e.jsxs('div', {
                      className: 'flex items-center gap-2',
                      children: [
                        e.jsx('span', { children: t.name }),
                        e.jsx(pe, { size: 16, className: 'text-green-500' }),
                      ],
                    })
                  : e.jsx('span', { children: t.name }),
                t.isNew &&
                  e.jsx('span', {
                    className:
                      'text-[10px] text-primary-foreground bg-primary px-2 py-1 rounded-full',
                    children: 'New',
                  }),
                t.isComingSoon &&
                  e.jsx('span', {
                    className:
                      'text-[10px] text-primary-foreground bg-orange-500 px-2 py-1 rounded-full',
                    children: 'Coming Soon',
                  }),
                t.children &&
                  t.children.length > 0 &&
                  e.jsx(M, {
                    size: 16,
                    className: x(
                      'transition-all duration-300',
                      i ? '' : '-rotate-90'
                    ),
                  }),
              ],
            }),
            e.jsx(A, {
              children:
                i &&
                e.jsx(
                  v.div,
                  {
                    initial: 'collapsed',
                    animate: 'open',
                    exit: 'collapsed',
                    variants: {
                      open: { height: 'auto' },
                      collapsed: { height: 0 },
                    },
                    transition: { duration: 0.3, ease: 'easeInOut' },
                    className: 'overflow-hidden',
                    children:
                      t.children &&
                      c(t.children).map((m) =>
                        m.visible === !1
                          ? null
                          : e.jsx(
                              E,
                              {
                                item: m,
                                className: m.level === 2 ? '' : 'pl-8',
                                isActive: r,
                                onClose: a,
                              },
                              m.id
                            )
                      ),
                  },
                  t.id
                ),
            }),
          ],
        })
      : e.jsxs('div', {
          children: [
            e.jsxs('div', {
              className: x(
                'flex items-center justify-between pl-4 py-1 border-l-[1px] border-l-border text-foreground/90 cursor-pointer hover:text-primary/80 hover:border-l-primary/60 transition-all',
                s,
                o()
                  ? 'text-primary border-l-primary hover:text-primary hover:border-l-primary font-lexend-medium'
                  : 'text-foreground/90'
              ),
              onClick: () => l((m) => !m),
              children: [
                e.jsx('span', { children: t.name }),
                t.children &&
                  t.children.length > 0 &&
                  e.jsx(M, {
                    size: 16,
                    className: x(
                      'transition-all duration-300',
                      i ? '' : '-rotate-90'
                    ),
                  }),
              ],
            }),
            e.jsx(A, {
              children:
                i &&
                e.jsx(
                  v.div,
                  {
                    initial: 'collapsed',
                    animate: 'open',
                    exit: 'collapsed',
                    variants: {
                      open: { height: 'auto' },
                      collapsed: { height: 0 },
                    },
                    transition: { duration: 0.3, ease: 'easeInOut' },
                    className: 'overflow-hidden',
                    children:
                      t.children &&
                      c(t.children).map((m) =>
                        m.visible === !1
                          ? null
                          : e.jsx(
                              E,
                              {
                                item: m,
                                className: m.level === 2 ? '' : 'pl-8',
                                isActive: r,
                                onClose: a,
                              },
                              m.id
                            )
                      ),
                  },
                  t.id
                ),
            }),
          ],
        });
  },
  Ce = he.create({ baseURL: 'https://api.smadmail.com/api/v1', timeout: 1e4 }),
  Se = { BASE_URL: '/', DEV: !1, MODE: 'production', PROD: !0, SSR: !1 },
  D = Se,
  Re = {
    subscribe: async (t) => {
      try {
        const s = {
          email: t,
          project_id: D.RASENGAN_SMAD_PROJECT_ID,
          private_key: D.RASENGAN_SMAD_PRIVATE_KEY,
        };
        return (await Ce.post('/email/save', s)).status === 201
          ? { data: 'Your subscrition has been done' }
          : { error: 'Error while subscribing to the newsletter' };
      } catch {
        return { error: 'Error while subscribing to the newsletter' };
      }
    },
  };
function $e() {
  const { isDark: t } = B(),
    [s, r] = p.useState(!1),
    [a, i] = p.useState(null),
    [l, d] = p.useState('');
  p.useEffect(() => {
    if (a === null) return;
    const c = setTimeout(() => {
      i(null);
    }, 5e3);
    return () => {
      clearTimeout(c);
    };
  }, [a]);
  const o = async () => {
    if (!l) return;
    r(!0);
    const { data: c } = await Re.subscribe(l);
    (r(!1), c ? (i(!0), d('')) : i(!1));
  };
  return e.jsxs('footer', {
    className: x(
      'w-full px-[20px] md:px-[50px] py-8 pb-16 lg:pb-0 border-t-[1px] border-t-border/60',
      t ? 'bg-white/2' : 'bg-black/2'
    ),
    children: [
      e.jsxs('div', {
        className: 'max-w-[1500px] mx-auto',
        children: [
          e.jsxs('div', {
            className:
              'flex flex-col lg:flex-row items-start justify-between gap-x-2 gap-y-8',
            children: [
              e.jsxs('div', {
                className: 'w-7/10 flex flex-col lg:flex-row gap-8',
                children: [
                  e.jsx('div', {
                    className: 'w-full lg:w-1/3',
                    children: e.jsx(Y, {}),
                  }),
                  e.jsxs('div', {
                    className: 'w-full lg:w-1/3',
                    children: [
                      e.jsx('h3', {
                        className: 'text-lg font-lexend-medium',
                        children: 'Resources',
                      }),
                      e.jsx('nav', {
                        className: 'mt-4 text-sm',
                        children: e.jsxs('ul', {
                          className: 'flex flex-col gap-2',
                          children: [
                            e.jsx(u, {
                              to: '/docs/getting-started/introduction',
                              className: 'hover:text-primary',
                              children: e.jsx('li', { children: 'Docs' }),
                            }),
                            e.jsx(u, {
                              to: '/packages',
                              className: 'hover:text-primary',
                              children: e.jsx('li', { children: 'Packages' }),
                            }),
                            e.jsx(u, {
                              to: '/blog',
                              className: 'hover:text-primary',
                              children: e.jsx('li', { children: 'Blog' }),
                            }),
                            e.jsx(u, {
                              to: '/showcase',
                              className: 'hover:text-primary',
                              children: e.jsx('li', { children: 'Showcase' }),
                            }),
                            e.jsx(u, {
                              to: 'https://coff.ee/dilane3',
                              target: '_blank',
                              className: 'relative z-10',
                              children: e.jsxs('li', {
                                className:
                                  'flex items-center gap-2 text-primary hover:text-primary/80',
                                children: [
                                  e.jsx('span', { children: 'Support us' }),
                                  e.jsx(W, { size: 16 }),
                                ],
                              }),
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  e.jsxs('div', {
                    className: 'w-full lg:w-1/3',
                    children: [
                      e.jsx('h3', {
                        className: 'text-lg font-lexend-medium',
                        children: 'Community',
                      }),
                      e.jsx('nav', {
                        className: 'mt-4 text-sm',
                        children: e.jsxs('ul', {
                          className: 'flex flex-col gap-2',
                          children: [
                            e.jsx(u, {
                              to: 'https://github.com/rasengan-dev/rasenganjs/discussions',
                              className: 'hover:text-primary',
                              target: '_blank',
                              children: e.jsx('li', { children: 'Github' }),
                            }),
                            e.jsx(u, {
                              to: 'https://twitter.com/rasenganjs',
                              className: 'hover:text-primary',
                              target: '_blank',
                              children: e.jsx('li', {
                                children: 'X (Twitter)',
                              }),
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs('div', {
                className: 'w-full lg:w-3/10 lg:min-w-[200px] max-w-[400px]',
                children: [
                  e.jsx('h3', {
                    className: 'text-lg font-lexend-medium',
                    children: 'Subscribe to the Newsletter',
                  }),
                  e.jsx('p', {
                    className: 'mt-4 text-sm',
                    children:
                      'Stay informed to the news about rasengan.js including new releases, events, etc...',
                  }),
                  e.jsxs('div', {
                    className: 'w-full mt-4 flex gap-2',
                    children: [
                      e.jsx('input', {
                        className: x(
                          'w-full text-sm rounded-md py-2 px-4 outline-none outline-0 border-[1px] border-border '
                        ),
                        placeholder: 'yourname@domain.com',
                        value: l,
                        onChange: (c) => d(c.target.value),
                      }),
                      e.jsx(k, {
                        className:
                          'bg-primary hover:bg-primary/80 text-primary-foreground text-sm rounded-md',
                        onClick: o,
                        disabled: !l,
                        children: s ? 'Subscribing...' : 'Subscribe',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          e.jsxs('div', {
            className:
              'h-[60px] flex items-center justify-between mt-12 border-t-[1px] border-t-border',
            children: [
              e.jsxs('p', {
                className: 'text-sm',
                children: [
                  '© 2024-',
                  new Date(Date.now()).getFullYear(),
                  ' Rasengan Labs, All rights reserved.',
                ],
              }),
              e.jsx(q, {}),
            ],
          }),
        ],
      }),
      e.jsx(A, {
        children:
          typeof a == 'boolean' &&
          (a
            ? e.jsxs(v.div, {
                initial: { opacity: 0, y: 300 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 300 },
                transition: { duration: 0.5 },
                className:
                  'fixed bottom-8 right-8 flex items-center gap-4 px-4 w-full max-w-[300px] min-h-[60px] rounded-2xl border-[1px] border-border bg-background shadow-3xl shadow-black/40',
                children: [
                  e.jsx(Z, { size: 20, className: 'text-green-400' }),
                  e.jsx('span', {
                    className: 'text-sm',
                    children: 'Your subscription is done!',
                  }),
                ],
              })
            : e.jsxs(v.div, {
                initial: { opacity: 0, y: 300 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 300 },
                transition: { duration: 0.5 },
                className:
                  'fixed bottom-8 right-8 flex items-center gap-4 px-4 w-full max-w-[300px] min-h-[60px] rounded-2xl border-[1px] border-border bg-background shadow-3xl shadow-black/40',
                children: [
                  e.jsx(L, { size: 20, className: 'text-red-400' }),
                  e.jsx('span', {
                    className: 'text-sm',
                    children: 'Something went wrong!',
                  }),
                ],
              })),
      }),
    ],
  });
}
const O = {};
function Xe({ alwaysToTop: t = !1, target: s }) {
  const r = T(),
    a = p.useRef(r.pathname);
  return (
    p.useEffect(() => {
      if (typeof window > 'u') return;
      const i = a.current,
        l = s?.current;
      if (t) {
        (l ? l.scrollTo(0, 0) : window.scrollTo(0, 0),
          (a.current = r.pathname));
        return;
      }
      i && (O[i] = l ? l.scrollTop : window.scrollY);
      const d = O[r.pathname] ?? 0;
      (l ? l.scrollTo(0, d) : window.scrollTo(0, d), (a.current = r.pathname));
    }, [r.pathname, s?.current]),
    null
  );
}
const Ae = ({ rect: t }) => (
    p.useEffect(() => {
      if (!t) return;
      const s = document.body.style.overflow;
      return (
        (document.body.style.overflow = 'hidden'),
        () => {
          document.body.style.overflow = s;
        }
      );
    }, [t]),
    t
      ? e.jsx('div', {
          className: 'kage-demo-overlay',
          style: {
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            pointerEvents: 'none',
            WebkitMask:
              'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: `${t.top}px ${window.innerWidth - (t.left + t.width)}px ${window.innerHeight - (t.top + t.height)}px ${t.left}px`,
            transition: 'padding 0.5s ease-in-out',
          },
        })
      : null
  ),
  Te = ({ step: t, onNext: s, onPrev: r, onEnd: a }) => {
    const i = p.useRef(null),
      [l, d] = p.useState({}),
      [o, c] = p.useState(null);
    return (
      p.useEffect(() => {
        if (typeof window > 'u') return;
        const m = document.querySelector(t.target);
        c(m);
      }, [t.target]),
      p.useEffect(() => {
        if (!o || !i.current) return;
        const m = i.current,
          g = () => {
            if (!o || !i.current) return;
            const h = o.getBoundingClientRect(),
              f = m.getBoundingClientRect(),
              b = 10,
              $ = {
                top: {
                  top: h.top - f.height - b,
                  left: h.left + h.width / 2 - f.width / 2,
                },
                bottom: {
                  top: h.bottom + b,
                  left: h.left + h.width / 2 - f.width / 2,
                },
                left: {
                  top: h.top + h.height / 2 - f.height / 2,
                  left: h.left - f.width - b,
                },
                right: {
                  top: h.top + h.height / 2 - f.height / 2,
                  left: h.right + b,
                },
              },
              R = {
                top: h.top,
                bottom: window.innerHeight - h.bottom,
                left: h.left,
                right: window.innerWidth - h.right,
              };
            let C = 'bottom';
            R.bottom > f.height + b
              ? (C = 'bottom')
              : R.top > f.height + b
                ? (C = 'top')
                : R.right > f.width + b
                  ? (C = 'right')
                  : R.left > f.width + b && (C = 'left');
            const P = $[C],
              X = Math.max(
                b,
                Math.min(P.top, window.innerHeight - f.height - b)
              ),
              J = Math.max(
                b,
                Math.min(P.left, window.innerWidth - f.width - b)
              );
            d({ top: X, left: J, position: 'fixed' });
          },
          j = new ResizeObserver(() => {
            g();
          });
        return (
          j.observe(m),
          window.addEventListener('resize', g),
          window.addEventListener('scroll', g, !0),
          requestAnimationFrame(g),
          () => {
            (j.disconnect(),
              window.removeEventListener('resize', g),
              window.removeEventListener('scroll', g, !0));
          }
        );
      }, [o, t.target]),
      o
        ? e.jsx('div', {
            ref: i,
            className: 'kage-demo-tooltip',
            style: l,
            children: t.render({ next: s, prev: r, end: a }),
          })
        : null
    );
  },
  ze = ({
    autoStart: t = !1,
    currentStep: s,
    highlightRect: r,
    start: a,
    next: i,
    prev: l,
    end: d,
  }) => (
    p.useEffect(() => {
      t && a();
    }, [t]),
    s === null
      ? null
      : e.jsxs(e.Fragment, {
          children: [
            e.jsx(Ae, { rect: r }),
            e.jsx(Te, { step: s, onNext: i, onPrev: l, onEnd: d }),
          ],
        })
  );
function Ee(t) {
  const [s, r] = p.useState({ index: -1, step: null, rect: null }),
    a = (c) => {
      if (typeof window > 'u') return;
      if (c < 0 || c >= t.length) {
        r({ index: -1, step: null, rect: null });
        return;
      }
      const m = t[c],
        g = document.querySelector(m.target);
      if (!g) {
        r({ index: c, step: m, rect: null });
        return;
      }
      g.scrollIntoView({ behavior: 'instant', block: 'center' });
      const j = g.getBoundingClientRect();
      r({ index: c, step: m, rect: j });
    },
    i = () => a(0),
    l = () => r({ index: -1, step: null, rect: null }),
    d = () => a(s.index + 1 < t.length ? s.index + 1 : -1),
    o = () => a(s.index > 0 ? s.index - 1 : 0);
  return {
    currentStep: s.step,
    currentIndex: s.index,
    highlightRect: s.rect,
    start: i,
    next: d,
    prev: o,
    end: l,
  };
}
function Le({ next: t, end: s }) {
  return e.jsxs('div', {
    className:
      'bg-background border border-border rounded-lg shadow-xl p-6 max-w-md',
    children: [
      e.jsxs('div', {
        className: 'mb-4',
        children: [
          e.jsx('h2', {
            className: 'text-2xl font-bold text-foreground mb-2',
            children: 'Welcome to Rasengan.js',
          }),
          e.jsx('p', {
            className: 'text-foreground/70',
            children:
              "Let's take a quick tour to help you get started with the key features.",
          }),
        ],
      }),
      e.jsx('div', {
        className: 'mb-6',
        children: e.jsx('p', {
          className: 'text-gray-700',
          children: 'This is the LOGO of Rasengan.js.',
        }),
      }),
      e.jsxs('div', {
        className: 'flex justify-between items-center',
        children: [
          e.jsx('button', {
            onClick: s,
            className: 'text-gray-500 hover:text-gray-700 text-sm font-medium',
            children: 'Skip tour',
          }),
          e.jsx('button', {
            onClick: t,
            className:
              'bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors',
            children: 'Next',
          }),
        ],
      }),
    ],
  });
}
function Be({ next: t, prev: s }) {
  return e.jsxs('div', {
    className:
      'bg-background border border-border rounded-lg shadow-xl p-6 max-w-md',
    children: [
      e.jsxs('div', {
        className: 'mb-4',
        children: [
          e.jsx('h2', {
            className: 'text-2xl font-bold text-foreground mb-2',
            children: 'Welcome to Rasengan.js',
          }),
          e.jsx('p', {
            className: 'text-foreground/70',
            children:
              "Let's take a quick tour to help you get started with the key features.",
          }),
        ],
      }),
      e.jsx('div', {
        className: 'mb-6',
        children: e.jsx('p', {
          className: 'text-gray-700',
          children: 'This is the Navigation section of the documentation',
        }),
      }),
      e.jsxs('div', {
        className: 'flex justify-between items-center',
        children: [
          e.jsx('button', {
            onClick: s,
            className: 'text-gray-500 hover:text-gray-700 text-sm font-medium',
            children: 'Prev',
          }),
          e.jsx('button', {
            onClick: t,
            className:
              'bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors',
            children: 'Next',
          }),
        ],
      }),
    ],
  });
}
function Ie({ next: t, prev: s }) {
  return e.jsxs('div', {
    className:
      'bg-background border border-border rounded-lg shadow-xl p-6 max-w-md',
    children: [
      e.jsxs('div', {
        className: 'mb-4',
        children: [
          e.jsx('h2', {
            className: 'text-2xl font-bold text-foreground mb-2',
            children: 'Welcome to Rasengan.js',
          }),
          e.jsx('p', {
            className: 'text-foreground/70',
            children:
              "Let's take a quick tour to help you get started with the key features.",
          }),
        ],
      }),
      e.jsx('div', {
        className: 'mb-6',
        children: e.jsx('p', {
          className: 'text-gray-700',
          children: 'This is the Theme Button',
        }),
      }),
      e.jsxs('div', {
        className: 'flex justify-between items-center',
        children: [
          e.jsx('button', {
            onClick: s,
            className: 'text-gray-500 hover:text-gray-700 text-sm font-medium',
            children: 'Prev',
          }),
          e.jsx('button', {
            onClick: t,
            className:
              'bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors',
            children: 'Next',
          }),
        ],
      }),
    ],
  });
}
function Pe({ prev: t, end: s }) {
  return e.jsxs('div', {
    className: 'bg-white rounded-lg shadow-xl p-6 max-w-md',
    children: [
      e.jsxs('div', {
        className: 'mb-4',
        children: [
          e.jsx('h2', {
            className: 'text-2xl font-bold text-gray-900 mb-2',
            children: "You're All Set! 🎉",
          }),
          e.jsx('p', {
            className: 'text-gray-600',
            children:
              "That's the end of our quick tour. You're ready to dive in!",
          }),
        ],
      }),
      e.jsx('div', {
        className: 'mb-6',
        children: e.jsx('p', {
          className: 'text-gray-700 mb-4',
          children: 'Star us on GITHUB here',
        }),
      }),
      e.jsxs('div', {
        className: 'flex justify-between items-center',
        children: [
          e.jsx('button', {
            onClick: t,
            className: 'text-gray-500 hover:text-gray-700 text-sm font-medium',
            children: '← Previous',
          }),
          e.jsx('button', {
            onClick: s,
            className:
              'bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors',
            children: 'Finish Tour',
          }),
        ],
      }),
    ],
  });
}
const Me = [
  { target: '#logo', render: (t) => e.jsx(Le, { ...t }) },
  { target: '#navigation', render: (t) => e.jsx(Be, { ...t }) },
  { target: '#theme-button', render: (t) => e.jsx(Ie, { ...t }) },
  { target: '#github', render: (t) => e.jsx(Pe, { ...t }) },
];
function Je() {
  const t = Ee(Me);
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx(ze, { ...t }),
      e.jsx(k, {
        onClick: t.start,
        className:
          'bg-primary text-primary-foreground font-lexend-light h-[48px] px-6 w-full md:w-auto',
        children: 'Start Trial',
      }),
    ],
  });
}
function Qe({ post: t }) {
  return e.jsxs('article', {
    className:
      'w-full border-[1px] border-border/60 rounded-2xl overflow-hidden bg-background flex flex-col',
    children: [
      e.jsx('img', {
        src: t.image,
        alt: t.title,
        width: 400,
        height: 300,
        className: 'w-full h-auto object-cover',
      }),
      e.jsxs('div', {
        className: 'w-full h-full p-4 flex flex-col justify-between',
        children: [
          e.jsxs('div', {
            children: [
              e.jsxs('div', {
                className: 'flex items-baseline justify-between',
                children: [
                  e.jsx('span', {
                    className: 'text-foreground/60 font-lexend-light text-sm',
                    children: t.postedAt,
                  }),
                  e.jsx('div', {
                    children: e.jsxs('span', {
                      className: 'text-foreground/80 font-lexend-light text-sm',
                      children: [t.readingTime, ' read'],
                    }),
                  }),
                ],
              }),
              e.jsxs('div', {
                children: [
                  e.jsx('h3', {
                    className: 'text-xl font-lexend-medium text-pretty my-3',
                    children: t.title,
                  }),
                  e.jsx('p', {
                    className: 'text-foreground/70 font-lexend-light text-sm',
                    children: t.description,
                  }),
                ],
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'flex items-center justify-between mt-3',
            children: [
              e.jsx(u, {
                to: t.link,
                children: e.jsx(k, {
                  className:
                    'px-0 font-lexend-normal text-primary/80 hover:text-primary',
                  children: 'Read More',
                }),
              }),
              e.jsx('div', {
                className: 'relative w-20 h-[30px]',
                children: t.authors.map((s, r) =>
                  e.jsx('div', {
                    className: 'absolute top-0 right-0',
                    children: e.jsx(
                      w,
                      {
                        src: s.avatar,
                        alt: s.name,
                        width: 30,
                        height: 30,
                        className: 'rounded-full border-1 border-background',
                        style: { right: `${r * 16}px` },
                      },
                      r
                    ),
                  })
                ),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const De = '/assets/cta-light-BZmS7J4g.png',
  Oe = '/assets/cta-grid-DX6-ltQT.svg';
function et() {
  return e.jsxs('div', {
    className:
      'relative max-w-[1000px] mx-auto overflow-hidden bg-[#000E24] border-[1px] border-border/60 rounded-2xl',
    children: [
      e.jsxs('div', {
        className:
          'z-20 relative flex flex-col items-center justify-center gap-4 p-4 pb-8',
        children: [
          e.jsx(w, {
            src: '/rasengan.svg',
            alt: 'Blue light illustration',
            className: 'object-cover',
            width: 85,
            height: 85,
          }),
          e.jsx('h2', {
            className:
              'text-3xl lg:text-[46px] font-lexend-medium text-center text-white',
            children: 'Speed & Simplicity, Unleashed.',
          }),
          e.jsx('p', {
            className: 'text-lg text-white/70 font-lexend-light text-center',
            children:
              'Rasengan.js gives you the power to build ultra-fast, scalable web apps effortlessly.',
          }),
          e.jsx(u, {
            to: '/docs/getting-started/introduction',
            children: e.jsx(k, {
              hover: !0,
              tap: !0,
              className: 'bg-primary text-primary-foreground',
              children: 'Get started now',
            }),
          }),
        ],
      }),
      e.jsx('div', {
        className: 'z-0 absolute top-0 right-0',
        children: e.jsx(w, {
          src: De,
          alt: 'Blue light illustration',
          className: 'w-full object-cover',
        }),
      }),
      e.jsx('div', {
        className: 'z-10 absolute top-0 right-0 left-0 w-full opacity-40',
        children: e.jsx(w, {
          src: Oe,
          alt: 'Blue light illustration',
          className: 'w-full object-contain object-center',
          width: '100%',
        }),
      }),
    ],
  });
}
function tt({ title: t, description: s, className: r = '' }) {
  return e.jsxs('div', {
    className: x('w-full flex flex-col', r),
    children: [
      e.jsx('h1', { className: 'text-lg text-primary', children: t }),
      e.jsx('p', {
        className:
          'text-[36px] md:text-[46px] md:leading-[50px] font-lexend-medium text-foreground max-w-[700px] mt-4',
        children: s,
      }),
    ],
  });
}
const y = { dilaneKombou: '@dilanekombou' },
  S = {
    [y.dilaneKombou]: {
      id: 1,
      name: 'Dilane Kombou',
      username: y.dilaneKombou,
      avatar: '/assets/blog/authors/dilane-kombou.jpeg',
      link: 'https://twitter.com/dilanekombou',
    },
  },
  He = [
    {
      id: n(),
      title: 'Rasengan v1.2.0 - Introducing SSG Rendering mode',
      description: `
      We are publishing Rasengan v1.2.0, a new version of the framework that introduces you the SSG rendering mode.
    `,
      authors: [S[y.dilaneKombou]],
      postedAt: 'January 03, 2026',
      link: '/blog/rasengan-v1-2-0',
      image: '/assets/blog/rasengan-1.2.0.png',
      readingTime: '5 min',
    },
    {
      id: n(),
      title: 'Rasengan v1.1.3 - Introducing ScrollRestoration',
      description: `
      We are publishing Rasengan v1.1.3, a new version of the framework that introduces you the ScrollRestoration component.
    `,
      authors: [S[y.dilaneKombou]],
      postedAt: 'August 30, 2025',
      link: '/blog/rasengan-v1-1-3',
      image: '/assets/blog/rasengan-1.1.3.png',
      readingTime: '2 min',
    },
    {
      id: n(),
      title: 'Rasengan v1.1.0 - Introducing file-based routing',
      description: `
      We are publishing Rasengan v1.1.0, a new version of the framework that introduces you the file-based routing feature.
    `,
      authors: [S[y.dilaneKombou]],
      postedAt: 'August 16, 2025',
      link: '/blog/rasengan-v1-1-0',
      image: '/assets/blog/rasengan-1.1.0.png',
      readingTime: '3 min',
    },
    {
      id: n(),
      title: 'Rasengan v1 Stable',
      description: `
      Rasengan v1 is now stable and ready for production use. This release includes a lot of new features and code base improvements.
    `,
      authors: [S[y.dilaneKombou]],
      postedAt: 'April 26, 2025',
      link: '/blog/rasengan-v1-stable',
      image: '/assets/blog/rasengan-stable1.png',
      readingTime: '5 min',
    },
    {
      id: n(),
      title: 'Rasengan 1.0.0 Beta',
      description: `
      We are launching the first beta version of Rasengan.js, a modern React Framework that you can use to create high-quality web applications.
    `,
      authors: [S[y.dilaneKombou]],
      postedAt: 'April 25, 2024',
      link: '/blog/rasengan-1-beta',
      image: '/assets/blog/rasengan-beta1.png',
      readingTime: '3 min',
    },
  ],
  _e = I(() => ({ blog: He }));
function st({ children: t, text: s, className: r }) {
  return e.jsxs('span', {
    className: x(
      'relative inline-flex items-center h-[40px] bg-primary/10 text-primary px-4 py-2 rounded-md text-sm font-lexend-light',
      r
    ),
    children: [s, t],
  });
}
const H = [
    {
      id: 1,
      title: 'index.ts',
      code: "```js\nimport { renderApp } from 'rasengan/client';\nimport App from './main';\nimport AppRouter from '@/app/app.router';\n\nrenderApp(App, AppRouter, { reactStrictMode: true });\n```",
    },
    {
      id: 2,
      title: 'main.tsx',
      code: `\`\`\`jsx
import "@rasenganjs/image/css";
import "@/styles/index.css";

export default function App({ Component, children }: AppProps) {
  return <Component>{children}</Component>;
}
\`\`\``,
    },
    {
      id: 3,
      title: 'app.router.ts',
      code: `\`\`\`ts
import { RouterComponent, defineRouter } from "rasengan";
import Home from "@/app/home.page";
import AppLayout from "@/app/app.layout";

class AppRouter extends RouterComponent {}

export default defineRouter({
  imports: [],
  layout: AppLayout,
  pages: [Home],
})(AppRouter);
\`\`\``,
    },
    {
      id: 4,
      title: 'app.layout.tsx',
      code: `\`\`\`jsx
import React from "react";
import { Outlet, LayoutComponent } from "rasengan";

const AppLayout: LayoutComponent = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

AppLayout.path = "/";

export default AppLayout;
\`\`\``,
    },
    {
      id: 5,
      title: 'home.page.tsx',
      code: `\`\`\`jsx
import { PageComponent, Link } from "rasengan";
import Image from "@rasenganjs/image";

const Home: PageComponent = () => {
  return (
    <section className="w-full h-full">
      <h1>Home</h1>
    </section>
  );
};

Home.path = "/";
Home.metadata = {
  title: "Home",
  description: "Home page",
};

export default Home;
\`\`\``,
    },
  ],
  _ = [
    {
      id: 1,
      title: 'index.ts',
      code: "```js\nimport { renderApp } from 'rasengan/client';\nimport App from './main';\nimport AppRouter from '@/app/app.router';\n\nrenderApp(App, AppRouter, { reactStrictMode: true });\n```",
    },
    {
      id: 2,
      title: 'main.tsx',
      code: `\`\`\`jsx
import "@rasenganjs/image/css";
import "@/styles/index.css";

export default function App({ Component, children }: AppProps) {
  return <Component>{children}</Component>;
}
\`\`\``,
    },
    {
      id: 3,
      title: 'app.router.ts',
      code: '```ts\nimport Router from "vitual:rasengan/router";\n\nexport default Router;\n```',
    },
    {
      id: 4,
      title: 'layout.tsx',
      code: `\`\`\`jsx
import React from "react";
import { Outlet, LayoutComponent } from "rasengan";

const RootLayout: LayoutComponent = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default RootLayout;
\`\`\``,
    },
    {
      id: 5,
      title: 'index.page.tsx',
      code: `\`\`\`jsx
import { PageComponent, Link } from "rasengan";
import Image from "@rasenganjs/image";

const Page: PageComponent = () => {
  return (
    <section className="w-full h-full">
      <h1>Home</h1>
    </section>
  );
};

Page.metadata = {
  title: "Home",
  description: "Home page",
};

export default Page;
\`\`\``,
    },
  ];
function nt({ children: t, className: s, ...r }) {
  const [a, i] = p.useState(2),
    [l, d] = p.useState('file'),
    o = () =>
      l === 'config' ? H.find((c) => c.id === a) : _.find((c) => c.id === a);
  return e.jsxs('div', {
    className: 'flex flex-col',
    children: [
      e.jsxs('div', {
        className: 'w-auto flex items-center justify-center gap-2 text-sm',
        children: [
          e.jsx('div', {
            onClick: () => d('file'),
            className: x(
              'rounded-lg border border-border py-2 px-4 cursor-pointer',
              l === 'file' && 'bg-primary text-primary-foreground'
            ),
            children: 'File-based Routing',
          }),
          e.jsx('div', {
            onClick: () => d('config'),
            className: x(
              'rounded-lg border border-border py-2 px-4 cursor-pointer',
              l === 'config' && 'bg-primary text-primary-foreground'
            ),
            children: 'Config-based Routing',
          }),
        ],
      }),
      e.jsxs('div', {
        className: 'w-full lg:h-[450px] lg:min-w-[600px] mt-4',
        children: [
          e.jsx('div', {
            className:
              'w-full h-[50px] flex items-center bg-[#10141e] rounded-t-lg px-2 gap-2 overflow-x-auto',
            children: (l === 'file' ? _ : H).map((c) =>
              e.jsx(
                Fe,
                { title: c.title, active: a === c.id, onClick: () => i(c.id) },
                c.id
              )
            ),
          }),
          e.jsx('div', {
            className:
              'h-auto lg:h-[400px] max-h-[400px] min-h-[200px] overflow-auto editor bg-[#1c202a] rounded-b-lg',
            children: e.jsx(F, { className: 'p-0', content: o()?.code ?? '' }),
          }),
        ],
      }),
    ],
  });
}
const Fe = ({ active: t, title: s, onClick: r }) =>
  e.jsxs('div', {
    className: x(
      'w-full cursor-pointer max-w-[140px] h-[35px] rounded-md text-white/70 flex items-center px-2 text-sm transition-all duration-300',
      t ? 'bg-[#1c202a]' : 'hover:bg-[#1c202a]/60'
    ),
    onClick: r,
    children: [
      e.jsxs('svg', {
        width: '16',
        height: '16',
        viewBox: '0 0 16 16',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        children: [
          e.jsx('path', {
            d: 'M8 6C11.722 6 14 7.295 14 8C14 8.705 11.722 10 8 10C4.278 10 2 8.705 2 8C2 7.295 4.278 6 8 6ZM8 5C4.134 5 1 6.343 1 8C1 9.657 4.134 11 8 11C11.866 11 15 9.657 15 8C15 6.343 11.866 5 8 5Z',
            fill: '#0288D1',
          }),
          e.jsx('path', {
            d: 'M8 7C7.80222 7 7.60888 7.05865 7.44443 7.16853C7.27998 7.27841 7.15181 7.43459 7.07612 7.61732C7.00043 7.80004 6.98063 8.00111 7.01922 8.19509C7.0578 8.38907 7.15304 8.56725 7.29289 8.70711C7.43275 8.84696 7.61093 8.9422 7.80491 8.98079C7.99889 9.01937 8.19996 8.99957 8.38268 8.92388C8.56541 8.84819 8.72159 8.72002 8.83147 8.55557C8.94135 8.39112 9 8.19778 9 8C9 7.73478 8.89464 7.48043 8.70711 7.29289C8.51957 7.10536 8.26522 7 8 7Z',
            fill: '#0288D1',
          }),
          e.jsx('path', {
            d: 'M5.22882 2.75342C6.23732 2.75342 8.19732 4.34192 9.73182 6.99992C11.5928 10.2234 11.6103 12.8434 10.9998 13.1959C10.9294 13.2324 10.8506 13.2497 10.7713 13.2459C9.76282 13.2459 7.80232 11.6579 6.26782 8.99992C4.40682 5.77642 4.38932 3.15642 4.99982 2.80392C5.0704 2.76731 5.14941 2.74956 5.22882 2.75342ZM5.22832 1.75392C4.9735 1.74931 4.72205 1.81264 4.49982 1.93742C3.06482 2.76592 3.46882 6.15192 5.40182 9.49992C7.04382 12.3449 9.26182 14.2464 10.7718 14.2464C11.0266 14.2506 11.2778 14.187 11.4998 14.0619C12.9348 13.2339 12.5308 9.84792 10.5978 6.49992C8.95582 3.65492 6.73782 1.75342 5.22782 1.75342L5.22832 1.75392Z',
            fill: '#0288D1',
          }),
          e.jsx('path', {
            d: 'M10.7717 2.75362C10.8509 2.74986 10.9298 2.76711 11.0002 2.80362C11.6107 3.15662 11.5932 5.77662 9.7322 9.00012C8.1972 11.6581 6.2372 13.2466 5.2287 13.2466C5.14946 13.2504 5.07063 13.2331 5.0002 13.1966C4.3897 12.8431 4.4072 10.2231 6.2682 7.00012C7.8032 4.34212 9.7632 2.75362 10.7717 2.75362ZM10.7717 1.75362C9.2617 1.75362 7.0442 3.65562 5.4017 6.50012C3.4697 9.84812 3.0652 13.2341 4.5002 14.0621C4.72233 14.1872 4.97379 14.2509 5.2287 14.2466C6.7387 14.2466 8.9562 12.3446 10.5987 9.50012C12.5307 6.15212 12.9352 2.76612 11.5002 1.93812C11.2781 1.813 11.0266 1.74932 10.7717 1.75362Z',
            fill: '#0288D1',
          }),
        ],
      }),
      e.jsx('span', { className: 'ml-2', children: s }),
    ],
  });
function rt({ text: t, textToDisplay: s, className: r }) {
  const [a, i] = p.useState(!1),
    [l, d] = p.useState(!1),
    o = () => {
      (navigator.clipboard.writeText(t),
        i(!0),
        setTimeout(() => {
          i(!1);
        }, 2e3));
    };
  return e.jsxs(k, {
    onMouseEnter: () => d(!0),
    onMouseLeave: () => d(!1),
    className: x(
      'relative overflow-hidden transition-all duration-300',
      r,
      a ? 'border-green-500 text-green-500' : 'text-foreground'
    ),
    onClick: o,
    children: [
      e.jsx(v.div, {
        initial: { y: 0 },
        animate: { y: a || l ? -100 : 0 },
        children: s ?? t,
      }),
      e.jsx(v.div, {
        initial: { y: 100 },
        animate: { y: a || l ? 0 : 100 },
        className:
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        children: a
          ? e.jsxs('div', {
              className: 'flex gap-2 items-center transition-all',
              children: [
                e.jsx(Z, { className: x('w-5 h-5') }),
                e.jsx('span', { children: 'text copied' }),
              ],
            })
          : e.jsxs('div', {
              className: 'flex gap-2 items-center transition-all',
              children: [
                e.jsx(ge, { className: 'w-5 h-5' }),
                e.jsx('span', { children: 'click to copy' }),
              ],
            }),
      }),
    ],
  });
}
function at({ title: t, description: s, icon: r, className: a }) {
  return e.jsxs('article', {
    className: x('w-full flex flex-col gap-4 p-6 rounded-3xl', a),
    children: [
      e.jsx('span', {
        className:
          'size-12 flex items-center justify-center bg-primary/10 rounded-full',
        children: r,
      }),
      e.jsx('h3', {
        className: 'font-lexend-medium text-2xl text-foreground',
        children: t,
      }),
      e.jsx('p', {
        className: 'font-lexend-light text-foreground/70',
        children: s,
      }),
    ],
  });
}
const it = ({ image: t, title: s, link: r, className: a }) =>
  e.jsx(u, {
    to: r,
    target: '_blank',
    className: x('h-full w-full', a),
    children: e.jsxs(v.article, {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: !0 },
      transition: { duration: 0.5, type: 'spring' },
      whileHover: { scale: 1.03 },
      className: x('h-full w-full'),
      children: [
        e.jsx(w, {
          src: t,
          alt: 'Showcase',
          className: x('aspect-[9/7] rounded-3xl'),
          width: '100%',
          height: 'calc(100% - 60px)',
        }),
        e.jsxs('div', {
          className: 'flex items-center justify-start gap-4 mt-4 h-[40px]',
          children: [
            e.jsx('h3', { children: s }),
            e.jsx('span', { children: e.jsx(fe, { size: 16 }) }),
          ],
        }),
      ],
    }),
  });
function Ke({ author: t }) {
  return e.jsx(u, {
    to: t.link,
    target: '_blank',
    className: 'no-underline',
    children: e.jsxs('article', {
      className: x(
        'flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all hover:bg-primary/20'
      ),
      children: [
        e.jsx(w, {
          src: t.avatar,
          alt: 'Author name',
          width: 40,
          height: 40,
          className: 'rounded-full w-[40px] h-[40px] object-cover',
        }),
        e.jsxs('div', {
          className: 'flex flex-col justify-center',
          children: [
            e.jsx('span', {
              className: 'text-lg text-foreground',
              children: t.name,
            }),
            e.jsx('span', {
              className: 'text-sm font-light text-neutral',
              children: t.username,
            }),
          ],
        }),
      ],
    }),
  });
}
function lt({}) {
  const { blog: t } = _e(),
    { pathname: s } = T(),
    r = be(),
    {
      title: a,
      authors: i,
      postedAt: l,
    } = p.useMemo(() => {
      const o = t.find((c) => s.includes(c.link));
      return { title: o?.title, authors: o?.authors, postedAt: o?.postedAt };
    }, [s]),
    d = () => {
      r('/blog');
    };
  return e.jsxs('header', {
    className: 'mb-8 w-full',
    children: [
      e.jsxs('div', {
        onClick: d,
        className: x('flex items-center cursor-pointer text-foreground'),
        children: [
          e.jsx(ve, { size: 18, className: 'mr-2' }),
          e.jsx('span', {
            className: 'no-underline text-md',
            children: 'Back to Blog',
          }),
        ],
      }),
      e.jsxs('div', {
        className:
          'flex flex-col-reverse md:flex-row items-start w-full md:items-start md:justify-between gap-4 md:gap-8 mt-8',
        children: [
          e.jsx('h1', { className: 'text-[2.5rem]', children: a }),
          e.jsxs('span', {
            className: x(
              'text-sm font-light w-[160px] text-nowrap md:mt-4 text-neutral'
            ),
            children: ['posted on ', l],
          }),
        ],
      }),
      e.jsxs('div', {
        className: x('border-b-[1px] mt-6 border-border'),
        children: [
          e.jsx('span', {
            className: 'text-sm font-light',
            children: 'published by',
          }),
          e.jsx('div', {
            className: 'py-2 flex flex-wrap gap-2',
            children: i?.map((o, c) => e.jsx(Ke, { author: o }, c)),
          }),
        ],
      }),
    ],
  });
}
function ot({ show: t, onClose: s, children: r }) {
  return t
    ? e.jsx('div', {
        className: 'fixed top-0 left-0 w-full z-30',
        children: e.jsx('div', {
          className: 'relative w-full h-[60px] bg-primary px-4 xl:px-20',
          children: e.jsxs('div', {
            className: 'flex h-full justify-center items-center gap-4 text-sm',
            children: [
              r,
              e.jsx(k, {
                className:
                  'absolute top-1/2 -translate-y-1/2 right-2 z-40 border border-white/30 hover:border-white/50 size-8 p-0 flex items-center justify-center',
                onClick: s,
                children: e.jsx(je, {
                  size: 16,
                  className: 'text-primary-foreground',
                }),
              }),
            ],
          }),
        }),
      })
    : null;
}
export {
  Ze as A,
  k as B,
  et as C,
  nt as E,
  $e as F,
  tt as H,
  Je as K,
  Ve as N,
  Ue as P,
  We as S,
  Ne as T,
  qe as a,
  Xe as b,
  q as c,
  Ye as d,
  _e as e,
  Qe as f,
  st as g,
  rt as h,
  at as i,
  it as j,
  lt as k,
  ye as l,
  ot as m,
  V as n,
  ke as u,
};
