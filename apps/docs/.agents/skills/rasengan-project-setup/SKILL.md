---
name: rasengan-project-setup
description: Project setup and scaffolding patterns for Rasengan.js. Covers create-rasengan CLI, manual installation, required project files and directories, TypeScript configuration, and project structure conventions. Use when starting a new Rasengan.js project or understanding the required file structure.
license: MIT
metadata:
  author: dilane3
  framework: rasengan
  version: '1.0.0'
---

# Rasengan.js Project Setup Patterns

## When to Activate

- Scaffolding a new project with `npx create-rasengan@latest`
- Setting up a Rasengan.js project manually
- Understanding the required file structure
- Configuring TypeScript for a Rasengan.js project
- Adding environment variables or module aliases

## Quick Start

```bash
npx create-rasengan@latest
```

Follow the prompts for project name, language (JS/TS), and template.

```bash
cd my-app
npm install
npm run dev
```

## Required Project Files

| File                         | Purpose                                         |
| ---------------------------- | ----------------------------------------------- |
| `rasengan.config.js`         | Framework config via `defineConfig()`           |
| `src/main.{jsx,tsx}`         | Root App component (default export, `AppProps`) |
| `src/template.{jsx,tsx}`     | HTML document shell (`TemplateProps`)           |
| `src/index.{js,ts}`          | Entry point: `renderApp(App, AppRouter?)`       |
| `src/app/app.router.{js,ts}` | Router definition (`RouterComponent`)           |
| `src/app/_routes/`           | File-based route definitions (optional)         |

## Project Structure

```
my-app/
├── public/                  # Static assets (served at /)
├── src/
│   ├── app/
│   │   ├── _routes/         # File-based routes
│   │   ├── app.router.ts    # Router definition
│   │   └── home.page.tsx    # Example page
│   ├── components/          # Reusable UI (optional)
│   ├── assets/              # Images, fonts (optional)
│   ├── styles/              # Global styles (optional)
│   ├── index.ts             # Entry point
│   ├── main.tsx             # Root App component
│   └── template.tsx         # HTML template
├── rasengan.config.js       # Framework config
├── package.json
├── tsconfig.json            # TypeScript config
└── rasengan-env.d.ts        # TypeScript declarations
```

## Manual Installation (TypeScript)

```bash
mkdir my-app && cd my-app
npm init -y
npm install rasengan@latest @rasenganjs/serve@latest react@latest react-dom@latest
npm install --save-dev cross-env vite@latest @types/react @types/react-dom @types/node typescript
```

```json
// package.json
{
  "type": "module",
  "scripts": {
    "dev": "rasengan dev",
    "build": "rasengan build",
    "serve": "rasengan-serve ./dist"
  }
}
```

```js
// rasengan.config.js
import { defineConfig } from 'rasengan';
export default defineConfig({});
```

### Required Source Files

```ts
// src/index.ts
import { renderApp } from 'rasengan/client';
import App from './main';
import AppRouter from '@/app/app.router';

renderApp(App, AppRouter, { reactStrictMode: true });
```

```tsx
// src/main.tsx
import { type AppProps } from 'rasengan';
import AppRouter from '@/app/app.router';

export default function App({ Component, children }: AppProps) {
  return <Component router={AppRouter}>{children}</Component>;
}
```

```tsx
// src/template.tsx
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

```ts
// src/app/app.router.ts
import { RouterComponent, defineRouter } from 'rasengan';
import Home from '@/app/home.page';

class AppRouter extends RouterComponent {}

export default defineRouter({ pages: [Home] })(AppRouter);
```

```tsx
// src/app/home.page.tsx
import { type PageComponent } from 'rasengan';

const Home: PageComponent = () => <main>Home Page</main>;
Home.path = '/';
Home.metadata = { title: 'Home', description: 'Home page' };
export default Home;
```

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "target": "ES2020",
    "moduleResolution": "bundler",
    "module": "ESNext",
    "jsx": "react-jsx",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["src", "rasengan-env.d.ts"],
  "extends": "./node_modules/rasengan/tsconfig.base.json"
}
```

```ts
// rasengan-env.d.ts
/// <reference types="rasengan/types/client" />
```

## Environment Variables

- Prefix with `RASENGAN_` or `VITE_` for client-side exposure
- Access via `import.meta.env.RASENGAN_*` or `process.env.*` in SSR
- Create `.env` and `.env.example` files at project root

## Rules

- Use `npx create-rasengan@latest` for new projects — handles all boilerplate
- Every project requires `"type": "module"` in `package.json` (Rasengan is ESM-only)
- The `src/app/` directory is required — contains pages, layouts, and router
- Module alias `@/` maps to `src/` — configure in both `tsconfig.json` and `rasengan.config.js`
- The `rasengan-env.d.ts` file is required for TypeScript projects to recognize Rasengan types
- Node.js 20.18+ is required
