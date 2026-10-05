# @rasenganjs/openapi

OpenAPI 3.1 document generation + Scalar/Swagger docs UI, Futon-native
first. `OpenApiRegistry` is a plain, instantiable class — no DI, no
Module, multiple independent registries can coexist in the same process.
A thin Rasengan Server adapter (`@rasenganjs/openapi/server`) builds
`OpenApiModule.forRoot()` + DI-injected `OpenApiRegistry` on top of it.

## Installation

```bash
pnpm add @rasenganjs/openapi zod
```

`zod` is a peer dependency and must resolve to the same instance your
app's schemas are built from — see "Known limitations" below.

## Futon, no DI, no Module

```ts
import { Futon, Router } from '@rasenganjs/futon';
import { OpenApiRegistry } from '@rasenganjs/openapi';
import { DocumentedRouter, mountOpenApiDocs } from '@rasenganjs/openapi/futon';
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

## Rasengan Server

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
// modules/widget/widget.controller.ts
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

Calling `OpenApiModule.forRoot()` more than once in the same process
(two separate `bootstrap()`s in a test file, for example) is supported —
each call produces its own independent `OpenApiRegistry` and its own
docs routes.

## Route metadata

Beyond `summary`, `description`, `tags`, `security` and `responses`, a
`RouteDoc` takes:

- `operationId`: a unique, stable name for the operation (docs anchors,
  client generators);
- `deprecated`;
- `bodyExample`, and `example` on each response: emitted as the
  `application/json` media type's `example`, next to its schema;
- any `x-*` key, copied onto the operation as written. Other unknown keys
  never reach the document.

```ts
docs.post('/widgets', [], this.create, createWidgetSchema, {
  summary: 'Create a widget',
  operationId: 'create-widget',
  'x-internal': false,
  bodyExample: { name: 'Gear' },
  responses: {
    201: { description: 'Created', schema: WidgetSchema, example: { id: 'wdg_1', name: 'Gear' } },
  },
});
```

## Package layout

Three entry points, one per `src/` subfolder:

- `.` (`core/`) — framework-agnostic: `OpenApiRegistry`, `buildRouteConfig()`,
  `scalarHtml()`/`swaggerHtml()`. No dependency on `@rasenganjs/futon` or
  `@rasenganjs/server`.
- `./futon` — `DocumentedRouter` wrapping Futon's `Router`, and
  `mountOpenApiDocs()` — mounts spec + both UIs onto anything shaped
  `{ get(path, handler): void }`.
- `./server` — `OpenApiModule.forRoot()` + a `DocumentedRouter` wrapping
  Rasengan Server's `Router` (explicit `middlewares[]` + `SchemaDefinition`
  - `RouteDoc`). Built entirely on `./futon` and `.` — `server/module.ts`
    reuses `mountOpenApiDocs()` verbatim since Server's `Router` also
    satisfies `{ get(path, handler): void }`.

## Known limitations

- **Zod instance identity.** `extendZodWithOpenApi(z)` patches whichever
  `zod` module this package resolves to at import time. If your package
  manager hoists a second copy of `zod`, schemas built against that copy
  silently lack `.openapi()` and generate an untyped schema instead of
  erroring. Keep `zod` a single, deduplicated dependency in your project.
- **Non-Zod schemas.** `@rasenganjs/validators`' `SchemaDefinition` allows
  non-Zod adapters (Valibot, ArkType, …), but `zod-to-openapi` only
  understands Zod. A documented route whose schema isn't a Zod schema
  still appears in the generated document, with an empty/untyped request
  body instead of a rejected build.
