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

## 5. Delayed and repeatable jobs

Pass a third argument to `.add()`:

```ts
// Runs 24 hours from now instead of immediately.
await this.emailQueue.add(
  'followUp',
  { userId: user.id },
  { delay: 86_400_000 }
);

// Registered once at startup — safe to call every time your app boots.
await this.statsQueue.add('digest', {}, { repeat: { every: 3_600_000 } });
```

Repeat registration is **idempotent by `jobKey`**: calling `.add()`
again with the same job name and data (or the same explicit `key`)
does not create a second recurring schedule — so it's safe to call at
every boot rather than needing separate first-run logic. `jobKey`
defaults to a value derived from the job name and data; supply your own
if two repeat jobs would otherwise share both and need to stay distinct
(e.g. a per-tenant digest):

```ts
await this.statsQueue.add(
  'digest',
  { tenantId },
  { repeat: { every: 3_600_000, key: `digest:${tenantId}` } }
);
```

For a `{ repeat }` registration, `.add()` resolves with the `jobKey`
(not a random id) — that's the identity you'd use to reason about or
remove that schedule going forward. `delay` and `repeat` can't be
combined in the same call.

## Plugin options

```ts
createQueuePlugin({
  adapter?: QueueAdapter;  // default: MemoryQueueAdapter (dev only)
  worker?: boolean;        // default: true
  stallTimeout?: number;   // default: 30_000
  sweepInterval?: number;  // default: 5_000
});
```

- **`stallTimeout`** — how long a reserved job may go unacknowledged
  (no `complete()`/`fail()`) before it's presumed abandoned by a dead
  worker and returned to the queue, with its attempt count incremented.
- **`sweepInterval`** — how often the plugin checks for delayed/repeat
  jobs that have become due and reservations that have stalled, across
  every queue it registers.

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

`@rasenganjs/queue` has shipped Phase 1 (Core) and Phase 2 (Time) of
its RFC:

- Only `MemoryQueueAdapter` ships today — in-process, and **all jobs
  (including delayed/repeat schedules) are lost on restart**. A
  persisted (Redis) adapter satisfying the same `QueueAdapter` contract
  is planned next.
- A handler that consistently outlives `stallTimeout` can be reclaimed
  and reprocessed indefinitely — stalled-job reclaim doesn't consult
  `attempts`/dead-letter (matches the underlying job lifecycle model;
  see [ARCHITECTURE.md](./ARCHITECTURE.md) for why).

See `proposals/RFC-0004-Background-Job-Queues.md` in the monorepo for
the full roadmap, and [ARCHITECTURE.md](./ARCHITECTURE.md) for how the
package works internally.

## License

MIT
