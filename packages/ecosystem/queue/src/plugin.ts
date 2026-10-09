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
   * How long a reservation outlives its worker: the sweeper reclaims a
   * reserved job whose worker stopped renewing its lease for this long
   * (RFC-0017; the worker renews every `stallTimeout / 3` while the job
   * is buffered or running). With an adapter that has no `extend()`, it
   * bounds the job's whole reserved lifetime instead. Defaults to
   * `30_000`ms.
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
  const errors = createAdapterErrorLog();

  // RFC-0017: an adapter written before it keeps the old semantics; say so once.
  if (worker && !adapter.extend) {
    console.warn(
      '[rasengan-queue] Adapter does not implement extend() — stallTimeout bounds ' +
        "each job's total reserved lifetime (pre-RFC-0017 semantics)."
    );
  }
  if (worker && !adapter.release) {
    console.warn(
      "[rasengan-queue] Adapter does not implement release() — a stopped worker's " +
        'unstarted jobs wait stallTimeout for the sweeper (pre-RFC-0017 semantics).'
    );
  }

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
          stallTimeout,
          errors
        );
        queueNames.add(queueName);
      }

      // A produce-only process has nothing local to reclaim/promote —
      // the worker process sharing this adapter sweeps for it.
      if (worker && !sweeperStarted) {
        sweeperStarted = true;
        startSweeper(app, adapter, queueNames, sweepInterval, errors);
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
  stallTimeout: number,
  errors: AdapterErrorLog
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
    startWorkerLoop(queueName, jobs, adapter, app, stallTimeout, errors);
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
 * (`ServerApp.close()`), which is the only place "stop reserving, release
 * what never started, await in-flight jobs" can run deterministically
 * ahead of other providers' cleanup — putting this in
 * `Queue.onInit()`/`onDestroy()` instead would make both start and stop
 * timing depend on unrelated providers' own lifecycle hooks.
 *
 * RFC-0017:
 * - §1 it reserves only while `inFlight + buffered < Σ concurrency`, so
 *   a worker never holds more than it can run, and a queue with one job
 *   name never buffers;
 * - §2 it renews the stall deadline of everything it holds (buffered or
 *   running) every `stallTimeout / 3`, when the adapter has `extend()`;
 * - §3 the buffer drains oldest first;
 * - §4 on stop, it releases what it reserved but never started before
 *   waiting for what's running, when the adapter has `release()`;
 * - §5 no adapter call it makes can become an unhandled rejection.
 */
function startWorkerLoop(
  queueName: string,
  jobs: Map<string, RegisteredJob>,
  adapter: QueueAdapter,
  app: ServerApp,
  stallTimeout: number,
  errors: AdapterErrorLog
): void {
  let stopped = false;
  const inFlightCount = new Map<string, number>();
  let inFlightTotal = 0;
  const readyBuffer: StoredJob[] = [];
  const inFlight = new Set<Promise<void>>();
  /** Ids reserved by this loop and not yet acked: what the heartbeat renews. */
  const held = new Set<string>();
  // A queue with no handler never reserves: the RFC-0016 footgun (a
  // producer-only `Queue` dead-lettering its own jobs) can't happen.
  const totalConcurrency = [...jobs.values()].reduce(
    (sum, entry) => sum + entry.options.concurrency,
    0
  );

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
      held.delete(stored.id);
      adapter.fail(queueName, stored.id, {}).then(
        () => errors.succeeded(queueName, 'fail'),
        (error: unknown) => errors.failed(queueName, 'fail', error)
      );
      return;
    }

    inFlightCount.set(stored.name, (inFlightCount.get(stored.name) ?? 0) + 1);
    inFlightTotal++;
    const promise = runJob(stored, entry).finally(() => {
      inFlightCount.set(stored.name, (inFlightCount.get(stored.name) ?? 0) - 1);
      inFlightTotal--;
      inFlight.delete(promise);
    });
    inFlight.add(promise);
  }

  /**
   * Never rejects. The handler and the ack are kept apart: a `complete()`
   * that fails after a successful handler isn't a handler failure, and
   * must not schedule a retry of work that succeeded.
   */
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

    let handlerFailed = false;
    try {
      await entry.handler(job);
    } catch {
      handlerFailed = true;
    }

    const operation = handlerFailed ? 'fail' : 'complete';
    try {
      if (!handlerFailed) {
        await adapter.complete(queueName, stored.id);
      } else if (stored.attempt < entry.options.attempts) {
        const retryAt =
          Date.now() + entry.options.backoff * 2 ** (stored.attempt - 1);
        await adapter.fail(queueName, stored.id, { retryAt });
      } else {
        await adapter.fail(queueName, stored.id, {});
      }
      errors.succeeded(queueName, operation);
    } catch (error) {
      // The job stays active. Stop renewing it, so the sweeper reclaims
      // it after `stallTimeout`: at-least-once, as documented.
      errors.failed(queueName, operation, error);
    } finally {
      held.delete(stored.id);
    }
  }

  /** Oldest first (RFC-0017 §3): reservation order is enqueue order. */
  function drainBuffer(): void {
    for (let i = 0; i < readyBuffer.length;) {
      const stored = readyBuffer[i];
      if (hasCapacity(stored.name)) {
        readyBuffer.splice(i, 1);
        dispatch(stored);
      } else {
        i++;
      }
    }
  }

  // `setInterval` doesn't await `tick()`, so without this guard a
  // `reserve()` slower than the poll interval stacks up without bound.
  // `RedisQueueAdapter.reserve()` is a `BLMOVE` blocking up to 20ms on a
  // connection every queue shares: with three queues that's 120 calls/s
  // against ~50/s of capacity, and the surplus piles up as pending
  // ioredis commands until the heap runs out. Also what `onDestroy`
  // awaits, so a reservation that lands after the stop is released.
  let reserving: Promise<void> | null = null;

  function tick(): void {
    if (stopped) return;
    drainBuffer();
    if (reserving) return;
    // RFC-0017 §1: never hold more than this process can run.
    if (inFlightTotal + readyBuffer.length >= totalConcurrency) return;
    reserving = reserveOne().finally(() => {
      reserving = null;
    });
  }

  async function reserveOne(): Promise<void> {
    let stored: StoredJob | null;
    try {
      stored = await adapter.reserve(queueName, stallTimeout);
      errors.succeeded(queueName, 'reserve');
    } catch (error) {
      // At shutdown a closed connection is expected, not worth a line.
      if (!stopped) errors.failed(queueName, 'reserve', error);
      return;
    }
    if (!stored) return;
    held.add(stored.id);

    if (!stopped && hasCapacity(stored.name)) {
      dispatch(stored);
    } else {
      // Reserved for real, its lease renewed while it waits for a slot
      // (or, after the stop, until `onDestroy` releases it) — see the
      // module doc on `QueueAdapter.reserve()` staying queue-wide, not
      // name-scoped.
      readyBuffer.push(stored);
    }
  }

  const timer = setInterval(tick, WORKER_POLL_INTERVAL_MS);

  // RFC-0017 §2: two beats can fail in a row before a live worker's
  // reservation passes its deadline.
  let renewing = false;
  async function renewLeases(): Promise<void> {
    if (renewing || held.size === 0 || !adapter.extend) return;
    renewing = true;
    const ids = [...held];
    try {
      const extended = new Set(
        await adapter.extend(queueName, ids, stallTimeout)
      );
      errors.succeeded(queueName, 'extend');
      for (const id of ids) {
        if (extended.has(id) || !held.has(id)) continue;
        held.delete(id);
        const index = readyBuffer.findIndex((stored) => stored.id === id);
        if (index !== -1) {
          // The sweeper already handed it to someone else: running it
          // here too would be the duplicate this lease exists to prevent.
          readyBuffer.splice(index, 1);
          console.warn(
            `[rasengan-queue] Queue "${queueName}" lost its lease on buffered ` +
              `job "${id}" (reclaimed by the sweeper) — dropped, it will run elsewhere.`
          );
        } else {
          console.warn(
            `[rasengan-queue] Queue "${queueName}" lost its lease on job "${id}" ` +
              `(reclaimed by the sweeper) — it may run again elsewhere.`
          );
        }
      }
    } catch (error) {
      errors.failed(queueName, 'extend', error);
    } finally {
      renewing = false;
    }
  }
  const heartbeat = adapter.extend
    ? setInterval(
        () => void renewLeases(),
        Math.max(1, Math.floor(stallTimeout / 3))
      )
    : undefined;

  app.onDestroy(async () => {
    stopped = true;
    clearInterval(timer);

    // 1. A reserve() in flight may still hand us a job: it lands in the buffer.
    await reserving;

    // 2. RFC-0017 §4: what was reserved and never started goes back, oldest
    // first, before waiting for the running ones, so other workers get it now.
    const unstarted = readyBuffer.splice(0);
    if (unstarted.length > 0) {
      for (const stored of unstarted) held.delete(stored.id);
      if (adapter.release) {
        try {
          await adapter.release(
            queueName,
            unstarted.map((stored) => stored.id)
          );
          errors.succeeded(queueName, 'release');
        } catch (error) {
          // The sweeper reclaims them after `stallTimeout`, as before RFC-0017.
          errors.failed(queueName, 'release', error);
        }
      }
    }

    // 3. Running jobs keep their lease until they ack.
    await Promise.all(inFlight);
    if (heartbeat) clearInterval(heartbeat);
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
  sweepInterval: number,
  errors: AdapterErrorLog
): void {
  // Same reason as the worker loop's `reserving`: a sweep slower than
  // `sweepInterval` (a slow or unreachable Redis) must not stack up.
  let sweeping = false;
  const timer = setInterval(() => {
    if (sweeping) return;
    sweeping = true;
    const now = Date.now();
    void Promise.all(
      [...queueNames].map((queueName) =>
        adapter.sweep(queueName, now).then(
          () => errors.succeeded(queueName, 'sweep'),
          (error: unknown) => errors.failed(queueName, 'sweep', error)
        )
      )
    ).finally(() => {
      sweeping = false;
    });
  }, sweepInterval);

  app.onDestroy(() => clearInterval(timer));
}

/** RFC-0017 §5: how often a failing adapter operation is logged again. */
export const ADAPTER_ERROR_LOG_INTERVAL_MS = 10_000;

export interface AdapterErrorLog {
  failed(queueName: string, operation: string, error: unknown): void;
  succeeded(queueName: string, operation: string): void;
}

/**
 * RFC-0017 §5: with Redis down, `reserve()` fails 40 times a second per
 * queue. Logs the first failure of each queue/operation, then at most
 * one line per `intervalMs` with what it suppressed, then one line once
 * the operation works again.
 */
export function createAdapterErrorLog(
  intervalMs = ADAPTER_ERROR_LOG_INTERVAL_MS
): AdapterErrorLog {
  const failing = new Map<
    string,
    { lastLoggedAt: number; suppressed: number }
  >();
  return {
    failed(queueName, operation, error) {
      const key = `${queueName}\u0000${operation}`;
      const now = Date.now();
      const state = failing.get(key);
      if (!state) {
        failing.set(key, { lastLoggedAt: now, suppressed: 0 });
        console.error(
          `[rasengan-queue] ${operation}() on queue "${queueName}" failed:`,
          error
        );
        return;
      }
      if (now - state.lastLoggedAt < intervalMs) {
        state.suppressed++;
        return;
      }
      console.error(
        `[rasengan-queue] ${operation}() on queue "${queueName}" still failing ` +
          `(${state.suppressed} more since the last report):`,
        error
      );
      state.lastLoggedAt = now;
      state.suppressed = 0;
    },
    succeeded(queueName, operation) {
      const key = `${queueName}\u0000${operation}`;
      const state = failing.get(key);
      if (!state) return;
      failing.delete(key);
      console.info(
        `[rasengan-queue] ${operation}() on queue "${queueName}" works again` +
          (state.suppressed > 0
            ? ` (${state.suppressed} failures not logged).`
            : '.')
      );
    },
  };
}
