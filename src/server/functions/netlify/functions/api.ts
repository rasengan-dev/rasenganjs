// @ts-ignore
import type { Context } from "@netlify/functions"
// @ts-ignore
import { handleRequest } from "rasengan"

export default async (req: Request, context: Context) => {
  return await handleRequest(req);
}
