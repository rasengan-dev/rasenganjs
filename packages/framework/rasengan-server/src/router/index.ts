import type {
  Context,
  Middleware,
  Router as RuntimeRouter,
} from '@rasenganjs/futon';

import {
  type ValidationConfig,
  type SchemaDefinition,
  type InferBody,
  type InferParams,
  type InferQuery,
  createValidationMiddleware,
} from '@rasenganjs/validators';

/**
 * HTTP handler function type (no schema inference).
 * Accepts a request context and returns a `Response` (or a promise thereof).
 */
export type RouteHandler<S extends SchemaDefinition = {}> = (
  ctx: Context<InferBody<S>, InferParams<S>, InferQuery<S>>
) => Response | Promise<Response>;

/**
 * High-level server router that wraps the runtime `Router` with a
 * middleware-friendly API and automatic schema validation.
 *
 * Each HTTP-method verb (`get`, `post`, `put`, `patch`, `delete`) accepts
 * route-level middleware via three overloads:
 *
 * 1. `(path, handler)` — no middleware
 * 2. `(path, middleware, handler)` — single middleware
 * 3. `(path, [middleware, ...], handler)` — multiple middleware
 *
 * When a `SchemaDefinition` is passed as the **last** argument, the
 * handler is associated with the schema and validation middleware is
 * injected automatically behind any route-level middleware.
 *
 * Controller-level schemas (from `Controller.schemas`) are matched to
 * handlers by their function name and injected when no per-route schema
 * is provided.
 *
 * @example
 * ```ts
 * const router = new Router(runtimeRouter);
 * router.get('/public', publicHandler);
 * router.post('/users', handler, { body: CreateUserSchema });
 * router.put('/users/:id', [auth], handler, { body: UpdateSchema, params: IdSchema });
 * ```
 */
export class Router {
  /**
   * Maps original handler functions to their schema definitions.
   * Read by `ServerApp.registerControllers()` after `instance.routes(router)`
   * returns, so validation middleware can be inspected.
   */
  readonly handlerSchemaMap = new Map<RouteHandler, SchemaDefinition>();

  constructor(
    private router: RuntimeRouter,
    private validationConfig?: ValidationConfig,
    private controllerSchemas?: Record<string, SchemaDefinition>
  ) {}

  private getValidationConfig(): ValidationConfig {
    if (!this.validationConfig) {
      throw new Error(
        '[rasengan-server] Validation config is not set. ' +
          'Call `app.configureValidation()` or ensure the validation package is configured.'
      );
    }
    return this.validationConfig;
  }

  // ── GET overloads ────────────────────────────────────────

  get(path: string, handler: RouteHandler): void;
  get(path: string, middleware: Middleware, handler: RouteHandler): void;
  get(path: string, middlewares: Middleware[], handler: RouteHandler): void;
  get<S extends SchemaDefinition>(
    path: string,
    handler: RouteHandler<S>,
    schema: S
  ): void;
  get<S extends SchemaDefinition>(
    path: string,
    middleware: Middleware,
    handler: RouteHandler<S>,
    schema: S
  ): void;
  get<S extends SchemaDefinition>(
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<S>,
    schema: S
  ): void;

  get(path: string, ...args: any[]): void {
    this.register('GET', path, args);
  }

  // ── POST overloads ───────────────────────────────────────

  post(path: string, handler: RouteHandler): void;
  post(path: string, middleware: Middleware, handler: RouteHandler): void;
  post(path: string, middlewares: Middleware[], handler: RouteHandler): void;
  post<S extends SchemaDefinition>(
    path: string,
    handler: RouteHandler<S>,
    schema: S
  ): void;
  post<S extends SchemaDefinition>(
    path: string,
    middleware: Middleware,
    handler: RouteHandler<S>,
    schema: S
  ): void;
  post<S extends SchemaDefinition>(
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<S>,
    schema: S
  ): void;

  post(path: string, ...args: any[]): void {
    this.register('POST', path, args);
  }

  // ── PUT overloads ────────────────────────────────────────

  put(path: string, handler: RouteHandler): void;
  put(path: string, middleware: Middleware, handler: RouteHandler): void;
  put(path: string, middlewares: Middleware[], handler: RouteHandler): void;
  put<S extends SchemaDefinition>(
    path: string,
    handler: RouteHandler<S>,
    schema: S
  ): void;
  put<S extends SchemaDefinition>(
    path: string,
    middleware: Middleware,
    handler: RouteHandler<S>,
    schema: S
  ): void;
  put<S extends SchemaDefinition>(
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<S>,
    schema: S
  ): void;

  put(path: string, ...args: any[]): void {
    this.register('PUT', path, args);
  }

  // ── PATCH overloads ──────────────────────────────────────

  patch(path: string, handler: RouteHandler): void;
  patch(path: string, middleware: Middleware, handler: RouteHandler): void;
  patch(path: string, middlewares: Middleware[], handler: RouteHandler): void;
  patch<S extends SchemaDefinition>(
    path: string,
    handler: RouteHandler<S>,
    schema: S
  ): void;
  patch<S extends SchemaDefinition>(
    path: string,
    middleware: Middleware,
    handler: RouteHandler<S>,
    schema: S
  ): void;
  patch<S extends SchemaDefinition>(
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<S>,
    schema: S
  ): void;

  patch(path: string, ...args: any[]): void {
    this.register('PATCH', path, args);
  }

  // ── DELETE overloads ─────────────────────────────────────

  delete(path: string, handler: RouteHandler): void;
  delete(path: string, middleware: Middleware, handler: RouteHandler): void;
  delete(path: string, middlewares: Middleware[], handler: RouteHandler): void;
  delete<S extends SchemaDefinition>(
    path: string,
    handler: RouteHandler<S>,
    schema: S
  ): void;
  delete<S extends SchemaDefinition>(
    path: string,
    middleware: Middleware,
    handler: RouteHandler<S>,
    schema: S
  ): void;
  delete<S extends SchemaDefinition>(
    path: string,
    middlewares: Middleware[],
    handler: RouteHandler<S>,
    schema: S
  ): void;

  delete(path: string, ...args: any[]): void {
    this.register('DELETE', path, args);
  }

  /**
   * Internal: normalises the polymorphic arguments, wraps the handler
   * in a promise-returning function, and delegates to the runtime router.
   *
   * When middleware is present the route is registered inside a
   * runtime `group({ middlewares }, ...)` block so the middleware
   * applies only to this single route.
   *
   * If a `SchemaDefinition` is found (either as a trailing argument or
   * from the controller's `schemas` dictionary), validation middleware
   * is injected automatically.
   */
  private register(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    args: any[]
  ): void {
    const { middlewares, handler, schema } = this.parseArgs(args);
    const finalSchema = schema ?? this.resolveControllerSchema(handler);

    const wrapHandler = (ctx: Context) => Promise.resolve(handler(ctx));
    const m = method.toLowerCase() as
      'get' | 'post' | 'put' | 'patch' | 'delete';

    if (finalSchema) {
      this.handlerSchemaMap.set(handler, finalSchema);
    }

    // Build middleware chain: route-level middleware(s) → validation → handler
    const chain: Middleware[] = [...middlewares];

    if (finalSchema) {
      const vConfig = this.getValidationConfig();
      chain.push(createValidationMiddleware(finalSchema, vConfig));
    }

    if (chain.length > 0) {
      this.router.group({ middlewares: chain }, (r) => {
        (r as RuntimeRouter)[m](path, wrapHandler);
      });
    } else {
      this.router[m](path, wrapHandler);
    }
  }

  /**
   * Resolve a schema from the controller's `schemas` dictionary
   * by matching the handler's function name.
   *
   * Class methods (`this.create` → `handler.name === 'create'`) and
   * named function expressions work.  Arrow functions and bound methods
   * lose their name — for those cases pass the schema as the last argument.
   */
  private resolveControllerSchema(
    handler: RouteHandler
  ): SchemaDefinition | undefined {
    if (!this.controllerSchemas) return undefined;

    const name = handler.name;
    if (!name) return undefined;

    return this.controllerSchemas[name];
  }

  /**
   * Normalise the variadic argument list into a structured
   * `{ middlewares, handler, schema? }` result.
   *
   * The last argument is a `SchemaDefinition` if it is a plain object
   * with at least one of `body`, `params`, `query`, or `onError` keys.
   *
   * Cases:
   * - `[handler]` or `[handler, schema]`
   * - `[middleware, handler]` or `[middleware, handler, schema]`
   * - `[middleware[], handler]` or `[middleware[], handler, schema]`
   */
  private parseArgs(args: any[]): {
    middlewares: Middleware[];
    handler: RouteHandler;
    schema?: SchemaDefinition;
  } {
    let schema: SchemaDefinition | undefined;

    // Detect trailing SchemaDefinition
    const last = args[args.length - 1];
    if (
      last &&
      typeof last === 'object' &&
      !Array.isArray(last) &&
      typeof last !== 'function' &&
      ('body' in last ||
        'params' in last ||
        'query' in last ||
        'onError' in last)
    ) {
      schema = last;
      args = args.slice(0, -1);
    }

    // Remaining args are [handler], [mw, handler], or [[mw], handler]
    if (args.length === 1) {
      return { middlewares: [], handler: args[0], schema };
    }

    if (Array.isArray(args[0])) {
      return { middlewares: args[0], handler: args[1], schema };
    }

    return { middlewares: [args[0]], handler: args[1], schema };
  }

  /**
   * Return all stored schema mappings and clear the internal map.
   * Called by `ServerApp.registerControllers()` after routes are registered.
   */
  consumeHandlerSchemas(): Array<[RouteHandler, SchemaDefinition]> {
    const entries = [...this.handlerSchemaMap.entries()];
    this.handlerSchemaMap.clear();
    return entries;
  }
}
