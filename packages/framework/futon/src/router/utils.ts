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
export function matchPath(
  pattern: string,
  pathname: string
): Record<string, string> | null {
  const paramNames: string[] = [];
  let isCatchAll = false;

  const regexStr = pattern
    .replace(
      /\/:([a-zA-Z_][a-zA-Z0-9_]*)(\?|\*)?/g,
      (_, name: string, modifier?: string) => {
        if (modifier === '?') {
          paramNames.push(name);
          return '(?:/([^/]+))?';
        }
        if (modifier === '*') {
          paramNames.push(name);
          return '(?:/(.*))?';
        }
        paramNames.push(name);
        return '/([^/]+)';
      }
    )
    // Replace bare `*` that wasn't part of `:param*`
    .replace(/\*/g, () => {
      isCatchAll = true;
      return '(.*)';
    });

  const normalizedPath = normalizeSlashes(pathname);
  const normalizedPattern = normalizeSlashes(regexStr);

  const regex = new RegExp(`^${normalizedPattern}$`);
  const match = normalizedPath.match(regex);

  if (!match) return null;

  const params: Record<string, string> = {};
  paramNames.forEach((name, i) => {
    const value = match[i + 1];
    if (value !== undefined) {
      params[name] = decodeURIComponent(value);
    }
  });

  // For bare catch-all `*` with no named param, store under "_"
  if (isCatchAll && paramNames.length === 0) {
    params['_'] = match[1] ? decodeURIComponent(match[1]) : '';
  }

  return params;
}

/**
 * Extract the pathname from an absolute URL without the cost of a
 * full WHATWG `new URL()` parse (RFC-0005, Phase 1b).
 *
 * Falls back to `new URL().pathname` whenever the result could
 * differ from WHATWG normalization:
 *   - no scheme separator (relative/unusual shapes)
 *   - `%` in the path (WHATWG normalizes percent-encoding case)
 *   - `\` in the path (WHATWG converts backslashes to slashes)
 */
export function getPathname(url: string): string {
  const schemeEnd = url.indexOf('://');
  if (schemeEnd === -1) return new URL(url).pathname;

  const pathStart = url.indexOf('/', schemeEnd + 3);
  if (pathStart === -1) return '/';

  let pathEnd = url.length;
  for (let i = pathStart; i < url.length; i++) {
    const c = url.charCodeAt(i);
    if (c === 63 /* ? */ || c === 35 /* # */) {
      pathEnd = i;
      break;
    }
  }

  const pathname = url.slice(pathStart, pathEnd);
  if (pathname.includes('%') || pathname.includes('\\')) {
    return new URL(url).pathname;
  }
  return pathname;
}

/**
 * Parse a query string into a plain key-value map.
 *
 * Handles URL-encoded keys and values.
 */
export function parseQueryString(url: string): Record<string, string> {
  const queryStart = url.indexOf('?');
  if (queryStart === -1) return {};

  const search = url.slice(queryStart + 1);
  const params: Record<string, string> = {};
  if (!search) return params;

  for (const part of search.split('&')) {
    const eqIndex = part.indexOf('=');
    if (eqIndex === -1) {
      params[decodeURIComponent(part)] = '';
    } else {
      const key = decodeURIComponent(part.slice(0, eqIndex));
      const value = decodeURIComponent(part.slice(eqIndex + 1));
      params[key] = value;
    }
  }

  return params;
}

/**
 * Strip trailing slash for matching consistency,
 * but preserve root "/".
 */
function normalizeSlashes(input: string): string {
  if (input.length > 1 && input.endsWith('/')) {
    return input.slice(0, -1);
  }
  return input;
}
