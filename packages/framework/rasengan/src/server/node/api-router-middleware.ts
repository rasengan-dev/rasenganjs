import { json } from '@rasenganjs/futon';
import type { Context, Middleware, Router } from '@rasenganjs/futon';
import path from 'node:path';
import fs from 'node:fs';
import { resolvePath } from '../../core/config/utils/path.js';
import { BuildOptions } from '../build/index.js';

interface ApiRouterMiddlewareOptions {
  build: BuildOptions;
  /**
   * Prefix under which `_api/` routes are mounted.
   * @default '/api'
   */
  prefix?: string;
  /**
   * Pre-loaded API router, bypassing the setup-time fs.existsSync
   * check and the dynamic import() this middleware would otherwise
   * do — for runtimes with no filesystem and no dynamic
   * import-by-path support (Cloudflare Workers). A caller with no
   * `_api/` folder simply omits `apiRouter`. Every other caller
   * omits `modules` entirely and keeps today's exact behavior
   * (RFC-0009 §Detailed Design 1).
   */
  modules?: { apiRouter: Router };
}

/**
 * Duck-typed check for futon's `HttpError` shape (`{status: number}`
 * on an `Error`) — not `instanceof HttpError`. A `_api` route handler
 * is bundled into the ssr/ssg build by Rolldown (`@rasenganjs/futon`
 * isn't externalized — doing so breaks module resolution for
 * consumers under pnpm's strict `node_modules` isolation, since
 * `@rasenganjs/futon` is a dependency of `rasengan`, not of the
 * consuming app itself), while this middleware imports
 * `@rasenganjs/futon` directly and unbundled — two separately-loaded
 * copies of the same class, which `instanceof` can't see through.
 */
export function isHttpErrorLike(
  error: unknown
): error is Error & { status: number } {
  return (
    error instanceof Error &&
    'status' in error &&
    typeof (error as { status: unknown }).status === 'number'
  );
}

/**
 * Mounts the built `_api/` router (RFC-0008), if the app has one, ahead
 * of the SSR fallback. Self-contained under `prefix`: an unmatched path
 * responds `404` in JSON, an uncaught handler error responds in JSON
 * too — neither ever falls through to the HTML/SSR catch-all.
 *
 * A no-op passthrough middleware when the app has no `_api/` folder
 * (checked once here, at creation time — not per request, since the
 * build output can't change while the server is running).
 * @param options
 * @returns
 */
export function createApiRouterMiddleware(
  options: ApiRouterMiddlewareOptions
): Middleware {
  const { build: buildOptions, prefix = '/api', modules } = options;

  const apiRouterPath = path.posix.join(
    buildOptions.buildDirectory,
    buildOptions.serverPathDirectory,
    'api-router.js'
  );

  const hasApiRouter = modules
    ? modules.apiRouter != null
    : fs.existsSync(apiRouterPath);

  if (!hasApiRouter) {
    return async (_ctx, next) => next();
  }

  return async (ctx: Context, next) => {
    const pathname = new URL(ctx.request.url).pathname;

    if (!pathname.startsWith(prefix)) {
      return next();
    }

    try {
      const ApiRouter: Router = modules
        ? modules.apiRouter
        : await (
            await import(/* @vite-ignore */ resolvePath(apiRouterPath))
          ).default;
      const dispatch = ApiRouter.middleware();

      return await dispatch(ctx, async () =>
        json({ error: { message: 'Not Found', status: 404 } }, { status: 404 })
      );
    } catch (error) {
      console.error(error);

      const status = isHttpErrorLike(error) ? error.status : 500;
      const message = isHttpErrorLike(error)
        ? error.message
        : process.env.NODE_ENV === 'production'
          ? 'Internal Server Error'
          : ((error as Error)?.message ?? 'Internal Server Error');

      return json({ error: { message, status } }, { status });
    }
  };
}
