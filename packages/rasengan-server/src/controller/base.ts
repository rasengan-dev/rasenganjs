import type { Router, RouteHandler as _RouteHandler } from '../router.js';

export type RouteHandler = _RouteHandler;

export abstract class Controller {
  abstract routes(router: Router): void;
}
