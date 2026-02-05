import { r as n, j as r } from './vendor-BDlbF2qj.js';
const x = ({
  src: s,
  alt: g,
  style: h,
  fallbackSrc: i,
  loadingOnViewport: f = !0,
  ...e
}) => {
  const [a, l] = n.useState(!1),
    [u, o] = n.useState(!1),
    [m, w] = n.useState(),
    d = n.useRef(null);
  return (
    n.useEffect(() => {
      if (!('IntersectionObserver' in window)) {
        o(!0);
        return;
      }
      if (!f) {
        o(!0);
        return;
      }
      const t = new IntersectionObserver(
          ([v]) => {
            v.isIntersecting && o(!0);
          },
          { root: null, rootMargin: '0px', threshold: 0.1 }
        ),
        c = d.current;
      return (
        c && t.observe(c),
        () => {
          t.disconnect();
        }
      );
    }, []),
    n.useEffect(() => {
      if (!u) return;
      const t = new Image();
      return (
        (t.onload = () => {
          l(!0);
        }),
        (t.onerror = () => {
          (i && ((t.src = i), (t.onerror = null)), l(!0));
        }),
        (t.src = s),
        w(t),
        () => {
          t.onload = null;
        }
      );
    }, [s, u, i]),
    r.jsx(r.Fragment, {
      children: r.jsxs('div', {
        ref: d,
        style: {
          width: e.width || 'auto',
          height: e.height || 'auto',
          overflow: 'hidden',
          position: 'relative',
          ...h,
        },
        className: e.className,
        children: [
          e.loading === 'lazy' &&
            !a &&
            r.jsx('div', {
              style: {
                width: '300%',
                position: 'absolute',
                top: 0,
                bottom: 0,
                backgroundColor: '#e5e5e5',
              },
              className: `${e.loading === 'lazy' ? (e.mode === 'blur' ? 'blur-container' : 'wave-container wave') : ''}`,
            }),
          r.jsx('img', {
            src: m?.src,
            alt: g,
            ...e,
            style: {
              objectFit: e.objectfit || 'cover',
              width: e.width || '100%',
              height: e.height || '100%',
            },
            hidden: e.loading === 'lazy' ? !a : !1,
          }),
        ],
      }),
    })
  );
};
export { x as default };
