import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  parseStackFrame,
  fetchSourceSnippet,
} from '../../../routing/error-overlay/stack-utils.js';

describe('parseStackFrame', () => {
  it('extracts file/line/column from a Chrome/V8-style frame', () => {
    const stack =
      'Error: boom\n    at Object.<anonymous> (/src/app/page.tsx:10:5)';
    expect(parseStackFrame(stack)).toEqual({
      file: '/src/app/page.tsx',
      line: 10,
      column: 5,
    });
  });

  it('skips the leading "Error:" header line', () => {
    const stack = 'Error: something failed\n    at /src/app/page.tsx:1:1';
    expect(parseStackFrame(stack)?.file).toBe('/src/app/page.tsx');
  });

  // Note: the implementation also strips a `?query`/`#hash` suffix from
  // the matched file group, but the regex requires the recognized
  // extension to sit *immediately* before `:line:col` — a query/hash
  // between them makes the whole match fail before that cleanup step
  // is ever reached, so there's no realistic stack string that exercises
  // it without also coincidentally ending the query/hash in one of the
  // recognized extensions. Not tested here for that reason.

  it('recognizes a variety of source file extensions', () => {
    for (const ext of [
      'ts',
      'tsx',
      'js',
      'jsx',
      'mjs',
      'mdx',
      'css',
      'json',
      'html',
    ]) {
      const stack = `at /src/file.${ext}:1:1`;
      expect(parseStackFrame(stack)?.file).toBe(`/src/file.${ext}`);
    }
  });

  it('returns null when no frame matches an absolute source file', () => {
    expect(parseStackFrame('at eval (native)')).toBeNull();
  });

  it('returns null for an empty stack', () => {
    expect(parseStackFrame('')).toBeNull();
  });

  it('finds the first matching frame when multiple are present', () => {
    const stack = [
      'Error: boom',
      '    at Inner (/src/inner.tsx:5:1)',
      '    at Outer (/src/outer.tsx:20:2)',
    ].join('\n');

    expect(parseStackFrame(stack)?.file).toBe('/src/inner.tsx');
  });
});

describe('fetchSourceSnippet', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns a snippet centered on the error line with the given context', async () => {
    const source = Array.from({ length: 10 }, (_, i) => `line ${i + 1}`).join(
      '\n'
    );

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        text: async () => source,
      })
    );

    const result = await fetchSourceSnippet('/src/app/page.tsx', 5, 2);

    expect(result).not.toBeNull();
    expect(result!.totalLines).toBe(10);
    // lines 3..7 (1-indexed) surround line 5 with 2 lines of context
    expect(result!.snippet.split('\n')).toEqual([
      'line 3',
      'line 4',
      'line 5',
      'line 6',
      'line 7',
    ]);
    expect(result!.errorLineIndex).toBe(2);
  });

  it('clamps the context window at the start of the file', async () => {
    const source = ['a', 'b', 'c', 'd'].join('\n');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, text: async () => source })
    );

    const result = await fetchSourceSnippet('/src/app/page.tsx', 1, 2);
    expect(result!.snippet.split('\n')).toEqual(['a', 'b', 'c']);
    expect(result!.errorLineIndex).toBe(0);
  });

  it('unwraps a Vite-transformed `export default "..."` string source', async () => {
    const wrapped = 'export default "line1\\nline2\\nline3"';
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, text: async () => wrapped })
    );

    const result = await fetchSourceSnippet('/src/app/page.tsx', 2, 1);
    expect(result!.snippet).toBe('line1\nline2\nline3');
  });

  it('returns null when the fetch response is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, text: async () => '' })
    );

    expect(await fetchSourceSnippet('/src/app/page.tsx', 1)).toBeNull();
  });

  it('returns null when fetch itself throws', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('network down'))
    );

    expect(await fetchSourceSnippet('/src/app/page.tsx', 1)).toBeNull();
  });

  it('requests the file with a ?raw suffix', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, text: async () => 'x' });
    vi.stubGlobal('fetch', fetchMock);

    await fetchSourceSnippet('/src/app/page.tsx', 1);

    expect(fetchMock).toHaveBeenCalledWith('/src/app/page.tsx?raw');
  });
});
