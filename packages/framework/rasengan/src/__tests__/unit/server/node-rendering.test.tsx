import { describe, it, expect, afterEach, vi } from 'vitest';
import {
  renderToStream,
  renderToString,
} from '../../../server/node/rendering.js';

const originalNodeEnv = process.env.NODE_ENV;

afterEach(() => {
  process.env.NODE_ENV = originalNodeEnv;
});

describe('renderToString', () => {
  it('renders a component to an HTML string prefixed with a doctype', () => {
    const html = renderToString(<div>hello</div>);
    expect(html.startsWith('<!DOCTYPE html>\n')).toBe(true);
    expect(html).toContain('<div>hello</div>');
  });
});

describe('renderToStream', () => {
  it('renders a component to a streamed 200 Response by default', async () => {
    const response = await renderToStream(<div>streamed</div>);

    expect(response).toBeInstanceOf(Response);
    expect(response.status).toBe(200);

    const body = await response.text();
    expect(body).toContain('streamed');
  });

  it('honors a custom statusCode and response headers', async () => {
    const response = await renderToStream(<div>x</div>, {
      statusCode: 404,
      responseHeaders: { 'x-custom': 'yes' },
    });

    expect(response.status).toBe(404);
    expect(response.headers.get('x-custom')).toBe('yes');
  });

  it('rejects when the component throws before the shell is ready', async () => {
    function Boom(): never {
      throw new Error('boom');
    }

    await expect(renderToStream(<Boom />)).rejects.toThrow();
  });
});
