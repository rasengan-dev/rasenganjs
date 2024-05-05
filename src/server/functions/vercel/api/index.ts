import type { VercelRequest, VercelResponse } from "@vercel/node";
// @ts-ignore
import { handleRequest } from "rasengan";

// Create server for production only
export default async function handler(req: VercelRequest, res: VercelResponse) {
  return await handleRequest(req, res);
}
