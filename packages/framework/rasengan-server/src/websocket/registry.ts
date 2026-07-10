import type { WebSocketHandlers } from './types.js';

/**
 * Registry of WebSocket routes, keyed by static path.
 *
 * This is deliberately a plain `Map` lookup rather than Futon's radix
 * router: this first slice only supports static paths (see RFC-0001),
 * and keeping this matcher separate from Futon's HTTP router keeps
 * `@rasenganjs/futon` free of any WebSocket awareness, per the RFC's
 * "Futon stays HTTP-only" rule. Dynamic segments (`/chat/:room`) can be
 * added here later without touching Futon.
 *
 * Built during `ServerApp.compile()` from the routes registered via
 * `app.websocket(path, handlers)`, then handed to the runtime adapter
 * (Node/Bun/...) so it can look up handlers for an incoming upgrade
 * request by pathname.
 *
 * `match()` alone satisfies `@rasenganjs/runtime`'s `WebSocketRouteMatcher`
 * interface structurally — this class never imports from `runtime`.
 */
export class WebSocketRegistry {
  private routes = new Map<string, WebSocketHandlers>();

  /**
   * Register handlers for a WebSocket path.
   *
   * Throws if the path is already registered — silently overwriting a
   * route is more likely to hide a bug (e.g. two modules claiming the
   * same path) than to be intentional.
   */
  register(path: string, handlers: WebSocketHandlers): void {
    const normalized = normalizePath(path);

    if (this.routes.has(normalized)) {
      throw new Error(
        `[rasengan-server] WebSocket path "${path}" is already registered.`
      );
    }

    this.routes.set(normalized, handlers);
  }

  /**
   * Look up the handlers registered for a pathname, or `undefined`
   * if no WebSocket route matches.
   */
  match(pathname: string): WebSocketHandlers | undefined {
    return this.routes.get(normalizePath(pathname));
  }

  /** Whether any WebSocket routes have been registered. */
  get isEmpty(): boolean {
    return this.routes.size === 0;
  }
}

/**
 * Strip trailing slashes for matching consistency (mirrors Futon's HTTP
 * router normalisation), preserving root "/".
 */
function normalizePath(path: string): string {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }
  return path;
}
