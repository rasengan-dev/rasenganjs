import { describe, expect, it } from 'vitest';
import { scalarHtml } from '../../core/scalar.js';

describe('scalarHtml', () => {
  it('embeds the spec URL and defaults the title', () => {
    const html = scalarHtml({ specUrl: '/api/openapi.json' });
    expect(html).toMatch(/data-url="\/api\/openapi\.json"/);
    expect(html).toMatch(/<title>API Reference<\/title>/);
    expect(html).toMatch(/cdn\.jsdelivr\.net\/npm\/@scalar\/api-reference/);
  });

  it('escapes a custom title and spec URL', () => {
    const html = scalarHtml({
      specUrl: '/api/openapi.json?x=1&y=2',
      title: '<script>alert(1)</script>',
    });
    expect(html).toMatch(/data-url="\/api\/openapi\.json\?x=1&amp;y=2"/);
    expect(html).not.toMatch(/<script>alert\(1\)<\/script>/);
    expect(html).toMatch(/&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  });
});
