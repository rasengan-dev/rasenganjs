# RFC 0003 — Module-Scoped Dependency Injection

**Status:** Draft  
**Author:** Rasengan.js Core Team  
**Date:** 2026-07-13

## Executive Summary

This RFC makes modules real encapsulation boundaries for dependency injection.

A module's providers become **private by default**: controllers, gateways and providers of other modules can only resolve them when the owning module lists them in a new `exports` field **and** the consuming module lists the owner in `imports`. A `global: true` flag keeps cross-cutting modules (config, logging) ergonomic.

It also closes a known lifecycle gap: **all declared providers are eagerly resolved at compile time**, so `onInit()` fires for every provider — including ones nothing injects (schedulers, warmup connections) — and misconfigured dependencies fail at boot instead of on the first request.

---

# Motivation

Today `compile()` flattens every module and registers all providers into **one shared container** (`src/server/app.ts`). Three problems follow:

**1. `imports` means nothing for DI.** It only merges route trees. Any controller can inject any provider from any module without importing it:

```ts
// works today — no imports, no relationship, no warning
class PingController extends Controller {
  constructor(private chatRoomService: ChatRoomService) {
    super();
  }
}
```

The dependency graph the modules _appear_ to declare is fiction.

**2. Name collisions are a silent hazard.** Constructor injection resolves **by parameter name** against the whole registry, case-insensitively. If two modules each define their own `ConfigService`, whichever registered first wins for _everyone_ — no error, the wrong instance, at runtime. With scoping, two modules can each own a private `ConfigService` and never conflict.

**3. Providers nobody injects never exist.** Instances are created lazily on first resolution, and `container.initAll()` only fires hooks on instances that were resolved. A provider whose whole job is its lifecycle — a scheduler that starts a timer in `onInit()`, a connection warmer — silently never runs unless something artificially injects it:

```ts
// today's workaround: a dummy injection just to force instantiation
constructor(
  private gateway: ChatGateway,
  private cron: LeaderboardCron // unused — exists only to instantiate it
) {}
```

NestJS — the explicit inspiration for this layer — solves all three with the exact semantics proposed here.

---

# Goals

- Providers private to their module by default.
- `exports` + `imports` as the only cross-module visibility mechanism.
- `global: true` for cross-cutting modules.
- One instance per provider, shared by every module that can see it.
- Eager resolution of all declared providers; `onInit()` guaranteed.
- Boot-time errors that name the module, the provider, and the fix.
- `ModulePlugin` API (used by `@rasenganjs/ws`) unchanged.

## Non-goals

- Request-scoped or transient providers — everything stays a singleton.
- Re-exporting modules (`exports: [UserModule]` forwarding a whole surface) — deferred until a concrete need appears.
- Lazy/dynamic modules.
- Compile-time (TypeScript-level) visibility checking — resolution is name-based; violations surface at boot, which eager resolution makes deterministic.

---

# Proposed API

```ts
// user.module.ts
export default defineModule({
  providers: [UserService, UserRepository], // UserRepository stays private
  exports: [UserService],
  controllers: [UserController],
});

// chat.module.ts — UserService is injectable here ONLY because of the import
export default defineModule({
  imports: [UserModule],
  providers: [ChatService],
  gateways: [ChatGateway],
});

// config.module.ts — visible everywhere without importing
export default defineModule({
  global: true,
  providers: [ConfigService],
  exports: [ConfigService],
});
```

`exports` accepts the same tokens `providers` does (classes, and the `provide` token of a `ProviderDefinition`). Exporting a token that isn't in the module's `providers` is a compile-time (boot) error.

## Visibility rules

For code declared in module `M`, a token is resolvable when it is:

1. declared in `M.providers`, or
2. listed in the `exports` of a module in `M.imports`, or
3. listed in the `exports` of any module with `global: true`.

Everything else fails at boot with a directed error:

```
[rasengan-server] ChatGateway (ChatModule) cannot resolve "userRepository".
UserRepository exists in UserModule but is not exported — add it to
UserModule's `exports`, or expose a public service instead.
```

```
[rasengan-server] PingController (AppModule) cannot resolve "chatService".
ChatService is exported by ChatModule — add ChatModule to AppModule's
`imports`.
```

## Scope of a provider's own dependencies

A provider's constructor dependencies resolve in the scope of the module that **owns the provider**, not the module that triggered its instantiation. `UserService` (owned by `UserModule`) may inject the private `UserRepository` even when its instantiation is triggered from `ChatModule` — and it behaves identically no matter who resolves it first. This is what keeps shared singletons deterministic.

---

# Eager Resolution & Lifecycle

`compile()` gains a resolution pass: after registration and plugin dispatch, **every declared provider is instantiated** in module order, then `initAll()` runs. Consequences:

- `onInit()` fires for every declared provider — the scheduler/cron pattern works with zero dummy injections.
- Every constructor dependency of every provider is checked at boot. A typo'd parameter name or a visibility violation can no longer hide until the first request that touches it.
- `onDestroy()` keeps running in reverse resolution order on shutdown.

Ordering guarantee: providers are resolved after `dispatchPlugins()`, so a provider that injects a gateway still observes `gateway.server` populated by `@rasenganjs/ws` before its `onInit()` runs.

---

# Implementation

## One instance cache, one visibility layer

Per-module containers would be wrong: two modules importing `UserModule` must share **one** `UserService`. The design keeps the existing single registry as the instance cache and adds bookkeeping:

```
Container
 ├── registry: token → { definition, instance? }     (exists today)
 ├── owners:   token → ModuleConfig                  (new)
 └── scopes:   ModuleConfig → Set<token>             (new, computed once)
```

- `flattenModules()` stops erasing the graph — module identity is already
  object reference, so `imports` edges come for free (deduped by reference,
  cycle-safe via a visited set).
- `resolve(token, scope)` / `resolveByName(name, scope)` filter the registry
  through the scope's visible set before matching.
- The auto-instantiation fallback for **unregistered** classes is removed —
  it produced uncached, un-scoped instances and silently broke singletons.
  Everything injectable must be declared in some module's `providers`
  (gateways included, as already documented).

## Scoped views keep plugins unchanged

`registerControllers()` and `dispatchPlugins()` resolve through a _scoped
view_ of the container bound to the current module:

```ts
const scoped = container.forModule(mod); // same resolve() signature
plugin.register(app, scoped, mod, value);
```

`ModulePlugin.register`'s signature is untouched — `@rasenganjs/ws` resolves
gateways exactly as before, now with the right visibility for free.

## Compile pipeline (after)

```
compile()
  1. walk module graph (dedupe, cycle-safe) — keep edges
  2. register all providers + record owners
  3. compute per-module visible sets (imports' exports + globals)
  4. registerControllers(mod-scoped view)
  5. dispatchPlugins(mod-scoped view)          — gateway.server set here
  6. eagerly resolve every declared provider   (NEW)
  7. container.initAll()
```

---

# Breaking Change & Migration

This flips the default: code injecting across modules without imports breaks at boot. Accepted deliberately while the package is beta, with no legacy compat flag to carry — the boot errors name the exact fix, and migration is mechanical:

1. Injecting something from another module? Add that module to `imports` and the provider to its `exports`.
2. A provider used everywhere (config, logger)? Mark its module `global: true`.
3. Same-named classes in different modules stop colliding — previously broken setups start working _correctly_, which may look like a behavior change.

All in-repo playgrounds (`rasengan-server-demo`, `rasengan-chat-demo`, `rasengan-io-demo`) already follow module discipline and require no changes.

---

# Delivery Phases

1. **Container** — owners/scopes bookkeeping, scoped views, removal of the
   unregistered-class fallback, directed error messages. Unit tests.
2. **Eager resolution** — the compile-time resolution pass + lifecycle
   ordering guarantees. Tests: un-injected provider's `onInit` fires;
   provider injecting a gateway sees `gateway.server` in `onInit`.
3. **Wiring** — module-graph walk replacing `flattenModules`, `exports`/
   `global` validation (exporting undeclared token = boot error),
   integration tests across module topologies (diamond imports, globals,
   collision-by-name in sibling modules).
4. **Ship** — CHANGELOG migration guide, docs, demo audit.

---

# Trade-offs

- **Boot cost**: eager resolution constructs every provider at startup.
  That is the point — apps that want lazy construction are optimizing the
  wrong layer; heavy work belongs in `onInit()`, not constructors.
- **No compile-time enforcement**: visibility violations are runtime (boot)
  errors, since resolution is name-based. Eager resolution makes "boot"
  a guarantee rather than "whenever that route is first hit", which is the
  strongest check available without decorators or codegen.
- **Container complexity**: two maps and a set computation — bounded, and
  paid once at compile.

---

# Conclusion

`imports` starts meaning what it says. Modules gain the encapsulation their syntax already promises: private by default, shared by explicit export, global by explicit opt-in — with singletons preserved through a shared instance cache and visibility enforced as a filter on top. Eager resolution turns the container's laziness from a footgun into a boot-time contract: every declared provider exists, every `onInit()` runs, and every wiring mistake fails before the first request.
