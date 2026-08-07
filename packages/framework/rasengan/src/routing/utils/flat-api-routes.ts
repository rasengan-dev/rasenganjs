import {
  Router,
  type Context,
  type HTTPMethod,
  type Middleware,
} from '@rasenganjs/futon';
import { normalizeSegment } from './flat-routes.js';

const basePath = '/src/app/_api/';

const HTTP_METHODS: HTTPMethod[] = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'HEAD',
  'OPTIONS',
];

export type ApiHandler = (ctx: Context) => Promise<Response>;

export type ApiRouteModule = Partial<Record<HTTPMethod, ApiHandler>> &
  Record<string, unknown>;

export type ApiMiddlewareModule = {
  default: Middleware | Middleware[];
};

/**
 * Raw tree node — built synchronously from file paths, still holding
 * lazy `() => Promise<Module>` loaders (as produced by `import.meta.glob`).
 */
type ApiNode = {
  /** URL segment this node contributes ('' for root and route groups). */
  urlSegment: string;
  middleware?: () => Promise<ApiMiddlewareModule>;
  routes: Array<{
    urlSegment: string;
    source: string;
    module: () => Promise<ApiRouteModule>;
  }>;
  /** Keyed by raw (non-normalized) folder name, to keep e.g. two
   * different route groups `(a)`/`(b)` — which both contribute an
   * empty URL segment — as distinct nodes. */
  children: Map<string, ApiNode>;
};

/** Same node shape, but with every module already awaited. */
type ResolvedApiNode = {
  urlSegment: string;
  middlewares: Middleware[];
  routes: Array<{
    urlSegment: string;
    source: string;
    handlers: ApiRouteModule;
  }>;
  children: ResolvedApiNode[];
};

function createNode(urlSegment: string): ApiNode {
  return { urlSegment, routes: [], children: new Map() };
}

/** Raw (non-normalized) folder segments for a file path, filename dropped. */
function getFolderPathParts(filePath: string): string[] {
  const relative = filePath.replace(basePath, '');
  const parts = relative.split('/');
  parts.pop(); // drop the filename itself
  return parts;
}

/** A route group `(name)` contributes no URL segment but still scopes middleware. */
function urlSegmentFor(rawSegment: string): string {
  if (rawSegment.startsWith('(') && rawSegment.endsWith(')')) return '';
  return normalizeSegment(rawSegment);
}

/** Walk/create the folder path in the tree, keyed by raw segment names. */
function ensureNode(root: ApiNode, rawSegments: string[]): ApiNode {
  let node = root;

  for (const rawSegment of rawSegments) {
    let child = node.children.get(rawSegment);

    if (!child) {
      child = createNode(urlSegmentFor(rawSegment));
      node.children.set(rawSegment, child);
    }

    node = child;
  }

  return node;
}

function insertMiddleware(
  root: ApiNode,
  filePath: string,
  mod: () => Promise<ApiMiddlewareModule>
) {
  const node = ensureNode(root, getFolderPathParts(filePath));
  node.middleware = mod;
}

function insertRoute(
  root: ApiNode,
  filePath: string,
  mod: () => Promise<ApiRouteModule>
) {
  const relative = filePath.replace(basePath, '');
  const fileName = relative.split('/').pop() as string; // e.g. "[id].route.ts"
  const rawSegment = fileName.replace(/\.route\.(js|ts)$/, ''); // "[id]", "index", "payment"
  const normalized = normalizeSegment(rawSegment); // ':id', '.', 'payment'

  const node = ensureNode(root, getFolderPathParts(filePath));

  node.routes.push({
    urlSegment: normalized === '.' ? '' : normalized,
    source: filePath,
    module: mod,
  });
}

/**
 * Await every module in a node (its own middleware + route handlers)
 * and recurse into children — one pass, so the second (synchronous)
 * pass can register everything onto a Futon `Router` without ever
 * needing to await mid-registration (`Router.group()`'s callback is
 * synchronous).
 */
async function resolveNode(node: ApiNode): Promise<ResolvedApiNode> {
  const middlewareModule = node.middleware
    ? await node.middleware()
    : undefined;
  const middlewares = middlewareModule
    ? ([] as Middleware[]).concat(middlewareModule.default)
    : [];

  const routes = await Promise.all(
    node.routes.map(async (route) => {
      const handlers = await route.module();

      for (const key of Object.keys(handlers)) {
        if (!HTTP_METHODS.includes(key as HTTPMethod)) {
          console.warn(
            `[rasengan:api] '${key}' exported from ${route.source} is not a recognized HTTP method (${HTTP_METHODS.join(', ')}) and will be ignored.`
          );
        }
      }

      return { urlSegment: route.urlSegment, source: route.source, handlers };
    })
  );

  const children = await Promise.all(
    [...node.children.values()].map(resolveNode)
  );

  return { urlSegment: node.urlSegment, middlewares, routes, children };
}

/** Register a resolved node (and its descendants) onto a router scope. */
function mount(router: Router, node: ResolvedApiNode) {
  const prefix = node.urlSegment === '' ? '' : '/' + node.urlSegment;

  router.group(prefix, { middlewares: node.middlewares }, (scoped) => {
    for (const route of node.routes) {
      const pattern = route.urlSegment === '' ? '/' : '/' + route.urlSegment;

      for (const method of HTTP_METHODS) {
        const handler = route.handlers[method];
        if (handler) {
          scoped.add(method, pattern, handler);
        }
      }
    }

    for (const child of node.children) {
      mount(scoped, child);
    }
  });
}

/**
 * Turn a `_api/` folder (as an `import.meta.glob` result of
 * `middleware.{js,ts}` and `*.route.{js,ts}` files) into a Futon
 * `Router`, using the same segment conventions as `flatRoutes()`
 * (`[param]`, `[_param]`, `(group)`, `_optional`).
 * @param fn Function that returns a record of modules
 * @returns A Futon Router with every discovered route/middleware registered
 */
export async function flatApiRoutes(
  fn: () => Record<string, () => Promise<ApiMiddlewareModule | ApiRouteModule>>
): Promise<Router> {
  const modules = fn();
  const root = createNode('');

  for (const [filePath, mod] of Object.entries(modules)) {
    if (filePath.includes('middleware.')) {
      insertMiddleware(
        root,
        filePath,
        mod as () => Promise<ApiMiddlewareModule>
      );
    } else if (filePath.includes('.route.')) {
      insertRoute(root, filePath, mod as () => Promise<ApiRouteModule>);
    }
  }

  const resolvedRoot = await resolveNode(root);
  const router = new Router();

  mount(router, resolvedRoot);

  return router;
}
