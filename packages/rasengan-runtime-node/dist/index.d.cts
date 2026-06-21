import { RuntimeAdapter, Application, ServeOptions } from '@rasenganjs/runtime';

/**
 * NodeAssets — local filesystem implementation of the assets API.
 *
 * All paths are resolved relative to `rootDir` (defaults to
 * process.cwd()).  Directory separators are normalized to '/'.
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
    private resolvePath;
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
 * // ── In-process mode ──
 * import { Application } from "@rasenganjs/runtime";
 * import { NodeDevAdapter } from "@rasenganjs/runtime-node";
 *
 * const app = new Application();
 * app.get("/hello", (ctx) => new Response("Hello!"));
 *
 * const adapter = new NodeDevAdapter({ port: 3000 });
 * await adapter.serve(app);
 *
 * // ── Child-process mode (nodemon-style) ──
 * // Your entry script creates its own server.
 * // The adapter spawns `node <entry>` and restarts it on changes.
 * await adapter.serve(null, {
 *   watch: { path: "src/" },
 *   autoRestart: { entry: "./src/dev-server.mjs" }
 * });
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
    serve(app: Application | null, options?: ServeOptions): Promise<void>;
    close(): void;
    watch(path: string, callback: () => void): () => void;
    private currentApp;
    private serveOptions;
    private restarting;
    private closing;
    private startServer;
    private restartInProcess;
    private serveChildProcess;
    private setupWatcher;
    private spawnChild;
    /** Kill a child process and wait for it to exit (force SIGKILL after 3s). */
    private killChild;
    private restartChildProcess;
}

/**
 * NodeProdAdapter — RuntimeAdapter for Node.js production.
 *
 * Features:
 *   - HTTP server on configurable port/host
 *   - Local filesystem assets (read-only: no write/delete in prod)
 *
 * Differences from NodeDevAdapter:
 *   - No file watcher (`watch()` is undefined)
 *   - Assets write/delete throw in production
 *
 * @example
 * ```ts
 * import { Application } from "@rasenganjs/runtime";
 * import { NodeProdAdapter } from "@rasenganjs/runtime-node";
 *
 * const app = new Application();
 *
 * const adapter = new NodeProdAdapter({ port: 8080, rootDir: './dist' });
 * await adapter.serve(app.fetch);
 * ```
 */

interface NodeProdAdapterOptions {
    port?: number;
    host?: string;
    rootDir?: string;
}
declare class NodeProdAdapter implements RuntimeAdapter {
    private options;
    readonly assets: {
        get(path: string): Promise<Uint8Array | null>;
        write(path: string, data: Uint8Array): Promise<void>;
        delete(path: string): Promise<void>;
        list(prefix: string): Promise<string[]>;
    };
    private serverHandle;
    constructor(options?: NodeProdAdapterOptions);
    serve(app: Application, _options?: ServeOptions): Promise<void>;
    /** Stop the HTTP server. */
    close(): void;
}

/**
 * NodeWatcher — filesystem watcher using `fs.watch`.
 *
 * Debounces rapid change events (default 100ms) so build
 * pipelines aren't triggered multiple times per save.
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
     * @param path     — File or directory path to watch
     * @param callback — Called (after debounce) when a change is detected
     * @param debounceMs — Debounce window in milliseconds (default 100)
     * @returns A dispose function that stops the watcher
     */
    watch(path: string, callback: () => void, debounceMs?: number): () => void;
}

/**
 * HTTP server utilities for Node adapters.
 *
 * Provides `startNodeServer` which wraps `http.createServer`
 * and converts Node.js IncomingMessage/ServerResponse into the
 * Web API Request/Response pattern.
 *
 * The adapter layer (NodeDevAdapter / NodeProdAdapter) is
 * responsible for creating the Context from the Request.
 */

/**
 * Options shared by all Node-based servers.
 */
interface NodeServerOptions {
    host?: string;
    port?: number;
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
 * Response.  This is the WinterCG fetch handler signature,
 * matching `Application.fetch()`.
 *
 * Returns a handle with a `ready` promise (resolves on close)
 * and a `close()` method to shut down.
 */
declare function startNodeServer(app: Application, options?: NodeServerOptions): NodeServerHandle;

export { NodeAssets, NodeDevAdapter, type NodeDevAdapterOptions, NodeProdAdapter, type NodeProdAdapterOptions, type NodeServerHandle, type NodeServerOptions, NodeWatcher, startNodeServer };
