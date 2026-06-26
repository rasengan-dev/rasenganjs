import type {
  Context,
  Middleware,
  Router as RuntimeRouter,
} from '@rasenganjs/runtime';

/**
 * HTTP handler function type.
 * Accepts a request context and returns a `Response` (or a promise thereof).
 */
export type RouteHandler = (ctx: Context) => Response | Promise<Response>;

/**
 * High-level server router that wraps the runtime `Router` with a
 * middleware-friendly API.
 *
 * Each HTTP-method verb (`get`, `post`, `put`, `patch`, `delete`) accepts
 * route-level middleware via three overloads:
 *
 * 1. `(path, handler)` — no middleware
 * 2. `(path, middleware, handler)` — single middleware
 * 3. `(path, [middleware, ...], handler)` — multiple middleware
 *
 * Route-level middleware is scoped to that single route by wrapping it
 * in a runtime `group({ middlewares }, ...)` call.
 *
 * @example
 * ```ts
 * const router = new Router(runtimeRouter);
 * router.get('/public', publicHandler);
 * router.get('/protected', auth, protectedHandler);
 * router.post('/items', [validate, log], createItem);
 * ```
 */
export class Router {
  constructor(private router: RuntimeRouter) {}

  get(path: string, handler: RouteHandler): void;
  get(path: string, middleware: Middleware, handler: RouteHandler): void;
  get(path: string, middlewares: Middleware[], handler: RouteHandler): void;
  /** Register a `GET` route with optional middleware. */
  get(path: string, ...args: any[]): void {
    this.register('GET', path, args);
  }

  post(path: string, handler: RouteHandler): void;
  post(path: string, middleware: Middleware, handler: RouteHandler): void;
  post(path: string, middlewares: Middleware[], handler: RouteHandler): void;
  /** Register a `POST` route with optional middleware. */
  post(path: string, ...args: any[]): void {
    this.register('POST', path, args);
  }

  put(path: string, handler: RouteHandler): void;
  put(path: string, middleware: Middleware, handler: RouteHandler): void;
  put(path: string, middlewares: Middleware[], handler: RouteHandler): void;
  /** Register a `PUT` route with optional middleware. */
  put(path: string, ...args: any[]): void {
    this.register('PUT', path, args);
  }

  patch(path: string, handler: RouteHandler): void;
  patch(path: string, middleware: Middleware, handler: RouteHandler): void;
  patch(path: string, middlewares: Middleware[], handler: RouteHandler): void;
  /** Register a `PATCH` route with optional middleware. */
  patch(path: string, ...args: any[]): void {
    this.register('PATCH', path, args);
  }

  delete(path: string, handler: RouteHandler): void;
  delete(path: string, middleware: Middleware, handler: RouteHandler): void;
  delete(path: string, middlewares: Middleware[], handler: RouteHandler): void;
  /** Register a `DELETE` route with optional middleware. */
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
   */
  private register(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    args: any[]
  ): void {
    const { middlewares, handler } = this.splitArgs(args);
    const wrapHandler = (ctx: Context) => Promise.resolve(handler(ctx));
    const m = method.toLowerCase() as
      | 'get'
      | 'post'
      | 'put'
      | 'patch'
      | 'delete';

    if (middlewares.length > 0) {
      this.router.group({ middlewares }, (r) => {
        (r as RuntimeRouter)[m](path, wrapHandler);
      });
    } else {
      this.router[m](path, wrapHandler);
    }
  }

  /**
   * Normalise the variadic argument list into a structured
   * `{ middlewares, handler }` result.
   *
   * Cases:
   * - `[handler]` → no middleware
   * - `[middleware, handler]` → single middleware
   * - `[middleware[], handler]` → multiple middleware
   */
  private splitArgs(args: any[]): {
    middlewares: Middleware[];
    handler: RouteHandler;
  } {
    if (args.length === 1) {
      return { middlewares: [], handler: args[0] };
    }

    if (Array.isArray(args[0])) {
      return { middlewares: args[0], handler: args[1] };
    }

    return { middlewares: [args[0]], handler: args[1] };
  }
}
