import type * as Vite from 'vite';
import { createServerModuleRunner } from 'vite';
import type { ModuleRunner } from 'vite/module-runner';

/**
 * One SSR module runner per Vite dev server.
 *
 * Keyed weakly so a dev server that gets closed (and its runner with it)
 * can be garbage-collected.
 */
const runners = new WeakMap<Vite.ViteDevServer, ModuleRunner>();

/**
 * Returns the SSR module runner shared by every request of a dev server,
 * creating it on first use.
 *
 * Sharing one runner is what keeps user modules evaluated once per dev
 * session instead of once per request: a runner's evaluated-module cache is
 * per instance, so a fresh `createServerModuleRunner()` on each request
 * re-ran the whole `_api/` and `_routes/` module graph every time, wiping
 * module-level state (an in-memory store, a database client, a connection
 * pool) between requests.
 *
 * Edits still apply without a restart: the runner is created with Vite's
 * HMR transport, so a changed source file invalidates the cached modules
 * that depend on it and the next `runner.import()` evaluates the new code.
 * @param viteDevServer The dev server whose `ssr` environment the runner executes in.
 * @returns The runner to pass to `runner.import()` for SSR and API route modules.
 */
export function getDevModuleRunner(
  viteDevServer: Vite.ViteDevServer
): ModuleRunner {
  let runner = runners.get(viteDevServer);

  if (!runner) {
    runner = createServerModuleRunner(viteDevServer.environments.ssr);
    runners.set(viteDevServer, runner);
  }

  return runner;
}
