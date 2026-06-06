---
name: rasengan-pages
description: Page and layout component patterns for Rasengan.js. Covers page components, layouts, metadata, MDX pages, entry point setup, HTML template, navigation, error boundaries, and 404 handling. Use when creating or modifying .page.tsx, .page.mdx, layout.tsx, main.tsx, template.tsx, or index.ts files.
license: MIT
metadata:
  author: dilane3
  framework: rasengan
  version: '2.0.0'
---

# Rasengan.js Page & Layout Patterns

## When to Activate

- Creating or editing a `.page.tsx` / `.page.mdx` file
- Creating or editing a `layout.tsx` file
- Setting up `src/main.tsx` (App component) or `src/template.tsx` (HTML shell)
- Writing `src/index.ts` (entry point)
- Defining page metadata (title, description, Open Graph, Twitter)
- Handling page-level errors or 404 routes
- Using MDX pages with `@rasenganjs/mdx`

## Entry Point

```ts
import { renderApp } from 'rasengan/client';
import App from './main';
import AppRouter from '@/app/app.router';

renderApp(App, AppRouter, { reactStrictMode: true });
```

Parameters:

- `App` — Root App component (default import from `./main`)
- `AppRouter?` — Optional for config-based routing. Omit for file-based routing where router is defined inside `main.tsx`
- `options?` — `{ reactStrictMode?: boolean }`

## Root App Component

`src/main.{jsx,tsx}`:

```tsx
import { type AppProps } from 'rasengan';

export default function App({ Component, children }: AppProps) {
  return (
    <Provider>
      <Component router={AppRouter}>{children}</Component>
    </Provider>
  );
}
```

- Must default-export a function receiving `AppProps` (`{ Component, children }`)
- Wrap `<Component>` around children to enable routing
- Place global providers (ThemeProvider, I18nProvider, etc.) here

## HTML Template

`src/template.{jsx,tsx}`:

```tsx
import { type TemplateProps } from 'rasengan';

export default function Template({ Head, Body, Script }: TemplateProps) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Body>
        <Script />
      </Body>
    </html>
  );
}
```

Props:

- `Head` — Component for `<head>` content
- `Body` — Component for `<body>` content (children appended after `<div id="root">`)
- `Script` — Component for additional scripts (place inside `<Body>`)

## Page Components

### Config-based routing

File: `src/app/home.page.tsx`

```tsx
import { type PageComponent } from 'rasengan';

const Home: PageComponent = () => {
  return <main>Home Page</main>;
};

Home.path = '/';
Home.metadata = {
  title: 'Home',
  description: 'Home page description',
  openGraph: {
    title: 'Home',
    description: 'Home page description',
    url: 'https://example.com',
    image: 'https://example.com/og.png',
  },
  twitter: {
    card: 'summary_large_image',
    image: 'https://example.com/twitter.png',
    title: 'Home',
  },
};

export default Home;
```

### File-based routing

File: `src/app/_routes/index.page.tsx`

```tsx
const Home = () => <main>Home Page</main>;
export default Home;
```

Rules:

- Files under `src/app/_routes/` are auto-discovered
- Naming: `*.page.{js,ts,jsx,tsx,mdx,md}`
- No `path` needed — derived from file location
- `metadata` can be set on the exported component
- Use separate `layout.tsx` files for layouts in the same directory

## Layout Components

```tsx
import { Outlet, type LayoutComponent } from 'rasengan';

const AppLayout: LayoutComponent = () => {
  return (
    <div>
      <header>Shared Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Shared Footer</footer>
    </div>
  );
};

AppLayout.path = '/';
AppLayout.metadata = {
  openGraph: { title: 'My App', image: '...' },
};

export default AppLayout;
```

### Nested layouts

Layouts in subdirectories are automatically nested:

File: `src/app/_routes/(docs)/layout.tsx`

```tsx
import { Outlet } from 'rasengan';

const DocsLayout = () => (
  <div className="flex">
    <nav>Docs Sidebar</nav>
    <main>
      <Outlet />
    </main>
  </div>
);
export default DocsLayout;
```

Rules:

- Must default-export a function component
- Must render `<Outlet />` where child routes should appear
- Must set `path` as a static property for config-based routing
- `metadata` on layouts applies to all child pages (merged with page metadata, page wins)
- Use `LayoutComponent` type from `rasengan` for TypeScript

## Metadata System

```ts
type Metadata = {
  title?: string;
  description?: string;
  openGraph?: {
    type?: string;
    title?: string;
    description?: string;
    url: string;
    image: string;
    width?: string;
    height?: string;
  };
  twitter?: {
    card: 'summary_large_image' | 'summary';
    image: string;
    title: string;
    description?: string;
    creator?: string;
    site?: string;
  };
  links?: Array<{ rel: string; type?: string; sizes?: string; href: string }>;
  metaTags?: Array<{ name?: string; property?: string; content: string }>;
};
```

Rules:

- Page metadata takes priority over layout metadata (merged, page wins)
- Loader-returned `meta` overrides static metadata
- `openGraph.url` and `openGraph.image` are required when using Open Graph
- `twitter.card`, `twitter.image`, `twitter.title` are required when using Twitter cards

## MDX Pages

MDX files in `_routes/` automatically render as pages:

```mdx
---
metadata:
  title: My MDX Page
  description: Page description
toc: true
---
```

Custom MDX components configured at project root via `mdx-components.{js,ts,jsx,tsx}`:

```tsx
import { defineMDXConfig } from '@rasenganjs/mdx';

export default defineMDXConfig({
  components: {
    h1: ({ children }) => <h1 className="text-3xl">{children}</h1>,
  },
  layout: ({ children, toc }) => (
    <div className="flex">
      <article>{children}</article>
      <aside>{toc}</aside>
    </div>
  ),
});
```

The `@rasenganjs/mdx` Vite plugin must be configured in `rasengan.config.js`:

```js
import mdx from '@rasenganjs/mdx/plugin';

export default defineConfig({
  vite: { plugins: [mdx()] },
});
```

## Error Boundaries & 404

- Each route is wrapped with an `ErrorBoundary` automatically
- In development: shows stack traces. In production: generic "Application Error"
- Custom error UI per route is not yet supported

Config-based 404:

```tsx
import { RouterComponent, defineRouter } from 'rasengan';

const NotFound = () => (
  <section>
    <h1>404</h1>
    <p>Page not found</p>
  </section>
);

class AppRouter extends RouterComponent {}
export default defineRouter({
  pages: [Home],
  notFoundComponent: NotFound,
})(AppRouter);
```

A catch-all `*` route is auto-added by `generateRoutes()`.

## Navigation

```tsx
import { Link, NavLink, useNavigate, ScrollRestoration } from 'rasengan';

<Link to="/about">About</Link>
<Link to="#section">Section</Link>
<NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>

const navigate = useNavigate();
navigate('/about');

<ScrollRestoration alwaysToTop />
<ScrollRestoration target={containerRef} />
```

## Anti-patterns

| Don't ❌                                                      | Do ✅                                                                   |
| ------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Forgetting to set `.path` on page/layout components           | Always set `.path` as a static property for config-based routing        |
| Using `React.FC` type for pages/layouts                       | Use `PageComponent` / `LayoutComponent` from `rasengan`                 |
| Putting metadata only in the component body                   | Use static `.metadata` property so the framework reads it at build time |
| Importing directly from `react-router`                        | Import routing APIs from `rasengan`                                     |
| Rendering `<Outlet>` outside layouts                          | Only `<Outlet />` in layout components                                  |
| Defining loaders as exported functions but not attaching them | Attach loader as static `.loader` property on component                 |
| Nesting pages too deep in `_routes/`                          | Keep route tree shallow — each directory adds a path segment            |
| Forgetting `"type": "module"` in package.json                 | Rasengan is ESM-only                                                    |
| Using `navigate()` outside route components                   | Only use navigation hooks within router-rendered components             |
