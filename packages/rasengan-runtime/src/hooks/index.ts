/**
 * Hooks — lightweight lifecycle system for the Application.
 *
 * Hooks let framework integrators and middleware authors
 * observe or intercept the request lifecycle without
 * adding middleware to the pipeline.
 *
 * Available hooks:
 *   - `beforeRequest` — fires once per request, before the
 *     middleware chain runs.  Receives the Context.
 *   - `afterResponse` — fires after the Response is produced
 *     (both success and error paths).  Receives (Context, Response).
 *   - `onError` — fires when an unhandled error escapes the
 *     middleware chain.  Receives (Error, Context).
 *
 * @example
 * ```ts
 * app.hooks.on('afterResponse', (ctx, response) => {
 *   metrics.record(ctx.request.method, response.status);
 * });
 * ```
 */

/** All recognised hook names */
export type HookName = 'beforeRequest' | 'afterResponse' | 'onError';

/** A hook handler function — signature varies by hook name */
export type HookHandler = (...args: unknown[]) => void | Promise<void>;

/**
 * Lightweight pub/sub hook registry.
 *
 * Implemented as a simple map of hook name → handler array
 * to keep zero-dependency and tree-shakeable.
 */
export class HookSystem {
  private handlers = new Map<HookName, Set<HookHandler>>();

  /**
   * Register a handler for a lifecycle hook.
   *
   * Handlers are called in registration order.
   * They may be async; `emit()` awaits all of them.
   */
  on(name: HookName, handler: HookHandler): void {
    let set = this.handlers.get(name);
    if (!set) {
      set = new Set();
      this.handlers.set(name, set);
    }
    set.add(handler);
  }

  /**
   * Remove a previously registered handler.
   */
  off(name: HookName, handler: HookHandler): void {
    this.handlers.get(name)?.delete(handler);
  }

  /**
   * Fire all handlers registered for `name`.
   *
   * Each handler receives `args` spread as its arguments.
   * If any handler throws, subsequent handlers still run
   * (fire-and-forget within the hook scope).  The caller
   * is responsible for error reporting.
   */
  async emit(name: HookName, ...args: unknown[]): Promise<void> {
    const set = this.handlers.get(name);
    if (!set) return;

    const results: Promise<void>[] = [];
    for (const handler of set) {
      try {
        const result = handler(...args);
        if (result instanceof Promise) {
          results.push(result);
        }
      } catch {
        // Swallow hook errors so they never crash the request.
        // Hook handlers should do their own error handling.
      }
    }
    await Promise.allSettled(results);
  }

  /** Remove all hook handlers (useful for testing / clean-up) */
  clear(): void {
    this.handlers.clear();
  }
}
