import {
  u as g,
  r as o,
  j as e,
  t,
  Q as m,
  m as l,
  e as u,
  V as x,
} from './vendor-CfbgIbdB.js';
import {
  u as p,
  b as h,
  N as f,
  c as b,
  d as r,
  F as j,
} from './shared-components-CkrC6jAk.js';
const v = () => {
  const { isDark: d } = g(),
    n = o.useRef(null),
    [a, s] = o.useState(!1),
    { show: i } = p();
  return e.jsxs('section', {
    className: t(
      'docs w-full h-screen overflow-y-auto bg-background font-lexend-light text-foreground',
      d ? 'dark' : ''
    ),
    ref: n,
    children: [
      e.jsx(h, { target: n }),
      e.jsx(f, {}),
      e.jsxs('div', {
        className: t(
          'fixed z-30  w-full h-[50px] flex lg:hidden items-center justify-between px-4 lg:px-6 bg-background text-foreground border-b-[1px] border-b-border',
          i ? 'top-[120px]' : 'top-[60px]'
        ),
        children: [
          e.jsx('div', {
            className: 'flex items-center justify-center mr-2',
            onClick: () => s((c) => !c),
            children: e.jsx(m, { size: 20, className: 'text-foreground/90' }),
          }),
          e.jsx('div', {
            className: 'flex md:hidden',
            children: e.jsx(b, { size: 'small' }),
          }),
        ],
      }),
      e.jsxs('section', {
        className: t(
          'relative h-auto flex ',
          i ? 'pt-24 lg:pt-20' : 'pt-16 lg:pt-4'
        ),
        id: 'sidebar',
        children: [
          e.jsx(r, { className: 'hidden lg:block h-auto' }),
          e.jsx(l.div, {
            initial: { x: '-100%' },
            animate: { x: a ? 0 : '-100%' },
            transition: { duration: 0.2 },
            className: 'z-40 fixed top-[110px] bg-background block lg:hidden',
            children: e.jsx(r, { className: 'h-auto', onClose: () => s(!1) }),
          }),
          e.jsx(u, {
            children:
              a &&
              e.jsx(l.div, {
                initial: { opacity: 0 },
                animate: { opacity: a ? 1 : 0 },
                exit: { opacity: 0 },
                transition: { duration: 0.2 },
                onClick: () => s(!1),
                className:
                  'z-20 fixed top-0 left-0 w-full h-full bg-background/90 block lg:hidden',
              }),
          }),
          e.jsxs('main', {
            className: 'w-full lg:w-(--main-width) h-fulld mt-10 ',
            children: [
              e.jsx('div', {
                className: 'px-0 w-full',
                children: e.jsx(x, {}),
              }),
              e.jsx(j, {}),
            ],
          }),
        ],
      }),
    ],
  });
};
v.metadata = {
  openGraph: {
    title: 'Rasengan.js - Documentation',
    description:
      'Learn everything you need to know about Rasengan.js, and build amazing web applications.',
    url: 'https://rasengan.dev',
    image: 'https://rasengan.dev/assets/images/metadata/docs.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Welcome to Rasengan.js',
    description:
      'Learn everything you need to know about Rasengan.js, and build amazing web applications.',
    image: 'https://rasengan.dev/assets/images/metadata/docs.png',
  },
};
export { v as default };
