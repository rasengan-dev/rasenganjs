/**
 * Supported runtime environments.
 */
type Runtime = 'node' | 'bun' | 'workerd' | 'unknown';
/**
 * Metadata about the detected or configured runtime.
 */
interface RuntimeInfo {
    /** Detected runtime label. */
    runtime: Runtime;
    /** Server preset used to configure the Futon. */
    preset: 'node' | 'bun' | 'workerd';
    /** Whether the server is running in development or production. */
    mode: 'development' | 'production';
}
/**
 * Options passed to `RuntimeAdapter.serve()`.
 */
interface ServeOptions {
    /**
     * File watcher configuration.
     * When provided, the adapter watches the given paths and calls
     * `callback` (after debounce) on changes.
     */
    watch?: {
        /** File or directory path(s) to watch. */
        path: string | string[];
        /** Called when a watched file changes. */
        callback?: () => void;
        /** Debounce window in milliseconds (default 100). */
        debounceMs?: number;
    };
    /** Called when the HTTP server starts listening. */
    onListening?: (info: {
        port: number;
        host: string;
    }) => void;
    /**
     * Auto-restart configuration (nodemon-style).
     * The adapter spawns a child process and restarts it on file changes.
     */
    autoRestart?: {
        /** Path to the entry script. */
        entry: string;
        /** Whether to use child-process mode (default true). */
        process?: boolean;
        /** Extra arguments passed to the entry script. */
        args?: string[];
    };
}
/**
 * Platform-agnostic asset storage abstraction.
 *
 * - On Node/Bun: reads/writes the local filesystem
 * - On Workerd: no-ops (use KV / R2 instead)
 */
interface Assets {
    /** Read a file.  Returns null if not found. */
    get(path: string): Promise<Uint8Array | null>;
    /** Read a file and decode as UTF-8 text.  Returns null if not found. */
    load(path: string): Promise<string | null>;
    /** Write a file, creating parent directories if needed. */
    write(path: string, data: Uint8Array): Promise<void>;
    /** Delete a file or empty directory.  No-op if missing. */
    delete(path: string): Promise<void>;
    /** List all entries under a prefix/directory. */
    list(prefix: string): Promise<string[]>;
}
/**
 * Platform-agnostic interface for serving HTTP, watching files,
 * and accessing assets.
 *
 * Every platform adapter (Node, Bun, Workerd) implements this
 * so the Futon can run anywhere without changing its code.
 *
 * @typeParam T - The Futon type (default `any` to avoid
 *   a hard dependency on `@rasenganjs/futon`).
 */
interface RuntimeAdapter<T = any> {
    /**
     * Start an HTTP server and dispatch requests to the Futon.
     *
     * @param app - The Futon instance (required).
     * @param options - Serve options (watch, autoRestart, etc.).
     */
    serve(app?: T | null, options?: ServeOptions): Promise<void>;
    /** Stop the server and release all resources. */
    close(): void;
    /**
     * Watch a file or directory for changes.
     * Returns a dispose function to stop watching.
     */
    watch?(path: string, callback: () => void): () => void;
    /** Platform-specific asset storage. */
    assets: Assets;
}

export type { Assets as A, RuntimeAdapter as R, ServeOptions as S, Runtime as a, RuntimeInfo as b };
