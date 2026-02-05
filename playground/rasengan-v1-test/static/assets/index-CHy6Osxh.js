const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f || (m.f = ['assets/image-BIgcGItM.js', 'assets/vendor-BDlbF2qj.js'])
) => i.map((i) => d[i]);
import {
  j as e,
  L as te,
  u as ne,
  i as oe,
  a as b,
  b as le,
  c as ae,
  r as g,
  R as ie,
  O as E,
  d as C,
  m as ce,
  e as m,
  f as de,
  g as S,
  h as he,
  B as pe,
  k as ue,
  l as xe,
  s as je,
  H as me,
  t as ye,
  M as ge,
  n as fe,
  o as Ce,
  p as De,
  q as Ae,
} from './vendor-BDlbF2qj.js';
const q = (r) => {
    const {
      imports: s,
      layout: l,
      pages: n,
      loaderComponent: t,
      notFoundComponent: c,
      useParentLayout: o,
    } = r;
    return async (a) => {
      const i = new a(),
        d = [];
      for (let h of n ?? []) {
        if (Array.isArray(h)) {
          for (let u of h) {
            if ('source' in u) {
              d.push(u);
              continue;
            }
            if (k(u)) {
              const x = await w(u);
              d.push(x);
            } else d.push(u);
          }
          continue;
        }
        if ('source' in h) {
          d.push(h);
          continue;
        }
        if (k(h)) {
          const u = await w(h);
          d.push(u);
        } else d.push(h);
      }
      let p = await Promise.all(s ?? []);
      return (
        (i.routers = p),
        (i.layout = l || V),
        (i.pages = d),
        (i.loaderComponent = t || (() => null)),
        (i.notFoundComponent = c),
        (i.useParentLayout = o ?? !0),
        i
      );
    };
  },
  w = async (r) => {
    const s = () =>
      e.jsx(r.Renderer, { config: r.config, toc: r.toc, children: r.Content });
    return ((s.path = r.metadata.path), (s.metadata = r.metadata.metadata), s);
  },
  k = (r) => r.type === 'MDXPageComponent',
  ve = (r) => {
    const { path: s, children: l } = r;
    return H(s, l);
  },
  H = (r, s) => {
    const l = [];
    for (const n of s) {
      const t = n;
      if (Array.isArray(n)) {
        const o = H(r, n);
        l.push(...o);
      } else {
        const c = r === '/' ? '' : r[0] === '/' ? r : `/${r}`;
        if (t.path) {
          const o = t.path[0] === '/' ? t.path.slice(1) : t.path;
          ((t.path = `${c}/${o}`), l.push(t));
        } else {
          let o = t.metadata.path || t.name;
          ((o = o[0] === '/' ? o.slice(1) : o),
            (t.metadata.path = `${c}/${o}`),
            l.push(t));
        }
      }
    }
    return l;
  },
  Fe = { BASE_URL: '/', DEV: !1, MODE: 'production', PROD: !0, SSR: !1 };
var Be = {};
const be = () => {
  try {
    const r = Fe;
    if (!r) {
      const s = Be;
      return {
        DEV: s.NODE_ENV === 'development',
        PROD: s.NODE_ENV === 'production',
        TEST: s.NODE_ENV === 'test',
      };
    }
    return { DEV: r.DEV, PROD: r.PROD, TEST: r.TEST };
  } catch (r) {
    return (console.error(r), { DEV: !1, PROD: !0, TEST: !1 });
  }
};
function D() {
  const { DEV: r } = be();
  let s = ne();
  return r
    ? oe(s)
      ? e.jsxs('section', {
          style: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            gap: 10,
            backgroundColor: '#fff',
          },
          children: [
            e.jsx('p', {
              style: { fontSize: '18px' },
              children: 'Application Error',
            }),
            e.jsxs('h1', {
              style: { fontSize: '18px' },
              children: [s.status, ' ', s.statusText],
            }),
            e.jsx('p', { style: { fontSize: '18px' }, children: s.data }),
          ],
        })
      : s instanceof Error
        ? e.jsxs('section', {
            style: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'start',
              height: '100vh',
              width: '100vw',
              padding: 20,
              backgroundColor: '#fff',
            },
            children: [
              e.jsx('h1', {
                style: {
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  marginBottom: 5,
                },
                children: 'Application Error',
              }),
              e.jsx('p', {
                style: { fontSize: '1rem', marginBottom: 10 },
                children: s.message,
              }),
              e.jsxs('div', {
                style: {
                  marginTop: 20,
                  overflow: 'auto',
                  width: '100%',
                  maxHeight: '100vh',
                  padding: '10px 20px',
                  borderRadius: 10,
                  backgroundColor: '#f5f5f5',
                },
                children: [
                  e.jsx('p', {
                    style: {
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      color: '#000',
                    },
                    children: 'The stack trace is:',
                  }),
                  e.jsx('pre', {
                    style: {
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word',
                      fontSize: '1rem',
                      color: '#ff0000aa',
                    },
                    children: s.stack,
                  }),
                ],
              }),
            ],
          })
        : e.jsx('h1', { children: 'Unknown Error' })
    : e.jsx('section', {
        style: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          gap: 10,
          backgroundColor: '#fff',
        },
        children: e.jsx('p', {
          style: { fontSize: '18px' },
          children: 'Application Error',
        }),
      });
}
const L = ({ page: r, data: s }) => {
    const l = s.props ?? {},
      n = b(),
      t = { ...l, params: n };
    return e.jsx(r, { ...t });
  },
  we = () =>
    e.jsxs('section', {
      style: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        gap: 10,
      },
      children: [
        e.jsx('h1', {
          style: { fontSize: '18px', fontWeight: 'normal' },
          children: '404',
        }),
        e.jsx('span', {
          style: {
            height: '20px',
            borderRightWidth: '1px',
            borderRightStyle: 'solid',
            borderRightColor: '#ccc',
          },
        }),
        e.jsx('p', { style: { fontSize: '18px' }, children: 'Page not found' }),
      ],
    }),
  ke = (r) => {
    const { to: s, children: l, ...n } = r;
    return typeof s == 'string' && s.split('#').length > 1
      ? e.jsx('a', { href: s, ...n, children: l })
      : e.jsx(te, { to: s, ...n, children: l });
  },
  Ee = (r) => {
    const s = [];
    return (
      r.forEach((l) => {
        const { openGraph: n, twitter: t, links: c, metaTags: o } = l;
        if (n) {
          const {
            title: a,
            description: i,
            url: d,
            image: p,
            width: h,
            height: u,
            type: x,
          } = n;
          (a &&
            s.push(
              e.jsx(
                'meta',
                { property: 'og:title', content: a, 'data-rg': 'true' },
                'og:title'
              )
            ),
            i &&
              s.push(
                e.jsx(
                  'meta',
                  { property: 'og:description', content: i, 'data-rg': 'true' },
                  'og:description'
                )
              ),
            d &&
              s.push(
                e.jsx(
                  'meta',
                  { property: 'og:url', content: d, 'data-rg': 'true' },
                  'og:url'
                )
              ),
            p &&
              s.push(
                e.jsx(
                  'meta',
                  { property: 'og:image', content: p, 'data-rg': 'true' },
                  'og:image'
                )
              ),
            h &&
              s.push(
                e.jsx(
                  'meta',
                  { property: 'og:image:width', content: h, 'data-rg': 'true' },
                  'og:image:width'
                )
              ),
            u &&
              s.push(
                e.jsx(
                  'meta',
                  {
                    property: 'og:image:height',
                    content: u,
                    'data-rg': 'true',
                  },
                  'og:image:height'
                )
              ),
            s.push(
              e.jsx(
                'meta',
                {
                  property: 'og:type',
                  content: x || 'website',
                  'data-rg': 'true',
                },
                'og:type'
              )
            ));
        }
        if (t) {
          const {
            card: a,
            site: i,
            creator: d,
            image: p,
            title: h,
            description: u,
          } = t;
          (s.push(
            e.jsx(
              'meta',
              {
                name: 'twitter:card',
                content: a || 'summary_large_image',
                'data-rg': 'true',
              },
              'twitter:card'
            )
          ),
            i &&
              s.push(
                e.jsx(
                  'meta',
                  { name: 'twitter:site', content: i, 'data-rg': 'true' },
                  'twitter:site'
                )
              ),
            d &&
              s.push(
                e.jsx(
                  'meta',
                  { name: 'twitter:creator', content: d, 'data-rg': 'true' },
                  'twitter:creator'
                )
              ),
            p &&
              s.push(
                e.jsx(
                  'meta',
                  { name: 'twitter:image', content: p, 'data-rg': 'true' },
                  'twitter:image'
                )
              ),
            h &&
              s.push(
                e.jsx(
                  'meta',
                  { name: 'twitter:title', content: h, 'data-rg': 'true' },
                  'twitter:title'
                )
              ),
            u &&
              s.push(
                e.jsx(
                  'meta',
                  {
                    name: 'twitter:description',
                    content: u,
                    'data-rg': 'true',
                  },
                  'twitter:description'
                )
              ));
        }
        (c && s.push(...Te(c)), o && s.push(...Pe(o)));
      }),
      s
    );
  },
  Te = (r) =>
    r.map((s) => {
      const { rel: l, sizes: n, type: t, href: c } = s;
      return e.jsx(
        'link',
        {
          rel: l,
          sizes: n || '32x32',
          type: t || 'image/png',
          href: c,
          'data-rg': 'true',
        },
        l
      );
    }),
  Pe = (r) =>
    r.map((s) => {
      const { content: l, name: n, property: t } = s;
      return e.jsx(
        'meta',
        { property: t ?? n, content: l, 'data-rg': 'true' },
        t ?? n
      );
    });
function I({ children: r }) {
  const s = le(),
    l = ae();
  g.useEffect(() => {
    typeof window > 'u' ||
      (async () => {
        const t = l.map((c) => c.loaderData ?? c.data);
        n(t.filter(Boolean));
      })();
  }, [s]);
  const n = (t) => {
    const c = Ee(t.map((p) => (p.meta ? p.meta : {}))),
      o = t.at(-1),
      a = o ? o.meta : {};
    if (
      (document.querySelectorAll('meta[data-rg="true"]').forEach((p) => {
        p.remove();
      }),
      c.forEach((p) => {
        const h = ie.renderToStaticMarkup(p);
        document.head.insertAdjacentHTML('beforeend', h);
      }),
      !a)
    )
      return;
    document.title = a.title;
    const d = document.createElement('meta');
    (d.setAttribute('name', 'description'),
      d.setAttribute('content', a.description),
      d.setAttribute('data-rg', 'true'),
      document.head.appendChild(d));
  };
  return e.jsx(e.Fragment, { children: r });
}
const Re = { title: 'Not Found', description: 'Page not found' },
  Ne = (r, s, l = !1) => {
    let n = {
      metaTags: [],
      links: [],
      openGraph: { url: '', image: '' },
      twitter: { card: 'summary_large_image', image: '', title: '' },
    };
    (l ||
      ((n.title = r.title ?? s.title),
      (n.description = r.description ?? s.description)),
      (n.openGraph = { ...s.openGraph, ...r.openGraph }),
      (n.twitter = { ...s.twitter, ...r.twitter }));
    const t = new Set(),
      c = new Set();
    if (s.metaTags && Array.isArray(s.metaTags)) {
      for (const o of s.metaTags) t.add(o.name ?? o.property);
      if (r.metaTags && Array.isArray(r.metaTags))
        for (const o of r.metaTags)
          (t.has(o.name ?? o.property) && t.delete(o.name ?? o.property),
            n.metaTags.push(o));
      for (const o of t) {
        const a = s.metaTags.find((i) => i.name === o);
        a && n.metaTags.push(a);
      }
    } else n.metaTags = r.metaTags ?? [];
    if (s.links && Array.isArray(s.links)) {
      for (const o of s.links) c.add(o.rel);
      if (r.links && Array.isArray(r.links))
        for (const o of r.links)
          (c.has(o.rel) && c.delete(o.rel), n.links.push(o));
      for (const o of c) {
        const a = s.links.find((i) => i.rel === o);
        a && n.links.push(a);
      }
    } else n.links = r.links ?? [];
    return n;
  },
  A =
    ({ loader: r, metadata: s, isLayout: l = !1, source: n }) =>
    async ({ params: t, request: c }) => {
      try {
        if (!r) return { props: {}, meta: s, source: n };
        const o = await r({ params: t, request: c });
        if (o.redirect) {
          const a = new FormData();
          return (
            a.append('redirect', o.redirect),
            new Response(a, { status: 302, headers: { Location: o.redirect } })
          );
        }
        return { props: o.props, meta: Ne(o.meta ?? {}, s, l), source: n };
      } catch (o) {
        return (
          console.error(o),
          {
            props: {},
            meta: {
              openGraph: { url: '', image: '' },
              twitter: { card: 'summary_large_image', image: '', title: '' },
              metaTags: [],
              links: [],
            },
            source: n,
          }
        );
      }
    },
  Se = async (r, s) => {
    const l = ce(s, r);
    l &&
      (await Promise.all(
        l.map(async (n) => {
          if (n.route.lazy) {
            const t = await n.route.lazy();
            (Object.assign(n.route, t), delete n.route.lazy);
          }
        })
      ));
  },
  $ = (r, s = !0, l = void 0) => {
    const n = [];
    let t, c;
    try {
      if ('source' in r.layout) {
        const a = r.layout;
        ((c = a.path),
          (t = {
            path: s
              ? a.path
              : r.useParentLayout
                ? a.path.replace(l + '/', '')
                : a.path,
            errorElement: e.jsx(D, {}),
            lazy: async () => {
              const i = (await a.module()).default;
              return i
                ? {
                    Component() {
                      const d = { props: {} };
                      let { props: p } = C() || d;
                      const h = b(),
                        u = { ...p, params: h };
                      return s || !r.useParentLayout
                        ? e.jsx(I, { children: e.jsx(i, { ...u }) })
                        : e.jsx(i, { ...u });
                    },
                    async loader({ params: d, request: p }) {
                      const h = { ...i.metadata };
                      return A({
                        loader: i.loader,
                        metadata: h,
                        isLayout: !0,
                        source: a.source,
                      })({ params: d, request: p });
                    },
                  }
                : (console.warn(
                    `Layout component is not exported by default from: ${a.source}}`
                  ),
                  {
                    Component() {
                      return e.jsx(E, {});
                    },
                  });
            },
            children: [],
            nested: r.useParentLayout,
            hydrateFallbackElement: e.jsx(e.Fragment, {}),
          }));
      } else {
        const a = r.layout;
        ((c = a.path),
          (t = {
            path: s ? c : r.useParentLayout ? c.replace(l + '/', '') : c,
            errorElement: e.jsx(D, {}),
            Component() {
              const i = { props: {} };
              let { props: d } = C() || i;
              const p = b(),
                h = { ...d, params: p };
              return s || !r.useParentLayout
                ? e.jsx(I, { children: e.jsx(a, { ...h }) })
                : e.jsx(a, { ...h });
            },
            async loader({ params: i, request: d }) {
              const p = { ...a.metadata };
              return A({ loader: a.loader, metadata: p, isLayout: !0 })({
                params: i,
                request: d,
              });
            },
            children: [],
            nested: r.useParentLayout,
            hydrateFallbackElement: e.jsx(e.Fragment, {}),
          }));
      }
      ((s || r.notFoundComponent) &&
        t.children.push({
          path: '*',
          element: r.notFoundComponent ?? e.jsx(we, {}),
          loader: async () => ({ props: {}, meta: Re }),
        }),
        r.pages
          .map((a) => {
            if ('source' in a) {
              const i = a,
                d =
                  i.path.startsWith('/') && i.path !== '/'
                    ? i.path.slice(1)
                    : i.path,
                p = i.path === '/' ? c : c.length > 1 ? d : i.path;
              return {
                path: p === c ? void 0 : p,
                index: p === c,
                async lazy() {
                  let h = (await i.module()).default;
                  return h
                    ? (k(h) && (h = await w(h)),
                      {
                        Component() {
                          const u = { props: { params: {} } },
                            x = C() || u;
                          return e.jsx(L, { page: h, data: x });
                        },
                        async loader({ params: u, request: x }) {
                          const y = { ...h.metadata };
                          return A({
                            loader: h.loader,
                            metadata: y,
                            source: i.source,
                          })({ params: u, request: x });
                        },
                      })
                    : (console.warn(
                        `Page component is not exported by default from: ${i.source}}`
                      ),
                      {
                        Component() {
                          return null;
                        },
                      });
                },
                errorElement: e.jsx(D, {}),
                hydrateFallbackElement: e.jsx(e.Fragment, {}),
                shouldRevalidate: ({
                  currentUrl: h,
                  nextUrl: u,
                  defaultShouldRevalidate: x,
                }) => h.pathname !== u.pathname,
                module: i.module,
              };
            } else {
              const i = a,
                d =
                  i.path.startsWith('/') && i.path !== '/'
                    ? i.path.slice(1)
                    : i.path,
                p = i.path === '/' ? c : c.length > 1 ? d : i.path;
              return {
                path: p === c ? void 0 : p,
                index: p === c,
                async loader({ params: h, request: u }) {
                  const x = { ...i.metadata };
                  return A({ loader: i.loader, metadata: x })({
                    params: h,
                    request: u,
                  });
                },
                Component() {
                  const h = { props: { params: {} } },
                    u = C() || h;
                  return e.jsx(L, { page: i, data: u });
                },
                errorElement: e.jsx(D, {}),
                hydrateFallbackElement: e.jsx(e.Fragment, {}),
                shouldRevalidate: ({
                  currentUrl: h,
                  nextUrl: u,
                  defaultShouldRevalidate: x,
                }) => h.pathname !== u.pathname,
                module: () => Promise.resolve({ default: i }),
              };
            }
          })
          .forEach((a) => {
            t.children.push(a);
          }));
      for (const a of r.routers) {
        const i = $(a, !1, c);
        for (const d of i) d.nested ? t.children.push(d) : n.push(d);
      }
      n.unshift(t);
    } catch (o) {
      console.error(o);
    } finally {
      return n;
    }
  };
class U {
  _layout;
  _routers;
  _pages;
  _loaderComponent;
  _notFoundComponent;
  _useParentLayout;
  get layout() {
    return this._layout;
  }
  get routers() {
    return this._routers;
  }
  get pages() {
    return this._pages;
  }
  get loaderComponent() {
    return this._loaderComponent;
  }
  get notFoundComponent() {
    return this._notFoundComponent;
  }
  get useParentLayout() {
    return this._useParentLayout;
  }
  set layout(s) {
    this._layout = s;
  }
  set routers(s) {
    this._routers = s;
  }
  set pages(s) {
    this._pages = s;
  }
  set loaderComponent(s) {
    this._loaderComponent = s;
  }
  set notFoundComponent(s) {
    this._notFoundComponent = s ? e.jsx(s, {}) : void 0;
  }
  set useParentLayout(s) {
    this._useParentLayout = s;
  }
}
const Le = ({ Router: r, children: s = void 0 }) =>
    s || (r ? e.jsx(r, {}) : null),
  V = () => e.jsx(m.Fragment, { children: e.jsx(E, {}) });
V.path = '/';
const Ie = !!window.__RASENGAN_SPA_MODE__;
async function _e(r, s, l) {
  const n = document.getElementById('root');
  if (!n) throw new Error('#root element not found in the DOM');
  const t = await s,
    c = $(t);
  await Se(window.location, c);
  let o = de(c, { hydrationData: window.__staticRouterHydrationData });
  const a = () => e.jsx(he, { router: o }),
    i = e.jsx(g.StrictMode, {
      children: e.jsx(r, { Component: (d) => e.jsx(Le, { ...d, Router: a }) }),
    });
  Ie
    ? S.createRoot(n, {
        onCaughtError: (d) => {
          console.error(d);
        },
        onRecoverableError(d, p) {
          (console.error(d), console.error(p));
        },
      }).render(i)
    : S.hydrateRoot(n, i, {
        onCaughtError: (d) => {
          console.error(d);
        },
        onRecoverableError(d, p) {
          (console.error(d), console.error(p));
        },
      });
}
function ze({ Component: r, children: s }) {
  return e.jsx(r, { children: s });
}
const Me = 'modulepreload',
  Oe = function (r) {
    return '/' + r;
  },
  _ = {},
  qe = function (s, l, n) {
    let t = Promise.resolve();
    if (l && l.length > 0) {
      let i = function (d) {
        return Promise.all(
          d.map((p) =>
            Promise.resolve(p).then(
              (h) => ({ status: 'fulfilled', value: h }),
              (h) => ({ status: 'rejected', reason: h })
            )
          )
        );
      };
      document.getElementsByTagName('link');
      const o = document.querySelector('meta[property=csp-nonce]'),
        a = o?.nonce || o?.getAttribute('nonce');
      t = i(
        l.map((d) => {
          if (((d = Oe(d)), d in _)) return;
          _[d] = !0;
          const p = d.endsWith('.css'),
            h = p ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${d}"]${h}`)) return;
          const u = document.createElement('link');
          if (
            ((u.rel = p ? 'stylesheet' : Me),
            p || (u.as = 'script'),
            (u.crossOrigin = ''),
            (u.href = d),
            a && u.setAttribute('nonce', a),
            document.head.appendChild(u),
            p)
          )
            return new Promise((x, y) => {
              (u.addEventListener('load', x),
                u.addEventListener('error', () =>
                  y(new Error(`Unable to preload CSS for ${d}`))
                ));
            });
        })
      );
    }
    function c(o) {
      const a = new Event('vite:preloadError', { cancelable: !0 });
      if (((a.payload = o), window.dispatchEvent(a), !a.defaultPrevented))
        throw o;
    }
    return t.then((o) => {
      for (const a of o || []) a.status === 'rejected' && c(a.reason);
      return s().catch(c);
    });
  },
  He = m.lazy(() =>
    qe(() => import('./image-BIgcGItM.js'), __vite__mapDeps([0, 1]))
  ),
  $e = ({ width: r, height: s }) =>
    e.jsx('div', {
      style: { width: r, height: s, backgroundColor: '#e5e5e5' },
    }),
  G = ({ src: r, alt: s, loading: l = 'lazy', mode: n = 'wave', ...t }) =>
    e.jsx(m.Suspense, {
      fallback: e.jsx($e, { width: t.width || 200, height: t.height || 200 }),
      children: e.jsx(He, {
        src: typeof r == 'string' ? r : r.uri,
        alt: s,
        loading: l,
        mode: n,
        ...t,
      }),
    }),
  T = () =>
    e.jsxs('section', {
      className: 'w-full bg-background font-inter overflow-auto h-screen',
      children: [
        e.jsx('header', {
          className:
            'border-b-[1px] border-b-border h-[60px] w-full bg-white fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-2',
          children: e.jsxs('div', {
            className: 'flex items-center gap-2 text-foreground',
            children: [
              e.jsx(G, {
                src: '/rasengan.svg',
                alt: 'Logo of rasengan',
                width: 50,
              }),
              e.jsx('span', { className: 'text-xl', children: 'Rasengan.js' }),
            ],
          }),
        }),
        e.jsxs('main', {
          className: 'w-full flex mt-8',
          children: [
            e.jsx('div', {
              className:
                'w-[280px] border-r-[1px] border-r-border text-foreground',
              children: e.jsxs('aside', {
                className:
                  'sticky top-8 w-full h-full max-h-[calc(100vh-(var(--spacing)*14.25))] overflow-y-auto pt-[60px] p-4',
                children: [
                  e.jsxs('div', {
                    className: 'flex flex-col gap-4 text-sm',
                    children: [
                      e.jsxs('div', {
                        className: 'flex items-center gap-4 text-primary',
                        children: [
                          e.jsx(pe, { size: 20 }),
                          e.jsx('span', { children: 'Documentation' }),
                        ],
                      }),
                      e.jsxs('div', {
                        className: 'flex items-center gap-4 text-foreground/80',
                        children: [
                          e.jsx(ue, { size: 20 }),
                          e.jsx('span', { children: 'Packages' }),
                        ],
                      }),
                      e.jsxs('div', {
                        className: 'flex items-center gap-4 text-foreground/80',
                        children: [
                          e.jsx(xe, { size: 20 }),
                          e.jsx('span', { children: 'Templates' }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs('div', {
                    className: 'mt-8',
                    children: [
                      e.jsx('span', {
                        className: 'font-mono text-[12px] text-foreground/80',
                        children: 'GETTING STARTED',
                      }),
                      e.jsxs('div', {
                        className: 'flex flex-col w-full text-sm py-4',
                        children: [
                          e.jsx('div', {
                            className:
                              'px-4 py-1 border-l-[1px] border-l-[#333] text-foreground/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all',
                            children: e.jsx('span', {
                              children: 'Installation',
                            }),
                          }),
                          e.jsx('div', {
                            className:
                              'px-4 py-1 border-l-[1px] border-l-[#333] text-foreground/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all',
                            children: e.jsx('span', {
                              children: 'Project Structure',
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs('div', {
                    className: 'mt-8',
                    children: [
                      e.jsx('span', {
                        className: 'font-mono text-[12px] text-foreground/80',
                        children: 'CORE CONCEPTS',
                      }),
                      e.jsxs('div', {
                        className: 'flex flex-col w-full text-sm py-4',
                        children: [
                          e.jsx('div', {
                            className:
                              'px-4 py-1 border-l-[1px] border-l-[#333] text-foreground/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all',
                            children: e.jsx('span', { children: 'Routing' }),
                          }),
                          e.jsx('div', {
                            className:
                              'px-4 py-1 border-l-[1px] border-l-[#333] text-foreground/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all',
                            children: e.jsx('span', { children: 'Rendering' }),
                          }),
                          e.jsx('div', {
                            className:
                              'px-4 py-1 border-l-[1px] border-l-[#333] text-foreground/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all',
                            children: e.jsx('span', { children: 'Styling' }),
                          }),
                          e.jsx('div', {
                            className:
                              'px-4 py-1 border-l-[1px] border-l-[#333] text-foreground/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all',
                            children: e.jsx('span', { children: 'Optimizing' }),
                          }),
                          e.jsx('div', {
                            className:
                              'px-4 py-1 border-l-[1px] border-l-[#333] text-foreground/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all',
                            children: e.jsx('span', {
                              children: 'Configuring',
                            }),
                          }),
                          e.jsx('div', {
                            className:
                              'px-4 py-1 border-l-[1px] border-l-[#333] text-foreground/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all',
                            children: e.jsx('span', { children: 'Deploying' }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs('div', {
                    className: 'mt-8',
                    children: [
                      e.jsx('span', {
                        className: 'font-mono text-[12px] text-foreground/80',
                        children: 'API REFERENCE',
                      }),
                      e.jsxs('div', {
                        className: 'flex flex-col w-full text-sm py-4',
                        children: [
                          e.jsx('div', {
                            className:
                              'px-4 py-1 border-l-[1px] border-l-[#333] text-foreground/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all',
                            children: e.jsx('span', { children: 'Components' }),
                          }),
                          e.jsx('div', {
                            className:
                              'px-4 py-1 border-l-[1px] border-l-[#333] text-foreground/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all',
                            children: e.jsx('span', { children: 'Functions' }),
                          }),
                          e.jsx('div', {
                            className:
                              'px-4 py-1 border-l-[1px] border-l-[#333] text-foreground/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all',
                            children: e.jsx('span', {
                              children: 'File Conventions',
                            }),
                          }),
                          e.jsx('div', {
                            className:
                              'px-4 py-1 border-l-[1px] border-l-[#333] text-foreground/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all',
                            children: e.jsx('span', {
                              children: 'rasengan.config.js',
                            }),
                          }),
                          e.jsx('div', {
                            className:
                              'px-4 py-1 border-l-[1px] border-l-[#333] text-foreground/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all',
                            children: e.jsx('span', {
                              children: 'create-rasengan',
                            }),
                          }),
                          e.jsx('div', {
                            className:
                              'px-4 py-1 border-l-[1px] border-l-[#333] text-foreground/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all',
                            children: e.jsx('span', {
                              children: 'Rasengan CLI',
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
            e.jsx('section', {
              className: 'w-(--main-width) mt-4',
              children: e.jsx(E, {}),
            }),
          ],
        }),
        e.jsx('div', {
          className: 'w-full h-[400px] border-[1px] border-t-[#222] bg-black',
        }),
      ],
    });
T.path = '/';
T.loader = async () => ({ props: {}, meta: { title: 'Home' } });
function z(r) {
  const s = r.split(`
`),
    l = [];
  return (
    s.forEach((n) => {
      const t = n.match(/^## (.+)/),
        c = n.match(/^### (.+)/);
      if (t) {
        const o = t[1].trim(),
          a = v(o);
        l.push({ title: o, anchor: a, level: 2, children: [] });
      } else if (c && l.length > 0) {
        const o = c[1].trim(),
          a = v(o);
        l[l.length - 1].children.push({ title: o, anchor: a, level: 3 });
      }
    }),
    l
  );
}
const v = (r) => {
  if (Array.isArray(r)) {
    const c = r
      .map((a) =>
        m.isValidElement(a)
          ? a.props.children.toString().trim()
          : a.toString().trim()
      )
      .join(' ');
    if (typeof r[r.length - 1] == 'string') {
      const a = c.match(/\s\[#([^\]]+)\]$/);
      if (a) return { id: a[1], text: r.slice(0, r.length - 1) };
    }
    return { id: c.replace(/\s+/g, '-').toLowerCase(), text: r };
  }
  if (m.isValidElement(r))
    return {
      id: r.props.children.toString().trim().replace(/\s+/g, '-').toLowerCase(),
      text: r,
    };
  const s = String(W(r).trim()),
    l = s.match(/\s\[#([^\]]+)\]$/);
  let n, t;
  return (
    l
      ? ((n = l[1].trim().replace(/\s+/g, '-').toLowerCase()),
        (t = s.replace(l[0], '').trim()))
      : ((n = s.replace(/\s+/g, '-').toLowerCase()), (t = s)),
    { id: n, text: t }
  );
};
function W(r) {
  if (r == null) return '';
  if (typeof r == 'string') return r;
  if (Array.isArray(r)) return r.map(W).join(' ');
  if (r instanceof Uint8Array) return new TextDecoder().decode(r);
  try {
    return String(r);
  } catch {
    return '';
  }
}
const Ue = ({ children: r = '', className: s = '', ...l }) => {
    const n = l['data-language'] || '',
      t = l['data-line-numbers'],
      [c, o] = m.useState(!1),
      [a, i] = m.useState(!1);
    m.useEffect(() => {
      const h = setTimeout(() => {
        i(!1);
      }, 2e3);
      return () => clearTimeout(h);
    }, [a]);
    const d = () => {
        const h = je.renderToString(r),
          u = p(h);
        (navigator.clipboard.writeText(u), i(!0));
      },
      p = (h) =>
        new DOMParser().parseFromString(h, 'text/html').body.textContent || '';
    return n
      ? e.jsxs('div', {
          onMouseEnter: () => o(!0),
          onMouseLeave: () => o(!1),
          children: [
            c
              ? e.jsx('button', {
                  className: 'copy-button',
                  onClick: d,
                  children: a
                    ? e.jsxs('svg', {
                        xmlns: 'http://www.w3.org/2000/svg',
                        viewBox: '0 0 24 24',
                        width: '16',
                        height: '16',
                        color: '#f0f0f0',
                        fill: 'none',
                        children: [
                          e.jsx('path', {
                            d: 'M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z',
                            stroke: 'currentColor',
                            strokeWidth: '1.5',
                          }),
                          e.jsx('path', {
                            d: 'M8 12.5L10.5 15L16 9',
                            stroke: 'currentColor',
                            strokeWidth: '1.5',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                          }),
                        ],
                      })
                    : e.jsxs('svg', {
                        xmlns: 'http://www.w3.org/2000/svg',
                        viewBox: '0 0 24 24',
                        width: '16',
                        height: '16',
                        color: '#f0f0f0',
                        fill: 'none',
                        children: [
                          e.jsx('path', {
                            d: 'M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z',
                            stroke: 'currentColor',
                            strokeWidth: '1.5',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                          }),
                          e.jsx('path', {
                            d: 'M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999',
                            stroke: 'currentColor',
                            strokeWidth: '1.5',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                          }),
                        ],
                      }),
                })
              : e.jsx('span', { className: 'lang', children: n }),
            e.jsx('code', {
              className: `${s} code-block`,
              'data-line-numbers': t !== void 0 ? '' : void 0,
              children: r,
            }),
          ],
        })
      : e.jsx(X, { children: r });
  },
  X = ({ children: r }) =>
    e.jsx('code', { className: 'simple-block', children: r }),
  J = ({ children: r }) =>
    e.jsx('div', {
      className: 'ra-table-wrapper',
      children: e.jsx('table', { children: r }),
    }),
  j =
    ({ variant: r }) =>
    ({ children: s }) => {
      const { text: l, id: n } = g.useMemo(() => {
          const { id: o, text: a } = v(s);
          return { id: r === 'h1' ? void 0 : o, text: a };
        }, [s]),
        t = g.createElement(r, { id: n, className: 'heading', children: l }),
        c = (o, a) => {
          (o.preventDefault(),
            document.getElementById(a)?.scrollIntoView({ behavior: 'smooth' }),
            history.pushState(null, '', `#${a}`));
        };
      return e.jsxs('div', {
        className: 'ra-heading-wrapper',
        children: [
          t,
          n &&
            e.jsx('a', {
              href: `#${n}`,
              onClick: (o) => c(o, n),
              children: e.jsxs('svg', {
                xmlns: 'http://www.w3.org/2000/svg',
                viewBox: '0 0 24 24',
                width: '24',
                height: '24',
                color: '#ffffff',
                fill: 'none',
                children: [
                  e.jsx('path', {
                    d: 'M10 13.229C10.1416 13.4609 10.3097 13.6804 10.5042 13.8828C11.7117 15.1395 13.5522 15.336 14.9576 14.4722C15.218 14.3121 15.4634 14.1157 15.6872 13.8828L18.9266 10.5114C20.3578 9.02184 20.3578 6.60676 18.9266 5.11718C17.4953 3.6276 15.1748 3.62761 13.7435 5.11718L13.03 5.85978',
                    stroke: 'currentColor',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                  }),
                  e.jsx('path', {
                    d: 'M10.9703 18.14L10.2565 18.8828C8.82526 20.3724 6.50471 20.3724 5.07345 18.8828C3.64218 17.3932 3.64218 14.9782 5.07345 13.4886L8.31287 10.1172C9.74413 8.62761 12.0647 8.6276 13.4959 10.1172C13.6904 10.3195 13.8584 10.539 14 10.7708',
                    stroke: 'currentColor',
                    strokeWidth: '1.5',
                    strokeLinecap: 'round',
                  }),
                ],
              }),
            }),
        ],
      });
    };
function Z(r, s = { root: null, rootMargin: '0px', threshold: 0.4 }) {
  const [l, n] = g.useState(null),
    t = g.useRef(null);
  return (
    g.useEffect(
      () => (
        (t.current = new IntersectionObserver((o) => {
          o.forEach((i) => {
            i.isIntersecting && i.boundingClientRect.top >= 0 && n(i.target.id);
          });
          const a = o
            .filter((i) => i.isIntersecting)
            .sort(
              (i, d) => d.boundingClientRect.top - i.boundingClientRect.top
            );
          a.length > 0 && n(a[0].target.id);
        }, s)),
        r.forEach((o) => {
          const a = document.getElementById(o.anchor.id);
          (a && t.current && t.current.observe(a),
            o.children?.forEach((i) => {
              const d = document.getElementById(i.anchor.id);
              d && t.current && t.current.observe(d);
            }));
        }),
        () => {
          t.current && t.current.disconnect();
        }
      ),
      [r, s]
    ),
    [l, n]
  );
}
const Q = ({ items: r }) => {
    const [s, l] = Z(r),
      n = g.useCallback(
        (t) =>
          t.map((c, o) =>
            e.jsxs(
              m.Fragment,
              {
                children: [
                  e.jsx(Ve, { item: c, activeId: s, onActive: l }),
                  c.children &&
                    c.children.length > 0 &&
                    e.jsx('div', {
                      className: 'toc-item--children',
                      children: n(c.children),
                    }),
                ],
              },
              o
            )
          ),
        [r, s]
      );
    return e.jsx('aside', {
      className: 'rasengan-toc',
      children: e.jsxs('div', {
        className: 'table-of-contents',
        children: [
          e.jsx('h2', { className: 'title', children: 'ON THIS PAGE' }),
          e.jsx('div', { className: 'items-container', children: n(r) }),
        ],
      }),
    });
  },
  Ve = ({ item: r, activeId: s, onActive: l }) => {
    const n = (t, c) => {
      (t.preventDefault(),
        l(c),
        document.getElementById(c)?.scrollIntoView({ behavior: 'smooth' }),
        history.pushState(null, '', `#${c}`));
    };
    return e.jsx(
      'div',
      {
        className: `
          toc-item
          ${r.level === 2 ? 'level2' : 'level3'} 
          ${s === r.anchor.id ? 'active' : ''}
        `,
        children: e.jsx('a', {
          href: `#${r.anchor.id}`,
          onClick: (t) => n(t, r.anchor.id),
          children: e.jsx('div', {
            className: 'toc-item--title',
            children: r.anchor.text,
          }),
        }),
      },
      r.anchor.id
    );
  };
function f(r) {
  return ({ children: s }) => {
    const { id: l, text: n } = v(s);
    return e.jsx(r, { id: l, children: n });
  };
}
const Ge = ({ children: r, className: s, config: l, toc: n }) => {
    const { components: t = {}, toc: c = void 0 } = l;
    return e.jsxs('section', {
      className: n ? 'rasengan-wrapper-with-toc' : 'rasengan-wrapper',
      children: [
        e.jsx('section', {
          className: 'rasengan-markdown-body ' + s,
          children: e.jsx(r, {
            components: {
              ...t,
              code: t.code ? t.code : Ue,
              table: t.table ? t.table : J,
              h1: t.h1 ? f(t.h1) : j({ variant: 'h1' }),
              h2: t.h2 ? f(t.h2) : j({ variant: 'h2' }),
              h3: t.h3 ? f(t.h3) : j({ variant: 'h3' }),
              h4: t.h4 ? f(t.h4) : j({ variant: 'h4' }),
              h5: t.h5 ? f(t.h5) : j({ variant: 'h5' }),
              h6: t.h6 ? f(t.h6) : j({ variant: 'h6' }),
            },
          }),
        }),
        n && (c ? c(n) : e.jsx(Q, { items: n })),
      ],
    });
  },
  We = ({ children: r = '', className: s = '', ...l }) => {
    const n = s.replace(/language-/, ''),
      [t, c] = m.useState(!1);
    return n
      ? (console.log({ children: r, className: s, rest: l }),
        e.jsx(me, {
          theme: ye.oneDark,
          code: r.toString().trim(),
          language: n,
          children: ({
            className: o,
            tokens: a,
            getLineProps: i,
            getTokenProps: d,
            ...p
          }) => {
            const [h, u] = m.useState(!1);
            m.useEffect(() => {
              const y = setTimeout(() => {
                u(!1);
              }, 2e3);
              return () => clearTimeout(y);
            }, [h]);
            const x = () => {
              (navigator.clipboard.writeText((r ?? '').toString().trim()),
                u(!0));
            };
            return e.jsx('figure', {
              children: e.jsx('pre', {
                onMouseEnter: () => c(!0),
                onMouseLeave: () => c(!1),
                'data-language': n,
                children: e.jsxs('div', {
                  children: [
                    t
                      ? e.jsx('button', {
                          className: 'copy-button',
                          onClick: x,
                          children: h
                            ? e.jsxs('svg', {
                                xmlns: 'http://www.w3.org/2000/svg',
                                viewBox: '0 0 24 24',
                                width: '20',
                                height: '20',
                                color: '#f0f0f0',
                                fill: 'none',
                                children: [
                                  e.jsx('path', {
                                    d: 'M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z',
                                    stroke: 'currentColor',
                                    strokeWidth: '1.5',
                                  }),
                                  e.jsx('path', {
                                    d: 'M8 12.5L10.5 15L16 9',
                                    stroke: 'currentColor',
                                    strokeWidth: '1.5',
                                    strokeLinecap: 'round',
                                    strokeLinejoin: 'round',
                                  }),
                                ],
                              })
                            : e.jsxs('svg', {
                                xmlns: 'http://www.w3.org/2000/svg',
                                viewBox: '0 0 24 24',
                                width: '20',
                                height: '20',
                                color: '#f0f0f0',
                                fill: 'none',
                                children: [
                                  e.jsx('path', {
                                    d: 'M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z',
                                    stroke: 'currentColor',
                                    strokeWidth: '1.5',
                                    strokeLinecap: 'round',
                                    strokeLinejoin: 'round',
                                  }),
                                  e.jsx('path', {
                                    d: 'M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999',
                                    stroke: 'currentColor',
                                    strokeWidth: '1.5',
                                    strokeLinecap: 'round',
                                    strokeLinejoin: 'round',
                                  }),
                                ],
                              }),
                        })
                      : e.jsx('span', { className: 'lang', children: n }),
                    e.jsx('code', {
                      className: `${o} code-block`,
                      'data-line-numbers': !0,
                      children: a.map((y, ee) =>
                        e.jsxs(
                          'span',
                          {
                            'data-line': !0,
                            ...i({ line: y }),
                            children: [
                              e.jsx('span', { children: ' ' }),
                              y.map((se, re) =>
                                e.jsx('span', { ...d({ token: se }) }, re)
                              ),
                            ],
                          },
                          ee
                        )
                      ),
                    }),
                  ],
                }),
              }),
            });
          },
        }))
      : e.jsx(X, { children: r });
  };
function K({ content: r, className: s, overwriteStyle: l }) {
  return e.jsx('section', {
    className: `${s} ${l ? '' : 'rasengan-markdown-body'}`,
    children: e.jsx(ge, {
      children: r,
      remarkPlugins: [De, Ae],
      rehypePlugins: [fe, Ce],
      components: {
        code: We,
        table: J,
        h1: j({ variant: 'h1' }),
        h2: j({ variant: 'h2' }),
        h3: j({ variant: 'h3' }),
        h4: j({ variant: 'h4' }),
        h5: j({ variant: 'h5' }),
        h6: j({ variant: 'h6' }),
      },
    }),
  });
}
const Xe = {
    components: {
      h1: ({ children: r }) =>
        e.jsx('h1', {
          className: 'text-3xl font-bold mt-8 mb-6 text-foreground',
          children: r,
        }),
      h2: ({ children: r, ...s }) => (
        console.log({ children: r, props: s }),
        e.jsx('h2', {
          ...s,
          className: 'text-2xl font-bold mt-6 mb-2',
          children: r,
        })
      ),
      h3: ({ children: r, ...s }) =>
        e.jsx('h3', {
          ...s,
          className: 'text-xl font-bold mt-6 mb-1',
          children: r,
        }),
      h4: ({ children: r, ...s }) =>
        e.jsx('h4', {
          ...s,
          className: 'text-md font-bold mt-4 mb-1',
          children: r,
        }),
      h5: ({ children: r, ...s }) =>
        e.jsx('h5', {
          ...s,
          className: 'text-sm font-bold mt-3 mb-1',
          children: r,
        }),
      h6: ({ children: r, ...s }) =>
        e.jsx('h6', {
          ...s,
          className: 'text-xs font-bold mt-3 mb-1',
          children: r,
        }),
      p: ({ children: r }) =>
        e.jsx('p', { className: 'mt-2 mb-2 text-foreground/20', children: r }),
      a: ({ children: r, href: s }) =>
        e.jsx('a', {
          href: s,
          className:
            'text-foreground/20 font-bold cursor-pointer text-primary underline',
          children: r,
        }),
      img: (r) =>
        e.jsx(G, {
          src: r.src,
          alt: r.alt || '',
          className: 'mt-2 mb-2 w-full h-auto',
        }),
      table: (r) =>
        e.jsx('table', {
          className:
            'w-full border-collapse border border-gray-300 mt-2 mb-2 [&_th]:p-2 [&_td]:p-2 [&_th]:border [&_td]:border [&_th]:border-gray-300 [&_td]:border-gray-300 [&_th]:bg-gray-100 [&_th]:text-left [&_th]:font-bold rounded-xl [&_td]:bg-gray-50',
          ...r,
        }),
      blockquote: (r) =>
        e.jsx('blockquote', {
          style: {
            borderLeft: '4px solid #ef4444',
            paddingLeft: '1rem',
            fontStyle: 'italic',
            color: '#6b7280',
          },
          ...r,
        }),
    },
    toc: (r) => {
      const [s] = Z(r);
      return e.jsx('div', {
        className:
          'sticky top-[64px] hidden xl:flex max-h-screen overflow-y-auto flex-col gao-8',
        children: e.jsxs('div', {
          className: 'mt-8',
          children: [
            e.jsx('h2', {
              className: 'text-sm mt-6 mb-2 text-foreground/50',
              children: 'Table of Contents',
            }),
            e.jsx('ul', {
              className: 'list-inside text-sm',
              children: r.map((l, n) =>
                e.jsxs(e.Fragment, {
                  children: [
                    e.jsx(
                      'li',
                      {
                        className: 'py-1',
                        children: e.jsx('a', {
                          href: `#${l.anchor.id}`,
                          className:
                            s === l.anchor.id
                              ? 'text-primary underline'
                              : 'text-foreground/20 cursor-pointer text-primary hover:underline',
                          children: l.anchor.text,
                        }),
                      },
                      n
                    ),
                    l.children &&
                      l.children.length > 0 &&
                      e.jsx('ul', {
                        className: 'list-inside ml-4',
                        children: l.children.map((t) =>
                          e.jsx(
                            'li',
                            {
                              className: 'py-1',
                              children: e.jsx('a', {
                                href: `#${t.anchor.id}`,
                                className:
                                  s === t.anchor.id
                                    ? 'text-primary underline'
                                    : 'text-foreground/20 cursor-pointer text-primary hover:underline',
                                children: t.anchor.text,
                              }),
                            },
                            t.anchor.id
                          )
                        ),
                      }),
                  ],
                })
              ),
            }),
          ],
        }),
      });
    },
  },
  Je = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Xe },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  Ze = Object.assign({ '/mdx-components.tsx': Je });
let Y = {};
const M = Object.entries(Ze);
if (M.length > 0) {
  const [r, s] = M[0];
  Y = s.default;
}
const Qe = Y;
function O(r) {
  const s = {
    a: 'a',
    blockquote: 'blockquote',
    code: 'code',
    figcaption: 'figcaption',
    figure: 'figure',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    img: 'img',
    li: 'li',
    p: 'p',
    pre: 'pre',
    span: 'span',
    strong: 'strong',
    table: 'table',
    tbody: 'tbody',
    td: 'td',
    th: 'th',
    thead: 'thead',
    tr: 'tr',
    ul: 'ul',
    ...r.components,
  };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx(s.h1, { children: 'Créer une API REST avec Express.js' }),
      `
`,
      e.jsx(s.p, {
        children:
          'Express.js est un framework minimaliste et flexible pour Node.js, idéal pour construire des API REST rapidement et efficacement. Dans cet article, nous allons voir comment créer une API REST basique avec Express.js, incluant les routes de base pour la gestion des données.',
      }),
      `
`,
      e.jsx(s.h2, { children: 'Prérequis [#pre-requis]' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          "Avant de commencer, assurez-vous d'avoir Node.js installé sur votre machine. Si ce n'est pas encore fait, téléchargez-le depuis ",
          e.jsx(s.a, { href: 'https://nodejs.org/', children: 'nodejs.org' }),
          '.',
        ],
      }),
      `
`,
      e.jsx(s.p, {
        children: e.jsx(s.img, {
          src: 'https://github.com/dilane3.png',
          alt: 'Dilane3',
        }),
      }),
      `
`,
      e.jsx(s.h2, { children: 'Initialisation du projet' }),
      `
`,
      e.jsx(s.h3, { children: 'Création du projet' }),
      `
`,
      e.jsx(s.p, {
        children:
          'Créez un nouveau dossier pour votre projet et initialisez un projet Node.js :',
      }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'sh',
          'data-theme': 'github-dark-dimmed',
          children: e.jsxs(s.code, {
            'data-language': 'sh',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: [
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#F69D50' },
                    children: 'mkdir',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' my-api',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' && ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: 'cd',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' my-api',
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
                    children: 'npm',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: ' init',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: ' -y',
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      `
`,
      e.jsx(s.h3, { children: "Installation d'Express.js" }),
      `
`,
      e.jsx(s.p, { children: 'Ensuite, installez Express.js :' }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'sh',
          'data-theme': 'github-dark-dimmed',
          children: e.jsx(s.code, {
            'data-line-numbers': '',
            'data-language': 'sh',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            'data-line-numbers-max-digits': '1',
            children: e.jsxs(s.span, {
              'data-line': '',
              'data-highlighted-line': '',
              children: [
                e.jsx(s.span, { style: { color: '#F69D50' }, children: 'npm' }),
                e.jsx(s.span, {
                  style: { color: '#96D0FF' },
                  children: ' install',
                }),
                e.jsx(s.span, {
                  style: { color: '#96D0FF' },
                  children: ' express',
                }),
              ],
            }),
          }),
        }),
      }),
      `
`,
      e.jsx(s.h2, { children: 'Création du serveur Express' }),
      `
`,
      e.jsx(s.h3, { children: 'Configuration du serveur' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Créez un fichier ',
          e.jsx(s.code, { children: 'server.js' }),
          ' à la racine de votre projet et ajoutez le code suivant :',
        ],
      }),
      `
`,
      e.jsxs(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: [
          e.jsx(s.figcaption, {
            'data-rehype-pretty-code-title': '',
            'data-language': 'javascript',
            'data-theme': 'github-dark-dimmed',
            children: 'Test',
          }),
          e.jsx(s.pre, {
            style: { backgroundColor: '#22272e', color: '#adbac7' },
            tabIndex: '0',
            'data-language': 'javascript',
            'data-theme': 'github-dark-dimmed',
            children: e.jsxs(s.code, {
              'data-language': 'javascript',
              'data-theme': 'github-dark-dimmed',
              style: { display: 'grid' },
              children: [
                e.jsxs(s.span, {
                  'data-line': '',
                  children: [
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: 'const',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' express',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: ' require',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: "'express'",
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ');',
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
                      children: 'const',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' app',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: ' express',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '();',
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
                      children: 'const',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' PORT',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' =',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ' process.env.',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: 'PORT',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F47067' },
                      children: ' ||',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: ' 3000',
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
                      style: { color: '#ADBAC7' },
                      children: 'app.',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: 'use',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(express.',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: 'json',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '()); ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#768390' },
                      children: '// Middleware pour parser le JSON',
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
                      style: { color: '#ADBAC7' },
                      children: 'app.',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: 'get',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: "'/'",
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ', (',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'req',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ', ',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#F69D50' },
                      children: 'res',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ') ',
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
                      style: { color: '#ADBAC7' },
                      children: '  res.',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: 'send',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: "'Bienvenue sur mon API REST !'",
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ');',
                    }),
                  ],
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '});',
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
                      children: 'app.',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: 'listen',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: 'PORT',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ', () ',
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
                      style: { color: '#ADBAC7' },
                      children: '  console.',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#DCBDFB' },
                      children: 'log',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: '(',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '`Serveur démarré sur http://localhost:${',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#6CB6FF' },
                      children: 'PORT',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#96D0FF' },
                      children: '}`',
                    }),
                    e.jsx(s.span, {
                      style: { color: '#ADBAC7' },
                      children: ');',
                    }),
                  ],
                }),
                `
`,
                e.jsx(s.span, {
                  'data-line': '',
                  children: e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '});',
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
      `
`,
      e.jsx(s.h3, { children: 'Démarrage du serveur' }),
      `
`,
      e.jsx(s.p, { children: 'Lancez votre serveur avec la commande :' }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'sh',
          'data-theme': 'github-dark-dimmed',
          children: e.jsx(s.code, {
            'data-language': 'sh',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: e.jsxs(s.span, {
              'data-line': '',
              children: [
                e.jsx(s.span, {
                  style: { color: '#F69D50' },
                  children: 'node',
                }),
                e.jsx(s.span, {
                  style: { color: '#96D0FF' },
                  children: ' server.js',
                }),
              ],
            }),
          }),
        }),
      }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Vous devriez voir ',
          e.jsx(s.code, {
            children: 'Serveur démarré sur http://localhost:3000',
          }),
          " dans votre terminal et pouvoir accéder à l'URL ",
          e.jsx(s.code, { children: 'http://localhost:3000' }),
          ' depuis votre navigateur.',
        ],
      }),
      `
`,
      e.jsx(s.h2, { children: 'Mise en place des routes CRUD' }),
      `
`,
      e.jsx(s.h3, { children: 'Création du fichier des routes' }),
      `
`,
      e.jsx(s.p, {
        children:
          'Ajoutons maintenant des routes pour gérer une ressource simple, comme des utilisateurs.',
      }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Créez un dossier ',
          e.jsx(s.code, { children: 'routes/' }),
          ' et ajoutez un fichier ',
          e.jsx(s.code, { children: 'users.js' }),
          ' :',
        ],
      }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'javascript',
          'data-theme': 'github-dark-dimmed',
          children: e.jsxs(s.code, {
            'data-language': 'javascript',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: [
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: 'const',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: ' express',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: ' =',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: ' require',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '(' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: "'express'",
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ');',
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
                    children: 'const',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: ' router',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: ' =',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' express.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'Router',
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
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#768390' },
                  children: '// Données fictives',
                }),
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: 'let',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' users ',
                  }),
                  e.jsx(s.span, { style: { color: '#F47067' }, children: '=' }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' [',
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
                    children: '  { id: ',
                  }),
                  e.jsx(s.span, { style: { color: '#6CB6FF' }, children: '1' }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ', name: ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: "'John Doe'",
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' },',
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
                    children: '  { id: ',
                  }),
                  e.jsx(s.span, { style: { color: '#6CB6FF' }, children: '2' }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ', name: ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: "'Jane Doe'",
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' },',
                  }),
                ],
              }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#ADBAC7' },
                  children: '];',
                }),
              }),
              `
`,
              e.jsx(s.span, { 'data-line': '', children: ' ' }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#768390' },
                  children: '// Lire tous les utilisateurs',
                }),
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: 'router.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'get',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '(' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: "'/'",
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ', (',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F69D50' },
                    children: 'req',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ', ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F69D50' },
                    children: 'res',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ') ',
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
                    style: { color: '#ADBAC7' },
                    children: '  res.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'json',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '(users);',
                  }),
                ],
              }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#ADBAC7' },
                  children: '});',
                }),
              }),
              `
`,
              e.jsx(s.span, { 'data-line': '', children: ' ' }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#768390' },
                  children: '// Lire un utilisateur par ID',
                }),
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: 'router.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'get',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '(' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: "'/:id'",
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ', (',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F69D50' },
                    children: 'req',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ', ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F69D50' },
                    children: 'res',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ') ',
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
                    style: { color: '#6CB6FF' },
                    children: ' user',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: ' =',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' users.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'find',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '((',
                  }),
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: 'u' }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ') ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: '=>',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' u.id ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: '===',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: ' parseInt',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '(req.params.id));',
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
                    children: '  if',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' (',
                  }),
                  e.jsx(s.span, { style: { color: '#F47067' }, children: '!' }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: 'user) ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: 'return',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' res.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'status',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '(' }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: '404',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ').',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'json',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '({ message: ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: "'Utilisateur non trouvé'",
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' });',
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
                    children: '  res.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'json',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '(user);',
                  }),
                ],
              }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#ADBAC7' },
                  children: '});',
                }),
              }),
              `
`,
              e.jsx(s.span, { 'data-line': '', children: ' ' }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#768390' },
                  children: '// Créer un utilisateur',
                }),
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: 'router.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'post',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '(' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: "'/'",
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ', (',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F69D50' },
                    children: 'req',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ', ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F69D50' },
                    children: 'res',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ') ',
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
                    style: { color: '#6CB6FF' },
                    children: ' newUser',
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
                children: [
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '    id: users.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: 'length',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: ' +',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: ' 1',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: ',' }),
                ],
              }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#ADBAC7' },
                  children: '    name: req.body.name,',
                }),
              }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#ADBAC7' },
                  children: '  };',
                }),
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '  users.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'push',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '(newUser);',
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
                    children: '  res.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'status',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '(' }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: '201',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ').',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'json',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '(newUser);',
                  }),
                ],
              }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#ADBAC7' },
                  children: '});',
                }),
              }),
              `
`,
              e.jsx(s.span, { 'data-line': '', children: ' ' }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#768390' },
                  children: '// Mettre à jour un utilisateur',
                }),
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: 'router.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'put',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '(' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: "'/:id'",
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ', (',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F69D50' },
                    children: 'req',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ', ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F69D50' },
                    children: 'res',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ') ',
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
                    style: { color: '#6CB6FF' },
                    children: ' user',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: ' =',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' users.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'find',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '((',
                  }),
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: 'u' }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ') ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: '=>',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' u.id ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: '===',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: ' parseInt',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '(req.params.id));',
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
                    children: '  if',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' (',
                  }),
                  e.jsx(s.span, { style: { color: '#F47067' }, children: '!' }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: 'user) ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: 'return',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' res.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'status',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '(' }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: '404',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ').',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'json',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '({ message: ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: "'Utilisateur non trouvé'",
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' });',
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
                    children: '  user.name ',
                  }),
                  e.jsx(s.span, { style: { color: '#F47067' }, children: '=' }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' req.body.name;',
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
                    children: '  res.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'json',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '(user);',
                  }),
                ],
              }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#ADBAC7' },
                  children: '});',
                }),
              }),
              `
`,
              e.jsx(s.span, { 'data-line': '', children: ' ' }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#768390' },
                  children: '// Supprimer un utilisateur',
                }),
              }),
              `
`,
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: 'router.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'delete',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '(' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: "'/:id'",
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ', (',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F69D50' },
                    children: 'req',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ', ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F69D50' },
                    children: 'res',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ') ',
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
                    style: { color: '#ADBAC7' },
                    children: '  users ',
                  }),
                  e.jsx(s.span, { style: { color: '#F47067' }, children: '=' }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' users.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'filter',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '((',
                  }),
                  e.jsx(s.span, { style: { color: '#F69D50' }, children: 'u' }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ') ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: '=>',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' u.id ',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: '!==',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: ' parseInt',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '(req.params.id));',
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
                    children: '  res.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'status',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '(' }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: '204',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ').',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'send',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '();',
                  }),
                ],
              }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#ADBAC7' },
                  children: '});',
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
                    style: { color: '#6CB6FF' },
                    children: 'module',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '.' }),
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
                    children: ' router;',
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      `
`,
      e.jsx(s.h3, { children: 'Intégration des routes dans le serveur' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Puis, modifiez ',
          e.jsx(s.code, { children: 'server.js' }),
          ' pour utiliser ces routes :',
        ],
      }),
      `
`,
      e.jsx(s.figure, {
        'data-rehype-pretty-code-figure': '',
        children: e.jsx(s.pre, {
          style: { backgroundColor: '#22272e', color: '#adbac7' },
          tabIndex: '0',
          'data-language': 'javascript',
          'data-theme': 'github-dark-dimmed',
          children: e.jsxs(s.code, {
            'data-language': 'javascript',
            'data-theme': 'github-dark-dimmed',
            style: { display: 'grid' },
            children: [
              e.jsxs(s.span, {
                'data-line': '',
                children: [
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: 'const',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: ' express',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: ' =',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: ' require',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '(' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: "'express'",
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ');',
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
                    children: 'const',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: ' app',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: ' =',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: ' express',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '();',
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
                    children: 'const',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: ' PORT',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: ' =',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ' process.env.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: 'PORT',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: ' ||',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: ' 3000',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: ';' }),
                ],
              }),
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
                    style: { color: '#6CB6FF' },
                    children: ' usersRoutes',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#F47067' },
                    children: ' =',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: ' require',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '(' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: "'./routes/users'",
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ');',
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
                    style: { color: '#ADBAC7' },
                    children: 'app.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'use',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '(express.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'json',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: '());',
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
                    children: 'app.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'use',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '(' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: "'/users'",
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ', usersRoutes);',
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
                    style: { color: '#ADBAC7' },
                    children: 'app.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'listen',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '(' }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: 'PORT',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ', () ',
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
                    style: { color: '#ADBAC7' },
                    children: '  console.',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#DCBDFB' },
                    children: 'log',
                  }),
                  e.jsx(s.span, { style: { color: '#ADBAC7' }, children: '(' }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '`Serveur démarré sur http://localhost:${',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#6CB6FF' },
                    children: 'PORT',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#96D0FF' },
                    children: '}`',
                  }),
                  e.jsx(s.span, {
                    style: { color: '#ADBAC7' },
                    children: ');',
                  }),
                ],
              }),
              `
`,
              e.jsx(s.span, {
                'data-line': '',
                children: e.jsx(s.span, {
                  style: { color: '#ADBAC7' },
                  children: '});',
                }),
              }),
            ],
          }),
        }),
      }),
      `
`,
      e.jsx(s.h2, { children: 'Test des routes' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Vous pouvez tester votre API avec ',
          e.jsx(s.a, { href: 'https://www.postman.com/', children: 'Postman' }),
          ' ou en utilisant ',
          e.jsx(s.code, { children: 'curl' }),
          ' :',
        ],
      }),
      `
`,
      e.jsx(s.h3, { children: 'Tester la récupération des utilisateurs' }),
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsxs(s.li, {
            children: [
              'Récupérer tous les utilisateurs :',
              `
`,
              e.jsx(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: e.jsx(s.pre, {
                  style: { backgroundColor: '#22272e', color: '#adbac7' },
                  tabIndex: '0',
                  'data-language': 'sh',
                  'data-theme': 'github-dark-dimmed',
                  children: e.jsx(s.code, {
                    'data-language': 'sh',
                    'data-theme': 'github-dark-dimmed',
                    style: { display: 'grid' },
                    children: e.jsxs(s.span, {
                      'data-line': '',
                      children: [
                        e.jsx(s.span, {
                          style: { color: '#F69D50' },
                          children: 'curl',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#6CB6FF' },
                          children: ' -X',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' GET',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' http://localhost:3000/users',
                        }),
                      ],
                    }),
                  }),
                }),
              }),
              `
`,
            ],
          }),
          `
`,
          e.jsxs(s.li, {
            children: [
              'Récupérer un utilisateur par ID :',
              `
`,
              e.jsx(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: e.jsx(s.pre, {
                  style: { backgroundColor: '#22272e', color: '#adbac7' },
                  tabIndex: '0',
                  'data-language': 'sh',
                  'data-theme': 'github-dark-dimmed',
                  children: e.jsx(s.code, {
                    'data-language': 'sh',
                    'data-theme': 'github-dark-dimmed',
                    style: { display: 'grid' },
                    children: e.jsxs(s.span, {
                      'data-line': '',
                      children: [
                        e.jsx(s.span, {
                          style: { color: '#F69D50' },
                          children: 'curl',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#6CB6FF' },
                          children: ' -X',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' GET',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' http://localhost:3000/users/1',
                        }),
                      ],
                    }),
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
      e.jsx(s.h3, { children: "Tester la création d'un utilisateur" }),
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsxs(s.li, {
            children: [
              'Créer un utilisateur :',
              `
`,
              e.jsx(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: e.jsx(s.pre, {
                  style: { backgroundColor: '#22272e', color: '#adbac7' },
                  tabIndex: '0',
                  'data-language': 'sh',
                  'data-theme': 'github-dark-dimmed',
                  children: e.jsx(s.code, {
                    'data-language': 'sh',
                    'data-theme': 'github-dark-dimmed',
                    style: { display: 'grid' },
                    children: e.jsxs(s.span, {
                      'data-line': '',
                      children: [
                        e.jsx(s.span, {
                          style: { color: '#F69D50' },
                          children: 'curl',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#6CB6FF' },
                          children: ' -X',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' POST',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' http://localhost:3000/users',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#6CB6FF' },
                          children: ' -H',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' "Content-Type: application/json"',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#6CB6FF' },
                          children: ' -d',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ` '{"name": "Alice"}'`,
                        }),
                      ],
                    }),
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
      e.jsx(s.h3, { children: "Tester la mise à jour d'un utilisateur" }),
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsxs(s.li, {
            children: [
              'Mettre à jour un utilisateur :',
              `
`,
              e.jsx(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: e.jsx(s.pre, {
                  style: { backgroundColor: '#22272e', color: '#adbac7' },
                  tabIndex: '0',
                  'data-language': 'sh',
                  'data-theme': 'github-dark-dimmed',
                  children: e.jsx(s.code, {
                    'data-language': 'sh',
                    'data-theme': 'github-dark-dimmed',
                    style: { display: 'grid' },
                    children: e.jsxs(s.span, {
                      'data-line': '',
                      children: [
                        e.jsx(s.span, {
                          style: { color: '#F69D50' },
                          children: 'curl',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#6CB6FF' },
                          children: ' -X',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' PUT',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' http://localhost:3000/users/1',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#6CB6FF' },
                          children: ' -H',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' "Content-Type: application/json"',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#6CB6FF' },
                          children: ' -d',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ` '{"name": "John Smith"}'`,
                        }),
                      ],
                    }),
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
      e.jsx(s.h3, { children: "Tester la suppression d'un utilisateur" }),
      `
`,
      e.jsxs(s.ul, {
        children: [
          `
`,
          e.jsxs(s.li, {
            children: [
              'Supprimer un utilisateur :',
              `
`,
              e.jsx(s.figure, {
                'data-rehype-pretty-code-figure': '',
                children: e.jsx(s.pre, {
                  style: { backgroundColor: '#22272e', color: '#adbac7' },
                  tabIndex: '0',
                  'data-language': 'sh',
                  'data-theme': 'github-dark-dimmed',
                  children: e.jsx(s.code, {
                    'data-language': 'sh',
                    'data-theme': 'github-dark-dimmed',
                    style: { display: 'grid' },
                    children: e.jsxs(s.span, {
                      'data-line': '',
                      children: [
                        e.jsx(s.span, {
                          style: { color: '#F69D50' },
                          children: 'curl',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#6CB6FF' },
                          children: ' -X',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' DELETE',
                        }),
                        e.jsx(s.span, {
                          style: { color: '#96D0FF' },
                          children: ' http://localhost:3000/users/1',
                        }),
                      ],
                    }),
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
      e.jsx(s.h2, { children: 'Conclusion' }),
      `
`,
      e.jsxs(s.p, {
        children: [
          'Vous venez de créer une API REST basique avec Express.js ! Ce guide vous a montré comment configurer un serveur, définir des routes CRUD et tester votre API. Pour aller plus loin, vous pouvez ajouter une base de données avec MongoDB ou PostgreSQL et utiliser des middleware comme ',
          e.jsx(s.code, { children: 'cors' }),
          ' ou ',
          e.jsx(s.code, { children: 'morgan' }),
          ' pour améliorer votre API.',
        ],
      }),
      `
`,
      e.jsx(s.p, { children: 'Bon codage ! 🚀' }),
      `
`,
      e.jsxs(s.table, {
        children: [
          e.jsx(s.thead, {
            children: e.jsxs(s.tr, {
              children: [
                e.jsx(s.th, { children: 'Hello' }),
                e.jsx(s.th, { children: 'oBon' }),
                e.jsx(s.th, { children: 'fdg' }),
                e.jsx(s.th, { children: 'gg' }),
              ],
            }),
          }),
          e.jsxs(s.tbody, {
            children: [
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, { children: 'Hello' }),
                  e.jsx(s.td, { children: 'oBon' }),
                  e.jsx(s.td, { children: 'fdg' }),
                  e.jsx(s.td, { children: 'gg' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, { children: 'Hello' }),
                  e.jsx(s.td, { children: 'oBon' }),
                  e.jsx(s.td, { children: 'fdg' }),
                  e.jsx(s.td, { children: 'gg' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, { children: 'Hello' }),
                  e.jsx(s.td, { children: 'oBon' }),
                  e.jsx(s.td, { children: 'fdg' }),
                  e.jsx(s.td, { children: 'gg' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, { children: 'Hello' }),
                  e.jsx(s.td, { children: 'oBon' }),
                  e.jsx(s.td, { children: 'fdg' }),
                  e.jsx(s.td, { children: 'gg' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, { children: 'Hello' }),
                  e.jsx(s.td, { children: 'oBon' }),
                  e.jsx(s.td, { children: 'fdg' }),
                  e.jsx(s.td, { children: 'gg' }),
                ],
              }),
              e.jsxs(s.tr, {
                children: [
                  e.jsx(s.td, { children: 'Hello' }),
                  e.jsx(s.td, { children: 'oBon' }),
                  e.jsx(s.td, { children: 'fdg' }),
                  e.jsx(s.td, { children: 'gg' }),
                ],
              }),
            ],
          }),
        ],
      }),
      `
`,
      e.jsxs(s.blockquote, {
        children: [
          `
`,
          e.jsxs(s.p, {
            children: [
              e.jsx(s.strong, { children: 'Note' }),
              `
This is a note`,
            ],
          }),
          `
`,
          e.jsxs(s.ul, {
            children: [
              `
`,
              e.jsx(s.li, { children: 'List item 1' }),
              `
`,
              e.jsx(s.li, { children: 'List item 2' }),
              `
`,
              e.jsx(s.li, { children: 'List item 3' }),
              `
`,
            ],
          }),
          `
`,
        ],
      }),
    ],
  });
}
const Ke = function (s = {}) {
    const { wrapper: l } = s.components || {};
    return l ? e.jsx(l, { ...s, children: e.jsx(O, { ...s }) }) : O(s);
  },
  Ye = {
    path: '/',
    metadata: {
      title: 'My Blog',
      description: 'Discover the latest articles on my blog.',
    },
  },
  es = [
    {
      title: 'Prérequis [#pre-requis]',
      anchor: { id: 'pre-requis', text: 'Prérequis' },
      level: 2,
      children: [],
    },
    {
      title: 'Initialisation du projet',
      anchor: {
        id: 'initialisation-du-projet',
        text: 'Initialisation du projet',
      },
      level: 2,
      children: [
        {
          title: 'Création du projet',
          anchor: { id: 'création-du-projet', text: 'Création du projet' },
          level: 3,
        },
        {
          title: "Installation d'Express.js",
          anchor: {
            id: "installation-d'express.js",
            text: "Installation d'Express.js",
          },
          level: 3,
        },
      ],
    },
    {
      title: 'Création du serveur Express',
      anchor: {
        id: 'création-du-serveur-express',
        text: 'Création du serveur Express',
      },
      level: 2,
      children: [
        {
          title: 'Configuration du serveur',
          anchor: {
            id: 'configuration-du-serveur',
            text: 'Configuration du serveur',
          },
          level: 3,
        },
        {
          title: 'Démarrage du serveur',
          anchor: { id: 'démarrage-du-serveur', text: 'Démarrage du serveur' },
          level: 3,
        },
      ],
    },
    {
      title: 'Mise en place des routes CRUD',
      anchor: {
        id: 'mise-en-place-des-routes-crud',
        text: 'Mise en place des routes CRUD',
      },
      level: 2,
      children: [
        {
          title: 'Création du fichier des routes',
          anchor: {
            id: 'création-du-fichier-des-routes',
            text: 'Création du fichier des routes',
          },
          level: 3,
        },
        {
          title: 'Intégration des routes dans le serveur',
          anchor: {
            id: 'intégration-des-routes-dans-le-serveur',
            text: 'Intégration des routes dans le serveur',
          },
          level: 3,
        },
      ],
    },
    {
      title: 'Test des routes',
      anchor: { id: 'test-des-routes', text: 'Test des routes' },
      level: 2,
      children: [
        {
          title: 'Tester la récupération des utilisateurs',
          anchor: {
            id: 'tester-la-récupération-des-utilisateurs',
            text: 'Tester la récupération des utilisateurs',
          },
          level: 3,
        },
        {
          title: "Tester la création d'un utilisateur",
          anchor: {
            id: "tester-la-création-d'un-utilisateur",
            text: "Tester la création d'un utilisateur",
          },
          level: 3,
        },
        {
          title: "Tester la mise à jour d'un utilisateur",
          anchor: {
            id: "tester-la-mise-à-jour-d'un-utilisateur",
            text: "Tester la mise à jour d'un utilisateur",
          },
          level: 3,
        },
        {
          title: "Tester la suppression d'un utilisateur",
          anchor: {
            id: "tester-la-suppression-d'un-utilisateur",
            text: "Tester la suppression d'un utilisateur",
          },
          level: 3,
        },
      ],
    },
    {
      title: 'Conclusion',
      anchor: { id: 'conclusion', text: 'Conclusion' },
      level: 2,
      children: [],
    },
  ],
  ss = {
    metadata: Ye,
    toc: es,
    type: 'MDXPageComponent',
    Content: Ke,
    Renderer: Ge,
    config: Qe,
  },
  P = () =>
    e.jsxs('section', {
      children: [
        e.jsx('h1', { children: 'About page' }),
        e.jsx(ke, { to: '/home', className: 'mt-8', children: 'Home' }),
      ],
    });
P.path = '/about/h';
P.metadata = { title: 'About', description: 'About page' };
const B = `
# Créer une API REST avec Express.js

Express.js est un framework minimaliste et flexible pour Node.js, idéal pour construire des API REST rapidement et efficacement. Dans cet article, nous allons voir comment créer une API REST basique avec Express.js, incluant les routes de base pour la gestion des données.

## Prérequis

Avant de commencer, assurez-vous d'avoir Node.js installé sur votre machine. Si ce n'est pas encore fait, téléchargez-le depuis [nodejs.org](https://nodejs.org/).

## Initialisation du projet

### Création du projet

Créez un nouveau dossier pour votre projet et initialisez un projet Node.js :

~~~sh
mkdir my-api && cd my-api
npm init -y
~~~

### Installation d'Express.js

Ensuite, installez Express.js :

~~~sh
npm install express
~~~

## Création du serveur Express

### Configuration du serveur

Créez un fichier ~server.js~ à la racine de votre projet et ajoutez le code suivant :

~~~javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware pour parser le JSON

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API REST !');
});

app.listen(PORT, () => {
    console.log(~Serveur démarré sur http://localhost:\${PORT}~);
});
~~~

### Démarrage du serveur

Lancez votre serveur avec la commande :

~~~sh
node server.js
~~~

Vous devriez voir ~Serveur démarré sur http://localhost:3000~ dans votre terminal et pouvoir accéder à l'URL ~http://localhost:3000~ depuis votre navigateur.

## Mise en place des routes CRUD

### Création du fichier des routes

Ajoutons maintenant des routes pour gérer une ressource simple, comme des utilisateurs.

Créez un dossier ~routes/~ et ajoutez un fichier ~users.js~ :

~~~javascript
const express = require('express');
const router = express.Router();

// Données fictives
let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
];

// Lire tous les utilisateurs
router.get('/', (req, res) => {
    res.json(users);
});

// Lire un utilisateur par ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(user);
});

// Créer un utilisateur
router.post('/', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Mettre à jour un utilisateur
router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    user.name = req.body.name;
    res.json(user);
});

// Supprimer un utilisateur
router.delete('/:id', (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.status(204).send();
});

module.exports = router;
~~~

### Intégration des routes dans le serveur

Puis, modifiez ~server.js~ pour utiliser ces routes :

~~~javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const usersRoutes = require('./routes/users');

app.use(express.json());
app.use('/users', usersRoutes);

app.listen(PORT, () => {
    console.log(~Serveur démarré sur http://localhost:\${PORT}~);
});
~~~

## Test des routes

Vous pouvez tester votre API avec [Postman](https://www.postman.com/) ou en utilisant ~curl~ :

### Tester la récupération des utilisateurs

- Récupérer tous les utilisateurs :
  ~~~sh
  curl -X GET http://localhost:3000/users
  ~~~
- Récupérer un utilisateur par ID :
  ~~~sh
  curl -X GET http://localhost:3000/users/1
  ~~~

### Tester la création d'un utilisateur

- Créer un utilisateur :
  ~~~sh
  curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "Alice"}'
  ~~~

### Tester la mise à jour d'un utilisateur

- Mettre à jour un utilisateur :
  ~~~sh
  curl -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"name": "John Smith"}'
  ~~~

### Tester la suppression d'un utilisateur

- Supprimer un utilisateur :
  ~~~sh
  curl -X DELETE http://localhost:3000/users/1
  ~~~

## Conclusion

Vous venez de créer une API REST basique avec Express.js ! Ce guide vous a montré comment configurer un serveur, définir des routes CRUD et tester votre API. Pour aller plus loin, vous pouvez ajouter une base de données avec MongoDB ou PostgreSQL et utiliser des middleware comme \`cors\` ou \`morgan\` pour améliorer votre API.

Bon codage ! 🚀
`,
  R = () => (
    console.log(z(B)),
    e.jsx('section', {
      className: 'overflow-auto',
      children: e.jsxs('section', {
        className:
          'mx-auto grid w-full max-w-3xl grid-cols-1 gap-10 xl:max-w-6xl xl:grid-cols-[minmax(0,1fr)_var(--container-2xs)] h-screen',
        children: [
          e.jsx('section', {
            className: 'px-0 pt-10 pb-24 sm:px-6 xl:pr-0',
            children: e.jsx(K, { content: B }),
          }),
          e.jsx('aside', {
            className: 'rasengan-toc max-xl:hidden',
            children: e.jsx(Q, { items: z(B) }),
          }),
        ],
      }),
    })
  );
R.path = '/contact?';
R.metadata = { title: 'Contact', description: 'Contact page' };
const N = () =>
  e.jsx('section', { children: e.jsx('h1', { children: 'Pricing page' }) });
N.path = '/pricing';
N.metadata = { title: 'Pricing', description: 'Pricing page' };
const rs = ve({ path: '/group', children: [R, N] }),
  ts = `
# Hello world

\`\`\`json
{
  "name": "John Doe",
  "age": 30
}
\`\`\`
`,
  F = (r) =>
    e.jsx('section', {
      className:
        'w-full h-full bg-white flex flex-col items-center py-8 px-[20px] md:px-[50px] xl:px-[200px] font-comfortaa',
      children: e.jsx(K, { content: ts }),
    });
F.path = '/home';
F.metadata = {
  title: 'Home',
  description: 'Home page',
  openGraph: {
    title: 'Home',
    description: 'Home page',
    type: 'website',
    url: 'https://beta3.rasengan.dev',
    image: 'https://beta4.rasengan.dev/assets/og-image.png',
  },
  metaTags: [
    {
      name: 'keywords',
      content: 'rasengan, react, ssr, ssg, static site generator',
    },
    { name: 'author', content: 'Rasengan' },
  ],
};
F.loader = async () => {
  const l = (
    await (await fetch('https://jsonplaceholder.typicode.com/posts')).json()
  )[0];
  return (
    console.log(l),
    { props: {}, meta: { title: l.title, description: l.body } }
  );
};
class ns extends U {}
const os = q({ imports: [], pages: [F, P, rs], useParentLayout: !0 })(ns);
class ls extends U {}
const as = q({ imports: [os], layout: T, pages: [ss] })(ls);
_e(ze, as);
