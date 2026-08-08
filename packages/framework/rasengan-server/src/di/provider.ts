/**
 * Abstract base class for dependency-injectable providers.
 *
 * Classes extending `Provider` can be registered with the `Container`
 * and resolved automatically. They can optionally declare lifecycle
 * hooks that are called by the container after compilation and on shutdown.
 *
 * @example
 * ```ts
 * class DatabaseService extends Provider {
 *   async onInit() {
 *     this.connection = await createConnection(this.config.url);
 *   }
 *   async onDestroy() {
 *     await this.connection.close();
 *   }
 * }
 * ```
 */
export abstract class Provider {
  /**
   * Called after all providers have been resolved and the application
   * is ready to serve requests. Use for async setup (connections, timers).
   */
  onInit?(): void | Promise<void>;

  /**
   * Called on graceful shutdown. Use for cleanup (close connections,
   * clear timers, flush buffers).
   */
  onDestroy?(): void | Promise<void>;
}
