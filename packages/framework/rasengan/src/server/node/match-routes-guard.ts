import { matchRoutes } from 'react-router';
import { notFound } from '@rasenganjs/futon';
import type { Context, Middleware } from '@rasenganjs/futon';
import path from 'node:path';
import { resolvePath } from '../../core/config/utils/path.js';
import { generateRoutes } from '../../routing/utils/index.js';
import { BuildOptions } from '../build/index.js';

interface MatchRoutesGuardOptions {
  build: BuildOptions;
}

/**
 * Cheap structural-404 guard (RFC-0007 §3).
 *
 * A futon middleware — register it with `app.use(...)` ahead of the
 * SSR fallback (`app.fallback(ssrHandler)`). Calls React Router's own
 * `matchRoutes` (the same matcher `createStaticHandler` uses
 * internally, so there's no risk of drift between the two) against
 * the app's route tree and short-circuits with a `404` for any URL
 * that doesn't correspond to a page pattern at all — no loader,
 * no render.
 *
 * This only catches *structurally* unmatched URLs (bot scans,
 * malformed paths, typos in the path itself). A URL that matches a
 * route but whose content doesn't exist (e.g. a missing CMS slug) is
 * a content-level decision only that page's loader can make
 * (`throw new Response(..., { status: 404 })`) — this guard doesn't
 * (and can't) catch that case, by design.
 * @param options
 * @returns
 */
export function createMatchRoutesGuard(
  options: MatchRoutesGuardOptions
): Middleware {
  const { build: buildOptions } = options;

  return async (ctx: Context, next) => {
    const AppRouter = await (
      await import(
        resolvePath(
          path.posix.join(
            buildOptions.buildDirectory,
            buildOptions.serverPathDirectory,
            'app.router.js'
          )
        )
      )
    ).default;

    const staticRoutes = generateRoutes(AppRouter);
    const pathname = new URL(ctx.request.url).pathname;

    if (!matchRoutes(staticRoutes, pathname)) {
      return notFound('Not found');
    }

    return next();
  };
}
