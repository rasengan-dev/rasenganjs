import { R as RuntimeAdapter, S as ServeOptions, A as Assets } from '../../types-BNS4B2pc.cjs';
import { EnvironmentMap } from '../../index.cjs';

/**
 * NodeAssets — local filesystem implementation of the Assets API.
 *
 * All paths are resolved relative to `rootDir` (defaults to
 * `process.cwd()`). Directory separators are normalized to '/'.
 * Path traversal attacks are prevented by checking that the
 * resolved path stays within `rootDir`.
 *
 * @example
 * ```ts
 * const assets = new NodeAssets('/path/to/project');
 *
 * const buf = await assets.get('public/logo.png');
 * await assets.write('dist/output.txt', new TextEncoder().encode('hello'));
 * await assets.delete('tmp/cache.json');
 * const files = await assets.list('src/');
 * ```
 */
declare class NodeAssets {
    private rootDir;
    constructor(rootDir?: string);
    /**
     * Read a file from the local filesystem.
     * Returns `null` if the file does not exist or is a directory.
     */
    get(path: string): Promise<Uint8Array | null>;
    /**
     * Read a file and decode its content as UTF-8 text.
     * Returns `null` if the file does not exist or is a directory.
     */
    load(path: string): Promise<string | null>;
    /**
     * Write a file to the local filesystem.
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
 * NodeDevAdapter — RuntimeAdapter for Node.js development.
 *
 * Features:
 *   - In-process HTTP server (when Application is passed directly)
 *   - Child-process spawning (nodemon-style) for `autoRestart`
 *   - File watcher with debounce + auto-restart on change
 *   - Local filesystem assets (read/write/delete/list)
 *
 * @example
 * ```ts
 * // In-process mode
 * import { Application } from "@rasenganjs/futon";
 * import { NodeDevAdapter } from "@rasenganjs/runtime/adapters/node";
 *
 * const app = new Application();
 * app.get("/hello", () => new Response("Hello!"));
 *
 * const adapter = new NodeDevAdapter({ port: 3000 });
 * await adapter.serve(app);
 * ```
 */

interface NodeDevAdapterOptions {
    port?: number;
    host?: string;
    rootDir?: string;
}
declare class NodeDevAdapter implements RuntimeAdapter {
    private options;
    private watcher;
    readonly assets: NodeAssets;
    private serverHandle;
    private disposeWatcher;
    private serveResolve;
    private childProcess;
    constructor(options?: NodeDevAdapterOptions);
    /**
     * Start the Node.js development server.
     *
     * Requires an Application instance (in-process mode).
     * When `options.autoRestart` is provided the returned promise
     * stays pending until `close()` is called.
     */
    serve(app: any | null, options?: ServeOptions): Promise<void>;
    /** Stop the server, watcher, and any child process. */
    close(): void;
    /** Watch a file or directory for changes. */
    watch(path: string, callback: () => void): () => void;
    private serveOptions;
    /** Start the in-process HTTP server. */
    private startServer;
}

/**
 * NodeProdAdapter — RuntimeAdapter for Node.js production.
 *
 * Features:
 *   - HTTP server on configurable port/host
 *   - Local filesystem assets (read-only: write/delete are no-ops)
 *
 * Differences from NodeDevAdapter:
 *   - No file watcher (`watch()` is undefined)
 *   - Assets write/delete are no-ops in production
 *
 * @example
 * ```ts
 * import { Application } from "@rasenganjs/futon";
 * import { NodeProdAdapter } from "@rasenganjs/runtime/adapters/node";
 *
 * const app = new Application();
 * const adapter = new NodeProdAdapter({ port: 8080, rootDir: './dist' });
 * await adapter.serve(app);
 * ```
 */

interface NodeProdAdapterOptions {
    port?: number;
    host?: string;
    rootDir?: string;
}
declare class NodeProdAdapter implements RuntimeAdapter {
    private options;
    readonly assets: Assets;
    private serverHandle;
    constructor(options?: NodeProdAdapterOptions);
    /**
     * Start the Node.js production server.
     *
     * Configures the Application with production settings, loads
     * environment files, and starts listening.
     */
    serve(app: any, options?: ServeOptions): Promise<void>;
    /** Stop the HTTP server. */
    close(): void;
}

/**
 * NodeWatcher — filesystem watcher using `node:fs.watch`.
 *
 * Debounces rapid change events (default 100ms) so build pipelines
 * aren't triggered multiple times per save.
 *
 * @example
 * ```ts
 * const watcher = new NodeWatcher();
 * const dispose = watcher.watch('src/', () => rebuild());
 * // later
 * dispose();
 * ```
 */
declare class NodeWatcher {
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
 * HTTP server utilities for Node adapters.
 *
 * Provides `startNodeServer` which wraps `http.createServer`
 * and converts Node.js `IncomingMessage`/`ServerResponse` into
 * the Web API `Request`/`Response` pattern.
 *
 * The adapter layer (NodeDevAdapter / NodeProdAdapter) is
 * responsible for creating the handler from the Application.
 */
/**
 * Options shared by all Node-based servers.
 */
interface NodeServerOptions {
    host?: string;
    port?: number;
    /** Called when the server starts listening. */
    onListening?: (info: {
        port: number;
        host: string;
    }) => void;
}
/**
 * Server handle returned by `startNodeServer`.
 */
interface NodeServerHandle {
    /** Resolves when the server closes. */
    ready: Promise<void>;
    /** Stop the server. */
    close(): void;
}
/**
 * Start a Node HTTP server.
 *
 * `handler` receives a raw Web API Request and must return a
 * Response. This is the WinterCG fetch handler signature,
 * matching `Application.fetch()`.
 *
 * Returns a handle with a `ready` promise (resolves on close)
 * and a `close()` method to shut down.
 *
 * @param handler - Fetch handler matching WinterCG signature.
 * @param options - Server options (port, host, callback).
 * @returns A handle to control the server lifecycle.
 */
declare function startNodeServer(handler: (request: Request) => Promise<Response>, options?: NodeServerOptions): NodeServerHandle;

/**
 * Node.js environment file loader.
 *
 * Reads `.env` / `.env.local` / `.env.{mode}` / `.env.{mode}.local`
 * from the project root using `node:fs/promises.readFile` and merges
 * them in priority order (later files win).
 *
 * @example
 * ```ts
 * const env = await loadNodeEnvFiles(process.cwd(), 'development');
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
declare function loadNodeEnvFiles(rootDir: string, mode: 'development' | 'production'): Promise<EnvironmentMap>;

export { NodeAssets, NodeDevAdapter, type NodeDevAdapterOptions, NodeProdAdapter, type NodeProdAdapterOptions, type NodeServerHandle, type NodeServerOptions, NodeWatcher, loadNodeEnvFiles, startNodeServer };
