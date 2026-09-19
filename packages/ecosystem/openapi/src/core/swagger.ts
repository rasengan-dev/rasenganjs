import { escapeHtml } from './html-escape.js';

export interface SwaggerHtmlOptions {
  /** URL the browser fetches the OpenAPI JSON document from, e.g. `/api/openapi.json`. */
  specUrl: string;
  title?: string;
}

/**
 * A self-contained HTML page embedding Swagger UI via its CDN bundle —
 * same approach as `scalarHtml()`: no bundling, no static-asset serving
 * required from the host framework. Swagger UI reads the spec from
 * `specUrl` client-side.
 */
export function swaggerHtml(opts: SwaggerHtmlOptions): string {
  const title = escapeHtml(opts.title ?? 'API Reference');
  const specUrl = escapeHtml(opts.specUrl);
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.onload = () => {
        window.ui = SwaggerUIBundle({
          url: "${specUrl}",
          dom_id: "#swagger-ui",
        });
      };
    </script>
  </body>
</html>
`;
}
