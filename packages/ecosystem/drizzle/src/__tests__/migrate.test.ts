import { describe, it, expect } from 'vitest';
import { runMigrations } from '../migrate.js';
import type { DrizzleAdapter } from '../adapter.js';

describe('runMigrations', () => {
  it('connects, migrates, and always closes — even a short-lived, separate connection from any running module', async () => {
    const calls: string[] = [];
    const adapter: DrizzleAdapter<
      { url: string },
      Record<string, unknown>,
      unknown
    > = {
      name: 'fake',
      connect() {
        calls.push('connect');
        return {
          db: {},
          close: async () => {
            calls.push('close');
          },
          migrate: async (migrationsFolder) => {
            calls.push(`migrate:${migrationsFolder}`);
          },
        };
      },
    };

    await runMigrations(adapter, { url: 'fake://' }, {}, '/migrations');

    expect(calls).toEqual(['connect', 'migrate:/migrations', 'close']);
  });

  it('closes the connection even when migrate() throws', async () => {
    const calls: string[] = [];
    const adapter: DrizzleAdapter<
      { url: string },
      Record<string, unknown>,
      unknown
    > = {
      name: 'fake',
      connect() {
        return {
          db: {},
          close: async () => {
            calls.push('close');
          },
          migrate: async () => {
            throw new Error('boom');
          },
        };
      },
    };

    await expect(
      runMigrations(adapter, { url: 'fake://' }, {}, '/migrations')
    ).rejects.toThrow(/boom/);
    expect(calls).toEqual(['close']);
  });
});
