import { describe, it, expect } from 'vitest';
import { defaultJobKey, stableStringify } from '../job-key.js';

describe('stableStringify', () => {
  it('produces the same string for identical data regardless of key order', () => {
    const a = stableStringify({ tenantId: '1', kind: 'digest' });
    const b = stableStringify({ kind: 'digest', tenantId: '1' });

    expect(a).toBe(b);
  });

  it('produces different strings for different data', () => {
    const a = stableStringify({ tenantId: '1' });
    const b = stableStringify({ tenantId: '2' });

    expect(a).not.toBe(b);
  });

  it('is stable across repeated calls with the same input', () => {
    const input = { a: 1, b: [1, 2, { c: 3 }] };
    expect(stableStringify(input)).toBe(stableStringify(input));
  });

  it('preserves array order (order is meaningful there)', () => {
    expect(stableStringify([1, 2, 3])).not.toBe(stableStringify([3, 2, 1]));
  });
});

describe('defaultJobKey', () => {
  it('derives the same key for identical name+data regardless of object key order', () => {
    const a = defaultJobKey('digest', { tenantId: '1', kind: 'weekly' });
    const b = defaultJobKey('digest', { kind: 'weekly', tenantId: '1' });

    expect(a).toBe(b);
  });

  it('derives different keys for different data payloads', () => {
    const a = defaultJobKey('digest', { tenantId: '1' });
    const b = defaultJobKey('digest', { tenantId: '2' });

    expect(a).not.toBe(b);
  });

  it('derives different keys for different names with the same data', () => {
    const a = defaultJobKey('digest', { tenantId: '1' });
    const b = defaultJobKey('summary', { tenantId: '1' });

    expect(a).not.toBe(b);
  });
});
