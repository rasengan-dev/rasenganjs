# @rasenganjs/queue

Background job queues for Rasengan Server: declare a queue like a
controller, inject it anywhere DI reaches, and process jobs in the
background with retries, backoff, and dead-lettering.

## Installation

```bash
pnpm add @rasenganjs/queue
```

`@rasenganjs/server` is a peer dependency — install it if your project
doesn't already have it:

```bash
pnpm add @rasenganjs/server
```

## 1. Register the plugin

`createQueuePlugin()` claims the `queues` key on `defineModule()`.
Register it once, in `bootstrap()`, before registering your app module:

```ts
// main.ts
import { bootstrap } from '@rasenganjs/server';
import { createQueuePlugin } from '@rasenganjs/queue';
import appModule from './app.module.js';

bootstrap((app) => {
  app.registerPlugin(createQueuePlugin());
  app.registerModule(appModule);
});
```

## 2. Define a queue

A `Queue` subclass declares its name and its job handlers. Constructor
injection works exactly like a `Controller`:

```ts
// email.queue.ts
import { Queue, JobRouter, type JobHandler } from '@rasenganjs/queue';
import { MailerService } from './mailer.service.js';

export class EmailQueue extends Queue {
  name = 'emails';

  constructor(private mailer: MailerService) {
    super();
  }

  jobs(router: JobRouter) {
    router.process('welcome', this.sendWelcome, {
      attempts: 3, // total tries before dead-letter
      backoff: 5_000, // base delay in ms — doubles per retry
      concurrency: 5, // parallel jobs of this name, per worker
    });
  }

  sendWelcome: JobHandler<{ userId: string }> = async (job) => {
    await this.mailer.sendWelcome(job.data.userId);
    // Resolve → job completes. Throw → retried per the options above,
    // then dead-lettered once attempts are exhausted.
  };
}
```

## 3. Register the queue in your module

```ts
// email.module.ts
import { defineModule } from '@rasenganjs/server';
import { EmailQueue } from './email.queue.js';
import { MailerService } from './mailer.service.js';

export default defineModule({
  queues: [EmailQueue],
  providers: [MailerService, EmailQueue],
  exports: [EmailQueue], // so other modules can inject it too
});
```

## 4. Enqueue jobs

Inject the queue anywhere the DI container reaches — a controller, a
gateway, another provider — and call `.add()`:

```ts
// signup.controller.ts
import { Controller, type RouteHandler, type Router } from '@rasenganjs/server';
import { EmailQueue } from './email.queue.js';

export class SignupController extends Controller {
  constructor(private emailQueue: EmailQueue) {
    super();
  }

  routes(router: Router) {
    router.post('/signup', this.register);
  }

  register: RouteHandler = async (ctx) => {
    const user = await createUser(ctx.body);
    await this.emailQueue.add('welcome', { userId: user.id });
    return ctx.res.json({ ok: true });
  };
}
```

## Plugin options

```ts
createQueuePlugin({
  adapter?: QueueAdapter; // default: MemoryQueueAdapter (dev only)
  worker?: boolean;       // default: true
});
```

- **`adapter`** — job storage. Defaults to `MemoryQueueAdapter`, which
  is in-process and **loses all jobs on restart** — fine for local
  development, not for production. Pass a persisted adapter once one is
  available for your backend.
- **`worker`** — whether this process consumes jobs. Set to `false` for
  a produce-only process (e.g. your web servers enqueue jobs; a
  separate deployment with `worker: true` and the same adapter actually
  processes them):

  ```ts
  // Web process — enqueues only.
  app.registerPlugin(createQueuePlugin({ adapter, worker: false }));

  // Worker process — same adapter, actually processes jobs.
  app.registerPlugin(createQueuePlugin({ adapter, worker: true }));
  ```

## `router.process()` options

```ts
router.process(jobName, handler, {
  attempts?: number;   // default: 1 (no retry)
  backoff?: number;    // default: 0 (ms — doubles per retry attempt)
  concurrency?: number; // default: 1 (in-flight calls per job name)
});
```

## Inspecting and retrying failed jobs

```ts
const dead = await this.emailQueue.getDead();
await this.emailQueue.retryDead(dead[0].id);
```

## Current limitations

This is the Core (Phase 1) release of `@rasenganjs/queue`:

- No delayed jobs (`{ delay }`) or repeatable jobs (`{ repeat }`) yet —
  `.add(name, data)` takes no options.
- No stalled-job reclaim — a job reserved by a worker that crashes
  mid-task stays reserved.
- Only `MemoryQueueAdapter` ships today (dev-only, in-process).

See `proposals/RFC-0004-Background-Job-Queues.md` in the monorepo for
the full roadmap, and [ARCHITECTURE.md](./ARCHITECTURE.md) for how the
package works internally.

## License

MIT
