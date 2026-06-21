/**
 * Context types — the core types that flow through every
 * middleware and handler.
 *
 * The design follows WinterCG conventions:
 *   - `request` is a standard Web API Request
 *   - `params` holds path parameters extracted by the router
 *   - `runtime` carries environment info (env vars, platform)
 *   - `state` is a mutable bag for passing data between
 *     middlewares (e.g. auth → handler, logger → error handler)
 */
/**
 * Runtime environment information.
 * This is the only platform-specific concept in Context.
 * It lets the same handler code run in Node, Bun, Deno,
 * Cloudflare Workers, etc. by carrying env vars and
 * (optionally) platform bindings.
 */
interface RuntimeContext {
    env?: Record<string, string>;
}
/**
 * Request-scoped context that every middleware and handler
 * receives.
 *
 * `state` replaces the ad-hoc pattern of decorating the
 * request object.  Middlewares write to it (auth sets
 * `state.user`), handlers and later middlewares read it.
 */
interface Context {
    /** The incoming Web API Request */
    request: Request;
    /** URL path parameters extracted by the Router */
    params: Record<string, string>;
    /** Runtime environment info */
    runtime: RuntimeContext;
    /**
     * Shared mutable state — the primary channel for
     * middleware-to-middleware and middleware-to-handler
     * communication.
     *
     * @example
     * ```ts
     * // auth middleware
     * app.use(async (ctx, next) => {
     *   ctx.set('user', await authenticate(ctx.request));
     *   return next();
     * });
     *
     * // handler
     * app.get('/me', async (ctx) => {
     *   const user = ctx.get('user');
     *   return json(user);
     * });
     * ```
     */
    state: Record<string, unknown>;
    /** Store a value on the context state bag */
    set<T = unknown>(key: string, value: T): void;
    /** Retrieve a value from the context state bag */
    get<T = unknown>(key: string): T | undefined;
}

/**
 * Middleware is the core abstraction for the request pipeline.
 *
 * Each middleware receives:
 *   - `ctx` — the request Context (mutable)
 *   - `next` — a thunk that resumes the downstream chain
 *
 * It MUST return the Promise<Response> that eventually
 * bubbles back up.  The canonical onion pattern:
 *
 * ```
 * Request → M1 → M2 → Handler → M2 → M1 → Response
 * ```
 *
 * @example
 * ```ts
 * const logger: Middleware = async (ctx, next) => {
 *   const start = Date.now();
 *   const response = await next();
 *   const ms = Date.now() - start;
 *   console.log(`${ctx.request.method} ${ctx.request.url} — ${ms}ms`);
 *   return response;
 * };
 * ```
 */
type Middleware = (ctx: Context, next: () => Promise<Response>) => Promise<Response>;

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
interface Route {
    method: HTTPMethod;
    pattern: string;
    handler: (ctx: Context) => Promise<Response>;
    middlewares: Middleware[];
}
/**
 * Configuration for a scoped route group.
 */
interface RouterGroupOptions {
    /** URL prefix for all routes in the group */
    prefix?: string;
    /** Middleware applied to every route in the group */
    middlewares?: Middleware[];
}
/**
 * Router — registers typed route handlers by method + pattern
 * and produces a Middleware that dispatches incoming requests.
 *
 * Features:
 *   - 7 HTTP method shortcuts (GET, POST, PUT, PATCH, DELETE,
 *     HEAD, OPTIONS)
 *   - Route-level middleware (applied per route before its handler)
 *   - Scoped `group()` with prefix and shared middleware
 *   - Produces a single `.middleware()` that plugs into the
 *     Application pipeline
 *
 * @example
 * ```ts
 * const router = new Router();
 *
 * router.get("/users", listUsers);
 * router.post("/users", createUser);
 * router.delete("/users/:id", deleteUser);
 *
 * // Scoped group with middleware
 * router.group("/api", (api) => {
 *   api.use(authMiddleware);
 *   api.get("/data", getData);
 * });
 *
 * app.use(router.middleware());
 * ```
 */
declare class Router {
    private routes;
    /**
     * Register route-level middleware.
     *
     * Middleware registered here only applies to routes defined
     * **after** the `.use()` call on this Router instance.
     * They run in the onion model just like app-level middleware.
     */
    private stack;
    /**
     * Register route-level middleware.
     * All routes defined after this call will go through these
     * middlewares first.
     */
    use(...middlewares: Middleware[]): this;
    get(pattern: string, handler: (ctx: Context) => Promise<Response>): this;
    post(pattern: string, handler: (ctx: Context) => Promise<Response>): this;
    put(pattern: string, handler: (ctx: Context) => Promise<Response>): this;
    patch(pattern: string, handler: (ctx: Context) => Promise<Response>): this;
    delete(pattern: string, handler: (ctx: Context) => Promise<Response>): this;
    head(pattern: string, handler: (ctx: Context) => Promise<Response>): this;
    options(pattern: string, handler: (ctx: Context) => Promise<Response>): this;
    /**
     * Create a scoped route group.
     *
     * All routes registered inside the callback are prefixed with
     * `prefix` and share any middleware passed via `middlewares`
     * or `options`.
     *
     * Groups can be nested.
     *
     * @example
     * ```ts
     * router.group("/api/v1", { middlewares: [auth] }, (api) => {
     *   api.get("/users", listUsers);      // → GET /api/v1/users
     *   api.post("/users", createUser);    // → POST /api/v1/users
     * });
     * ```
     */
    group(prefixOrOptions: string | RouterGroupOptions, ...rest: [RouterGroupOptions, (router: Router) => void] | [(router: Router) => void]): this;
    add(method: HTTPMethod, pattern: string, handler: (ctx: Context) => Promise<Response>): this;
    /**
     * Produce a Middleware that dispatches to matching routes.
     *
     * Call `.middleware()` once and pass it to `app.use()`.
     */
    middleware(): Middleware;
    /** Number of registered routes (useful for debugging) */
    routesCount(): number;
}

/**
 * Hooks — lightweight lifecycle system for the Application.
 *
 * Hooks let framework integrators and middleware authors
 * observe or intercept the request lifecycle without
 * adding middleware to the pipeline.
 *
 * Available hooks:
 *   - `beforeRequest` — fires once per request, before the
 *     middleware chain runs.  Receives the Context.
 *   - `afterResponse` — fires after the Response is produced
 *     (both success and error paths).  Receives (Context, Response).
 *   - `onError` — fires when an unhandled error escapes the
 *     middleware chain.  Receives (Error, Context).
 *
 * @example
 * ```ts
 * app.hooks.on('afterResponse', (ctx, response) => {
 *   metrics.record(ctx.request.method, response.status);
 * });
 * ```
 */
/** All recognised hook names */
type HookName = 'beforeRequest' | 'afterResponse' | 'onError';
/** A hook handler function — signature varies by hook name */
type HookHandler = (...args: unknown[]) => void | Promise<void>;
/**
 * Lightweight pub/sub hook registry.
 *
 * Implemented as a simple map of hook name → handler array
 * to keep zero-dependency and tree-shakeable.
 */
declare class HookSystem {
    private handlers;
    /**
     * Register a handler for a lifecycle hook.
     *
     * Handlers are called in registration order.
     * They may be async; `emit()` awaits all of them.
     */
    on(name: HookName, handler: HookHandler): void;
    /**
     * Remove a previously registered handler.
     */
    off(name: HookName, handler: HookHandler): void;
    /**
     * Fire all handlers registered for `name`.
     *
     * Each handler receives `args` spread as its arguments.
     * If any handler throws, subsequent handlers still run
     * (fire-and-forget within the hook scope).  The caller
     * is responsible for error reporting.
     */
    emit(name: HookName, ...args: unknown[]): Promise<void>;
    /** Remove all hook handlers (useful for testing / clean-up) */
    clear(): void;
}

/**
 * Application — the top-level orchestrator for the request pipeline.
 *
 * The Application:
 *   1. Maintains the global middleware stack
 *   2. Owns an internal Router for route registration
 *   3. Provides a `fetch(request, runtime)` entry point
 *      conforming to the WinterCG fetch handler signature
 *   4. Supports lifecycle hooks (beforeRequest, afterResponse, onError)
 *   5. Handles 404 and 500 with configurable handlers
 *
 * @example
 * ```ts
 * import { Application, json } from "@rasenganjs/runtime";
 *
 * const app = new Application();
 *
 * // Global middleware
 * app.use(logger());
 * app.use(cors());
 *
 * // Routes
 * app.get("/api/health", (ctx) => json({ status: "ok" }));
 *
 * // Error handling
 * app.onError((error, ctx) => {
 *   console.error(error);
 *   return json({ error: error.message }, { status: 500 });
 * });
 *
 * // Start server
 * const handler = toWinterCgHandler(app);
 * Bun.serve({ fetch: handler });
 * ```
 */

declare class Application {
    private middlewares;
    private router;
    /** Lifecycle hook registry */
    readonly hooks: HookSystem;
    constructor();
    /**
     * Register global middleware.
     *
     * If a string is passed as the first argument, the middleware
     * only runs for requests whose path starts with that prefix.
     *
     * @example
     * ```ts
     * app.use(cors());                     // global
     * app.use("/api", authMiddleware);     // scoped to /api/*
     * ```
     */
    use(middleware: Middleware): this;
    use(path: string, middleware: Middleware): this;
    get(pattern: string, handler: (ctx: Context) => Promise<Response>): this;
    post(pattern: string, handler: (ctx: Context) => Promise<Response>): this;
    put(pattern: string, handler: (ctx: Context) => Promise<Response>): this;
    patch(pattern: string, handler: (ctx: Context) => Promise<Response>): this;
    delete(pattern: string, handler: (ctx: Context) => Promise<Response>): this;
    head(pattern: string, handler: (ctx: Context) => Promise<Response>): this;
    options(pattern: string, handler: (ctx: Context) => Promise<Response>): this;
    /**
     * Create a scoped route group with shared prefix and middleware.
     *
     * Delegates to the internal Router's group method.
     *
     * @example
     * ```ts
     * app.group("/api/v1", { middlewares: [auth] }, (api) => {
     *   api.get("/users", listUsers);
     * });
     * ```
     */
    group(prefix: string, optionsOrCallback: {
        middlewares?: Middleware[];
    } | ((router: Router) => void), maybeCallback?: (router: Router) => void): this;
    /**
     * Get the internal Router instance for direct manipulation.
     * Useful when you want to build routes programmatically.
     */
    getRouter(): Router;
    private notFoundHandler?;
    private errorHandler?;
    /**
     * Register a custom 404 handler for unmatched routes.
     *
     * If not set, returns a plain-text "Not Found" response.
     */
    notFound(handler: (ctx: Context) => Promise<Response>): this;
    /**
     * Register a global error handler for uncaught exceptions.
     *
     * If not set, returns a plain-text "Internal Server Error"
     * response with status 500.
     */
    onError(handler: (error: Error, ctx: Context) => Promise<Response>): this;
    /**
     * Main entry point — process a Request through the full
     * middleware + router pipeline.
     *
     * This is the WinterCG `fetch` handler signature.
     *
     * Lifecycle:
     *   1. Emit `beforeRequest` hook
     *   2. Create Context
     *   3. Run composed middleware chain (including Router)
     *   4. Catch errors → emit `onError` hook → error handler
     *   5. Emit `afterResponse` hook
     *   6. Return Response
     */
    fetch(request: Request, runtime?: RuntimeContext): Promise<Response>;
}

/**
 * Factory that creates a fresh Context for every incoming request.
 *
 * Each context gets its own `state` bag (empty object) and
 * frozen-ish `set`/`get` accessors so middlewares can pass
 * data without polluting the request object.
 */
declare function createContext(request: Request, params?: Record<string, string>, runtime?: RuntimeContext): Context;

/**
 * compose() chains an array of Middleware functions into a
 * single Middleware using the classic Koa-style onion model.
 *
 * Each middleware calls `next()` to pass control downstream.
 * The returned Promise resolves when the entire chain — both
 * the downstream run and the upstream unwind — completes.
 *
 * Invariants enforced:
 *   - `next()` may only be called once per middleware
 *     (double-call throws an error)
 *   - If the array is empty, it returns the `next` fallback
 *     immediately
 *
 * @param middlewares — Ordered list of middleware functions
 * @returns A single Middleware that runs the full chain
 */
declare function compose(middlewares: Middleware[]): Middleware;

/**
 * Body parsing middleware — automatically parses request bodies
 * and stores the result on `ctx.state.parsedBody`.
 *
 * Supports:
 *   - application/json
 *   - application/x-www-form-urlencoded
 *   - multipart/form-data
 *   - text/plain and everything else
 *
 * Parsing is eager — the body is consumed before downstream
 * handlers run.  This is the only safe approach because the
 * Request body is a ReadableStream that can only be read once.
 *
 * @example
 * ```ts
 * import { bodyParser } from "@rasenganjs/runtime";
 *
 * app.use(bodyParser());
 *
 * app.post("/api/data", async (ctx) => {
 *   const body = ctx.get("parsedBody");
 *   return json({ received: body });
 * });
 * ```
 */

interface BodyParserOptions {
    /** Key under which parsed body is stored in ctx.state (default "parsedBody") */
    key?: string;
    /** Maximum body size in bytes (default unlimited) */
    maxSize?: number;
    /** Allowed content types (default all).  If the request's
     *  Content-Type does not match any entry, the body is NOT parsed. */
    allowedTypes?: string[];
}
/**
 * Middleware that parses the request body based on Content-Type
 * and stores it on `ctx.state`.
 *
 * Parsing is eager — the body is consumed immediately when the
 * middleware runs.  This is safe because:
 *   1. The body can only be read once (ReadableStream)
 *   2. Handlers and later middlewares can access it via
 *      `ctx.get(key)` synchronously
 */
declare function bodyParser(options?: BodyParserOptions): Middleware;

/**
 * CORS middleware — Cross-Origin Resource Sharing.
 *
 * Handles preflight OPTIONS requests and sets the appropriate
 * CORS headers on every response.
 *
 * @example
 * ```ts
 * import { cors } from "@rasenganjs/runtime";
 *
 * app.use(cors({
 *   origin: "https://myapp.com",
 *   credentials: true,
 * }));
 * ```
 */

interface CORSOptions {
    /** Allowed origin(s). Default "*" */
    origin?: string | string[];
    /** Allowed methods. Default "GET, POST, PUT, PATCH, DELETE, OPTIONS" */
    methods?: string;
    /** Allowed headers. Default "Content-Type, Authorization" */
    allowedHeaders?: string;
    /** Exposed headers (visible to the browser) */
    exposedHeaders?: string;
    /** Whether to allow credentials (cookies, auth headers) */
    credentials?: boolean;
    /** Max age for preflight cache (seconds) */
    maxAge?: number;
    /** Status code for preflight responses. Default 204 */
    optionsStatus?: number;
}
/**
 * Create CORS middleware.
 *
 * For each request:
 *   1. If it's an OPTIONS preflight, respond immediately with the
 *      configured CORS headers (no further middleware runs).
 *   2. For all other requests, let the chain proceed, then CORS
 *      headers are appended to the outgoing Response.
 */
declare function cors(options?: CORSOptions): Middleware;

/**
 * Logger middleware — logs each request with method, URL, status
 * code, and duration.
 *
 * The default logger writes to `console.log`.  Pass a custom
 * `log` function to integrate with your own logging framework.
 *
 * @example
 * ```ts
 * import { logger } from "@rasenganjs/runtime";
 *
 * app.use(logger());                          // default
 * app.use(logger({ log: (msg) => pino.info(msg) })); // custom
 * ```
 */

interface LoggerOptions {
    /** Custom log function.  Default `console.log` */
    log?: (message: string) => void;
    /** Include response body size in the log line */
    showSize?: boolean;
    /** Skip logging for certain path prefixes */
    skip?: string[];
}
/**
 * Create a request-logging middleware.
 *
 * Log format:
 * ```
 * → GET /api/users
 * ← 200 12ms
 * ```
 */
declare function logger(options?: LoggerOptions): Middleware;

/**
 * Request ID middleware — assigns a unique ID to every request.
 *
 * If the client sends an `X-Request-Id` header, that value is
 * used (useful for distributed tracing).  Otherwise a UUID v4
 * is generated.
 *
 * The ID is available at `ctx.state.requestId` and is also set
 * on the `X-Request-Id` response header.
 */

interface RequestIdOptions {
    /** Header name to read/write (default "X-Request-Id") */
    header?: string;
    /** Key on ctx.state (default "requestId") */
    stateKey?: string;
    /**
     * Custom ID generator.  Default uses `crypto.randomUUID()`
     * with a fallback to `Date.now().toString(36)` for
     * environments without Web Crypto.
     */
    generator?: () => string;
}
/**
 * Create a Request ID middleware.
 *
 * @example
 * ```ts
 * import { requestId } from "@rasenganjs/runtime";
 *
 * app.use(requestId());
 * // Later:
 * app.use(async (ctx, next) => {
 *   console.log("Handling request", ctx.get("requestId"));
 *   return next();
 * });
 * ```
 */
declare function requestId(options?: RequestIdOptions): Middleware;

/**
 * Compression middleware — gzip/brotli/deflate response bodies
 * based on the client's `Accept-Encoding` header.
 *
 * Uses the Web API `CompressionStream` when available (browsers,
 * Deno, recent Node 22+).  Falls back to no compression in
 * environments without native `CompressionStream`.
 *
 * @example
 * ```ts
 * import { compress } from "@rasenganjs/runtime";
 *
 * app.use(compress()); // Compress everything over 1 KB
 * ```
 */

interface CompressOptions {
    /** Minimum body size in bytes to compress (default 1024) */
    threshold?: number;
    /** Accepted encodings in priority order (default ["br", "gzip", "deflate"]) */
    encodings?: string[];
}
/**
 * Create a compression middleware.
 */
declare function compress(options?: CompressOptions): Middleware;

/**
 * Path matching utilities — converts route patterns to
 * regular expressions and extracts parameters.
 *
 * Pattern syntax:
 *   - `:param`        — required named segment  e.g. `/users/:id`
 *   - `:param?`       — optional named segment  e.g. `/users/:id?`
 *   - `:param*`       — wildcard named segment  e.g. `/files/:path*`
 *   - `*`             — catch-all (greedy)       e.g. `/static/*`
 *   - `/path`         — static segment
 *
 * All matched param values are URL-decoded.
 * The `/` trailing slash is normalised (stripped for matching
 * but preserved in the param values).
 */
/**
 * Try to match a route pattern against a pathname.
 *
 * Returns an object of captured params, or `null` if no match.
 *
 * @example
 * ```ts
 * matchPath("/users/:id", "/users/42")     // → { id: "42" }
 * matchPath("/users/:id?", "/users")       // → {}
 * matchPath("/files/:path*", "/files/a/b") // → { path: "a/b" }
 * matchPath("/static/*", "/static/foo.js") // → { _: "foo.js" }
 * matchPath("/users/:id", "/posts")        // → null
 * ```
 */
declare function matchPath(pattern: string, pathname: string): Record<string, string> | null;
/**
 * Parse a query string into a plain key-value map.
 *
 * Handles URL-encoded keys and values.
 */
declare function parseQueryString(url: string): Record<string, string>;

/**
 * Response utilities — ergonomic factories over the Web API
 * Response constructor.
 *
 * Every function returns a standard `Response` object so the
 * pipeline stays platform-agnostic.
 */
/**
 * Create a JSON Response.
 *
 * Thin wrapper around `Response.json()`.
 *
 * @param data — Any JSON-serialisable value
 * @param init — Optional status + headers overrides
 */
declare function json(data: unknown, init?: ResponseInit): Response;
/**
 * Create a plain-text Response.
 *
 * @param value — Response body string
 * @param init  — Optional status + headers overrides
 */
declare function text(value: string, init?: ResponseInit): Response;
/**
 * Create an HTML Response with the correct Content-Type header.
 *
 * @param value — HTML string
 * @param init  — Optional status + headers overrides
 */
declare function html(value: string, init?: ResponseInit): Response;
/**
 * Create a redirect Response (default 302 Found).
 *
 * Uses manual construction instead of `Response.redirect()` to
 * guarantee relative URLs work in every runtime (Node, Bun,
 * Workers, Deno).
 *
 * @param url    — Redirect target (absolute or relative)
 * @param status — HTTP status (301 | 302 | 307 | 308)
 */
declare function redirect(url: string, status?: number): Response;
/**
 * Create a status-only Response (no body).
 *
 * @param code — HTTP status code
 * @param body — Optional body text
 */
declare function status(code: number, body?: string): Response;
/**
 * Shorthand for a 404 Not Found response.
 *
 * @param body — Optional body text (default "Not Found")
 */
declare function notFound(body?: string): Response;
/**
 * Create a streaming Response from a ReadableStream.
 *
 * Critical for SSR — React's `renderToPipeableStream` produces
 * a pipeable stream that this helper wraps into a standard
 * Response.
 *
 * @example
 * ```ts
 * import { renderToPipeableStream } from "react-dom/server";
 *
 * app.get("/", async (ctx) => {
 *   const stream = renderToPipeableStream(<App />, {
 *     onShellReady() {
 *       resolve(stream);
 *     },
 *   });
 *   return streamResponse(stream, { status: 200 });
 * });
 * ```
 *
 * @param stream — A ReadableStream (or object with `.pipe()`)
 * @param init   — Optional status + headers
 */
declare function streamResponse(stream: ReadableStream<Uint8Array>, init?: ResponseInit): Response;
/**
 * Create a Response from a Node.js-style readable stream
 * by wrapping it in a Web API ReadableStream.
 *
 * Bridges the gap between Node streams (used by React SSR)
 * and the Web API Response.
 *
 * @param nodeStream — An object with `on('data')` / `on('end')` /
 *                     `on('error')` pattern (e.g. React's pipeable)
 * @param init       — Optional status + headers
 */
declare function nodeStreamToResponse(nodeStream: {
    pipe: (destination: WritableStream<Uint8Array>) => void;
    on?: (event: string, handler: (...args: unknown[]) => void) => void;
}, init?: ResponseInit): Response;

/**
 * Response cookie helpers — set cookies on outbound Responses.
 *
 * These follow the Set-Cookie spec and let you compose
 * multiple cookies on a single response.
 */
/** Options for setting a cookie */
interface CookieOptions {
    /** Domain the cookie belongs to */
    domain?: string;
    /** URL path the cookie applies to (default "/") */
    path?: string;
    /** Lifetime in seconds (omitted = session cookie) */
    maxAge?: number;
    /** Whether the cookie is HTTP-only (not readable by JS) */
    httpOnly?: boolean;
    /** Whether the cookie requires HTTPS */
    secure?: boolean;
    /** SameSite policy */
    sameSite?: 'Strict' | 'Lax' | 'None';
    /** Explicit expiration date */
    expires?: Date;
}
/**
 * Serialise a cookie name/value pair with options into a
 * Set-Cookie header value string.
 */
declare function serializeCookie(name: string, value: string, options?: CookieOptions): string;
/**
 * Set a cookie on a Response and return a new Response
 * (head and body are preserved).
 *
 * @example
 * ```ts
 * const res = json({ ok: true });
 * return setCookie(res, "session", token, {
 *   httpOnly: true,
 *   secure: true,
 *   maxAge: 86400,
 * });
 * ```
 */
declare function setCookie(response: Response, name: string, value: string, options?: CookieOptions): Response;
/**
 * Clear a cookie by setting Max-Age=0.
 */
declare function clearCookie(response: Response, name: string, options?: CookieOptions): Response;

/**
 * Request URL helpers — convenience wrappers around the
 * Web API URL constructor.
 */
/** Extract the pathname from a Request */
declare function getPathname(request: Request): string;
/** Parse query string into a plain object */
declare function getQueryParams(request: Request): Record<string, string>;
/** Get a single query parameter by key (or null) */
declare function getQueryParam(request: Request, key: string): string | null;

/**
 * Body parsing utilities — turn the raw Request body into
 * usable data structures.
 *
 * These are designed as standalone async functions so you
 * can use them inside route handlers directly, or compose
 * them into middleware for automatic parsing.
 *
 * IMPORTANT: the Request body is a ReadableStream.  Once
 * consumed, it cannot be re-read.  Parsers should be called
 * once per request, preferably early in the middleware chain.
 */
/**
 * Parse the request body as JSON.
 *
 * @throws {SyntaxError} If the body is not valid JSON
 */
declare function parseJson<T = unknown>(request: Request): Promise<T>;
/**
 * Parse the request body as URL-encoded form data
 * (Content-Type: application/x-www-form-urlencoded).
 */
declare function parseUrlEncoded(request: Request): Promise<Record<string, string>>;
/**
 * Parse the request body as multipart/form-data.
 *
 * Returns the native FormData object.  For file uploads,
 * use `.get("field")` and check `instanceof File`.
 */
declare function parseFormData(request: Request): Promise<FormData>;
/**
 * Parse the request body as plain text.
 */
declare function parseText(request: Request): Promise<string>;
/**
 * Auto-detect the content type and parse accordingly.
 *
 * Content-Type detection:
 *   - application/json        → JSON
 *   - application/x-www-form-urlencoded → URL-encoded
 *   - multipart/form-data     → FormData
 *   - text/*                  → text
 *   - otherwise               → text
 */
declare function parseBody<T = unknown>(request: Request): Promise<T | Record<string, string> | FormData | string>;

/**
 * Request cookie parsing — read cookies from the incoming
 * Cookie header.
 */
/**
 * Parse the Cookie header into a plain key-value map.
 *
 * Handles:
 *   - Multiple cookies separated by "; "
 *   - URL-encoded names and values (decodeURIComponent)
 *
 * @example
 * ```ts
 * const cookies = parseCookies(request);
 * const session = cookies["session"];
 * ```
 */
declare function parseCookies(request: Request): Record<string, string>;
/**
 * Get a single cookie value by name.
 */
declare function getCookie(request: Request, name: string): string | undefined;

/**
 * Express adapter — bridges the WinterCG pipeline to an
 * Express request/response pair.
 *
 * The adapter:
 *   1. Reads the Express req + res and constructs a Web API
 *      Request.
 *   2. Calls `app.fetch(request, runtime)`.
 *   3. Writes the Response status, headers, and body back
 *      to the Express response object.
 *
 * @example
 * ```ts
 * import express from "express";
 * import { Application, toExpressHandler } from "@rasenganjs/runtime";
 *
 * const app = new Application();
 * // ... set up routes and middleware
 *
 * const expressApp = express();
 * expressApp.use(toExpressHandler(app));
 * expressApp.listen(3000);
 * ```
 *
 * For streaming (SSR), the adapter pipes the Web Response body
 * directly to the Node response socket.
 */

interface ExpressRequest {
    method: string;
    url: string;
    headers: Record<string, string | string[] | undefined>;
    /** Incoming body (if already parsed by Express middleware) */
    body?: unknown;
    /** Raw readable stream (Node IncomingMessage is a Readable) */
    on?: (event: string, handler: (...args: unknown[]) => void) => void;
}
interface ExpressResponse {
    statusCode: number;
    status: (code: number) => ExpressResponse;
    setHeader: (name: string, value: string) => void;
    getHeader: (name: string) => string | undefined;
    end: (chunk?: unknown) => void;
    write: (chunk: unknown) => void;
    /** Express 4.x uses this for stream piping */
    on?: (event: string, handler: (...args: unknown[]) => void) => void;
}
type ExpressNextFunction = (err?: unknown) => void;
/**
 * Convert a Rasengan Application into an Express request
 * handler `(req, res, next)`.
 */
declare function toExpressHandler(app: Application, runtime?: RuntimeContext): (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => Promise<void>;

/**
 * WinterCG adapter — produces a standard fetch handler that
 * can be used in any WinterCG-compatible runtime.
 *
 * This is the "export default { fetch }" pattern used by:
 *   - Cloudflare Workers
 *   - Deno (Deno.serve)
 *   - Bun (Bun.serve)
 *   - Service Workers
 *   - Node 18+ (node --experimental-fetch)
 *
 * @example
 * ```ts
 * // wrangler.toml / Cloudflare Worker
 * import { Application, toWinterCgHandler } from "@rasenganjs/runtime";
 *
 * const app = new Application();
 * // ... routes
 *
 * export default { fetch: toWinterCgHandler(app) };
 * ```
 *
 * @example
 * ```ts
 * // Bun / Deno
 * import { Application, toWinterCgHandler } from "@rasenganjs/runtime";
 *
 * const app = new Application();
 * // ... routes
 *
 * Bun.serve({ fetch: toWinterCgHandler(app) });
 * ```
 */

/**
 * Context that WinterCG runtimes pass to the fetch handler.
 *
 * - Cloudflare Workers: `(request, env, ctx)`
 * - Deno: `(request, info)`
 * - Bun: `(request, server)`
 * - Service Workers: `(request)`
 */
interface WinterCgFetchContext {
    /** Platform bindings / environment variables (Workers, Deno) */
    env?: Record<string, unknown>;
    /** Platform-specific context (waitUntil, passThroughOnException) */
    ctx?: {
        waitUntil?: (promise: Promise<unknown>) => void;
        passThroughOnException?: () => void;
    };
}
/**
 * Convert a Rasengan Application into a WinterCG-compatible
 * fetch handler.
 *
 * The returned function has the signature that WinterCG
 * expects: `(request: Request, env?: object, ctx?: object) => Promise<Response>`.
 */
declare function toWinterCgHandler(app: Application, defaultRuntime?: RuntimeContext): (request: Request, envOrCtx?: Record<string, unknown> | WinterCgFetchContext, platformCtx?: WinterCgFetchContext) => Promise<Response>;

/**
 * Errors package — standard HTTP error hierarchy.
 *
 * Every error carries a numeric `status` so the Application
 * can map it directly to an HTTP response status code.
 */
/**
 * Generic HTTP error. Thrown (or stored) anywhere in the
 * middleware chain.  The Application's error handler
 * catches these and responds with the appropriate status.
 */
declare class HttpError extends Error {
    /** The HTTP status code (e.g. 404, 500) */
    status: number;
    constructor(status: number, message?: string);
}
/** 404 Not Found */
declare class NotFoundError extends HttpError {
    constructor(message?: string);
}
/** 405 Method Not Allowed */
declare class MethodNotAllowedError extends HttpError {
    constructor(message?: string);
}
/** 500 Internal Server Error */
declare class InternalServerError extends HttpError {
    constructor(message?: string);
}

/**
 * Options shared by all platform adapters' serve() method.
 * Platform-specific packages may extend this interface.
 */
interface ServeOptions {
    /**
     * Configure a file watcher that starts automatically
     * when the server starts.
     *
     * The callback fires (after debounce) when any watched
     * file changes.  Use this to rebuild, restart, or notify
     * the dev server.
     */
    watch?: {
        /** File or directory path(s) to watch */
        path: string | string[];
        /** Called when a watched file changes */
        callback?: () => void;
        /** Debounce window in milliseconds (default 100) */
        debounceMs?: number;
    };
    /**
     * Automatically restart the server when watched files
     * change.
     *
     * Requires `watch` to also be set.  When `process` is
     * true (default), the adapter spawns `node <entry>` as a
     * child process and restarts it on file changes — this
     * matches nodemon's model and avoids all ESM caching /
     * global state issues.
     *
     * The `serve()` promise stays pending until `close()`
     * is called, regardless of how many restarts happen.
     */
    autoRestart?: {
        /**
         * Path to the entry script passed to `node <entry>`.
         *
         * The script is responsible for creating its own HTTP
         * server.  The adapter forwards the port via the
         * `PORT` environment variable.
         *
         * @example "./src/dev-server.js"
         */
        entry: string;
        /**
         * Use child-process mode (default: true).
         *
         * When true, the adapter spawns `node <entry>` as an
         * external process — the cleanest form of reload since
         * the OS handles full teardown.  Set to false to fall
         * back to in-process cache-busted import.
         */
        process?: boolean;
        /** Extra arguments passed to the entry script. */
        args?: string[];
    };
}

/**
 * RuntimeAdapter — platform-agnostic interface for serving HTTP,
 * watching files, and accessing assets.
 *
 * Every platform package (@rasenganjs/runtime-node,
 * @rasenganjs/runtime-bun, etc.) implements this interface so
 * the Application can run anywhere without changing its code.
 *
 * Methods marked with ? are optional — a production adapter
 * may omit watch(), and a serverless adapter may implement
 * assets differently.
 */
interface RuntimeAdapter {
    /**
     * Start an HTTP server and dispatch incoming requests to
     * the given Application.
     *
     * `app` may be omitted if `options.autoRestart.entry` is
     * provided — the adapter loads the entry module itself.
     *
     * If `options.watch` is provided and the platform supports
     * file watching, the watcher starts automatically and runs
     * until the server closes.
     *
     * The returned Promise resolves when the server closes.
     */
    serve(app?: Application | null, options?: ServeOptions): Promise<void>;
    /**
     * Stop the server and release all resources (file watchers,
     * child processes, network sockets).  After calling close()
     * the adapter must not be reused.
     */
    close(): void;
    /**
     * Watch a file or directory for changes.
     *
     * Returns a dispose function that stops the watcher.
     * Implementations should debounce rapid change events.
     */
    watch?(path: string, callback: () => void): () => void;
    /**
     * Platform-specific asset storage abstraction.
     *
     * In Node this reads/writes the local filesystem.
     * In serverless environments this could map to S3, R2, etc.
     * All paths are relative to the platform's configured root.
     */
    assets: {
        /** Read a file. Returns null if not found. */
        get(path: string): Promise<Uint8Array | null>;
        /**
         * Read a file and decode its content as UTF-8 text.
         * Returns null if not found.
         */
        load(path: string): Promise<string | null>;
        /** Write a file, creating parent directories if needed. */
        write(path: string, data: Uint8Array): Promise<void>;
        /** Delete a file or empty directory. No-op if missing. */
        delete(path: string): Promise<void>;
        /** List all entries under a prefix/directory. */
        list(prefix: string): Promise<string[]>;
    };
}

/**
 * A FetchHandler is the fundamental request handler primitive.
 * It accepts a Request and a optional Runtime Adapter and
 * returns a Promise<Response>.
 *
 * This is the lowest-level building block — every middleware,
 * route handler, and error handler ultimately conforms to this
 * shape (though middleware additionally calls next()).
 */
type FetchHandler = (request: Request, runtime?: RuntimeAdapter) => Promise<Response>;

export { Application, type BodyParserOptions, type CORSOptions, type CompressOptions, type Context, type CookieOptions, type FetchHandler, type HTTPMethod, type HookHandler, type HookName, HookSystem, HttpError, InternalServerError, type LoggerOptions, MethodNotAllowedError, type Middleware, NotFoundError, type RequestIdOptions, type Route, Router, type RouterGroupOptions, type RuntimeAdapter, type RuntimeContext, type ServeOptions, bodyParser, clearCookie, compose, compress, cors, createContext, getCookie, getPathname, getQueryParam, getQueryParams, html, json, logger, matchPath, nodeStreamToResponse, notFound, parseBody, parseCookies, parseFormData, parseJson, parseQueryString, parseText, parseUrlEncoded, redirect, requestId, serializeCookie, setCookie, status, streamResponse, text, toExpressHandler, toWinterCgHandler };
