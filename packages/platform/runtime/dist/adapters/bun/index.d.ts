import { R as RuntimeAdapter, S as ServeOptions, A as Assets } from '../../types-C53UIsik.js';
import { EnvironmentMap } from '../../index.js';

/**
 * BunAssets — local filesystem implementation of the Assets API
 * using Bun-native APIs (`Bun.file`, `Bun.write`).
 *
 * Falls back to `node:fs/promises` for operations Bun does not
 * expose a native API for (directory listing, deletion).
 *
 * All paths are resolved relative to `rootDir` (defaults to
 * `process.cwd()`). Path traversal is prevented.
 *
 * @example
 * ```ts
 * const assets = new BunAssets('/path/to/project');
 *
 * const buf = await assets.get('public/logo.png');
 * await assets.write('dist/output.txt', new TextEncoder().encode('hello'));
 * const files = await assets.list('src/');
 * ```
 */
declare class BunAssets {
    private rootDir;
    constructor(rootDir?: string);
    /**
     * Read a file using `Bun.file()`.
     * Returns `null` if the file does not exist.
     */
    get(path: string): Promise<Uint8Array | null>;
    /**
     * Read a file and decode its content as UTF-8 text.
     * Returns `null` if the file does not exist.
     */
    load(path: string): Promise<string | null>;
    /**
     * Write a file using `Bun.write()`.
     * Creates parent directories if they do not exist.
     */
    write(path: string, data: Uint8Array): Promise<void>;
    /**
     * Delete a file or empty directory.
     * No-op if the path does not exist.
     */
    delete(path: string): Promise<void>;
    /**
     * Recursively list all files under a prefix/directory.
     * Returns paths relative to rootDir with forward slashes.
     */
    list(prefix: string): Promise<string[]>;
    /**
     * Resolve a user-provided path against rootDir with path traversal
     * protection.
     */
    private resolvePath;
    /**
     * Recursively walk a directory, collecting file paths relative
     * to rootDir.
     */
    private walk;
}

/**
 * BunDevAdapter — RuntimeAdapter for Bun development.
 *
 * Features:
 *   - In-process HTTP server via `Bun.serve()`
 *   - Child-process spawning (nodemon-style) via `Bun.spawn()`
 *   - File watcher with debounce + auto-restart on change
 *   - Local filesystem assets (`Bun.file` / `Bun.write`)
 *
 * @example
 * ```ts
 * import { Futon } from "@rasenganjs/futon";
 * import { BunDevAdapter } from "@rasenganjs/runtime/adapters/bun";
 *
 * const app = new Futon();
 * app.get("/hello", () => new Response("Hello!"));
 *
 * const adapter = new BunDevAdapter({ port: 3000 });
 * await adapter.serve(app);
 * ```
 */

interface BunDevAdapterOptions {
    port?: number;
    host?: string;
    rootDir?: string;
}
declare class BunDevAdapter implements RuntimeAdapter {
    private options;
    private watcher;
    readonly assets: BunAssets;
    private serverHandle;
    private disposeWatcher;
    private serveResolve;
    private childProcess;
    constructor(options?: BunDevAdapterOptions);
    /**
     * Start the Bun development server.
     *
     * Requires a Futon instance (in-process mode).
     * Configures the app with Bun preset and development mode.
     */
    serve(app: any | null, options?: ServeOptions): Promise<void>;
    /** Stop the server, watcher, and any child process. */
    close(): void;
    /** Watch a file or directory for changes. */
    watch(path: string, callback: () => void): () => void;
    private serveOptions;
    /** Start the in-process HTTP server via Bun.serve(). */
    private startServer;
}

/**
 * BunProdAdapter — RuntimeAdapter for Bun production.
 *
 * Features:
 *   - HTTP server via `Bun.serve()`
 *   - Local filesystem assets (`Bun.file` for reads, no write/delete)
 *
 * @example
 * ```ts
 * import { Futon } from "@rasenganjs/futon";
 * import { BunProdAdapter } from "@rasenganjs/runtime/adapters/bun";
 *
 * const app = new Futon();
 * const adapter = new BunProdAdapter({ port: 8080, rootDir: './dist' });
 * await adapter.serve(app);
 * ```
 */

interface BunProdAdapterOptions {
    port?: number;
    host?: string;
    rootDir?: string;
}
declare class BunProdAdapter implements RuntimeAdapter {
    private options;
    readonly assets: Assets;
    private serverHandle;
    constructor(options?: BunProdAdapterOptions);
    /**
     * Start the Bun production server.
     *
     * Configures the Futon with production settings, loads
     * environment files, and starts listening via Bun.serve().
     */
    serve(app: any, options?: ServeOptions): Promise<void>;
    /** Stop the HTTP server. */
    close(): void;
}

/**
 * BunWatcher — filesystem watcher using `node:fs.watch`.
 *
 * Bun does not yet provide a native file watcher API, so this
 * implementation uses Node's `fs.watch` (which Bun supports).
 *
 * Debounces rapid change events (default 100ms).
 *
 * @example
 * ```ts
 * const watcher = new BunWatcher();
 * const dispose = watcher.watch('src/', () => rebuild());
 * // later
 * dispose();
 * ```
 */
declare class BunWatcher {
    /**
     * Watch a file or directory for changes.
     *
     * @param path       - File or directory path to watch.
     * @param callback   - Called (after debounce) when a change is detected.
     * @param debounceMs - Debounce window in milliseconds (default 100).
     * @returns A dispose function that stops the watcher.
     */
    watch(path: string, callback: () => void, debounceMs?: number): () => void;
}

/**
 * HTTP server utilities for Bun adapters.
 *
 * Provides `startBunServer` which wraps `Bun.serve()`.
 * Unlike Node's `http.createServer`, Bun natively supports the
 * Web API `Request`/`Response` pattern, so no conversion is needed.
 */
interface BunServerOptions {
    host?: string;
    port?: number;
    /** Called when the server starts listening. */
    onListening?: (info: {
        port: number;
        host: string;
    }) => void;
}
interface BunServerHandle {
    ready: Promise<void>;
    close(): void;
}
/**
 * Start a Bun HTTP server using `Bun.serve()`.
 *
 * `handler` receives a raw Web API Request and must return a
 * Response — the same WinterCG signature as `Futon.fetch()`.
 *
 * Returns a handle with a `ready` promise (resolves immediately)
 * and a `close()` method to stop the server.
 *
 * @param handler - Fetch handler matching WinterCG signature.
 * @param options - Server options (port, host, callback).
 * @returns A handle to control the server lifecycle.
 */
declare function startBunServer(handler: (request: Request) => Promise<Response>, options?: BunServerOptions): BunServerHandle;

/**
 * Bun environment file loader.
 *
 * Reads `.env` / `.env.local` / `.env.{mode}` / `.env.{mode}.local`
 * from the project root using `Bun.file()` and merges them in
 * priority order (later files win).
 *
 * @example
 * ```ts
 * const env = await loadBunEnvFiles(process.cwd(), 'development');
 * // env = { PORT: '3000', HOST: 'localhost', ... }
 * ```
 */

/**
 * Load environment variables from .env files using the standard
 * dotenv priority order.
 *
 * @param rootDir - Project root directory containing .env files.
 * @param mode    - Current environment (`development` or `production`).
 * @returns Merged key-value map of all environment variables.
 */
declare function loadBunEnvFiles(rootDir: string, mode: 'development' | 'production'): Promise<EnvironmentMap>;

export { BunAssets, BunDevAdapter, type BunDevAdapterOptions, BunProdAdapter, type BunProdAdapterOptions, type BunServerHandle, type BunServerOptions, BunWatcher, loadBunEnvFiles, startBunServer };
