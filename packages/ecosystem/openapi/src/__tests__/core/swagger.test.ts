import { describe, expect, it } from 'vitest';
import { swaggerHtml } from '../../core/swagger.js';

describe('swaggerHtml', () => {
  it('embeds the spec URL and defaults the title', () => {
    const html = swaggerHtml({ specUrl: '/api/openapi.json' });
    expect(html).toMatch(/url: "\/api\/openapi\.json"/);
    expect(html).toMatch(/<title>API Reference<\/title>/);
    expect(html).toMatch(
      /cdn\.jsdelivr\.net\/npm\/swagger-ui-dist@5\/swagger-ui-bundle\.js/
    );
  });

  it('escapes a custom title and spec URL', () => {
    const html = swaggerHtml({
      specUrl: '/api/openapi.json?x=1&y=2',
      title: '<script>alert(1)</script>',
    });
    expect(html).toMatch(/url: "\/api\/openapi\.json\?x=1&amp;y=2"/);
    expect(html).not.toMatch(/<script>alert\(1\)<\/script>/);
    expect(html).toMatch(/&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  });
});
