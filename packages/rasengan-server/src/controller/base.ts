import type { Middleware } from '@rasenganjs/runtime';
import type { Router, RouteHandler as _RouteHandler } from '../router/index.js';

/**
 * Signature for a route handler function.
 * Receives the request context and must return a `Response` (or a promise thereof).
 */
export type RouteHandler = _RouteHandler;

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
 *     router.get('/users', listUsers);
 *     router.post('/users', createUser);
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
   * Register routes on the given `Router`.
   * Called during compilation by `ServerApp`.
   *
   * @param router - The server router instance to define routes on.
   */
  abstract routes(router: Router): void;
}
