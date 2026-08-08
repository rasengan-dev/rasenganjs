import { describe, it, expect } from 'vitest';
import {
  isDocumentRequest,
  isDataRequest,
  isResourceRequest,
  isRedirectResponse,
  isStaticRedirectFromConfig,
  stripDataSuffix,
  generateRandomPort,
  extractMetaFromRRContext,
  extractHeadersFromRRContext,
} from '../../../server/dev/utils.js';
import type { StaticHandlerContext } from 'react-router';

function req(url: string, headers: Record<string, string> = {}) {
  return new Request(url, { headers });
}

describe('isDocumentRequest', () => {
  it('is true when Accept includes text/html', () => {
    expect(isDocumentRequest(req('http://x/', { accept: 'text/html' }))).toBe(
      true
    );
  });

  it('is false with no Accept header', () => {
    expect(isDocumentRequest(req('http://x/'))).toBe(false);
  });

  it('is false when Accept is application/json', () => {
    expect(
      isDocumentRequest(req('http://x/', { accept: 'application/json' }))
    ).toBe(false);
  });
});

describe('isDataRequest', () => {
  it('is true when Accept includes application/json', () => {
    expect(
      isDataRequest(req('http://x/pricing', { accept: 'application/json' }))
    ).toBe(true);
  });

  it('is true when the pathname ends in .data, regardless of Accept', () => {
    expect(isDataRequest(req('http://x/pricing.data'))).toBe(true);
  });

  it('is false for a plain document request', () => {
    expect(
      isDataRequest(req('http://x/pricing', { accept: 'text/html' }))
    ).toBe(false);
  });
});

describe('stripDataSuffix', () => {
  it('removes a trailing .data suffix', () => {
    expect(stripDataSuffix('/pricing.data')).toBe('/pricing');
  });

  it('removes .data only from the end, not from within the path', () => {
    expect(stripDataSuffix('/data.center/pricing.data')).toBe(
      '/data.center/pricing'
    );
  });

  it('leaves a pathname without the suffix unchanged', () => {
    expect(stripDataSuffix('/pricing')).toBe('/pricing');
  });

  it('leaves the root path unchanged', () => {
    expect(stripDataSuffix('/')).toBe('/');
  });
});

describe('isResourceRequest', () => {
  it('is true for an image Accept header', () => {
    expect(
      isResourceRequest(req('http://x/logo.png', { accept: 'image/png' }))
    ).toBe(true);
  });

  it('is true for a pathname under /assets/', () => {
    expect(isResourceRequest(req('http://x/assets/app.js'))).toBe(true);
  });

  it('is false for a document request (text/html)', () => {
    expect(
      isResourceRequest(req('http://x/pricing', { accept: 'text/html' }))
    ).toBe(false);
  });

  it('falls back to true for an unrecognized request', () => {
    expect(isResourceRequest(req('http://x/unknown'))).toBe(true);
  });
});

describe('isRedirectResponse', () => {
  it('is true for a 301', () => {
    expect(isRedirectResponse(new Response(null, { status: 301 }))).toBe(true);
  });

  it('is true for a 302', () => {
    expect(isRedirectResponse(new Response(null, { status: 302 }))).toBe(true);
  });

  it('is false for a 200', () => {
    expect(isRedirectResponse(new Response(null, { status: 200 }))).toBe(false);
  });

  it('is false for a 307 (a redirect status this check does not cover)', () => {
    expect(isRedirectResponse(new Response(null, { status: 307 }))).toBe(false);
  });
});

describe('isStaticRedirectFromConfig', () => {
  it('matches a redirect whose source is the exact pathname + search', async () => {
    const redirects = [{ source: '/old', destination: '/new' }];
    await expect(
      isStaticRedirectFromConfig(req('http://x/old'), redirects)
    ).resolves.toBe(true);
  });

  it('matches including the query string, mirroring req.originalUrl', async () => {
    const redirects = [{ source: '/old?ref=x', destination: '/new' }];
    await expect(
      isStaticRedirectFromConfig(req('http://x/old?ref=x'), redirects)
    ).resolves.toBe(true);
  });

  it('does not match a different path', async () => {
    const redirects = [{ source: '/old', destination: '/new' }];
    await expect(
      isStaticRedirectFromConfig(req('http://x/other'), redirects)
    ).resolves.toBe(false);
  });

  it('is false when there are no redirects configured', async () => {
    await expect(
      isStaticRedirectFromConfig(req('http://x/old'), [])
    ).resolves.toBe(false);
  });
});

describe('generateRandomPort', () => {
  it('returns a port within the documented [1024, 11023] range', () => {
    for (let i = 0; i < 50; i++) {
      const port = generateRandomPort();
      expect(port).toBeGreaterThanOrEqual(1024);
      expect(port).toBeLessThan(11024);
    }
  });
});

describe('extractMetaFromRRContext', () => {
  function makeContext(
    loaderData: StaticHandlerContext['loaderData']
  ): StaticHandlerContext {
    return {
      matches: [
        { route: { id: '0' } },
        { route: { id: '0-1' } },
      ] as unknown as StaticHandlerContext['matches'],
      loaderData,
    } as unknown as StaticHandlerContext;
  }

  it('pulls meta from both the leaf page and its layout, keyed by route id', () => {
    const context = makeContext({
      '0': { meta: { title: 'Layout title' } },
      '0-1': { meta: { title: 'Page title' } },
    });

    expect(extractMetaFromRRContext(context)).toEqual({
      page: { title: 'Page title' },
      layout: { title: 'Layout title' },
    });
  });

  it('defaults to empty meta objects when loaderData has nothing for a route id', () => {
    const context = makeContext({});

    expect(extractMetaFromRRContext(context)).toEqual({
      page: {},
      layout: {},
    });
  });
});

describe('extractHeadersFromRRContext', () => {
  function makeContext(options: {
    actionHeaders?: Headers;
    loaderHeaders?: Headers;
  }): StaticHandlerContext {
    return {
      matches: [
        { route: { id: 'leaf' } },
      ] as unknown as StaticHandlerContext['matches'],
      actionHeaders: options.actionHeaders
        ? { leaf: options.actionHeaders }
        : {},
      loaderHeaders: options.loaderHeaders
        ? { leaf: options.loaderHeaders }
        : {},
    } as unknown as StaticHandlerContext;
  }

  it('always sets a text/html Content-Type', () => {
    const headers = extractHeadersFromRRContext(makeContext({}));
    expect(headers.get('Content-Type')).toBe('text/html; charset=utf-8');
  });

  it('merges loader headers from the leaf match', () => {
    const loaderHeaders = new Headers({ 'x-custom': 'from-loader' });
    const headers = extractHeadersFromRRContext(makeContext({ loaderHeaders }));
    expect(headers.get('x-custom')).toBe('from-loader');
  });

  it('starts from the action headers, then appends loader headers', () => {
    const actionHeaders = new Headers({ 'set-cookie': 'a=1' });
    const loaderHeaders = new Headers({ 'set-cookie': 'b=2' });
    const headers = extractHeadersFromRRContext(
      makeContext({ actionHeaders, loaderHeaders })
    );

    expect(headers.get('set-cookie')).toContain('a=1');
    expect(headers.get('set-cookie')).toContain('b=2');
  });
});
