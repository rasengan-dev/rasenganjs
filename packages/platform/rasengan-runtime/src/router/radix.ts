/**
 * RasenganTreeRouter — A radix (compressed trie) tree for HTTP
 * path matching.
 *
 * Concept:
 * ────────
 * Unlike a linear scan that checks every registered route until
 * one matches (O(n × k)), this tree walks one node per URL
 * segment — O(k) regardless of how many routes exist.
 *
 * Each `/`-separated path segment becomes a node. Single-child
 * chains are implicit (there is no compression step; the tree
 * naturally stores one node per segment).
 *
 * Node types:
 *   Static   — exact segment match, stored in a `children` Map
 *   :param   — matches any single segment, captures it by name
 *   :param?  — matches zero or one segment (optional)
 *   :param*  — matches one or more remaining segments (wildcard)
 *   *        — bare catch-all, matches everything remaining
 *
 * Usage:
 * ─────
 *   const tree = new RasenganTreeRouter();
 *   tree.add('/users/:id', handler);
 *   tree.add('/static/*', staticHandler);
 *
 *   const result = tree.match('/users/42');
 *   // → { handler, params: { id: '42' } }
 *
 *   tree.match('/unknown');
 *   // → { handler: undefined, params: {} }
 */

// ── Node types ──────────────────────────────────────────────────

/**
 * Internal node in the route tree.
 *
 * Each node corresponds to one path segment. A node may hold:
 *   - Static children (`children` Map) for exact-match segments
 *   - A `paramChild` for `:param` segments
 *   - An `optionalChild` for `:param?` segments
 *   - A `wildcardChild` for `:param*` and bare `*` segments
 *
 * A node with an attached `handler` is a leaf — it represents
 * a fully registered route.
 */
interface RouteNode {
  /** The path segment string this node represents */
  segment: string;
  /**
   * Handler attached at this node.
   * `undefined` if this node is purely structural (intermediate).
   */
  handler?: unknown;
  /**
   * Static child segments — exact string match.
   * The Map key is the full segment string (e.g. `"users"`).
   */
  children: Map<string, RouteNode>;
  /** Dynamic `:param` child — matches any single segment. */
  paramChild?: ParamRouteNode;
  /** Optional `:param?` child — matches zero or one segment. */
  optionalChild?: ParamRouteNode;
  /**
   * Wildcard child — matches all remaining path segments.
   * Created for both `:param*` (named) and `*` (unnamed) patterns.
   */
  wildcardChild?: WildcardRouteNode;
}

/**
 * A child node that captures a path segment as a named parameter.
 */
interface ParamRouteNode extends RouteNode {
  /** The parameter name (without `:` or `?` or `*` prefix). */
  paramName: string;
}

/**
 * A child node matching all remaining segments.
 * Stores the parameter name or `_` for bare `*` catch-alls.
 */
interface WildcardRouteNode extends RouteNode {
  /** Parameter name, or `'_'` for bare `*` patterns. */
  paramName: string;
}

// ── Match result ────────────────────────────────────────────────

export interface TreeMatchResult<T = unknown> {
  /** The handler registered for the matched route, if any. */
  handler?: T;
  /** Captured path parameters. */
  params: Record<string, string>;
}

// ── Router ──────────────────────────────────────────────────────

/**
 * Radix-tree router for path matching.
 *
 * Register routes with `add(pattern, handler)` and match
 * incoming paths with `match(pathname)`.
 *
 * Handles all pattern types:
 *   - `/users/:id`       — required dynamic segment
 *   - `/users/:id?`      — optional dynamic segment
 *   - `/files/:path*`    — named wildcard (greedy, multi-segment)
 *   - `/static/*`        — unnamed catch-all (stored as `_`)
 *   - `/about`           — static segment
 *
 * Lookup is O(k) where k = number of path segments.
 */
export class RasenganTreeRouter<T = unknown> {
  private root: RouteNode = { segment: '/', children: new Map() };

  /**
   * Register a handler at a given path pattern.
   *
   * @param pattern — Route pattern (e.g. `"/users/:id"`)
   * @param handler — Opaque value to return on match
   */
  add(pattern: string, handler: T): void {
    const segments = pattern.split('/').filter(Boolean);
    let node = this.root;

    for (const segment of segments) {
      if (segment === '*') {
        // Bare catch-all — matches everything remaining.
        // Stored under the key `_` by convention.
        node.wildcardChild = this.ensureWildcard(node, '*', '_');
        node = node.wildcardChild;
        node.handler = handler;
        return;
      }

      if (segment.startsWith(':')) {
        // Extract param name and determine modifier
        const rawName = segment.slice(1);
        const modifier = rawName.endsWith('*')
          ? '*'
          : rawName.endsWith('?')
            ? '?'
            : '';
        const paramName = modifier ? rawName.slice(0, -1) : rawName;

        if (modifier === '*') {
          // Named wildcard — matches one or more remaining segments
          node.wildcardChild = this.ensureWildcard(node, segment, paramName);
          node = node.wildcardChild;
        } else if (modifier === '?') {
          // Optional param — matches zero or one segment
          node.optionalChild = this.ensureParam(
            node,
            'optional',
            segment,
            paramName
          );
          node = node.optionalChild;
        } else {
          // Required param — matches exactly one segment
          node.paramChild = this.ensureParam(node, 'param', segment, paramName);
          node = node.paramChild;
        }
      } else {
        // Static segment — exact match
        if (!node.children.has(segment)) {
          node.children.set(segment, {
            segment,
            children: new Map(),
          });
        }
        node = node.children.get(segment)!;
      }
    }

    node.handler = handler;
  }

  /**
   * Match a URL pathname against the registered routes.
   *
   * Returns the handler and captured params if a route matches,
   * or `{ handler: undefined, params: {} }` if no match is found.
   *
   * Trailing slashes are stripped before matching (except for
   * root `/`).
   *
   * @param pathname — URL path (e.g. `"/users/42"`)
   */
  match(pathname: string): TreeMatchResult<T> {
    // Strip trailing slash for consistency (preserve root "/")
    const normalized =
      pathname.length > 1 && pathname.endsWith('/')
        ? pathname.slice(0, -1)
        : pathname;

    const segments = normalized.split('/').filter(Boolean);
    const params: Record<string, string> = {};

    const result = this.matchSegments(this.root, segments, 0, params);
    if (result) return result;

    return { handler: undefined, params: {} };
  }

  /**
   * Recursive segment-by-segment walk through the tree.
   *
   * Priority order at each level:
   *   1. Static children (exact match)
   *   2. Required param (`:param`)
   *   3. Optional param (`:param?`)
   *   4. Wildcard (`:param*` or `*`)
   *
   * Returns `null` if no path leads to a handler.
   */
  private matchSegments(
    node: RouteNode,
    segments: string[],
    index: number,
    params: Record<string, string>
  ): TreeMatchResult<T> | null {
    // All segments consumed — return handler if one exists
    if (index >= segments.length) {
      if (node.handler !== undefined) {
        return { handler: node.handler as T, params: { ...params } };
      }
      // Check if there's an optional param we can skip to
      if (node.optionalChild && node.optionalChild.handler !== undefined) {
        return {
          handler: node.optionalChild.handler as T,
          params: { ...params },
        };
      }
      return null;
    }

    const segment = segments[index];

    // 1. Try static match first (highest priority)
    if (node.children.has(segment)) {
      const result = this.matchSegments(
        node.children.get(segment)!,
        segments,
        index + 1,
        params
      );
      if (result) return result;
    }

    // 2. Try required param match
    if (node.paramChild) {
      params[node.paramChild.paramName] = decodeURIComponent(segment);
      const result = this.matchSegments(
        node.paramChild,
        segments,
        index + 1,
        params
      );
      if (result) return result;
      delete params[node.paramChild.paramName];
    }

    // 3. Optional param — try SKIP (absent) then CONSUME (present).
    //
    //    For `/users/:id?/posts` matching `/users/posts`, we first
    //    try the optional node's children against "posts" directly
    //    (skipping the param). Only if that fails do we consume
    //    "posts" as the param value.
    if (node.optionalChild) {
      const childNode = node.optionalChild;

      // 3a. Skip — try children of the optional node against the
      //     SAME segment, as if the param wasn't there.
      const skip = this.matchSegments(childNode, segments, index, params);
      if (skip) return skip;

      // 3b. Consume — capture the segment as the param value.
      params[childNode.paramName] = decodeURIComponent(segment);
      const consume = this.matchSegments(
        childNode,
        segments,
        index + 1,
        params
      );
      if (consume) return consume;
      delete params[childNode.paramName];
    }

    // 4. Try wildcard/catch-all — matches all remaining segments
    if (node.wildcardChild) {
      params[node.wildcardChild.paramName] = segments
        .slice(index)
        .map(decodeURIComponent)
        .join('/');
      return {
        handler: node.wildcardChild.handler as T,
        params: { ...params },
      };
    }

    return null;
  }

  // ── Helpers ─────────────────────────────────────────────────

  private ensureParam(
    node: RouteNode,
    kind: 'param' | 'optional',
    segment: string,
    paramName: string
  ): ParamRouteNode {
    const target = kind === 'param' ? node.paramChild : node.optionalChild;
    if (target) return target;

    const child: ParamRouteNode = {
      segment,
      paramName,
      children: new Map(),
    };
    if (kind === 'param') node.paramChild = child;
    else node.optionalChild = child;
    return child;
  }

  private ensureWildcard(
    node: RouteNode,
    segment: string,
    paramName: string
  ): WildcardRouteNode {
    if (node.wildcardChild) return node.wildcardChild;

    const child: WildcardRouteNode = {
      segment,
      paramName,
      children: new Map(),
    };
    node.wildcardChild = child;
    return child;
  }
}
