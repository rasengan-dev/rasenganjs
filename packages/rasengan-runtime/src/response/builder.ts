/**
 * Chainable response builder — provides a fluent API for
 * constructing HTTP responses on `ctx.res`.
 *
 * @example
 * ```ts
 * import { ResponseBuilder } from "@rasenganjs/runtime";
 *
 * app.get("/api", async (ctx) => {
 *   return ctx.res.status(201).json({ created: true });
 * });
 *
 * app.get("/old-page", async (ctx) => {
 *   return ctx.res.redirect("/new-page", 301);
 * });
 *
 * app.get("/error", async (ctx) => {
 *   return ctx.res.status(404).send("Not found");
 * });
 * ```
 */

export class ResponseBuilder {
  statusCode: number = 200;
  #headers: Headers = new Headers();
  #frozen = false;

  /**
   * Set the response status code.
   * Returns `this` for chaining.
   */
  status(code: number): this {
    if (this.#frozen) {
      return this;
    }
    this.statusCode = code;
    return this;
  }

  /**
   * Set a response header.
   * Returns `this` for chaining.
   */
  header(name: string, value: string): this {
    if (this.#frozen) {
      return this;
    }
    this.#headers.set(name, value);
    return this;
  }

  /**
   * Remove a previously set header.
   * Returns `this` for chaining.
   */
  removeHeader(name: string): this {
    if (this.#frozen) {
      return this;
    }
    this.#headers.delete(name);
    return this;
  }

  /**
   * Respond with JSON.
   *
   * @param data — Any JSON-serialisable value
   * @param init — Optional extra ResponseInit overrides
   */
  json(data: unknown, init?: ResponseInit): Response {
    this.#frozen = true;
    return Response.json(data, this.#mergeInit(init));
  }

  /**
   * Respond with plain text.
   *
   * @param text — Response body string
   * @param init — Optional extra ResponseInit overrides
   */
  send(text: string, init?: ResponseInit): Response {
    this.#frozen = true;
    return new Response(text, this.#mergeInit(init));
  }

  /**
   * Respond with HTML.
   *
   * @param text — HTML string
   * @param init — Optional extra ResponseInit overrides
   */
  html(text: string, init?: ResponseInit): Response {
    this.#frozen = true;
    return new Response(
      text,
      this.#mergeInit(init, {
        'Content-Type': 'text/html; charset=utf-8',
      })
    );
  }

  /**
   * Redirect to a URL (default 302).
   *
   * @param url    — Redirect target (absolute or relative)
   * @param status — HTTP status (301 | 302 | 307 | 308)
   */
  redirect(url: string, status: number = 302): Response {
    this.#frozen = true;
    const headers = new Headers(this.#headers);
    headers.set('Location', url);
    return new Response(null, { status, headers });
  }

  #mergeInit(
    init?: ResponseInit,
    defaultHeaders?: Record<string, string>
  ): ResponseInit {
    const headers = new Headers(this.#headers);

    if (defaultHeaders) {
      for (const [k, v] of Object.entries(defaultHeaders)) {
        if (!headers.has(k)) {
          headers.set(k, v);
        }
      }
    }

    if (init?.headers) {
      const extra =
        init.headers instanceof Headers
          ? init.headers
          : new Headers(init.headers);
      for (const [k, v] of extra.entries()) {
        headers.set(k, v);
      }
    }

    return {
      status: this.statusCode,
      ...init,
      headers,
    };
  }
}
