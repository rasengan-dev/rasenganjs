# @rasenganjs/server — AI Agent Guide

## Package Overview

**@rasenganjs/server** is the backend framework within the Rasengan.js monorepo. It provides a modular, controller-based HTTP server built on top of `@rasenganjs/runtime`.

- **Package:** `@rasenganjs/server`
- **Version:** `1.0.0-beta.0`
- **Entry:** `src/index.ts` (library), `src/cli.ts` (CLI binary)
- **Runtime deps:** `@rasenganjs/runtime` (core), `esbuild` (build)
- **Dev deps:** `@rasenganjs/runtime-node`, `@rasenganjs/runtime-bun`, `@rasenganjs/runtime-workerd` (adapters)
- **Build tool:** tsup (ESM + CJS output, DTS generation)
- **Test framework:** vitest (40 tests, 5 files)

---

## File Structure

```
src/
  index.ts              # Public API barrel
  bootstrap.ts          # `bootstrap()` entry point
  cli.ts                # CLI binary entry
  config/               # RasenganServerConfig, BuildConfig, defineConfig
  controller/           # Controller abstract class
  di/                   # Container, Provider, ProviderDefinition
  router/               # Server Router (wraps runtime Router)
  server/               # ServerApp, ModuleConfig, defineModule
  adapter/              # selectAdapter, AdapterOptions
  logger/               # serverLogger, serverLoggerMinimal
  utils/                # logServerInfo
  cli/                  # dev, build, config loading
  __tests__/            # 5 test files (40 tests)
```

---

## Key Types

### RasenganServerConfig (`src/config/index.ts`)

```ts
interface RasenganServerConfig {
  entry?: string; // default: 'src/main.ts'
  port?: number; // default: 3000
  host?: string; // default: '0.0.0.0'
  preset?: 'node' | 'bun' | 'workerd';
  watchDir?: string | string[];
  build?: BuildConfig;
}
```

### ModuleConfig (`src/server/module.ts`)

```ts
interface ModuleConfig {
  prefix?: string;
  middlewares?: Middleware[];
  imports?: ModuleConfig[];
  controllers?: (new (...args: any[]) => Controller)[];
  providers?: (ProviderLike | ProviderDefinition)[];
}
```

### ServerHandle (`src/server/app.ts`)

```ts
interface ServerHandle {
  close(): void;
  app: ServerApp;
}
```

---

## Architecture & Data Flow

### Middleware Layering

1. **Global middleware** — registered via `serverApp.use()`, `serverApp.enableCors()`, `serverApp.configureBodyParser()`
2. **Module-level middleware** — `ModuleConfig.middlewares`, scoped to module prefix
3. **Controller-level middleware** — `Controller.middlewares`, scoped to controller routes
4. **Route-level middleware** — passed as arguments to `router.get(path, mw, handler)` etc.
5. **Validation middleware** — injected automatically for routes with schemas (after route middleware, before handler)

### Schema validation

- **Per-route schemas** — passed as last argument to `router.get/post/…(path, handler, { body: …, params: … })`
- **Controller-level schemas** — `Controller.schemas` dictionary keyed by method name, matched via `handler.name`
- **Per-route schema overrides controller schema** when both are provided
- **Validation middleware is injected at route-registration time** by the `Router`, using `createValidationMiddleware()` from `@rasenganjs/validation`
- **Default adapter** is `zodAdapter`; override via `app.configureValidation({ adapter: myAdapter })`

### Compilation flow (`ServerApp.compile()`)

```
compile()
  ├── new Application()          // runtime app
  ├── app.use(global middleware)
  ├── app.use(cors) [if enabled]
  ├── app.onError(handler)
  ├── app.notFound(handler)
  ├── flattenModules(modules)    // depth-first import tree
  ├── new Container()
  ├── container.register(providers from all modules)
  └── for each module:
        registerControllers(app, container, mod)
          ├── for each controller:
          │     instance = container.resolve(ctrl)
          │     serverRouter = new Router(cr, validationConfig, instance.schemas)
          │     instance.routes(serverRouter)
          │     // Router injects validation middleware during route registration
          └── nesting:
                runtimeRouter.group(prefix, { middlewares: modMws }, (r) => {
                  r.group({ middlewares: ctrlMws }, (cr) => {
                    instance.routes(new Router(cr, validationConfig, instance.schemas))
                  })
                })
```

### Request handling (runtime)

```
HTTP Request
  → runtime Application handles it
  → global middleware chain
  → module group middleware
  → controller group middleware
  → route-level middleware
  → validation middleware (if schema defined)
  → route handler → Response
```

### Bootstrap flow

```
bootstrap(callback)
  ├── new ServerApp()
  ├── loadConfig()               // rasengan.server.js/ts + CLI overrides
  ├── callback(serverApp)        // user registers modules
  ├── serverApp.compile()        // → Application
  ├── selectAdapter(config)      // auto-detect Node/Bun/workerd
  ├── adapter.serve(app, options)
  ├── onListening → logServerInfo()
  └── returns ServerHandle
```

### CLI flow

```
rasengan-server dev --port 4000
  ├── parseArgs(rawArgs)         // → Partial<RasenganServerConfig>
  ├── loadConfig(overrides)      // merge defaults + file + CLI
  └── dev(config)
        ├── spawn(tsx watch <entry>, { env: { PORT, HOST } })
        └── watch directories for changes

rasengan-server build --preset node
  ├── parseArgs + loadConfig
  └── build(config)
        ├── buildSingleFile      // esbuild bundle → server.bundle.mjs
        └── buildDirectory       // one .mjs per source file
```

---

## Dependency Injection

The `Container` class provides:

- **Registration:** `container.register(MyService)` or `container.register({ provide, useClass, useValue, deps })`
- **Resolution:** `container.resolve(MyService)` — by class identity, class name, or string name
- **Auto-wiring:** constructor parameter names are extracted via `getConstructorParamNames()` (regex-based, strips comments and type annotations)
- **Singleton caching:** instances are cached and reused on subsequent resolves
- **Error messages:** failed name resolution includes a hint and lists available providers

---

## Important Behaviours

- **Route handler must return `Response`** — handlers are wrapped with `Promise.resolve()` to ensure async compatibility.
- **Route-level middleware** is implemented by wrapping the route in a runtime `group({ middlewares }, ...)` block — this applies the middleware only to that single route.
- **Module nesting** — `imports` are flattened depth-first; providers from all modules (including nested) are registered in a single shared container.
- **Config resolution priority:** defaults < file config < CLI overrides.
- **tsx resolution** — for `dev` command, the CLI tries `node_modules/.bin/tsx`, then `node_modules/tsx/dist/cli.mjs`, then `npx tsx`.
- **Validation config** — defaults to `{ adapter: zodAdapter, onError: defaultErrorHandler }`. The adapter can be swapped; see `app.configureValidation()`.
- **Controller schemas** — matched by `handler.name`; arrow functions and bound methods lose their name, so per-route schema arg is required for those.
- **Validation middleware injection** — happens at route registration time, not after. The `Router` creates the middleware immediately using the configured adapter.

---

## Testing

```bash
pnpm test              # vitest run (48 tests)
pnpm run test:watch    # vitest watch
pnpm run test:coverage # with v8 coverage
```

Test files:

| File                             | Tests | What it covers                                                                                                          |
| -------------------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------- |
| `router.test.ts`                 | 12    | Route registration, middleware overloads, all HTTP methods                                                              |
| `controller.test.ts`             | 3     | Default middlewares, override, routes contract                                                                          |
| `container.test.ts`              | 10    | DI register/resolve with class, useClass, useValue, deps, name resolution, errors                                       |
| `module.test.ts`                 | 7     | defineModule/defineConfig with all fields                                                                               |
| `server-app.test.ts`             | 8     | Integration: 3-layer middleware order, prefix, per-level middleware, 404, module factory, multi-controller              |
| `validation-integration.test.ts` | 8     | ServerApp configureValidation, per-route schemas, controller schemas, middleware order, error handlers, schema override |

---

## Build Output

```bash
pnpm run build          # tsup → dist/index.js, dist/cli.js (ESM + CJS + .d.ts)
```

Externals: `@rasenganjs/runtime-node`, `@rasenganjs/runtime-bun`, `@rasenganjs/runtime-workerd`, `esbuild`.

---

## Common Patterns

### Module factory (lazy module config)

```ts
app.registerModule(() => ({
  controllers: [ConfigurableController],
  providers: [{ provide: Config, useValue: loadConfig() }],
}));
```

### Custom error handler returning JSON

```ts
app.onError(async (error, ctx) => {
  return new Response(JSON.stringify({ error: error.message }), {
    status: 500,
    headers: { 'content-type': 'application/json' },
  });
});
```

### Controller with explicit DI deps

```ts
export class UsersController extends Controller {
  constructor(private usersService: UsersService) {}

  routes(router: Router): void {
    router.get('/users', (ctx) => this.usersService.list(ctx));
  }
}
```

### Controller with schema validation (per-route)

```ts
router.post('/users', handler, {
  body: z.object({ name: z.string(), email: z.string().email() }),
  params: z.object({ id: z.string() }),
});
```

### Controller with `schemas` property (method-name matched)

```ts
export class UsersController extends Controller {
  schemas = {
    create: { body: z.object({ name: z.string() }) },
    list: { params: z.object({ page: z.string().optional() }) },
    find: { params: z.object({ id: z.string() }) },
  };

  routes(router: Router): void {
    router.post('/users', this.create);     // uses schemas.create
    router.get('/users', this.list);        // uses schemas.list
    router.get('/users/:id', this.find);    // uses schemas.find
  }

  private async create(ctx: Context) { … }
  private async list(ctx: Context) { … }
  private async find(ctx: Context) { … }
}
```

### Custom validation error handler

```ts
app.configureValidation({
  onError: (errors, ctx) =>
    Response.json({ code: 'VALIDATION_ERROR', errors }, { status: 422 }),
});
```

---

## Gotchas

- **ESM-only** — package uses `"type": "module"`. All relative imports require `.js` extensions.
- **`statSync` import removed** — the `build.ts` file previously imported `statSync` which was unused.
- **Adapter packages** are optional but at least one must be installed (`@rasenganjs/runtime-node` is the default).
- **Bun detection** via `process.versions.bun` string check — wrapped in try/catch for safety.
- **Keypress listener** (`logServerInfo`) uses `stdin.setRawMode(true)` — this changes terminal behaviour and must be cleaned up on exit.
- **Controller schema matching** relies on `handler.name` — class methods work (`this.create`), arrow/anonymous functions do not.
- **Validation middleware is injected at route registration time**, not during compilation. The `Router` creates it immediately using the configured adapter.
- **Default adapter (`zodAdapter`)** requires Zod to be installed. If you use a different schema library, call `app.configureValidation({ adapter: myAdapter })`.
- **`@rasenganjs/validation` is a required dependency** of `@rasenganjs/server` — it is not optional.
