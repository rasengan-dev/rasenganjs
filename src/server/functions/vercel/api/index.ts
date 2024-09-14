import fs from "node:fs/promises";
import fsSync from "node:fs";
import path, { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
	StaticHandlerContext,
	createStaticHandler,
	createStaticRouter,
} from "react-router-dom/server.js";
// @ts-ignore
import { createFetchRequest } from "rasengan";

// import { handleRequest } from "rasengan";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fileTypeFromBuffer } from "file-type";

const { RASENGAN_VERCEL_CONFIG } = process.env;

// Create server for production only
export default async function handler(req: VercelRequest, res: VercelResponse) {
	try {
		// Get URL
		const url = req.url;
		const host = req.headers.host;

		// Get app path
		let appPath = process.cwd();

		// Check if RASENGAN_VERCEL_CONFIG is set
		if (RASENGAN_VERCEL_CONFIG) {
			// Parse the config
			const config = JSON.parse(RASENGAN_VERCEL_CONFIG);

			// Get the app path
			appPath = join(appPath, config.rootDirectory);
		}

		// Format config path
		const configPath = path.resolve(join(appPath, "rasengan.config.js"));

		// Get config
		const config = (await import(configPath)).default;

		// ! Robots Fix
		if (url === "/robots.txt") {
			// Check if robots.txt exists using fs
			// If it does, return it
			try {
				const filePath = join(appPath, "dist/client/robots.txt");

				await fs.access(path.resolve(filePath));

				// read robot file with fs
				const file = await fs.readFile(filePath, "utf-8");

				return res.send(file);
			} catch (err: any) {
				return res.send(`
          user-agent: *
          disallow: /downloads/
          disallow: /private/
          allow: /
          
          user-agent: magicsearchbot
          disallow: /uploads/
        `);
			}
		}

		// ! Sitemap Fix
		if (url === "/sitemap.xml") {
			return res.send(path.resolve(join(appPath, "dist/client/sitemap.xml")));
		}

		// ! Manifest Fix
		if (url === "/manifest.json") {
			return res.send(path.resolve(join(appPath, "dist/client/manifest.json")));
		}

		// ! Handle assets
		if (url.includes("/assets")) {
			// get segments from /assets to the end
			const segments = url.split("/");

			const segmentsWithoutOrigin = [...segments];

			for (let segment of segments) {
				if (segment === "assets") {
					break;
				}

				segmentsWithoutOrigin.shift();
			}

			// replace assets by client/assets
			const filePath = join(
				appPath,
				"dist/client",
				segmentsWithoutOrigin.join("/")
			);
			const file = await fs.readFile(filePath, "utf-8");

			if (url.endsWith(".js") || url.endsWith(".css")) {
				return new Response(file, {
					headers: {
						"Content-Type": url.endsWith(".js")
							? "text/javascript"
							: "text/css",
						"Cache-Control": "max-age=31536000",
					},
				});
			}

			// read other files
			const otherFile = await fs.readFile(filePath);

			const result = await fileTypeFromBuffer(otherFile);

			const mimeType = result
				? result.mime
				: url.endsWith(".svg")
				? "image/svg+xml"
				: "application/octet-stream";

			return new Response(otherFile, {
				headers: {
					"Content-Type": mimeType,
					"Cache-Control": "max-age=31536000",
				},
			});
		}

		// Handle js and css files
		if (url.endsWith(".js") || url.endsWith(".css")) {
			const file = await fs.readFile(url, "utf-8");

			return res
				.status(200)
				.setHeader(
					"Content-Type",
					url.endsWith(".js") ? "text/javascript" : "text/css"
				)
				.setHeader("Cache-Control", "max-age=31536000")
				.end(file);
		}

		// Template html
		let templateHtml = "";

		// Always read fresh template in development
		const serverFilePath = join(appPath, "dist/server/entry-server.js");
		const bootstrapDirPath = join(appPath, "dist/client/assets");

		// Read the entry sever file
		let entry = await import(serverFilePath);

		// replace bootstrap script with compiled scripts
		let bootstrap =
			"/assets/" +
			fsSync
				.readdirSync(bootstrapDirPath)
				.filter((fn) => fn.includes("entry-client") && fn.endsWith(".js"))[0];

		// replace styles with compiled styles
		let styles =
			"/assets/" +
			fsSync
				.readdirSync(join(appPath, "dist/client/assets"))
				.filter((fn) => fn.includes("entry-client") && fn.endsWith(".css"))[0];

		// Extract render and staticRoutes from entry
		const { render, staticRoutes, loadTemplateHtml } = entry;

		// Create static handler
		let handler = createStaticHandler(staticRoutes);

		// Create fetch request for static routing
		// @ts-ignore
		let fetchRequest = createFetchRequest(req, host);
		let context = await handler.query(fetchRequest);

		// Handle redirects
		const status = (context as Response).status;

		if (status === 302) {
			const redirect = (context as Response).headers.get("Location");

			if (redirect) return res.redirect(redirect);
		}

		// Helmet context
		const helmetContext = {} as { helmet: any };

		// Create static router
		let router = createStaticRouter(
			handler.dataRoutes,
			context as StaticHandlerContext
		);

		// If stream mode enabled, render the page as a plain text
		if (config.experimental.stream) {
			return await render(
				router,
				context,
				helmetContext,
				bootstrap,
				styles,
				res
			);
		}

		const rendered = await render(router, context, helmetContext);

		// Load template html
		if (!templateHtml) {
			templateHtml = loadTemplateHtml(helmetContext, bootstrap, styles);
		}

		// Replacing the app-html placeholder with the rendered html
		let html = templateHtml.replace(`rasengan-body-app`, rendered.html ?? "");

		// Send the rendered html page
		return res
			.status(200)
			.setHeader("Content-Type", "text/html")
			.setHeader("Cache-Control", "max-age=31536000")
			.end(html);
	} catch (e: any) {
		console.log(e.stack);
		res.status(500).end(e.stack);
	}
}

// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   return await handleRequest(req, res);
// }
