import type { Router } from '../router.js';
import type { RouteHandler as _RouteHandler } from '../context.js';

export type RouteHandler = _RouteHandler;

export abstract class Controller {
  abstract routes(router: Router): void;
}
