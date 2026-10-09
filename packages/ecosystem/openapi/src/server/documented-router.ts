import type { Middleware } from '@rasenganjs/futon';
import type { Router as ServerRouter, RouteHandler } from '@rasenganjs/server';
import type { SchemaDefinition } from '@rasenganjs/validators';
import type { OpenApiRegistry } from '../core/registry.js';
import {
  buildRouteConfig,
  type HttpMethod,
  type RouteDoc,
} from '../core/route-config.js';

/**
 * Wraps a real Rasengan Server `Router` so a controller's `routes()`
 * reads the same way it always would — `docs.post(path, middlewares, handler, schema, doc)`
 * — while also capturing each route into an `OpenApiRegistry`.
 * `middlewares` is always an explicit array (no bare-handler/single-
 * middleware shorthand): simpler than replicating `Router`'s own six
 * overloads for what only two documented shapes actually need. `schema`
 * keeps the exact positional slot it has on the real
 * `Router.post(path, mw, handler, schema)` — meant to be the same object
 * already on `Controller.schemas` (e.g. `this.schemas.create`), not a
 * re-declared copy, so there's one source for what validates the request
 * and what documents it. `doc` is simply appended after it.
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
    schemaOrDoc: SchemaDefinition | RouteDoc,
    doc?: RouteDoc
  ): void {
    this.register('get', path, middlewares, handler, schemaOrDoc, doc);
  }

  post(
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<any>,
    doc: RouteDoc
  ): void;
  post(
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<any>,
    schema: SchemaDefinition,
    doc: RouteDoc
  ): void;
  post(
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<any>,
    schemaOrDoc: SchemaDefinition | RouteDoc,
    doc?: RouteDoc
  ): void {
    this.register('post', path, middlewares, handler, schemaOrDoc, doc);
  }

  put(
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<any>,
    doc: RouteDoc
  ): void;
  put(
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<any>,
    schema: SchemaDefinition,
    doc: RouteDoc
  ): void;
  put(
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<any>,
    schemaOrDoc: SchemaDefinition | RouteDoc,
    doc?: RouteDoc
  ): void {
    this.register('put', path, middlewares, handler, schemaOrDoc, doc);
  }

  patch(
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<any>,
    doc: RouteDoc
  ): void;
  patch(
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<any>,
    schema: SchemaDefinition,
    doc: RouteDoc
  ): void;
  patch(
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<any>,
    schemaOrDoc: SchemaDefinition | RouteDoc,
    doc?: RouteDoc
  ): void {
    this.register('patch', path, middlewares, handler, schemaOrDoc, doc);
  }

  delete(
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<any>,
    doc: RouteDoc
  ): void;
  delete(
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<any>,
    schema: SchemaDefinition,
    doc: RouteDoc
  ): void;
  delete(
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<any>,
    schemaOrDoc: SchemaDefinition | RouteDoc,
    doc?: RouteDoc
  ): void {
    this.register('delete', path, middlewares, handler, schemaOrDoc, doc);
  }

  private register(
    method: HttpMethod,
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<any>,
    schemaOrDoc: SchemaDefinition | RouteDoc,
    maybeDoc: RouteDoc | undefined
  ): void {
    // Arity-based, not shape-sniffed: a 5th argument present means
    // schemaOrDoc was `schema` and maybeDoc is `doc`; absent means
    // schemaOrDoc was `doc` all along (the 4-arg call).
    const schema = maybeDoc ? (schemaOrDoc as SchemaDefinition) : undefined;
    const doc = maybeDoc ?? (schemaOrDoc as RouteDoc);

    // `Router`'s methods are heavily overloaded (middleware/schema both
    // optional) — calling through a dynamically-selected method name loses
    // overload resolution, hence the cast at this one call site.
    const call = this.router[method].bind(this.router) as (
      ...args: unknown[]
    ) => void;
    if (schema) call(path, middlewares, handler, schema);
    else call(path, middlewares, handler);

    this.registry.registerRoute(buildRouteConfig(method, path, schema, doc));
  }
}
