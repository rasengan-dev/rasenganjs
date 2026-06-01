# Rasengan.js — AI Agent Codebase Guide

## 1. Project Overview

**Rasengan.js** is a modern React meta-framework built on top of **Vite** and **react-router**. It provides SSR, SSG, SPA modes, file-system routing, config-based routing, MDX support, and an adapter system for deployment (Vercel, Node).

- **Author:** Dilane Kombou (dilane3)
- **License:** MIT
- **Homepage:** https://rasengan.dev
- **Repo:** https://github.com/rasengan-dev/rasenganjs.git
- **Node requirement:** >=22.12.0
- **Package manager:** pnpm (v10.9.0)

---

## 2. Monorepo Structure (pnpm workspace)

```
rasenganjs/
  packages/
    rasengan/              # Core framework (routing, SSR, SSG, CLI, Vite plugin, server)
    create-rasengan/       # CLI scaffolding tool (`npx create-rasengan`)
    rasengan-shuriken/     # Template cloning CLI (`npx shuriken`)
    rasengan-kurama/       # Lightweight Zustand-like state management
    rasengan-mdx/          # MDX plugin & components for Rasengan
    rasengan-serve/        # Production Express server for built apps
    rasengan-vercel/       # Vercel deployment adapter
    rasengan-i18n/         # Internationalization library
    rasengan-image/        # Optimized Image component (lazy, blur/wave placeholder)
    rasengan-theme/        # Light/dark/system theme management
    rasengan-kage-demo/    # Interactive feature tour / onboarding library
  docs/                    # The rasengan.dev documentation site (itself a Rasengan app)
  playground/              # Example/test projects
  examples/                # shadcn example
  scripts/                 # Build, pack, release, CI scripts
```

---

## 3. Core Package: `rasengan` (v1.2.1)

### 3.1 Entry Points (exports)

| Path                    | Purpose                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `rasengan`              | Main: routing utilities + `defineConfig`                                                                           |
| `rasengan/client`       | Client entry: `renderApp()`                                                                                        |
| `rasengan/server`       | Server entry: `createRequestHandler`, `resolveBuildOptions`, `detectRuntime`, re-exports `express` + `compression` |
| `rasengan/plugin`       | Vite plugin: `rasengan()`, `Adapters`, `plugins[]`                                                                 |
| `rasengan/dynamic`      | Code-splitting: `dynamicLoad()`, `lazyLoadPage()`                                                                  |
| `rasengan/types/client` | Ambient types for `.mdx`, `.md`, virtual modules                                                                   |

### 3.2 CLI (`rasengan` command, via `bin.js`)

Uses **Commander**. Two commands:

- **`dev`** — Starts Vite dev server with Express middleware (HMR, SSR, port 5320 by default)
- **`build`** — Runs Vite build (client + SSR + optional SSG), writes `config.json`

### 3.3 Vite Plugin System

The main plugin `rasengan()` (in `src/core/plugins/index.ts`) orchestrates the entire build lifecycle:

| Plugin                     | Virtual Module                | Purpose                                                                                        |
| -------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------- |
| `rasengan()`               | —                             | Main build plugin: loads config, writes `config.json`, handles prerender/SSG, triggers adapter |
| `loadRasenganGlobal()`     | —                             | Injects `Rasengan` global constant (version, ssr flag)                                         |
| `rasenganConfigPlugin()`   | `virtual:rasengan-config`     | Exposes partial config (server + redirects) at runtime                                         |
| `flatRoutesPlugin()`       | `virtual:rasengan/router`     | Generates Router from `import.meta.glob` on `_routes/`                                         |
| `buildOutputInformation()` | `virtual:rasengan/build-info` | Provides `resolveBuildOptions()` at build time                                                 |
| `fixCPathPlugin()`         | —                             | Fixes Windows C: drive path resolution                                                         |

The `plugins[]` array at the bottom of the file provides the default plugin set (excluding `rasenganConfigPlugin` and `buildOutputInformation` which are used in `vite.config.ts`).

### 3.4 Configuration (`rasengan.config.js`)

Users define their config using `defineConfig()` which returns an `AppConfig`:

```ts
interface AppConfig {
  ssr?: boolean; // default: true
  prerender?: boolean | { routes: string[] }; // SSG mode
  sageMode?: { reactCompiler?: boolean | { compilationMode: 'annotation' } };
  server?: { development?: { port?: number; open?: boolean } };
  vite?: ViteConfig; // partial Vite config overrides
  redirects?: () => Promise<Redirect[]>;
}
```

The `vite.config.ts` shipped with the package calls `createDefaultViteConfig()` to construct a full Vite `UserConfig` with three build environments: **client**, **ssr**, **ssg**.

### 3.5 Routing System

#### Two modes:

**A) File-based routing** (`flatRoutes()` in `src/routing/utils/flat-routes.tsx`)

- Place `.page.tsx`/`.page.mdx` and `layout.tsx` files under `src/app/_routes/`
- `flatRoutesPlugin()` creates a virtual module that calls `flatRoutes()` with `import.meta.glob`
- `flatRoutes()` builds a route tree from file paths:
  - `[param]` → dynamic segment (`:param`)
  - `[_param]` → optional dynamic segment (`:param?`)
  - `(group)` → route group (ignored in path)
  - `_optional` → optional static segment
  - `layout.tsx` → layout component
  - `*.page.tsx` → page component
- Returns a `RouterComponent` instance

**B) Config-based routing** (via `defineRouter()` / `defineRoutesGroup()`)

- Programmatic route definition using `RouterProps`

#### The `RouterComponent` class (`src/routing/interfaces.tsx`)

Central routing class with getters/setters for:

- `layout` — Layout component
- `routers` — Nested sub-routers (RouterComponent[])
- `pages` — Page components or RouteNodes
- `loaderComponent` — Loading fallback
- `notFoundComponent` — 404 component
- `useParentLayout` — Whether to inherit parent layout

#### Route generation (`generateRoutes()` in `src/routing/utils/generate-routes.tsx`)

Converts `RouterComponent` → react-router `RouteObject[]`:

- Wraps layouts with `MetadataProvider` (root layout only)
- Creates lazy-loaded routes with error boundaries
- Creates loader functions from page/layout `loader` methods
- Merges metadata from page + layout + loader response
- Supports MDX page detection and conversion
- Handles nested routers (respects `useParentLayout`)
- Adds catch-all `*` route for 404

#### Metadata system

- Pages and layouts export `metadata` (title, description, Open Graph, Twitter, links, metaTags)
- Server-side: `HeadComponent` in `TemplateLayout` generates `<meta>` tags via `generateMetadata()`
- Client-side: `MetadataProvider` intercepts route changes, injects `[data-rg]` tags, removes stale ones

#### SSG static paths (`defineStaticPaths()`)

- Pages can export `generatePaths()` returning `{ paths: Array<{ params }> }`
- `getAllRoutesPath()` recursively extracts all route paths, resolving dynamic segments

### 3.6 Server-Side Rendering

**Development** (`src/server/dev/server.ts`):

- Express server with Vite middleware
- Creates `createStaticHandler` from routes, queries it, renders via `render()` (streaming or string)
- `TemplateLayout` produces full HTML with `<head>`, `<body>`, scripts, and SSR content

**Production** (`src/server/node/index.tsx`):

- `createRequestHandler()` loads production build artifacts, reads `manifest.json`, handles requests
- Supports document requests (full HTML) and data requests (JSON from loaders, `.data` suffix or `application/json` Accept header)
- Redirects from config or loader functions

**SSG** (`preRenderApp()`):

- Loads server build, generates all routes via `getAllRoutesPath()`
- Renders each route to static HTML files in `static/`
- Supports dynamic routes via `generatePaths()`
- Generates 404.html for catch-all routes

### 3.7 Client-Side Hydration (`renderApp()` in `src/entries/client/render.tsx`)

1. Resolves `AppRouter` (RouterComponent from virtual module or import)
2. Generates routes and preloads matching lazy routes
3. Creates `createBrowserRouter` with hydration data from SSR
4. In SPA mode: `createRoot()` fresh render
5. In SSR mode: `hydrateRoot()` to attach to server-rendered markup

### 3.8 Build Output (`config.json`)

After build, written to `dist/client/assets/config.json`:

```json
{ "buildOptions": {...}, "ssr": true/false, "prerender": true/false, "redirects": [...] }
```

### 3.9 Adapter System

The `rasengan()` plugin accepts `adapter?: AdapterConfig`. After build, `detectRuntime()` checks the environment. If non-local (e.g., Vercel), it calls `adapter.prepare()`.

```ts
interface AdapterConfig {
  name: Adapter; // 'vercel' | ''
  prepare: () => Promise<void>;
}
```

### 3.10 Key Utilities

| Function                       | Location                                | Purpose                                               |
| ------------------------------ | --------------------------------------- | ----------------------------------------------------- |
| `dynamicLoad(loader)`          | `src/core/dynamic/index.tsx`            | Wraps lazy component with Suspense                    |
| `lazyLoadPage(path)`           | `src/core/dynamic/index.tsx`            | Lazy loads page by glob pattern                       |
| `resolvePath(path)`            | `src/core/config/utils/path.ts`         | OS-aware path→URL normalization                       |
| `loadModuleSSR(path)`          | `src/core/config/utils/load-modules.ts` | SSR dynamic import with extension resolution          |
| `createVirtualModule(name)`    | `src/server/virtual/index.ts`           | Creates virtual module id/resolvedId                  |
| `renderToStream(element, res)` | `src/server/node/rendering.ts`          | Renders React to pipeable stream                      |
| `renderToString(element)`      | `src/server/node/rendering.ts`          | Renders React to HTML string                          |
| `createDefaultViteConfig()`    | `src/core/config/vite/defaults.ts`      | Full Vite UserConfig with client/ssr/ssg environments |
| `detectRuntime()`              | `src/server/runtime/detect-runtime.ts`  | Detects `vercel`/`netlify`/`local`/`unknown`          |

### 3.11 React Components (shipped with core)

| Component               | File                              | Purpose                                                              |
| ----------------------- | --------------------------------- | -------------------------------------------------------------------- |
| `RootComponent`         | `routing/components/template.tsx` | App root — renders Router or SSR children                            |
| `HeadComponent`         | `routing/components/template.tsx` | `<head>` with meta, assets, title                                    |
| `BodyComponent`         | `routing/components/template.tsx` | `<body>` with root div and noscript                                  |
| `ScriptComponent`       | `routing/components/template.tsx` | Fragment wrapper for scripts                                         |
| `DefaultLayout`         | `routing/components/template.tsx` | `<Outlet />` wrapper                                                 |
| `ErrorBoundary`         | `routing/components/index.tsx`    | Dev/prod error UI                                                    |
| `RasenganPageComponent` | `routing/components/index.tsx`    | Page wrapper with loader data + params                               |
| `NotFoundPageComponent` | `routing/components/index.tsx`    | Simple 404 UI                                                        |
| `CustomLink`            | `routing/components/index.tsx`    | Extended `<a>` for hash anchors, falls back to react-router `<Link>` |
| `ScrollRestoration`     | `routing/components/index.tsx`    | Scroll position management per pathname                              |
| `HydrationFallback`     | `routing/components/fallback.tsx` | "Loading page..." fallback                                           |
| `MetadataProvider`      | `routing/providers/metadata.tsx`  | Client-side metadata injection on route change                       |
| `TemplateLayout`        | `entries/server/index.tsx`        | Full HTML document shell                                             |

---

## 4. Sub-Packages

### 4.1 `@rasenganjs/create-rasengan` (v1.4.1)

Scaffolding CLI (`npx create-rasengan`). Interactive prompts for language (TS/JS), template (blank/tailwind v3/v4), routing mode (file/config-based).

**Template structure:** `templates/<routing-mode>/<template-name>[-v<version>]-<lang-code>/`

Special modes: `--with-shadcn` and `--chidori` clone from external GitHub repos via sparse checkout.

Key files:

- `src/main.ts` — CLI entry (Commander + consola prompts)
- `src/constants/index.ts` — Templates, Languages, Versions, GitHub URLs
- `src/scripts/template.ts` — External template cloning (simple-git, sparse checkout)
- `templates/config-based/` and `templates/file-based/` — Starter templates

### 4.2 `@rasenganjs/shuriken` (v1.0.1)

Template cloning CLI (`npx shuriken clone <key> [name]`). Clones project templates from `rasenganjs-examples` repo using sparse git checkout.

Key module: `scripts/template.ts` — `createProjectFromTemplate()` function:

1. Sparse-clones `rasenganjs-examples` repo
2. Reads `meta.json` to map template key → path
3. Copies template files via `ncp`
4. Updates `package.json` name
5. Initializes git repo with initial commit

### 4.3 `@rasenganjs/kurama` (v1.0.1)

Zustand-inspired state management. Exports:

- `createStore` (aliased `create`) — Creates store hook using `useSyncExternalStore`
- `middleware.logger` — State change logging
- `middleware.persist({ name, storage })` — localStorage/sessionStorage persistence
- `middleware.compose(...middlewares)` — Middleware composition

### 4.4 `@rasenganjs/mdx` (v1.2.1)

MDX integration. Provides:

- **Vite plugin** (`plugin.ts`) — Transforms `.mdx`/`.md` files using `@mdx-js/rollup`, extracts frontmatter via `gray-matter`, generates `MDXWrapper` objects
- **Components:** `MDXRenderer`, `Markdown`, `TableOfContents`, `CodeBlock`/`CodeBlock2` (Prism), `Heading` (auto-anchored), `Icons`
- **Hooks:** `useActiveTocItem` — IntersectionObserver scroll tracking
- **Utils:** `extractTOC()`, `markToHtml()`, `defineMDXConfig()`

The `MDXWrapper` objects (with metadata, TOC, content, renderer) are consumed by the core `rasengan` package and converted into `PageComponent` instances.

### 4.5 `@rasenganjs/serve` (v1.2.1)

Production Express server (`rasengan-serve` CLI). Serves built apps:

- Compression (`compression`)
- Request logging (`morgan`)
- Static file serving with caching
- Reads `config.json` for SSR vs SPA mode
- SSR: delegates to `createRequestHandler` from `rasengan/server`
- SPA: serves `spa-fallback.html` or `index.html`

### 4.6 `@rasenganjs/vercel` (v1.1.3)

Vercel adapter. `configure()` returns `{ name: Adapters.VERCEL, prepare: async () => {...} }`.

When `prepare()` runs:

1. Loads Rasengan config from build output
2. Generates `.vercel/output/` directory (Build Output API v3)
3. Copies static assets
4. For SSR: generates serverless function with `.vc-config.json` (Node.js 22.x), handler wrapping Express + Rasengan request handler, `package.json`, runs `npm install`

### 4.7 `@rasenganjs/i18n` (v1.0.0-beta.3)

Internationalization. Exports:

- `RasenganI18nProvider` — Context provider, reads locale from route params (`useParams`)
- `useLocale` — Get/set locale, updates URL path
- `useTranslations` — Returns `t(key, options?)` with namespace support
- **Vite plugin** — Virtual module `virtual:rasengan/i18n` auto-loading translation JSON files via `import.meta.glob`

### 4.8 `@rasenganjs/image` (v1.1.3)

Optimized Image component:

- `LazyImage` (default export) — Lazy loading via `IntersectionObserver`
- `LoadingFallback` — Blur/wave placeholder animations
- Props: `src`, `alt`, `width`, `height`, `loading`, `mode`, `loadingOnViewport`, `fallbackSrc`

### 4.9 `@rasenganjs/theme` (v1.0.1)

Theme management:

- `Provider` — Context provider, persists to `localStorage` (key: `rasengan-theme`), detects OS scheme via `prefers-color-scheme`
- `useTheme` — Returns `{ theme, actualTheme, isDark, setTheme }`
- `Themes` — Constants: `{ dark, light, system }`

### 4.10 `@rasenganjs/kage-demo` (v1.0.1)

Interactive feature tour/onboarding:

- `KageDemo` (default) — Tour UI with overlay + tooltip
- `useKageDemo(steps)` — Manages step state, navigation (`start`, `next`, `prev`, `end`)
- `KageDemoStep` — `{ target: CSS selector, render: (props) => ReactNode }`
- Smart tooltip positioning with `ResizeObserver`

---

## 5. Architecture & Data Flow

### 5.1 Request handling (SSR)

```
HTTP Request
  → Express (dev: Vite middleware / prod: createRequestHandler)
  → createStaticHandler (react-router) processes the request
  → Loader functions execute (page + layout loaders)
  → render() called:
      → Loads App + Template components (from src/ or build output)
      → Uses TemplateLayout → HeadComponent + BodyComponent + ScriptComponent
      → Renders via renderToPipeableStream (or renderToString for SSG)
  → Response sent (HTML stream or static HTML file)
```

### 5.2 Build pipeline

```
rasengan build (CLI)
  → vite.config.ts loads rasengan.config.js
  → createDefaultViteConfig() → UserConfig with 3 environments:
      client, ssr, ssg
  → rasengan() plugin:
      • Injects Rasengan global
      • Generates virtual:rasengan/router (flatRoutes)
      • Writes config.json on closeBundle
      • If prerender: calls preRenderApp() → static HTML files
      • If SPA: renders index.html via renderIndexHTML()
      • Detects runtime → adapter.prepare()
```

### 5.3 Client-side hydration

```
Browser loads HTML (SSR rendered or SPA shell)
  → Client entry (src/index.ts) calls renderApp()
  → Resolves AppRouter (from virtual module or import)
  → generateRoutes() → RouteObject[]
  → preloadMatches() → lazy route modules
  → createBrowserRouter() with hydration data
  → hydrateRoot() or createRoot()
```

---

## 6. Key Types & Interfaces

### AppConfig (`src/core/config/type.ts`)

```ts
interface AppConfig {
  ssr?: boolean;
  prerender?: boolean | { routes: string[] };
  sageMode?: { reactCompiler?: boolean | { compilationMode: 'annotation' } };
  server?: { development?: { port?: number; open?: boolean } };
  vite?: ViteConfig; // Omit<vite.UserConfig, 'plugins'|'environments'|...>
  redirects?: () => Promise<Redirect[]>;
}
```

### Metadata (`src/routing/types.ts`)

```ts
type Metadata = {
  title?: string;
  description?: string;
  openGraph?: { type?; title?; description?; url; image; width?; height? };
  twitter?: {
    card: 'summary_large_image' | 'summary';
    image;
    title;
    description?;
    creator?;
    site?;
  };
  links?: Array<{ rel; type?; sizes?; href }>;
  metaTags?: Array<{ name?; property?; content }>;
};
```

### RouterComponent (`src/routing/interfaces.tsx`)

Class with getters/setters: `layout`, `routers`, `pages`, `loaderComponent`, `notFoundComponent`, `useParentLayout`

### RouteNode (`src/routing/utils/flat-routes.tsx`)

```ts
type RouteNode = {
  path: string;
  segment: string;
  fullPath: string;
  isLayout?: boolean;
  module?: () => Promise<Module>;
  component?: FunctionComponent;
  metadata?: Metadata;
  children?: RouteNode[];
  source?: string;
};
```

### LoaderFunction (`src/routing/types.ts`)

```ts
type LoaderFunction = ({
  params,
  request,
}) => Promise<{ props?; redirect?; meta?; source? } | Response>;
```

---

## 7. Project Conventions

### Required project files (default paths):

- `rasengan.config.js` — Framework configuration
- `src/main.{jsx,tsx}` — Root App component (default export)
- `src/template.{jsx,tsx}` — HTML template component (receives `Head`, `Body`, `Script` props)
- `src/app/app.router.{js,ts}` — Router definition (exports a `RouterComponent`)
- `src/app/_routes/` — File-based route definitions (`layout.tsx`, `*.page.tsx`)

### Build output:

```
dist/
  client/        # Client bundle + manifest.json
    assets/      # JS, CSS, config.json, template.js
    .vite/       # Vite manifest
  server/        # SSR server bundle (entry.server.js, main.js, template.js, app.router.js)
  prerender/     # SSG server bundle (if prerendering)
static/          # Pre-rendered HTML files (if prerendering)
.vercel/output/  # Vercel deployment output (if Vercel adapter)
```

---

## 8. Scripts (`/scripts/`)

| Script         | Command               | Purpose                                                               |
| -------------- | --------------------- | --------------------------------------------------------------------- |
| `build.ts`     | `pnpm run build`      | Builds all packages via `pnpm -r --filter="./packages/*" run build`   |
| `pack.ts`      | `pnpm run pack`       | Creates tarballs for all packages                                     |
| `release.ts`   | `pnpm run release`    | Orchestrates release (uses `@vitejs/release-scripts`) for 11 packages |
| `publishCI.ts` | `pnpm run ci-publish` | CI publish script (uses `@vitejs/release-scripts` publish())          |

Release tag conventions: `v${version}` for `rasengan`, `${pkg}@${version}` for sub-packages.

---

## 9. Common Patterns & Gotchas

- **ESM-only:** All packages use `"type": "module"` in package.json
- **`__dirname` shim:** `create-rasengan` uses `import.meta.url` → `fileURLToPath` → `dirname` for ES module `__dirname`
- **Virtual modules:** Used extensively via `createVirtualModule()` pattern with `\0` prefix for resolved IDs
- **Lazy loading:** Routes use `lazy()` from react-router for code splitting; `preloadMatches()` eagerly loads matching routes before hydration
- **MDX detection:** Pages with `type: 'MDXPageComponent'` are converted via `convertMDXPageToPageComponent()`
- **Windows C: path fix:** `fixCPathPlugin()` in the plugin system handles `C:\` drive paths
- **Package manager**: pnpm is required (enforced by `preinstall` script with `only-allow pnpm`)

---

## 10. CI/CD (GitHub Actions)

| Workflow                    | Trigger                                     | Purpose                                                                       |
| --------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------- |
| `publish.yml`               | Tags `v*`, `create-rasengan*`, `rasengan-*` | Builds + publishes to npm (dual tokens: MAIN_NPM_TOKEN / SECONDARY_NPM_TOKEN) |
| `release-tag.yml`           | Same tag patterns                           | Creates GitHub Release (skips alpha tags)                                     |
| `greetings.yml`             | First PR/issue                              | Welcome comment                                                               |
| `semantic-pull-request.yml` | PR events                                   | Validates conventional commit PR titles                                       |

---

## 11. Development Workflow

```bash
git clone https://github.com/rasengan-dev/rasenganjs.git
cd rasenganjs
pnpm install
pnpm run build  # Builds all packages
```

To test changes in a playground:

```bash
cd playground/rasengan-v1-test
pnpm run dev   # Links workspace packages automatically
```

Package linking handled by pnpm workspace — no need for `npm link`.
