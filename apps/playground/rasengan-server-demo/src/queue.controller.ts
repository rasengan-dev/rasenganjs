import { Controller, type RouteHandler, type Router } from '@rasenganjs/server';
import z from 'zod';
import { HelloQueue } from './hello.queue';

/**
 * HTTP trigger for the queue demo — proves the `.add()` -> worker loop
 * -> handler round trip end-to-end via server logs, without needing a
 * dedicated queue inspection API.
 */
export class QueueController extends Controller {
  schemas = {
    trigger: { body: z.object({ name: z.string() }) },
  } as const;

  constructor(private helloQueue: HelloQueue) {
    super();
  }

  routes(router: Router) {
    router.post('/jobs/hello', this.trigger, this.schemas.trigger);
  }

  trigger: RouteHandler<typeof this.schemas.trigger> = async (ctx) => {
    const jobId = await this.helloQueue.add('greet', { name: ctx.body.name });
    return ctx.res.json({ queued: true, jobId });
  };
}
