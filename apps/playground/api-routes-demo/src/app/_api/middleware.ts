import type { Middleware } from 'rasengan/server';

/**
 * Applies to every route under _api/. Runs before any nested
 * middleware.ts or route handler.
 */
const requestLogger: Middleware = async (ctx, next) => {
  const start = Date.now();
  const response = await next();

  console.log(
    `[api] ${ctx.request.method} ${new URL(ctx.request.url).pathname} -> ${response.status} (${Date.now() - start}ms)`
  );

  return response;
};

export default [requestLogger];
