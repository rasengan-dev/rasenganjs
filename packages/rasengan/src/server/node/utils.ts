import type * as Express from "express";
import { createReadableStreamFromReadable, writeReadableStreamToWritable } from "./stream.js";

/**
 * This function is used to create a Rasengan request from an Express request.
 * Reference: https://github.com/remix-run/react-router/blob/main/packages/react-router-express/server.ts#L86
 */
export default function createRasenganRequest(req: Express.Request, res: Express.Response) {
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
		init.body = createReadableStreamFromReadable(req);
		(init as { duplex: "half" }).duplex = "half";
	}

	return new Request(url.href, init);
}

/**
 * This function is used to send a Rasengan response to an Express response.
 * @param res 
 * @param nodeResponse 
 */
export async function sendRasenganResponse(
	res: Express.Response,
	nodeResponse: Response
): Promise<void> {
	try {
		// Set status and status message
		res.statusMessage = nodeResponse.statusText;
		res.status(nodeResponse.status);

		// Set headers
		for (let [key, value] of nodeResponse.headers.entries()) {
			res.append(key, value);
		}

		// Handle Server-Sent Events (SSE)
		if (
			nodeResponse.headers.get("Content-Type")?.match(/text\/event-stream/i)
		) {
			res.flushHeaders();
		}

		// Write the response body if available
		if (nodeResponse.body) {
			await writeReadableStreamToWritable(nodeResponse.body, res);
		} else {
			res.end();
		}
	} catch (error) {
		// Log the error (optional)
		console.error("Error while sending response:", error);

		// Send a 500 Internal Server Error response with error details
		res.status(500).send({
			message: "An error occurred while processing the response.",
			error: error instanceof Error ? error.message : String(error),
		});
	}
}


/**
 * This function is used to create a Rasengan headers from Express request headers.
 * @param requestHeaders 
 * @returns 
 */
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
