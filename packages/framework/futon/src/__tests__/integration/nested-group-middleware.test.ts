import { describe, it, expect } from 'vitest';
import { Router } from '../../router/index.js';
import type { Middleware } from '../../middlewares/index.js';
import { json } from '../../response/utils.js';
import { createContext } from '../../context/index.js';
import type { Context } from '../../context/types.js';

/**
 * Regression suite for the SubRouter.group() stack-restore bug: closing
 * a nested group truncated the parent middleware stack to the depth
 * OUTSIDE its enclosing group (`this.outerDepth`) instead of the depth
 * at its own entry — so the first route/subgroup kept its middleware
 * chain and every later sibling silently lost the enclosing layers
 * (controller middleware, module middleware, auth...).
 *
 * Every test asserts the middleware snapshot each route actually runs
 * with, by dispatching real requests through `router.middleware()`.
 */

/** Middleware that records its tag on the context. */
function tag(name: string): Middleware {
  return async (ctx, next) => {
    ((ctx.state.tags ??= []) as string[]).push(name);
    return next();
  };
}

/** Handler that reports which middleware tags ran for this request. */
const report = async (ctx: Context) =>
  json({ tags: (ctx.state.tags as string[]) ?? [] });

async function tagsFor(router: Router, path: string): Promise<string[]> {
  const ctx = createContext(new Request(`http://localhost${path}`));
  const response = await router.middleware()(ctx, () =>
    Promise.resolve(json({ tags: ['UNMATCHED'] }, { status: 404 }))
  );
  return ((await response.json()) as { tags: string[] }).tags;
}

describe('nested group middleware restoration', () => {
  it('every route in a nested group gets the full chain, not just the first', async () => {
    const router = new Router();
    router.group('/api', { middlewares: [tag('module')] }, (api) => {
      api.group({ middlewares: [tag('controller')] }, (ctrl) => {
        ctrl.get('/first', report);
        ctrl.get('/second', report);
        ctrl.get('/third', report);
      });
    });

    // Pre-fix: only /first got both layers.
    expect(await tagsFor(router, '/api/first')).toEqual([
      'module',
      'controller',
    ]);
    expect(await tagsFor(router, '/api/second')).toEqual([
      'module',
      'controller',
    ]);
    expect(await tagsFor(router, '/api/third')).toEqual([
      'module',
      'controller',
    ]);
  });

  it('sibling nested groups each keep the enclosing group middleware', async () => {
    // The registerControllers shape: one module group, one subgroup per
    // controller. Pre-fix, closing controller A's group wiped the module
    // middleware for controller B.
    const router = new Router();
    router.group('/mod', { middlewares: [tag('module')] }, (mod) => {
      mod.group({ middlewares: [tag('ctrlA')] }, (a) => {
        a.get('/a', report);
      });
      mod.group({ middlewares: [tag('ctrlB')] }, (b) => {
        b.get('/b', report);
      });
    });

    expect(await tagsFor(router, '/mod/a')).toEqual(['module', 'ctrlA']);
    expect(await tagsFor(router, '/mod/b')).toEqual(['module', 'ctrlB']);
  });

  it('a route after a per-route subgroup keeps the controller middleware', async () => {
    // The OrgController symptom: route 1 wrapped in its own subgroup
    // (e.g. route-level middleware), route 2 registered right after.
    // Pre-fix, route 2 lost the controller (error-mapper) middleware.
    const router = new Router();
    router.group('/org', { middlewares: [tag('errorMapper')] }, (ctrl) => {
      ctrl.group({ middlewares: [tag('routeOnly')] }, (r) => {
        r.get('/slug', report);
      });
      ctrl.get('/owner', report);
    });

    expect(await tagsFor(router, '/org/slug')).toEqual([
      'errorMapper',
      'routeOnly',
    ]);
    expect(await tagsFor(router, '/org/owner')).toEqual(['errorMapper']);
  });

  it('three-level nesting restores each level to its own entry depth', async () => {
    // Validates the entry-depth PROPAGATION half of the fix: a grandchild
    // inheriting the ancestral depth would re-introduce the bug one
    // level deeper.
    const router = new Router();
    router.group('/l1', { middlewares: [tag('one')] }, (l1) => {
      l1.group('/l2', { middlewares: [tag('two')] }, (l2) => {
        l2.group('/l3', { middlewares: [tag('three')] }, (l3) => {
          l3.get('/deep', report);
        });
        l2.get('/after-l3', report);
      });
      l1.get('/after-l2', report);
    });

    expect(await tagsFor(router, '/l1/l2/l3/deep')).toEqual([
      'one',
      'two',
      'three',
    ]);
    expect(await tagsFor(router, '/l1/l2/after-l3')).toEqual(['one', 'two']);
    expect(await tagsFor(router, '/l1/after-l2')).toEqual(['one']);
  });

  it('the stack is fully restored once all groups close', async () => {
    const router = new Router();
    router.group('/grouped', { middlewares: [tag('outer')] }, (g) => {
      g.group({ middlewares: [tag('inner')] }, (i) => {
        i.get('/in', report);
      });
    });
    router.get('/bare', report);

    expect(await tagsFor(router, '/grouped/in')).toEqual(['outer', 'inner']);
    // Pre-fix this held too (over-truncation), but guard the other
    // direction: nothing may LEAK out of closed groups either.
    expect(await tagsFor(router, '/bare')).toEqual([]);
  });

  it('runs layers outermost-first for every sibling', async () => {
    const order: string[] = [];
    const probe = (name: string): Middleware => {
      return async (_ctx, next) => {
        order.push(name);
        return next();
      };
    };

    const router = new Router();
    router.group('/x', { middlewares: [probe('module')] }, (mod) => {
      mod.group({ middlewares: [probe('controller')] }, (ctrl) => {
        ctrl.get('/one', report);
        ctrl.get('/two', report);
      });
    });

    await tagsFor(router, '/x/two');
    expect(order).toEqual(['module', 'controller']);
  });
});
