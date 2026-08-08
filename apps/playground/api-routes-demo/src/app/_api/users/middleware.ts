import type { Middleware } from 'rasengan/server';

/**
 * Applies to every route under _api/users/ (and beneath), on top of
 * the root middleware.ts — demonstrates that middleware composes
 * through nested folders. Not real auth, just a header check.
 */
const requireApiKey: Middleware = async (ctx, next) => {
  if (ctx.request.headers.get('x-api-key') !== 'demo') {
    return new Response('Missing or invalid x-api-key header', {
      status: 401,
    });
  }

  return next();
};

export default [requireApiKey];
