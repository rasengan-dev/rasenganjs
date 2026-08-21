import { describe, it, expect } from 'vitest';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import type { AnyD1Database } from 'drizzle-orm/d1';
import { d1Adapter } from '../drivers/d1.js';

const users = sqliteTable('users', {
  id: text('id').primaryKey(),
});
const schema = { users };

// drizzle-orm/d1's own drizzle() only stores the client in its session,
// it never calls a method on it eagerly — a bare object is enough to
// exercise connect() without standing up a real D1 binding.
const fakeBinding = {} as unknown as AnyD1Database;

describe('d1Adapter()', () => {
  it('connect() wraps drizzle-orm/d1 against the given binding', () => {
    const adapter = d1Adapter<typeof schema>();
    const result = adapter.connect(fakeBinding, schema);

    expect(adapter.name).toBe('d1');
    expect(result.db).toBeDefined();
    expect(typeof result.db.select).toBe('function');
  });

  it('close() is a no-op, resolves without touching the binding', async () => {
    const adapter = d1Adapter<typeof schema>();
    const result = adapter.connect(fakeBinding, schema);

    await expect(result.close()).resolves.toBeUndefined();
  });

  it('migrate() refuses and points at wrangler d1 migrations', async () => {
    const adapter = d1Adapter<typeof schema>();
    const result = adapter.connect(fakeBinding, schema);

    await expect(result.migrate('/migrations')).rejects.toThrow(
      /wrangler d1 migrations apply/
    );
  });
});
