import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { zodAdapter } from '../adapters/zod.js';

describe('zodAdapter', () => {
  const schema = z.object({
    name: z.string().min(2).max(100),
    age: z.number().int().min(0),
  });

  it('parses valid data', () => {
    const result = zodAdapter.parse(schema, { name: 'Alice', age: 30 });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({ name: 'Alice', age: 30 });
    }
  });

  it('coerces and applies defaults', () => {
    const schemaWithDefault = z.object({
      name: z.string(),
      role: z.enum(['admin', 'user']).default('user'),
    });
    const result = zodAdapter.parse(schemaWithDefault, { name: 'Bob' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({ name: 'Bob', role: 'user' });
    }
  });

  it('returns errors for invalid data', () => {
    const result = zodAdapter.parse(schema, { name: 'A', age: -1 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]).toHaveProperty('path');
      expect(result.errors[0]).toHaveProperty('message');
    }
  });

  it('reports nested field errors', () => {
    const nested = z.object({
      address: z.object({
        city: z.string().min(1),
        zip: z.string().regex(/^\d{5}$/),
      }),
    });
    const result = zodAdapter.parse(nested, {
      address: { city: '', zip: 'abc' },
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.errors.map((e) => e.path.join('.'));
      expect(paths).toContain('address.city');
      expect(paths).toContain('address.zip');
    }
  });

  it('handles empty data', () => {
    const result = zodAdapter.parse(schema, {});
    expect(result.success).toBe(false);
  });

  it('handles null/undefined data', () => {
    const nullResult = zodAdapter.parse(schema, null);
    expect(nullResult.success).toBe(false);

    const undefinedResult = zodAdapter.parse(schema, undefined);
    expect(undefinedResult.success).toBe(false);
  });
});
