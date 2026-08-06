import {
  createStaticRouter,
  StaticHandler,
  StaticHandlerContext,
  StaticRouterProvider,
} from 'react-router';
import { logRedirection as log } from '../../core/utils/log.js';
import {
  redirect as redirectResponse,
  html as htmlResponse,
} from '@rasenganjs/futon';
import { AppConfig, Redirect } from '../../core/config/type.js';
import { join } from 'path';
import {
  isStaticRedirectFromConfig,
  isRedirectResponse,
  extractMetaFromRRContext,
  extractHeadersFromRRContext,
} from './utils.js';
import { ModuleRunner } from 'vite/module-runner';
import { renderToString } from '../node/rendering.js';
import { TemplateLayout } from '../../entries/server/index.js';

/**
 * Build the redirect Response for a matched request — either a
 * config-defined static redirect (`rasengan.config.js`'s `redirects`)
 * or a redirect surfaced by a loader (`context` is already a
 * `Response` with a 301/302 status in that case).
 *
 * Errors thrown here (and by every other handler in this file)
 * propagate to the caller instead of being caught locally — the
 * futon pipeline's `app.onError` is the single place that turns an
 * uncaught error into a response (dev: `renderErrorPage`; prod: a
 * sanitized 500), so handlers stay free of their own try/catch.
 *
 * @param request
 * @param options
 * @returns
 */
export async function handleRedirectRequest(
  request: Request,
  {
    context,
    redirects,
  }: { context: StaticHandlerContext | Response; redirects: Redirect[] }
): Promise<Response> {
  // Mirrors Express's `req.originalUrl` (path + query, no origin).
  const url = new URL(request.url);
  const originalUrl = url.pathname + url.search;

  for (let redirect of redirects) {
    if (redirect.source === originalUrl) {
      // Log redirect
      log(redirect.source, redirect.destination);

      return redirectResponse(
        redirect.destination,
        redirect.permanent ? 301 : 302
      );
    }
  }

  // Handle redirects from loader functions
  if (context instanceof Response) {
    const status = context.status; // "status" is only available when redirecting from loader, normally it's statusCode

    if (status === 302 || status === 301) {
      const redirectURL = context.headers.get('Location')!;

      // Log redirect
      log(originalUrl, redirectURL);

      return redirectResponse(redirectURL, status);
    }

    // TODO: Check this line again
    return context;
  }

  // Unreachable in practice — callers only invoke this when a config
  // redirect matched above or `context` is itself a redirect Response.
  return new Response('Internal Server Error', { status: 500 });
}

/**
 * Render a document (full-page) request via React Router's static
 * handler, then the app's `render()` entry point.
 * @param request
 * @param runner
 * @param options
 * @returns
 */
export async function handleDocumentRequest(
  request: Request,
  runner: ModuleRunner,
  options: {
    rootPath: string;
    __dirname: string;
    config: AppConfig;
    handler: StaticHandler;
  }
): Promise<Response> {
  const { __dirname, config, handler } = options;

  // Get the render function and app router
  const { render } = await runner.import(
    join(`${__dirname}./../../entries/server/entry.server.js`)
  );

  let context = await handler.query(request);

  // Handle redirects from config file
  const redirects = await config.redirects();
  const redirectFound = await isStaticRedirectFromConfig(request, redirects);

  if (isRedirectResponse(context as Response) || redirectFound) {
    return await handleRedirectRequest(request, { context, redirects });
  }

  if (!(context instanceof Response)) {
    // Extract meta from context
    const metadata = extractMetaFromRRContext(context);

    // Create static router
    let router = createStaticRouter(handler.dataRoutes, context);

    const headers = extractHeadersFromRRContext(context);

    const Router = (
      <StaticRouterProvider router={router} context={context} hydrate={true} />
    );

    return await render(Router, {
      metadata,
      statusCode: context.statusCode,
      responseHeaders: Object.fromEntries(headers),
    });
  }

  return context;
}

/**
 * Handle a React Router data request (`.data` / `Accept: application/json`)
 * by dispatching straight to the matched route's action/loader.
 * @param request
 * @param handler
 * @returns
 */
export async function handleDataRequest(
  request: Request,
  handler: StaticHandler
): Promise<Response> {
  // 1. we don't want to proxy the browser request directly to our router, so we
  // make a new one.
  let newRequest =
    request.method === 'POST'
      ? new Request(request.url, {
          method: request.method,
          headers: request.headers,
          // @ts-expect-error this is valid, types are wrong
          body: new URLSearchParams(await request.formData()),
        })
      : new Request(request.url, {
          headers: request.headers,
        });

  // 2. get data from our router, queryRoute knows to call the action or loader
  // of the leaf route that matches
  let data = await handler.queryRoute(newRequest);

  // 3. send the response
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Render the SPA shell (no SSR — `config.ssr === false`).
 * @param runner
 * @param options
 * @returns
 */
export async function handleSpaModeRequest(
  runner: ModuleRunner,
  options: { rootPath: string; __dirname: string; config: AppConfig }
): Promise<Response> {
  // Import Template
  const Template = (await runner.import(`${options.rootPath}/src/template`))
    .default;

  // Convert TemplateLayout to string
  const html = renderToString(
    <TemplateLayout Template={Template} isSpaMode={true} />
  );

  return htmlResponse(html, { status: 200 });
}
