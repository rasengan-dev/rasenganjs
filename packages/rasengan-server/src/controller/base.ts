import type { Middleware } from '@rasenganjs/runtime';
import type { Router, RouteHandler as _RouteHandler } from '../router/index.js';

export type RouteHandler = _RouteHandler;

export abstract class Controller {
  middlewares: Middleware[] = [];

  abstract routes(router: Router): void;
}
