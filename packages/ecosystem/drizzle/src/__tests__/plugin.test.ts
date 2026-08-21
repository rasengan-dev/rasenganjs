import { describe, it, expect, beforeEach } from 'vitest';
import {
  ServerApp,
  defineModule,
  Controller,
  Provider,
} from '@rasenganjs/server';
import { DrizzleModule } from '../drizzle.module.js';
import { DataSource, __resetForTesting } from '../data-source.js';
import { createDrizzlePlugin } from '../plugin.js';
import type { DrizzleAdapter } from '../adapter.js';

interface FakeDb {
  source: string;
}

function fakeAdapter() {
  const calls: string[] = [];
  const adapter: DrizzleAdapter<
    { url: string },
    Record<string, unknown>,
    FakeDb
  > = {
    name: 'fake',
    connect(config) {
      calls.push(`connect:${config.url}`);
      return {
        db: { source: config.url },
        close: async () => {
          calls.push('close');
        },
        migrate: async () => {},
      };
    },
  };
  return { adapter, calls };
}

beforeEach(() => {
  __resetForTesting();
});

describe('createDrizzlePlugin() — D1-style resolver through DrizzleModule.forRoot()', () => {
  it('resolves the connection from the first request and reaches a controller through DataSource, running ahead of the matched handler', async () => {
    const { adapter, calls } = fakeAdapter();

    const dbModule = DrizzleModule.forRoot({
      adapter,
      connection: (ctx: { runtime: { env: Record<string, unknown> } }) => ({
        url: `resolved://${ctx.runtime.env.NAME}`,
      }),
      schema: {},
    });

    class Repository extends Provider {
      constructor(private readonly dataSource: DataSource<FakeDb>) {
        super();
      }
      read(): FakeDb {
        return this.dataSource.db;
      }
    }

    class TestController extends Controller {
      constructor(private readonly repository: Repository) {
        super();
      }
      routes(router: any) {
        router.get('/ping', (_ctx: any) =>
          Response.json(this.repository.read())
        );
      }
    }

    const app = new ServerApp();
    app.registerPlugin(createDrizzlePlugin());
    app.registerModule(
      defineModule({
        imports: [dbModule],
        controllers: [TestController],
        providers: [Repository],
      })
    );

    const runtime = app.compile();

    // Nothing connected yet, no request has landed.
    expect(calls).toEqual([]);

    const res = await runtime.fetch(new Request('http://localhost/ping'), {
      env: { NAME: 'from-first-request' },
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      source: 'resolved://from-first-request',
    });
    expect(calls).toEqual(['connect:resolved://from-first-request']);
  });

  it('throws at compile() time if the plugin was never registered, forRoot() used a resolver source, and no other plugin claims the key', () => {
    const { adapter } = fakeAdapter();
    const dbModule = DrizzleModule.forRoot({
      adapter,
      connection: () => ({ url: 'resolved://' }),
      schema: {},
    });

    const app = new ServerApp();
    app.registerModule(defineModule({ imports: [dbModule] }));

    expect(() => app.compile()).toThrow(/unknown key "drizzleConnection"/);
  });
});
