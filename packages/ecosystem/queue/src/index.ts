/**
 * @module @rasenganjs/queue
 *
 * Background job queues for Rasengan Server. A `Queue` is the
 * `Controller` equivalent for background work: declared in
 * `defineModule({ queues: [...] })` alongside HTTP controllers, resolved
 * through the same DI container, and registered via a `ModulePlugin` —
 * mirroring `@rasenganjs/ws`'s `Gateway` pattern exactly.
 *
 * ## Quick start
 * ```ts
 * // main.ts
 * import { bootstrap } from '@rasenganjs/server';
 * import { createQueuePlugin } from '@rasenganjs/queue';
 *
 * bootstrap((app) => {
 *   app.registerPlugin(createQueuePlugin());
 *   app.registerModule(appModule); // declares queues: [EmailQueue]
 * });
 *
 * // email.queue.ts
 * import { Queue, JobRouter, type JobHandler } from '@rasenganjs/queue';
 *
 * export class EmailQueue extends Queue {
 *   name = 'emails';
 *
 *   jobs(router: JobRouter) {
 *     router.process('welcome', this.sendWelcome, { attempts: 3, backoff: 5_000 });
 *   }
 *
 *   sendWelcome: JobHandler<{ userId: string }> = async (job) => {
 *     await mailer.sendWelcome(job.data.userId);
 *     // resolve -> completed; throw -> retry per policy -> dead-letter
 *   };
 * }
 * ```
 *
 * ## Semantics
 * At-least-once processing: resolve = complete, throw = retry with
 * exponential backoff until `attempts` is exhausted, then dead-letter
 * (inspectable via `queue.getDead()`, re-enqueueable via
 * `queue.retryDead(id)`). Handlers must be idempotent.
 *
 * ## Storage
 * `createQueuePlugin({ adapter })` accepts a `QueueAdapter` — the default
 * `MemoryQueueAdapter` is in-process and **loses jobs on restart**
 * (dev-only). `RedisQueueAdapter` persists across restarts and is safe
 * across multiple processes sharing one queue:
 * ```ts
 * import { RedisQueueAdapter } from '@rasenganjs/queue';
 * import Redis from 'ioredis';
 *
 * const client = new Redis();
 * const adapter = new RedisQueueAdapter({
 *   client,
 *   blockingClient: client.duplicate(), // reserve()'s BLMOVE needs its own connection
 * });
 * app.registerPlugin(createQueuePlugin({ adapter }));
 * ```
 *
 * ## Delayed and repeatable jobs
 * `queue.add(name, data, { delay })` defers a job; `queue.add(name,
 * data, { repeat: { every } })` registers a recurring job, idempotent
 * by `jobKey` (derived from `name`+`data`, or an explicit `repeat.key`)
 * — calling it again with the same spec doesn't create a duplicate
 * schedule. A sweeper (`createQueuePlugin({ sweepInterval })`) promotes
 * due delayed/repeat jobs and reclaims stalled reservations
 * (`stallTimeout`) on a timer.
 */

import './augment.js';

// ── Plugin (the module-system integration point) ───────────────────
export { createQueuePlugin } from './plugin.js';
export type { QueuePluginOptions } from './plugin.js';

// ── Queue ────────────────────────────────────────────────────────────
export { Queue, JobRouter } from './queue.js';
export type { QueueHandle, RegisteredJob } from './queue.js';

// ── Types ────────────────────────────────────────────────────────────
export type {
  AddJobOptions,
  Job,
  JobHandler,
  ProcessOptions,
  QueueAdapter,
  QueueClass,
  StoredJob,
} from './types.js';

// ── Adapters ─────────────────────────────────────────────────────────
export { MemoryQueueAdapter, RedisQueueAdapter } from './adapters/index.js';
export type { RedisLike, RedisQueueAdapterOptions } from './adapters/index.js';
