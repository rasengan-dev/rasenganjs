/**
 * Minimal ambient declarations for workerd runtime globals.
 *
 * Declares `FetchEvent`, `ServiceWorkerGlobalScope`, and `self`
 * so the adapter compiles cleanly on Node (for DTS generation)
 * without a dependency on `@cloudflare/workers-types`.
 */

/** The FetchEvent interface as defined by the Service Worker spec. */
interface FetchEvent extends Event {
  readonly request: Request;
  respondWith(response: Response | Promise<Response>): void;
  waitUntil(promise: Promise<void>): void;
}

/** Make FetchEvent available as a constructor (as it is in workerd). */
declare var FetchEvent: {
  prototype: FetchEvent;
  new (type: string, init?: EventInit): FetchEvent;
};

/** Service Worker global scope with fetch event listener methods. */
interface ServiceWorkerGlobalScope {
  addEventListener(type: 'fetch', listener: (event: FetchEvent) => void): void;
  removeEventListener(
    type: 'fetch',
    listener: (event: FetchEvent) => void
  ): void;
}

/** The global `self` object in Worker environments. */
declare var self: ServiceWorkerGlobalScope;

/**
 * The `ExecutionContext` passed as the third argument to a Module
 * Worker's exported `fetch(request, env, ctx)` handler (RFC-0013).
 * Declared ambiently, same rationale as `FetchEvent` above: no
 * dependency on `@cloudflare/workers-types`.
 */
interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}
