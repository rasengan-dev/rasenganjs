import { Request } from "express";

/**
 * This function is used to create a fetch request from an express request.
 */
export default function createFetchRequest(req: Request, host: string) {
  let origin = `${req.protocol}://${host}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  let url = new URL(req.originalUrl || req.url, origin);

  let controller = new AbortController();

  if (req.on) {
    req.on("close", () => controller.abort());
  }

  let headers = new Headers();

  for (let [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (let value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  let init = {
    method: req.method,
    headers,
    signal: controller.signal,
    body: null,
    duplex: 'half'
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new Request(url.href, init);
}