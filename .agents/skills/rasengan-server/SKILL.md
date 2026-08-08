# Rasengan Server — Architecture & Reference

## 1. Layer Stack

```
@rasenganjs/server              ← bootstrap(), ServerApp, modules, controllers, providers, DI
       ⏐  compiles down to
@rasenganjs/runtime             ← Application, Context, middleware pipeline, fetch()
       ⏐  served by
@rasenganjs/runtime-node        │  NodeDevAdapter / NodeProdAdapter
│  @rasenganjs/runtime-bun      │  BunDevAdapter / BunProdAdapter
│  @rasenganjs/runtime-workerd  │  WorkerdProdAdapter
```

## 2. Bootstrap

Entry point. Takes a callback that receives a `ServerApp` instance.

```ts
import { bootstrap } from '@rasenganjs/server';

bootstrap(
  (app) => {
    app.registerModule(AppModule);
    app.enableCors();
  },
  { port: 3000 }
);
```

**Signature:**

```ts
bootstrap(
  callback: (app: ServerApp) => void | Promise<void>,
  options?: BootstrapOptions
): Promise<ServerHandle>;
```

**`BootstrapOptions`:**

```ts
interface BootstrapOptions {
  port?: number;
  host?: string;
  preset?: 'node' | 'bun' | 'workerd'; // production preset, set by CLI
  production?: boolean;
}
```

**`ServerHandle`:**

```ts
interface ServerHandle {
  close(): void;
  app: ServerApp;
}
```

## 3. ServerApp

The high-level API exposed inside the bootstrap callback. Wraps `Application` from `@rasenganjs/runtime`.

```ts
interface ServerApp {
  // Module registration
  registerModule(module: Module): void;

  // Middleware (forwarded to Application)
  use(middleware: MiddlewareHandler): void;
  onError(handler: ErrorHandler): void;
  notFound(handler: NotFoundHandler): void;

  // Convenience
  enableCors(options?: CorsOptions): void;
  enableStatic(options?: StaticOptions): void;

  // Access the underlying runtime Application (for advanced use)
  readonly runtime: Application;
}
```

## 4. Runtime detection

**Dev mode (auto-detect):**

`bootstrap()` inspects the running runtime and picks the corresponding dev adapter:

| Runtime                       | Adapter selected |
| ----------------------------- | ---------------- |
| `process.versions.bun` exists | `BunDevAdapter`  |
| Default (Node.js)             | `NodeDevAdapter` |

Workerd has **no dev adapter** — use `wrangler dev` / `miniflare` instead.

**Production mode (explicit via CLI):**

The Rasengan CLI builds the app with a preset:

```bash
rasengan build --preset=bun       # bundle uses BunProdAdapter
rasengan build --preset=node      # bundle uses NodeProdAdapter
rasengan build --preset=workerd   # bundle uses WorkerdProdAdapter
```

The preset is embedded in the build output. When the built app runs, `bootstrap()` reads it from the preset option or environment, ignoring runtime detection.

Users can also pass `preset` directly to override:

```ts
bootstrap(callback, { preset: 'workerd', production: true });
```

## 5. The 3 core concepts

```txt
Controller    ← routes + handlers (plain class, no decorators)
Provider      ← plain class, injected by constructor
Module        ← groups controllers + providers, defines prefix
```

### 5.1 Provider

Plain class. No decorators, no metadata, no magic.

```ts
// user.service.ts
export class UserService {
  async findAll() {
    return [{ id: 1, name: 'Dilane' }];
  }

  async findById(id: string) {
    return { id, name: 'Dilane' };
  }
}
```

### 5.2 Controller

Plain class with a `routes(router)` method. No inheritance.

```ts
// user.controller.ts
export class UserController {
  constructor(private users: UserService) {}

  routes(router) {
    router.get('/', this.findAll);
    router.get('/:id', this.findOne);
    router.post('/', this.create);
  }

  findAll = async (ctx) => ctx.json(await this.users.findAll());

  findOne = async (ctx) => ctx.json(await this.users.findById(ctx.params.id));

  create = async (ctx) => {
    const body = await ctx.request.json();
    return ctx.json(body, { status: 201 });
  };
}
```

### 5.3 Router

The `router` argument passed to `routes()`:

```ts
interface Router {
  get(path: string, handler: RouteHandler): void;
  post(path: string, handler: RouteHandler): void;
  put(path: string, handler: RouteHandler): void;
  delete(path: string, handler: RouteHandler): void;
  patch(path: string, handler: RouteHandler): void;
}
```

`RouteHandler` receives a `Context` and returns a `Response` (or `void` in which case the framework resolves automatically):

```ts
type RouteHandler = (ctx: Context) => Response | Promise<Response>;
```

### 5.4 Context

Shared from `@rasenganjs/runtime`, extended with helpers.

```ts
interface Context {
  // Raw primitives
  request: Request;
  params: Record<string, string>;
  runtime: { adapter: RuntimeAdapter; app: Application };

  // Response helpers
  json(data: unknown, init?: ResponseInit): Response;
  text(value: string, init?: ResponseInit): Response;
  html(value: string, init?: ResponseInit): Response;
  redirect(url: string, status?: number): Response;
}
```

### 5.5 Module

Groups controllers and providers with an optional URL prefix.

```ts
// user.module.ts
import { defineModule } from '@rasenganjs/server';

export default defineModule({
  prefix: '/users',
  controllers: [UserController],
  providers: [UserService],
});
```

Root module imports sub-modules:

```ts
// app.module.ts
export default defineModule({
  imports: [UserModule, AuthModule],
});
```

`defineModule()` is a typed helper — no runtime magic:

```ts
interface ModuleConfig {
  prefix?: string;
  imports?: (ModuleConfig | (() => ModuleConfig))[];
  controllers?: (new (...args: any[]) => any)[];
  providers?: (new (...args: any[]) => any)[];
}

function defineModule(config: ModuleConfig): ModuleConfig {
  return config; // pure identity, just for type inference
}
```

## 6. Dependency Injection

Simple container built at bootstrap time. No decorators, no `reflect-metadata`, no compiler tricks.

**Provider graph resolution:**

1. Collect all `providers` from all modules (flattened)
2. Build a dependency graph by inspecting constructor parameter types
3. Instantiate in dependency order
4. Inject into controller constructors

```ts
container = new Container();
container.register(UserService);
container.register(DatabaseService);

// Controller instantiation:
new UserController(container.resolve(UserService));
```

**Parameter type resolution** (constructor injection):

The container reads `constructor.toString()` to extract parameter names, or uses an explicit registry if the user provides one:

```ts
defineModule({
  providers: [
    UserService,
    { provide: DatabaseService, useClass: DatabaseService },
    { provide: 'DB_CONFIG', useValue: { url: '...' } },
  ],
});
```

This keeps DI simple and explicit while supporting tokens and values when needed.

## 7. Data flow

### Bootstrap sequence

```
bootstrap(callback, options)
  ├── Create ServerApp (wraps Application from @rasenganjs/runtime)
  ├── Execute callback(app)
  │     ├── app.registerModule(AppModule)
  │     │     ├── Flatten imports
  │     │     ├── Collect providers → build DI container
  │     │     ├── Collect controllers → instantiate with resolved providers
  │     │     ├── Call controller.routes(router)
  │     │     │     └── router.get/post/put/delete → app.get/post/put/delete
  │     │     └── Apply optional prefix to all routes
  │     ├── app.enableCors()
  │     │     └── app.use(corsMiddleware())
  │     └── app.use(middleware)... etc
  ├── Detect runtime adapter
  │     ├── Dev mode: auto-detect (BunDevAdapter | NodeDevAdapter)
  │     └── Production: use options.preset
  ├── adapter.serve(app.runtime)
  └── Return ServerHandle { close, app }
```

### Request lifecycle

```
HTTP Request
  → adapter (Bun.serve / http.createServer / self.addEventListener)
  → app.fetch(request)
    → middleware pipeline (logger, bodyParser, cors, ...)
    → route matching → controller method
    → ctx.params populated, ctx.request available
    → handler returns Response (via ctx helpers or raw)
  → Response back to client
```

## 8. What's built vs what needs building

| Package                       | Status                                                                                                                      |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `@rasenganjs/runtime`         | ✅ Built — `Application`, `Context`, middleware pipeline                                                                    |
| `@rasenganjs/runtime-node`    | ✅ Built — `NodeDevAdapter`, `NodeProdAdapter`                                                                              |
| `@rasenganjs/runtime-bun`     | ✅ Built — `BunDevAdapter`, `BunProdAdapter`                                                                                |
| `@rasenganjs/runtime-workerd` | ✅ Built — `WorkerdProdAdapter`                                                                                             |
| `@rasenganjs/server`          | ❌ Needs build — `bootstrap()`, `ServerApp`, `defineModule()`, DI container, `Router`, `Context` helpers, adapter detection |

## 9. Reuse path

| Concern                              | Reuses                                                                 |
| ------------------------------------ | ---------------------------------------------------------------------- |
| Route matching, params, body parsing | `@rasenganjs/runtime` — `Application`, `Context`, `bodyParser()`       |
| Middleware pipeline                  | `@rasenganjs/runtime` — `app.use()`, `app.onError()`, `app.notFound()` |
| HTTP serving                         | Auto-detected or preset-selected adapter                               |
| File watching + auto-restart         | Adapter's built-in `watch` + `autoRestart`                             |
| Static assets                        | `adapter.assets.get()` / `.load()`                                     |
