import {
  u as c,
  r as d,
  j as e,
  t as x,
  C as n,
  V as h,
  e as m,
  m as u,
  X as f,
} from './vendor-CfbgIbdB.js';
import {
  l as g,
  u as j,
  b,
  m as p,
  n as N,
  c as w,
} from './shared-components-CkrC6jAk.js';
const y = () => {
  const { isDark: i } = c(),
    { isOpen: r, toggle: t } = g(),
    { show: l, setShow: a } = j();
  d.useEffect(() => {
    typeof window < 'u' && (localStorage.getItem('bannerDisabled') || a(!0));
  }, []);
  const o = () => {
    (localStorage.setItem('bannerDisabled', 'true'), a(!1));
  };
  return e.jsxs('section', {
    className: x(
      'w-screen min-h-screen overflow-y-auto overflow-x-hidden bg-background font-lexend-light text-foreground',
      i ? 'dark' : ''
    ),
    children: [
      e.jsx(b, {}),
      e.jsx(p, {
        onClose: o,
        show: l,
        children: e.jsx(n, {
          to: 'https://ui.rasengan.dev',
          target: '_blank',
          className: 'hover:underline',
          children: e.jsxs('div', {
            className: 'text-white/80',
            children: [
              'We are introducing',
              ' ',
              e.jsx('strong', {
                className: 'text-white',
                children: 'Rasengan UI Kit',
              }),
              ' - Get',
              ' ',
              e.jsx('span', {
                className: 'text-white',
                children: '40% discount',
              }),
              ' for the first',
              ' ',
              e.jsx('span', {
                className: 'text-white',
                children: '100 shinobis 🚀',
              }),
            ],
          }),
        }),
      }),
      e.jsx('div', {
        className: 'relative w-screen lh-screen',
        children: e.jsx(h, {}),
      }),
      e.jsx(m, {
        children:
          r &&
          e.jsxs(u.div, {
            initial: { opacity: 0, x: '100%' },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: '100%' },
            transition: { duration: 0.2 },
            className:
              'fixed top-0 left-0 w-full h-full bg-background z-50 flex',
            children: [
              e.jsx('div', {
                className: 'w-full bg-background',
                children: e.jsx('nav', {
                  className: 'p-6 mt-2',
                  children: e.jsx('ul', {
                    className: 'flex flex-col gap-4',
                    children: N.navbar.map((s) =>
                      e.jsx(
                        n,
                        {
                          to: s.link ?? '#',
                          onClick: t,
                          children: e.jsx('li', { children: s.name }),
                        },
                        s.id
                      )
                    ),
                  }),
                }),
              }),
              e.jsx('div', {
                className:
                  'fixed top-8 right-8 size-8 rounded-full flex items-center justify-center border-[1px] border-foreground/30',
                onClick: t,
                children: e.jsx(f, { size: 20, className: 'text-foreground' }),
              }),
              e.jsx('div', {
                className:
                  'fixed bottom-8 right-8 size-8 flex items-center justify-center',
                children: e.jsx(w, {}),
              }),
            ],
          }),
      }),
    ],
  });
};
export { y as default };
