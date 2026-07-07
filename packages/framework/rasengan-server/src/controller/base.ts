import type { Middleware } from '@rasenganjs/futon';
import type { SchemaDefinition } from '@rasenganjs/validators';
import type { Router, RouteHandler as _RouteHandler } from '../router/index.js';

/**
 * Signature for a route handler function.
 * Receives the request context and must return a `Response` (or a promise thereof).
 */
export type RouteHandler<T = {}> = _RouteHandler<T>;

/**
 * Abstract base class for defining a set of related routes.
 *
 * Subclasses override `routes(router)` to register endpoints and can
 * declare controller-level `middlewares` that apply to every route.
 *
 * @example
 * ```ts
 * class UsersController extends Controller {
 *   middlewares = [authMiddleware];
 *
 *   routes(router: Router): void {
 *     router.get('/users', this.listUsers);
 *     router.post('/users', this.createUser);
 *   }
 * }
 * ```
 */
export abstract class Controller {
  /**
   * Middleware functions that run before every route in this controller.
   * Applied after module-level middleware, before route-level middleware.
   */
  middlewares: Middleware[] = [];

  /**
   * Per-method schema definitions for validation.
   *
   * Keys must match method names defined in `routes()`.
   * The validation middleware is injected automatically during
   * `compile()` by matching method names against the handler
   * references stored in the Router's `handlerSchemaMap`.
   *
   * @example
   * ```ts
   * class UsersController extends Controller {
   *   schemas = {
   *     create: { body: CreateUserSchema },
   *     update: { body: UpdateUserSchema, params: UserParamsSchema },
   *   };
   *
   *   routes(router: Router): void {
   *     router.post('/users', this.create);
   *     router.put('/users/:id', this.update);
   *   }
   * }
   * ```
   */
  schemas?: Record<string, SchemaDefinition>;

  /**
   * Register routes on the given `Router`.
   * Called during compilation by `ServerApp`.
   *
   * @param router - The server router instance to define routes on.
   */
  abstract routes(router: Router): void;
}
