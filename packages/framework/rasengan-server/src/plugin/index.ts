import type { ContainerView, ProviderLike } from '../di/container.js';
import type { ModuleConfig } from '../server/module.js';
import type { ServerApp } from '../server/app.js';

/**
 * @module ModulePlugin — generic extension point for `defineModule()`
 *
 * `rasengan-server` core only knows about `prefix`, `middlewares`,
 * `imports`, `controllers`, and `providers` on a `ModuleConfig`. Any other
 * key (e.g. `gateways`) is opaque to core and must be claimed by a
 * `ModulePlugin` registered via `app.registerPlugin()` — this keeps
 * ecosystem packages like `@rasenganjs/ws` genuinely optional (nothing in
 * `rasengan-server` needs to know what a "gateway" is) while still letting
 * `defineModule({ gateways: [...] })` work like any other module field.
 *
 * `compile()` throws if a module declares a key with no matching plugin,
 * rather than silently ignoring it — a typo'd or forgotten
 * `app.registerPlugin()` call would otherwise fail silently.
 */
export interface ModulePlugin {
  /** The `ModuleConfig` field this plugin claims, e.g. `'gateways'`. */
  key: string;
  /**
   * Called once per flattened module that declares a non-`undefined`
   * value at `key`, after providers are registered but the container is
   * otherwise the same one HTTP controllers resolve from — so plugin
   * registrations can inject the same singletons.
   *
   * @param app - The `ServerApp` being compiled — use `app.websocket()`
   *              (or any other public registration method) to wire in
   *              whatever this plugin's key represents.
   * @param container - A view of the shared DI container scoped to
   *                     `mod` (RFC-0003) — resolutions see the module's
   *                     own providers, its imports' exports, and globals.
   * @param mod - The specific flattened module that declared `key`.
   * @param value - `mod[key]`, untyped since core doesn't know its shape.
   */
  register(
    app: ServerApp,
    container: ContainerView,
    mod: ModuleConfig,
    value: unknown
  ): void;
  /**
   * Optional: extract the real DI-provider tokens hiding inside `value`
   * (`mod[key]`) — e.g. `@rasenganjs/ws` returns its `gateways` array
   * unchanged, since `Gateway extends Provider`.
   *
   * When present, `compile()` merges the returned tokens into the
   * module's `providers` *before* registration, visibility (`exports`)
   * computation, and eager resolution run — so a plugin-declared class
   * becomes a real, exportable, eagerly-resolved singleton exactly like
   * a hand-declared provider, instead of only becoming one implicitly
   * (private, un-exportable) the first time `register()` resolves it.
   *
   * A token already present in the module's own `providers` is left
   * alone — an explicit declaration (e.g. a test's `useValue` override)
   * always wins over the plugin-derived one.
   *
   * `rasengan-server` core never inspects `value`'s shape itself; this
   * hook is the only place that knowledge needs to live.
   *
   * @param value - `mod[key]`, the same value passed to `register()`.
   * @returns Provider tokens to merge into the module's provider set.
   */
  asProviders?(value: unknown): ProviderLike[];
}
