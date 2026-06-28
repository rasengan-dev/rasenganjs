/**
 * Minimal ambient declarations for workerd runtime globals used by
 * @rasenganjs/runtime-workerd.
 *
 * This avoids a dependency on @cloudflare/workers-types while still
 * providing type safety during compilation (tsup DTS generation on Node).
 */

interface FetchEvent extends Event {
  readonly request: Request;
  respondWith(response: Response | Promise<Response>): void;
  waitUntil(promise: Promise<void>): void;
}

interface ServiceWorkerGlobalScope {
  addEventListener(type: 'fetch', listener: (event: FetchEvent) => void): void;
  removeEventListener(
    type: 'fetch',
    listener: (event: FetchEvent) => void
  ): void;
}

declare var self: ServiceWorkerGlobalScope;
