import { type Request, Response } from "express";

/**
 * This function is used to create a Rasengan request from an Express request.
 * Reference: https://github.com/remix-run/react-router/blob/main/packages/react-router-express/server.ts#L86
 */
export default function createRasenganRequest(req: Request, res: Response) {
	// req.hostname doesn't include port information so grab that from
	// `X-Forwarded-Host` or `Host`
	let [, hostnamePort] = req.get("X-Forwarded-Host")?.split(":") ?? [];
	let [, hostPort] = req.get("host")?.split(":") ?? [];
	let port = hostnamePort || hostPort;
	// Use req.hostname here as it respects the "trust proxy" setting
	let resolvedHost = `${req.hostname}${port ? `:${port}` : ""}`;
	// Use `req.originalUrl` so Remix is aware of the full path
	let url = new URL(`${req.protocol}://${resolvedHost}${req.originalUrl}`);

	// Abort action/loaders once we can no longer write a response
	let controller: AbortController | null = new AbortController();

	// Abort action/loaders once we can no longer write a response iff we have
	// not yet sent a response (i.e., `close` without `finish`)
	// `finish` -> done rendering the response
	// `close` -> response can no longer be written to
	res.on("finish", () => (controller = null));
	res.on("close", () => controller?.abort());

	let init: RequestInit = {
		method: req.method,
		headers: createRasenganHeaders(req.headers),
		signal: controller.signal,
	};

	if (req.method !== "GET" && req.method !== "HEAD") {
		init.body = req.body;
		(init as { duplex: "half" }).duplex = "half";
	}

	return new Request(url.href, init);
}

export function createRasenganHeaders(
	requestHeaders: Record<string, string | string[]>
) {
	let headers = new Headers();

	for (let [key, values] of Object.entries(requestHeaders)) {
		if (values) {
			if (Array.isArray(values)) {
				for (const value of values) {
					headers.append(key, value);
				}
			} else {
				headers.set(key, values);
			}
		}
	}

	return headers;
}
