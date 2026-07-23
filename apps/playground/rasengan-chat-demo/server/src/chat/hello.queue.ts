import { Queue, JobRouter, type JobHandler } from '@rasenganjs/queue';

/**
 * RFC-0004 Phase 2 dogfood: the simplest possible repeatable job —
 * ticks once a second, forever. Demonstrates `{ repeat: { every } }`
 * registration and its idempotency-by-jobKey (safe to call every boot
 * without creating a second recurring schedule).
 *
 * Self-registers in `onInit()` rather than requiring some other part
 * of the app to call `.add()` — `onInit()` runs after `plugin.register()`
 * has already wired `this.handle`, so calling `this.add()` here is safe.
 */
export class HelloQueue extends Queue {
  name = 'hello';

  async onInit() {
    await this.add('tick', {}, { repeat: { every: 1_000 } });
  }

  jobs(router: JobRouter) {
    router.process('tick', this.sayHello);
  }

  sayHello: JobHandler = async () => {
    console.log(`[hello-queue] Hello! ${new Date().toISOString()}`);
  };
}
