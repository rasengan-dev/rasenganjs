import { Provider } from '@rasenganjs/server';

import type {
  AddJobOptions,
  JobHandler,
  ProcessOptions,
  StoredJob,
} from './types.js';

/**
 * Producer surface wired onto `Queue.handle` by `createQueuePlugin()`
 * after the queue is resolved — never constructed by `Queue` itself.
 * Structurally the same shape as `Gateway.server` from `@rasenganjs/ws`.
 */
export interface QueueHandle {
  add(name: string, data: unknown, options?: AddJobOptions): Promise<string>;
  getDead(): Promise<StoredJob[]>;
  retryDead(id: string): Promise<void>;
}

/**
 * Base class for a background job queue — the `Controller` equivalent
 * for background work. Registered via `defineModule({ queues: [...] })`
 * (see `createQueuePlugin`), resolved through the same DI container as
 * HTTP controllers, so constructor injection works identically.
 *
 * Extends `Provider`: a queue is a real DI provider of its module —
 * `onInit()`/`onDestroy()` fire exactly like any other provider, and
 * `defineModule({ queues: [...], exports: [...] })` can export a queue
 * for another module to inject the same instance and call `.add()`.
 *
 * @example
 * ```ts
 * class EmailQueue extends Queue {
 *   name = 'emails';
 *   constructor(private mailer: MailerService) { super(); }
 *
 *   jobs(router: JobRouter) {
 *     router.process('welcome', this.sendWelcome, { attempts: 3, backoff: 5_000 });
 *   }
 *
 *   sendWelcome: JobHandler<{ userId: string }> = async (job) => {
 *     await this.mailer.sendWelcome(job.data.userId);
 *   };
 * }
 * ```
 */
export abstract class Queue extends Provider {
  /** This queue's name, e.g. `'emails'`. */
  abstract name: string;

  /**
   * Producer handle assigned by the plugin after this queue is resolved
   * — never construct this yourself (mirrors `Gateway.server`).
   */
  handle!: QueueHandle;

  /**
   * Declare this queue's job handlers, imperatively — mirrors
   * `Gateway.messages(router)` / `Controller.routes(router)`.
   */
  abstract jobs(router: JobRouter): void;

  /**
   * Enqueue a job. Resolves once the adapter has stored it, with the
   * job's id — except for a `{ repeat }` registration, where it
   * resolves with the recurring job's `jobKey` instead (the stable
   * identity `repeat` idempotency is keyed on, not a fresh random id).
   */
  add(name: string, data: unknown, options?: AddJobOptions): Promise<string> {
    return this.handle.add(name, data, options);
  }

  /** Jobs that exhausted their retry attempts. */
  getDead(): Promise<StoredJob[]> {
    return this.handle.getDead();
  }

  /** Move a dead-lettered job back to waiting, with `attempt` reset to 1. */
  retryDead(id: string): Promise<void> {
    return this.handle.retryDead(id);
  }
}

/** A registered job handler plus its resolved (defaulted) options. */
export interface RegisteredJob {
  handler: JobHandler;
  options: Required<ProcessOptions>;
}

/**
 * Collects a `Queue`'s job-name → handler map. Passed to `Queue.jobs()`
 * once per queue registration; `createQueuePlugin` consumes the result.
 */
export class JobRouter {
  private jobs = new Map<string, RegisteredJob>();

  /**
   * Register a handler for one job name.
   *
   * @throws If `name` is already registered on this queue.
   */
  process<T = unknown>(
    name: string,
    handler: JobHandler<T>,
    options: ProcessOptions = {}
  ): void {
    if (this.jobs.has(name)) {
      throw new Error(
        `[rasengan-queue] Job "${name}" is already registered on this queue.`
      );
    }
    this.jobs.set(name, {
      handler: handler as JobHandler,
      options: {
        attempts: options.attempts ?? 1,
        backoff: options.backoff ?? 0,
        concurrency: options.concurrency ?? 1,
      },
    });
  }

  /** @internal Consumed by `createQueuePlugin` after `Queue.jobs()` runs. */
  getJobs(): Map<string, RegisteredJob> {
    return this.jobs;
  }
}
