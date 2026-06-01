---
name: rasengan-pages
description: Page and layout component patterns for Rasengan.js. Covers page components, layouts, metadata, loaders, MDX pages, error boundaries, and 404 handling. Use when creating or modifying pages, layouts, loaders, or metadata in a Rasengan.js project.
license: MIT
metadata:
  author: dilane3
  framework: rasengan
  version: '1.0.0'
---

# Rasengan.js Page & Layout Patterns

## When to Activate

- Creating or editing a `.page.tsx` / `.page.mdx` file
- Creating or editing a `layout.tsx` file
- Defining page metadata (title, description, Open Graph, Twitter)
- Writing loader functions for data fetching
- Handling page-level errors or 404 routes
- Using MDX pages with `@rasenganjs/mdx`

## Required Project Files

Every Rasengan.js project must have these files at minimum:

| File                         | Purpose                                                  |
| ---------------------------- | -------------------------------------------------------- |
| `rasengan.config.js`         | Framework config via `defineConfig()`                    |
| `src/main.{jsx,tsx}`         | Root App component (default export, receives `AppProps`) |
| `src/template.{jsx,tsx}`     | HTML template (default export, receives `TemplateProps`) |
| `src/app/app.router.{js,ts}` | Router definition (default export, `RouterComponent`)    |
| `src/index.{js,ts}`          | Entry point calling `renderApp(App, AppRouter?)`         |

## Entry Point Pattern

The `src/index.{js,ts}` file is the application entry point:

```ts
import { renderApp } from 'rasengan/client';
import App from './main';
import AppRouter from '@/app/app.router';

renderApp(App, AppRouter, { reactStrictMode: true });
```

Parameters:

- `App` — The root App component (default import from `./main`)
- `AppRouter?` — Optional RouterComponent for config-based routing. Omit for file-based routing where the router is defined inside `main.tsx`
- `options?` — `{ reactStrictMode?: boolean }`

## Root App Component

The `src/main.{jsx,tsx}` file wraps the entire application:

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
- Place global providers (ThemeProvider, etc.) here

## HTML Template

The `src/template.{jsx,tsx}` file defines the HTML document shell:

```tsx
import { type TemplateProps } from 'rasengan';

export default function Template({ Head, Body, Script }: TemplateProps) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/rasengan.svg" />
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

- `Head` — Component for `<head>` content. Pass `<meta>`, `<link>`, `<script>` elements as children
- `Body` — Component for `<body>` content. Children are appended after `<div id="root">`
- `Script` — Component for additional scripts. Place inside `<Body>`

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

Rules:

- Must default-export a function component
- Must set `path` as a static property — the route path
- `metadata` is optional — for SEO and social sharing
- Use `PageComponent` type from `rasengan` for TypeScript

### File-based routing

File: `src/app/_routes/index.page.tsx`

```tsx
const Home = () => <main>Home Page</main>;
export default Home;
```

Rules:

- Files placed under `src/app/_routes/` are auto-discovered
- Naming: `*.page.{js,ts,jsx,tsx,mdx,md}`
- No `path` needed — derived from file location
- `metadata` can be set on the exported component
- Use separate `layout.tsx` files for layouts in the same directory

### Page with path alias metadata

```tsx
const About = () => <main>About</main>;
About.path = '/about';
About.metadata = {
  title: 'About Us',
  description: 'Learn about our company',
  links: [{ rel: 'canonical', href: 'https://example.com/about' }],
  metaTags: [{ name: 'keywords', content: 'company, about' }],
};
export default About;
```

## Layout Components

Layouts wrap pages and provide shared UI (headers, footers, sidebars):

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

Rules:

- Must default-export a function component
- Must render `<Outlet />` where child routes should appear
- Must set `path` as a static property for `Config-based routing`
- `metadata` on layouts applies to all child pages (merged with page metadata)
- Use `LayoutComponent` type from `rasengan` for TypeScript

### Nested layouts

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

Layouts in subdirectories are automatically nested. A layout at `_routes/docs/layout.tsx` wraps all pages under `_routes/docs/`.

## Metadata System

Metadata is defined as a static property on page or layout components:

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
- Server-side: `HeadComponent` in `TemplateLayout` generates `<meta>` tags
- Client-side: `MetadataProvider` intercepts route changes and injects/removes `[data-rg]` tags

## Loader Functions

Loaders fetch data per route, both on server (SSR) and client (navigation):

```tsx
const Posts: PageComponent = () => { ... };
Posts.loader = async ({ params }) => {
  const data = await fetch(`/api/posts/${params.id}`).then(r => r.json());
  return { props: { data } };
};
```

Return value: `{ props?, redirect?, meta?, source? }`

- `props` — Data passed to the page component
- `redirect` — URL string to redirect to (returns 302 Response)
- `meta` — Dynamic metadata overriding static metadata
- `source` — Source file identifier (auto-filled for file-based routing)

Access loader data in the component:

```tsx
const Post: PageComponent = ({ props: { post: any } }) => {
  return <article>{props.post.title}</article>;
};
```

## Dynamic Routes (File-based)

| File pattern               | Route       | Example URL       |
| -------------------------- | ----------- | ----------------- |
| `[id].page.tsx`            | `:id`       | `/posts/123`      |
| `[_locale]/index.page.tsx` | `:locale?`  | `/en` or `/`      |
| `(group)/index.page.tsx`   | (ignored)   | `/`               |
| `_optional/index.page.tsx` | `optional?` | `/optional` or `` |

Access params:

```tsx
import { useParams } from 'rasengan';

const Post = () => {
  const { id } = useParams();
  return <div>Post {id}</div>;
};
```

## SSG Static Paths

For prerendered dynamic routes, export `generatePaths`:

```tsx
const Post: PageComponent = () => {
  /* ... */
};

Post.generatePaths = async () => {
  const posts = await fetch('/api/posts').then((r) => r.json());
  return {
    paths: posts.map((post) => ({ params: { id: post.id.toString() } })),
  };
};
```

Only used when `prerender: true` is set in `rasengan.config.js`. Each `params` key must match a dynamic segment in the route path.

## MDX Pages

MDX files in `_routes/` automatically render as pages:

```mdx
---
metadata:
  title: My MDX Page
  description: Page description
toc: true
---

# My MDX Page

Content here with **markdown** and <CustomComponent /> support.
```

Custom MDX components are configured via `mdx-components.{js,ts,jsx,tsx}` at the project root:

```tsx
import { defineMDXConfig } from '@rasenganjs/mdx';

export default defineMDXConfig({
  components: {
    h1: ({ children }) => <h1 className="text-3xl">{children}</h1>,
    code: ({ children }) => <code className="bg-gray-100 p-1">{children}</code>,
  },
  toc: (items) => <nav>{/* custom TOC */}</nav>,
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

## Error Boundaries

The framework wraps each route with an `ErrorBoundary`. In development, it shows stack traces. In production, it shows a generic "Application Error" message.

Custom error UI per route is not yet supported — the built-in `ErrorBoundary` component is used automatically.

## 404 / Not Found

### Config-based routing

Pass a `notFoundComponent` to `defineRouter`:

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

The catch-all `*` route is automatically added by `generateRoutes()`. A default `NotFoundPageComponent` is used if no custom not-found component is provided.

## Navigation Between Pages

Use Rasengan's re-exported components from `react-router`:

```tsx
import { Link, NavLink, useNavigate, useLocation } from 'rasengan';

// Standard link
<Link to="/about">About</Link>

// Link with active class
<NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
  About
</NavLink>

// Hash anchor (renders as <a>, not react-router Link)
<Link to="#section">Section</Link>

// Programmatic navigation
const navigate = useNavigate();
navigate('/about');

// Scroll restoration (renders null, manages scroll position)
import { ScrollRestoration } from 'rasengan';
<ScrollRestoration alwaysToTop />

// Scroll restoration scoped to a scrollable container
<ScrollRestoration target={containerRef} />
```

## Anti-patterns

| Don't ❌                                                      | Do ✅                                                                             |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Forgetting to set `.path` on page/layout components           | Always set `.path` as a static property on the component for Config-based routing |
| Using `React.FC` type for pages/layouts                       | Use `PageComponent` / `LayoutComponent` from `rasengan`                           |
| Putting metadata only in the component body                   | Use static `.metadata` property so the framework can read it at build time        |
| Importing directly from `react-router`                        | Import routing APIs from `rasengan` (they re-export react-router)                 |
| Rendering `<Outlet>` outside layouts                          | Only `<Outlet />` in layout components that wrap child routes                     |
| Defining loaders as exported functions but not attaching them | Attach loader as a static `.loader` property on the component                     |
| Nesting pages too deep in `_routes/`                          | Keep the route tree shallow — each directory level adds a path segment            |
| Forgetting to set `type: 'module'` in package.json            | Rasengan is ESM-only, all packages require `"type": "module"`                     |
| Using `navigate()` outside of route components                | Only use navigation hooks within components rendered by a router                  |
