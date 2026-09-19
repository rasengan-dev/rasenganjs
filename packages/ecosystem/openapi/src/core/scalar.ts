import { escapeHtml } from './html-escape.js';

export interface ScalarHtmlOptions {
  /** URL the browser fetches the OpenAPI JSON document from, e.g. `/api/openapi.json`. */
  specUrl: string;
  title?: string;
}

/**
 * A self-contained HTML page embedding Scalar's API reference UI via its
 * CDN script — no bundling, no static-asset serving required from the
 * host framework. Scalar reads the spec from `specUrl` client-side.
 */
export function scalarHtml(opts: ScalarHtmlOptions): string {
  const title = escapeHtml(opts.title ?? 'API Reference');
  const specUrl = escapeHtml(opts.specUrl);
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
  </head>
  <body>
    <script id="api-reference" data-url="${specUrl}"></script>
    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
  </body>
</html>
`;
}
