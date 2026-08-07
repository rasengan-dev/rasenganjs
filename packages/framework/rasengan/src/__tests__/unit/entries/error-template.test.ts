import { describe, it, expect } from 'vitest';
import { renderErrorPage } from '../../../entries/server/error-template.js';

describe('renderErrorPage', () => {
  it('embeds the error message, name and stack as a serialized window global', () => {
    const error = new Error('boom');
    error.name = 'CustomError';

    const html = renderErrorPage(error);

    expect(html).toContain('window.__RASENGAN_SSR_ERROR__');
    expect(html).toContain('"message":"boom"');
    expect(html).toContain('"name":"CustomError"');
    expect(html).toContain(JSON.stringify(error.stack));
  });

  it('falls back to a plain string message and undefined stack/name for a non-Error throw', () => {
    const html = renderErrorPage('just a string');

    expect(html).toContain('"message":"just a string"');
    expect(html).toContain('"name":"Error"');
    expect(html).not.toContain('"stack":"');
  });

  it('renders a full HTML document (doctype-prefixed, from renderToString)', () => {
    const html = renderErrorPage(new Error('x'));
    expect(html.startsWith('<!DOCTYPE html>')).toBe(true);
    expect(html).toContain('<html');
  });

  it('includes a client bootstrap script pointing at /src/index', () => {
    const html = renderErrorPage(new Error('x'));
    expect(html).toContain('src="/src/index"');
  });
});
