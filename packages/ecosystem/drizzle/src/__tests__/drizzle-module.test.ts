import { describe, it, expect, beforeEach } from 'vitest';
import { DrizzleModule } from '../drizzle.module.js';
import { DataSource, __resetForTesting } from '../data-source.js';
import type { DrizzleAdapter } from '../adapter.js';

interface FakeDb {
  queried: boolean;
}

interface FakeAdapterState {
  closeCalls: number;
  migrateCalls: string[];
}

function fakeAdapter(): {
  adapter: DrizzleAdapter<{ url: string }, Record<string, unknown>, FakeDb>;
  state: FakeAdapterState;
} {
  // NOT spread into the return value — that would copy closeCalls by
  // value at this point in time. Callers must read fixture.state.* live.
  const state: FakeAdapterState = { closeCalls: 0, migrateCalls: [] };
  const adapter: DrizzleAdapter<
    { url: string },
    Record<string, unknown>,
    FakeDb
  > = {
    name: 'fake',
    connect() {
      return {
        db: { queried: false },
        close: async () => {
          state.closeCalls++;
        },
        migrate: async (migrationsFolder) => {
          state.migrateCalls.push(migrationsFolder);
        },
      };
    },
  };
  return { adapter, state };
}

// vitest runs cases in a file sequentially by default (no parallel test
// execution within a single describe block), never concurrently — safe
// to reset the module-level singleton state before each case.
beforeEach(() => {
  __resetForTesting();
});

describe('DrizzleModule.forRoot() + DataSource', () => {
  it("DataSource.name is exactly 'DataSource' — DI-by-name contract", () => {
    const { adapter } = fakeAdapter();
    DrizzleModule.forRoot({
      adapter,
      connection: { url: 'fake://' },
      schema: {},
    });
    // A consuming app's repositories all declare
    // `constructor(private readonly dataSource: DataSource)` and rely on
    // rasengan-server's by-constructor-param-name DI resolution matching
    // this literal runtime name. If this assertion ever fails, every one
    // of those repositories silently breaks at boot, not at compile time.
    expect(DataSource.name).toBe('DataSource');
  });

  it(".db returns the adapter's connected db instance", () => {
    const { adapter } = fakeAdapter();
    DrizzleModule.forRoot({
      adapter,
      connection: { url: 'fake://' },
      schema: {},
    });
    const instance = new DataSource<FakeDb>();
    expect(instance.db).toEqual({ queried: false });
  });

  it("onDestroy() delegates to the adapter's close()", async () => {
    const fixture = fakeAdapter();
    DrizzleModule.forRoot({
      adapter: fixture.adapter,
      connection: { url: 'fake://' },
      schema: {},
    });
    const instance = new DataSource<FakeDb>();
    expect(fixture.state.closeCalls).toBe(0);
    await instance.onDestroy();
    expect(fixture.state.closeCalls).toBe(1);
  });

  it('module defaults to global: true, matching common convention', () => {
    const { adapter } = fakeAdapter();
    const module = DrizzleModule.forRoot({
      adapter,
      connection: { url: 'fake://' },
      schema: {},
    });
    expect(module.global).toBe(true);
  });

  it('global can be overridden to false', () => {
    const { adapter } = fakeAdapter();
    const module = DrizzleModule.forRoot({
      adapter,
      connection: { url: 'fake://' },
      schema: {},
      global: false,
    });
    expect(module.global).toBe(false);
  });

  it('forRoot() throws when called twice without an intervening reset', () => {
    const { adapter } = fakeAdapter();
    DrizzleModule.forRoot({
      adapter,
      connection: { url: 'fake://' },
      schema: {},
    });
    expect(() =>
      DrizzleModule.forRoot({
        adapter,
        connection: { url: 'fake://' },
        schema: {},
      })
    ).toThrow(/called more than once/);
  });

  it('resolving DataSource.db before any forRoot() throws a directed error, not a broken db', () => {
    // beforeEach already reset — no forRoot() call in this test at all.
    const instance = new DataSource<FakeDb>();
    expect(() => instance.db).toThrow(/forRoot\(\) must appear/);
  });

  it('a resolver-based connection (RFC-0014) declares the drizzleConnection module key', () => {
    const { adapter } = fakeAdapter();
    const module = DrizzleModule.forRoot({
      adapter,
      connection: () => ({ url: 'fake://from-resolver' }),
      schema: {},
    });
    expect(module.drizzleConnection).toBeDefined();
  });

  it('a static connection declares no drizzleConnection key at all', () => {
    const { adapter } = fakeAdapter();
    const module = DrizzleModule.forRoot({
      adapter,
      connection: { url: 'fake://' },
      schema: {},
    });
    expect(module.drizzleConnection).toBeUndefined();
  });

  it('resolving DataSource.db for a resolver-based connection, before the resolver has run, throws a distinct "waiting on the first request" error, not the "forRoot() never ran" one', () => {
    const { adapter } = fakeAdapter();
    DrizzleModule.forRoot({
      adapter,
      connection: () => ({ url: 'fake://from-resolver' }),
      schema: {},
    });
    const instance = new DataSource<FakeDb>();
    expect(() => instance.db).toThrow(/first incoming request/);
    expect(() => instance.db).not.toThrow(/forRoot\(\) must appear/);
  });
});
