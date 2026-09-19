# RFC 0015 - OpenAPI Documentation, Futon-Native First (`@rasenganjs/openapi`)

**Status:** Draft
**Author:** Rasengan.js Core Team
**Date:** 2026-09-19

## Executive Summary

OpenAPI 3.1 generation + Scalar/Swagger docs UI exists today only as `@byakugan/openapi`, a package private to the Byakugan monorepo, built specifically against `@rasenganjs/server`'s DI/Module system (`OpenApiModule.forRoot()`, an `OpenApiRegistry extends Provider`, a `DocsController extends Controller`). It has zero Byakugan-specific code — same "extractable later" shape Byakugan's own `CLAUDE.md` already documents for it, mirroring the `packages/db` → `@rasenganjs/drizzle` precedent (RFC-0006, RFC-0004 §13 on the Byakugan side).

This RFC extracts it into `@rasenganjs/openapi`, designed Futon-first: a framework-agnostic root package (registry + document generation + docs UI, no `@rasenganjs/server` dependency at all) with two thin adapter subpaths — `@rasenganjs/openapi/futon` (no DI, no Module, usable in any Futon app) and `@rasenganjs/openapi/server` (the `OpenApiModule.forRoot()` DX Byakugan already has, rebuilt on top of the Futon-native core). This is the same "one core, two thin wrappers" shape RFC-0014 used to generalize `@rasenganjs/drizzle` from Server-only to Futon-first.

A second, independent improvement falls out of doing this now rather than earlier: the current package's registry is a **process-wide singleton** (`module-state.ts`'s `__setActiveConfig`, throws if `OpenApiModule.forRoot()` runs twice) — a workaround for the same `useValue`-lifecycle gap RFC-0006 hit and RFC-0012 later fixed. That gap is closed. `@rasenganjs/openapi`'s registry becomes a plain, instantiable class with no global state at all; `OpenApiModule.forRoot()` on the Server adapter registers it via `{ provide: OpenApiRegistry, useValue: registry }` directly, which is now guaranteed to resolve — a `useValue` entry is eagerly resolved by `ServerApp.compile()`'s existing pass regardless of lifecycle tracking (RFC-0003), and this registry has no resource to clean up on `onDestroy()` in the first place, so it never needed `Provider` inheritance to begin with.

## Motivation

Byakugan's `packages/openapi` (`docs/rfcs`'s own trail: mounted via `OpenApiModule.forRoot({...})` in `apps/api/src/modules/docs/docs.module.ts`, every controller registers through `DocumentedRouter`) works well, but it can only ever be used inside a Rasengan Server app, for two independent reasons:

1. **`OpenApiRegistry extends Provider`, `OpenApiModule.forRoot()` returns a `ModuleConfig`, `DocsController extends Controller`.** All three types exist only in `@rasenganjs/server`. A Futon app (no Server, no DI, no Module) has no supported way to generate an OpenAPI document from its routes at all, even though nothing about "walk a list of registered routes + Zod schemas and emit an OpenAPI 3.1 document" actually needs a DI container.
2. **`DocumentedRouter`'s call convention is Server's `Router`, not Futon's.** Server's `Router.get(path, middlewares, handler, schema)` (an explicit-array simplification the package already imposes over Server's own richer overload set) has no Futon equivalent — Futon's `Router.get(pattern, handler)` takes no middleware array and no schema argument at all (middleware is attached via `.use()`/`.group()` ahead of route registration instead).

Beyond the Futon gap, the package also carries a real, working, but unnecessary constraint: `module-state.ts` stores the active registry as process-level mutable state and throws on a second `OpenApiModule.forRoot()` call in the same process. This was the same shape of workaround RFC-0006 chose for `DataSource` — "keep it as module-level state instead of a `useValue` provider" — because `useValue` providers didn't get lifecycle hooks at the time. RFC-0006 flagged that workaround explicitly as something that "shouldn't quietly calcify into 'just how the package works' once the actual constraint is gone." RFC-0012 closed that gap in `@rasenganjs/server`'s container (merged, `352c49a fix(server): fire lifecycle hooks for Provider-instance useValue providers`). An OpenAPI registry owns no closable resource, so it does not even need the lifecycle half of that fix — it only needed `useValue` itself to be viable, which RFC-0012's eager-resolution guarantee (already true since RFC-0003, unaffected by the lifecycle-tracking bug it fixed) already provided. There is no remaining reason for this package to use a global singleton instead of plain instances.

## Goals

- A framework-agnostic root package, `@rasenganjs/openapi`: `OpenApiRegistry` (plain class, `new OpenApiRegistry(options)`, no `@rasenganjs/server`/`@rasenganjs/futon` dependency), `DocumentInfo`/`SecurityScheme` types, `scalarHtml()`/`swaggerHtml()`, and a shared internal `buildRouteConfig()` used by both adapters below.
- **Multiple independent registries in one process, for free.** Since `OpenApiRegistry` is a plain instance, nothing stops two Futon apps (or two `OpenApiModule.forRoot()` calls) coexisting in the same process, each with its own document. No more "second `forRoot()` throws."
- `@rasenganjs/openapi/futon`: `DocumentedRouter` wrapping `@rasenganjs/futon`'s `Router` (`get(path, handler, doc)` / `get(path, handler, schema, doc)`, matching Futon's own 2-arg `Router.get`), and `mountOpenApiDocs(target, registry, options)` — a plain function mounting `/openapi.json` + Scalar + Swagger UI onto anything shaped `{ get(path, handler): void }`. No DI, no Module, no Controller.
- `@rasenganjs/openapi/server`: `OpenApiModule.forRoot()` preserving Byakugan's exact current DX (`imports: [OpenApiModule.forRoot({...})]`, inject `OpenApiRegistry` by constructor-param name from any module, `DocumentedRouter` with the existing explicit-`middlewares[]` + `SchemaDefinition` + `RouteDoc` convention) — reimplemented on top of the Futon-native core, `mountOpenApiDocs()` reused as-is for `DocsController.routes()` since Server's `Router` also satisfies `{ get(path, handler): void }`.
- `OpenApiModule.forRoot()` built entirely on `{ provide: OpenApiRegistry, useValue: registry }` plus a closure-captured `DocsController` class (no injected config, no module-level `getActiveConfig()`/`__setActiveConfig` at all).
- One `buildRouteConfig()` (schema + `RouteDoc` → `zod-to-openapi` `RouteConfig`) shared by both `DocumentedRouter` variants — this logic exists exactly once, not reimplemented per adapter.

## Non-goals

- Runtime request validation. This package only ever _describes_ routes for documentation. Validating a request body against a schema is `@rasenganjs/validators`' job on the Server path; on the pure-Futon path there is no validation layer here at all — an app that wants one composes `@rasenganjs/validators`' middleware itself, independently of this package.
- Documenting non-Zod schemas richly. `SchemaDefinition.body`/`params`/`query` can hold any `SchemaAdapter`-compatible schema per `@rasenganjs/validators`' adapter model (Zod, Valibot, ArkType, …), but `zod-to-openapi` only understands Zod. A documented route whose schema isn't a Zod schema is skipped from the generated document's request/response detail (route still appears, with a warning) rather than failing the build — see Risks.
- Auto-migrating Byakugan or any other consumer. This RFC ships the package only. Byakugan's own `apps/api` switching its `packages/openapi` import to the published `@rasenganjs/openapi/server` is a separate, mechanical follow-up — same relationship RFC-0004 §13 had to RFC-0006 on the Byakugan side.
- GraphQL, gRPC, or any non-REST API description format.
- Changing `@rasenganjs/validators`' `SchemaDefinition` shape, or anything inside `@rasenganjs/server`'s `Router`/DI container itself. This RFC depends on RFC-0012 (already merged) and RFC-0003 (already merged), it does not touch either.

## Proposed API

### Futon, no DI, no Module

```ts
// app.ts
import { Futon } from '@rasenganjs/futon';
import { OpenApiRegistry } from '@rasenganjs/openapi';
import { DocumentedRouter, mountOpenApiDocs } from '@rasenganjs/openapi/futon';
import { Router } from '@rasenganjs/futon';
import { z } from 'zod';

const app = new Futon();
const router = new Router();

const registry = new OpenApiRegistry({
  info: { title: 'Widgets API', version: '1.0.0' },
  securitySchemes: { session: { type: 'apiKey', in: 'cookie', name: 'sid' } },
});

const docs = new DocumentedRouter(router, registry);

docs.get(
  '/widgets/:id',
  async (ctx) => Response.json({ id: ctx.params.id }),
  { params: z.object({ id: z.string() }) },
  {
    summary: 'Get a widget',
    tags: ['widgets'],
    responses: { 200: { description: 'OK' } },
  }
);

mountOpenApiDocs(app, registry, {}); // /openapi.json, /docs, /docs/swagger
app.use(router.middleware());
```

### Rasengan Server — identical DX to Byakugan's internal package today

```ts
// modules/docs/docs.module.ts
import { OpenApiModule } from '@rasenganjs/openapi/server';

export const docsModule = OpenApiModule.forRoot({
  prefix: '/api/v1',
  info: { title: 'Widgets API', version: '1.0.0' },
  securitySchemes: { session: { type: 'apiKey', in: 'cookie', name: 'sid' } },
});
```

```ts
// modules/widget/widget.controller.ts — unchanged from the Byakugan pattern
import { Controller, type Router } from '@rasenganjs/server';
import { OpenApiRegistry, DocumentedRouter } from '@rasenganjs/openapi/server';

export class WidgetController extends Controller {
  constructor(private readonly openApiRegistry: OpenApiRegistry) {
    super();
  }

  routes(router: Router): void {
    const docs = new DocumentedRouter(router, this.openApiRegistry);
    docs.get(
      '/widgets/:id',
      [],
      this.get,
      { params: IdSchema },
      {
        summary: 'Get a widget',
        tags: ['widgets'],
        responses: { 200: { description: 'OK' } },
      }
    );
  }

  private get: RouteHandler = async (ctx) =>
    Response.json({ id: ctx.params.id });
}
```

Two `OpenApiModule.forRoot()` calls in the same process (two separate `bootstrap()`s in a test file, for example) now both work, each producing its own independent document — previously the second call threw.

## Detailed Design

### Package layout

Three entry points map onto three `src/` subfolders — `core/` (framework-agnostic, no peer dep on either `@rasenganjs/futon` or `@rasenganjs/server`), `futon/`, `server/`. Each subpath's tsup entry is a one-line barrel at the top of `src/`, so `exports` in `package.json` stays flat while the implementation stays grouped by which layer it belongs to — nothing framework-agnostic sits next to something Server-only:

```
packages/ecosystem/openapi/
└── src/
    ├── index.ts                  # "." entry — re-exports core/
    ├── futon.ts                  # "./futon" entry — re-exports futon/
    ├── server.ts                 # "./server" entry — re-exports server/
    ├── core/
    │   ├── registry.ts           # OpenApiRegistry — plain class
    │   ├── route-config.ts       # NEW — buildRouteConfig(), shared by both adapters
    │   ├── scalar.ts
    │   ├── swagger.ts
    │   └── html-escape.ts
    ├── futon/
    │   ├── documented-router.ts  # DocumentedRouter (Futon Router flavor)
    │   └── mount-docs.ts         # mountOpenApiDocs()
    ├── server/
    │   ├── module.ts             # OpenApiModule.forRoot()
    │   └── documented-router.ts  # DocumentedRouter (Server Router flavor)
    └── __tests__/
        ├── core/
        │   ├── registry.test.ts
        │   └── route-config.test.ts
        ├── futon.test.ts
        └── server.test.ts
```

Nothing in `core/` imports from `futon/` or `server/`; `server/` imports from both `core/` and `futon/` (it reuses `futon/mount-docs.ts` verbatim for `DocsController`, per Detailed Design below) — imports only ever point inward/sideways-then-inward, never back out to a sibling that would create a cycle.

`package.json` follows `@rasenganjs/drizzle`'s exact `exports` convention (RFC-0014):

```json
{
  "name": "@rasenganjs/openapi",
  "exports": {
    ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
    "./futon": { "types": "./dist/futon.d.ts", "import": "./dist/futon.js" },
    "./server": { "types": "./dist/server.d.ts", "import": "./dist/server.js" }
  },
  "peerDependencies": {
    "@rasenganjs/futon": "workspace:*",
    "@rasenganjs/server": "workspace:*",
    "@rasenganjs/validators": "workspace:*",
    "zod": "^3.24.0"
  },
  "peerDependenciesMeta": {
    "@rasenganjs/futon": { "optional": true },
    "@rasenganjs/server": { "optional": true },
    "@rasenganjs/validators": { "optional": true }
  },
  "dependencies": {
    "@asteasolutions/zod-to-openapi": "^7.3.0",
    "openapi3-ts": "^4.4.0"
  }
}
```

`zod` stays a peer, never a direct dependency — `core/registry.ts`'s `extendZodWithOpenApi(z)` call must patch the exact same `zod` module instance the consuming app's own schemas are built from, or `.openapi()` silently won't exist on them. Same caveat the current Byakugan code already documents inline; carried over unchanged.

### `core/registry.ts` — the process-wide singleton removed

```ts
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { OpenAPIRegistry as InternalRegistry } from '@asteasolutions/zod-to-openapi';
import type { OpenAPIObject } from 'openapi3-ts/oas31';
import { z } from 'zod';
import type { RouteConfig } from './route-config.js';

extendZodWithOpenApi(z);

export interface OpenApiRegistryOptions {
  info: DocumentInfo;
  securitySchemes?: Record<string, SecurityScheme>;
  basePath?: string;
}

/**
 * Plain, instantiable class — no `Provider`, no module-level state.
 * Each instance owns its own route table and document; nothing here
 * is shared across instances, so multiple registries can coexist in
 * one process without conflict.
 */
export class OpenApiRegistry {
  private readonly internal: InternalRegistry;

  constructor(private readonly options: OpenApiRegistryOptions) {
    this.internal = new InternalRegistry();
    for (const [name, scheme] of Object.entries(
      options.securitySchemes ?? {}
    )) {
      this.internal.registerComponent('securitySchemes', name, scheme);
    }
  }

  registerRoute(route: RouteConfig): void {
    this.internal.registerPath({
      ...route,
      path: this.options.basePath + route.path,
    });
  }

  generateDocument(): OpenAPIObject {
    return new OpenApiGeneratorV31(this.internal.definitions).generateDocument(
      this.options.info
    );
  }
}
```

This is a direct, mechanical rewrite of the current `registry.ts` — the _behavior_ (patch zod once, register routes, generate a v3.1 document) is unchanged, only the storage moves from `module-state.ts`'s global to `this`.

### `core/route-config.ts` — extracted, shared logic

The current package's `route.ts` builds a `RouteConfig` (method/path/summary/tags/security/request/responses) inline inside `DocumentedRouter.register()`. That construction has nothing to do with which `Router` it came from — it only needs `(method, path, schema, doc)`. Pulled out as a pure function, living in `core/` since it depends on neither `Router` flavor:

```ts
export function buildRouteConfig(
  method: HttpMethod,
  path: string,
  schema:
    { body?: ZodTypeAny; params?: ZodTypeAny; query?: ZodTypeAny } | undefined,
  doc: RouteDoc
): RouteConfig {
  return {
    method,
    path,
    summary: doc.summary,
    description: doc.description,
    tags: doc.tags,
    security: doc.security,
    request: schema
      ? {
          body: schema.body
            ? { content: { 'application/json': { schema: schema.body } } }
            : undefined,
          params: schema.params,
          query: schema.query,
        }
      : undefined,
    responses: Object.fromEntries(
      Object.entries(doc.responses).map(([status, r]) => [
        status,
        {
          description: r.description,
          content: r.schema
            ? { 'application/json': { schema: r.schema } }
            : undefined,
        },
      ])
    ),
  };
}
```

Both `futon/documented-router.ts`'s and `server/documented-router.ts`'s `DocumentedRouter` call this directly. This mirrors RFC-0014's `connection.ts`: one piece of logic, two thin call sites, instead of the same construction duplicated per adapter and risking drift the next time either one changes.

### `futon/documented-router.ts`

```ts
import type { Middleware, Router as FutonRouter } from '@rasenganjs/futon';
import { OpenApiRegistry } from '../core/registry.js';
import {
  buildRouteConfig,
  type RouteDoc,
  type HttpMethod,
} from '../core/route-config.js';

export class DocumentedRouter {
  constructor(
    private readonly router: FutonRouter,
    private readonly registry: OpenApiRegistry
  ) {}

  get(
    path: string,
    handler: (ctx: Context) => Promise<Response>,
    doc: RouteDoc
  ): void;
  get(
    path: string,
    handler: (ctx: Context) => Promise<Response>,
    schema: RouteSchema,
    doc: RouteDoc
  ): void;
  get(path: string, handler: any, schemaOrDoc: any, maybeDoc?: RouteDoc): void {
    this.register('get', path, handler, schemaOrDoc, maybeDoc);
  }
  // post/put/patch/delete: identical shape

  private register(
    method: HttpMethod,
    path: string,
    handler: any,
    schemaOrDoc: any,
    maybeDoc?: RouteDoc
  ): void {
    const schema = maybeDoc ? schemaOrDoc : undefined;
    const doc = maybeDoc ?? schemaOrDoc;
    this.router[method](path, handler);
    this.registry.registerRoute(buildRouteConfig(method, path, schema, doc));
  }
}
```

### `futon/mount-docs.ts`

```ts
import { json, html } from '@rasenganjs/futon';
import { OpenApiRegistry } from '../core/registry.js';
import { scalarHtml } from '../core/scalar.js';
import { swaggerHtml } from '../core/swagger.js';

export interface MountOptions {
  prefix?: string;
  specPath?: string; // default "/openapi.json"
  scalarUiPath?: string; // default "/docs"
  swaggerUiPath?: string; // default "/docs/swagger"
}

/**
 * Mounts spec + both docs UIs onto anything shaped `{ get(path, handler): void }`
 * — a Futon `Router`, a Futon `Futon` app instance directly, or (since the shape
 * is structural, not nominal) a Rasengan Server `Router` too. `server/module.ts`
 * reuses this verbatim for `DocsController.routes()` rather than re-implementing it.
 */
export function mountOpenApiDocs(
  target: { get(path: string, handler: (ctx: any) => Promise<Response>): void },
  registry: OpenApiRegistry,
  options: MountOptions = {}
): void {
  const specPath = options.specPath ?? '/openapi.json';
  const scalarUiPath = options.scalarUiPath ?? '/docs';
  const swaggerUiPath = options.swaggerUiPath ?? '/docs/swagger';
  const prefix = options.prefix ?? '';

  target.get(specPath, async () => json(registry.generateDocument()));
  target.get(scalarUiPath, async () =>
    html(scalarHtml({ specUrl: prefix + specPath, title: registry.title }))
  );
  target.get(swaggerUiPath, async () =>
    html(swaggerHtml({ specUrl: prefix + specPath, title: registry.title }))
  );
}
```

`OpenApiRegistry` gains a small `get title()` accessor (reads `options.info.title`) purely so `mountOpenApiDocs()` doesn't need a separate `DocumentInfo` parameter — the registry already knows its own title.

### `server/module.ts`

```ts
import {
  Controller,
  defineModule,
  type Router as ServerRouter,
  type ModuleConfig,
} from '@rasenganjs/server';
import {
  OpenApiRegistry,
  type OpenApiRegistryOptions,
} from '../core/registry.js';
import { mountOpenApiDocs, type MountOptions } from '../futon/mount-docs.js';

export interface OpenApiModuleOptions
  extends OpenApiRegistryOptions, MountOptions {
  global?: boolean; // default true, same as today
}

export class OpenApiModule {
  static forRoot(opts: OpenApiModuleOptions): ModuleConfig {
    const registry = new OpenApiRegistry(opts);

    class DocsController extends Controller {
      routes(router: ServerRouter): void {
        mountOpenApiDocs(router, registry, opts); // Server's Router satisfies the same {get(path,handler)} shape
      }
    }

    return defineModule({
      name: 'OpenApiModule',
      prefix: opts.prefix ?? '',
      controllers: [DocsController],
      providers: [{ provide: OpenApiRegistry, useValue: registry }],
      exports: [OpenApiRegistry],
      global: opts.global ?? true,
    });
  }
}
```

### `server/documented-router.ts`

```ts
import type { Middleware } from '@rasenganjs/futon';
import type { Router as ServerRouter, RouteHandler } from '@rasenganjs/server';
import type { SchemaDefinition } from '@rasenganjs/validators';
import { OpenApiRegistry } from '../core/registry.js';
import {
  buildRouteConfig,
  type RouteDoc,
  type HttpMethod,
} from '../core/route-config.js';

/**
 * Same explicit-`middlewares[]` convention the Byakugan-internal package
 * already shipped — simpler than replicating `Router`'s own six-overload
 * arg-sniffing for what only two documented shapes actually need.
 */
export class DocumentedRouter {
  constructor(
    private readonly router: ServerRouter,
    private readonly registry: OpenApiRegistry
  ) {}

  get(
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<any>,
    doc: RouteDoc
  ): void;
  get(
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<any>,
    schema: SchemaDefinition,
    doc: RouteDoc
  ): void;
  get(
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<any>,
    schemaOrDoc: any,
    doc?: RouteDoc
  ): void {
    this.register('get', path, middlewares, handler, schemaOrDoc, doc);
  }
  // post/put/patch/delete: identical shape

  private register(
    method: HttpMethod,
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<any>,
    schemaOrDoc: any,
    maybeDoc?: RouteDoc
  ): void {
    const schema = maybeDoc ? schemaOrDoc : undefined;
    const doc = maybeDoc ?? schemaOrDoc;
    const call = this.router[method].bind(this.router) as (
      ...args: unknown[]
    ) => void;
    if (schema) call(path, middlewares, handler, schema);
    else call(path, middlewares, handler);
    this.registry.registerRoute(buildRouteConfig(method, path, schema, doc));
  }
}
```

No `module-state.ts`, no `getActiveConfig()`/`__setActiveConfig()`, no "second `forRoot()` throws" — `registry` and `DocsController` are plain closure variables scoped to one `forRoot()` call. `{ provide: OpenApiRegistry, useValue: registry }` resolves correctly precisely because `ServerApp.compile()` eagerly resolves every declared provider (RFC-0003) independent of the `lifecycleInstances` tracking RFC-0012 fixed — this package simply never needed that tracking, since `OpenApiRegistry` holds no resource an `onDestroy()` would need to close.

## Alternatives considered

- **Keep `OpenApiRegistry` as a `Provider` subclass**, relying on RFC-0012's lifecycle fix for correctness. Rejected: the registry has nothing to clean up, so `Provider` inheritance buys nothing and would put a `@rasenganjs/server` import in the framework-agnostic root package — the one thing this RFC is explicitly trying to avoid.
- **Two separate packages** (`@rasenganjs/openapi` for Futon, `@rasenganjs/server-openapi` for Server) instead of one package with `./futon`/`./server` subpath exports. Rejected for the same reason RFC-0014 rejected it for `@rasenganjs/drizzle`: `buildRouteConfig()` and `registry.ts` must exist exactly once, and a second package would either duplicate that logic or take on a whole-package runtime dependency for two functions.
- **Keep a global singleton but scope it by a caller-supplied key**, instead of removing it. Rejected: this only exists to work around a constraint (`useValue` unusable) that RFC-0012 already closed. A keyed-singleton design would be solving a problem that no longer exists, at the cost of a new concept (tokens) nothing else in this package needs.
- **Merge `mountOpenApiDocs()`'s Futon and Server code paths into `DocsController` doing its own thing**, instead of `DocsController.routes()` calling the shared Futon-authored function. Rejected: Server's `Router.get(path, handler)` already structurally satisfies `{ get(path, handler): void }` — there is nothing Server-specific to add, so a second implementation would be a verbatim duplicate.

## Risks & failure modes

- **Zod instance mismatch.** `extendZodWithOpenApi(z)` patches whatever `zod` module this package resolves to at import time. If pnpm/npm hoisting gives the consuming app a _different_ `zod` instance than the one `@rasenganjs/openapi` imported, schemas built in the app silently lack `.openapi()` and generate a bare/untyped OpenAPI schema instead of erroring. Same risk the current Byakugan package already carries — `zod` stays a `peerDependency`, documented loudly in the README, not something this RFC can eliminate structurally.
- **Two `forRoot()` calls in one process is now supported, not rejected.** Any existing test (in Byakugan or elsewhere) asserting the old "second `forRoot()` throws" behavior needs updating when a consumer migrates — this is an intentional, documented behavior change, not a regression, but it is a breaking change relative to the current package's contract.
- **Non-Zod schema on a documented route.** `SchemaDefinition.body` can validly hold a Valibot/ArkType schema per `@rasenganjs/validators`' adapter model; `buildRouteConfig()` cannot introspect those the way it does Zod's `.openapi()`. `generateDocument()` degrades to an empty/untyped `content` block for that route rather than throwing, logged once via `console.warn` the first time it happens — needs to be called out explicitly in the README's limitations section, not just left as silent degradation.
- **`mountOpenApiDocs()`'s structural target type accepts near-misses.** Anything with a matching `get(path, handler)` method shape is accepted, including a hand-rolled test stub that doesn't actually dispatch requests. Acceptable for a mount-only helper (it is not a validation boundary), but worth a type-level comment so it isn't mistaken for a stronger guarantee.

## Out of scope

- Migrating Byakugan's `apps/api` off `packages/openapi` onto the published package — separate, mechanical follow-up once this ships (mirrors RFC-0004 §13's relationship to RFC-0006).
- Any change to `@rasenganjs/validators`, `@rasenganjs/server`'s DI container, or Futon's `Router` — this RFC is a pure consumer of all three as they exist today, post-RFC-0012/RFC-0003.
- Request/response runtime validation of any kind.
- A CLI for standalone OpenAPI generation outside a running app (e.g., `rasengan-openapi generate` at build time). Worth a future RFC if a static-generation use case shows up; not needed for either the Futon or Server DX above.

## Delivery phases

1. Root package (`registry.ts` rewritten off `Provider`/module-singleton onto a plain class, `route-config.ts` extracted, `scalar.ts`/`swagger.ts`/`html-escape.ts` ported near-verbatim). Unit tests for `OpenApiRegistry` (including two independent instances in one test file, proving no shared state) and `buildRouteConfig()`.
2. `@rasenganjs/openapi/futon`: `DocumentedRouter` + `mountOpenApiDocs()`, tested against a real `Futon` instance end to end (`app.fetch()` against `/openapi.json`, `/docs`, `/docs/swagger`).
3. `@rasenganjs/openapi/server`: `OpenApiModule.forRoot()` + `DocumentedRouter`, tested against a real `ServerApp`/DI container, including the double-`forRoot()`-in-one-process case and by-name injection of `OpenApiRegistry` from an unrelated module.
4. Docs + examples under `apps/playground`/`apps/examples` — a Futon-only example and a Server example, matching RFC-0014's own precedent.
5. Publish.
6. (Separate, out of scope for this RFC's delivery) Byakugan's `apps/api` migrates its `packages/openapi` import to `@rasenganjs/openapi/server`.

## Verification (for the eventual implementation PR)

- `registry.ts`: `registerRoute()` + `generateDocument()` produce the same document shape the current Byakugan package produces for an equivalent input; two `OpenApiRegistry` instances in the same test file never observe each other's routes.
- `route-config.ts`: schema-present and schema-absent cases both produce the expected `RouteConfig`, matching the current `route.ts` test's assertions.
- `futon.ts`: `DocumentedRouter` registers on the real Futon `Router` and captures the route into the registry; `mountOpenApiDocs()` served through a real `app.fetch()` returns a valid document at `/openapi.json` and renders both UIs.
- `server.ts`: `OpenApiModule.forRoot()` wires `OpenApiRegistry` as an injectable provider resolvable by constructor-param name from an unrelated module (matching RFC-0003's by-name contract); a second `forRoot()` call in the same process succeeds and produces an independent document; `DocumentedRouter` on the Server `Router` produces the same captured `RouteConfig` as the Futon variant for equivalent input.
- Workspace typecheck clean, full test suite green for `@rasenganjs/openapi`.
