import { describe, it, expect, afterEach } from 'vitest';
import path from 'node:path';
import { resolvePath } from '../../../core/config/utils/path.js';

function withPlatform(platform: NodeJS.Platform, fn: () => void) {
  const original = Object.getOwnPropertyDescriptor(process, 'platform')!;
  Object.defineProperty(process, 'platform', { value: platform });
  try {
    fn();
  } finally {
    Object.defineProperty(process, 'platform', original);
  }
}

describe('resolvePath', () => {
  afterEach(() => {
    // withPlatform always restores via finally, this is just a safety net
  });

  it('on non-Windows, resolves to a normalized absolute OS path', () => {
    withPlatform('linux', () => {
      expect(resolvePath('./dist/server/api-router.js')).toBe(
        path.resolve(path.normalize('./dist/server/api-router.js'))
      );
    });
  });

  it('on Windows, returns a file:/// URL string instead of a bare path', () => {
    withPlatform('win32', () => {
      const result = resolvePath('C:\\project\\dist\\server\\api-router.js');
      expect(result.startsWith('file:///')).toBe(true);
    });
  });

  it('on Windows, normalizes the path before prefixing it', () => {
    withPlatform('win32', () => {
      const result = resolvePath('C:\\project\\..\\project\\file.js');
      expect(result).toBe(
        `file:///${path.normalize('C:\\project\\..\\project\\file.js')}`
      );
    });
  });
});
