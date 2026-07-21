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
import type { Job, QueueAdapter, QueueClass, StoredJob } from './types.js';
import { MemoryQueueAdapter } from './adapters/memory.js';

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
}

/** Passed to `reserve()` — Phase 1 doesn't reclaim stalled jobs yet, so this is inert. */
const DEFAULT_STALL_TIMEOUT_MS = 30_000;
/** Internal implementation detail — Phase 2/3 may replace polling with an adapter-specific blocking reserve. */
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
        registerQueue(app, container, queueClass, adapter, worker);
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
  worker: boolean
): void {
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
    startWorkerLoop(queueName, jobs, adapter, app);
  }
}

function createQueueHandle(
  queueName: string,
  adapter: QueueAdapter
): QueueHandle {
  return {
    async add(name: string, data: unknown): Promise<string> {
      const id = crypto.randomUUID();
      const job: StoredJob = {
        id,
        name,
        data,
        attempt: 1,
        enqueuedAt: Date.now(),
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
  app: ServerApp
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

    const stored = await adapter.reserve(queueName, DEFAULT_STALL_TIMEOUT_MS);
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
    // Anything still sitting in readyBuffer was reserved (visibility
    // deadline ticking) but never dispatched. Phase 1 ships no sweep()/
    // stall-reclaim — recovering it is Phase 2's job, same as any other
    // stalled reservation elsewhere.
  });
}
