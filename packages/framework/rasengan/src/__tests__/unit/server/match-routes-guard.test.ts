import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createMatchRoutesGuard } from '../../../server/node/match-routes-guard.js';

let dir: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'rasengan-match-routes-guard-'));

  // Forces ESM interpretation for the plain `app.router.js` file the
  // middleware imports by that literal name (Node otherwise treats a
  // bare .js file as CommonJS without a nearby "type": "module").
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ type: 'module' }));

  // The root layout is scoped to "/app" (not "/") so that a path outside
  // that segment is genuinely unmatched by react-router's matchRoutes —
  // when the layout is "/", generateRoutes() always adds a catch-all "*"
  // child for the root router, which would match *every* path and make
  // the guard a no-op in this fixture.
  writeFileSync(
    join(dir, 'app.router.js'),
    `
    const Layout = () => null;
    Layout.path = '/app';

    const Home = () => null;
    Home.path = '/';

    const About = () => null;
    About.path = '/about';

    export default {
      layout: Layout,
      pages: [Home, About],
      routers: [],
      useParentLayout: true,
    };
    `
  );
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

function makeCtx(url: string) {
  return { request: new Request(url) } as any;
}

describe('createMatchRoutesGuard', () => {
  it('calls next() when the URL matches a real page route', async () => {
    const guard = createMatchRoutesGuard({
      build: { buildDirectory: dir, serverPathDirectory: '' } as any,
    });

    let nextCalled = false;
    const result = await guard(makeCtx('http://x/app/about'), async () => {
      nextCalled = true;
      return new Response('ok');
    });

    expect(nextCalled).toBe(true);
    expect(await (result as Response).text()).toBe('ok');
  });

  it('short-circuits with a 404 Response for a structurally unmatched URL', async () => {
    const guard = createMatchRoutesGuard({
      build: { buildDirectory: dir, serverPathDirectory: '' } as any,
    });

    let nextCalled = false;
    const result = (await guard(
      makeCtx('http://x/does-not-exist'),
      async () => {
        nextCalled = true;
        return new Response('ok');
      }
    )) as Response;

    expect(nextCalled).toBe(false);
    expect(result.status).toBe(404);
  });

  it('strips a ".data" suffix before matching, so a data request for a real page still matches', async () => {
    const guard = createMatchRoutesGuard({
      build: { buildDirectory: dir, serverPathDirectory: '' } as any,
    });

    let nextCalled = false;
    await guard(makeCtx('http://x/app/about.data'), async () => {
      nextCalled = true;
      return new Response('ok');
    });

    expect(nextCalled).toBe(true);
  });

  it('uses a pre-loaded router from `modules` instead of dynamic import (RFC-0009)', async () => {
    const Layout = () => null;
    (Layout as any).path = '/app';

    const About = () => null;
    (About as any).path = '/about';

    const appRouter = {
      layout: Layout,
      pages: [About],
      routers: [],
      useParentLayout: true,
    } as any;

    // Points at an empty directory with no app.router.js at all — proves
    // the guard never falls back to a dynamic import when `modules` is set.
    const guard = createMatchRoutesGuard({
      build: {
        buildDirectory: dir,
        serverPathDirectory: 'does-not-exist',
      } as any,
      modules: { appRouter },
    });

    let nextCalled = false;
    const matched = await guard(makeCtx('http://x/app/about'), async () => {
      nextCalled = true;
      return new Response('ok');
    });
    expect(nextCalled).toBe(true);
    expect(await (matched as Response).text()).toBe('ok');

    const unmatched = (await guard(
      makeCtx('http://x/does-not-exist'),
      async () => new Response('ok')
    )) as Response;
    expect(unmatched.status).toBe(404);
  });
});
