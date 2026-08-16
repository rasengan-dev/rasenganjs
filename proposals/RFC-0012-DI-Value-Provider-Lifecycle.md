# RFC 0012 - Lifecycle Hooks for Value Providers

**Status:** Draft
**Author:** Rasengan.js Core Team
**Date:** 2026-08-15

## Executive Summary

`Container.instantiate()` in `@rasenganjs/server` returns a `useValue` entry before it ever reaches the `instanceof Provider` check that feeds `lifecycleInstances`. A provider registered with `{ provide: Token, useValue: instance }` therefore never gets its `onInit()` called at boot or its `onDestroy()` called at shutdown, even when `instance` is a real `Provider` subclass with both hooks defined.

This is a known, already-documented gap: RFC-0006 (`proposals/RFC-0006-Drizzle-ORM-Integration.md`, section "Dependency on a known constraint") ran into it directly while designing `@rasenganjs/drizzle`'s `DataSource`, worked around it by keeping the database connection as module-level state instead of a `useValue` provider, and explicitly flagged the container fix as "a separate, core-framework RFC/fix, not this package." This RFC is that follow-up.

The fix is small and localized to `packages/framework/rasengan-server/src/di/container.ts`: track a resolved `useValue` the same way a resolved `useClass` instance is already tracked, using the existing `entry.instance` cache slot as the "already handled" marker so the push into `lifecycleInstances` happens exactly once.

---

# Motivation

## The bug, traced to its root

`Container.instantiate()` resolves a provider entry in priority order: cached instance, then `useValue`, then `useClass` construction. Only the `useClass` construction path pushes the resulting instance into `lifecycleInstances`:

```ts
// packages/framework/rasengan-server/src/di/container.ts (current)
private instantiate(entry, fallbackToken, ownerScope): any {
  if (entry.instance !== undefined) return entry.instance;

  if ('useValue' in entry && entry.useValue !== undefined) {
    return entry.useValue; // <- returns here, lifecycleInstances is never touched
  }

  // ... construct via useClass ...

  if (entry.instance instanceof Provider) {
    this.lifecycleInstances.push(entry.instance); // <- only reachable from the useClass path
  }

  return entry.instance;
}
```

`initAll()` and `destroyAll()` only ever iterate `lifecycleInstances`, so any `useValue` entry, no matter what it is, is invisible to both.

## This breaks a guarantee RFC-0003 already made

RFC-0003 (Module-Scoped Dependency Injection) states as one of its explicit goals: "Eager resolution of all declared providers; `onInit()` guaranteed." `ServerApp.compile()` honors this by eagerly resolving every declared provider before calling `container.initAll()`:

```ts
// packages/framework/rasengan-server/src/server/app.ts, around line 439
for (const mod of flatModules) {
  const scoped = container.forModule(mod);
  for (const provider of moduleProviders.get(mod)!) {
    scoped.resolve(providerToken(provider)); // resolves useValue entries too
  }
}
```

This confirms the gap is isolated to the missing push in `instantiate()`, not a resolution-order or timing problem. Every `useValue` provider is already being resolved at the right time, at the right place. It is simply never recorded as something that needs a lifecycle callback.

## It is already causing design compromises downstream

RFC-0006 needed a provider that owns a real resource (a Postgres connection pool) and must close it cleanly on shutdown. It could not use the natural, TypeORM-like shape `{ provide: DataSource, useValue: preBuiltInstance }`, because that would "silently leak the connection pool on every shutdown, no error, no warning, just accumulating open connections until something else notices" (RFC-0006, section "Dependency on a known constraint"). It shipped a workaround instead: a module-level singleton set by `DrizzleModule.forRoot()`, with `DataSource` reduced to a thin, zero-argument, container-constructed wrapper around that state.

The workaround is reasonable and already shipped, this RFC does not ask to undo it. But RFC-0006 itself flags the risk of leaving the underlying gap open: the workaround "shouldn't quietly calcify into 'just how the package works' once the actual constraint is gone." Any future provider that wants to wrap an already-constructed resource (a queue client, a cache client, a third-party SDK instance) will hit the exact same wall and need the exact same kind of workaround unless the container is fixed once, here.

## The current test suite documents the bug as intended behavior

`packages/framework/rasengan-server/src/__tests__/container.test.ts:249` has a test named `does not track useValue providers` that registers a plain object literal with an `onInit` method via `useValue`, resolves it, calls `initAll()`, and asserts `initCalled` stayed `false`. That assertion happens to remain correct after this fix too (see "Non-goals" below), but the test's name and framing describe the gap as a deliberate feature rather than an oversight. It needs to be joined by a second test that proves the opposite case: a `useValue` entry that IS a `Provider` subclass DOES get its `onInit()`/`onDestroy()` called.

---

# Goals

- A provider registered via `{ provide: Token, useValue: instance }` where `instance instanceof Provider` gets `onInit()` called during `initAll()` and `onDestroy()` called during `destroyAll()`, in the same registration-order and reverse-order guarantees that already apply to `useClass` providers.
- No change to the public API of `@rasenganjs/server`. `Container`, `ProviderDefinition`, and `Provider` keep their current shapes.
- No change to resolution semantics for anything other than lifecycle tracking. A `useValue` entry still always returns the exact instance it was given, never a new construction.
- The fix stays inside `Container.instantiate()`. No changes to `ServerApp.compile()`'s eager-resolution pass, since it already resolves every declared provider correctly.

## Non-goals

- Duck-typed lifecycle detection (calling `onInit`/`onDestroy` on any object that happens to have those methods, without requiring `instanceof Provider`). The `useClass` path has never done this, and this RFC keeps `useValue` consistent with it rather than introducing a second, looser rule. This means `container.test.ts:249`'s existing test keeps passing unchanged, since its plain object literal is not a `Provider` instance either way.
- Retroactively changing `@rasenganjs/drizzle`'s `DataSource` design to use `useValue`. That is a separate, follow-up change left to the `@rasenganjs/drizzle` maintainers to decide once this fix ships, not part of this RFC's scope.
- Request-scoped or transient providers. Out of scope for RFC-0003 and still out of scope here.

---

# Detailed design

## The fix

```ts
// packages/framework/rasengan-server/src/di/container.ts (proposed)
private instantiate(entry, fallbackToken, ownerScope): any {
  if (entry.instance !== undefined) return entry.instance;

  if ('useValue' in entry && entry.useValue !== undefined) {
    entry.instance = entry.useValue;
    if (entry.instance instanceof Provider) {
      this.lifecycleInstances.push(entry.instance);
    }
    return entry.useValue;
  }

  // ... useClass construction path, unchanged ...
}
```

Two things happen together, deliberately:

1. `entry.instance = entry.useValue` reuses the exact cache slot the `useClass` path already relies on at line 1 (`if (entry.instance !== undefined) return entry.instance;`). This is what makes the fix idempotent: a `useValue` token resolved a second time (by a second constructor injecting it, or a second module importing it) short-circuits at the top of the function and never reaches the `useValue` branch again, so it can never be pushed into `lifecycleInstances` twice.
2. The `instanceof Provider` check is copied verbatim from the `useClass` path, not reinvented. The two paths converge on the same rule: only real `Provider` subclasses get lifecycle hooks, however they were constructed.

## Why reusing `entry.instance` is safe

Today, a `useValue` entry never sets `entry.instance`, so every resolution re-executes the `useValue` branch, it is idempotent by construction since it always hands back the same value. Setting `entry.instance` on first resolution changes nothing observable about what gets returned (`entry.useValue` and `entry.instance` hold the same reference from that point on), and it is strictly cheaper on every resolution after the first, since it now short-circuits at the existing cache check instead of re-evaluating the `'useValue' in entry` condition. No caller distinguishes between "returned from the useValue branch" and "returned from the instance cache," both return the identical value synchronously.

---

# Alternatives considered

**A. Track resolved `useValue` tokens in a separate `Set<any>` instead of reusing `entry.instance`.** Rejected as the primary design, kept here because it is the more conservative option if reusing `entry.instance` for `useValue` entries is judged to blur a distinction the container currently keeps (instance-from-construction vs value-handed-in). It avoids touching the existing cache slot's meaning at the cost of a second piece of state to keep in sync. Worth revisiting if review disagrees with treating `entry.instance` as a general "already resolved" marker.

**B. Duck-type lifecycle hooks instead of requiring `instanceof Provider`.** Rejected. It would make `container.test.ts:249`'s existing test fail (its plain object literal has an `onInit` method), forcing a behavior change beyond fixing the gap, and it would create two different lifecycle-eligibility rules between `useClass` and `useValue` if applied inconsistently, or force a matching change to the `useClass` path if applied consistently, which is a much larger surface than this RFC intends to touch.

**C. Push into `lifecycleInstances` from `ServerApp.compile()`'s eager-resolution loop instead of from `instantiate()`.** Rejected. The eager-resolution loop already calls `scoped.resolve(...)`, which reaches `instantiate()` regardless, so pushing there would duplicate logic that already exists in one place and would miss `useValue` entries resolved outside the eager pass (for example, a `useValue` token resolved directly via `container.resolve()` in a test, as several existing tests already do).

---

# Breaking change and migration

This is a bug fix restoring a guarantee RFC-0003 already promised, not a new feature. No public API changes.

**Test update required.** `container.test.ts:249` (`does not track useValue providers`) keeps its current assertion, since its input is not a `Provider` instance, but its name should be narrowed to something like `does not track useValue providers that are not Provider instances`, so it stops reading as "useValue providers are never tracked, by design." A new adjacent test must be added asserting the opposite case: a `useValue` entry that IS a `Provider` subclass has `onInit()` called by `initAll()` and `onDestroy()` called by `destroyAll()`, matching the existing `useClass` lifecycle tests already in the same file.

**Observable behavior change.** Any existing application that registers a `Provider` subclass via `useValue` today, and happens to rely on `onInit()`/`onDestroy()` NOT firing for it (unlikely, since that would mean relying on a leak), would see new behavior after this fix. Given the container is pre-1.0 (`@rasenganjs/server` is at `1.0.0-beta.4`) and this closes a gap the framework's own RFC-0003 already committed to closing, this ships as a normal beta patch, not a major version bump.

---

# Testing

- `useValue` entry that is a `Provider` subclass: `onInit()` fires once during `initAll()`.
- Same entry: `onDestroy()` fires once during `destroyAll()`, in the correct reverse-registration-order position relative to other providers (reusing the existing `order` array pattern already used by `container.test.ts`'s other lifecycle-order tests).
- Same entry resolved twice (two different constructors injecting the same token): `onInit()` still fires exactly once, not twice.
- `useValue` entry that is a plain object or primitive (not a `Provider` subclass): `container.test.ts:249`'s existing assertion still holds, `onInit` is never called.
- Existing `di-scope-resolution.test.ts:108` ("useValue returns the exact given instance, not a new construction") still passes unchanged, confirming the fix does not alter resolution identity.
- Full `rasengan-server` suite stays green, no regressions in `plugin-providers.test.ts`, `scoped-di.test.ts`, or `container.test.ts`'s other cases.

---

# Open questions

- Should `@rasenganjs/drizzle`'s `DataSource` be migrated to a plain `useValue` registration once this ships, simplifying `forRoot()` down to a normal factory, or is the current module-state design now preferred on its own merits (eager, deterministic connection at module-load time) regardless of the lifecycle gap that originally forced it? Left to a separate, future RFC either way, noted here only so it is not forgotten.
- Alternative A (a separate `Set` instead of reusing `entry.instance`) is left open for review. If there is a reason the container wants to keep "constructed instance" and "handed-in value" distinguishable in `entry.instance`, this RFC's primary proposal should switch to Alternative A before implementation.
