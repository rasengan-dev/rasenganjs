/**
 * Lua scripts backing `RedisQueueAdapter`. Inline template strings rather
 * than `.lua` files — tsup has no built-in loader for that, and adding
 * one would need extra bundler machinery that has to work identically
 * under Node/Bun/Deno, exactly what the RFC's Runtime Portability
 * section is trying to avoid.
 *
 * Every mutating `QueueAdapter` operation runs as one script: Redis
 * executes a script to completion, single-threaded, before any other
 * client's command runs — that's the atomicity the RFC asks for, and
 * the only way `add()`'s repeat-job idempotency (check-then-set) is
 * safe against two processes calling it concurrently.
 *
 * `repeat` is a reserved word in Lua — every script that builds a job
 * table with a `repeat` field must bracket-index it (`job['repeat']`),
 * never dot-access it.
 */

/**
 * KEYS: [repeatsHash, scheduleZset]
 * ARGV: [jobKey, every, now, descriptorJSON]
 * Returns 1 if newly registered, 0 if `jobKey` was already registered
 * (idempotent no-op).
 */
export const ADD_REPEAT_SCRIPT = `
local repeatsKey = KEYS[1]
local scheduleKey = KEYS[2]
local jobKey = ARGV[1]
local every = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local descriptorJSON = ARGV[4]

if redis.call('HEXISTS', repeatsKey, jobKey) == 1 then
  return 0
end
redis.call('HSET', repeatsKey, jobKey, descriptorJSON)
redis.call('ZADD', scheduleKey, now + every, jobKey)
return 1
`;

/**
 * KEYS: [jobsHash, delayedZset]
 * ARGV: [id, jobJSON, readyAt]
 */
export const ADD_DELAYED_SCRIPT = `
redis.call('HSET', KEYS[1], ARGV[1], ARGV[2])
redis.call('ZADD', KEYS[2], tonumber(ARGV[3]), ARGV[1])
return 1
`;

/**
 * KEYS: [jobsHash, waitingList]
 * ARGV: [id, jobJSON]
 */
export const ADD_IMMEDIATE_SCRIPT = `
redis.call('HSET', KEYS[1], ARGV[1], ARGV[2])
redis.call('RPUSH', KEYS[2], ARGV[1])
return 1
`;

/**
 * Runs immediately after a successful BLMOVE (which cannot itself carry
 * this out — Redis disallows blocking commands inside EVAL). Stamps the
 * stall deadline and returns the job's stored JSON.
 *
 * KEYS: [activeDeadlineZset, jobsHash, activeList]
 * ARGV: [id, deadline]
 * Returns the job JSON, or `false` if the id has no entry in the jobs
 * hash (defensive: cleans up the orphaned reservation from the active
 * list instead of leaving it stuck with no deadline).
 */
export const STAMP_DEADLINE_SCRIPT = `
local raw = redis.call('HGET', KEYS[2], ARGV[1])
if not raw then
  redis.call('LREM', KEYS[3], 1, ARGV[1])
  return false
end
redis.call('ZADD', KEYS[1], tonumber(ARGV[2]), ARGV[1])
return raw
`;

/**
 * KEYS: [activeList, activeDeadlineZset, jobsHash]
 * ARGV: [id]
 * Returns 0 (silent no-op, matches MemoryQueueAdapter) if the id is not
 * currently active — already completed, failed, or reclaimed.
 */
export const COMPLETE_SCRIPT = `
if redis.call('ZSCORE', KEYS[2], ARGV[1]) == false then
  return 0
end
redis.call('LREM', KEYS[1], 1, ARGV[1])
redis.call('ZREM', KEYS[2], ARGV[1])
redis.call('HDEL', KEYS[3], ARGV[1])
return 1
`;

/**
 * KEYS: [activeList, activeDeadlineZset, jobsHash, delayedZset, deadList]
 * ARGV: [id, retryAt] — `retryAt` is `''` (empty string) to signal
 * dead-letter, matching `MemoryQueueAdapter.fail()`'s `opts.retryAt
 * === undefined` branch.
 *
 * Retry-backoff and producer `{ delay }` jobs share the same delayed
 * zset here — unlike MemoryQueueAdapter, which keeps them on separate
 * mechanisms. See ARCHITECTURE.md for why that separation doesn't
 * survive to a durable backend.
 */
export const FAIL_SCRIPT = `
if redis.call('ZSCORE', KEYS[2], ARGV[1]) == false then
  return 0
end
redis.call('LREM', KEYS[1], 1, ARGV[1])
redis.call('ZREM', KEYS[2], ARGV[1])

if ARGV[2] == '' then
  redis.call('RPUSH', KEYS[5], ARGV[1])
  return 1
end

local raw = redis.call('HGET', KEYS[3], ARGV[1])
if not raw then
  return 1
end
local job = cjson.decode(raw)
job.attempt = job.attempt + 1
job.readyAt = tonumber(ARGV[2])
redis.call('HSET', KEYS[3], ARGV[1], cjson.encode(job))
redis.call('ZADD', KEYS[4], tonumber(ARGV[2]), ARGV[1])
return 1
`;

/**
 * KEYS: [delayedZset, waitingList]
 * ARGV: [now, batchSize]
 * Returns the number of jobs promoted.
 */
export const PROMOTE_DELAYED_SCRIPT = `
local now = tonumber(ARGV[1])
local batchSize = tonumber(ARGV[2])
local due = redis.call('ZRANGEBYSCORE', KEYS[1], '-inf', now, 'LIMIT', 0, batchSize)

for i = 1, #due do
  local id = due[i]
  redis.call('ZREM', KEYS[1], id)
  redis.call('RPUSH', KEYS[2], id)
end

return #due
`;

/**
 * KEYS: [scheduleZset, repeatsHash, jobsHash, waitingList]
 * ARGV: [now, batchSize]
 * Returns the number of instances spawned. Spawned-instance ids are
 * `"<jobKey>:<nextRunAt>"` — deterministic (Lua has no
 * `crypto.randomUUID()`) and always-unique, since a descriptor's
 * `nextRunAt` never repeats.
 */
export const SPAWN_REPEAT_SCRIPT = `
local now = tonumber(ARGV[1])
local batchSize = tonumber(ARGV[2])
local due = redis.call('ZRANGEBYSCORE', KEYS[1], '-inf', now, 'LIMIT', 0, batchSize, 'WITHSCORES')

local count = 0
local i = 1
while i <= #due do
  local jobKey = due[i]
  local nextRunAt = tonumber(due[i + 1])
  i = i + 2

  local descriptorRaw = redis.call('HGET', KEYS[2], jobKey)
  if descriptorRaw then
    local descriptor = cjson.decode(descriptorRaw)
    local newId = jobKey .. ':' .. tostring(nextRunAt)
    local job = {
      id = newId,
      name = descriptor.name,
      data = descriptor.data,
      attempt = 1,
      enqueuedAt = now,
    }
    job['repeat'] = { every = descriptor.every, jobKey = jobKey }
    redis.call('HSET', KEYS[3], newId, cjson.encode(job))
    redis.call('RPUSH', KEYS[4], newId)
    redis.call('ZADD', KEYS[1], nextRunAt + descriptor.every, jobKey)
    count = count + 1
  else
    -- Descriptor missing (shouldn't happen) — drop the stale schedule entry.
    redis.call('ZREM', KEYS[1], jobKey)
  end
end

return count
`;

/**
 * KEYS: [activeDeadlineZset, activeList, jobsHash, waitingList]
 * ARGV: [now, batchSize]
 *
 * Reclaims jobs past their stall deadline. Also self-heals: an id
 * present in the active list but absent from the deadline zset (the
 * crash window between BLMOVE and STAMP_DEADLINE_SCRIPT) is treated as
 * immediately due, so an orphaned reservation is caught here instead of
 * leaking forever. No `attempts`-exhaustion check — stalls are an
 * infrastructure signal, not a retry-policy input (matches the RFC's
 * lifecycle diagram, which has no stalled→dead transition).
 */
export const RECLAIM_STALLED_SCRIPT = `
local now = tonumber(ARGV[1])
local batchSize = tonumber(ARGV[2])
local due = redis.call('ZRANGEBYSCORE', KEYS[1], '-inf', now, 'LIMIT', 0, batchSize)
local dueSet = {}
for i = 1, #due do dueSet[due[i]] = true end

local remaining = batchSize - #due
if remaining > 0 then
  local activeIds = redis.call('LRANGE', KEYS[2], 0, -1)
  for i = 1, #activeIds do
    if remaining <= 0 then break end
    local id = activeIds[i]
    if not dueSet[id] and redis.call('ZSCORE', KEYS[1], id) == false then
      due[#due + 1] = id
      dueSet[id] = true
      remaining = remaining - 1
    end
  end
end

local count = 0
for i = 1, #due do
  local id = due[i]
  redis.call('ZREM', KEYS[1], id)
  redis.call('LREM', KEYS[2], 1, id)
  local raw = redis.call('HGET', KEYS[3], id)
  if raw then
    local job = cjson.decode(raw)
    job.attempt = job.attempt + 1
    redis.call('HSET', KEYS[3], id, cjson.encode(job))
    redis.call('RPUSH', KEYS[4], id)
    count = count + 1
  end
end

return count
`;

/**
 * KEYS: [deadList, jobsHash, waitingList]
 * ARGV: [id]
 * Returns 0 (no-op, matches MemoryQueueAdapter) if the id isn't in the
 * dead list.
 */
export const RETRY_DEAD_SCRIPT = `
local removed = redis.call('LREM', KEYS[1], 1, ARGV[1])
if removed == 0 then
  return 0
end
local raw = redis.call('HGET', KEYS[2], ARGV[1])
if raw then
  local job = cjson.decode(raw)
  job.attempt = 1
  redis.call('HSET', KEYS[2], ARGV[1], cjson.encode(job))
end
redis.call('RPUSH', KEYS[3], ARGV[1])
return 1
`;
