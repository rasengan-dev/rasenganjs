import type { Container } from '../di/container.js';
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
   * @param container - The shared DI container (already has every
   *                     module's `providers` registered).
   * @param mod - The specific flattened module that declared `key`.
   * @param value - `mod[key]`, untyped since core doesn't know its shape.
   */
  register(
    app: ServerApp,
    container: Container,
    mod: ModuleConfig,
    value: unknown
  ): void;
}
