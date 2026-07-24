import type {
  ContainerView,
  ModuleConfig,
  ModulePlugin,
  ServerApp,
} from '@rasenganjs/server';

import {
  Queue,
  JobRouter,
  type QueueHandle,
  type RegisteredJob,
} from './queue.js';
import type {
  AddJobOptions,
  Job,
  QueueAdapter,
  QueueClass,
  StoredJob,
} from './types.js';
import { MemoryQueueAdapter } from './adapters/memory.js';
import { defaultJobKey } from './job-key.js';

export interface QueuePluginOptions {
  /**
   * Job storage shared by every queue this plugin registers. Defaults to
   * `MemoryQueueAdapter` (dev only — jobs are lost on restart). Pass a
   * `RedisQueueAdapter` (Phase 3) to persist across restarts.
   */
  adapter?: QueueAdapter;
  /**
   * Whether this process consumes jobs. Defaults to `true`. Pass `false`
   * for a produce-only process (`.add()` still works; nothing is ever
   * reserved/processed here) — deployment topology, not a code change.
   */
  worker?: boolean;
  /**
   * How long a reserved job may go without `complete()`/`fail()` before
   * the sweeper reclaims it as stalled (its worker presumed dead).
   * Defaults to `30_000`ms.
   */
  stallTimeout?: number;
  /**
   * How often the sweeper runs: promoting due delayed/repeat jobs and
   * reclaiming stalled reservations, for every queue this plugin
   * instance registers. Defaults to `5_000`ms.
   */
  sweepInterval?: number;
}

/** Default for `QueuePluginOptions.stallTimeout`. */
const DEFAULT_STALL_TIMEOUT_MS = 30_000;
/** Default for `QueuePluginOptions.sweepInterval`. */
const DEFAULT_SWEEP_INTERVAL_MS = 5_000;
/** Internal implementation detail — Phase 3 may replace polling with an adapter-specific blocking reserve. */
const WORKER_POLL_INTERVAL_MS = 25;

/**
 * Build the `ModulePlugin` that wires `defineModule({ queues: [...] })`
 * into a running worker loop. Register once at bootstrap time:
 *
 * ```ts
 * bootstrap((app) => {
 *   app.registerPlugin(createQueuePlugin());
 *   app.registerModule(appModule); // may declare queues: [EmailQueue]
 * });
 * ```
 */
export function createQueuePlugin(
  options: QueuePluginOptions = {}
): ModulePlugin {
  const adapter = options.adapter ?? new MemoryQueueAdapter();
  const worker = options.worker ?? true;
  const stallTimeout = options.stallTimeout ?? DEFAULT_STALL_TIMEOUT_MS;
  const sweepInterval = options.sweepInterval ?? DEFAULT_SWEEP_INTERVAL_MS;

  // Shared across every `register()` call this plugin instance
  // receives (multiple modules may each declare `queues: [...]`) — one
  // sweeper, not one per queue, iterating every queue name seen so far.
  const queueNames = new Set<string>();
  let sweeperStarted = false;

  return {
    key: 'queues',
    register(
      app: ServerApp,
      container: ContainerView,
      _mod: ModuleConfig,
      value: unknown
    ) {
      const queueClasses = value as QueueClass[];

      for (const queueClass of queueClasses) {
        const queueName = registerQueue(
          app,
          container,
          queueClass,
          adapter,
          worker,
          stallTimeout
        );
        queueNames.add(queueName);
      }

      // A produce-only process has nothing local to reclaim/promote —
      // the worker process sharing this adapter sweeps for it.
      if (worker && !sweeperStarted) {
        sweeperStarted = true;
        startSweeper(app, adapter, queueNames, sweepInterval);
      }
    },
    // Queue extends Provider — the array IS already a set of real DI
    // provider tokens, so compile() can register/export/eagerly-resolve
    // them exactly like a hand-declared provider.
    asProviders(value) {
      return value as QueueClass[];
    },
  };
}

function registerQueue(
  app: ServerApp,
  container: ContainerView,
  queueClass: QueueClass,
  adapter: QueueAdapter,
  worker: boolean,
  stallTimeout: number
): string {
  const instance = container.resolve(queueClass) as Queue;

  if (!(instance instanceof Queue)) {
    throw new Error(
      `[rasengan-queue] "${queueClass.name}" is registered under \`queues\` ` +
        `but does not extend \`Queue\`.`
    );
  }
  if (!instance.name) {
    throw new Error(
      `[rasengan-queue] Queue "${queueClass.name}" is missing a \`name\` (e.g. name = 'emails').`
    );
  }
  if (typeof instance.jobs !== 'function') {
    throw new Error(
      `[rasengan-queue] Queue "${queueClass.name}" is missing a \`jobs(router)\` method.`
    );
  }

  const router = new JobRouter();
  instance.jobs(router);
  const jobs = router.getJobs();

  const queueName = instance.name;
  instance.handle = createQueueHandle(queueName, adapter);

  if (worker) {
    startWorkerLoop(queueName, jobs, adapter, app, stallTimeout);
  }

  return queueName;
}

function createQueueHandle(
  queueName: string,
  adapter: QueueAdapter
): QueueHandle {
  return {
    async add(
      name: string,
      data: unknown,
      options?: AddJobOptions
    ): Promise<string> {
      if (options?.delay !== undefined && options?.repeat !== undefined) {
        throw new Error(
          '[rasengan-queue] ".add()" cannot combine `delay` and `repeat`.'
        );
      }

      const now = Date.now();

      if (options?.repeat) {
        const jobKey = options.repeat.key ?? defaultJobKey(name, data);
        const job: StoredJob = {
          id: jobKey,
          name,
          data,
          attempt: 1,
          enqueuedAt: now,
          repeat: { every: options.repeat.every, jobKey },
        };
        await adapter.add(queueName, job);
        // The stable jobKey, not a fresh id — the only channel to hand
        // the caller a reusable identity for this recurring job.
        return jobKey;
      }

      const id = crypto.randomUUID();
      const job: StoredJob = {
        id,
        name,
        data,
        attempt: 1,
        enqueuedAt: now,
        readyAt: options?.delay !== undefined ? now + options.delay : undefined,
      };
      await adapter.add(queueName, job);
      return id;
    },
    getDead(): Promise<StoredJob[]> {
      return adapter.getDead(queueName);
    },
    retryDead(id: string): Promise<void> {
      return adapter.retryDead(queueName, id);
    },
  };
}

/**
 * Poll-based reserve → dispatch → complete/fail loop for one queue.
 *
 * Started synchronously here (during `dispatchPlugins()`, i.e. at boot,
 * before `container.initAll()` runs) and stopped via `app.onDestroy()`
 * — mirroring `@rasenganjs/ws`'s heartbeat timer exactly. This is
 * deliberate, not incidental: `app.onDestroy()` handlers run in forward
 * order and are fully awaited *before* any `Provider.onDestroy()` fires
 * (`ServerApp.close()`), which is the only place "stop reserving, await
 * in-flight jobs" can run deterministically ahead of other providers'
 * cleanup — putting this in `Queue.onInit()`/`onDestroy()` instead would
 * make both start and stop timing depend on unrelated providers' own
 * lifecycle hooks.
 */
function startWorkerLoop(
  queueName: string,
  jobs: Map<string, RegisteredJob>,
  adapter: QueueAdapter,
  app: ServerApp,
  stallTimeout: number
): void {
  let stopped = false;
  const inFlightCount = new Map<string, number>();
  const readyBuffer: StoredJob[] = [];
  const inFlight = new Set<Promise<void>>();

  function hasCapacity(name: string): boolean {
    const entry = jobs.get(name);
    // No handler registered — always "has capacity": dispatch()
    // immediately routes it to dead-letter instead of buffering forever.
    if (!entry) return true;
    return (inFlightCount.get(name) ?? 0) < entry.options.concurrency;
  }

  function dispatch(stored: StoredJob): void {
    const entry = jobs.get(stored.name);
    if (!entry) {
      console.error(
        `[rasengan-queue] Queue "${queueName}" has no handler for job ` +
          `"${stored.name}" — moving to dead-letter.`
      );
      void adapter.fail(queueName, stored.id, {});
      return;
    }

    inFlightCount.set(stored.name, (inFlightCount.get(stored.name) ?? 0) + 1);
    const promise = runJob(stored, entry).finally(() => {
      inFlightCount.set(stored.name, (inFlightCount.get(stored.name) ?? 0) - 1);
      inFlight.delete(promise);
    });
    inFlight.add(promise);
  }

  async function runJob(
    stored: StoredJob,
    entry: RegisteredJob
  ): Promise<void> {
    const job: Job = {
      id: stored.id,
      name: stored.name,
      data: stored.data,
      attempt: stored.attempt,
      enqueuedAt: stored.enqueuedAt,
    };

    try {
      await entry.handler(job);
      await adapter.complete(queueName, stored.id);
    } catch {
      if (stored.attempt < entry.options.attempts) {
        const retryAt =
          Date.now() + entry.options.backoff * 2 ** (stored.attempt - 1);
        await adapter.fail(queueName, stored.id, { retryAt });
      } else {
        await adapter.fail(queueName, stored.id, {});
      }
    }
  }

  function drainBuffer(): void {
    for (let i = readyBuffer.length - 1; i >= 0; i--) {
      const stored = readyBuffer[i];
      if (hasCapacity(stored.name)) {
        readyBuffer.splice(i, 1);
        dispatch(stored);
      }
    }
  }

  async function tick(): Promise<void> {
    if (stopped) return;
    drainBuffer();

    const stored = await adapter.reserve(queueName, stallTimeout);
    if (!stored) return;

    if (hasCapacity(stored.name)) {
      dispatch(stored);
    } else {
      // Reserved for real (no other worker can double-dispatch it), just
      // queued locally until a slot frees up — see the module doc on
      // `QueueAdapter.reserve()` staying queue-wide, not name-scoped.
      readyBuffer.push(stored);
    }
  }

  const timer = setInterval(() => void tick(), WORKER_POLL_INTERVAL_MS);

  app.onDestroy(async () => {
    stopped = true;
    clearInterval(timer);
    await Promise.all(inFlight);
    // Anything still sitting in readyBuffer was reserved (stall
    // deadline ticking) but never dispatched. The sweeper (running in a
    // separate process, or restarted alongside this one) reclaims it
    // once its deadline passes — same path as any other stalled
    // reservation.
  });
}

/**
 * Periodic housekeeping: promotes due delayed/repeat jobs and reclaims
 * stalled reservations, for every queue this plugin instance has
 * registered so far. One timer per plugin instance, not one per queue.
 *
 * Same lifecycle discipline as `startWorkerLoop()` and, before it, ws's
 * heartbeat: started synchronously in `register()` (at boot), stopped
 * via `app.onDestroy()` — the only pass guaranteed to run forward-order
 * and fully awaited before any `Provider.onDestroy()` fires.
 */
function startSweeper(
  app: ServerApp,
  adapter: QueueAdapter,
  queueNames: Set<string>,
  sweepInterval: number
): void {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const queueName of queueNames) {
      void adapter.sweep(queueName, now);
    }
  }, sweepInterval);

  app.onDestroy(() => clearInterval(timer));
}
