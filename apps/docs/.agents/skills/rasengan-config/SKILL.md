---
name: rasengan-config
description: Project configuration and rendering mode patterns for Rasengan.js. Covers rasengan.config.js, AppConfig interface, SSR/SSG/SPA modes, CLI commands, build output, Vite overrides, TypeScript setup, environment variables, module aliases, and styling (CSS Modules, Tailwind, preprocessors). Use when configuring a Rasengan.js project or switching rendering strategies.
license: MIT
metadata:
  author: dilane3
  framework: rasengan
  version: '2.0.0'
---

# Rasengan.js Configuration Patterns

## When to Activate

- Creating or editing `rasengan.config.js`
- Switching between SSR, SSG, or SPA rendering modes
- Configuring Vite plugins or overrides
- Setting up TypeScript, environment variables, or module aliases
- Choosing a styling approach (CSS Modules, Tailwind, Sass, Less, Stylus)
- Running CLI commands for dev, build, or deploy

## AppConfig Interface

```ts
interface AppConfig {
  ssr?: boolean; // default: true
  prerender?: boolean | { routes: string[] }; // SSG mode
  sageMode?: { reactCompiler?: boolean | { compilationMode: 'annotation' } };
  server?: { development?: { port?: number; open?: boolean } };
  vite?: ViteConfig; // partial Vite overrides
  redirects?: () => Promise<Redirect[]>; // static redirect rules
}
```

## Rendering Modes

| Mode | Config                | When to Use                                          |
| ---- | --------------------- | ---------------------------------------------------- |
| SSR  | `ssr: true` (default) | Apps needing SEO, fast initial load, dynamic content |
| SPA  | `ssr: false`          | Dashboards, admin panels, authenticated apps         |
| SSG  | `prerender: true`     | Content sites: docs, blogs, marketing pages          |

## Sage Mode (React Compiler)

```ts
// Auto-memoize all components (requires React Compiler Babel plugin)
sageMode: {
  reactCompiler: true;
}

// Only memoize components with "use memo" directive
sageMode: {
  reactCompiler: {
    compilationMode: 'annotation';
  }
}
```

## CLI Commands

```bash
rasengan dev          # Start dev server on port 5320
rasengan build        # Build for production
rasengan-serve ./dist # Serve production build
npx create-rasengan@latest  # Scaffold a new project
```

## Build Output

```
dist/
  client/        # Client bundle + manifest.json
    assets/      # JS, CSS, config.json
    .vite/       # Vite manifest
  server/        # SSR server bundle
static/          # Pre-rendered HTML (SSG)
```

## Vite Config Overrides

```ts
export default defineConfig({
  vite: {
    plugins: [mdx()],
    resolve: {
      alias: { '@': '/src' },
    },
  },
});
```

## Styling

| Approach      | Config                                                    |
| ------------- | --------------------------------------------------------- |
| CSS Modules   | Built-in (`.module.css` files work out of the box)        |
| Tailwind CSS  | Install `tailwindcss`, add to Vite plugins                |
| Preprocessors | Sass (`.scss`), Less (`.less`), Stylus (`.styl`) via Vite |

## TypeScript & Module Aliases

```ts
// rasengan.config.js
export default defineConfig({
  vite: {
    resolve: {
      alias: { '@': '/src' },
    },
  },
});
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

## Environment Variables

- Prefix with `RASENGAN_` for client-side exposure
- Access via `import.meta.env.RASENGAN_*`

## Rules

- Use `ssr: true` by default — disable only for fully client-rendered SPAs
- Use `prerender: true` for static content sites (docs, blogs, marketing)
- Use `prerender: { routes: [...] }` to specify exact routes for partial SSG
- Enable `sageMode.reactCompiler` to reduce re-renders (requires React Compiler plugin)
- Set `server.development.open: true` to auto-open browser on dev start
- Pass partial Vite config — it deep-merges with Rasengan's defaults
- `redirects` is async, evaluated at build time — for static redirect rules
- Styling: CSS Modules work out of the box; Tailwind requires Vite plugin config
- Use `RASENGAN_` prefix for env vars that should be available client-side
- All Rasengan projects require `"type": "module"` in package.json
