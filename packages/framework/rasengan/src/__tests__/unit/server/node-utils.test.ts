import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  filterRoutesForPrerender,
  convertSecondsToMinutes,
  logRenderedPagesGrouped,
} from '../../../server/node/utils.js';

describe('filterRoutesForPrerender', () => {
  it('matches an exact static route', () => {
    expect(
      filterRoutesForPrerender(['/about'], ['/about', '/contact'])
    ).toEqual(['/*', '/about']);
  });

  it('matches a wildcard "**" pattern against any deeper path', () => {
    const result = filterRoutesForPrerender(
      ['/blog/**'],
      ['/blog/a', '/blog/b/c', '/about']
    );
    expect(result).toEqual(['/*', '/blog/a', '/blog/b/c']);
  });

  it('always appends the "/*" catch-all and dedupes/sorts the result', () => {
    const result = filterRoutesForPrerender(['/a', '/a'], ['/a']);
    expect(result).toEqual(['/*', '/a']);
  });

  it('excludes pages that match no pattern', () => {
    const result = filterRoutesForPrerender(['/about'], ['/about', '/other']);
    expect(result).not.toContain('/other');
  });
});

describe('convertSecondsToMinutes', () => {
  it('formats sub-second durations in milliseconds', () => {
    expect(convertSecondsToMinutes(0.5)).toBe('500ms');
  });

  it('formats durations under a minute in seconds', () => {
    expect(convertSecondsToMinutes(12.345)).toBe('12.35s');
  });

  it('formats durations of a minute or more as "Xm Ys"', () => {
    expect(convertSecondsToMinutes(125)).toBe('2m 5.00s');
  });

  it('formats exactly 60 seconds as "1m 0.00s"', () => {
    expect(convertSecondsToMinutes(60)).toBe('1m 0.00s');
  });
});

describe('logRenderedPagesGrouped', () => {
  const tempDirs: string[] = [];

  afterEach(() => {
    while (tempDirs.length) {
      rmSync(tempDirs.pop()!, { recursive: true, force: true });
    }
  });

  it('reads real files and completes without throwing', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'rasengan-log-pages-'));
    tempDirs.push(dir);

    const file = join(dir, 'index.html');
    writeFileSync(file, '<html></html>');

    await expect(logRenderedPagesGrouped([file])).resolves.toBeUndefined();
  });

  it('logs an error and continues when a file cannot be read, instead of throwing', async () => {
    await expect(
      logRenderedPagesGrouped(['/does/not/exist.html'])
    ).resolves.toBeUndefined();
  });
});
