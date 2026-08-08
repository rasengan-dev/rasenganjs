import { Queue, JobRouter, type JobHandler } from '@rasenganjs/queue';

/**
 * Playground smoke test for @rasenganjs/queue: a route-triggered job
 * (see QueueController's POST /jobs/hello) plus a self-registered
 * repeating "tick" job, both processed by the in-memory adapter that
 * `createQueuePlugin()` defaults to when no `adapter` option is passed
 * (see src/main.ts) — no Redis involved.
 *
 * Trigger the one-shot job:
 *   curl -X POST localhost:3006/jobs/hello -H 'content-type: application/json' -d '{"name":"dilane"}'
 * then watch the server log for "[hello-queue] greeted <name> (job <id>)".
 *
 * The repeating job logs "[hello-queue] tick ..." once a second — proof
 * that `{ repeat: { every } }` + the plugin's sweeper actually promotes
 * and re-dispatches due jobs on a running server.
 */
export class HelloQueue extends Queue {
  name = 'hello';

  async onInit() {
    await this.add('tick', {}, { repeat: { every: 1_000 } });
  }

  jobs(router: JobRouter) {
    router.process('greet', this.greet);
    router.process('tick', this.tick);
  }

  greet: JobHandler<{ name: string }> = async (job) => {
    console.log(`[hello-queue] greeted ${job.data.name} (job ${job.id})`);
  };

  tick: JobHandler = async () => {
    console.log(`[hello-queue] tick ${new Date().toISOString()}`);
  };
}
