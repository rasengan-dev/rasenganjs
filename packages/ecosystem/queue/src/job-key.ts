/**
 * Deterministic identity for repeat jobs (Phase 2). Not exported from
 * `index.ts` — an internal policy detail of how `AddJobOptions.repeat`
 * without an explicit `key` gets one, not part of the public API.
 *
 * The RFC doesn't specify a derivation, only that repeat registration
 * must be "idempotent by jobKey". Deriving from `name` + `data` (rather
 * than `name` alone) avoids collisions between repeat jobs that share a
 * name but differ by payload — e.g. a per-tenant digest job called with
 * a different tenant id each time it's registered at boot.
 */

/**
 * Stable JSON stringification: object keys are sorted recursively, so
 * two objects with the same keys in different insertion order produce
 * the same string. Arrays preserve order (order is meaningful there).
 */
export function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`;
  }

  const record = value as Record<string, unknown>;
  const entries = Object.keys(record)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`);
  return `{${entries.join(',')}}`;
}

/** Default `jobKey` for a repeat registration: `"<name>:<stable data>"`. */
export function defaultJobKey(name: string, data: unknown): string {
  return `${name}:${stableStringify(data)}`;
}
