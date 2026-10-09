import type { Context, Router as FutonRouter } from '@rasenganjs/futon';
import type { OpenApiRegistry } from '../core/registry.js';
import {
  buildRouteConfig,
  type HttpMethod,
  type RouteDoc,
  type RouteSchema,
} from '../core/route-config.js';

type Handler = (ctx: Context) => Promise<Response>;

/**
 * Wraps a real Futon `Router` so route registration reads exactly like
 * calling the `Router` directly — `docs.post(path, handler, doc)` — while
 * also capturing each route into an `OpenApiRegistry`. Matches Futon's
 * own 2-arg `Router.get(pattern, handler)` convention: no middleware
 * array (Futon middleware is attached via `.use()`/`.group()` ahead of
 * route registration, not per-call), no schema validation (Futon has
 * none built in — `schema` here is documentation-only).
 */
export class DocumentedRouter {
  constructor(
    private readonly router: FutonRouter,
    private readonly registry: OpenApiRegistry
  ) {}

  get(path: string, handler: Handler, doc: RouteDoc): void;
  get(path: string, handler: Handler, schema: RouteSchema, doc: RouteDoc): void;
  get(
    path: string,
    handler: Handler,
    schemaOrDoc: RouteSchema | RouteDoc,
    doc?: RouteDoc
  ): void {
    this.register('get', path, handler, schemaOrDoc, doc);
  }

  post(path: string, handler: Handler, doc: RouteDoc): void;
  post(
    path: string,
    handler: Handler,
    schema: RouteSchema,
    doc: RouteDoc
  ): void;
  post(
    path: string,
    handler: Handler,
    schemaOrDoc: RouteSchema | RouteDoc,
    doc?: RouteDoc
  ): void {
    this.register('post', path, handler, schemaOrDoc, doc);
  }

  put(path: string, handler: Handler, doc: RouteDoc): void;
  put(path: string, handler: Handler, schema: RouteSchema, doc: RouteDoc): void;
  put(
    path: string,
    handler: Handler,
    schemaOrDoc: RouteSchema | RouteDoc,
    doc?: RouteDoc
  ): void {
    this.register('put', path, handler, schemaOrDoc, doc);
  }

  patch(path: string, handler: Handler, doc: RouteDoc): void;
  patch(
    path: string,
    handler: Handler,
    schema: RouteSchema,
    doc: RouteDoc
  ): void;
  patch(
    path: string,
    handler: Handler,
    schemaOrDoc: RouteSchema | RouteDoc,
    doc?: RouteDoc
  ): void {
    this.register('patch', path, handler, schemaOrDoc, doc);
  }

  delete(path: string, handler: Handler, doc: RouteDoc): void;
  delete(
    path: string,
    handler: Handler,
    schema: RouteSchema,
    doc: RouteDoc
  ): void;
  delete(
    path: string,
    handler: Handler,
    schemaOrDoc: RouteSchema | RouteDoc,
    doc?: RouteDoc
  ): void {
    this.register('delete', path, handler, schemaOrDoc, doc);
  }

  private register(
    method: HttpMethod,
    path: string,
    handler: Handler,
    schemaOrDoc: RouteSchema | RouteDoc,
    maybeDoc: RouteDoc | undefined
  ): void {
    // Arity-based, not shape-sniffed: a 4th argument present means
    // schemaOrDoc was `schema` and maybeDoc is `doc`; absent means
    // schemaOrDoc was `doc` all along (the 3-arg call).
    const schema = maybeDoc ? (schemaOrDoc as RouteSchema) : undefined;
    const doc = maybeDoc ?? (schemaOrDoc as RouteDoc);

    this.router[method](path, handler);
    this.registry.registerRoute(buildRouteConfig(method, path, schema, doc));
  }
}
