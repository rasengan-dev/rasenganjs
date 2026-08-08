import { describe, it, expect } from 'vitest';
import {
  parseJson,
  parseUrlEncoded,
  parseFormData,
  parseText,
  parseBody,
} from '../../../request/body.js';

describe('parseJson', () => {
  it('parses JSON body', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ a: 1, b: 2 }),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await parseJson(req);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('returns undefined for empty body', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: '',
    });
    const result = await parseJson(req);
    expect(result).toBeUndefined();
  });

  it('throws for invalid JSON', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: 'not-json',
    });
    await expect(parseJson(req)).rejects.toThrow();
  });
});

describe('parseUrlEncoded', () => {
  it('parses URL-encoded body', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: 'foo=bar&baz=qux',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    const result = await parseUrlEncoded(req);
    expect(result).toEqual({ foo: 'bar', baz: 'qux' });
  });

  it('decodes URL-encoded values', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: 'name=hello%20world',
    });
    const result = await parseUrlEncoded(req);
    expect(result).toEqual({ name: 'hello world' });
  });

  it('handles empty body', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: '',
    });
    const result = await parseUrlEncoded(req);
    expect(result).toEqual({});
  });
});

describe('parseFormData', () => {
  it('parses FormData body', async () => {
    const form = new FormData();
    form.append('name', 'Alice');
    form.append('file', new Blob(['content']), 'test.txt');

    const req = new Request('http://localhost', {
      method: 'POST',
      body: form,
    });
    const result = await parseFormData(req);
    expect(result.get('name')).toBe('Alice');
    expect(result.get('file')).toBeInstanceOf(File);
  });
});

describe('parseText', () => {
  it('returns the body as text', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: 'plain text',
    });
    const result = await parseText(req);
    expect(result).toBe('plain text');
  });

  it('returns empty string for empty body', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: '',
    });
    const result = await parseText(req);
    expect(result).toBe('');
  });
});

describe('parseBody', () => {
  it('parses application/json', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ key: 'val' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await parseBody(req);
    expect(result).toEqual({ key: 'val' });
  });

  it('parses application/x-www-form-urlencoded', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: 'a=1&b=2',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    const result = await parseBody(req);
    expect(result).toEqual({ a: '1', b: '2' });
  });

  it('parses multipart/form-data', async () => {
    const form = new FormData();
    form.append('field', 'value');
    const req = new Request('http://localhost', {
      method: 'POST',
      body: form,
    });
    const result = await parseBody(req);
    expect(result).toBeInstanceOf(FormData);
    expect((result as FormData).get('field')).toBe('value');
  });

  it('defaults to text for unknown content types', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: 'raw text',
      headers: { 'Content-Type': 'application/octet-stream' },
    });
    const result = await parseBody(req);
    expect(result).toBe('raw text');
  });

  it('treats missing content-type as text', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: 'plain',
    });
    const result = await parseBody(req);
    expect(result).toBe('plain');
  });
});
