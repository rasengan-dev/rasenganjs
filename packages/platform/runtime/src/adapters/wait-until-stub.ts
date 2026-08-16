/**
 * Fire-and-forget `waitUntil` stub for runtimes with no real
 * `ExecutionContext` (Node, Bun). Keeps `ctx.runtime.executionCtx?.waitUntil(...)`
 * callable uniformly across every adapter (RFC-0013) — a rejected
 * promise is caught and logged instead of becoming an unhandled
 * rejection, since there is no platform to report it to.
 */
export function createWaitUntilStub() {
  return {
    waitUntil(promise: Promise<unknown>): void {
      promise.catch((err) => {
        console.error('[futon] waitUntil rejected:', err);
      });
    },
  };
}
