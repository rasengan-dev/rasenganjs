import path, { join } from "node:path";
import { Response } from "express";

export function fix404(url: string, res: Response, appPath: string) {
  // ! Robots Fix
  if (url === "/robots.txt") {
    return res.send(`
      user-agent: *
      disallow: /downloads/
      disallow: /private/
      allow: /
      
      user-agent: magicsearchbot
      disallow: /uploads/
    `);
  }

  // ! Sitemap Fix
  if (url === "/sitemap.xml") {
    return res.sendFile(path.resolve(join(appPath, "dist/client/sitemap.xml")));
  }

  // ! Manifest Fix
  if (url === "/manifest.json") {
    return res.sendFile(
      path.resolve(join(appPath, "dist/client/manifest.json"))
    );
  }
}
