import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { Application } from '@rasenganjs/runtime';
import {
  Container,
  ServerRouter,
  ServerApp,
  defineModule,
} from '@rasenganjs/server';
import { NodeDevAdapter } from '@rasenganjs/runtime-node';

describe('Container', () => {
  it('resolves a class with no dependencies', () => {
    const c = new Container();
    class Foo {}
    c.register(Foo);
    const foo = c.resolve(Foo);
    assert(foo instanceof Foo);
  });

  it('resolves a singleton instance (same ref)', () => {
    const c = new Container();
    class Foo {}
    c.register(Foo);
    const a = c.resolve(Foo);
    const b = c.resolve(Foo);
    assert.strictEqual(a, b);
  });

  it('resolves constructor deps by parameter name matching', () => {
    const c = new Container();
    class DatabaseService {}
    class UserService {
      constructor(databaseService) {
        assert(databaseService instanceof DatabaseService);
      }
    }
    c.register(DatabaseService);
    c.register(UserService);
    const svc = c.resolve(UserService);
    assert(svc instanceof UserService);
  });

  it('resolves with explicit deps array', () => {
    const c = new Container();
    class Db {}
    class Users {
      constructor(db) {
        assert(db instanceof Db);
      }
    }
    c.register(Db);
    c.register({ provide: Users, deps: [Db] });
    const u = c.resolve(Users);
    assert(u instanceof Users);
  });

  it('resolves useValue tokens', () => {
    const c = new Container();
    c.register({ provide: 'CONFIG', useValue: { port: 3000 } });
    assert.deepEqual(c.resolve('CONFIG'), { port: 3000 });
  });

  it('throws for unresolvable dependency', () => {
    const c = new Container();
    class Foo {
      constructor(bar) {}
    }
    c.register(Foo);
    assert.throws(() => c.resolve(Foo), /Cannot resolve dependency/);
  });
});

describe('ServerRouter', () => {
  it('registers a GET route with context enhancement', async () => {
    const app = new Application();
    const router = new ServerRouter(app);

    router.get('/test', (ctx) => ctx.json({ ok: true }));

    const res = await app.fetch(new Request('http://localhost/test'));
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { ok: true });
  });

  it('provides ctx.text, ctx.html, ctx.redirect helpers', async () => {
    const app = new Application();
    const router = new ServerRouter(app);

    router.get('/text', (ctx) => ctx.text('hello'));
    router.get('/html', (ctx) => ctx.html('<h1>hi</h1>'));
    router.get('/redirect', (ctx) => ctx.redirect('/other'));

    const t = await app.fetch(new Request('http://localhost/text'));
    assert.equal(await t.text(), 'hello');

    const h = await app.fetch(new Request('http://localhost/html'));
    assert.match(h.headers.get('content-type'), /^text\/html/);

    const r = await app.fetch(
      new Request('http://localhost/redirect', { redirect: 'manual' })
    );
    assert.equal(r.status, 302);
    assert.equal(r.headers.get('location'), '/other');
  });
});

describe('ServerApp', () => {
  it('compiles modules and serves routes', async () => {
    class GreetController {
      routes(router) {
        router.get('/hello', (ctx) => ctx.json({ msg: 'hi' }));
      }
    }

    const sa = new ServerApp();
    sa.registerModule(
      defineModule({
        controllers: [GreetController],
      })
    );

    const app = sa.compile();
    const res = await app.fetch(new Request('http://localhost/hello'));
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { msg: 'hi' });
  });

  it('applies prefix from module', async () => {
    class UserCtrl {
      routes(router) {
        router.get('/', (ctx) => ctx.json({ ok: true }));
      }
    }

    const sa = new ServerApp();
    sa.registerModule(
      defineModule({
        prefix: '/api',
        controllers: [UserCtrl],
      })
    );

    const app = sa.compile();
    const res = await app.fetch(new Request('http://localhost/api'));
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { ok: true });
  });

  it('flattens imported sub-modules', async () => {
    class SubCtrl {
      routes(router) {
        router.get('/sub', (ctx) => ctx.json({ from: 'sub' }));
      }
    }
    class RootCtrl {
      routes(router) {
        router.get('/root', (ctx) => ctx.json({ from: 'root' }));
      }
    }

    const sub = defineModule({
      prefix: '/sub-mod',
      controllers: [SubCtrl],
    });
    const root = defineModule({
      imports: [sub],
      controllers: [RootCtrl],
    });

    const sa = new ServerApp();
    sa.registerModule(root);
    const app = sa.compile();

    const r1 = await app.fetch(new Request('http://localhost/root'));
    assert.equal(r1.status, 200);

    const r2 = await app.fetch(new Request('http://localhost/sub-mod/sub'));
    assert.equal(r2.status, 200);
    assert.deepEqual(await r2.json(), { from: 'sub' });
  });

  it('supports enableCors', async () => {
    class Ctrl {
      routes(router) {
        router.get('/', (ctx) => ctx.json({ ok: true }));
      }
    }

    const sa = new ServerApp();
    sa.registerModule(defineModule({ controllers: [Ctrl] }));
    sa.enableCors({ origin: 'https://example.com' });

    const app = sa.compile();
    const res = await app.fetch(
      new Request('http://localhost/', {
        headers: { origin: 'https://example.com' },
      })
    );
    assert.equal(
      res.headers.get('Access-Control-Allow-Origin'),
      'https://example.com'
    );
  });

  it('uses error and notFound handlers', async () => {
    class Ctrl {
      routes(router) {
        router.get('/ok', (ctx) => ctx.json({ ok: true }));
        router.get('/crash', () => {
          throw new Error('nope');
        });
      }
    }

    const sa = new ServerApp();
    sa.registerModule(defineModule({ controllers: [Ctrl] }));
    sa.onError((err) => new Response(err.message, { status: 500 }));
    sa.notFound(() => new Response('custom 404', { status: 404 }));

    const app = sa.compile();

    const r1 = await app.fetch(new Request('http://localhost/ok'));
    assert.equal(r1.status, 200);

    const r2 = await app.fetch(new Request('http://localhost/crash'));
    assert.equal(r2.status, 500);
    assert.equal(await r2.text(), 'nope');

    const r3 = await app.fetch(new Request('http://localhost/nope'));
    assert.equal(r3.status, 404);
    assert.equal(await r3.text(), 'custom 404');
  });
});

describe('bootstrap end-to-end', () => {
  let handle;
  let started;
  const PORT = 15351;

  before(async () => {
    const sa = new ServerApp();

    class Db {
      get() {
        return { conn: 'ok' };
      }
    }

    class MyCtrl {
      constructor(db) {
        this.db = db;
      }
      routes(router) {
        router.get('/status', (ctx) => ctx.json({ db: this.db.get() }));
      }
    }

    sa.registerModule(
      defineModule({
        controllers: [MyCtrl],
        providers: [Db],
      })
    );

    const app = sa.compile();
    const adapter = new NodeDevAdapter({ port: PORT });
    adapter.serve(app);
    started = true;
    await new Promise((r) => setTimeout(r, 200));

    handle = { close: () => adapter.close() };
  });

  after(() => {
    if (started) handle.close();
  });

  it('serves routes via real HTTP', async () => {
    const res = await globalThis.fetch(`http://localhost:${PORT}/status`);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { db: { conn: 'ok' } });
  });
});
