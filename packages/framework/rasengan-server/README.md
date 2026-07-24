# @rasenganjs/server

**Rasengan Server** — modular backend framework built on [`@rasenganjs/runtime`](https://github.com/rasengan-dev/rasenganjs/tree/main/packages/platform/rasengan-runtime).

| Package              | npm                                                                                                                     | Changelog                      |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `@rasenganjs/server` | [![npm version](https://img.shields.io/npm/v/@rasenganjs/server.svg)](https://www.npmjs.com/package/@rasenganjs/server) | [CHANGELOG.md](./CHANGELOG.md) |

---

## Features

- **Controller-based routing** — group related routes into classes with shared middleware.
- **Module system** — prefix-scoped modules with middleware, DI providers, and nested imports.
- **Dependency injection** — lightweight container with auto-wiring via constructor parameter names.
- **Three-layer middleware** — global, module, controller, and route-level middleware in a predictable execution order.
- **Auto-detected adapters** — Node.js, Bun, and Cloudflare Workers. No config needed for dev mode.
- **Production build** — esbuild-powered bundler (single-file or directory output).
- **CLI** — `dev` (hot-reload via tsx watch) and `build` commands.

---

## Installation

```bash
npm install @rasenganjs/server @rasenganjs/runtime-node
# or
pnpm add @rasenganjs/server @rasenganjs/runtime-node
# or
bun add @rasenganjs/server @rasenganjs/runtime-node
```

> **Note:** `@rasenganjs/runtime-node` is required at runtime. For Bun, install
> `@rasenganjs/runtime-bun`; for Cloudflare Workers, `@rasenganjs/runtime-workerd`.

---

## Quick Start

Create a server entry file (`src/main.ts`):

```ts
import { bootstrap, defineModule } from '@rasenganjs/server';
import HelloController from './hello.controller.js';

bootstrap((app) => {
  app.registerModule(
    defineModule({
      controllers: [HelloController],
    })
  );
});
```

Define a controller (`src/hello.controller.ts`):

```ts
import { Controller, type Router } from '@rasenganjs/server';

export class HelloController extends Controller {
  routes(router: Router): void {
    router.get('/hello', (ctx) => {
      return new Response('Hello, world!');
    });
  }
}
```

Run the dev server:

```bash
npx rasengan-server dev
```

---

## CLI

```
rasengan-server <command> [options]
```

### Commands

| Command | Description                                     |
| ------- | ----------------------------------------------- |
| `dev`   | Start the development server with file watching |
| `build` | Bundle the server for production                |

### Options

| Option                | Default       | Description                               |
| --------------------- | ------------- | ----------------------------------------- |
| `--port, -p <number>` | `3000`        | Port number                               |
| `--host <address>`    | `0.0.0.0`     | Host address                              |
| `--entry, -e <path>`  | `src/main.ts` | Entry file                                |
| `--preset <name>`     | auto          | Runtime preset (`node`, `bun`, `workerd`) |
| `--watch-dir <path>`  | `src/`        | Directory to watch for changes (dev)      |

---

## Configuration

Create a `rasengan.server.ts` in your project root:

```ts
import { defineConfig } from '@rasenganjs/server';

export default defineConfig({
  entry: 'src/main.ts',
  port: 4000,
  host: '0.0.0.0',
  preset: 'node', // 'node' | 'bun' | 'workerd'
  watchDir: 'src/', // or ['src/', 'shared/']
  build: {
    outDir: 'dist',
    minify: true,
    formats: ['single-file', 'directory'],
  },
});
```

---

## Architecture

### Layers

```
HTTP Request
  │
  ├─ 1. Global Middleware (logger, CORS, body parser)
  ├─ 2. Module-level Middleware
  ├─ 3. Controller-level Middleware
  ├─ 4. Route-level Middleware
  └─ 5. Route Handler  →  Response
```

### Core Abstractions

| Class / Function | File                 | Purpose                                      |
| ---------------- | -------------------- | -------------------------------------------- |
| `ServerApp`      | `server/app.ts`      | Orchestrator — modules, middleware, DI       |
| `Router`         | `router/index.ts`    | Route registration with middleware overloads |
| `Controller`     | `controller/base.ts` | Abstract class for route groups              |
| `Container`      | `di/container.ts`    | Dependency injection container               |
| `defineModule`   | `server/module.ts`   | Module configuration helper                  |
| `defineConfig`   | `config/index.ts`    | Server configuration helper                  |
| `bootstrap`      | `bootstrap.ts`       | Programmatic entry point                     |

---

## Programmatic Usage

### ServerApp

```ts
import { ServerApp } from '@rasenganjs/server';

const app = new ServerApp();

app.registerModule(myModule);
app.use(logger({ log: serverLogger }));
app.enableCors({ origin: '*' });
app.configureBodyParser({ json: { limit: '1mb' } });
app.onError(async (error, ctx) => {
  return new Response(error.message, { status: 500 });
});
app.notFound(async (ctx) => {
  return new Response('Custom 404', { status: 404 });
});

const runtime = app.compile();
```

### Router

Method signatures with middleware overloads:

```ts
router.get(path, handler);
router.get(path, middleware, handler);
router.get(path, [middleware1, middleware2], handler);
```

Same overloads for `post`, `put`, `patch`, `delete`.

### Controller

```ts
import { Controller, type Router } from '@rasenganjs/server';

export class UsersController extends Controller {
  middlewares = [auth];  // controller-level middleware

  routes(router: Router): void {
    router.get('/users', this.list);
    router.post('/users', [validate], this.create);
  }

  private list(ctx: Context): Response | Promise<Response> { ... }
  private create(ctx: Context): Response | Promise<Response> { ... }
}
```

### Module

```ts
import { defineModule } from '@rasenganjs/server';

export default defineModule({
  prefix: '/api/v1',
  middlewares: [rateLimiter],
  controllers: [UsersController, PostsController],
  providers: [UsersService, PostsService],
  imports: [adminModule],
});
```

### Dependency Injection

```ts
import { Controller, Container, Provider } from '@rasenganjs/server';

class LoggerService extends Provider {
  log(msg: string) {
    console.log(msg);
  }
}

class UsersService extends Provider {
  constructor(private logger: LoggerService) {}
  // logger is auto-wired via constructor parameter name
}

// Or with explicit deps:
container.register({
  provide: UsersService,
  deps: [LoggerService],
});
```

---

## Production Build

```bash
rasengan-server build
```

Output formats:

- **single-file** — `dist/server.bundle.mjs` (bundled)
- **directory** — `dist/server/` (one `.mjs` per source file, with `package.json` and `start.json`)

Deploy the `dist/` folder to your server and run:

```bash
node dist/server.bundle.mjs
```

---

## Adapters

Adapters are auto-detected in dev mode:

| Runtime | Detection              | Package                       |
| ------- | ---------------------- | ----------------------------- |
| Node.js | default fallback       | `@rasenganjs/runtime-node`    |
| Bun     | `process.versions.bun` | `@rasenganjs/runtime-bun`     |
| workerd | `--preset workerd`     | `@rasenganjs/runtime-workerd` |

---

## Scripts

| Command                  | Description     |
| ------------------------ | --------------- |
| `pnpm run build`         | Build with tsup |
| `pnpm test`              | Run vitest      |
| `pnpm run test:watch`    | Watch mode      |
| `pnpm run test:coverage` | With coverage   |
| `pnpm run pack`          | Create tarball  |

---

## License

MIT © Rasengan
